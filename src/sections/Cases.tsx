import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function Cases() {
  const { content } = useContentStore();
  const { cases } = content;

  return (
    <section className="relative py-24 bg-[#0d1321]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
            {cases.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            他们正在实现<span className="text-gradient">{cases.highlightText}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {cases.description}
          </p>
        </div>
        
        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {cases.globalStats.map((stat, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-xl text-center hover-lift"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-cyan-400 text-xs">{stat.growth}</p>
            </div>
          ))}
        </div>
        
        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.cases.map((item, index) => (
            <Card key={index} className="glass-card border-0 hover-lift">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.avatarColor} flex items-center justify-center`}>
                      <span className="text-white font-bold">{item.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-400">{item.income}</div>
                    <p className="text-gray-500 text-xs">{item.product}</p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex}
                      variant="secondary"
                      className="bg-white/10 text-gray-300 hover:bg-white/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Metrics */}
                <div className="flex gap-6 pt-4 border-t border-white/10">
                  {item.metrics.map((metric, metricIndex) => {
                    const IconComponent = getIcon(metric.icon);
                    return (
                      <div key={metricIndex} className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-cyan-400" />
                        <span className="text-white font-medium">{metric.value}</span>
                        <span className="text-gray-500 text-sm">{metric.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quote */}
        <div className="mt-16 glass-card p-8 rounded-2xl relative">
          <Quote className="absolute top-6 left-6 w-8 h-8 text-cyan-500/30" />
          <blockquote className="text-xl text-center text-gray-300 italic max-w-3xl mx-auto pt-4">
            {cases.quote}
          </blockquote>
          <p className="text-center text-gray-500 mt-4">{cases.quoteAuthor}</p>
        </div>
      </div>
    </section>
  );
}
