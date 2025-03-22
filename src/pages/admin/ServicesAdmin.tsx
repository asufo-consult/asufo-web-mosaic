
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Server, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceForm from '@/components/admin/ServiceForm';

const ServicesAdmin: React.FC = () => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Fetch services
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['admin-services', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast({
        title: "Service deleted",
        description: "The service has been successfully deleted."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete service. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Toggle active status mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from('services')
        .update({ active, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast({
        title: "Status updated",
        description: "The service status has been updated."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update service status. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    toggleActiveMutation.mutate({ id, active: !currentStatus });
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
  };

  const handleFormSuccess = () => {
    setIsAdding(false);
    setEditingService(null);
    queryClient.invalidateQueries({ queryKey: ['admin-services'] });
  };

  return (
    <AdminLayout
      title="Services Management"
      description="Add, edit, or remove services displayed on your website."
      icon={<Server className="mr-2 h-8 w-8" />}
    >
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading services...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error loading services. Please try again.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No services found. Click "Add New Service" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.icon}</TableCell>
                    <TableCell>{service.order_index}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(service.id, service.active)}
                      >
                        {service.active ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>{service.language}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
      
      {/* Add Service Sheet */}
      <Sheet open={isAdding} onOpenChange={setIsAdding}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add New Service</SheetTitle>
            <SheetDescription>
              Add a new service to your website.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ServiceForm onSuccess={handleFormSuccess} />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Service Sheet */}
      <Sheet open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Service</SheetTitle>
            <SheetDescription>
              Update service details.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {editingService && (
              <ServiceForm 
                id={editingService.id}
                initialData={editingService}
                onSuccess={handleFormSuccess}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
};

export default ServicesAdmin;
