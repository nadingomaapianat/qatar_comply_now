import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface RequirementData {
  name: string;
  fullName: string;
  compliance: number;
}

const pciRequirements: RequirementData[] = [
  { name: 'R1', fullName: 'Firewall Configuration', compliance: 95 },
  { name: 'R2', fullName: 'Vendor Defaults', compliance: 88 },
  { name: 'R3', fullName: 'Cardholder Data', compliance: 82 },
  { name: 'R4', fullName: 'Encryption', compliance: 90 },
  { name: 'R5', fullName: 'Malware Protection', compliance: 85 },
  { name: 'R6', fullName: 'Secure Systems', compliance: 78 },
  { name: 'R7', fullName: 'Access Control', compliance: 92 },
  { name: 'R8', fullName: 'User IDs', compliance: 88 },
  { name: 'R9', fullName: 'Physical Access', compliance: 75 },
  { name: 'R10', fullName: 'Network Monitoring', compliance: 80 },
  { name: 'R11', fullName: 'Security Testing', compliance: 72 },
  { name: 'R12', fullName: 'Policies', compliance: 85 },
];

const getBarColor = (value: number) => {
  if (value >= 90) return 'hsl(155, 80%, 35%)';
  if (value >= 80) return 'hsl(160, 100%, 51%)';
  if (value >= 70) return 'hsl(45, 100%, 50%)';
  return 'hsl(0, 80%, 50%)';
};

interface PCIComplianceChartProps {
  className?: string;
}

const PCIComplianceChart = ({ className }: PCIComplianceChartProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [animatedData, setAnimatedData] = useState(pciRequirements.map(d => ({ ...d, compliance: 0 })));

  useEffect(() => {
    if (isVisible) {
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedData(pciRequirements.map(item => ({
          ...item,
          compliance: Math.round(easeOut * item.compliance),
        })));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  const overallCompliance = Math.round(
    pciRequirements.reduce((sum, r) => sum + r.compliance, 0) / pciRequirements.length
  );

  return (
    <div
      ref={ref}
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      {/* Overall Score */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full glass">
          <span className="text-xs sm:text-sm text-muted-foreground">Overall PCI-DSS v4.0 Compliance:</span>
          <span className="text-xl sm:text-2xl font-bold gradient-text">{overallCompliance}%</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-[220px] sm:h-[280px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={animatedData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              stroke="hsl(164 18% 72%)" 
              fontSize={9}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8 }}
              interval={0}
            />
            <YAxis 
              stroke="hsl(164 18% 72%)" 
              fontSize={9}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              width={35}
              tick={{ fontSize: 8 }}
            />
            <Tooltip
              cursor={{ fill: 'hsl(164 15% 24% / 0.3)' }}
              contentStyle={{
                backgroundColor: 'hsl(165 10% 10%)',
                border: '1px solid hsl(164 15% 24%)',
                borderRadius: '8px',
                color: 'hsl(160 10% 95%)',
                fontSize: '12px',
              }}
              formatter={(value: number, name: string, props: any) => [
                `${value}%`,
                props.payload.fullName
              ]}
              labelFormatter={(label) => `Requirement ${label}`}
            />
            <Bar
              dataKey="compliance"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {animatedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.compliance)}
                  style={{
                    filter: `drop-shadow(0 0 4px ${getBarColor(entry.compliance)})`,
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: 'hsl(155, 80%, 35%)' }} />
          <span className="text-[10px] sm:text-xs text-muted-foreground">≥90%</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: 'hsl(160, 100%, 51%)' }} />
          <span className="text-[10px] sm:text-xs text-muted-foreground">80-89%</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: 'hsl(45, 100%, 50%)' }} />
          <span className="text-[10px] sm:text-xs text-muted-foreground">70-79%</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: 'hsl(0, 80%, 50%)' }} />
          <span className="text-[10px] sm:text-xs text-muted-foreground">{'<70%'}</span>
        </div>
      </div>
    </div>
  );
};

export default PCIComplianceChart;
