"use client";
import React, { useRef, useCallback } from 'react';
import Map, { NavigationControl, GeolocateControl, Source, Layer, useMap } from 'react-map-gl';

export default function Mapbox() {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const mapRef = useRef(null);

    const onMapLoad = useCallback(() => {
        const map = mapRef.current.getMap();
        const size = 200;
        const pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
            onAdd: function () {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                this.context = canvas.getContext('2d');
            },
            render: function () {
                const duration = 1000;
                const t = (performance.now() % duration) / duration;
                const radius = size / 2 * 0.3;
                const outerRadius = size / 2 * 0.7 * t + radius;
                const context = this.context;
                context.clearRect(0, 0, this.width, this.height);

                // Outer pulsing circle
                context.beginPath();
                context.arc(size / 2, size / 2, outerRadius, 0, Math.PI * 2);
                context.fillStyle = `rgba(255, 0, 0, ${1 - t})`;
                context.fill();

                // Inner static circle with white border
                context.beginPath();
                context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
                context.fillStyle = 'rgba(255, 0, 0, 1)';  // Red fill
                context.fill();
                context.lineWidth = 10;  // Set the thickness of the border
                context.strokeStyle = 'white';  // White color for the border
                context.stroke();

                this.data = context.getImageData(0, 0, this.width, this.height).data;
                map.triggerRepaint();
                return true;
            },
        };

        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

        map.addSource('dot-point', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [139.750567, 35.668641] // longitude, latitude
                    }
                }]
            }
        });

        map.addLayer({
            id: 'layer-with-pulsing-dot',
            type: 'symbol',
            source: 'dot-point',
            layout: {
                'icon-image': 'pulsing-dot'
            }
        });
    }, []);

    return (
        <main className="w-screen h-screen">
            <Map
                ref={mapRef}
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/aymane258/clv7c226d006q01qzf0xr7xw5"
                initialViewState={{ latitude: 35.668641, longitude: 139.750567, zoom: 10 }}
                onLoad={onMapLoad}
                maxZoom={20}
                minZoom={3}
                projection="globe"
            >
                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />
            </Map>
        </main>
    );
}