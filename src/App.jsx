import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import { useState } from 'react'

function App() {
  const [map, setMap] = useState()
  const [isPanelListShown, setIsPanelListShown] = useState(true)
  const [isPanelDetailShown, setIsPanelDetailShown] = useState(false)

  const centeredMarker = (type, widthPanelWrapper) => {
    if(widthPanelWrapper <= 0) return

    // ALGORITHM X
    const valueWidthCenterX = map.getContainer().offsetWidth / 2
    const gapCenterToMarkerX = valueWidthCenterX - widthPanelWrapper
    const emptySpaceX = map.getContainer().offsetWidth - widthPanelWrapper
    const valuePanX = (emptySpaceX / 2) - gapCenterToMarkerX

    type === 'close' && map.panBy([valuePanX, 0]) // [X, Y]
    type === 'open' && map.panBy([-valuePanX, 0]) // [X, Y]
  }

  const handleGotoMarkerClick = (latLng) => {
    setIsPanelDetailShown(true)
    map.flyTo(latLng, 14, { animate: false }) // animate must false
    centeredMarker('open', 570)
    setIsPanelDetailShown(true)
  }

  const handleClosePanelList = () => {
    setIsPanelListShown(false)
    setIsPanelDetailShown(false)
    map.flyTo([-8.793780, 115.216031], 14, { animate: false }) // animate must false
    centeredMarker('close', 0)
  }

  const handleClosePanelDetail = () => {
    setIsPanelDetailShown(false)
    centeredMarker('close', 280)
  }

  const handleOpenPanelList = () => {
    setIsPanelListShown(true)
    centeredMarker('open', 280)
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div style={{ display: 'flex', position: 'absolute', top: '10px', left: '60px', bottom: '20px', zIndex: 999 }}>
        {!isPanelListShown && <button style={{ height: 48 }} onClick={handleOpenPanelList}>show panel list</button>}

        {isPanelListShown && (
          <div style={{ backgroundColor: 'white', height: '100%', width: '280px' }}>
            <button onClick={handleClosePanelList}>close panel list</button>
            <button onClick={() => handleGotoMarkerClick([-8.793780, 115.216031])}>go to marker</button>
          </div>
        )}

        {isPanelDetailShown && (
          <div style={{ backgroundColor: 'white', height: '100%', width: '280px', marginLeft: '10px' }}>
            <button onClick={handleClosePanelDetail}>close</button>
          </div>
        )}
      </div>

      <MapContainer
        center={[-8.793780, 115.216031]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: '100%',
          width: '100%'
        }}
        whenReady={event => setMap(event.target)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-8.793780, 115.216031]}>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default App
