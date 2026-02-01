import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { month: 'Jan', environmental: 45, social: 52, governance: 68 },
  { month: 'Feb', environmental: 48, social: 54, governance: 70 },
  { month: 'Mar', environmental: 52, social: 58, governance: 72 },
  { month: 'Apr', environmental: 55, social: 60, governance: 75 },
  { month: 'May', environmental: 60, social: 63, governance: 78 },
  { month: 'Jun', environmental: 65, social: 68, governance: 80 },
  { month: 'Jul', environmental: 70, social: 72, governance: 82 },
  { month: 'Aug', environmental: 72, social: 75, governance: 85 },
  { month: 'Sep', environmental: 75, social: 78, governance: 87 },
  { month: 'Oct', environmental: 78, social: 80, governance: 88 },
  { month: 'Nov', environmental: 82, social: 83, governance: 90 },
  { month: 'Dec', environmental: 85, social: 85, governance: 92 },
];

const ESGTrendsChart = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ 
    ...d, 
    environmental: 0, 
    social: 0, 
    governance: 0 
  })));

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedData(data.map(d => ({
          ...d,
          environmental: Math.round(d.environmental * easeOut),
          social: Math.round(d.social * easeOut),
          governance: Math.round(d.governance * easeOut),
        })));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={animatedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="envGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="govGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(164 15% 24%)" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            stroke="hsl(164 18% 72%)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(164 18% 72%)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(165 10% 10%)', 
              border: '1px solid hsl(164 15% 24%)',
              borderRadius: '8px',
              color: 'hsl(160 10% 95%)'
            }}
            formatter={(value: number) => [`${value}%`]}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-muted-foreground text-xs capitalize">{value}</span>}
          />
          <Line 
            type="monotone" 
            dataKey="environmental" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="social" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="governance" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Trend indicators */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-lg">↑</span>
          <span className="text-xs text-muted-foreground">Environmental +40%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400 text-lg">↑</span>
          <span className="text-xs text-muted-foreground">Social +33%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400 text-lg">↑</span>
          <span className="text-xs text-muted-foreground">Governance +24%</span>
        </div>
      </div>
    </div>
  );
};

export default ESGTrendsChart;
