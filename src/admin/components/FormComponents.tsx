import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';

// ==================== FormField ====================
interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'textarea';
  placeholder?: string;
  rows?: number;
  helpText?: string;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  rows = 3,
  helpText,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-slate-800 font-semibold text-sm">
        {label}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          id={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="resize-none bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                     transition-all rounded-lg"
        />
      ) : (
        <Input
          id={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                     transition-all rounded-lg h-11"
        />
      )}
      {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
    </div>
  );
}

// ==================== SectionCard ====================
interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

export function SectionCard({ title, children, description }: SectionCardProps) {
  return (
    <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
      </div>
      <div className="p-6 space-y-5">
        {children}
      </div>
    </div>
  );
}

// ==================== ListEditor ====================
interface ListEditorProps<T> {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, onChange: (item: T) => void, onDelete: () => void) => React.ReactNode;
  createNewItem: () => T;
  addButtonText?: string;
  description?: string;
}

export function ListEditor<T>({
  title,
  items,
  onChange,
  renderItem,
  createNewItem,
  addButtonText = '添加',
  description,
}: ListEditorProps<T>) {
  const handleAdd = () => {
    onChange([...items, createNewItem()]);
  };

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleItemChange = (index: number, newItem: T) => {
    const newItems = [...items];
    newItems[index] = newItem;
    onChange(newItems);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {description && <p className="text-sm text-slate-600 mt-0.5">{description}</p>}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4" />
          {addButtonText}
        </Button>
      </div>
      <div className="p-6 space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <p className="text-slate-500 mb-3">暂无项目</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAdd}
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              点击添加
            </Button>
          </div>
        ) : (
          items.map((item, index) => (
            <div 
              key={index} 
              className="border border-slate-200 rounded-lg p-5 bg-white hover:border-blue-300 hover:shadow-md transition-all"
            >
              {renderItem(
                item,
                index,
                (newItem) => handleItemChange(index, newItem),
                () => handleDelete(index)
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==================== ArrayStringEditor ====================
interface ArrayStringEditorProps {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addButtonText?: string;
  description?: string;
}

export function ArrayStringEditor({
  title,
  items,
  onChange,
  placeholder = '输入内容',
  addButtonText = '添加',
  description,
}: ArrayStringEditorProps) {
  const handleAdd = () => {
    onChange([...items, '']);
  };

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {description && <p className="text-sm text-slate-600 mt-0.5">{description}</p>}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleAdd}
          variant="outline"
          className="flex items-center gap-1.5 text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4" />
          {addButtonText}
        </Button>
      </div>
      <div className="p-6 space-y-3">
        {items.length === 0 ? (
          <p className="text-slate-500 text-center py-4">暂无项目</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <GripVertical className="w-4 h-4 text-slate-400" />
              <Input
                value={item || ''}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg h-10"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 w-9 h-9"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==================== KeyValueEditor ====================
interface KeyValueEditorProps {
  title: string;
  items: { label: string; value: string }[];
  onChange: (items: { label: string; value: string }[]) => void;
  labelPlaceholder?: string;
  valuePlaceholder?: string;
  description?: string;
}

export function KeyValueEditor({
  title,
  items,
  onChange,
  labelPlaceholder = '标签',
  valuePlaceholder = '值',
  description,
}: KeyValueEditorProps) {
  const handleAdd = () => {
    onChange([...items, { label: '', value: '' }]);
  };

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleChange = (index: number, field: 'label' | 'value', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {description && <p className="text-sm text-slate-600 mt-0.5">{description}</p>}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleAdd}
          variant="outline"
          className="flex items-center gap-1.5 text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4" />
          添加
        </Button>
      </div>
      <div className="p-6 space-y-3">
        {items.length === 0 ? (
          <p className="text-slate-500 text-center py-4">暂无项目</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <Input
                value={item.label || ''}
                onChange={(e) => handleChange(index, 'label', e.target.value)}
                placeholder={labelPlaceholder}
                className="flex-1 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg h-10"
              />
              <Input
                value={item.value || ''}
                onChange={(e) => handleChange(index, 'value', e.target.value)}
                placeholder={valuePlaceholder}
                className="flex-1 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg h-10"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 w-9 h-9 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==================== SelectField ====================
interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SelectField({ label, value, options, onChange, placeholder }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-slate-800 font-semibold text-sm block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 h-11 border border-slate-300 rounded-lg text-sm 
                   bg-white text-slate-900
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                   outline-none transition-all appearance-none cursor-pointer"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: '36px'
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// ==================== ItemHeader ====================
interface ItemHeaderProps {
  title: string;
  onDelete: () => void;
}

export function ItemHeader({ title, onDelete }: ItemHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
      <span className="text-sm font-bold text-slate-800">{title}</span>
      <button
        type="button"
        onClick={onDelete}
        className="text-red-600 hover:text-red-800 text-sm px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium"
      >
        删除
      </button>
    </div>
  );
}
