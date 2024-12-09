import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { transformations } from './Transformation';

export function TransformationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const transformation = transformations.find(t => t.id === Number(id));
  
  if (!transformation) {
    return <div>Transformation non trouvée</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/transformation')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <transformation.icon className="h-8 w-8" />
            {transformation.title}
          </h1>
          <p className="text-muted-foreground mt-1">{transformation.description}</p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Benefits and KPIs */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Bénéfices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {transformation.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Right column - KPIs */}
          <Card>
            <CardHeader>
              <CardTitle>Indicateurs clés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {transformation.kpis.map((kpi, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <kpi.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{kpi.title}</div>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Étapes de mise en œuvre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformation.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Explore Button */}
        <div className="flex justify-end">
          <Button 
            size="lg"
            onClick={() => navigate(`/transformation/${transformation.id}/explore`)}
            className="gap-2"
          >
            Explorer cette transformation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
