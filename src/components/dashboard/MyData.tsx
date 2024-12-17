import React from 'react';
import { Button } from "@/components/ui/button"
import { Files, Upload, Share2, HardDrive, Download, FileText, FolderOpen, ExternalLink, CloudOff } from "lucide-react"
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface StorageProvider {
  name: string;
  icon: string;
  status: 'Actif' | 'Inactif';
}

interface Document {
  name: string;
  uploadDate: string;
  type: string;
  size: string;
}

interface DocumentStat {
  title: string;
  value: string;
  icon: any;
  description: string;
}

interface FarmerData {
  id: number;
  category: string;
  documents: Document[];
}

interface Document {
  name: string;
  status: 'uploaded' | 'pending' | 'missing';
  lastUpdate: string | null;
}

const farmerData: FarmerData[] = [
  {
    id: 1,
    category: "Informations Personnelles",
    documents: [
      {
        name: "Carte d'Identité",
        status: "uploaded",
        lastUpdate: "15/03/2024"
      },
      {
        name: "Justificatif de Domicile",
        status: "uploaded",
        lastUpdate: "10/03/2024"
      }
    ]
  },
  {
    id: 2,
    category: "Documents d'Exploitation",
    documents: [
      {
        name: "Titre de Propriété",
        status: "uploaded",
        lastUpdate: "01/02/2024"
      },
      {
        name: "Bail Rural",
        status: "missing",
        lastUpdate: null
      }
    ]
  },
  {
    id: 3,
    category: "Certifications",
    documents: [
      {
        name: "Certification Bio",
        status: "pending",
        lastUpdate: "20/03/2024"
      },
      {
        name: "Label Rouge",
        status: "uploaded",
        lastUpdate: "05/01/2024"
      }
    ]
  }
];

const storageProviders: StorageProvider[] = [
  { name: 'Google Drive', icon: '🔷', status: 'Inactif' },
  { name: 'OneDrive', icon: '☁️', status: 'Actif' },
];

const recentDocuments: Document[] = [
  {
    name: 'Soil Analysis Report - North Field',
    uploadDate: '15/03/2024',
    type: 'PDF',
    size: '2.4 MB',
  },
  {
    name: 'Irrigation System Specifications',
    uploadDate: '10/03/2024',
    type: 'PDF',
    size: '1.8 MB',
  },
];

const documentStats = [
  {
    title: "Documents Stockés",
    value: "156",
    change: "+12 ce mois",
    trend: "up",
    icon: Files,
    description: "documents au total"
  },
  {
    title: "Espace Utilisé",
    value: "2.4 GB",
    change: "75% disponible",
    trend: "up",
    icon: HardDrive,
    description: "sur 10 GB"
  },
  {
    title: "Fichiers Partagés",
    value: "45",
    change: "+8 nouveaux",
    trend: "up",
    icon: Share2,
    description: "avec les partenaires"
  },
  {
    title: "Dernière Sauvegarde",
    value: "2h",
    change: "Auto-sync actif",
    trend: "up",
    icon: Upload,
    description: "synchronisation"
  }
];

export function MyData() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mes Données</h2>
          <p className="text-muted-foreground">
            Gérez et suivez vos documents agricoles
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Télécharger
          </Button>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Importer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {documentStats.map((stat, index) => (
          <AnalyticsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>

      {/* Connected Storage Section */}
      <Card>
        <CardHeader>
          <CardTitle>Stockage connecté</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {storageProviders.map((provider) => (
              <div 
                key={provider.name} 
                className="flex items-center gap-3 bg-secondary/50 px-4 py-2 rounded-lg"
              >
                {provider.status === 'Actif' ? (
                  <ExternalLink className="h-5 w-5 text-primary" />
                ) : (
                  <CloudOff className="h-5 w-5 text-muted-foreground" />
                )}
                <span>{provider.name}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  provider.status === 'Actif' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {provider.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-8">
          <Button variant="ghost" className="text-primary border-b-2 border-primary pb-4">
            <Files className="mr-2 h-4 w-4" />
            Mes documents
          </Button>
          <Button variant="ghost" className="text-muted-foreground pb-4">
            <Share2 className="mr-2 h-4 w-4" />
            Documents partagés
          </Button>
          <Button variant="ghost" className="text-muted-foreground pb-4">
            <FileText className="mr-2 h-4 w-4" />
            Rapports d'audit
          </Button>
        </div>
      </div>

      {/* Recent Documents Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Documents Récents</CardTitle>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Ajouter un document
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left text-sm font-medium">DOCUMENT</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">DATE</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">TYPE</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">TAILLE</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {recentDocuments.map((doc) => (
                  <tr key={doc.name} className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      {doc.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{doc.uploadDate}</td>
                    <td className="py-3 px-4">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{doc.size}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Documents Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Documents Disponibles</h2>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Ajouter un Document
          </Button>
        </div>

        <div className="grid gap-4">
          {farmerData.map((category) => (
            <Card 
              key={category.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-black/5">
                      <FolderOpen className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <CardTitle>{category.category}</CardTitle>
                      <CardDescription>
                        {category.documents.filter(doc => doc.status === 'uploaded').length} sur {category.documents.length} documents
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <Progress 
                        value={(category.documents.filter(doc => doc.status === 'uploaded').length / category.documents.length) * 100} 
                        className="h-2 w-24" 
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.documents.map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        {doc.status === 'uploaded' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : doc.status === 'pending' ? (
                          <FileText className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{doc.name}</h3>
                          {doc.status === 'uploaded' && doc.lastUpdate && (
                            <p className="text-sm text-gray-500">
                              Mis à jour le {doc.lastUpdate}
                            </p>
                          )}
                          {doc.status === 'pending' && (
                            <p className="text-sm text-yellow-500">
                              En cours de traitement
                            </p>
                          )}
                          {doc.status === 'missing' && (
                            <p className="text-sm text-red-500">
                              Document manquant
                            </p>
                          )}
                        </div>
                      </div>
                      {doc.status === 'uploaded' && (
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Télécharger
                        </Button>
                      )}
                      {doc.status === 'missing' && (
                        <Button variant="ghost" size="sm">
                          <Upload className="w-4 h-4 mr-1" />
                          Ajouter
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}