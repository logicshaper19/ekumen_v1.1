import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
        <div className="h-[400px] rounded-md overflow-hidden">
          <MapContainer
            center={center as [number, number]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            {/* Google Satellite Layer */}
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution="&copy; Google Maps"
            />
            {samplePlots.map((plot) => (
              <React.Fragment key={plot.id}>
                <Polygon
                  positions={plot.coordinates as [number, number][]}
                  pathOptions={{
                    color: selectedPlot === plot.id ? '#FF4B4B' : '#005E5D',
                    fillColor: selectedPlot === plot.id ? '#FF4B4B' : '#005E5D',
                    fillOpacity: 0.2,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => setSelectedPlot(plot.id)
                  }}
                />
                <Marker 
                  position={plot.center as [number, number]}
                  eventHandlers={{
                    click: () => setSelectedPlot(plot.id)
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold mb-2">{plot.name}</h3>
                      <p className="text-sm mb-1">Surface: {plot.area}</p>
                      <p className="text-sm mb-1">Code Postal: {plot.zipCode}</p>
                      <p className="text-sm mb-1">Culture actuelle: {plot.currentCrop}</p>
                      <div className="mt-2">
                        <p className="text-sm font-semibold">Rotation des cultures:</p>
                        {plot.cropRotation.map((rotation) => (
                          <p key={rotation.year} className="text-sm">
                            {rotation.year}: {rotation.crop}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
