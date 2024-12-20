import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock data for farmers
const farmers = [
  {
    id: 1,
    name: "Jean Dupont",
    location: "Marmande, 47200",
    totalArea: "25 hectares",
    mainCrops: ["Blé tendre", "Maïs", "Tournesol"],
  },
  {
    id: 2,
    name: "Marie Martin",
    location: "Tonneins, 47400",
    totalArea: "30 hectares",
    mainCrops: ["Maïs", "Soja", "Blé tendre"],
  },
  {
    id: 3,
    name: "Pierre Dubois",
    location: "Agen, 47000",
    totalArea: "40 hectares",
    mainCrops: ["Tournesol", "Blé tendre", "Colza"],
  },
];

export function FarmersDirectory() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold mb-2">{farmer.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {farmer.location}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-[#004D40] bg-opacity-5 text-[#004D40] rounded-lg font-medium">
                    {farmer.totalArea}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3 justify-end">
                    {farmer.mainCrops.map((crop, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/agriculteurs" className="block mt-4">
          <Button variant="outline" className="w-full">
            <span>Voir tous les agriculteurs</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
