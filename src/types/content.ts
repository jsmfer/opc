// 网站内容数据类型定义

// 导航链接
export interface NavLink {
  label: string;
  href: string;
}

// Hero 统计数据
export interface HeroStat {
  icon: string;
  value: string;
  label: string;
  sublabel: string;
  color: string;
}

// Hero 区块
export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  stats: HeroStat[];
  backgroundImage: string;
}

// 特色卡片
export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

// 趋势卡片
export interface Trend {
  icon: string;
  title: string;
  content: string;
}

// Concept 区块
export interface ConceptContent {
  sectionBadge: string;
  title: string;
  highlightText: string;
  description: string;
  conceptImage: string;
  features: Feature[];
  trends: Trend[];
  quote: string;
  quoteAuthor: string;
}

// 工具项
export interface Tool {
  name: string;
  desc: string;
  link: string;
}

// 工具分类
export interface ToolCategory {
  icon: string;
  title: string;
  color: string;
  tools: Tool[];
}

// AI Agent 示例
export interface AgentExample {
  icon: string;
  title: string;
  description: string;
}

// Tools 区块
export interface ToolsContent {
  sectionBadge: string;
  title: string;
  highlightText: string;
  description: string;
  toolsImage: string;
  categories: ToolCategory[];
  agentExamples: AgentExample[];
  agentTitle: string;
  agentSubtitle: string;
  stats: { value: string; label: string }[];
}

// 商业流程步骤
export interface BusinessStep {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  outputs: string[];
  color: string;
}

// BusinessLoop 区块
export interface BusinessLoopContent {
  sectionBadge: string;
  title: string;
  highlightText1: string;
  highlightText2: string;
  description: string;
  businessImage: string;
  steps: BusinessStep[];
  cycleText: string;
  benefitsTitle: string;
  benefits: string[];
}

// 案例
export interface Case {
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  income: string;
  product: string;
  description: string;
  tags: string[];
  metrics: { icon: string; value: string; label: string }[];
}

// 全球统计
export interface GlobalStat {
  value: string;
  label: string;
  growth: string;
}

// Cases 区块
export interface CasesContent {
  sectionBadge: string;
  title: string;
  highlightText: string;
  description: string;
  globalStats: GlobalStat[];
  cases: Case[];
  quote: string;
  quoteAuthor: string;
}

// 城市政策支持项
export interface CitySupport {
  label: string;
  value: string;
}

// 城市政策
export interface CityPolicy {
  city: string;
  policy: string;
  icon: string;
  color: string;
  supports: CitySupport[];
  target: string;
}

// 税收优惠项
export interface TaxItem {
  label: string;
  desc: string;
}

// 税收优惠
export interface TaxBenefit {
  title: string;
  icon: string;
  items: TaxItem[];
}

// Policy 区块
export interface PolicyContent {
  sectionBadge: string;
  title: string;
  highlightText1: string;
  highlightText2: string;
  description: string;
  policyImage: string;
  cityPolicies: CityPolicy[];
  taxTitle: string;
  taxSubtitle: string;
  taxBenefits: TaxBenefit[];
  ctaText: string;
  ctaLink: string;
}

// 全球平台
export interface GlobalPlatform {
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  website: string;
}

// 全球优势
export interface GlobalAdvantage {
  icon: string;
  title: string;
  description: string;
}

// GlobalNetwork 区块
export interface GlobalNetworkContent {
  sectionBadge: string;
  title: string;
  highlightText: string;
  description: string;
  platforms: GlobalPlatform[];
  advantagesTitle: string;
  advantages: GlobalAdvantage[];
  stats: { value: string; label: string }[];
}

// CTA 区块
export interface CTAContent {
  title: string;
  highlightText: string;
  description: string;
  features: { icon: string; text: string; color: string }[];
  primaryCta: string;
  secondaryCta: string;
  trustTitle: string;
  trustStats: { value: string; label: string }[];
}

// 页脚链接
export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

// 社交媒体链接
export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

// Footer 区块
export interface FooterContent {
  brandName: string;
  brandSubname: string;
  description: string;
  linkGroups: FooterLinkGroup[];
  socialLinks: SocialLink[];
  copyright: string;
  partnerLinks: { label: string; href: string }[];
}

// 导航内容
export interface NavigationContent {
  logoText: string;
  logoIcon: string;
  navLinks: NavLink[];
  ctaText: string;
}

// 完整网站内容
export interface WebsiteContent {
  navigation: NavigationContent;
  hero: HeroContent;
  concept: ConceptContent;
  tools: ToolsContent;
  businessLoop: BusinessLoopContent;
  cases: CasesContent;
  policy: PolicyContent;
  globalNetwork: GlobalNetworkContent;
  cta: CTAContent;
  footer: FooterContent;
}
