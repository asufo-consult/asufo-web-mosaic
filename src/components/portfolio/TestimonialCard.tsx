
import React from 'react';

interface TestimonialProps {
  name: string;
  company: string;
  quote: string;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, company, quote, image }) => {
  return (
    <div className="metal-card p-8">
      <div className="flex items-center mb-6">
        <svg className="text-primary h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-muted-foreground mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="mr-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {name.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
