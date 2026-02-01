import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const pieData = [
  { name: 'Qatar', value: 100, color: 'hsl(160, 100%, 51%)' },
];

const trendData = [
  { month: 'Jan', qatar: 50 },
  { month: 'Feb', qatar: 55 },
  { month: 'Mar', qatar: 60 },
  { month: 'Apr', qatar: 65 },
  { month: 'May', qatar: 72 },
  { month: 'Jun', qatar: 78 },
];

interface RegionalStatsProps {
  className?: string;
}

const RegionalStats = ({ className }: RegionalStatsProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [animatedPieData, setAnimatedPieData] = useState(pieData.map(d => ({ ...d, value: 0 })));

  useEffect(() => {
    if (isVisible) {
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedPieData(pieData.map(item => ({
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
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Pie Chart - Qatar Coverage */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-center">Qatar Coverage</h3>
          <div className="h-[180px] sm:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={animatedPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {animatedPieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      style={{ filter: `drop-shadow(0 0 6px ${entry.color})` }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] sm:text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Area Chart - Compliance Trends */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-center">Compliance Trends</h3>
          <div className="h-[180px] sm:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="qatarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 100%, 51%)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(160, 100%, 51%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(164 18% 72%)" 
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 9 }}
                />
                <YAxis 
                  stroke="hsl(164 18% 72%)" 
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  width={30}
                  tick={{ fontSize: 9 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(165 10% 10%)',
                    border: '1px solid hsl(164 15% 24%)',
                    borderRadius: '8px',
                    color: 'hsl(160 10% 95%)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="qatar"
                  stroke="hsl(160, 100%, 51%)"
                  fillOpacity={1}
                  fill="url(#qatarGradient)"
                  strokeWidth={2}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalStats;
