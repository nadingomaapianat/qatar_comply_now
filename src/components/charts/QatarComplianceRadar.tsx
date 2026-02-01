import { useEffect, useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface QatarComplianceRadarProps {
  className?: string;
}

const initialData = [
  { subject: 'NIA', value: 0, fullMark: 100 },
  { subject: 'ISO 27001', value: 0, fullMark: 100 },
  { subject: 'PCI-DSS', value: 0, fullMark: 100 },
  { subject: 'QCB', value: 0, fullMark: 100 },
  { subject: 'Risk Mgmt', value: 0, fullMark: 100 },
  { subject: 'SOA', value: 0, fullMark: 100 },
];

const targetData = [
  { subject: 'NIA', value: 85, fullMark: 100 },
  { subject: 'ISO 27001', value: 92, fullMark: 100 },
  { subject: 'PCI-DSS', value: 78, fullMark: 100 },
  { subject: 'QCB', value: 88, fullMark: 100 },
  { subject: 'Risk Mgmt', value: 82, fullMark: 100 },
  { subject: 'SOA', value: 90, fullMark: 100 },
];

const QatarComplianceRadar = ({ className }: QatarComplianceRadarProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (isVisible) {
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setData(targetData.map((item, index) => ({
          ...item,
          value: Math.round(easeOut * item.value),
        })));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full h-[250px] sm:h-[300px] md:h-[350px] transition-all duration-700",
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        className
      )}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid 
            stroke="hsl(164 15% 24%)" 
            strokeOpacity={0.5}
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'hsl(164 18% 72%)', fontSize: 10 }}
            className="text-[8px] sm:text-[10px] md:text-xs"
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: 'hsl(164 18% 72%)', fontSize: 8 }}
            axisLine={false}
          />
          <Radar
            name="Compliance"
            dataKey="value"
            stroke="hsl(155 80% 35%)"
            fill="hsl(155 80% 35%)"
            fillOpacity={0.4}
            strokeWidth={2}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QatarComplianceRadar;
