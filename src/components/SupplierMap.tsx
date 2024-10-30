import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Supplier } from '../types';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SupplierMapProps {
  suppliers: Supplier[];
  onSelectSupplier: (supplier: Supplier) => void;
}

// Function to get coordinates from location string
const getCoordinates = (location: string): [number, number] => {
  // This would typically use a geocoding service in production
  const cityMap: { [key: string]: [number, number] } = {
    'San Francisco, CA': [37.7749, -122.4194],
    'Austin, TX': [30.2672, -97.7431],
    'Seattle, WA': [47.6062, -122.3321],
    'Portland, OR': [45.5155, -122.6789],
    'Boston, MA': [42.3601, -71.0589],
    'New York, NY': [40.7128, -74.0060],
    'Chicago, IL': [41.8781, -87.6298],
    'Los Angeles, CA': [34.0522, -118.2437],
    'Miami, FL': [25.7617, -80.1918],
    'Denver, CO': [39.7392, -104.9903],
  };

  const coordinates = cityMap[location];
  if (!coordinates) {
    console.warn(`No coordinates found for location: ${location}`);
    // Default to center of US if location not found
    return [39.8283, -98.5795];
  }
  return coordinates;
};

const getMarkerColor = (score: number): string => {
  if (score >= 90) return '#22c55e'; // green-500
  if (score >= 80) return '#84cc16'; // lime-500
  if (score >= 70) return '#eab308'; // yellow-500
  if (score >= 60) return '#f97316'; // orange-500
  return '#ef4444'; // red-500
};

export default function SupplierMap({ suppliers, onSelectSupplier }: SupplierMapProps) {
  const createCustomIcon = (score: number) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="
        background-color: ${getMarkerColor(score)}; 
        width: 24px; 
        height: 24px; 
        border-radius: 50%; 
        border: 2px solid white; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: transform 0.2s ease-in-out;
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  };

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {suppliers.map((supplier) => {
          const [lat, lng] = getCoordinates(supplier.location);
          return (
            <Marker
              key={supplier.id}
              position={[lat, lng]}
              icon={createCustomIcon(supplier.sustainabilityScore)}
              eventHandlers={{
                click: () => onSelectSupplier(supplier),
                mouseover: (e) => {
                  const el = e.target.getElement();
                  el.style.transform = 'scale(1.2)';
                  el.style.zIndex = '1000';
                },
                mouseout: (e) => {
                  const el = e.target.getElement();
                  el.style.transform = 'scale(1)';
                  el.style.zIndex = '900';
                },
              }}
            >
              <Tooltip 
                direction="top" 
                offset={[0, -10]} 
                opacity={1}
                permanent={false}
                className="custom-tooltip"
              >
                <div className="font-semibold">{supplier.name}</div>
                <div className="text-sm text-gray-600">{supplier.location}</div>
              </Tooltip>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                  <p className="text-sm text-gray-600">{supplier.location}</p>
                  <div className="mt-2 flex items-center space-x-1">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getMarkerColor(supplier.sustainabilityScore) }}
                    />
                    <p className="text-sm font-medium">
                      Score: {supplier.sustainabilityScore}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}