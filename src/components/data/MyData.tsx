import React from 'react';

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
    <div className="p-8">
      <h1 className="text-[40px] font-bold text-black mb-1">Mes données</h1>
      <p className="text-xl text-gray-600 mb-8">
        Vos documents et registres agricoles privés
      </p>

      {/* Connected Storage Section */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Stockage connecté</h2>
        <div className="flex gap-4">
          {storageProviders.map((provider) => (
            <div key={provider.name} className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
              <span className="text-2xl">{provider.icon}</span>
              <span>{provider.name}</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                provider.status === 'Actif' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {provider.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-4">
            <span className="mr-2">📄</span>
            Mes documents
          </button>
          <button className="text-gray-600 pb-4">
            <span className="mr-2">🔄</span>
            Documents partagés
          </button>
          <button className="text-gray-600 pb-4">
            <span className="mr-2">📊</span>
            Rapports d'audit
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-8">
        Upload and manage your private farm documents. Connect cloud storage to sync files automatically.
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-4">
            <span className="text-blue-600 text-2xl">📄</span>
            <div>
              <p className="text-gray-600">Total Documents</p>
              <p className="text-3xl font-semibold">27</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-4">
            <span className="text-blue-600 text-2xl">⬆️</span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Recent Uploads</p>
                <span className="text-green-500">+12%</span>
              </div>
              <p className="text-3xl font-semibold">4</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-4">
            <span className="text-blue-600 text-2xl">🕒</span>
            <div>
              <p className="text-gray-600">Document Types</p>
              <p className="text-3xl font-semibold">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents Table */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="pb-4">DOCUMENT</th>
              <th className="pb-4">UPLOAD DATE</th>
              <th className="pb-4">TYPE</th>
              <th className="pb-4">SIZE</th>
              <th className="pb-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {recentDocuments.map((doc) => (
              <tr key={doc.name} className="border-b">
                <td className="py-4 flex items-center gap-2">
                  <span className="text-blue-600">📄</span>
                  {doc.name}
                </td>
                <td className="py-4">{doc.uploadDate}</td>
                <td className="py-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {doc.type}
                  </span>
                </td>
                <td className="py-4">{doc.size}</td>
                <td className="py-4">
                  <button className="text-blue-600">⬇️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
