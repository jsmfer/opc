import { FormField, ListEditor, SectionCard } from '../FormComponents';
import type { CTAContent } from '@/types/content';

interface CTAEditorProps {
  content: CTAContent;
  onChange: (content: CTAContent) => void;
}

const iconOptions = ['Sparkles', 'Rocket', 'Zap', 'Star', 'CheckCircle', 'TrendingUp'];
const colorOptions = ['cyan', 'purple', 'emerald', 'amber', 'rose', 'blue'];

export function CTAEditor({ content, onChange }: CTAEditorProps) {
  const updateField = <K extends keyof CTAContent>(field: K, value: CTAContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="基础内容" description="配置 CTA 区块的主要内容">
        <FormField
          label="标题 (使用 \\n 换行)"
          name="title"
          value={content.title}
          onChange={(value) => updateField('title', value)}
          type="textarea"
          rows={2}
          placeholder="准备好开启你的\\nOPC之旅"
        />
        <FormField
          label="高亮文字"
          name="highlightText"
          value={content.highlightText}
          onChange={(value) => updateField('highlightText', value)}
          placeholder="OPC之旅"
        />
        <FormField
          label="描述 (使用 \\n 换行)"
          name="description"
          value={content.description}
          onChange={(value) => updateField('description', value)}
          type="textarea"
          rows={3}
        />
      </SectionCard>

      <SectionCard title="按钮设置" description="配置 CTA 按钮">
        <FormField
          label="主按钮文字"
          name="primaryCta"
          value={content.primaryCta}
          onChange={(value) => updateField('primaryCta', value)}
          placeholder="立即开始"
        />
        <FormField
          label="次要按钮文字"
          name="secondaryCta"
          value={content.secondaryCta}
          onChange={(value) => updateField('secondaryCta', value)}
          placeholder="获取创业指南"
        />
      </SectionCard>

      <ListEditor
        title="特性标签"
        items={content.features}
        onChange={(features) => updateField('features', features)}
        createNewItem={() => ({ 
          icon: 'Sparkles', 
          text: '特性描述', 
          color: 'cyan'
        })}
        addButtonText="添加特性"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">特性 #{index + 1}</span>
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
                <label className="text-xs text-gray-500 mb-1 block">颜色</label>
                <select
                  value={item.color}
                  onChange={(e) => onItemChange({ ...item, color: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                  {colorOptions.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">文字</label>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => onItemChange({ ...item, text: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="特性描述"
                />
              </div>
            </div>
          </div>
        )}
      />

      <SectionCard title="信任区域" description="配置信任背书区域">
        <FormField
          label="信任标题"
          name="trustTitle"
          value={content.trustTitle}
          onChange={(value) => updateField('trustTitle', value)}
          placeholder="加入全球OPC创业者社区"
        />
      </SectionCard>

      <ListEditor
        title="信任统计数据"
        items={content.trustStats}
        onChange={(trustStats) => updateField('trustStats', trustStats)}
        createNewItem={() => ({ value: '0%', label: '统计标签' })}
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
            <div className="grid grid-cols-2 gap-3">
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
                  placeholder="美国占比"
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
