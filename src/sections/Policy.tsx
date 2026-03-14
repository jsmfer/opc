import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function Policy() {
  const { content } = useContentStore();
  const { policy } = content;

  return (
    <section className="relative py-24 bg-[#0a0f1a]">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={policy.policyImage} 
          alt="Policy Support" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0a0f1a]/90 to-[#0a0f1a]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            {policy.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            从<span className="text-gradient">{policy.highlightText1}</span>到<span className="text-gradient-cyan">{policy.highlightText2}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {policy.description}
          </p>
        </div>
        
        {/* City Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {policy.cityPolicies.map((city, index) => {
            const IconComponent = getIcon(city.icon);
            return (
              <Card key={index} className="glass-card border-0 hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${city.color} flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{city.city}</CardTitle>
                        <p className="text-sm text-gray-500">{city.policy}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {city.supports.map((support, supportIndex) => (
                      <div 
                        key={supportIndex}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      >
                        <span className="text-gray-400 text-sm">{support.label}</span>
                        <span className="text-white font-medium">{support.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 text-sm">{city.target}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Tax Benefits */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">{policy.taxTitle}</h3>
          <p className="text-gray-400">{policy.taxSubtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policy.taxBenefits.map((tax, index) => {
            const IconComponent = getIcon(tax.icon);
            return (
              <div key={index} className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{tax.title}</h4>
                </div>
                <div className="space-y-4">
                  {tax.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">{item.label}</span>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <a 
            href={policy.ctaLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {policy.ctaText}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
