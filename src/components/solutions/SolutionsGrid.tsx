
import React from 'react';
import SolutionCard, { Solution } from './SolutionCard';

interface SolutionsGridProps {
  solutions: Solution[];
}

const SolutionsGrid: React.FC<SolutionsGridProps> = ({ solutions }) => {
  // Debugging
  console.log("Solutions in grid:", solutions);
  
  if (!solutions || solutions.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No solutions found. Please add some solutions to the database.</div>;
  }
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {solutions.map((solution) => (
        <SolutionCard key={solution.id} solution={solution} />
      ))}
    </div>
  );
};

export default SolutionsGrid;
