import { FormField, ListEditor, SectionCard, SelectField, ItemHeader } from '../FormComponents';
import type { HeroContent } from '@/types/content';

interface HeroEditorProps {
  content: HeroContent;
  onChange: (content: HeroContent) => void;
}

const iconOptions = ['Cpu', 'Sparkles', 'Globe', 'TrendingUp', 'DollarSign', 'Users', 'Clock', 'Brain', 'Bot', 'Network'];
const colorOptions = ['cyan', 'purple', 'emerald', 'amber', 'rose', 'blue'];

export function HeroEditor({ content, onChange }: HeroEditorProps) {
  const updateField = <K extends keyof HeroContent>(field: K, value: HeroContent[K]) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* 基础内容 */}
      <SectionCard title="基础内容" description="配置首屏的主要文字内容">
        <FormField
          label="徽章文字"
          name="badge"
          value={content.badge}
          onChange={(value) => updateField('badge', value)}
          placeholder="例如：AI时代的新型组织形态"
          helpText="显示在主标题上方的小标签"
        />
        <FormField
          label="主标题"
          name="title"
          value={content.title}
          onChange={(value) => updateField('title', value)}
          type="textarea"
          rows={2}
          placeholder="例如：One Person&#10;Company"
          helpText="使用回车键换行，第二行会自动应用渐变色"
        />
        <FormField
          label="副标题"
          name="subtitle"
          value={content.subtitle}
          onChange={(value) => updateField('subtitle', value)}
          placeholder="例如：碳基智慧 + 硅基执行"
        />
        <FormField
          label="描述文字"
          name="description"
          value={content.description}
          onChange={(value) => updateField('description', value)}
          type="textarea"
          rows={3}
          placeholder="输入详细描述..."
          helpText="支持多行文本"
        />
      </SectionCard>

      {/* 按钮设置 */}
      <SectionCard title="按钮设置" description="配置行动召唤按钮">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="主按钮文字"
            name="primaryCta"
            value={content.primaryCta}
            onChange={(value) => updateField('primaryCta', value)}
            placeholder="例如：开启你的OPC之旅"
          />
          <FormField
            label="次要按钮文字"
            name="secondaryCta"
            value={content.secondaryCta}
            onChange={(value) => updateField('secondaryCta', value)}
            placeholder="例如：了解更多"
          />
        </div>
      </SectionCard>

      {/* 背景设置 */}
      <SectionCard title="背景设置" description="配置背景图片">
        <FormField
          label="背景图片路径"
          name="backgroundImage"
          value={content.backgroundImage}
          onChange={(value) => updateField('backgroundImage', value)}
          placeholder="/hero-bg.jpg"
          helpText="将图片放入 public 文件夹，使用 /图片名 格式"
        />
      </SectionCard>

      {/* 统计数据 */}
      <ListEditor
        title="统计数据"
        description="配置底部三个统计卡片"
        items={content.stats}
        onChange={(stats) => updateField('stats', stats)}
        createNewItem={() => ({ 
          icon: 'Cpu', 
          value: '0%', 
          label: '统计标签', 
          sublabel: '说明文字',
          color: 'cyan'
        })}
        addButtonText="添加统计"
        renderItem={(item, index, onItemChange, onDelete) => (
          <div>
            <ItemHeader 
              title={`统计项 #${index + 1}`} 
              onDelete={onDelete} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="图标"
                value={item.icon}
                options={iconOptions}
                onChange={(value) => onItemChange({ ...item, icon: value })}
              />
              <SelectField
                label="颜色主题"
                value={item.color}
                options={colorOptions}
                onChange={(value) => onItemChange({ ...item, color: value })}
              />
              <FormField
                label="数值"
                name={`stat-value-${index}`}
                value={item.value}
                onChange={(value) => onItemChange({ ...item, value })}
                placeholder="例如：36%"
              />
              <FormField
                label="主标签"
                name={`stat-label-${index}`}
                value={item.label}
                onChange={(value) => onItemChange({ ...item, label: value })}
                placeholder="例如：互联网创业一人公司占比"
              />
              <FormField
                label="副标签"
                name={`stat-sublabel-${index}`}
                value={item.sublabel}
                onChange={(value) => onItemChange({ ...item, sublabel: value })}
                placeholder="例如：六年增长53%"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
