// Central icon registry.
// Content stores icons as plain strings so they survive JSON export/import;
// this maps those strings back to lucide components at render time.
import {
  Atom, Award, BookOpen, Boxes, BrainCircuit, Briefcase, Building2, Clapperboard,
  Cloud, Code2, Container, Cpu, Database, Eye, Factory, Globe, GraduationCap,
  HeartPulse, Hexagon, Image as ImageIcon, KeyRound, Layers, LifeBuoy, Lightbulb,
  Lock, Plane, Plug, Rocket, ScrollText, Server, ServerCog, Share2, Shield,
  ShieldCheck, ShoppingCart, Smartphone, Target, TrendingUp, Truck, Umbrella, Zap,
} from 'lucide-react';

export const iconRegistry = {
  Atom, Award, BookOpen, Boxes, BrainCircuit, Briefcase, Building2, Clapperboard,
  Cloud, Code2, Container, Cpu, Database, Eye, Factory, Globe, GraduationCap,
  HeartPulse, Hexagon, ImageIcon, KeyRound, Layers, LifeBuoy, Lightbulb, Lock,
  Plane, Plug, Rocket, ScrollText, Server, ServerCog, Share2, Shield, ShieldCheck,
  ShoppingCart, Smartphone, Target, TrendingUp, Truck, Umbrella, Zap,
};

export const iconNames = Object.keys(iconRegistry).sort();

// Falls back to a neutral icon so a bad/renamed key never crashes a page.
export const getIcon = (name) => iconRegistry[name] || Boxes;
