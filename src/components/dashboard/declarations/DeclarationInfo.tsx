import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InfoProps {
  description: string;
  keyPoints: { label: string; value: string }[];
}

export function DeclarationInfo({ description, keyPoints }: InfoProps) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* Description Card */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>

      {/* Notes Card */}
      <Card>
        <CardHeader>
          <CardTitle>Notes de synthèse</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-2">Points clés à retenir:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {keyPoints.map((point, index) => (
              <li key={index}>- {point.label}: {point.value}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
