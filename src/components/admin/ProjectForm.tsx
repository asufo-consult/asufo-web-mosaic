
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

interface ProjectFormProps {
  id?: string;
  initialData?: {
    title: string;
    description: string;
    image: string;
    category: string;
    link?: string;
    order_index?: number;
    active?: boolean;
    facts?: { fact: string }[];
  };
  onSuccess?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ id, initialData, onSuccess }) => {
  const { language } = useLanguage();
  const [facts, setFacts] = useState<string[]>(
    initialData?.facts?.map(f => f.fact) || ['']
  );
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      image: '',
      category: '',
      link: '',
      order_index: 0,
      active: true
    }
  });

  const addFact = () => {
    setFacts([...facts, '']);
  };

  const removeFact = (index: number) => {
    const newFacts = [...facts];
    newFacts.splice(index, 1);
    setFacts(newFacts);
  };

  const updateFact = (index: number, value: string) => {
    const newFacts = [...facts];
    newFacts[index] = value;
    setFacts(newFacts);
  };

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update({
            title: data.title,
            description: data.description,
            image: data.image,
            category: data.category,
            link: data.link,
            order_index: data.order_index,
            active: data.active,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (error) throw error;
        
        // Handle facts - first delete existing facts
        await supabase
          .from('project_facts')
          .delete()
          .eq('project_id', id);
        
        // Then add new facts
        if (facts.length > 0 && facts[0] !== '') {
          const factsData = facts
            .filter(fact => fact.trim() !== '')
            .map(fact => ({
              project_id: id,
              fact,
              language
            }));
          
          const { error: factsError } = await supabase
            .from('project_facts')
            .insert(factsData);
            
          if (factsError) throw factsError;
        }
        
        toast({
          title: "Project updated",
          description: "The project has been successfully updated."
        });
      } else {
        // Create new project
        const { data: newProject, error } = await supabase
          .from('projects')
          .insert({
            title: data.title,
            description: data.description,
            image: data.image,
            category: data.category,
            link: data.link,
            order_index: data.order_index,
            active: data.active,
            language
          })
          .select()
          .single();

        if (error) throw error;
        
        // Add facts for the new project
        if (facts.length > 0 && facts[0] !== '') {
          const factsData = facts
            .filter(fact => fact.trim() !== '')
            .map(fact => ({
              project_id: newProject.id,
              fact,
              language
            }));
          
          const { error: factsError } = await supabase
            .from('project_facts')
            .insert(factsData);
            
          if (factsError) throw factsError;
        }
        
        toast({
          title: "Project created",
          description: "The new project has been successfully created."
        });
      }
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save project. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              className="min-h-32"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="Enter image URL"
              {...register("image")}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Enter project category"
              {...register("category")}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link">Project Link (optional)</Label>
            <Input
              id="link"
              placeholder="Enter project URL"
              {...register("link")}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order_index">Order Index</Label>
            <Input
              id="order_index"
              type="number"
              {...register("order_index", { valueAsNumber: true })}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <Label>Project Facts</Label>
              <Button type="button" variant="outline" size="sm" onClick={addFact}>
                Add Fact
              </Button>
            </div>
            
            {facts.map((fact, index) => (
              <div key={index} className="flex gap-2 items-start">
                <Input
                  value={fact}
                  onChange={(e) => updateFact(index, e.target.value)}
                  placeholder={`Enter fact #${index + 1}`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFact(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isSubmitting}>
              {id ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
