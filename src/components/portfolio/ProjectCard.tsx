
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Check } from 'lucide-react';

interface ProjectFact {
  id: string;
  fact: string;
  project_id: string;
  language: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  category: string;
  project_facts?: ProjectFact[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage();
  
  return (
    <div className="metal-card overflow-hidden group">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        
        {project.project_facts && project.project_facts.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-2">Key Facts</h4>
            <ul className="space-y-2">
              {project.project_facts.map((factItem) => (
                <li key={factItem.id} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span>{factItem.fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {project.link && (
          <a 
            href={project.link} 
            className="inline-flex items-center text-primary font-medium group-hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('portfolio.viewProject')}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
