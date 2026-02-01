import { LucideIcon } from 'lucide-react';
import GlassCard from './GlassCard';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <GlassCard className="h-full">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </GlassCard>
  );
};

export default FeatureCard;
