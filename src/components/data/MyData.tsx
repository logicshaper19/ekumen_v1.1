import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Files, 
  Upload, 
  Share2, 
  HardDrive, 
  Download, 
  FileText, 
  FolderOpen, 
  ExternalLink, 
  CloudOff,
  AlertCircle,
  Plus,
  Search,
  Check,
  ChevronDown
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsCard } from "@/components/ui/analytics-card";
import { cn } from "@/lib/utils";

// Simplified Select Components
const Select = ({ children, value, onValueChange }: { children: React.ReactNode, value?: string, onValueChange?: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
      >
        <span>{selectedValue || "Select..."}</span>
        <ChevronDown className="h-4 w-4" />
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement, {
                onClick: () => {
                  setSelectedValue(child.props.children);
                  onValueChange?.(child.props.value);
                  setIsOpen(false);
                },
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ children, value, onClick }: { children: React.ReactNode, value: string, onClick?: () => void }) => (
  <div
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
    onClick={onClick}
  >
    {children}
  </div>
);

const SelectTrigger = Select;
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectValue = ({ children }: { children: React.ReactNode }) => <>{children}</>;

interface IntegratedTool {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
}

interface Document {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  type: string;
  size: string;
  source?: string;
}

interface AuditReport {
  id: string;
  name: string;
  partner: string;
  sharedDate: string;
  status: string;
}

interface MissingDocument {
  id: string;
  name: string;
  category: string;
  urgency: 'high' | 'medium' | 'low';
  deadline?: string;
}

export function MyData() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const integratedTools: IntegratedTool[] = [
    { 
      id: '1',
      name: 'MesParcelles',
      description: 'Gestion parcellaire et traçabilité',
      status: 'connected',
      lastSync: '16/12/2023'
    },
    { 
      id: '2',
      name: 'SMAG',
      description: 'Solutions de gestion agricole',
      status: 'connected',
      lastSync: '15/12/2023'
    },
    { 
      id: '3',
      name: 'Crédit Agricole Open Bank',
      description: 'Données bancaires',
      status: 'connected',
      lastSync: '15/12/2023'
    },
    { 
      id: '4',
      name: 'Crédit Mutuel Open Bank',
      description: 'Données bancaires',
      status: 'connected',
      lastSync: '15/12/2023'
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'ITK 2023 source MesParcelles',
      category: 'ITK',
      uploadDate: '15/12/2023',
      type: 'PDF',
      size: '2.4 MB',
      source: 'MesParcelles'
    },
    {
      id: '2',
      name: 'ITK 2022 source MesParcelles',
      category: 'ITK',
      uploadDate: '14/12/2023',
      type: 'PDF',
      size: '2.1 MB',
      source: 'MesParcelles'
    },
    {
      id: '3',
      name: 'Analyse de sol - Parcelle Nord',
      category: 'Analyses',
      uploadDate: '10/12/2023',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      id: '4',
      name: 'Analyse de sol - Parcelle Sud',
      category: 'Analyses',
      uploadDate: '10/12/2023',
      type: 'PDF',
      size: '1.7 MB'
    },
    {
      id: '5',
      name: 'Liasse fiscale 2022',
      category: 'Fiscal',
      uploadDate: '01/03/2023',
      type: 'PDF',
      size: '3.2 MB'
    },
    {
      id: '6',
      name: 'Liasse fiscale 2023',
      category: 'Fiscal',
      uploadDate: '01/03/2024',
      type: 'PDF',
      size: '3.4 MB'
    },
    {
      id: '7',
      name: 'Plan de fumure',
      category: 'Plans',
      uploadDate: '15/12/2023',
      type: 'PDF',
      size: '1.5 MB'
    }
  ];

  const auditReports: AuditReport[] = [
    {
      id: '1',
      name: 'Fiche traçabilité Coopérative',
      partner: 'Coopérative Agricole',
      sharedDate: '10/12/2023',
      status: 'Validé'
    },
    {
      id: '2',
      name: 'Fiche HVE 2022',
      partner: 'Chambre d\'Agriculture',
      sharedDate: '05/12/2023',
      status: 'Validé'
    }
  ];

  const missingDocuments: MissingDocument[] = [
    {
      id: '1',
      name: 'Liasse fiscale 2021',
      category: 'Fiscal',
      urgency: 'high',
      deadline: '31/12/2023'
    }
  ];

  const handleUpload = () => {
    // Handle file upload logic
    setIsUploadDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mes Données</h1>
        <Button onClick={() => setIsUploadDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <AnalyticsCard
          title="Documents par Catégorie"
          value="28"
          subtitle="12 ITK, 8 Analyses, 8 Autres"
          icon={Files}
        />

        <AnalyticsCard
          title="Taux de Complétude"
          value="95%"
          subtitle="1 document manquant"
          icon={Check}
        />

        <AnalyticsCard
          title="Dernières Activités"
          value="8"
          subtitle="nouveaux documents ce mois"
          icon={HardDrive}
        />

        <AnalyticsCard
          title="Outils Connectés"
          value="4/4"
          subtitle="Tous les outils connectés"
          icon={ExternalLink}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tools">Outils Intégrés</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
            <TabsTrigger value="missing">Documents Manquants</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <div className="mb-4">
              <Input
                placeholder="Rechercher un document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              {documents.map(doc => (
                <Card key={doc.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg h-fit">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-gray-500">
                          {doc.category} • {doc.uploadDate} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.source && (
                        <span className="text-sm text-gray-500">{doc.source}</span>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-4">
            {integratedTools.map(tool => (
              <Card key={tool.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg h-fit">
                      <ExternalLink className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{tool.name}</h3>
                      <p className="text-sm text-gray-500">{tool.description}</p>
                      {tool.lastSync && (
                        <p className="text-sm text-gray-500">
                          Dernière synchronisation: {tool.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant={tool.status === 'connected' ? "outline" : "default"}
                    className="gap-2"
                  >
                    {tool.status === 'connected' ? (
                      <>
                        <CloudOff className="h-4 w-4" />
                        Déconnecter
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4" />
                        Connecter
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="audits" className="space-y-4">
            {auditReports.map(audit => (
              <Card key={audit.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg h-fit">
                      <Share2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{audit.name}</h3>
                      <p className="text-sm text-gray-500">
                        Partagé avec {audit.partner} • {audit.sharedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      audit.status === 'Validé' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {audit.status}
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="missing" className="space-y-4">
            {missingDocuments.map(doc => (
              <Card key={doc.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg h-fit ${
                      doc.urgency === 'high' 
                        ? 'bg-red-100'
                        : doc.urgency === 'medium'
                          ? 'bg-yellow-100'
                          : 'bg-blue-100'
                    }`}>
                      <AlertCircle className={`h-5 w-5 ${
                        doc.urgency === 'high' 
                          ? 'text-red-500'
                          : doc.urgency === 'medium'
                            ? 'text-yellow-500'
                            : 'text-blue-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-500">
                        {doc.category}
                        {doc.deadline && ` • Échéance: ${doc.deadline}`}
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => setIsUploadDialogOpen(true)}>
                    Ajouter
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un document</DialogTitle>
            <DialogDescription>
              Sélectionnez un fichier et sa catégorie pour l'ajouter à votre espace.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select>
                <SelectItem value="analyses">Analyses</SelectItem>
                <SelectItem value="plans">Plans</SelectItem>
                <SelectItem value="certifications">Certifications</SelectItem>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fichier</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Cliquez pour sélectionner un fichier ou glissez-le ici
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpload}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
