import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const data = [
  { name: 'COSO', value: 92 },
  { name: 'Cybersecurity', value: 87 },
  { name: 'Data Privacy', value: 78 },
  { name: 'ESG', value: 85 },
  { name: 'AML', value: 91 },
];

const colors = [
  'hsl(152, 60%, 30%)',
  'hsl(155, 70%, 35%)',
  'hsl(157, 80%, 40%)',
  'hsl(159, 90%, 45%)',
  'hsl(159, 100%, 51%)',
];

const AnimatedBarChart = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })));

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedData(data);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full h-[300px] md:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={animatedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(164 15% 24%)" opacity={0.3} horizontal={false} />
          <XAxis 
            type="number" 
            stroke="hsl(164 18% 72%)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="hsl(164 18% 72%)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={100}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(165 10% 10%)', 
              border: '1px solid hsl(164 15% 24%)',
              borderRadius: '8px',
              color: 'hsl(160 10% 95%)'
            }}
            formatter={(value: number) => [`${value}%`, 'Score']}
          />
          <Bar 
            dataKey="value" 
            radius={[0, 8, 8, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {animatedData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
                style={{
                  transition: 'all 0.6s ease-out',
                  transitionDelay: `${index * 150}ms`
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnimatedBarChart;
