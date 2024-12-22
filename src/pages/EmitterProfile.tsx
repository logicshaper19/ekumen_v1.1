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
  },
  'exploitation-martin': {
    name: 'Exploitation Martin',
    id: 'EM-2023-002',
    type: 'Grandes cultures',
    location: {
      region: 'Grand Est',
      department: 'Marne',
      coordinates: { lat: 49.258329, lng: 4.031696 }
    },
    loans: {
      outstanding: 600000,
      types: ['Équipement', 'Foncier', 'Trésorerie'],
      originationDate: '2020-09-01'
    },
    emissions: {
      total: 750,
      rank: 2,
      portfolioContribution: 2.8,
      trend: [
        { year: '2021', emissions: 850 },
        { year: '2022', emissions: 800 },
        { year: '2023', emissions: 750 }
      ],
      breakdown: [
        { source: 'Utilisation d\'engrais', value: 400, percentage: 53.33 },
        { source: 'Machinerie agricole', value: 200, percentage: 26.67 },
        { source: 'Consommation d\'énergie', value: 100, percentage: 13.33 },
        { source: 'Autres sources', value: 50, percentage: 6.67 }
      ]
    },
    practices: {
      current: [
        'Agriculture de précision',
        'Utilisation d\'engrais à libération contrôlée',
        'Système d\'irrigation optimisé'
      ],
      past: [
        'Modernisation du parc de machines (2021)',
        'Installation de capteurs IoT (2020)'
      ],
      improvement: [
        'Adoption de pratiques d\'agriculture régénératrice',
        'Optimisation des cycles de fertilisation',
        'Installation de haies pour la biodiversité'
      ]
    }
  },
  'gaec-des-plaines': {
    name: 'GAEC des Plaines',
    id: 'GP-2023-003',
    type: 'Élevage',
    location: {
      region: 'Nouvelle-Aquitaine',
      department: 'Gironde',
      coordinates: { lat: 44.837789, lng: -0.579180 }
    },
    loans: {
      outstanding: 520000,
      types: ['Équipement', 'Développement'],
      originationDate: '2021-06-15'
    },
    emissions: {
      total: 700,
      rank: 3,
      portfolioContribution: 2.5,
      trend: [
        { year: '2021', emissions: 700 },
        { year: '2022', emissions: 700 },
        { year: '2023', emissions: 700 }
      ],
      breakdown: [
        { source: 'Fermentation entérique', value: 350, percentage: 50 },
        { source: 'Gestion du fumier', value: 175, percentage: 25 },
        { source: 'Production fourragère', value: 125, percentage: 17.86 },
        { source: 'Consommation d\'énergie', value: 50, percentage: 7.14 }
      ]
    },
    practices: {
      current: [
        'Pâturage rotatif',
        'Production de biogaz',
        'Cultures fourragères optimisées'
      ],
      past: [
        'Installation d\'un système de méthanisation (2021)',
        'Amélioration génétique du troupeau (2020)'
      ],
      improvement: [
        'Optimisation de la ration alimentaire',
        'Extension du système de méthanisation',
        'Développement de l\'agroforesterie'
      ]
    }
  },
  'earl-du-soleil': {
    name: 'EARL du Soleil',
    id: 'ES-2023-004',
    type: 'Grandes cultures',
    location: {
      region: 'Occitanie',
      department: 'Haute-Garonne',
      coordinates: { lat: 43.604652, lng: 1.444209 }
    },
    loans: {
      outstanding: 480000,
      types: ['Foncier', 'Modernisation'],
      originationDate: '2022-01-15'
    },
    emissions: {
      total: 650,
      rank: 4,
      portfolioContribution: 2.2,
      trend: [
        { year: '2021', emissions: 690 },
        { year: '2022', emissions: 670 },
        { year: '2023', emissions: 650 }
      ],
      breakdown: [
        { source: 'Utilisation d\'engrais', value: 300, percentage: 46.15 },
        { source: 'Machinerie agricole', value: 200, percentage: 30.77 },
        { source: 'Irrigation', value: 100, percentage: 15.38 },
        { source: 'Autres sources', value: 50, percentage: 7.7 }
      ]
    },
    practices: {
      current: [
        'Agriculture de conservation',
        'Irrigation goutte à goutte',
        'Utilisation d\'énergies renouvelables'
      ],
      past: [
        'Installation de panneaux solaires (2022)',
        'Conversion en agriculture de conservation (2021)'
      ],
      improvement: [
        'Développement de la couverture végétale permanente',
        'Optimisation du système d\'irrigation',
        'Installation de bandes enherbées'
      ]
    }
  },
  'scea-des-vignes': {
    name: 'SCEA des Vignes',
    id: 'SV-2023-005',
    type: 'Viticulture',
    location: {
      region: 'Bourgogne-Franche-Comté',
      department: 'Côte-d\'Or',
      coordinates: { lat: 47.322047, lng: 5.041480 }
    },
    loans: {
      outstanding: 550000,
      types: ['Foncier', 'Équipement'],
      originationDate: '2021-08-20'
    },
    emissions: {
      total: 600,
      rank: 5,
      portfolioContribution: 2.0,
      trend: [
        { year: '2021', emissions: 650 },
        { year: '2022', emissions: 620 },
        { year: '2023', emissions: 600 }
      ],
      breakdown: [
        { source: 'Machinerie viticole', value: 250, percentage: 41.67 },
        { source: 'Traitements phytosanitaires', value: 200, percentage: 33.33 },
        { source: 'Vinification', value: 100, percentage: 16.67 },
        { source: 'Autres sources', value: 50, percentage: 8.33 }
      ]
    },
    practices: {
      current: [
        'Viticulture raisonnée',
        'Enherbement inter-rangs',
        'Récupération des eaux de pluie'
      ],
      past: [
        'Conversion en lutte raisonnée (2021)',
        'Installation de stations météo connectées (2022)'
      ],
      improvement: [
        'Transition vers la viticulture biologique',
        'Installation de panneaux solaires',
        'Optimisation de l\'irrigation'
      ]
    }
  },
  'ferme-bio-vallee': {
    name: 'Ferme Bio Vallée',
    id: 'FBV-2023-006',
    type: 'Maraîchage',
    location: {
      region: 'Auvergne-Rhône-Alpes',
      department: 'Drôme',
      coordinates: { lat: 44.756111, lng: 5.369780 }
    },
    loans: {
      outstanding: 420000,
      types: ['Équipement', 'Développement'],
      originationDate: '2022-03-10'
    },
    emissions: {
      total: 550,
      rank: 6,
      portfolioContribution: 1.8,
      trend: [
        { year: '2021', emissions: 580 },
        { year: '2022', emissions: 560 },
        { year: '2023', emissions: 550 }
      ],
      breakdown: [
        { source: 'Serres chauffées', value: 250, percentage: 45.45 },
        { source: 'Transport', value: 150, percentage: 27.27 },
        { source: 'Irrigation', value: 100, percentage: 18.18 },
        { source: 'Autres sources', value: 50, percentage: 9.1 }
      ]
    },
    practices: {
      current: [
        'Agriculture biologique certifiée',
        'Système d\'irrigation goutte à goutte',
        'Vente en circuit court'
      ],
      past: [
        'Installation de serres bioclimatiques (2022)',
        'Mise en place du compostage (2021)'
      ],
      improvement: [
        'Installation de panneaux photovoltaïques',
        'Optimisation du stockage',
        'Développement de l\'agroforesterie'
      ]
    }
  },
  'earl-des-cereales': {
    name: 'EARL des Céréales',
    id: 'EC-2023-007',
    type: 'Grandes cultures',
    location: {
      region: 'Centre-Val de Loire',
      department: 'Eure-et-Loir',
      coordinates: { lat: 48.443854, lng: 1.489012 }
    },
    loans: {
      outstanding: 580000,
      types: ['Foncier', 'Équipement'],
      originationDate: '2021-11-15'
    },
    emissions: {
      total: 520,
      rank: 7,
      portfolioContribution: 1.7,
      trend: [
        { year: '2021', emissions: 540 },
        { year: '2022', emissions: 530 },
        { year: '2023', emissions: 520 }
      ],
      breakdown: [
        { source: 'Fertilisation', value: 250, percentage: 48.08 },
        { source: 'Machinerie agricole', value: 150, percentage: 28.85 },
        { source: 'Stockage', value: 70, percentage: 13.46 },
        { source: 'Autres sources', value: 50, percentage: 9.61 }
      ]
    },
    practices: {
      current: [
        'Agriculture de précision',
        'Rotation des cultures',
        'Techniques culturales simplifiées'
      ],
      past: [
        'Acquisition de GPS RTK (2022)',
        'Installation de stockage ventilé (2021)'
      ],
      improvement: [
        'Développement des cultures intermédiaires',
        'Optimisation de la fertilisation',
        'Installation de haies'
      ]
    }
  },
  'ferme-laitiere-nord': {
    name: 'Ferme Laitière du Nord',
    id: 'FLN-2023-008',
    type: 'Élevage laitier',
    location: {
      region: 'Hauts-de-France',
      department: 'Nord',
      coordinates: { lat: 50.629250, lng: 3.057256 }
    },
    loans: {
      outstanding: 490000,
      types: ['Équipement', 'Modernisation'],
      originationDate: '2022-02-01'
    },
    emissions: {
      total: 500,
      rank: 8,
      portfolioContribution: 1.6,
      trend: [
        { year: '2021', emissions: 520 },
        { year: '2022', emissions: 510 },
        { year: '2023', emissions: 500 }
      ],
      breakdown: [
        { source: 'Fermentation entérique', value: 250, percentage: 50 },
        { source: 'Gestion des effluents', value: 150, percentage: 30 },
        { source: 'Production fourragère', value: 60, percentage: 12 },
        { source: 'Autres sources', value: 40, percentage: 8 }
      ]
    },
    practices: {
      current: [
        'Robot de traite',
        'Méthanisation des effluents',
        'Production fourragère optimisée'
      ],
      past: [
        'Installation robot de traite (2022)',
        'Rénovation bâtiment d\'élevage (2021)'
      ],
      improvement: [
        'Optimisation de l\'alimentation',
        'Extension de la méthanisation',
        'Production d\'énergie solaire'
      ]
    }
  },
  'scea-avicole': {
    name: 'SCEA Avicole',
    id: 'SA-2023-009',
    type: 'Élevage avicole',
    location: {
      region: 'Pays de la Loire',
      department: 'Vendée',
      coordinates: { lat: 46.670511, lng: -1.426442 }
    },
    loans: {
      outstanding: 460000,
      types: ['Équipement', 'Développement'],
      originationDate: '2021-09-15'
    },
    emissions: {
      total: 480,
      rank: 9,
      portfolioContribution: 1.5,
      trend: [
        { year: '2021', emissions: 500 },
        { year: '2022', emissions: 490 },
        { year: '2023', emissions: 480 }
      ],
      breakdown: [
        { source: 'Chauffage bâtiments', value: 200, percentage: 41.67 },
        { source: 'Gestion des effluents', value: 150, percentage: 31.25 },
        { source: 'Alimentation', value: 80, percentage: 16.67 },
        { source: 'Autres sources', value: 50, percentage: 10.41 }
      ]
    },
    practices: {
      current: [
        'Ventilation optimisée',
        'Isolation performante',
        'Gestion technique centralisée'
      ],
      past: [
        'Installation de chaudières biomasse (2022)',
        'Rénovation isolation (2021)'
      ],
      improvement: [
        'Production d\'énergie photovoltaïque',
        'Optimisation de l\'alimentation',
        'Valorisation des effluents'
      ]
    }
  },
  'gaec-montagne': {
    name: 'GAEC de la Montagne',
    id: 'GM-2023-010',
    type: 'Élevage ovin',
    location: {
      region: 'Provence-Alpes-Côte d\'Azur',
      department: 'Hautes-Alpes',
      coordinates: { lat: 44.558910, lng: 6.079803 }
    },
    loans: {
      outstanding: 400000,
      types: ['Foncier', 'Équipement'],
      originationDate: '2022-04-01'
    },
    emissions: {
      total: 450,
      rank: 10,
      portfolioContribution: 1.4,
      trend: [
        { year: '2021', emissions: 470 },
        { year: '2022', emissions: 460 },
        { year: '2023', emissions: 450 }
      ],
      breakdown: [
        { source: 'Fermentation entérique', value: 200, percentage: 44.44 },
        { source: 'Gestion des pâturages', value: 150, percentage: 33.33 },
        { source: 'Transport', value: 60, percentage: 13.33 },
        { source: 'Autres sources', value: 40, percentage: 8.9 }
      ]
    },
    practices: {
      current: [
        'Pastoralisme',
        'Production fourragère locale',
        'Certification HVE'
      ],
      past: [
        'Acquisition de clôtures mobiles (2022)',
        'Amélioration génétique (2021)'
      ],
      improvement: [
        'Développement de l\'agroforesterie',
        'Optimisation des parcours',
        'Production d\'énergie renouvelable'
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
