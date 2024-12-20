import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface RecentChatsProps {
  maxItems?: number;
  isBankDashboard?: boolean;
}

// Mock data for recent chats
const recentChats = [
  {
    id: 1,
    farmerId: "f1",
    farmerName: "Jean Dupont",
    location: "Marmande, 47200",
    lastMessage: "D'accord, je vais préparer les documents demandés pour le dossier de financement.",
    timestamp: "Il y a 30 min",
    unread: true,
  },
  {
    id: 2,
    farmerId: "f2",
    farmerName: "Marie Martin",
    location: "Tonneins, 47400",
    lastMessage: "Merci pour les informations concernant les nouvelles options de crédit.",
    timestamp: "Il y a 2h",
    unread: false,
  },
  {
    id: 3,
    farmerId: "f3",
    farmerName: "Pierre Dubois",
    location: "Agen, 47000",
    lastMessage: "Pouvons-nous planifier une visite de l'exploitation la semaine prochaine ?",
    timestamp: "Il y a 5h",
    unread: true,
  },
  {
    id: 4,
    farmerId: "f4",
    farmerName: "Sophie Lambert",
    location: "Villeneuve-sur-Lot, 47300",
    lastMessage: "Le rendez-vous de demain à 14h est confirmé.",
    timestamp: "Hier",
    unread: false,
  }
];

export function RecentChats({ maxItems, isBankDashboard = false }: RecentChatsProps) {
  const displayedChats = maxItems ? recentChats.slice(0, maxItems) : recentChats;

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-6">
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex-1">
            {displayedChats.map((chat) => (
              <Link
                key={chat.id}
                to={isBankDashboard ? `/agriculteurs/${chat.farmerId}` : `/messages/${chat.id}`}
                className="block"
              >
                <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{chat.farmerName}</h3>
                    <span className="text-sm text-gray-500">{chat.timestamp}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {chat.location}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{chat.lastMessage}</p>
                  {chat.unread && (
                    <div className="flex items-center mt-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      <span className="text-sm text-blue-500 font-medium">Nouveau message</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {maxItems && recentChats.length > maxItems && (
            <div className="pt-4 border-t mt-auto">
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/messages" className="flex items-center justify-center">
                  <span>Voir toutes les conversations</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
