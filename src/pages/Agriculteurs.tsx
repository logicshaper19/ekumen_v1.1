import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Filter,
  Search,
  Euro,
  Users,
  Wheat,
  Factory
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnalyticsCard } from "@/components/ui/analytics-card";
import { Link } from 'react-router-dom';

// Mock data for analytics
const analytics = {
  loanAmount: {
    value: "2.5M€",
    description: "Volume total d'encours",
    change: 12
  },
  farmers: {
    value: "45",
    description: "Agriculteurs partenaires",
    change: 5
  },
  acreage: {
    value: "1,250 ha",
    description: "Surface totale",
    change: 150
  },
  scope3: {
    value: "15%",
    description: "Contribution au scope 3",
    change: 3
  }
};

// Mock data for farmers
const farmers = [
  {
    id: 1,
    name: "Jean Dupont",
    location: "Bourgogne-Franche-Comté",
    phone: "06 12 34 56 78",
    email: "jean.dupont@email.com",
    crops: ["Blé", "Colza", "Orge"],
    status: "En règle",
    lastContact: "Il y a 2 jours"
  },
  {
    id: 2,
    name: "Marie Martin",
    location: "Grand Est",
    phone: "06 98 76 54 32",
    email: "marie.martin@email.com",
    crops: ["Maïs", "Tournesol"],
    status: "En règle",
    lastContact: "Il y a 1 semaine"
  },
  {
    id: 3,
    name: "Pierre Bernard",
    location: "Hauts-de-France",
    phone: "06 45 67 89 01",
    email: "pierre.bernard@email.com",
    crops: ["Betterave", "Pomme de terre"],
    status: "À contacter",
    lastContact: "Il y a 3 semaines"
  }
];

export function Agriculteurs() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Agriculteurs</h1>
          <p className="text-gray-600">Vue d'ensemble de vos partenaires agricoles</p>
        </div>
        <Button className="bg-[#005E5D] hover:bg-[#004948]">
          Ajouter un agriculteur
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <AnalyticsCard
          title="Volume d'encours"
          value={analytics.loanAmount.value}
          description={analytics.loanAmount.description}
          change={analytics.loanAmount.change}
          trend="up"
          icon={Euro}
        />
        <AnalyticsCard
          title="Agriculteurs"
          value={analytics.farmers.value}
          description={analytics.farmers.description}
          change={analytics.farmers.change}
          trend="up"
          icon={Users}
        />
        <AnalyticsCard
          title="Surface Totale"
          value={analytics.acreage.value}
          description={analytics.acreage.description}
          change={analytics.acreage.change}
          trend="up"
          icon={Wheat}
        />
        <AnalyticsCard
          title="Scope 3"
          value={analytics.scope3.value}
          description={analytics.scope3.description}
          change={analytics.scope3.change}
          trend="down"
          icon={Factory}
        />
      </div>

      {/* Search and Filter */}
      <div className="mt-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Rechercher un agriculteur..."
            type="search"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtres
        </Button>
      </div>

      {/* Farmers List */}
      <div className="mt-6 space-y-4">
        {farmers.map((farmer) => (
          <Card key={farmer.id} className="hover:bg-gray-50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold">{farmer.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      {farmer.location}
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="h-4 w-4" />
                      {farmer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      {farmer.email}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {farmer.crops.map((crop, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    farmer.status === 'En règle' 
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {farmer.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Dernier contact: {farmer.lastContact}
                  </span>
                  <Button variant="ghost" size="sm" className="mt-2" asChild>
                    <Link to={`/agriculteurs/${farmer.id}`}>
                      Voir le profil
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
