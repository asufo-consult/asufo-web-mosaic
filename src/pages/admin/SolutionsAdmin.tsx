
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Lightbulb, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import SolutionForm from '@/components/admin/SolutionForm';

const SolutionsAdmin: React.FC = () => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingSolution, setEditingSolution] = useState<any>(null);

  // Fetch solutions
  const { data: solutions = [], isLoading, error } = useQuery({
    queryKey: ['admin-solutions', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('solutions')
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
        .from('solutions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-solutions'] });
      toast({
        title: "Solution deleted",
        description: "The solution has been successfully deleted."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete solution. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Toggle active status mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from('solutions')
        .update({ active, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-solutions'] });
      toast({
        title: "Status updated",
        description: "The solution status has been updated."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update solution status. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this solution? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    toggleActiveMutation.mutate({ id, active: !currentStatus });
  };

  const handleEdit = (solution: any) => {
    setEditingSolution(solution);
  };

  const handleFormSuccess = () => {
    setIsAdding(false);
    setEditingSolution(null);
    queryClient.invalidateQueries({ queryKey: ['admin-solutions'] });
  };

  return (
    <AdminLayout
      title="Solutions Management"
      description="Add, edit, or remove solutions displayed on your website."
      icon={<Lightbulb className="mr-2 h-8 w-8" />}
    >
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Solution
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading solutions...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error loading solutions. Please try again.</div>
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
              {solutions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No solutions found. Click "Add New Solution" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                solutions.map((solution) => (
                  <TableRow key={solution.id}>
                    <TableCell className="font-medium">{solution.title}</TableCell>
                    <TableCell>{solution.icon}</TableCell>
                    <TableCell>{solution.order_index}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(solution.id, solution.active)}
                      >
                        {solution.active ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>{solution.language}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(solution)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(solution.id)}>
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
      
      {/* Add Solution Sheet */}
      <Sheet open={isAdding} onOpenChange={setIsAdding}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add New Solution</SheetTitle>
            <SheetDescription>
              Add a new solution to your website.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <SolutionForm onSuccess={handleFormSuccess} />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Solution Sheet */}
      <Sheet open={!!editingSolution} onOpenChange={(open) => !open && setEditingSolution(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Solution</SheetTitle>
            <SheetDescription>
              Update solution details.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {editingSolution && (
              <SolutionForm 
                id={editingSolution.id}
                initialData={editingSolution}
                onSuccess={handleFormSuccess}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
};

export default SolutionsAdmin;
