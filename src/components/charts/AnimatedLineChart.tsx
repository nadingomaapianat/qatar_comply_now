import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const data = [
  { month: 'Jan', compliance: 45, risk: 65 },
  { month: 'Feb', compliance: 52, risk: 58 },
  { month: 'Mar', compliance: 61, risk: 52 },
  { month: 'Apr', compliance: 67, risk: 48 },
  { month: 'May', compliance: 74, risk: 42 },
  { month: 'Jun', compliance: 82, risk: 35 },
  { month: 'Jul', compliance: 89, risk: 28 },
  { month: 'Aug', compliance: 94, risk: 22 },
];

const AnimatedLineChart = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimate(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full h-[300px] md:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(165 10% 10%)', 
              border: '1px solid hsl(164 15% 24%)',
              borderRadius: '8px',
              color: 'hsl(160 10% 95%)'
            }}
          />
          <Line
            type="monotone"
            dataKey="compliance"
            stroke="hsl(152 60% 30%)"
            strokeWidth={3}
            dot={{ fill: 'hsl(152 60% 30%)', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: 'hsl(159 100% 51%)' }}
            strokeDasharray={animate ? "0" : "1000"}
            strokeDashoffset={animate ? "0" : "1000"}
            style={{
              transition: 'stroke-dashoffset 2s ease-out',
            }}
          />
          <Line
            type="monotone"
            dataKey="risk"
            stroke="hsl(159 100% 51%)"
            strokeWidth={3}
            dot={{ fill: 'hsl(159 100% 51%)', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: 'hsl(152 60% 30%)' }}
            strokeDasharray={animate ? "0" : "1000"}
            strokeDashoffset={animate ? "0" : "1000"}
            style={{
              transition: 'stroke-dashoffset 2s ease-out 0.3s',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnimatedLineChart;
