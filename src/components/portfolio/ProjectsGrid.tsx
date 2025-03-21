
import React from 'react';
import ProjectCard, { Project } from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  console.log("Projects in grid:", projects); // Debugging

  if (!projects || projects.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No projects found. Please add some projects to the database.</div>;
  }
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
