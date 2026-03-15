import { useState } from 'react';

import { 
  LayoutDashboard, 
  Menu, 
  X, 
  Save,
  Download,
  Upload,
  RotateCcw,
  LogOut,
  User,
  ChevronDown,
  Eye,
  Home,
  Lightbulb,
  Wrench,
  RefreshCw,
  Briefcase,
  FileText,
  Globe,
  MousePointer,
  PanelBottom
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSave: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
  onLogout: () => void;
  hasChanges: boolean;
  username: string;
  isSaving?: boolean;
}

const sections = [
  { id: 'navigation', label: '导航栏', icon: PanelBottom, color: 'bg-blue-500' },
  { id: 'hero', label: '首屏 Hero', icon: Home, color: 'bg-cyan-500' },
  { id: 'concept', label: '核心理念', icon: Lightbulb, color: 'bg-indigo-500' },
  { id: 'tools', label: 'AI工具生态', icon: Wrench, color: 'bg-purple-500' },
  { id: 'businessLoop', label: '商业闭环', icon: RefreshCw, color: 'bg-emerald-500' },
  { id: 'cases', label: '成功案例', icon: Briefcase, color: 'bg-amber-500' },
  { id: 'policy', label: '政策支持', icon: FileText, color: 'bg-rose-500' },
  { id: 'globalNetwork', label: '全球网络', icon: Globe, color: 'bg-sky-500' },
  { id: 'cta', label: 'CTA行动召唤', icon: MousePointer, color: 'bg-pink-500' },
  { id: 'footer', label: '页脚', icon: LayoutDashboard, color: 'bg-slate-500' },
];

export function AdminLayout({
  children,
  activeSection,
  onSectionChange,
  onSave,
  onExport,
  onImport,
  onReset,
  onLogout,
  hasChanges,
  username,
  isSaving = false,
}: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 shadow-sm">
        <div className="h-full flex items-center justify-between px-4 lg:px-6">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">OPC 内容管理后台</h1>
                <p className="text-xs text-slate-500">Content Management System</p>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Preview Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              className="hidden sm:flex items-center gap-2 text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              <Eye className="w-4 h-4" />
              预览
            </Button>
            
            {/* Import Button */}
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <label htmlFor="import-file">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 text-slate-700 border-slate-300 hover:bg-slate-50 cursor-pointer"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4" />
                  导入
                </span>
              </Button>
            </label>

            {/* Export Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="hidden md:flex items-center gap-2 text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              <Download className="w-4 h-4" />
              导出
            </Button>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="hidden md:flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </Button>

            {/* Save Button */}
            <Button
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className={`flex items-center gap-2 transition-all duration-300 ${
                hasChanges 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-slate-400 hover:bg-slate-500 text-white'
              } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">保存中...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">{hasChanges ? '保存更改' : '已保存'}</span>
                </>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 ml-1 hover:bg-slate-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:inline text-slate-700 font-medium">{username}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2 text-sm text-slate-500">
                  管理员账号
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePreview} className="cursor-pointer">
                  <Eye className="w-4 h-4 mr-2 text-slate-600" />
                  预览网站
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-40 transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-3 space-y-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${section.color} ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                <span className={`font-medium ${isActive ? 'text-slate-900' : ''}`}>
                  {section.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Actions */}
        <div className="lg:hidden p-4 border-t border-slate-200 space-y-2 mt-4">
          <p className="text-xs text-slate-500 px-2 mb-2">快捷操作</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="w-full justify-start gap-2 text-slate-700"
          >
            <Eye className="w-4 h-4" />
            预览网站
          </Button>
          <label htmlFor="import-file-mobile" className="block">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file-mobile"
            />
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-slate-700 cursor-pointer"
              asChild
            >
              <span>
                <Upload className="w-4 h-4" />
                导入配置
              </span>
            </Button>
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="w-full justify-start gap-2 text-slate-700"
          >
            <Download className="w-4 h-4" />
            导出配置
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="w-full justify-start gap-2 text-red-600 border-red-200"
          >
            <RotateCcw className="w-4 h-4" />
            重置默认
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 min-h-screen lg:ml-64">
        <div className="p-4 lg:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
