
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

// Define our subscription form schema
const subscriptionSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

interface NewsletterTranslations {
  title: string;
  subtitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string;
}

const translations: Record<string, NewsletterTranslations> = {
  en: {
    title: "Subscribe to Our Newsletter",
    subtitle: "Stay up to date with our latest news, updates, and exclusive offers.",
    namePlaceholder: "Your name (optional)",
    emailPlaceholder: "Your email address",
    buttonText: "Subscribe",
    successMessage: "Thank you for subscribing!",
    errorMessage: "Failed to subscribe. Please try again.",
  },
  de: {
    title: "Abonnieren Sie unseren Newsletter",
    subtitle: "Bleiben Sie auf dem Laufenden mit unseren neuesten Nachrichten, Updates und exklusiven Angeboten.",
    namePlaceholder: "Ihr Name (optional)",
    emailPlaceholder: "Ihre E-Mail-Adresse",
    buttonText: "Abonnieren",
    successMessage: "Vielen Dank für Ihr Abonnement!",
    errorMessage: "Abonnement fehlgeschlagen. Bitte versuchen Sie es erneut.",
  },
  fr: {
    title: "Abonnez-vous à notre newsletter",
    subtitle: "Restez à jour avec nos dernières nouvelles, mises à jour et offres exclusives.",
    namePlaceholder: "Votre nom (facultatif)",
    emailPlaceholder: "Votre adresse e-mail",
    buttonText: "S'abonner",
    successMessage: "Merci de vous être abonné !",
    errorMessage: "Échec de l'abonnement. Veuillez réessayer.",
  },
  es: {
    title: "Suscríbase a nuestro boletín",
    subtitle: "Manténgase al día con nuestras últimas noticias, actualizaciones y ofertas exclusivas.",
    namePlaceholder: "Su nombre (opcional)",
    emailPlaceholder: "Su dirección de correo electrónico",
    buttonText: "Suscribirse",
    successMessage: "¡Gracias por suscribirse!",
    errorMessage: "Error al suscribirse. Por favor, inténtelo de nuevo.",
  },
};

const Newsletter: React.FC = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = translations[language] || translations.en;

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: SubscriptionFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: data.email,
          name: data.name || null,
          language,
          active: true,
          created_at: new Date().toISOString(),
        });

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "Success!",
          description: t.successMessage,
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Error",
        description: t.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-800 py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="white" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            {t.subtitle}
          </p>
        </div>
        
        <div className="mx-auto max-w-xl">
          <Card className="bg-white/10 backdrop-blur-md border-none shadow-2xl">
            <CardContent className="p-6 md:p-8">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{t.successMessage}</h3>
                  <p className="text-blue-100">We've sent a confirmation to your email.</p>
                  <Button 
                    variant="outline" 
                    className="mt-6 bg-white/20 text-white hover:bg-white/30 border-white/40"
                    onClick={() => setIsSuccess(false)}
                  >
                    Subscribe another
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t.namePlaceholder}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t.namePlaceholder} 
                              {...field} 
                              className="bg-white/20 border-white/30 text-white placeholder:text-blue-100/70 focus-visible:ring-blue-400"
                            />
                          </FormControl>
                          <FormMessage className="text-yellow-200" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t.emailPlaceholder}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t.emailPlaceholder} 
                              type="email"
                              required
                              {...field} 
                              className="bg-white/20 border-white/30 text-white placeholder:text-blue-100/70 focus-visible:ring-blue-400"
                            />
                          </FormControl>
                          <FormMessage className="text-yellow-200" />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-white hover:bg-blue-50 text-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          {t.buttonText}
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center text-sm text-blue-100">
            <Mail className="inline-block h-4 w-4 mr-1 mb-1" />
            Join {Math.floor(Math.random() * 900) + 1100}+ subscribers who get our updates first
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
