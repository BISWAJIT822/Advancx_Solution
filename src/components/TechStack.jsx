import React from 'react';
import { Atom, Braces, Hexagon, Code2, Smartphone, Cloud, Container, Boxes, Database, BrainCircuit, Share2, Server } from 'lucide-react';

const TechStack = () => {
  const techs = [
    { name: 'React', icon: <Atom size={18} /> },
    { name: 'TypeScript', icon: <Braces size={18} /> },
    { name: 'Node.js', icon: <Hexagon size={18} /> },
    { name: 'Python', icon: <Code2 size={18} /> },
    { name: 'Flutter', icon: <Smartphone size={18} /> },
    { name: 'AWS', icon: <Cloud size={18} /> },
    { name: 'Docker', icon: <Container size={18} /> },
    { name: 'Kubernetes', icon: <Boxes size={18} /> },
    { name: 'PostgreSQL', icon: <Database size={18} /> },
    { name: 'TensorFlow', icon: <BrainCircuit size={18} /> },
    { name: 'GraphQL', icon: <Share2 size={18} /> },
    { name: 'Redis', icon: <Server size={18} /> },
  ];

  // Duplicate for a seamless horizontal loop
  const marqueeTechs = [...techs, ...techs];

  return (
    <section className="partners-section tech-section">
      <div className="container">
        <p className="partners-title">Technologies We Use</p>
        <div className="partners-scroll-wrapper tech-scroll">
          <div className="partners-flex">
            {marqueeTechs.map((tech, idx) => (
              <div key={idx} className="partner-logo">
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
