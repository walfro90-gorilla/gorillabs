import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

let loader: Loader | null = null

export const initGoogleMaps = async () => {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('Google Maps API key is missing')
    return null
  }

  if (!loader) {
    loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places', 'geometry', 'drawing']
    })
  }

  try {
    const google = await loader.load()
    return google
  } catch (error) {
    console.error('Error loading Google Maps:', error)
    return null
  }
}

export const getGoogleMapsLoader = () => {
  if (!GOOGLE_MAPS_API_KEY) {
    return null
  }

  if (!loader) {
    loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places', 'geometry', 'drawing']
    })
  }

  return loader
}

// Coordenadas de las oficinas
export const officeLocations = [
  {
    id: 'el-paso',
    name: 'El Paso Office',
    address: '113 Paden Street, El Paso, TX 79901',
    lat: 31.7619,
    lng: -106.4850,
    country: 'US'
  },
  {
    id: 'ciudad-juarez',
    name: 'Ciudad Juárez Office',
    address: 'Av. Tecnológico 456, Ciudad Juárez, Chihuahua 32000',
    lat: 31.6904,
    lng: -106.4245,
    country: 'MX'
  }
]

