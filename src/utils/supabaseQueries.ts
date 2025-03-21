
import { supabase } from '@/integrations/supabase/client';

export const fetchProjects = async (language = 'en') => {
  console.log("Fetching projects with language:", language);
  
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_facts(*)')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  
  console.log("Projects data from Supabase:", data);
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
    throw error;
  }
  
  return data || [];
};

export const fetchServices = async (language = 'en') => {
  console.log("Fetching services with language:", language);
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
  
  console.log("Services data from Supabase:", data);
  return data || [];
};

export const fetchSolutions = async (language = 'en') => {
  console.log("Fetching solutions with language:", language);
  
  const { data, error } = await supabase
    .from('solutions')
    .select('*')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  if (error) {
    console.error('Error fetching solutions:', error);
    throw error;
  }
  
  console.log("Solutions data from Supabase:", data);
  return data || [];
};
