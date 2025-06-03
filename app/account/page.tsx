"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { User, Package, CreditCard, Settings, LogOut, Edit2, Save, X } from "lucide-react"

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "completed" | "cancelled"
  total: number
  items: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export default function AccountPage() {
  const { user, logout } = useAuth()
  const { translations } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1234",
      date: "2023-05-15",
      status: "completed",
      total: 999,
      items: [
        {
          id: "web-basic",
          name: "Basic Website",
          price: 999,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-5678",
      date: "2023-06-22",
      status: "processing",
      total: 1999,
      items: [
        {
          id: "ecomm-standard",
          name: "Standard E-commerce",
          price: 1999,
          quantity: 1,
        },
      ],
    },
  ])

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=account")
      return
    }

    // Initialize profile with user data
    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    })
  }, [user, router])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setIsEditing(false)

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })
    }, 1000)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null // Redirect handled in useEffect
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container py-16">
      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-muted">
                  {user.name ? (
                    <span className="text-4xl font-bold">{user.name.charAt(0)}</span>
                  ) : (
                    <User className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="flex flex-col items-start justify-start gap-2">
                  <TabsTrigger value="profile" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>

            <CardFooter>
              <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                {translations.auth.logout}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </div>

                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="icon" onClick={handleSaveProfile} disabled={loading}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} />
                      ) : (
                        <p className="rounded-md border p-2">{profile.name || "Not provided"}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                        />
                      ) : (
                        <p className="rounded-md border p-2">{profile.email || "Not provided"}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
                    ) : (
                      <p className="rounded-md border p-2">{profile.phone || "Not provided"}</p>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input id="address" name="address" value={profile.address} onChange={handleProfileChange} />
                    ) : (
                      <p className="rounded-md border p-2">{profile.address || "Not provided"}</p>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <Input id="city" name="city" value={profile.city} onChange={handleProfileChange} />
                      ) : (
                        <p className="rounded-md border p-2">{profile.city || "Not provided"}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      {isEditing ? (
                        <Input id="state" name="state" value={profile.state} onChange={handleProfileChange} />
                      ) : (
                        <p className="rounded-md border p-2">{profile.state || "Not provided"}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      {isEditing ? (
                        <Input id="zipCode" name="zipCode" value={profile.zipCode} onChange={handleProfileChange} />
                      ) : (
                        <p className="rounded-md border p-2">{profile.zipCode || "Not provided"}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      {isEditing ? (
                        <Input id="country" name="country" value={profile.country} onChange={handleProfileChange} />
                      ) : (
                        <p className="rounded-md border p-2">{profile.country || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                </CardContent>

                {isEditing && (
                  <CardFooter>
                    <Button className="w-full" onClick={handleSaveProfile} disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and their status</CardDescription>
                </CardHeader>

                <CardContent>
                  {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Package className="mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="text-lg font-medium">No orders yet</p>
                      <p className="text-muted-foreground">Your order history will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <Card key={order.id}>
                          <CardHeader className="p-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Order ID</p>
                                <p className="font-medium">{order.id}</p>
                              </div>

                              <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                              </div>

                              <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <div className="flex items-center gap-2">
                                  <span className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></span>
                                  <span className="capitalize">{order.status}</span>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="font-medium">${order.total.toFixed(2)}</p>
                              </div>

                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your payment methods and billing details</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Payment Methods</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-md border p-4">
                        <div className="flex items-center gap-4">
                          <CreditCard className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>

                      <Button variant="outline">Add Payment Method</Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Billing Address</h3>

                    <div className="rounded-md border p-4">
                      <p>{profile.name || "Not provided"}</p>
                      <p>{profile.address || "Not provided"}</p>
                      <p>
                        {profile.city ? `${profile.city}, ` : ""}
                        {profile.state || ""} {profile.zipCode || ""}
                      </p>
                      <p>{profile.country || "Not provided"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-emails">Marketing emails</Label>
                        <input
                          type="checkbox"
                          id="marketing-emails"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="order-updates">Order updates</Label>
                        <input
                          type="checkbox"
                          id="order-updates"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <input
                          type="checkbox"
                          id="newsletter"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Security</h3>

                    <Button variant="outline">Change Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>

                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
