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
  Search
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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
      name: 'Ekumen Bank',
      description: 'Données bancaires et financières',
      status: 'disconnected'
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Analyse de Sol - Parcelle Nord',
      category: 'Analyses',
      uploadDate: '15/12/2023',
      type: 'PDF',
      size: '2.4 MB',
      source: 'MesParcelles'
    },
    {
      id: '2',
      name: 'Plan de Fumure 2024',
      category: 'Plans',
      uploadDate: '14/12/2023',
      type: 'XLSX',
      size: '1.8 MB'
    }
  ];

  const auditReports: AuditReport[] = [
    {
      id: '1',
      name: 'Audit HVE 2023',
      partner: 'Chambre d\'Agriculture',
      sharedDate: '10/12/2023',
      status: 'Validé'
    },
    {
      id: '2',
      name: 'Diagnostic Carbone',
      partner: 'Ekumen Bank',
      sharedDate: '05/12/2023',
      status: 'En cours'
    }
  ];

  const missingDocuments: MissingDocument[] = [
    {
      id: '1',
      name: 'Certificat HVE',
      category: 'Certifications',
      urgency: 'high',
      deadline: '31/12/2023'
    },
    {
      id: '2',
      name: 'Analyse d\'eau',
      category: 'Analyses',
      urgency: 'medium',
      deadline: '15/01/2024'
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="tools">Outils Intégrés</TabsTrigger>
              <TabsTrigger value="audits">Audits</TabsTrigger>
              <TabsTrigger value="missing">Documents Manquants</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Rechercher un document..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les catégories</SelectItem>
                    <SelectItem value="analyses">Analyses</SelectItem>
                    <SelectItem value="plans">Plans</SelectItem>
                    <SelectItem value="certifications">Certifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {documents.map(doc => (
                  <Card key={doc.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <FileText className="h-8 w-8 text-gray-400" />
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
                      <ExternalLink className="h-8 w-8 text-gray-400" />
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
                      <Share2 className="h-8 w-8 text-gray-400" />
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
                      <AlertCircle className={`h-8 w-8 ${
                        doc.urgency === 'high' 
                          ? 'text-red-500'
                          : doc.urgency === 'medium'
                            ? 'text-yellow-500'
                            : 'text-blue-500'
                      }`} />
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

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stockage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Utilisé</span>
                  <span className="text-sm font-medium">2.4 GB</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#005E5D] rounded-full" 
                    style={{ width: '40%' }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Disponible</span>
                  <span className="text-sm font-medium">3.6 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Catégories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Analyses</span>
                  <span className="text-sm text-gray-500">12 fichiers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Plans</span>
                  <span className="text-sm text-gray-500">8 fichiers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Certifications</span>
                  <span className="text-sm text-gray-500">5 fichiers</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyses">Analyses</SelectItem>
                  <SelectItem value="plans">Plans</SelectItem>
                  <SelectItem value="certifications">Certifications</SelectItem>
                </SelectContent>
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
