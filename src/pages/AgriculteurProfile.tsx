import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Phone, Mail, FileText, AlertTriangle, Lightbulb, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { ESGMetrics } from '@/components/dashboard/ESGMetrics';
import { RecentChats } from '@/components/dashboard/RecentChats';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

// Mock data for the farmer profile
const farmerData = {
  id: 1,
  name: "Jean Dupont",
  companyInfo: {
    siret: "123 456 789 00012",
    location: "123 Rue de l'Agriculture, Bourgogne-Franche-Comté",
    owner: "Jean Dupont",
    phone: "06 12 34 56 78",
    email: "jean.dupont@email.com"
  },
  credits: [
    {
      id: "CR001",
      type: "Prêt Équipement",
      amount: "150,000€",
      startDate: "2023-03-15",
      duration: "5 ans",
      status: "En cours",
      nextPayment: "2024-01-15",
      interestRate: "2.5%",
      evolution: [
        { date: '2023-03', remaining: 150000, paid: 0 },
        { date: '2023-06', remaining: 142500, paid: 7500 },
        { date: '2023-09', remaining: 135000, paid: 15000 },
        { date: '2023-12', remaining: 127500, paid: 22500 },
        { date: '2024-03', remaining: 120000, paid: 30000 },
        { date: '2024-06', remaining: 112500, paid: 37500 },
        { date: '2024-09', remaining: 105000, paid: 45000 },
        { date: '2024-12', remaining: 97500, paid: 52500 },
      ]
    },
    {
      id: "CR002",
      type: "Prêt Foncier",
      amount: "300,000€",
      startDate: "2022-06-01",
      duration: "15 ans",
      status: "En cours",
      nextPayment: "2024-01-01",
      interestRate: "1.8%",
      evolution: [
        { date: '2022-06', remaining: 300000, paid: 0 },
        { date: '2022-12', remaining: 290000, paid: 10000 },
        { date: '2023-06', remaining: 280000, paid: 20000 },
        { date: '2023-12', remaining: 270000, paid: 30000 },
        { date: '2024-06', remaining: 260000, paid: 40000 },
        { date: '2024-12', remaining: 250000, paid: 50000 },
      ]
    }
  ],
  esgMetrics: {
    computed: [
      { name: "Émissions GES", value: "45 tCO2e/an", source: "Données exploitation" },
      { name: "Contribution Scope 3", value: "3%", source: "Part du portefeuille", badge: "Moyen" },
      { name: "Biodiversité", value: "72/100", source: "Données exploitation" },
      { name: "Consommation d'eau", value: "2500m³/an", source: "Données exploitation" }
    ],
    assumed: [
      { name: "Impact carbone", value: "Moyen", source: "Estimation" },
      { name: "Pratiques agricoles", value: "Conventionnel+", source: "Estimation" }
    ]
  },
  missingDocuments: [
    { name: "Bilan carbone détaillé", priority: "high" },
    { name: "Plan de transition", priority: "medium" },
    { name: "Certification HVE", priority: "low" }
  ],
  risksOpportunities: {
    risks: [
      { id: 'maelab-risk-soil', title: "Dépendance aux intrants", severity: "high", description: "Fort impact des coûts des intrants sur la rentabilité" },
      { id: 'insurance-risk-coverage', title: "Stress hydrique", severity: "medium", description: "Risque croissant lié au changement climatique" }
    ],
    opportunities: [
      { id: 'maelab-opp-innovation', title: "Transition bio", potential: "high", description: "Marché local porteur pour les produits bio" },
      { id: 'chamber-opp-tech', title: "Diversification cultures", potential: "medium", description: "Potentiel pour cultures à haute valeur ajoutée" }
    ]
  }
};

