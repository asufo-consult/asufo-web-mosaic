
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';

interface AdminLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  description,
  children,
  icon
}) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center">
              {icon || <Settings className="mr-2 h-8 w-8" />}
              {title}
            </h1>
            <p className="mt-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {description}
            </p>
          </div>
          
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;
