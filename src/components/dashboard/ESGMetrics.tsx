import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, Factory, Zap, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

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
    <Card className="h-full bg-[#F5F5F0]">
      <CardHeader className="pb-2">
        <CardTitle>Indicateurs ESG</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {esgMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.name}
                className="p-4 bg-[#F5F5F0] rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F5F5F0] rounded-lg">
                      <Icon className="h-5 w-5 text-[#005E5D]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{metric.name}</p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-lg font-semibold">{metric.value}</p>
                        <p className="text-sm text-gray-500">{metric.unit}</p>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm",
                    metric.trend === "up" ? "text-red-500" : "text-green-500"
                  )}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
