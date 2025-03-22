
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Package, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';

const ProjectsAdmin: React.FC = () => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Fetch projects
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['admin-projects', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_facts(*)')
        .order('order_index');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // First delete related project_facts
      await supabase
        .from('project_facts')
        .delete()
        .eq('project_id', id);
        
      // Then delete the project
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Toggle active status mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from('projects')
        .update({ active, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({
        title: "Status updated",
        description: "The project status has been updated."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update project status. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    toggleActiveMutation.mutate({ id, active: !currentStatus });
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
  };

  const handleFormSuccess = () => {
    setIsAdding(false);
    setEditingProject(null);
    queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
  };

  return (
    <AdminLayout
      title="Projects Management"
      description="Add, edit, or remove projects in your portfolio."
      icon={<Package className="mr-2 h-8 w-8" />}
    >
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error loading projects. Please try again.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Facts</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No projects found. Click "Add New Project" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.category || 'Uncategorized'}</TableCell>
                    <TableCell>{project.project_facts?.length || 0} facts</TableCell>
                    <TableCell>{project.order_index}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(project.id, project.active)}
                      >
                        {project.active ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>{project.language}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)}>
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
      
      {/* Add Project Sheet */}
      <Sheet open={isAdding} onOpenChange={setIsAdding}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>Add New Project</SheetTitle>
            <SheetDescription>
              Add a new project to your portfolio.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ProjectForm onSuccess={handleFormSuccess} />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Project Sheet */}
      <Sheet open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>Edit Project</SheetTitle>
            <SheetDescription>
              Update project details.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {editingProject && (
              <ProjectForm 
                id={editingProject.id}
                initialData={{
                  ...editingProject,
                  facts: editingProject.project_facts
                }}
                onSuccess={handleFormSuccess}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
};

export default ProjectsAdmin;
