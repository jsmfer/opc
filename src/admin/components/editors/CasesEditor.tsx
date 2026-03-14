import { FormField, ListEditor, SectionCard } from '../FormComponents';
import type { CasesContent } from '@/types/content';

interface CasesEditorProps {
  content: CasesContent;
  onChange: (content: CasesContent) => void;
}

const iconOptions = ['TrendingUp', 'DollarSign', 'Users', 'Clock', 'Quote'];
const avatarColors = [
  'from-cyan-500 to-blue-500',
  'from-purple-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-rose-500 to-red-500',
  'from-indigo-500 to-violet-500',
];

export function CasesEditor({ content, onChange }: CasesEditorProps) {
  const updateField = <K extends keyof CasesContent>(field: K, value: CasesContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="区块标题" description="配置成功案例区块的标题">
        <FormField
          label="区块徽章"
          name="sectionBadge"
          value={content.sectionBadge}
          onChange={(value) => updateField('sectionBadge', value)}
          placeholder="成功案例"
        />
        <FormField
          label="标题"
          name="title"
          value={content.title}
          onChange={(value) => updateField('title', value)}
          placeholder={'他们正在实现"一人独角兽"'}
        />
        <FormField
          label="高亮文字"
          name="highlightText"
          value={content.highlightText}
          onChange={(value) => updateField('highlightText', value)}
          placeholder="一人独角兽"
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

      <ListEditor
        title="全球统计数据"
        items={content.globalStats}
        onChange={(globalStats) => updateField('globalStats', globalStats)}
        createNewItem={() => ({ value: '0%', label: '统计标签', growth: '增长描述' })}
        addButtonText="添加统计数据"
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
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">数值</label>
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => onItemChange({ ...item, value: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="36%"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">标签</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => onItemChange({ ...item, label: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="描述标签"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">增长描述</label>
                <input
                  type="text"
                  value={item.growth}
                  onChange={(e) => onItemChange({ ...item, growth: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="六年增长53%"
                />
              </div>
            </div>
          </div>
        )}
      />

      <ListEditor
        title="成功案例"
        items={content.cases}
        onChange={(cases) => updateField('cases', cases)}
        createNewItem={() => ({ 
          name: '案例名称',
          role: '角色描述',
          avatar: 'XX',
          avatarColor: 'from-cyan-500 to-blue-500',
          income: '¥0/月',
          product: '产品名称',
          description: '案例描述',
          tags: ['标签1'],
          metrics: [{ icon: 'DollarSign', value: '¥0', label: '指标' }]
        })}
        addButtonText="添加案例"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">案例 #{index + 1}: {item.name}</span>
              <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除案例
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">姓名</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onItemChange({ ...item, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">角色</label>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => onItemChange({ ...item, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">头像文字</label>
                <input
                  type="text"
                  value={item.avatar}
                  onChange={(e) => onItemChange({ ...item, avatar: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="如: ML"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">收入</label>
                <input
                  type="text"
                  value={item.income}
                  onChange={(e) => onItemChange({ ...item, income: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="$65,000/月"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">产品</label>
                <input
                  type="text"
                  value={item.product}
                  onChange={(e) => onItemChange({ ...item, product: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">头像颜色</label>
                <select
                  value={item.avatarColor}
                  onChange={(e) => onItemChange({ ...item, avatarColor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                  {avatarColors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">案例描述</label>
              <textarea
                value={item.description}
                onChange={(e) => onItemChange({ ...item, description: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                rows={2}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">标签 (用逗号分隔)</label>
              <input
                type="text"
                value={item.tags.join(', ')}
                onChange={(e) => onItemChange({ ...item, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="SaaS, 独立开发, 模板"
              />
            </div>
            
            {/* Metrics */}
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">关键指标</span>
                <button
                  type="button"
                  onClick={() => {
                    const newMetrics = [...item.metrics, { icon: 'DollarSign', value: '0', label: '新指标' }];
                    onItemChange({ ...item, metrics: newMetrics });
                  }}
                  className="text-xs text-cyan-600 hover:text-cyan-700"
                >
                  + 添加指标
                </button>
              </div>
              <div className="space-y-2">
                {item.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="grid grid-cols-12 gap-2 items-center">
                    <select
                      value={metric.icon}
                      onChange={(e) => {
                        const newMetrics = [...item.metrics];
                        newMetrics[metricIndex] = { ...metric, icon: e.target.value };
                        onItemChange({ ...item, metrics: newMetrics });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => {
                        const newMetrics = [...item.metrics];
                        newMetrics[metricIndex] = { ...metric, value: e.target.value };
                        onItemChange({ ...item, metrics: newMetrics });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="数值"
                    />
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => {
                        const newMetrics = [...item.metrics];
                        newMetrics[metricIndex] = { ...metric, label: e.target.value };
                        onItemChange({ ...item, metrics: newMetrics });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="标签"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newMetrics = [...item.metrics];
                        newMetrics.splice(metricIndex, 1);
                        onItemChange({ ...item, metrics: newMetrics });
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

      <SectionCard title="引用" description="配置底部的引用内容">
        <FormField
          label="引用文字"
          name="quote"
          value={content.quote}
          onChange={(value) => updateField('quote', value)}
          type="textarea"
          rows={2}
        />
        <FormField
          label="引用作者"
          name="quoteAuthor"
          value={content.quoteAuthor}
          onChange={(value) => updateField('quoteAuthor', value)}
          placeholder="—— 山姆·奥特曼 OpenAI CEO"
        />
      </SectionCard>
    </div>
  );
}
