'use client'
import React from 'react'
import { Map, Marker } from '@vis.gl/react-maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

//51.056097, 31.890755

const MapContacts = () => {
  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <div className="rounded-lg overflow-hidden">
          <Map
            initialViewState={{
              longitude: 31.890755,
              latitude: 51.056097,
              zoom: 14,
            }}
            style={{ width: '100%', height: 400 }}
            // mapStyle="https://tiles.openfreemap.org/styles/liberty"
            mapStyle="./map-styles.json"
          >
            <Marker longitude={31.890755} latitude={51.056097} />
          </Map>
        </div>
      </div>
    </div>
  )
}

export default MapContacts
