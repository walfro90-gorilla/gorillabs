"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { initGoogleMaps, officeLocations } from "@/lib/google-maps"
import { useLanguage } from "@/context/language-context"
import { MapPin, Truck, Package } from "lucide-react"

interface TrackingPoint {
  id: string
  name: string
  lat: number
  lng: number
  status: "pending" | "in-transit" | "delivered"
  timestamp: Date
}

export function LogisticsTracker() {
  const { language } = useLanguage()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [trackingPoints, setTrackingPoints] = useState<TrackingPoint[]>([])

  useEffect(() => {
    const loadMap = async () => {
      if (!mapRef.current) return

      const google = await initGoogleMaps()
      if (!google) return

      // Create map centered between offices
      const center = { lat: 31.72615, lng: -106.45475 }

      const map = new google.maps.Map(mapRef.current, {
        zoom: 11,
        center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      })

      mapInstanceRef.current = map
      setIsLoaded(true)

      // Add office markers
      officeLocations.forEach((office) => {
        const marker = new google.maps.Marker({
          position: { lat: office.lat, lng: office.lng },
          map,
          title: office.name,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold;">${office.name}</h3>
              <p style="margin: 0; color: #666;">${office.address}</p>
            </div>
          `
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })

        markersRef.current.push(marker)
      })

      // Simulate tracking points
      const simulatedPoints: TrackingPoint[] = [
        {
          id: "1",
          name: language === "es" ? "En tránsito" : language === "zh" ? "运输中" : "In Transit",
          lat: 31.75,
          lng: -106.48,
          status: "in-transit",
          timestamp: new Date()
        },
        {
          id: "2",
          name: language === "es" ? "Pendiente" : language === "zh" ? "待处理" : "Pending",
          lat: 31.70,
          lng: -106.43,
          status: "pending",
          timestamp: new Date()
        }
      ]

      setTrackingPoints(simulatedPoints)

      // Add tracking markers
      simulatedPoints.forEach((point) => {
        const iconColor = 
          point.status === "delivered" ? "green" :
          point.status === "in-transit" ? "orange" : "red"

        const marker = new google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map,
          title: point.name,
          icon: {
            url: `http://maps.google.com/mapfiles/ms/icons/${iconColor}-dot.png`
          }
        })

        markersRef.current.push(marker)
      })
    }

    loadMap()
  }, [language])

  const getTitle = () => {
    if (language === "es") return "Rastreador Logístico"
    if (language === "zh") return "物流追踪器"
    return "Logistics Tracker"
  }

  const getDescription = () => {
    if (language === "es") return "Simulación de sistema de rastreo logístico en tiempo real"
    if (language === "zh") return "实时物流跟踪系统模拟"
    return "Real-time logistics tracking system simulation"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          {getTitle()}
        </CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={mapRef} className="w-full h-[400px] rounded-lg border" />
        
        {isLoaded && (
          <div className="space-y-2">
            <h4 className="font-semibold">
              {language === "es" ? "Puntos de Rastreo" : language === "zh" ? "跟踪点" : "Tracking Points"}
            </h4>
            {trackingPoints.map((point) => (
              <div key={point.id} className="flex items-center gap-2 p-2 bg-muted rounded">
                <Package className="h-4 w-4" />
                <span className="text-sm">{point.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {point.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

