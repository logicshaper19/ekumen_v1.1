import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Objective, ObjectiveType } from './objectives/types';

interface EditObjectiveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  objective?: Objective;
  onSave: (objective: Objective) => void;
}

export function EditObjectiveDialog({ isOpen, onClose, objective, onSave }: EditObjectiveDialogProps) {
  const [formData, setFormData] = useState(objective || {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    type: 'percentage' as ObjectiveType,
    status: 'in-progress' as const,
    targetPercentage: 100,
    timeline: [
      { year: 2024, target: 0 },
      { year: 2025, target: 0 },
      { year: 2026, target: 0 },
      { year: 2027, target: 0 },
      { year: 2028, target: 0 },
    ]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Objective);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{objective ? 'Modifier l\'objectif' : 'Nouvel objectif'}</DialogTitle>
          <DialogDescription>
            Définissez les détails de votre objectif stratégique
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ObjectiveType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type d'objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Pourcentage</SelectItem>
                  <SelectItem value="reduction">Réduction</SelectItem>
                  <SelectItem value="quantity">Quantité</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Statut</Label>
              <RadioGroup
                value={formData.status}
                onValueChange={(value: 'completed' | 'in-progress' | 'delayed') =>
                  setFormData({ ...formData, status: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-progress" id="in-progress" />
                  <Label htmlFor="in-progress">En cours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completed" id="completed" />
                  <Label htmlFor="completed">Terminé</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delayed" id="delayed" />
                  <Label htmlFor="delayed">En retard</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.type === 'percentage' && (
              <div className="grid gap-2">
                <Label htmlFor="targetPercentage">Pourcentage cible</Label>
                <Input
                  id="targetPercentage"
                  type="number"
                  value={formData.targetPercentage}
                  onChange={(e) => setFormData({ ...formData, targetPercentage: parseInt(e.target.value) })}
                />
              </div>
            )}

            {formData.type === 'reduction' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="baselineValue">Valeur initiale</Label>
                  <Input
                    id="baselineValue"
                    type="number"
                    value={formData.baselineValue}
                    onChange={(e) => setFormData({ ...formData, baselineValue: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="targetReduction">Réduction cible (%)</Label>
                  <Input
                    id="targetReduction"
                    type="number"
                    value={formData.targetReduction}
                    onChange={(e) => setFormData({ ...formData, targetReduction: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unité</Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
              </>
            )}

            {formData.type === 'quantity' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="targetCount">Quantité cible</Label>
                  <Input
                    id="targetCount"
                    type="number"
                    value={formData.targetCount}
                    onChange={(e) => setFormData({ ...formData, targetCount: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currentCount">Quantité actuelle</Label>
                  <Input
                    id="currentCount"
                    type="number"
                    value={formData.currentCount}
                    onChange={(e) => setFormData({ ...formData, currentCount: parseInt(e.target.value) })}
                  />
                </div>
              </>
            )}

            <div className="grid gap-2">
              <Label>Objectifs annuels</Label>
              <div className="grid grid-cols-5 gap-2">
                {formData.timeline.map((entry, index) => (
                  <div key={entry.year} className="space-y-1">
                    <Label htmlFor={`year-${entry.year}`} className="text-xs">{entry.year}</Label>
                    <Input
                      id={`year-${entry.year}`}
                      type="number"
                      value={entry.target}
                      onChange={(e) => {
                        const newTimeline = [...formData.timeline];
                        newTimeline[index] = {
                          ...entry,
                          target: parseInt(e.target.value)
                        };
                        setFormData({ ...formData, timeline: newTimeline });
                      }}
                      className="h-8"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
