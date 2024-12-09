import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, InfoIcon, Users, Building2, Mail, Phone, Loader2, Send } from 'lucide-react';
import { FormLayout } from '@/components/ui/form-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  progress: number;
  isRegulated?: boolean;
  regulationInfo?: RegulationInfo;
  capturedInfo: CapturedInfo[];
  pendingInfo: PendingInfo[];
  resolutionSteps: ResolutionStep[];
}

const declarations: Record<string, DeclarationData> = {
  'dec-1': {
    id: 'dec-1',
    title: 'Déclaration PAC 2024',
    description: 'Déclaration annuelle des surfaces et des cultures',
    progress: 75,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Règlement PAC 2023-2027',
        description: 'Cadre réglementaire pour la période 2023-2027',
        effectiveDate: '2023-01-01',
        source: 'Ministère de l\'Agriculture',
        changes: [
          'Nouvelles exigences environnementales',
          'Modification des critères d\'éligibilité',
          'Évolution des montants d\'aide'
        ]
      },
      upcomingRegulation: {
        title: 'Mise à jour PAC 2024',
        description: 'Ajustements annuels du dispositif',
        effectiveDate: '2024-01-01'
      }
    },
    capturedInfo: [
      { label: 'Surface totale', value: '150 hectares' },
      { label: 'Cultures principales', value: 'Blé, Maïs, Colza' },
      { label: 'Zone', value: 'Zone défavorisée simple' }
    ],
    pendingInfo: [
      { label: 'Photos géolocalisées', description: 'Photos des parcelles à fournir' },
      { label: 'Justificatifs de propriété', description: 'Pour les nouvelles parcelles' }
    ],
    resolutionSteps: [
      {
        title: 'Vérification parcellaire',
        description: 'Contrôle de la cohérence du parcellaire',
        dueDate: '2024-03-15',
        priority: 'Urgent'
      },
      {
        title: 'Documents manquants',
        description: 'Transmission des justificatifs',
        dueDate: '2024-04-01',
        priority: 'Important'
      }
    ]
  },
};

export function DeclarationDetails() {
  const { id } = useParams<{ id: string }>();
  const declaration = declarations[id || ''];
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedHelper, setSelectedHelper] = React.useState<'chambre' | 'ekumen' | null>(null);
  const [message, setMessage] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  if (!declaration) {
    return <div>Déclaration non trouvée</div>;
  }

  const handleHelperSelect = (helper: 'chambre' | 'ekumen') => {
    setSelectedHelper(helper);
    setDialogOpen(true);
    setMessage('');
    setIsSent(false);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
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
                  disabled={isSending || isSent}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isSending || isSent}
                className={`w-full ${isSent ? 'bg-green-600 hover:bg-green-700' : 'bg-teal-700 hover:bg-teal-800'}`}
              >
                {isSending ? (
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/declarations"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux déclarations
        </Link>
      </div>

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
        <Tabs defaultValue="apercu" className="w-full">
          <TabsList className="w-full border-b">
            <TabsTrigger value="apercu" className="px-8">Aperçu</TabsTrigger>
            <TabsTrigger value="evolutions" className="px-8">Évolutions</TabsTrigger>
          </TabsList>
          <TabsContent value="apercu" className="mt-6">
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
            </div>
          </TabsContent>
          <TabsContent value="evolutions" className="mt-6">
            {renderRegulationInfo()}
            {declaration.isRegulated && (
              <div className="flex justify-end gap-4 mt-8">
                {renderHelpButton()}
              </div>
            )}
          </TabsContent>
        </Tabs>
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
