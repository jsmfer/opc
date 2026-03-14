import { FormField, ListEditor, SectionCard, ArrayStringEditor } from '../FormComponents';
import type { BusinessLoopContent } from '@/types/content';

interface BusinessLoopEditorProps {
  content: BusinessLoopContent;
  onChange: (content: BusinessLoopContent) => void;
}

const iconOptions = ['Lightbulb', 'Code', 'Rocket', 'Users', 'RefreshCw', 'ArrowRight', 'CheckCircle2'];

export function BusinessLoopEditor({ content, onChange }: BusinessLoopEditorProps) {
  const updateField = <K extends keyof BusinessLoopContent>(field: K, value: BusinessLoopContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="区块标题" description="配置商业闭环区块的标题">
        <FormField
          label="区块徽章"
          name="sectionBadge"
          value={content.sectionBadge}
          onChange={(value) => updateField('sectionBadge', value)}
          placeholder="全链路闭环"
        />
        <FormField
          label="标题"
          name="title"
          value={content.title}
          onChange={(value) => updateField('title', value)}
          placeholder="从创意到商业"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="高亮文字 1"
            name="highlightText1"
            value={content.highlightText1}
            onChange={(value) => updateField('highlightText1', value)}
            placeholder="创意"
          />
          <FormField
            label="高亮文字 2"
            name="highlightText2"
            value={content.highlightText2}
            onChange={(value) => updateField('highlightText2', value)}
            placeholder="商业"
          />
        </div>
        <FormField
          label="描述"
          name="description"
          value={content.description}
          onChange={(value) => updateField('description', value)}
          type="textarea"
          rows={2}
        />
      </SectionCard>

      <SectionCard title="流程图片" description="配置商业流程图片">
        <FormField
          label="图片路径"
          name="businessImage"
          value={content.businessImage}
          onChange={(value) => updateField('businessImage', value)}
          placeholder="/business-loop.jpg"
        />
      </SectionCard>

      <ListEditor
        title="流程步骤"
        items={content.steps}
        onChange={(steps) => updateField('steps', steps)}
        createNewItem={() => ({ 
          icon: 'Lightbulb', 
          title: '步骤名称', 
          subtitle: '英文名称',
          description: '步骤描述',
          tools: ['工具1', '工具2'],
          outputs: ['输出1', '输出2'],
          color: 'from-cyan-500 to-blue-500'
        })}
        addButtonText="添加流程步骤"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">步骤 #{index + 1}: {item.title}</span>
              <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除步骤
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
                <label className="text-xs text-gray-500 mb-1 block">渐变色</label>
                <input
                  type="text"
                  value={item.color}
                  onChange={(e) => onItemChange({ ...item, color: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="from-cyan-500 to-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">名称</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onItemChange({ ...item, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">英文名称</label>
                <input
                  type="text"
                  value={item.subtitle}
                  onChange={(e) => onItemChange({ ...item, subtitle: e.target.value })}
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
            
            {/* Tools */}
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">使用工具 (用逗号分隔)</span>
              </div>
              <input
                type="text"
                value={item.tools.join(', ')}
                onChange={(e) => onItemChange({ ...item, tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="工具1, 工具2, 工具3"
              />
            </div>
            
            {/* Outputs */}
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">输出成果 (用逗号分隔)</span>
              </div>
              <input
                type="text"
                value={item.outputs.join(', ')}
                onChange={(e) => onItemChange({ ...item, outputs: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="成果1, 成果2, 成果3"
              />
            </div>
          </div>
        )}
      />

      <SectionCard title="循环指示器" description="配置流程循环区域的文字">
        <FormField
          label="循环文字"
          name="cycleText"
          value={content.cycleText}
          onChange={(value) => updateField('cycleText', value)}
          placeholder="数据驱动持续迭代优化"
        />
      </SectionCard>

      <SectionCard title="优势列表" description="配置 OPC 模式的核心优势">
        <FormField
          label="优势标题"
          name="benefitsTitle"
          value={content.benefitsTitle}
          onChange={(value) => updateField('benefitsTitle', value)}
          placeholder="OPC模式的核心优势"
        />
        <ArrayStringEditor
          title="优势列表"
          items={content.benefits}
          onChange={(benefits) => updateField('benefits', benefits)}
          placeholder="输入优势描述"
          addButtonText="添加优势"
        />
      </SectionCard>
    </div>
  );
}
