import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, InfoIcon, Users, Building2, Mail, Phone, Loader2, Send } from 'lucide-react';
import { FormLayout } from '@/components/ui/form-layout';
import { Button } from '@/components/ui/button';
import { ListTodo, HelpCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DeclarationAnalytics } from './DeclarationAnalytics';

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
    title: 'Certification Qualité',
    description: 'Déclaration des pratiques agricoles pour la certification qualité Carrefour',
    frequency: 'Annuel',
    dueDate: '31 Décembre 2024',
    progress: 0,
    isRegulated: false,
    capturedInfo: [
      { label: 'Acheteur', value: 'Carrefour' },
      { label: 'Type de certification', value: 'Qualité' }
    ],
    pendingInfo: [
      { label: 'Documentation requise', description: 'Préparation des documents pour la certification' }
    ],
    resolutionSteps: [
      {
        title: 'Audit initial',
        description: 'Préparation et réalisation de l\'audit de certification',
        dueDate: '2024-11-30',
        priority: 'Important'
      }
    ]
  },
  'certification-agriculture-durable': {
    id: 'certification-agriculture-durable',
    title: 'Certification Agriculture Durable',
    description: 'Documentation des pratiques durables pour l\'assurance agricole',
    frequency: 'Annuel',
    dueDate: '31 Décembre 2024',
    progress: 0,
    isRegulated: false,
    capturedInfo: [
      { label: 'Assureur', value: 'Groupama' },
      { label: 'Type de certification', value: 'Agriculture Durable' }
    ],
    pendingInfo: [
      { label: 'Évaluation', description: 'Évaluation des pratiques agricoles durables' }
    ],
    resolutionSteps: [
      {
        title: 'Documentation',
        description: 'Compilation des preuves de pratiques durables',
        dueDate: '2024-11-30',
        priority: 'Normal'
      }
    ]
  },
  'label-rouge': {
    id: 'label-rouge',
    title: 'Label Rouge',
    description: 'Certification pour le Label Rouge - qualité supérieure',
    frequency: 'Annuel',
    dueDate: '31 Décembre 2024',
    progress: 0,
    isRegulated: false,
    capturedInfo: [
      { label: 'Organisme', value: 'Label Rouge' },
      { label: 'Type de label', value: 'Qualité Supérieure' }
    ],
    pendingInfo: [
      { label: 'Cahier des charges', description: 'Vérification de la conformité au cahier des charges' }
    ],
    resolutionSteps: [
      {
        title: 'Audit de conformité',
        description: 'Vérification des critères Label Rouge',
        dueDate: '2024-11-30',
        priority: 'Important'
      }
    ]
  },
  'certification-bio': {
    id: 'certification-bio',
    title: 'Certification Bio',
    description: 'Documentation pour la certification agriculture biologique',
    frequency: 'Annuel',
    dueDate: '31 Décembre 2024',
    progress: 0,
    isRegulated: false,
    capturedInfo: [
      { label: 'Distributeur', value: 'Biocoop' },
      { label: 'Type de certification', value: 'Agriculture Biologique' }
    ],
    pendingInfo: [
      { label: 'Conversion', description: 'Suivi du processus de conversion bio' }
    ],
    resolutionSteps: [
      {
        title: 'Audit bio',
        description: 'Préparation à l\'audit de certification bio',
        dueDate: '2024-11-30',
        priority: 'Important'
      }
    ]
  },
};

