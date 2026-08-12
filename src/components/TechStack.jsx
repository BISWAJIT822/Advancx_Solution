import React from 'react';
import { Atom, Braces, Hexagon, Code2, Smartphone, Cloud, Container, Boxes, Database, BrainCircuit, Share2, Server } from 'lucide-react';

const TechStack = () => {
  // Each technology in its official brand colour
  const techs = [
    { name: 'React', icon: <Atom size={18} />, color: '#61DAFB' },
    { name: 'TypeScript', icon: <Braces size={18} />, color: '#3178C6' },
    { name: 'Node.js', icon: <Hexagon size={18} />, color: '#5FA04E' },
    { name: 'Python', icon: <Code2 size={18} />, color: '#3776AB' },
    { name: 'Flutter', icon: <Smartphone size={18} />, color: '#02569B' },
    { name: 'AWS', icon: <Cloud size={18} />, color: '#FF9900' },
    { name: 'Docker', icon: <Container size={18} />, color: '#2496ED' },
    { name: 'Kubernetes', icon: <Boxes size={18} />, color: '#326CE5' },
    { name: 'PostgreSQL', icon: <Database size={18} />, color: '#336791' },
    { name: 'TensorFlow', icon: <BrainCircuit size={18} />, color: '#FF6F00' },
    { name: 'GraphQL', icon: <Share2 size={18} />, color: '#E10098' },
    { name: 'Redis', icon: <Server size={18} />, color: '#DC382D' },
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
              <div key={idx} className="partner-logo" style={{ color: tech.color }}>
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
