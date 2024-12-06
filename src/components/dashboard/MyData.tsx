import { Upload, FileText, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const farmerData = [
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

export function MyData() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Données</h1>
          <p className="mt-2 text-gray-600">
            Gérez vos documents et informations personnelles
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90">
          <Upload className="w-4 h-4 mr-2" />
          Ajouter un Document
        </button>
      </div>

      <div className="grid gap-6">
        {farmerData.map(category => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>
                {category.documents.filter(doc => doc.status === 'uploaded').length} sur {category.documents.length} documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.documents.map(doc => (
                  <div key={doc.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className={`h-5 w-5 ${
                        doc.status === 'uploaded' ? 'text-black' :
                        doc.status === 'pending' ? 'text-yellow-500' :
                        'text-red-500'
                      }`} />
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
                      <button className="inline-flex items-center text-sm text-black hover:text-black/80">
                        <Download className="w-4 h-4 mr-1" />
                        Télécharger
                      </button>
                    )}
                    {doc.status === 'missing' && (
                      <button className="inline-flex items-center text-sm text-black hover:text-black/80">
                        <Upload className="w-4 h-4 mr-1" />
                        Ajouter
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}