
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import PageHero from '@/components/PageHero';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name: values.name,
            email: values.email,
            message: `Subject: ${values.subject}\n\n${values.message}`,
          },
        ]);
      
      if (error) throw error;
      
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <PageHero 
          title={t('contact.hero.title')}
          subtitle={t('contact.hero.subtitle')}
          bgImageIndex={5}
        />

        {/* Contact Information */}
        <section className="py-12">
          <div className="section-container">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="metal-card flex flex-col items-center text-center p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('contact.email.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('contact.email.description')}
                </p>
                <a href="mailto:info@asufo.com" className="text-primary font-medium hover:underline">
                  info[@]asufo.com
                </a>
              </div>
              
              <div className="metal-card flex flex-col items-center text-center p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('contact.phone.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('contact.phone.description')}
                </p>
                <a href="tel:+4915563116316" className="text-primary font-medium hover:underline">
                  +49 (155) 6311 6316
                </a>
              </div>
              
              <div className="metal-card flex flex-col items-center text-center p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('contact.office.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('contact.office.description')}
                </p>
                <address className="not-italic text-primary font-medium">
                  Gifhorner Strasse 77<br />
                  38112 Braunschweig, Germany
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8">{t('contact.form.title')}</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.emailPlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.subject')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.subjectPlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t('contact.form.messagePlaceholder')} 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t('contact.form.submit')}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
              
              {/* Office Hours and Map */}
              <div>
                <h2 className="text-3xl font-bold mb-8">{t('contact.office.hoursTitle')}</h2>
                
                <div className="metal-card p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-xl font-semibold">{t('contact.office.schedule')}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('contact.office.monday')}</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('contact.office.saturday')}</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('contact.office.sunday')}</span>
                      <span>{t('contact.office.closed')}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-metal/20 dark:border-white/10">
                    <a 
                      href="https://tidycal.com/blu7/30min-video-agilecoach" 
                      target="_blank" 
                      rel="noreferrer noopener"
                      className="flex items-center text-primary font-medium hover:underline"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      {t('contact.office.schedule')}
                    </a>
                  </div>
                </div>
                
                <div className="aspect-video relative rounded-lg overflow-hidden metal-card">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9713.05586976597!2d13.38959037311268!3d52.520544936839585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBerlin%20Mitte%2C%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1649328921165!5m2!1sen!2sus" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-secondary/30 dark:bg-card/30 py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('contact.faq.title')}</h2>
              <p className="text-muted-foreground">
                {t('contact.faq.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="metal-card p-6">
                <h3 className="text-xl font-semibold mb-3">{t('contact.faq.q1')}</h3>
                <p className="text-muted-foreground">
                  {t('contact.faq.a1')}
                </p>
              </div>
              
              <div className="metal-card p-6">
                <h3 className="text-xl font-semibold mb-3">{t('contact.faq.q2')}</h3>
                <p className="text-muted-foreground">
                  {t('contact.faq.a2')}
                </p>
              </div>
              
              <div className="metal-card p-6">
                <h3 className="text-xl font-semibold mb-3">{t('contact.faq.q3')}</h3>
                <p className="text-muted-foreground">
                  {t('contact.faq.a3')}
                </p>
              </div>
              
              <div className="metal-card p-6">
                <h3 className="text-xl font-semibold mb-3">{t('contact.faq.q4')}</h3>
                <p className="text-muted-foreground">
                  {t('contact.faq.a4')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
