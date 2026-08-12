import React from 'react';
import {
  ShoppingCart,
  Plane,
  HeartPulse,
  Building2,
  GraduationCap,
  Truck,
  Lightbulb,
  Umbrella,
  Clapperboard,
  Factory,
} from 'lucide-react';

const industries = [
  { icon: ShoppingCart, label: 'Ecommerce' },
  { icon: Plane, label: 'Travel & Hospitality' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: Building2, label: 'Real Estate & Construction' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Truck, label: 'Transportation & Logistics' },
  { icon: Lightbulb, label: 'Utilities & On Demand' },
  { icon: Umbrella, label: 'Finance & Insurance' },
  { icon: Clapperboard, label: 'Media & Entertainment' },
  { icon: Factory, label: 'Manufacturing' },
];

const Services = () => {
  return (
    <section id="services" className="industries-section">
      <div className="container">
        <div className="industries-header reveal">
          <span className="industries-eyebrow">Industries We Serve</span>
          <h2>Customized Digital Solutions For Every Industry</h2>
          <p>
            Every industry comes with its own challenges, and businesses need solutions that fit the
            way they work. Our web, software, mobile and AI expertise helps organizations improve
            processes, serve customers better, and grow with confidence.
          </p>
        </div>

        <div className="industries-grid reveal">
          {industries.map(({ icon: Icon, label }) => (
            <div key={label} className="industry-card">
              <Icon className="industry-icon" size={40} strokeWidth={1.2} />
              <span className="industry-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
