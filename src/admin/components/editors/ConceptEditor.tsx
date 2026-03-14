import { FormField, ListEditor, SectionCard, SelectField, ItemHeader } from '../FormComponents';
import type { ConceptContent } from '@/types/content';

interface ConceptEditorProps {
  content: ConceptContent;
  onChange: (content: ConceptContent) => void;
}

const iconOptions = ['Brain', 'Bot', 'Network', 'TrendingUp', 'Lightbulb', 'Zap', 'Cpu', 'Sparkles', 'Globe'];

export function ConceptEditor({ content, onChange }: ConceptEditorProps) {
  const updateField = <K extends keyof ConceptContent>(field: K, value: ConceptContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="区块标题" description="配置核心理念区块的标题内容">
        <FormField
          label="区块徽章"
          name="sectionBadge"
          value={content.sectionBadge}
          onChange={(value) => updateField('sectionBadge', value)}
          placeholder="OPC 核心理念"
        />
        <FormField
          label="标题 (使用 \n 换行)"
          name="title"
          value={content.title}
          onChange={(value) => updateField('title', value)}
          type="textarea"
          rows={2}
        />
        <FormField
          label="高亮文字"
          name="highlightText"
          value={content.highlightText}
          onChange={(value) => updateField('highlightText', value)}
          placeholder="一个人+AI集群"
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

      <SectionCard title="概念图片" description="配置概念说明图片">
        <FormField
          label="图片路径"
          name="conceptImage"
          value={content.conceptImage}
          onChange={(value) => updateField('conceptImage', value)}
          placeholder="/opc-concept.jpg"
        />
      </SectionCard>

      <ListEditor
        title="特色卡片"
        items={content.features}
        onChange={(features) => updateField('features', features)}
        createNewItem={() => ({ 
          icon: 'Brain', 
          title: '新特色', 
          description: '特色描述',
          color: 'from-cyan-500 to-blue-500'
        })}
        addButtonText="添加特色卡片"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div>
            <ItemHeader title={`特色 #${index + 1}`} onDelete={onDelete} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="图标"
                value={item.icon}
                options={iconOptions}
                onChange={(value) => onItemChange({ ...item, icon: value })}
              />
              <FormField
                label="标题"
                name={`feature-title-${index}`}
                value={item.title}
                onChange={(value) => onItemChange({ ...item, title: value })}
                placeholder="碳基智慧"
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-800 mb-1.5 block">描述</label>
              <textarea
                value={item.description}
                onChange={(e) => onItemChange({ ...item, description: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                rows={2}
                placeholder="输入特色描述..."
              />
            </div>
            <div className="mt-4">
              <FormField
                label="渐变色 (Tailwind 格式)"
                name={`feature-color-${index}`}
                value={item.color}
                onChange={(value) => onItemChange({ ...item, color: value })}
                placeholder="from-cyan-500 to-blue-500"
              />
            </div>
          </div>
        )}
      />

      <ListEditor
        title="趋势卡片"
        items={content.trends}
        onChange={(trends) => updateField('trends', trends)}
        createNewItem={() => ({ 
          icon: 'Lightbulb', 
          title: '趋势标题', 
          content: '趋势描述内容'
        })}
        addButtonText="添加趋势卡片"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div>
            <ItemHeader title={`趋势 #${index + 1}`} onDelete={onDelete} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="图标"
                value={item.icon}
                options={iconOptions}
                onChange={(value) => onItemChange({ ...item, icon: value })}
              />
              <FormField
                label="标题"
                name={`trend-title-${index}`}
                value={item.title}
                onChange={(value) => onItemChange({ ...item, title: value })}
                placeholder="为什么是OPC？"
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-800 mb-1.5 block">内容</label>
              <textarea
                value={item.content}
                onChange={(e) => onItemChange({ ...item, content: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                rows={3}
                placeholder="输入趋势描述内容..."
              />
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
          placeholder="—— 作者名"
        />
      </SectionCard>
    </div>
  );
}
