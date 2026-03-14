import { FormField, ListEditor, SectionCard, KeyValueEditor } from '../FormComponents';
import type { PolicyContent } from '@/types/content';

interface PolicyEditorProps {
  content: PolicyContent;
  onChange: (content: PolicyContent) => void;
}

const iconOptions = ['Building2', 'Calculator', 'Cpu', 'Landmark', 'MapPin', 'TrendingUp', 'CheckCircle2'];

export function PolicyEditor({ content, onChange }: PolicyEditorProps) {
  const updateField = <K extends keyof PolicyContent>(field: K, value: PolicyContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="区块标题" description="配置政策支持区块的标题">
        <FormField
          label="区块徽章"
          name="sectionBadge"
          value={content.sectionBadge}
          onChange={(value) => updateField('sectionBadge', value)}
          placeholder="政策支持"
        />
        <FormField
          label="标题"
          name="title"
          value={content.title}
          onChange={(value) => updateField('title', value)}
          placeholder={'从"边缘形态"到"主流生态"'}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="高亮文字 1"
            name="highlightText1"
            value={content.highlightText1}
            onChange={(value) => updateField('highlightText1', value)}
            placeholder="边缘形态"
          />
          <FormField
            label="高亮文字 2"
            name="highlightText2"
            value={content.highlightText2}
            onChange={(value) => updateField('highlightText2', value)}
            placeholder="主流生态"
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

      <SectionCard title="背景图片" description="配置政策区块的背景图片">
        <FormField
          label="图片路径"
          name="policyImage"
          value={content.policyImage}
          onChange={(value) => updateField('policyImage', value)}
          placeholder="/policy-support.jpg"
        />
      </SectionCard>

      <ListEditor
        title="城市政策"
        items={content.cityPolicies}
        onChange={(cityPolicies) => updateField('cityPolicies', cityPolicies)}
        createNewItem={() => ({ 
          city: '城市名称',
          policy: '政策名称',
          icon: 'Building2',
          color: 'from-cyan-500 to-blue-500',
          supports: [{ label: '支持项', value: '金额/内容' }],
          target: '发展目标'
        })}
        addButtonText="添加城市政策"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">城市 #{index + 1}: {item.city}</span>
              <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除城市
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">城市名称</label>
                <input
                  type="text"
                  value={item.city}
                  onChange={(e) => onItemChange({ ...item, city: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">政策名称</label>
                <input
                  type="text"
                  value={item.policy}
                  onChange={(e) => onItemChange({ ...item, policy: e.target.value })}
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
              <label className="text-xs text-gray-500 mb-1 block">发展目标</label>
              <input
                type="text"
                value={item.target}
                onChange={(e) => onItemChange({ ...item, target: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="到2028年培育1000家OPC企业"
              />
            </div>
            
            {/* Supports */}
            <div className="border rounded-lg p-3 bg-white">
              <KeyValueEditor
                title="支持项目"
                items={item.supports}
                onChange={(supports) => onItemChange({ ...item, supports })}
                labelPlaceholder="支持项名称"
                valuePlaceholder="金额/内容"
              />
            </div>
          </div>
        )}
      />

      <SectionCard title="税收优惠" description="配置税收优惠政策">
        <FormField
          label="区域标题"
          name="taxTitle"
          value={content.taxTitle}
          onChange={(value) => updateField('taxTitle', value)}
          placeholder="税收优惠政策"
        />
        <FormField
          label="副标题"
          name="taxSubtitle"
          value={content.taxSubtitle}
          onChange={(value) => updateField('taxSubtitle', value)}
          placeholder="国家层面为个体工商户和小微企业提供多重税收优惠"
        />
      </SectionCard>

      <ListEditor
        title="税收优惠分类"
        items={content.taxBenefits}
        onChange={(taxBenefits) => updateField('taxBenefits', taxBenefits)}
        createNewItem={() => ({ 
          title: '优惠类型',
          icon: 'Calculator',
          items: [{ label: '优惠项', desc: '详细说明' }]
        })}
        addButtonText="添加优惠分类"
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
                <label className="text-xs text-gray-500 mb-1 block">标题</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onItemChange({ ...item, title: e.target.value })}
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
            
            {/* Tax Items */}
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">优惠项目</span>
                <button
                  type="button"
                  onClick={() => {
                    const newItems = [...item.items, { label: '新优惠项', desc: '详细说明' }];
                    onItemChange({ ...item, items: newItems });
                  }}
                  className="text-xs text-cyan-600 hover:text-cyan-700"
                >
                  + 添加项目
                </button>
              </div>
              <div className="space-y-2">
                {item.items.map((taxItem, itemIndex) => (
                  <div key={itemIndex} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={taxItem.label}
                      onChange={(e) => {
                        const newItems = [...item.items];
                        newItems[itemIndex] = { ...taxItem, label: e.target.value };
                        onItemChange({ ...item, items: newItems });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="优惠项名称"
                    />
                    <input
                      type="text"
                      value={taxItem.desc}
                      onChange={(e) => {
                        const newItems = [...item.items];
                        newItems[itemIndex] = { ...taxItem, desc: e.target.value };
                        onItemChange({ ...item, items: newItems });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="详细说明"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [...item.items];
                        newItems.splice(itemIndex, 1);
                        onItemChange({ ...item, items: newItems });
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

      <SectionCard title="CTA 链接" description="配置查看税收政策的链接">
        <FormField
          label="链接文字"
          name="ctaText"
          value={content.ctaText}
          onChange={(value) => updateField('ctaText', value)}
          placeholder="查看完整税收政策指引"
        />
        <FormField
          label="链接地址"
          name="ctaLink"
          value={content.ctaLink}
          onChange={(value) => updateField('ctaLink', value)}
          placeholder="https://www.chinatax.gov.cn"
        />
      </SectionCard>
    </div>
  );
}
