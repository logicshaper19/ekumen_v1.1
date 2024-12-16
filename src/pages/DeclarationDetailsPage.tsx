import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DeclarationDetails } from '@/components/dashboard/declarations/DeclarationDetails';

export function DeclarationDetailsPage() {
  const { id } = useParams();

  return (
    <div className="p-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/reglementations" className="hover:text-primary">
          Réglementations
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Détails de la Déclaration</span>
      </div>

      {/* Declaration Details */}
      <DeclarationDetails id={id} />
    </div>
  );
}
