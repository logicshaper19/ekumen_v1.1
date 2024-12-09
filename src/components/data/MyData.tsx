import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Files, Upload, Share2, HardDrive, Download, FileText, FolderOpen, ExternalLink, CloudOff } from "lucide-react"

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

export function MyData() {
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

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-[40px] font-bold text-black">Mes données</h1>
        <p className="text-xl text-gray-600">
          Vos documents et registres agricoles privés
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Totaux</CardTitle>
            <Files className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">
              +4 ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Completion</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +2% depuis le dernier mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Partagés</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Avec 3 collaborateurs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stockage Utilisé</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 GB</div>
            <p className="text-xs text-muted-foreground">
              Sur 5 GB disponibles
            </p>
          </CardContent>
        </Card>
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
    </div>
  );
}
