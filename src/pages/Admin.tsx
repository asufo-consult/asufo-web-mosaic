
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, Server, Lightbulb, Package, MessageSquare, Mail } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Admin: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <Settings className="inline-block mr-2 h-8 w-8" />
              Admin Dashboard
            </h1>
            <p className="mt-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Manage your website content
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/admin/services" className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <Server className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Services</CardTitle>
                  <CardDescription>Manage service offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add, edit, or remove services displayed on your website.
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/admin/solutions" className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <Lightbulb className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Solutions</CardTitle>
                  <CardDescription>Manage solution offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add, edit, or remove solutions displayed on your website.
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/admin/projects" className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <Package className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Manage portfolio projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add, edit, or remove projects in your portfolio.
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/admin/contact-messages" className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>Manage contact form submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View and respond to messages from the contact form.
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/admin/subscribers" className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <Mail className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Newsletter Subscribers</CardTitle>
                  <CardDescription>Manage email subscribers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View and manage newsletter subscribers.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
