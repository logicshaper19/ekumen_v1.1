import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Polygon, Marker, Popup, Tooltip, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample plot data with more realistic information
const samplePlots = [
  {
    id: 1,
    name: "Parcelle Les Champs d'Or",
    area: "25 hectares",
    zipCode: "47200", // Marmande, Lot-et-Garonne
    coordinates: [
      [44.4984, 0.1545],
      [44.4984, 0.1645],
      [44.4934, 0.1645],
      [44.4934, 0.1545],
    ],
    center: [44.4959, 0.1595],
    currentCrop: "Blé tendre",
    cropRotation: [
      { year: 2023, crop: "Blé tendre" },
      { year: 2022, crop: "Maïs" },
      { year: 2021, crop: "Tournesol" }
    ],
    status: "En culture"
  },
  {
    id: 2,
    name: "Parcelle Val Fertile",
    area: "30 hectares",
    zipCode: "47400", // Tonneins, Lot-et-Garonne
    coordinates: [
      [44.3884, 0.3145],
      [44.3884, 0.3245],
      [44.3834, 0.3245],
      [44.3834, 0.3145],
    ],
    center: [44.3859, 0.3195],
    currentCrop: "Maïs",
    cropRotation: [
      { year: 2023, crop: "Maïs" },
      { year: 2022, crop: "Soja" },
      { year: 2021, crop: "Blé tendre" }
    ],
    status: "En préparation"
  }
];

const Legend = () => {
  return (
    <div className="absolute bottom-5 right-5 z-[1000] bg-white p-3 rounded-lg shadow-md">
      <h4 className="text-sm font-semibold mb-2">Statut des parcelles</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#005E5D] opacity-20 border-2 border-[#005E5D]" />
          <span className="text-sm">En culture</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#FF4B4B] opacity-20 border-2 border-[#FF4B4B]" />
          <span className="text-sm">En préparation</span>
        </div>
      </div>
    </div>
  );
};

export function PlotsMap() {
  const center = [44.4959, 0.1595]; // Centered between the two plots
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <CardTitle>Mes Parcelles</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] rounded-md overflow-hidden relative">
          <MapContainer
            center={center as [number, number]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
            fullscreenControl={true}
          >
            {/* Google Satellite Layer */}
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution="&copy; Google Maps"
            />
            <ScaleControl position="bottomleft" />
            {samplePlots.map((plot) => (
              <React.Fragment key={plot.id}>
                <Polygon
                  positions={plot.coordinates as [number, number][]}
                  pathOptions={{
                    color: plot.status === "En préparation" ? '#FF4B4B' : '#005E5D',
                    fillColor: plot.status === "En préparation" ? '#FF4B4B' : '#005E5D',
                    fillOpacity: selectedPlot === plot.id ? 0.4 : 0.2,
                    weight: selectedPlot === plot.id ? 3 : 2
                  }}
                  eventHandlers={{
                    click: () => setSelectedPlot(plot.id)
                  }}
                >
                  <Tooltip sticky>
                    <div className="text-sm font-medium">{plot.name}</div>
                    <div className="text-xs">{plot.currentCrop}</div>
                  </Tooltip>
                </Polygon>
                <Marker 
                  position={plot.center as [number, number]}
                  eventHandlers={{
                    click: () => setSelectedPlot(plot.id)
                  }}
                >
                  <Popup className="rounded-lg">
                    <div className="p-3">
                      <h3 className="text-lg font-semibold mb-3">{plot.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Surface:</span>
                          <span className="text-sm font-medium">{plot.area}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Code Postal:</span>
                          <span className="text-sm font-medium">{plot.zipCode}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Culture actuelle:</span>
                          <span className="text-sm font-medium">{plot.currentCrop}</span>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-semibold mb-2">Rotation de l'assolement:</p>
                          <div className="space-y-1">
                            {plot.cropRotation.map((rotation) => (
                              <div key={rotation.year} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{rotation.year}:</span>
                                <span className="text-sm font-medium">{rotation.crop}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Statut:</span>
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                              plot.status === "En préparation" 
                                ? "bg-red-100 text-red-800" 
                                : "bg-green-100 text-green-800"
                            }`}>
                              {plot.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
            <Legend />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
