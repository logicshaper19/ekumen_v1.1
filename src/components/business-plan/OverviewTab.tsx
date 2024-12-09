import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Building2, Wheat, Droplets } from 'lucide-react';

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Informations Clés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Surface Totale</p>
                  <p className="text-sm text-muted-foreground">85 hectares</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-4">
                <Wheat className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Cultures Principales</p>
                  <p className="text-sm text-muted-foreground">Blé, Maïs, Tournesol</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-4">
                <Droplets className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Type d'Agriculture</p>
                  <p className="text-sm text-muted-foreground">Conventionnelle</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Objectifs 2024-2027</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Rendement</p>
                    <p className="text-sm text-muted-foreground">Augmenter la productivité des cultures</p>
                  </div>
                  <p className="text-sm font-medium">8%</p>
                </div>
                <Progress value={53} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Objectif: 15%</span>
                  <span>+8% depuis janvier</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Surface Bio</p>
                    <p className="text-sm text-muted-foreground">Conversion en agriculture biologique</p>
                  </div>
                  <p className="text-sm font-medium">12ha</p>
                </div>
                <Progress value={60} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Objectif: 20ha</span>
                  <span>En conversion</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Économie d'Eau</p>
                    <p className="text-sm text-muted-foreground">Réduire la consommation d'eau</p>
                  </div>
                  <p className="text-sm font-medium">13%</p>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Objectif: 20%</span>
                  <span>vs. 2023</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
