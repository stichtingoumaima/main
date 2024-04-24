
"use client"
import Map, { NavigationControl, GeolocateControl, Source, Layer, useMap } from 'react-map-gl';
import './app.css'
function Minimap() {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  return (
    <div style={{ width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden' }}>

    <Map 
    mapboxAccessToken={mapboxToken}
    mapStyle="mapbox://styles/aymane258/clv7c226d006q01qzf0xr7xw5"
    initialViewState={{ latitude: 35.668641, longitude: 139.750567, zoom: 10 }}
    maxZoom={20}
    minZoom={3}
    projection="globe"
       style={{ width: '100%', height: '100%' }}
>
  
</Map>
</div>
  )
}

export default Minimap