import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function BusinessLoop() {
  const { content } = useContentStore();
  const { businessLoop } = content;

  return (
    <section className="relative py-24 bg-[#0a0f1a]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1321] to-[#0a0f1a]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            {businessLoop.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            从<span className="text-gradient-cyan">{businessLoop.highlightText1}</span>到<span className="text-gradient">{businessLoop.highlightText2}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {businessLoop.description}
          </p>
        </div>
        
        {/* Business Loop Image */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <img 
            src={businessLoop.businessImage} 
            alt="Business Loop" 
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
        </div>
        
        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/60 via-purple-500/60 to-emerald-500/60 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessLoop.steps.map((step, index) => {
              const IconComponent = getIcon(step.icon);
              return (
                <Card 
                  key={index} 
                  className="glass-card border-0 hover-lift relative z-10 bg-[#1a1f2e]/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6 relative z-20">
                    {/* Step Number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold z-30">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 relative z-20`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1 relative z-20">{step.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 relative z-20">{step.subtitle}</p>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 relative z-20">{step.description}</p>
                    
                    {/* Tools */}
                    <div className="mb-4 relative z-20">
                      <p className="text-xs text-gray-500 mb-2">核心工具</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tools.map((tool, toolIndex) => (
                          <span 
                            key={toolIndex}
                            className="px-2 py-1 text-xs rounded bg-white/10 text-gray-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Outputs */}
                    <div className="relative z-20">
                      <p className="text-xs text-gray-500 mb-2">输出成果</p>
                      <div className="space-y-1">
                        {step.outputs.map((output, outputIndex) => (
                          <div key={outputIndex} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span className="text-xs text-gray-400">{output}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Cycle Indicator */}
        <div className="flex justify-center mt-12">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-gray-300">{businessLoop.cycleText}</span>
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        {/* Benefits */}
        <div className="mt-16 glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            {businessLoop.benefitsTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {businessLoop.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-gray-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
