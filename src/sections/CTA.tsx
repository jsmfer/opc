import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Zap } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function CTA() {
  const { content } = useContentStore();
  const { cta } = content;

  const titleLines = cta.title.split('\n');
  const descriptionLines = cta.description.split('\n');

  return (
    <section className="relative py-24 bg-[#0a0f1a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-12 md:p-16 rounded-3xl text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {titleLines.map((line, index) => (
              <span key={index}>
                {line.includes(cta.highlightText) ? (
                  <>
                    {line.split(cta.highlightText)[0]}
                    <span className="text-gradient">{cta.highlightText}</span>
                    {line.split(cta.highlightText)[1]}
                  </>
                ) : (
                  line
                )}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          
          {/* Description */}
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {descriptionLines.map((line, index) => (
              <span key={index}>
                {line}
                {index < descriptionLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {cta.features.map((feature, index) => {
              const IconComponent = getIcon(feature.icon);
              return (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
                  <IconComponent className={`w-4 h-4 text-${feature.color}-400`} />
                  <span className="text-gray-300 text-sm">{feature.text}</span>
                </div>
              );
            })}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-10 py-7 text-lg rounded-xl transition-all duration-300 hover:scale-105 glow-cyan"
            >
              {cta.primaryCta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-xl transition-all duration-300"
            >
              {cta.secondaryCta}
            </Button>
          </div>
          
          {/* Trust Badge */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm mb-4">{cta.trustTitle}</p>
            <div className="flex justify-center items-center gap-8">
              {cta.trustStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              )).reduce((acc: React.ReactNode[], curr, index, arr) => {
                acc.push(curr);
                if (index < arr.length - 1) {
                  acc.push(<div key={`divider-${index}`} className="w-px h-10 bg-white/10" />);
                }
                return acc;
              }, [])}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
