import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SSOProviders } from './auth/SSOProviders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export function Signup() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Store email/password data (in a real app, this would be sent to a backend)
      console.log('Email signup data:', data);
      
      // Redirect to signup flow
      navigate('/auth/signup-flow');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Créer votre compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {showEmailForm ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="mt-1">
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Continuer
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setShowEmailForm(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Retour aux options de connexion
                </Button>
              </div>
            </form>
          ) : (
            <>
              <SSOProviders />
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEmailForm(true)}
                  className="w-full"
                >
                  S'inscrire avec un email
                </Button>
              </div>
            </>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Déjà un compte ?{' '}
                  <Link to="/login" className="font-medium text-black hover:text-black/80">
                    Se connecter
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
