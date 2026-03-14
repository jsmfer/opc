import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function GlobalNetwork() {
  const { content } = useContentStore();
  const { globalNetwork } = content;

  return (
    <section className="relative py-24 bg-[#0d1321]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            {globalNetwork.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            打破地理边界，<span className="text-gradient">{globalNetwork.highlightText}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {globalNetwork.description}
          </p>
        </div>
        
        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {globalNetwork.platforms.map((platform, index) => {
            const IconComponent = getIcon(platform.icon);
            return (
              <Card key={index} className="glass-card border-0 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
                      </div>
                    </div>
                    <a 
                      href={platform.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{platform.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {platform.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                    asChild
                  >
                    <a href={platform.website} target="_blank" rel="noopener noreferrer">
                      访问平台
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Advantages */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            {globalNetwork.advantagesTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalNetwork.advantages.map((advantage, index) => {
              const IconComponent = getIcon(advantage.icon);
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{advantage.title}</h4>
                  <p className="text-gray-400 text-sm">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Remote Work Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {globalNetwork.stats.map((stat, index) => (
            <div key={index} className="glass-card p-6 rounded-xl text-center">
              <div className={`text-3xl font-bold text-${['cyan', 'purple', 'emerald', 'amber'][index]}-400 mb-1`}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
