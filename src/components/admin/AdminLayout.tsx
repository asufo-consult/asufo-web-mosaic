
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
  const navigate = useNavigate();
  
  // Admin access check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please login to access the admin area",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }
      
      // Check if user has admin privileges (matches the specific UUID)
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id !== 'a9fbd4b2-ae39-419f-91de-fd6382aa9b77') {
        toast({
          title: "Unauthorized",
          description: "You do not have permission to access the admin area",
          variant: "destructive"
        });
        navigate('/');
      }
    };
    
    checkAuth();
  }, [navigate]);

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
