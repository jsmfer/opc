import { Card, CardContent } from '@/components/ui/card';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function Concept() {
  const { content } = useContentStore();
  const { concept } = content;

  const titleLines = concept.title.split('\n');

  return (
    <section className="relative py-24 bg-[#0a0f1a]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1321] to-[#0a0f1a]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
            {concept.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {titleLines.map((line, index) => (
              <span key={index}>
                {line.includes(concept.highlightText) ? (
                  <span dangerouslySetInnerHTML={{ 
                    __html: line.replace(
                      concept.highlightText, 
                      `<span class="text-gradient">${concept.highlightText}</span>`
                    ) 
                  }} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                )}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {concept.description}
          </p>
        </div>
        
        {/* Main Concept Image */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <img 
            src={concept.conceptImage} 
            alt="OPC Concept" 
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {concept.features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            return (
              <Card 
                key={index} 
                className="glass-card border-0 hover-lift group"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Trend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concept.trends.map((trend, index) => {
            const IconComponent = getIcon(trend.icon);
            return (
              <div 
                key={index}
                className="glass-card p-8 rounded-2xl hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{trend.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{trend.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl sm:text-3xl font-light text-white italic max-w-4xl mx-auto">
            {concept.quote}
          </blockquote>
          <p className="mt-4 text-gray-500">{concept.quoteAuthor}</p>
        </div>
      </div>
    </section>
  );
}
