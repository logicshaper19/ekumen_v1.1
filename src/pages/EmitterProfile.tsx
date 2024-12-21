import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MapPin, Building2, TrendingUp, ArrowUpRight, ArrowDownRight, Minus, Download, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// Types
interface Location {
  region: string;
  department: string;
  coordinates: { lat: number; lng: number; };
}

interface Loan {
  outstanding: number;
  types: string[];
  originationDate: string;
}

interface EmissionBreakdown {
  source: string;
  value: number;
  percentage: number;
}

interface EmissionData {
  total: number;
  rank: number;
  portfolioContribution: number;
  trend: { year: string; emissions: number; }[];
  breakdown: EmissionBreakdown[];
}

interface Practices {
  current: string[];
  past: string[];
  improvement: string[];
}

interface EmitterData {
  name: string;
  id: string;
  type: string;
  location: Location;
  loans: Loan;
  emissions: EmissionData;
  practices: Practices;
}

type EmitterDataMap = {
  [key: string]: EmitterData;
};

// Mock data for the emitter profile
const mockEmitterData: EmitterDataMap = {
  'ferme-durand': {
    name: 'Ferme Durand',
    id: 'FD-2023-001',
    type: 'Élevage',
    location: {
      region: 'Bretagne',
      department: 'Ille-et-Vilaine',
      coordinates: { lat: 48.117266, lng: -1.677793 }
    },
    loans: {
      outstanding: 450000,
      types: ['Équipement', 'Foncier'],
      originationDate: '2021-03-15'
    },
    emissions: {
      total: 800,
      rank: 1,
      portfolioContribution: 3.2,
      trend: [
        { year: '2021', emissions: 700 },
        { year: '2022', emissions: 750 },
        { year: '2023', emissions: 800 }
      ],
      breakdown: [
        { source: 'Fermentation entérique', value: 450, percentage: 56.25 },
        { source: 'Gestion du fumier', value: 200, percentage: 25 },
        { source: 'Consommation d\'énergie', value: 100, percentage: 12.5 },
        { source: 'Utilisation des terres', value: 50, percentage: 6.25 }
      ]
    },
    practices: {
      current: [
        'Système de gestion du fumier amélioré',
        'Panneaux solaires installés en 2022',
        'Programme de rotation des cultures'
      ],
      past: [
        'Installation de LED pour l\'éclairage (2021)',
        'Adoption de pratiques de labour minimal (2020)'
      ],
      improvement: [
        'Potentiel de réduction de 15% des émissions via l\'optimisation de l\'alimentation',
        'Installation possible d\'un digesteur anaérobie',
        'Expansion des pratiques de séquestration du carbone'
      ]
    }
  }
};

const COLORS = ['#005E5D', '#147F7D', '#28A19D', '#3BC3BD'];

export function EmitterProfile() {
  const { id } = useParams<{ id: string }>();
  const emitter = id ? mockEmitterData[id] : undefined;

  if (!emitter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold">Exploitation non trouvée</h1>
        <p className="text-muted-foreground">L'exploitation que vous recherchez n'existe pas ou n'est plus disponible.</p>
        <Link 
          to="/esg-dashboard" 
          className="text-sm text-[#005E5D] hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          to="/esg-dashboard" 
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour au tableau de bord
        </Link>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Télécharger le rapport
        </Button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{emitter.name}</h1>
        <div className="flex items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span>{emitter.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{emitter.location.department}, {emitter.location.region}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Loan Information */}
          <Card>
            <CardHeader>
              <CardTitle>Financement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Encours total</p>
                  <p className="text-2xl font-bold">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(emitter.loans.outstanding)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Types de prêts</p>
                  <p className="font-medium">{emitter.loans.types.join(' • ')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date d'origine</p>
                  <p className="font-medium">
                    {new Date(emitter.loans.originationDate).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emissions Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé des émissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground">Émissions totales</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{emitter.emissions.total} tCO2e</p>
                    {(() => {
                      const trend = emitter.emissions.trend;
                      const currentYear = trend[trend.length - 1].emissions;
                      const previousYear = trend[trend.length - 2].emissions;
                      const change = ((currentYear - previousYear) / previousYear) * 100;
                      const changeAbs = Math.abs(change).toFixed(1);
                      
                      return change > 0 ? (
                        <div className="flex items-center text-sm text-red-500">
                          <ArrowUpRight className="h-4 w-4" />
                          <span>+{changeAbs}%</span>
                        </div>
                      ) : change < 0 ? (
                        <div className="flex items-center text-sm text-green-500">
                          <ArrowDownRight className="h-4 w-4" />
                          <span>-{changeAbs}%</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-sm text-gray-500">
                          <Minus className="h-4 w-4" />
                          <span>0%</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Classement</p>
                    <p className="font-bold">#{emitter.emissions.rank}</p>
                    <p className="text-sm text-muted-foreground">des émetteurs</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contribution</p>
                    <p className="font-bold">{emitter.emissions.portfolioContribution}%</p>
                    <p className="text-sm text-muted-foreground">du portefeuille</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-4">Évolution des émissions</p>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={emitter.emissions.trend}
                        margin={{ top: 5, right: 5, bottom: 20, left: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E0" />
                        <XAxis 
                          dataKey="year" 
                          tick={{ fontSize: 11 }}
                          axisLine={true}
                          tickLine={true}
                          label={{ 
                            value: 'Année', 
                            position: 'bottom',
                            offset: 10,
                            fontSize: 11
                          }}
                        />
                        <YAxis 
                          tick={{ fontSize: 11 }}
                          axisLine={true}
                          tickLine={true}
                          label={{ 
                            value: 'tCO2e', 
                            angle: -90, 
                            position: 'left',
                            offset: 0,
                            fontSize: 11
                          }}
                        />
                        <Tooltip 
                          contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                          formatter={(value) => [`${value} tCO2e`, 'Émissions']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="emissions" 
                          stroke="#005E5D" 
                          strokeWidth={2}
                          dot={true}
                          activeDot={{ r: 4, fill: "#005E5D" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Emissions Breakdown */}
          <Card className="bg-[#F5F5F0]">
            <CardHeader>
              <CardTitle>Répartition des émissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-[300px] bg-[#F5F5F0]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emitter.emissions.breakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {emitter.emissions.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: '#F5F5F0', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '6px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value, name, props) => [
                          `${value} tCO2e (${props.payload.percentage}%)`,
                          props.payload.source
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  {emitter.emissions.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{item.source}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {item.value} tCO2e ({item.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ESG Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Pratiques ESG</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Pratiques actuelles</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {emitter.practices.current.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Initiatives passées</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {emitter.practices.past.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Potentiel d'amélioration</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {emitter.practices.improvement.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