export function DeclarationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  console.log('Declaration ID:', id);
  const declaration = id ? declarations[id] : null;
  console.log('Found declaration:', declaration);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedHelper, setSelectedHelper] = React.useState<'chambre' | 'ekumen' | null>(null);
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  const handleBack = () => {
    navigate('/reglementations');
  };

  if (!declaration) {
    return (
      <div className="p-8">
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

  const handleHelperSelect = (helper: 'chambre' | 'ekumen') => {
    setSelectedHelper(helper);
    setDialogOpen(true);
    setMessage('');
    setIsSent(false);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setSending(true);
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSending(false);
    setIsSent(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setDialogOpen(false);
      setMessage('');
      setIsSent(false);
    }, 3000);
  };

  const renderHelpButton = () => {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="default"
              className="bg-teal-700 text-white hover:bg-teal-800"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Obtenir de l'aide
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleHelperSelect('chambre')}>
              <Building2 className="mr-2 h-4 w-4" />
              <span>Chambre d'agriculture</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleHelperSelect('ekumen')}>
              <Users className="mr-2 h-4 w-4" />
              <span>Équipe Ekumen</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={dialogOpen} onOpenChange={(open) => {
          if (!open) {
            setMessage('');
            setIsSent(false);
          }
          setDialogOpen(open);
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedHelper === 'chambre' ? 'Chambre d\'agriculture' : 'Équipe Ekumen'}
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
                ) : (
                  <div className="space-y-4">
                    <p>Notre équipe technique est là pour vous aider avec l'utilisation de la plateforme et répondre à vos questions.</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>01 98 76 54 32</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>support@ekumen.fr</span>
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
                  disabled={sending || isSent}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || sending || isSent}
                className={`w-full ${isSent ? 'bg-green-600 hover:bg-green-700' : 'bg-teal-700 hover:bg-teal-800'}`}
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : isSent ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Message envoyé !
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderRegulationInfo = () => {
    if (!declaration.regulationInfo) return null;

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-orange-600">
          <InfoIcon className="h-5 w-5" />
          <h2 className="text-lg font-medium">Réglementation</h2>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Current Regulation */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Réglementation Actuelle</h3>
            <h4 className="text-base font-medium">{declaration.regulationInfo.currentRegulation.title}</h4>
            <p className="text-gray-600">{declaration.regulationInfo.currentRegulation.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>En vigueur depuis le {declaration.regulationInfo.currentRegulation.effectiveDate}</span>
            </div>
            {declaration.regulationInfo.currentRegulation.source && (
              <p className="text-sm text-gray-500">
                Source: {declaration.regulationInfo.currentRegulation.source}
              </p>
            )}
          </div>

          {/* Upcoming Regulation */}
          {declaration.regulationInfo.upcomingRegulation && (
            <div className="space-y-2 bg-orange-50/50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Évolution de la Réglementation</h3>
                <span className="text-sm text-orange-600">
                  (À partir du {declaration.regulationInfo.upcomingRegulation.effectiveDate})
                </span>
              </div>
              <h4 className="text-base font-medium">{declaration.regulationInfo.upcomingRegulation.title}</h4>
              <p className="text-gray-600">{declaration.regulationInfo.upcomingRegulation.description}</p>

              {declaration.regulationInfo.upcomingRegulation.changes && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Principaux changements:</h4>
                  <ul className="space-y-2 text-gray-600">
                    {declaration.regulationInfo.upcomingRegulation.changes.map((change, index) => (
                      <li key={index} className="flex gap-2">
                        <span>•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {declaration.regulationInfo.upcomingRegulation.source && (
                <p className="text-sm text-gray-500">
                  Source: {declaration.regulationInfo.upcomingRegulation.source}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const calculateDaysLeft = (steps: ResolutionStep[]) => {
    if (steps.length === 0) return 30;
    const lastDueDate = new Date(steps[steps.length - 1].dueDate);
    const today = new Date();
    const diffTime = Math.abs(lastDueDate.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const completedSteps = declaration.resolutionSteps.filter(
    () => declaration.progress >= 100
  ).length;

  return (
    <div className="p-8">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={handleBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux réglementations
      </Button>
      <DeclarationAnalytics
        progress={declaration.progress}
        daysLeft={calculateDaysLeft(declaration.resolutionSteps)}
        totalSteps={declaration.resolutionSteps.length}
        completedSteps={completedSteps}
        pendingItems={declaration.pendingInfo.length}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{declaration.title}</h1>
        {declaration.isRegulated && (
          <span className="inline-flex px-3 py-1 rounded-full text-orange-600 bg-orange-100/80 text-sm">
            Réglementation évolutive
          </span>
        )}
      </div>
      <p className="mt-2 text-gray-600">{declaration.description}</p>

      {declaration.isRegulated ? (
        <div className="space-y-6">
          <FormLayout
            progress={declaration.progress}
            capturedInfo={declaration.capturedInfo}
            pendingInfo={declaration.pendingInfo}
          />
          <Card>
            <CardHeader>
              <CardTitle>Plan de Résolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {declaration.resolutionSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Échéance: {step.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {step.priority === 'Urgent' && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                          {step.priority === 'Important' && (
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                          )}
                          {step.priority === 'Normal' && (
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          )}
                          <span className="text-sm text-gray-500">{step.priority}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {renderHelpButton()}
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                        onClick={() => {}}
                      >
                        <ListTodo className="w-4 h-4 mr-2" />
                        Ajouter à mes tâches
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {renderRegulationInfo()}
          <div className="flex justify-end gap-4 mt-8">
            {renderHelpButton()}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <FormLayout
            progress={declaration.progress}
            capturedInfo={declaration.capturedInfo}
            pendingInfo={declaration.pendingInfo}
          />
          <Card>
            <CardHeader>
              <CardTitle>Plan de Résolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {declaration.resolutionSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Échéance: {step.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {step.priority === 'Urgent' && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                          {step.priority === 'Important' && (
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                          )}
                          {step.priority === 'Normal' && (
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          )}
                          <span className="text-sm text-gray-500">{step.priority}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {renderHelpButton()}
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                        onClick={() => {}}
                      >
                        <ListTodo className="w-4 h-4 mr-2" />
                        Ajouter à mes tâches
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {declaration.isRegulated && (
            <div className="flex justify-end mt-8">
              {renderHelpButton()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
