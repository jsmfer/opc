import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function Hero() {
  const { content } = useContentStore();
  const { hero } = content;

  const titleLines = hero.title.split('\n');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/70 via-[#0a0f1a]/50 to-[#0a0f1a]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-100">{hero.badge}</span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {titleLines.map((line, index) => (
            <span key={index}>
              {index === titleLines.length - 1 ? (
                <span className="text-gradient">{line}</span>
              ) : (
                <span className="text-white">{line}</span>
              )}
              {index < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          {hero.subtitle}
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto whitespace-pre-line">
          {hero.description}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 glow-cyan"
          >
            {hero.primaryCta}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl transition-all duration-300"
          >
            {hero.secondaryCta}
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {hero.stats.map((stat, index) => {
            const IconComponent = getIcon(stat.icon);
            return (
              <div key={index} className="glass-card p-6 rounded-xl hover-lift">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IconComponent className={`w-5 h-5 text-${stat.color}-400`} />
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.sublabel}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
