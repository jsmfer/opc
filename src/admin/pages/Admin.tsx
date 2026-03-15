import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminLayout } from '../components/AdminLayout';
import {
  NavigationEditor,
  HeroEditor,
  ConceptEditor,
  ToolsEditor,
  BusinessLoopEditor,
  CasesEditor,
  PolicyEditor,
  GlobalNetworkEditor,
  CTAEditor,
  FooterEditor,
} from '../components/editors';
import { useContentStore } from '@/hooks/useContentStore';
import { useAuth } from '@/hooks/useAuth';
import type { WebsiteContent } from '@/types/content';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Admin() {
  const navigate = useNavigate();
  const { isLoading: authLoading, logout } = useAuth();
  const { 
    content, 
    isLoaded: contentLoaded, 
    isLoading: contentLoading,
    error,
    saveContent, 
    resetToDefault, 
    exportData, 
    importData,
    retry,
    useLocalMode,
  } = useContentStore();
  
  const [activeSection, setActiveSection] = useState('navigation');
  const [localContent, setLocalContent] = useState<WebsiteContent>(content);
  const [hasChanges, setHasChanges] = useState(false);

  // 当 store 加载完成后，更新本地内容
  useEffect(() => {
    if (contentLoaded) {
      setLocalContent(content);
    }
  }, [contentLoaded, content]);

  // 监听内容变化
  useEffect(() => {
    if (contentLoaded) {
      const isChanged = JSON.stringify(localContent) !== JSON.stringify(content);
      setHasChanges(isChanged);
    }
  }, [localContent, content, contentLoaded]);

  const handleSave = useCallback(async () => {
    try {
      await saveContent(localContent);
      setHasChanges(false);
      toast.success('保存成功', {
        description: '所有更改已保存到服务器',
      });
    } catch (err) {
      toast.error('保存失败', {
        description: err instanceof Error ? err.message : '请检查网络连接或稍后重试',
      });
    }
  }, [localContent, saveContent]);

  const handleExport = useCallback(() => {
    exportData();
    toast.success('导出成功', {
      description: '内容配置已导出为 JSON 文件',
    });
  }, [exportData]);

  const handleImport = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      if (await importData(text)) {
        setLocalContent({ ...content });
        setHasChanges(false);
        toast.success('导入成功', {
          description: '内容配置已从文件导入',
        });
      } else {
        toast.error('导入失败', {
          description: '文件格式不正确，请检查 JSON 文件',
        });
      }
    };
    reader.readAsText(file);
  }, [importData, content]);

  const handleReset = useCallback(async () => {
    try {
      await resetToDefault();
      setLocalContent(content);
      setHasChanges(false);
      toast.success('已重置', {
        description: '所有内容已恢复为默认状态',
      });
    } catch (err) {
      toast.error('重置失败', {
        description: err instanceof Error ? err.message : '请稍后重试',
      });
    }
  }, [resetToDefault, content]);

  const handleLogout = useCallback(() => {
    logout();
    toast.success('已登出');
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  const updateSection = useCallback(<K extends keyof WebsiteContent>(
    section: K,
    data: WebsiteContent[K]
  ) => {
    setLocalContent(prev => ({ ...prev, [section]: data }));
  }, []);

  // 处理未保存离开提示
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '您有未保存的更改，确定要离开吗？';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  // 显示加载中
  if (authLoading || !contentLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  // 显示错误状态
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>连接错误</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          
          <div className="flex gap-3">
            <Button 
              onClick={retry} 
              className="flex-1"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              重试连接
            </Button>
            <Button 
              onClick={useLocalMode} 
              variant="outline"
              className="flex-1"
            >
              <WifiOff className="w-4 h-4 mr-2" />
              使用本地模式
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            本地模式下数据将存储在浏览器中，不会同步到服务器
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSave={handleSave}
      onExport={handleExport}
      onImport={handleImport}
      onReset={handleReset}
      onLogout={handleLogout}
      hasChanges={hasChanges}
      username="admin"
      isSaving={contentLoading}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {getSectionTitle(activeSection)}
            </h2>
            <p className="text-slate-600 mt-1">
              {getSectionDescription(activeSection)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold border border-amber-200">
                ⚠️ 有未保存的更改
              </span>
            )}
            {!hasChanges && (
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold border border-emerald-200">
                ✓ 所有更改已保存
              </span>
            )}
          </div>
        </div>

        {activeSection === 'navigation' && (
          <NavigationEditor
            content={localContent.navigation}
            onChange={(data) => updateSection('navigation', data)}
          />
        )}

        {activeSection === 'hero' && (
          <HeroEditor
            content={localContent.hero}
            onChange={(data) => updateSection('hero', data)}
          />
        )}

        {activeSection === 'concept' && (
          <ConceptEditor
            content={localContent.concept}
            onChange={(data) => updateSection('concept', data)}
          />
        )}

        {activeSection === 'tools' && (
          <ToolsEditor
            content={localContent.tools}
            onChange={(data) => updateSection('tools', data)}
          />
        )}

        {activeSection === 'businessLoop' && (
          <BusinessLoopEditor
            content={localContent.businessLoop}
            onChange={(data) => updateSection('businessLoop', data)}
          />
        )}

        {activeSection === 'cases' && (
          <CasesEditor
            content={localContent.cases}
            onChange={(data) => updateSection('cases', data)}
          />
        )}

        {activeSection === 'policy' && (
          <PolicyEditor
            content={localContent.policy}
            onChange={(data) => updateSection('policy', data)}
          />
        )}

        {activeSection === 'globalNetwork' && (
          <GlobalNetworkEditor
            content={localContent.globalNetwork}
            onChange={(data) => updateSection('globalNetwork', data)}
          />
        )}

        {activeSection === 'cta' && (
          <CTAEditor
            content={localContent.cta}
            onChange={(data) => updateSection('cta', data)}
          />
        )}

        {activeSection === 'footer' && (
          <FooterEditor
            content={localContent.footer}
            onChange={(data) => updateSection('footer', data)}
          />
        )}
      </div>
    </AdminLayout>
  );
}

function getSectionTitle(section: string): string {
  const titles: Record<string, string> = {
    navigation: '导航栏配置',
    hero: '首屏 Hero 配置',
    concept: '核心理念配置',
    tools: 'AI工具生态配置',
    businessLoop: '商业闭环配置',
    cases: '成功案例配置',
    policy: '政策支持配置',
    globalNetwork: '全球网络配置',
    cta: 'CTA行动召唤配置',
    footer: '页脚配置',
  };
  return titles[section] || '配置';
}

function getSectionDescription(section: string): string {
  const descriptions: Record<string, string> = {
    navigation: '管理网站导航栏的链接、Logo 和 CTA 按钮',
    hero: '配置首屏的标题、描述、统计数据和背景图片',
    concept: '编辑核心理念区块的特色卡片、趋势和引用',
    tools: '管理 AI 工具分类、工具列表和 Agent 示例',
    businessLoop: '配置商业流程步骤和 OPC 模式优势',
    cases: '编辑成功案例卡片和全球统计数据',
    policy: '管理城市政策支持和税收优惠政策',
    globalNetwork: '配置全球协作平台和优势列表',
    cta: '编辑行动召唤区块的标题、按钮和特性标签',
    footer: '管理页脚的品牌信息、链接分组和社交媒体',
  };
  return descriptions[section] || '';
}
