import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
}

export function InviteModal({ open, onClose }: InviteModalProps) {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    "Je souhaiterais vous inviter à rejoindre Ekumen pour que nous puissions échanger des idées sur l'amélioration de mon exploitation agricole."
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically make an API call to send the invitation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call

      toast({
        title: "Invitation envoyée",
        description: `Une invitation a été envoyée à ${firstName} ${surname}.`,
        duration: 3000,
      });

      // Reset form
      setFirstName('');
      setSurname('');
      setEmail('');
      setMessage(
        "Je souhaiterais vous inviter à rejoindre Ekumen pour que nous puissions échanger des idées sur l'amélioration de mon exploitation agricole."
      );
      
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'invitation.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inviter un partenaire</DialogTitle>
          <DialogDescription>
            Invitez un partenaire à rejoindre votre réseau sur Ekumen
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                Prénom
              </label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jean"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="surname" className="text-sm font-medium text-gray-700">
                Nom
              </label>
              <Input
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Dupont"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.dupont@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer l'invitation"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
