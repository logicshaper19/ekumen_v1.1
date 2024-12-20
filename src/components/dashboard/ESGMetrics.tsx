import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, Factory, Zap, Sun } from "lucide-react";

// Mock data for ESG metrics
const esgMetrics = [
  {
    name: "CO²eq emissions",
    value: "2.5",
    unit: "tonnes/hectare",
    icon: Leaf,
    trend: "down",
    change: "-12%",
  },
  {
    name: "Consommation d'eau",
    value: "450",
    unit: "m³/hectare/an",
    icon: Droplets,
    trend: "down",
    change: "-8%",
  },
  {
    name: "Quantité d'intrants",
    value: "180",
    unit: "kg/hectare",
    icon: Factory,
    trend: "down",
    change: "-15%",
  },
  {
    name: "Consommation énergétique",
    value: "850",
    unit: "kWh/hectare",
    icon: Zap,
    trend: "down",
    change: "-5%",
  },
  {
    name: "Énergies renouvelables",
    value: "35",
    unit: "%",
    icon: Sun,
    trend: "up",
    change: "+10%",
  },
];

export function ESGMetrics() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Indicateurs ESG</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {esgMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.name}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#004D40] bg-opacity-10">
                    <Icon className="h-5 w-5 text-[#004D40]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                    <p className="text-lg font-semibold">
                      {metric.value} {metric.unit}
                    </p>
                  </div>
                </div>
                <div className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
                  metric.trend === 'down' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {metric.change}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
