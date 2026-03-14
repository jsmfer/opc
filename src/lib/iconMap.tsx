import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// 图标名称到组件的映射
export const iconMap: Record<string, LucideIcon> = {
  // 导航和通用
  Menu: LucideIcons.Menu,
  X: LucideIcons.X,
  ArrowRight: LucideIcons.ArrowRight,
  ExternalLink: LucideIcons.ExternalLink,
  Home: LucideIcons.Home,
  User: LucideIcons.User,
  Users: LucideIcons.Users,
  
  // Logo 图标
  Cpu: LucideIcons.Cpu,
  Hexagon: LucideIcons.Hexagon,
  Box: LucideIcons.Box,
  LayoutGrid: LucideIcons.LayoutGrid,
  Layers: LucideIcons.Layers,
  
  // Hero 图标
  Sparkles: LucideIcons.Sparkles,
  
  // Concept 图标
  Brain: LucideIcons.Brain,
  Bot: LucideIcons.Bot,
  Network: LucideIcons.Network,
  TrendingUp: LucideIcons.TrendingUp,
  Lightbulb: LucideIcons.Lightbulb,
  Zap: LucideIcons.Zap,
  
  // Tools 图标
  Palette: LucideIcons.Palette,
  Code2: LucideIcons.Code2,
  Code: LucideIcons.Code,
  Megaphone: LucideIcons.Megaphone,
  Settings: LucideIcons.Settings,
  Wand2: LucideIcons.Wand2,
  GitBranch: LucideIcons.GitBranch,
  BarChart3: LucideIcons.BarChart3,
  MessageSquare: LucideIcons.MessageSquare,
  
  // BusinessLoop 图标
  RefreshCw: LucideIcons.RefreshCw,
  CheckCircle2: LucideIcons.CheckCircle2,
  CheckCircle: LucideIcons.CheckCircle,
  
  // Cases 图标
  DollarSign: LucideIcons.DollarSign,
  Clock: LucideIcons.Clock,
  Quote: LucideIcons.Quote,
  
  // Policy 图标
  Building2: LucideIcons.Building2,
  Calculator: LucideIcons.Calculator,
  Landmark: LucideIcons.Landmark,
  MapPin: LucideIcons.MapPin,
  
  // GlobalNetwork 图标
  Briefcase: LucideIcons.Briefcase,
  Wallet: LucideIcons.Wallet,
  Shield: LucideIcons.Shield,
  
  // CTA 图标 (Star 已在上面定义)
  
  // Footer 图标
  Mail: LucideIcons.Mail,
  Github: LucideIcons.Github,
  Twitter: LucideIcons.Twitter,
  Linkedin: LucideIcons.Linkedin,
};

// 获取图标组件
export function getIcon(name: string): LucideIcon {
  return iconMap[name] || LucideIcons.Circle;
}
