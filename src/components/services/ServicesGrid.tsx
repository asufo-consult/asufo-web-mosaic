
import React from 'react';
import ServiceCard, { Service } from './ServiceCard';

interface ServicesGridProps {
  services: Service[];
  onServiceClick?: (serviceId: string) => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services, onServiceClick }) => {
  // Debugging
  console.log("Services in grid:", services);
  
  if (!services || services.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No services found.</div>;
  }
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard 
          key={service.id} 
          service={service} 
          onServiceClick={onServiceClick}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
