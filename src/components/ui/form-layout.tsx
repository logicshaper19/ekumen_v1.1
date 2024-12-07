import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock } from 'lucide-react';

interface CapturedInfo {
  label: string;
  value: string;
}

interface PendingInfo {
  label: string;
  description?: string;
}

interface FormLayoutProps {
  progress: number;
  capturedInfo: CapturedInfo[];
  pendingInfo: PendingInfo[];
}

export function FormLayout({ progress, capturedInfo, pendingInfo }: FormLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Progression Globale</h3>
          <span className="text-sm font-medium text-gray-900">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Captured Information */}
        <Card className="bg-teal-700 border-teal-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CheckCircle2 className="h-5 w-5 text-yellow-300" />
              Informations Capturées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              {capturedInfo.map((info, index) => (
                <div key={index} className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-yellow-200/90">{info.label}</dt>
                  <dd className="text-sm text-white font-medium">{info.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {/* Pending Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Informations en Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pendingInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-900">{info.label}</span>
                    {info.description && (
                      <p className="text-sm text-gray-500 mt-0.5">{info.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
