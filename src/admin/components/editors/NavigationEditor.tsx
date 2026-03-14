import { FormField, ListEditor, SectionCard, ItemHeader, SelectField } from '../FormComponents';
import type { NavigationContent } from '@/types/content';

interface NavigationEditorProps {
  content: NavigationContent;
  onChange: (content: NavigationContent) => void;
}

const logoIconOptions = [
  'Cpu', 'Zap', 'Rocket', 'Globe', 'Star', 'Hexagon', 'Box', 'LayoutGrid',
  'Lightbulb', 'Brain', 'Bot', 'Network', 'TrendingUp', 'Sparkles',
  'Home', 'User', 'Users', 'Briefcase', 'Building2', 'Layers'
];

export function NavigationEditor({ content, onChange }: NavigationEditorProps) {
  const updateField = <K extends keyof NavigationContent>(
    field: K,
    value: NavigationContent[K]
  ) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="基础设置" description="配置导航栏的基本信息">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField
            label="Logo 图标"
            value={content.logoIcon}
            options={logoIconOptions}
            onChange={(value) => updateField('logoIcon', value)}
          />
          <FormField
            label="Logo 文字"
            name="logoText"
            value={content.logoText}
            onChange={(value) => updateField('logoText', value)}
            placeholder="例如：OPC"
          />
        </div>
        <FormField
          label="CTA 按钮文字"
          name="ctaText"
          value={content.ctaText}
          onChange={(value) => updateField('ctaText', value)}
          placeholder="例如：立即开始"
        />
      </SectionCard>

      <ListEditor
        title="导航链接"
        description="配置导航菜单中的链接项"
        items={content.navLinks}
        onChange={(navLinks) => updateField('navLinks', navLinks)}
        createNewItem={() => ({ label: '新链接', href: '#' })}
        addButtonText="添加链接"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div>
            <ItemHeader 
              title={`链接 #${index + 1}`} 
              onDelete={onDelete} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-800 mb-1.5 block">显示文字</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => onItemChange({ ...item, label: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="例如：核心理念"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800 mb-1.5 block">链接地址</label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => onItemChange({ ...item, href: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="例如：#concept"
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
