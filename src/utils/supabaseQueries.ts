
import { supabase } from '@/integrations/supabase/client';

export const fetchProjects = async (language = 'en') => {
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_facts(*)')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data || [];
};

export const fetchProjectsByCategory = async (category: string, language = 'en') => {
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_facts(*)')
    .eq('language', language)
    .eq('active', true)
    .eq('category', category)
    .order('order_index');
  
  if (error) {
    console.error(`Error fetching ${category} projects:`, error);
    return [];
  }
  
  return data || [];
};

export const fetchServices = async (language = 'en') => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data || [];
};

export const fetchSolutions = async (language = 'en') => {
  const { data, error } = await supabase
    .from('solutions')
    .select('*')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  if (error) {
    console.error('Error fetching solutions:', error);
    return [];
  }
  
  return data || [];
};
