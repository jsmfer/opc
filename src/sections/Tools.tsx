import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function Tools() {
  const { content } = useContentStore();
  const { tools } = content;

  return (
    <section className="relative py-24 bg-[#0d1321]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            {tools.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            你的<span className="text-gradient">{tools.highlightText}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {tools.description}
          </p>
        </div>
        
        {/* Tools Image */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <img 
            src={tools.toolsImage} 
            alt="AI Tools Ecosystem" 
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1321] via-transparent to-transparent" />
        </div>
        
        {/* Tool Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tools.categories.map((category, index) => {
            const IconComponent = getIcon(category.icon);
            return (
              <Card key={index} className="glass-card border-0 hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tools.map((tool, toolIndex) => (
                      <a
                        key={toolIndex}
                        href={tool.link}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                      >
                        <div>
                          <span className="text-white font-medium">{tool.name}</span>
                          <span className="text-gray-500 text-sm ml-2">{tool.desc}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* AI Agent Examples */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">{tools.agentTitle}</h3>
          <p className="text-gray-400">{tools.agentSubtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.agentExamples.map((agent, index) => {
            const IconComponent = getIcon(agent.icon);
            return (
              <div 
                key={index}
                className="glass-card p-6 rounded-xl text-center hover-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{agent.title}</h4>
                <p className="text-gray-400 text-sm">{agent.description}</p>
              </div>
            );
          })}
        </div>
        
        {/* Stats */}
        <div className="mt-16 glass-card p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {tools.stats.map((stat, index) => (
              <div key={index}>
                <div className={`text-4xl font-bold text-${['cyan', 'purple', 'emerald'][index]}-400 mb-2`}>
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
