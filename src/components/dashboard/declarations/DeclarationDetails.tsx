import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, InfoIcon, Users, Building2, Mail, Phone, Loader2, Send, HelpCircle, FileText, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ComplianceChart, TrendChart, DistributionChart } from '@/components/charts/DeclarationCharts';
import { chartData, defaultChartData } from '@/data/declarationChartData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CapturedInfo {
  label: string;
  value: string;
}

interface PendingInfo {
  label: string;
  description?: string;
}

interface ResolutionStep {
  title: string;
  description: string;
  dueDate: string;
  priority: 'Urgent' | 'Important' | 'Normal';
}

interface RegulationInfo {
  currentRegulation: Regulation;
  upcomingRegulation?: Regulation;
}

interface Regulation {
  title: string;
  description: string;
  effectiveDate: string;
  source?: string;
  changes?: string[];
}

interface DeclarationData {
  id: string;
  title: string;
  description: string;
  frequency: string;
  dueDate: string;
  progress: number;
  isRegulated?: boolean;
  regulationInfo?: RegulationInfo;
  capturedInfo: CapturedInfo[];
  pendingInfo: PendingInfo[];
  resolutionSteps: ResolutionStep[];
}

const declarations: Record<string, DeclarationData> = {
  'declaration-activite': {
    id: 'declaration-activite',
    title: 'Déclaration d\'Activité Agricole',
    description: 'Déclaration annuelle des activités agricoles et informations sur l\'exploitation',
    frequency: 'Annuel',
    dueDate: '31 Janvier 2025',
    progress: 75,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Type d\'activité', value: 'Polyculture-élevage' },
      { label: 'Surface totale', value: '150 hectares' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [
      { label: 'Mise à jour des données', description: 'Actualisation des informations pour 2024' }
    ],
    resolutionSteps: [
      {
        title: 'Vérification des données',
        description: 'Revue des informations déclarées',
        dueDate: '2025-01-15',
        priority: 'Normal'
      }
    ]
  },
  'pac': {
    id: 'pac',
    title: 'PAC - Politique Agricole Commune',
    description: 'Déclaration pour le régime de paiement unique de la PAC',
    frequency: 'Annuel',
    dueDate: '15 Mai 2025',
    progress: 0,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'PAC 2023-2027',
        description: 'Nouvelle réforme de la PAC',
        effectiveDate: '2023-01-01',
        source: 'Commission Européenne'
      }
    },
    capturedInfo: [
      { label: 'Surface déclarée', value: '150 hectares' },
      { label: 'Droits à paiement', value: '145 DPB' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'carbone': {
    id: 'carbone',
    title: 'Bilan Carbone',
    description: 'Évaluation de l\'empreinte carbone de l\'exploitation',
    frequency: 'Variable',
    dueDate: 'Variable',
    progress: 30,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Dernier bilan', value: '2023' },
      { label: 'Émissions totales', value: '250 tCO2e' },
      { label: 'Fréquence', value: 'Variable' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'efa': {
    id: 'efa',
    title: 'Zones de Focus Écologiques (EFA)',
    description: 'Déclaration des surfaces d\'intérêt écologique',
    frequency: 'Annuel',
    dueDate: '15 Mai 2025',
    progress: 0,
    isRegulated: true,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Surface EFA', value: '7.5 hectares' },
      { label: 'Types EFA', value: 'Haies, Jachères' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'eau': {
    id: 'eau',
    title: 'Déclaration d\'Eau Agricole',
    description: 'Déclaration de l\'utilisation d\'eau à des fins agricoles',
    frequency: 'Variable',
    dueDate: 'Variable',
    progress: 50,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Volume annuel', value: '25000 m³' },
      { label: 'Type d\'irrigation', value: 'Aspersion' },
      { label: 'Fréquence', value: 'Variable' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'identification-animaux': {
    id: 'identification-animaux',
    title: 'Identification et Enregistrement des Animaux',
    description: 'Suivi et déclaration des mouvements d\'animaux',
    frequency: 'Continu',
    dueDate: 'Continu',
    progress: 100,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Nombre d\'animaux', value: '120' },
      { label: 'Type d\'élevage', value: 'Bovin laitier' },
      { label: 'Fréquence', value: 'Continu' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'phytosanitaires': {
    id: 'phytosanitaires',
    title: 'Rapport sur l\'Utilisation des Produits Phytosanitaires',
    description: 'Déclaration annuelle sur l\'utilisation des produits phytosanitaires',
    frequency: 'Annuel',
    dueDate: '31 Décembre 2024',
    progress: 98,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Plan Écophyto II+',
        description: 'Réglementation sur l\'utilisation des produits phytopharmaceutiques',
        effectiveDate: '2023-01-01',
        source: 'Ministère de l\'Agriculture'
      }
    },
    capturedInfo: [
      { label: 'Produits utilisés', value: 'Herbicides, Fongicides' },
      { label: 'Surface traitée', value: '85 hectares' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [
      { label: 'Registre phytosanitaire', description: 'Mise à jour finale pour 2024' }
    ],
    resolutionSteps: [
      {
        title: 'Vérification finale',
        description: 'Contrôle des données saisies',
        dueDate: '2024-12-20',
        priority: 'Normal'
      }
    ]
  },
  'conformite-sante-securite': {
    id: 'conformite-sante-securite',
    title: 'Conformité en Santé et Sécurité',
    description: 'Déclaration annuelle de conformité aux normes de santé et sécurité',
    frequency: 'Annuel',
    dueDate: '31 Décembre 2024',
    progress: 98,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Code du travail agricole',
        description: 'Dispositions relatives à la santé et sécurité',
        effectiveDate: '2023-01-01',
        source: 'Ministère du Travail'
      }
    },
    capturedInfo: [
      { label: 'Nombre d\'employés', value: '12' },
      { label: 'Formation sécurité', value: 'Complétée' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [
      { label: 'Registre de sécurité', description: 'Dernière mise à jour à effectuer' }
    ],
    resolutionSteps: [
      {
        title: 'Revue finale',
        description: 'Vérification des documents obligatoires',
        dueDate: '2024-12-25',
        priority: 'Normal'
      }
    ]
  },
  'cotisation': {
    id: 'cotisation',
    title: 'Cotisation Agricole (Déclaration des Salaires)',
    description: 'Déclaration mensuelle des salaires des employés agricoles',
    frequency: 'Mensuel',
    dueDate: '5 du mois suivant',
    progress: 100,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Nombre d\'employés', value: '12' },
      { label: 'Masse salariale', value: '35000€' },
      { label: 'Fréquence', value: 'Mensuel' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'tva': {
    id: 'tva',
    title: 'Déclaration de TVA Agricole',
    description: 'Déclaration trimestrielle de la TVA pour les activités agricoles',
    frequency: 'Trimestriel',
    dueDate: '20 du mois suivant',
    progress: 75,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Régime TVA', value: 'Réel' },
      { label: 'Période', value: 'T4 2024' },
      { label: 'Fréquence', value: 'Trimestriel' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'foncier-rural': {
    id: 'foncier-rural',
    title: 'Foncier Rural',
    description: 'Déclaration relative aux terres agricoles et leur utilisation',
    frequency: 'Variable',
    dueDate: 'Variable',
    progress: 40,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Surface totale', value: '150 hectares' },
      { label: 'Type de terres', value: 'Terres arables' },
      { label: 'Fréquence', value: 'Variable' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'aides': {
    id: 'aides',
    title: 'Demandes d\'Aides et Subventions',
    description: 'Demandes diverses d\'aides et subventions agricoles',
    frequency: 'Variable',
    dueDate: 'Variable',
    progress: 25,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Types d\'aides', value: 'Investissement, Modernisation' },
      { label: 'Montant demandé', value: '75000€' },
      { label: 'Fréquence', value: 'Variable' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'bien-etre': {
    id: 'bien-etre',
    title: 'Déclaration de Bien-être Animal',
    description: 'Suivi continu du bien-être des animaux de l\'exploitation',
    frequency: 'Continu',
    dueDate: 'Continu',
    progress: 100,
    isRegulated: false,
    regulationInfo: undefined,
    capturedInfo: [
      { label: 'Nombre d\'animaux', value: '120' },
      { label: 'Type d\'élevage', value: 'Bovin laitier' },
      { label: 'Fréquence', value: 'Continu' }
    ],
    pendingInfo: [],
    resolutionSteps: []
  },
  'engrais-sols': {
    id: 'engrais-sols',
    title: 'Gestion des Engrais et Sols',
    description: 'Déclaration annuelle sur la gestion des engrais et la qualité des sols',
    frequency: 'Annuel',
    dueDate: '31 Décembre 2024',
    progress: 98,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Directive Nitrates',
        description: 'Réglementation sur l\'utilisation des engrais azotés',
        effectiveDate: '2023-01-01',
        source: 'Ministère de l\'Agriculture'
      }
    },
    capturedInfo: [
      { label: 'Surface traitée', value: '120 hectares' },
      { label: 'Types d\'engrais', value: 'Azotés, Phosphatés' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [
      { label: 'Analyses de sol', description: 'Résultats d\'analyses récents à fournir' }
    ],
    resolutionSteps: [
      {
        title: 'Mise à jour du registre',
        description: 'Compléter le registre d\'épandage',
        dueDate: '2024-12-15',
        priority: 'Normal'
      }
    ]
  },
  'certification-qualite': {
    id: 'certification-qualite',
    title: "Certification Qualité",
    description: "Déclaration des pratiques agricoles pour la certification qualité Carrefour",
    frequency: 'Annuel',
    dueDate: '31 Mars 2025',
    progress: 45,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Certification Qualité Carrefour',
        description: 'Standards de qualité pour les produits agricoles',
        effectiveDate: '2024-01-01',
        source: 'Carrefour'
      }
    },
    capturedInfo: [
      { label: 'Acheteur', value: 'Carrefour' },
      { label: 'Type de certification', value: 'Qualité produit' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [
      { label: 'Documentation des pratiques', description: 'Mise à jour des procédures' },
      { label: 'Audit qualité', description: 'Préparation pour l\'audit annuel' }
    ],
    resolutionSteps: [
      {
        title: 'Préparation documentation',
        description: 'Rassembler tous les documents requis',
        dueDate: '2025-02-15',
        priority: 'Important'
      },
      {
        title: 'Audit interne',
        description: 'Réaliser un audit interne préparatoire',
        dueDate: '2025-03-01',
        priority: 'Urgent'
      }
    ]
  },
  'certification-agriculture-durable': {
    id: 'certification-agriculture-durable',
    title: "Certification Agriculture Durable",
    description: "Documentation des pratiques durables pour l'assurance agricole",
    frequency: 'Annuel',
    dueDate: '30 Juin 2025',
    progress: 20,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Standards Agriculture Durable',
        description: 'Critères de durabilité pour l\'assurance agricole',
        effectiveDate: '2024-01-01',
        source: 'Groupama'
      }
    },
    capturedInfo: [
      { label: 'Assureur', value: 'Groupama' },
      { label: 'Type de certification', value: 'Agriculture durable' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [
      { label: 'Évaluation des pratiques', description: 'Analyse des pratiques durables' }
    ],
    resolutionSteps: [
      {
        title: 'Évaluation initiale',
        description: 'Évaluer les pratiques actuelles',
        dueDate: '2025-04-15',
        priority: 'Normal'
      }
    ]
  },
  'label-rouge': {
    id: 'label-rouge',
    title: "Label Rouge",
    description: "Certification pour le Label Rouge - qualité supérieure",
    frequency: 'Annuel',
    dueDate: '30 Septembre 2025',
    progress: 0,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Cahier des charges Label Rouge',
        description: 'Exigences pour la certification Label Rouge',
        effectiveDate: '2024-01-01',
        source: 'INAO'
      }
    },
    capturedInfo: [
      { label: 'Organisme', value: 'Label Rouge' },
      { label: 'Type de certification', value: 'Qualité supérieure' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [
      { label: 'Cahier des charges', description: 'Étude du cahier des charges' },
      { label: 'Plan de contrôle', description: 'Élaboration du plan de contrôle' }
    ],
    resolutionSteps: [
      {
        title: 'Analyse des exigences',
        description: 'Étudier les exigences Label Rouge',
        dueDate: '2025-07-01',
        priority: 'Important'
      }
    ]
  },
  'certification-bio': {
    id: 'certification-bio',
    title: "Certification Bio",
    description: "Documentation pour la certification agriculture biologique",
    frequency: 'Annuel',
    dueDate: '31 Octobre 2025',
    progress: 10,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Réglementation Bio UE',
        description: 'Règlement européen sur l\'agriculture biologique',
        effectiveDate: '2024-01-01',
        source: 'Union Européenne'
      }
    },
    capturedInfo: [
      { label: 'Distributeur', value: 'Biocoop' },
      { label: 'Type de certification', value: 'Agriculture biologique' },
      { label: 'Fréquence', value: 'Annuel' }
    ],
    pendingInfo: [
      { label: 'Plan de conversion', description: 'Élaboration du plan de conversion' },
      { label: 'Contrôle initial', description: 'Préparation au contrôle initial' }
    ],
    resolutionSteps: [
      {
        title: 'Plan de conversion',
        description: 'Élaborer le plan de conversion bio',
        dueDate: '2025-08-15',
        priority: 'Urgent'
      }
    ]
  },
};

export function DeclarationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [helpDialogOpen, setHelpDialogOpen] = React.useState(false);
  const [selectedHelper, setSelectedHelper] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState('');

  const helpers = [
    { id: 'chambre', name: 'Chambre d\'Agriculture', icon: Building2 },
    { id: 'bank', name: 'Ekumen Bank', icon: Building },
    { id: 'coop', name: 'Coopérative', icon: Users },
  ];

  const handleBack = () => {
    navigate('/reglementations');
  };

  const handleHelperSelect = (helperId: string) => {
    setSelectedHelper(helperId);
    setHelpDialogOpen(true);
  };

  const handleSendMessage = () => {
    // Here we would handle sending the message
    console.log('Sending message to:', selectedHelper);
    console.log('Message:', message);
    setHelpDialogOpen(false);
    setMessage('');
    setSelectedHelper(null);
  };

  const declaration = id ? declarations[id] : null;

  if (!declaration) {
    return (
      <div className="container mx-auto py-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux réglementations
        </Button>
        <h2 className="text-xl font-semibold text-red-600">Déclaration non trouvée</h2>
        <p className="mt-2 text-gray-600">La déclaration que vous recherchez n'existe pas.</p>
        <p className="mt-2 text-gray-500">ID: {id}</p>
      </div>
    );
  }

  const charts = chartData[id as keyof typeof chartData] || defaultChartData;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux réglementaires
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">{declaration.title}</h1>

      {/* Top row: Description and Summary side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{declaration.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes de synthèse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">Points clés à retenir:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {declaration.capturedInfo.map((info, index) => (
                <li key={index}>{info.label}: {info.value}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>État de Conformité</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplianceChart data={charts.compliance} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Évolution Mensuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={charts.usage || charts.monthly} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2 bg-[#F5F5F0]">
          <CardHeader>
            <CardTitle>Répartition par Type</CardTitle>
          </CardHeader>
          <CardContent>
            <DistributionChart data={charts.distribution} />
          </CardContent>
        </Card>
      </div>

      {/* Evolution and Risks side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolutions et changements</CardTitle>
          </CardHeader>
          <CardContent>
            {declaration.regulationInfo?.currentRegulation && (
              <div className="space-y-2">
                <h3 className="font-medium">{declaration.regulationInfo.currentRegulation.title}</h3>
                <p className="text-gray-600">{declaration.regulationInfo.currentRegulation.description}</p>
                {declaration.regulationInfo.currentRegulation.changes && (
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {declaration.regulationInfo.currentRegulation.changes.map((change, index) => (
                      <li key={index}>{change}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Risques pour mon exploitation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {declaration.resolutionSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  {step.priority === 'Urgent' ? (
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  ) : step.priority === 'Important' ? (
                    <InfoIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    <p className="text-sm text-gray-500">Échéance: {step.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="mb-2">
            <HelpCircle className="w-8 h-8 mx-auto text-teal-600 mb-2" />
            <h3 className="text-lg font-medium">Besoin d'aide?</h3>
            <p className="text-sm text-gray-600 mb-4">Obtenez de l'aide d'un conseiller expert</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full bg-white hover:bg-teal-700 hover:text-white transition-colors"
              >
                Besoin d'aide
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px]">
              {helpers.map((helper) => (
                <DropdownMenuItem 
                  key={helper.id} 
                  onClick={() => handleHelperSelect(helper.id)}
                  className="flex items-center py-2"
                >
                  <helper.icon className="mr-2 h-4 w-4" />
                  <span>{helper.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="mb-2">
            <FileText className="w-8 h-8 mx-auto text-teal-600 mb-2" />
            <h3 className="text-lg font-medium">Remplir un formulaire?</h3>
            <p className="text-sm text-gray-600 mb-4">Accédez au formulaire détaillé et à l'aide au remplissage</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate(`/declarations/${id}/form`)}
            className="w-full bg-white hover:bg-teal-700 hover:text-white transition-colors"
          >
            Accéder au formulaire
          </Button>
        </div>
      </div>

      {/* Help Dialog */}
      <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedHelper === 'chambre' ? 'Chambre d\'agriculture' : 
               selectedHelper === 'bank' ? 'Ekumen Bank' : 'Coopérative'}
            </DialogTitle>
            <DialogDescription>
              {selectedHelper === 'chambre' ? (
                <div className="space-y-4">
                  <p>La Chambre d'agriculture vous accompagne dans vos démarches administratives et réglementaires.</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>contact@chambre-agriculture.fr</span>
                  </div>
                </div>
              ) : selectedHelper === 'bank' ? (
                <div className="space-y-4">
                  <p>Notre équipe de conseillers financiers est là pour vous accompagner dans vos projets.</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>01 98 76 54 32</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>contact@ekumen-bank.fr</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Votre coopérative vous accompagne au quotidien dans vos activités.</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>01 45 67 89 10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>contact@cooperative.fr</span>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Votre message</h4>
              <Textarea
                placeholder={`Décrivez votre question concernant ${declaration.title}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
