import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Share2, BookmarkPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useToast } from "@/components/ui/use-toast";

// Use the same data structure from RiskOpportunityEvolution
const data = {
  'maelab-risk-soil': {
    id: 'maelab-risk-soil',
    type: 'risk',
    title: 'Dégradation des Sols',
    stakeholder: 'Exploitation',
    description: 'Perte de fertilité des sols due aux pratiques intensives',
    impact: {
      withAction: '+5% rendement/an\n• Amélioration structure du sol\n• Réduction des intrants\n• Biodiversité enrichie',
      withoutAction: '-15% rendement/an\n• Erosion continue\n• Coûts croissants des intrants\n• Perte de biodiversité'
    },
    recommendations: [
      'Mettre en place une rotation des cultures plus diversifiée',
      'Réduire le travail du sol',
      'Implanter des couverts végétaux'
    ],
    evolution: [
      { date: '2024', value: 7, probability: 75 },
      { date: '2025', value: 6.5, probability: 70 },
      { date: '2026', value: 6, probability: 65 },
      { date: '2027', value: 5.5, probability: 62 },
      { date: '2028', value: 5, probability: 60 },
      { date: '2029', value: 4.5, probability: 58 },
      { date: '2030', value: 4, probability: 55 },
      { date: '2031', value: 3.5, probability: 52 },
      { date: '2032', value: 3, probability: 50 },
      { date: '2033', value: 2.5, probability: 48 }
    ],
    ctaLink: 'https://agriculture.gouv.fr/sols'
  }
};

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-600">Impact: {payload[0].value}</p>
        <p className="text-sm text-gray-600">Probabilité: {payload[1].value}%</p>
      </div>
    );
  }
  return null;
}

export function RiskOpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const item = data[id as keyof typeof data];

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien a été copié dans votre presse-papiers",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
            <p className="text-gray-600">{item.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="outline">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            {item.ctaLink && (
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                En savoir plus
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Impact Cards */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avec action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-gray-600">
                {item.impact.withAction}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sans action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-gray-600">
                {item.impact.withoutAction}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evolution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution de l'impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.evolution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="value"
                    name="Impact"
                    stroke="#005E5D"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="probability"
                    name="Probabilité"
                    stroke="#94A3B8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recommandations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {item.recommendations.map((recommendation, index) => (
              <li key={index} className="text-gray-600">{recommendation}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
