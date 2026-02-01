const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient with subtle animation */}
      <div className="absolute inset-0 gradient-bg-subtle" />
      
      {/* Hero gradient orbs layer */}
      <div className="hero-gradient absolute inset-0" />
      
      {/* Enhanced floating orbs with 3D-like glow */}
      <div 
        className="floating-orb orb-mint w-[800px] h-[800px] -top-60 -left-40 animate-pulse-glow"
        style={{ 
          animationDelay: '0s',
          filter: 'blur(100px)',
          opacity: 0.35,
        }}
      />
      <div 
        className="floating-orb orb-primary w-[600px] h-[600px] top-1/4 -right-32 animate-pulse-glow"
        style={{ 
          animationDelay: '-3s',
          filter: 'blur(80px)',
          opacity: 0.4,
        }}
      />
      <div 
        className="floating-orb orb-sage w-[500px] h-[500px] bottom-10 left-1/4 animate-pulse-glow"
        style={{ 
          animationDelay: '-6s',
          filter: 'blur(90px)',
          opacity: 0.3,
        }}
      />
      <div 
        className="floating-orb orb-mint w-[400px] h-[400px] top-2/3 left-2/3 animate-pulse-glow"
        style={{ 
          animationDelay: '-9s',
          filter: 'blur(70px)',
          opacity: 0.25,
        }}
      />
      
      {/* Additional depth layer - subtle spherical gradient highlights */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full top-1/3 right-1/4"
        style={{
          background: 'radial-gradient(circle, hsl(159 100% 51% / 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '-5s',
        }}
      />
      <div 
        className="absolute w-[250px] h-[250px] rounded-full bottom-1/4 left-1/3"
        style={{
          background: 'radial-gradient(circle, hsl(152 60% 30% / 0.2) 0%, transparent 70%)',
          filter: 'blur(35px)',
          animation: 'float 18s ease-in-out infinite reverse',
          animationDelay: '-8s',
        }}
      />
      
      {/* Noise overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--gradient-sage)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--gradient-sage)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Top gradient fade */}
      <div 
        className="absolute inset-x-0 top-0 h-[40vh]"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)',
        }}
      />
      
      {/* Bottom vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.6) 100%)',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
