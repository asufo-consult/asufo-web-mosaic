
import { supabase } from '@/integrations/supabase/client';

export const fetchProjects = async (language = 'en') => {
  console.log("Fetching projects with language:", language);
  
  let { data, error } = await supabase
    .from('projects')
    .select('*, project_facts(*)')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  // If no results for the specific language, try to get any projects regardless of language
  if ((!data || data.length === 0) && language !== 'en') {
    console.log("No projects found for language", language, ", trying fallback...");
    
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('projects')
      .select('*, project_facts(*)')
      .eq('active', true)
      .order('order_index');
    
    if (fallbackError) {
      console.error('Error fetching fallback projects:', fallbackError);
      throw fallbackError;
    }
    
    data = fallbackData;
    console.log("Fallback projects data:", data);
  }
  
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  
  console.log("Projects data from Supabase:", data);
  return data || [];
};

export const fetchProjectsByCategory = async (category: string, language = 'en') => {
  let { data, error } = await supabase
    .from('projects')
    .select('*, project_facts(*)')
    .eq('language', language)
    .eq('active', true)
    .eq('category', category)
    .order('order_index');
  
  // If no results for the specific language, try to get any projects in the category regardless of language
  if ((!data || data.length === 0) && language !== 'en') {
    console.log("No projects found for category", category, "and language", language, ", trying fallback...");
    
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('projects')
      .select('*, project_facts(*)')
      .eq('active', true)
      .eq('category', category)
      .order('order_index');
    
    if (fallbackError) {
      console.error(`Error fetching fallback ${category} projects:`, fallbackError);
      throw fallbackError;
    }
    
    data = fallbackData;
  }
  
  if (error) {
    console.error(`Error fetching ${category} projects:`, error);
    throw error;
  }
  
  return data || [];
};

export const fetchServices = async (language = 'en') => {
  console.log("Fetching services with language:", language);
  
  let { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  // If no results for the specific language, try to get any services regardless of language
  if ((!data || data.length === 0) && language !== 'en') {
    console.log("No services found for language", language, ", trying fallback...");
    
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('order_index');
    
    if (fallbackError) {
      console.error('Error fetching fallback services:', fallbackError);
      throw fallbackError;
    }
    
    data = fallbackData;
    console.log("Fallback services data:", data);
  }
  
  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
  
  console.log("Services data from Supabase:", data);
  return data || [];
};

export const fetchSolutions = async (language = 'en') => {
  console.log("Fetching solutions with language:", language);
  
  let { data, error } = await supabase
    .from('solutions')
    .select('*')
    .eq('language', language)
    .eq('active', true)
    .order('order_index');
  
  // If no results for the specific language, try to get any solutions regardless of language
  if ((!data || data.length === 0) && language !== 'en') {
    console.log("No solutions found for language", language, ", trying fallback...");
    
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('solutions')
      .select('*')
      .eq('active', true)
      .order('order_index');
    
    if (fallbackError) {
      console.error('Error fetching fallback solutions:', fallbackError);
      throw fallbackError;
    }
    
    data = fallbackData;
    console.log("Fallback solutions data:", data);
  }
  
  if (error) {
    console.error('Error fetching solutions:', error);
    throw error;
  }
  
  console.log("Solutions data from Supabase:", data);
  return data || [];
};
