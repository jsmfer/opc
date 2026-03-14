import { FormField, ListEditor, SectionCard } from '../FormComponents';
import type { ToolsContent } from '@/types/content';

interface ToolsEditorProps {
  content: ToolsContent;
  onChange: (content: ToolsContent) => void;
}

const iconOptions = ['Palette', 'Code2', 'Megaphone', 'Settings', 'Wand2', 'GitBranch', 'BarChart3', 'MessageSquare', 'Sparkles'];

export function ToolsEditor({ content, onChange }: ToolsEditorProps) {
  const updateField = <K extends keyof ToolsContent>(field: K, value: ToolsContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="区块标题" description="配置 AI 工具生态区块的标题">
        <FormField
          label="区块徽章"
          name="sectionBadge"
          value={content.sectionBadge}
          onChange={(value) => updateField('sectionBadge', value)}
          placeholder="AI工具生态"
        />
        <FormField
          label="标题"
          name="title"
          value={content.title}
          onChange={(value) => updateField('title', value)}
          placeholder="你的AI员工团队"
        />
        <FormField
          label="高亮文字"
          name="highlightText"
          value={content.highlightText}
          onChange={(value) => updateField('highlightText', value)}
          placeholder="AI员工团队"
        />
        <FormField
          label="描述"
          name="description"
          value={content.description}
          onChange={(value) => updateField('description', value)}
          type="textarea"
          rows={2}
        />
      </SectionCard>

      <SectionCard title="工具图片" description="配置工具生态图片">
        <FormField
          label="图片路径"
          name="toolsImage"
          value={content.toolsImage}
          onChange={(value) => updateField('toolsImage', value)}
          placeholder="/ai-tools.jpg"
        />
      </SectionCard>

      <ListEditor
        title="工具分类"
        items={content.categories}
        onChange={(categories) => updateField('categories', categories)}
        createNewItem={() => ({ 
          icon: 'Palette', 
          title: '新分类', 
          color: 'from-cyan-500 to-blue-500',
          tools: [{ name: '工具名称', desc: '工具描述', link: '#' }]
        })}
        addButtonText="添加工具分类"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">分类 #{index + 1}: {item.title}</span>
              <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除分类
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">图标</label>
                <select
                  value={item.icon}
                  onChange={(e) => onItemChange({ ...item, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">分类名称</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onItemChange({ ...item, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">渐变色</label>
              <input
                type="text"
                value={item.color}
                onChange={(e) => onItemChange({ ...item, color: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="from-cyan-500 to-blue-500"
              />
            </div>
            
            {/* Tools in category */}
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">工具列表</span>
                <button
                  type="button"
                  onClick={() => {
                    const newTools = [...item.tools, { name: '新工具', desc: '描述', link: '#' }];
                    onItemChange({ ...item, tools: newTools });
                  }}
                  className="text-xs text-cyan-600 hover:text-cyan-700"
                >
                  + 添加工具
                </button>
              </div>
              <div className="space-y-2">
                {item.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={tool.name}
                      onChange={(e) => {
                        const newTools = [...item.tools];
                        newTools[toolIndex] = { ...tool, name: e.target.value };
                        onItemChange({ ...item, tools: newTools });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="工具名"
                    />
                    <input
                      type="text"
                      value={tool.desc}
                      onChange={(e) => {
                        const newTools = [...item.tools];
                        newTools[toolIndex] = { ...tool, desc: e.target.value };
                        onItemChange({ ...item, tools: newTools });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="描述"
                    />
                    <input
                      type="text"
                      value={tool.link}
                      onChange={(e) => {
                        const newTools = [...item.tools];
                        newTools[toolIndex] = { ...tool, link: e.target.value };
                        onItemChange({ ...item, tools: newTools });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="链接"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newTools = [...item.tools];
                        newTools.splice(toolIndex, 1);
                        onItemChange({ ...item, tools: newTools });
                      }}
                      className="col-span-1 text-red-500 hover:text-red-700 text-xs"
                    >
                      删
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      />

      <SectionCard title="AI Agent 区域" description="配置 AI Agent 应用场景">
        <FormField
          label="区域标题"
          name="agentTitle"
          value={content.agentTitle}
          onChange={(value) => updateField('agentTitle', value)}
          placeholder="AI智能体应用场景"
        />
        <FormField
          label="副标题"
          name="agentSubtitle"
          value={content.agentSubtitle}
          onChange={(value) => updateField('agentSubtitle', value)}
          placeholder="40个AI Agent可替代5人团队的营销工作"
        />
      </SectionCard>

      <ListEditor
        title="AI Agent 示例"
        items={content.agentExamples}
        onChange={(agentExamples) => updateField('agentExamples', agentExamples)}
        createNewItem={() => ({ 
          icon: 'Wand2', 
          title: 'Agent名称', 
          description: 'Agent功能描述'
        })}
        addButtonText="添加Agent示例"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Agent #{index + 1}</span>
              <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">图标</label>
                <select
                  value={item.icon}
                  onChange={(e) => onItemChange({ ...item, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">名称</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onItemChange({ ...item, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">描述</label>
              <textarea
                value={item.description}
                onChange={(e) => onItemChange({ ...item, description: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                rows={2}
              />
            </div>
          </div>
        )}
      />

      <ListEditor
        title="统计数据"
        items={content.stats}
        onChange={(stats) => updateField('stats', stats)}
        createNewItem={() => ({ value: '0%', label: '统计描述' })}
        addButtonText="添加统计"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">统计 #{index + 1}</span>
              <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">数值</label>
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => onItemChange({ ...item, value: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="40%"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">描述</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => onItemChange({ ...item, label: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="描述文字"
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
