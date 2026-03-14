import { FormField, ListEditor, SectionCard } from '../FormComponents';
import type { GlobalNetworkContent } from '@/types/content';

interface GlobalNetworkEditorProps {
  content: GlobalNetworkContent;
  onChange: (content: GlobalNetworkContent) => void;
}

const iconOptions = ['Globe', 'Users', 'Briefcase', 'Wallet', 'Shield', 'Clock'];

export function GlobalNetworkEditor({ content, onChange }: GlobalNetworkEditorProps) {
  const updateField = <K extends keyof GlobalNetworkContent>(field: K, value: GlobalNetworkContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="区块标题" description="配置全球协作网络区块的标题">
        <FormField
          label="区块徽章"
          name="sectionBadge"
          value={content.sectionBadge}
          onChange={(value) => updateField('sectionBadge', value)}
          placeholder="全球协作网络"
        />
        <FormField
          label="标题"
          name="title"
          value={content.title}
          onChange={(value) => updateField('title', value)}
          placeholder="打破地理边界，连接全球智慧"
        />
        <FormField
          label="高亮文字"
          name="highlightText"
          value={content.highlightText}
          onChange={(value) => updateField('highlightText', value)}
          placeholder="连接全球智慧"
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
        title="全球平台"
        items={content.platforms}
        onChange={(platforms) => updateField('platforms', platforms)}
        createNewItem={() => ({ 
          name: '平台名称',
          description: '平台描述',
          icon: 'Globe',
          color: 'from-cyan-500 to-blue-500',
          features: ['特色1', '特色2'],
          website: 'https://example.com'
        })}
        addButtonText="添加平台"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">平台 #{index + 1}: {item.name}</span>
              <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除平台
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">平台名称</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onItemChange({ ...item, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
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
            <div>
              <label className="text-xs text-gray-500 mb-1 block">网站链接</label>
              <input
                type="text"
                value={item.website}
                onChange={(e) => onItemChange({ ...item, website: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="https://www.example.com"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">特色功能 (用逗号分隔)</label>
              <input
                type="text"
                value={item.features.join(', ')}
                onChange={(e) => onItemChange({ ...item, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="特色1, 特色2, 特色3, 特色4"
              />
            </div>
          </div>
        )}
      />

      <SectionCard title="优势区域" description="配置全球协作的优势">
        <FormField
          label="区域标题"
          name="advantagesTitle"
          value={content.advantagesTitle}
          onChange={(value) => updateField('advantagesTitle', value)}
          placeholder="全球协作的优势"
        />
      </SectionCard>

      <ListEditor
        title="优势列表"
        items={content.advantages}
        onChange={(advantages) => updateField('advantages', advantages)}
        createNewItem={() => ({ 
          icon: 'Shield', 
          title: '优势标题', 
          description: '优势描述'
        })}
        addButtonText="添加优势"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">优势 #{index + 1}</span>
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
                <label className="text-xs text-gray-500 mb-1 block">标题</label>
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
        title="底部统计数据"
        items={content.stats}
        onChange={(stats) => updateField('stats', stats)}
        createNewItem={() => ({ value: '0+', label: '统计标签' })}
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
                  placeholder="180+"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">标签</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => onItemChange({ ...item, label: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="覆盖国家"
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
