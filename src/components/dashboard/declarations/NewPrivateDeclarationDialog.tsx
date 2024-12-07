import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';

interface NewPrivateDeclarationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (declaration: {
    title: string;
    buyer: string;
    description: string;
    dueDate: string;
    documents: File[];
  }) => void;
}

export function NewPrivateDeclarationDialog({
  open,
  onOpenChange,
  onSubmit,
}: NewPrivateDeclarationDialogProps) {
  const [title, setTitle] = useState('');
  const [buyer, setBuyer] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      buyer,
      description,
      dueDate,
      documents,
    });
    // Reset form
    setTitle('');
    setBuyer('');
    setDescription('');
    setDueDate('');
    setDocuments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setDocuments(prev => [...prev, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouvelle Déclaration Privée</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle déclaration privée avec les documents requis.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre de la déclaration</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: Certification Bio"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="buyer">Organisme demandeur</Label>
              <Input
                id="buyer"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                placeholder="ex: Biocoop"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez les exigences de la déclaration"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dueDate">Date d'échéance</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Documents requis</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="flex-1"
                  />
                </div>
                {documents.length > 0 && (
                  <div className="space-y-2">
                    {documents.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-accent/50 rounded-md"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              <Upload className="w-4 h-4 mr-2" />
              Créer la déclaration
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
