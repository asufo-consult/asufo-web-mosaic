
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

interface SolutionFormProps {
  id?: string;
  initialData?: {
    title: string;
    description: string;
    icon: string;
    color: string;
    order_index?: number;
    active?: boolean;
  };
  onSuccess?: () => void;
}

const SolutionForm: React.FC<SolutionFormProps> = ({ id, initialData, onSuccess }) => {
  const { language } = useLanguage();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      icon: '',
      color: 'from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700',
      order_index: 0,
      active: true
    }
  });

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        // Update existing solution
        const { error } = await supabase
          .from('solutions')
          .update({
            title: data.title,
            description: data.description,
            icon: data.icon,
            color: data.color,
            order_index: data.order_index,
            active: data.active,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (error) throw error;
        toast({
          title: "Solution updated",
          description: "The solution has been successfully updated."
        });
      } else {
        // Create new solution
        const { error } = await supabase
          .from('solutions')
          .insert({
            title: data.title,
            description: data.description,
            icon: data.icon,
            color: data.color,
            order_index: data.order_index,
            active: data.active,
            language
          });

        if (error) throw error;
        toast({
          title: "Solution created",
          description: "The new solution has been successfully created."
        });
      }
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving solution:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save solution. Please try again.",
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
              placeholder="Enter solution title"
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
              placeholder="Enter solution description"
              className="min-h-32"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              placeholder="Enter icon name (e.g., 'lightbulb')"
              {...register("icon", { required: "Icon is required" })}
            />
            {errors.icon && (
              <p className="text-sm text-red-500">{errors.icon.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="color">Color Gradient</Label>
            <Input
              id="color"
              placeholder="Enter Tailwind gradient classes"
              {...register("color", { required: "Color is required" })}
            />
            {errors.color && (
              <p className="text-sm text-red-500">{errors.color.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order_index">Order Index</Label>
            <Input
              id="order_index"
              type="number"
              {...register("order_index", { valueAsNumber: true })}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isSubmitting}>
              {id ? "Update Solution" : "Create Solution"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SolutionForm;
