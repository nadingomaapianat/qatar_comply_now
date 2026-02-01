import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink?: string;
  iconColor?: string;
}

const PillarCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  ctaText, 
  ctaLink,
  iconColor = 'text-primary'
}: PillarCardProps) => {
  const CardContent = (
    <GlassCard className="h-full flex flex-col">
      <div className={`w-12 h-12 rounded-xl btn-gradient flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      
      <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
        {ctaText}
        <ArrowRight size={16} />
      </div>
    </GlassCard>
  );

  if (ctaLink) {
    return (
      <Link to={ctaLink} className="group block h-full">
        {CardContent}
      </Link>
    );
  }

  return <div className="group h-full cursor-pointer">{CardContent}</div>;
};

export default PillarCard;