export function AgriculteurProfile() {
  const { id } = useParams();

  const formatEuro = (value: number) => `${value.toLocaleString()}€`;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{farmerData.name}</h1>
          <p className="text-gray-600">Profil agriculteur</p>
        </div>
        <Button className="bg-[#005E5D] hover:bg-[#004948]">
          <MessageSquare className="w-4 h-4 mr-2" />
          Démarrer une discussion
        </Button>
      </div>

      {/* Company Information Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">SIRET</p>
                  <p className="font-medium">{farmerData.companyInfo.siret}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="font-medium">{farmerData.companyInfo.location}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">{farmerData.companyInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{farmerData.companyInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="credits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="credits">Crédits</TabsTrigger>
          <TabsTrigger value="esg">ESG</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="risks">Risques & Opportunités</TabsTrigger>
          <TabsTrigger value="chat">Historique des échanges</TabsTrigger>
        </TabsList>

        {/* Credits Tab */}
        <TabsContent value="credits" className="space-y-4">
          {farmerData.credits.map((credit) => (
            <Card key={credit.id}>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{credit.type}</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Montant: {credit.amount}</p>
                        <p className="text-sm text-gray-600">Durée: {credit.duration}</p>
                        <p className="text-sm text-gray-600">Taux: {credit.interestRate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        {credit.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">
                        Prochain paiement: {credit.nextPayment}
                      </p>
                    </div>
                  </div>

                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={credit.evolution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickFormatter={formatEuro}
                        />
                        <Tooltip 
                          formatter={(value: number) => formatEuro(value)}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="remaining" 
                          stroke="#ef4444" 
                          name="Restant à payer"
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="paid" 
                          stroke="#22c55e" 
                          name="Montant remboursé"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ESG Tab */}
        <TabsContent value="esg">
          <div className="grid gap-6">
            <Card className="relative">
              {/* Floating Scope 3 Card */}
              <div className="absolute -top-4 right-6 bg-white shadow-lg rounded-lg border border-[#005E5D]/20 p-4 min-w-[200px]">
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-[#005E5D]">Contribution Scope 3</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-[#005E5D]">3%</span>
                    <span className="text-xs px-2 py-1 bg-[#005E5D]/10 text-[#005E5D] rounded-full">
                      Moyen
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Part du portefeuille</p>
                </div>
              </div>

              <CardHeader>
                <CardTitle>Métriques calculées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmerData.esgMetrics.computed
                    .filter(metric => metric.name !== "Contribution Scope 3")
                    .map((metric, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{metric.name}</p>
                        <p className="text-sm text-gray-500">{metric.source}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{metric.value}</span>
                        {metric.badge && (
                          <span className="text-xs px-2 py-1 bg-[#005E5D]/10 text-[#005E5D] rounded-full">
                            {metric.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Estimations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmerData.esgMetrics.assumed.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{metric.name}</p>
                        <p className="text-sm text-gray-500">{metric.source}</p>
                      </div>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {farmerData.missingDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">Document manquant</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Demander
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risks & Opportunities Tab */}
        <TabsContent value="risks">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Risks Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Risques identifiés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmerData.risksOpportunities.risks.map((risk, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{risk.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-200 text-gray-700`}>
                          {risk.severity === 'high' ? 'Élevé' : 'Moyen'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Opportunities Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#005E5D]" />
                  Opportunités identifiées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmerData.risksOpportunities.opportunities.map((opportunity, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{opportunity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-200 text-gray-700`}>
                          {opportunity.potential === 'high' ? 'Fort' : 'Moyen'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA for Business Plan */}
          <div className="mt-8 flex justify-center">
            <Link to={`/agriculteurs/${id}/business-plan`} className="inline-flex items-center gap-2">
              <Button className="bg-[#005E5D] text-white hover:bg-[#005E5D]/90">
                <ExternalLink className="w-4 h-4 mr-2" />
                Voir les détails dans le Business Plan
              </Button>
            </Link>
          </div>
        </TabsContent>

        {/* Chat History Tab */}
        <TabsContent value="chat">
          <Card>
            <CardContent className="p-6">
              <RecentChats maxItems={10} isBankDashboard={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
