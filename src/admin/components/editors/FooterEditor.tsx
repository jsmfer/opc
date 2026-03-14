import { FormField, ListEditor, SectionCard } from '../FormComponents';
import type { FooterContent } from '@/types/content';

interface FooterEditorProps {
  content: FooterContent;
  onChange: (content: FooterContent) => void;
}

const iconOptions = ['Cpu', 'Mail', 'Github', 'Twitter', 'Linkedin', 'ExternalLink', 'Globe'];

export function FooterEditor({ content, onChange }: FooterEditorProps) {
  const updateField = <K extends keyof FooterContent>(field: K, value: FooterContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="品牌信息" description="配置页脚的品牌信息">
        <FormField
          label="品牌名称"
          name="brandName"
          value={content.brandName}
          onChange={(value) => updateField('brandName', value)}
          placeholder="OPC服务平台"
        />
        <FormField
          label="品牌副标题"
          name="brandSubname"
          value={content.brandSubname}
          onChange={(value) => updateField('brandSubname', value)}
          placeholder="One Person Company"
        />
        <FormField
          label="品牌描述"
          name="description"
          value={content.description}
          onChange={(value) => updateField('description', value)}
          type="textarea"
          rows={2}
        />
      </SectionCard>

      <ListEditor
        title="链接分组"
        items={content.linkGroups}
        onChange={(linkGroups) => updateField('linkGroups', linkGroups)}
        createNewItem={() => ({ 
          title: '分组标题',
          links: [{ label: '链接名称', href: '#' }]
        })}
        addButtonText="添加分组"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">分组 #{index + 1}: {item.title}</span>
              <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除分组
              </button>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">分组标题</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => onItemChange({ ...item, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            
            {/* Links */}
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">链接列表</span>
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = [...item.links, { label: '新链接', href: '#' }];
                    onItemChange({ ...item, links: newLinks });
                  }}
                  className="text-xs text-cyan-600 hover:text-cyan-700"
                >
                  + 添加链接
                </button>
              </div>
              <div className="space-y-2">
                {item.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...item.links];
                        newLinks[linkIndex] = { ...link, label: e.target.value };
                        onItemChange({ ...item, links: newLinks });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="链接文字"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const newLinks = [...item.links];
                        newLinks[linkIndex] = { ...link, href: e.target.value };
                        onItemChange({ ...item, links: newLinks });
                      }}
                      className="col-span-4 px-2 py-1.5 border border-slate-300 rounded text-sm text-slate-900 bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="# 或 https://..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = [...item.links];
                        newLinks.splice(linkIndex, 1);
                        onItemChange({ ...item, links: newLinks });
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

      <ListEditor
        title="社交媒体链接"
        items={content.socialLinks}
        onChange={(socialLinks) => updateField('socialLinks', socialLinks)}
        createNewItem={() => ({ 
          icon: 'Twitter', 
          href: '#', 
          label: 'Social'
        })}
        addButtonText="添加社交链接"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">社交 #{index + 1}</span>
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
                <label className="text-xs text-gray-500 mb-1 block">链接</label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => onItemChange({ ...item, href: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="# 或 https://..."
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">标签</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => onItemChange({ ...item, label: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Twitter"
                />
              </div>
            </div>
          </div>
        )}
      />

      <SectionCard title="版权信息" description="配置版权和合作伙伴链接">
        <FormField
          label="版权文字"
          name="copyright"
          value={content.copyright}
          onChange={(value) => updateField('copyright', value)}
          placeholder="© 2026 OPC Platform. All rights reserved."
        />
      </SectionCard>

      <ListEditor
        title="合作伙伴链接"
        items={content.partnerLinks}
        onChange={(partnerLinks) => updateField('partnerLinks', partnerLinks)}
        createNewItem={() => ({ 
          label: '合作伙伴', 
          href: 'https://example.com'
        })}
        addButtonText="添加合作伙伴"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">伙伴 #{index + 1}</span>
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
                <label className="text-xs text-gray-500 mb-1 block">名称</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => onItemChange({ ...item, label: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">链接</label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => onItemChange({ ...item, href: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
