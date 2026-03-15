/**
 * OPC 网站内容管理 API 服务
 * 使用 MySQL 数据库持久化存储网站内容数据
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase, query, checkConnection } from './database.js';

// 加载环境变量（默认加载当前目录的.env文件）
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 默认网站内容数据
const defaultContent = {
  navigation: {
    logoText: 'OPC',
    logoIcon: 'Cpu',
    navLinks: [
      { label: '核心理念', href: '#concept' },
      { label: 'AI工具', href: '#tools' },
      { label: '商业闭环', href: '#business' },
      { label: '成功案例', href: '#cases' },
      { label: '政策支持', href: '#policy' },
      { label: '全球网络', href: '#network' },
    ],
    ctaText: '立即开始',
  },
  hero: {
    badge: 'AI时代的新型组织形态',
    title: 'One Person\nCompany',
    subtitle: '碳基智慧 + 硅基执行',
    description: '一个人借助AI工具、自动化系统和全球协作网络，\n独立完成从产品设计到用户运营的全链路商业闭环',
    primaryCta: '开启你的OPC之旅',
    secondaryCta: '了解更多',
    backgroundImage: '/hero-bg.jpg',
    stats: [
      { icon: 'Cpu', value: '36%', label: '互联网创业一人公司占比', sublabel: '六年增长53%', color: 'cyan' },
      { icon: 'Sparkles', value: '¥500', label: '超九成启动资金低于', sublabel: 'AI降低创业门槛', color: 'purple' },
      { icon: 'Globe', value: '24/7', label: 'AI智能体全天候运营', sublabel: '无需通勤、情绪稳定', color: 'emerald' },
    ],
  },
  concept: {
    sectionBadge: 'OPC 核心理念',
    title: '不是"永远一个人"\n而是"一个人+AI集群"',
    highlightText: '一个人+AI集群',
    description: 'OPC本质是"一人公司 + AI智能体集群"——个人通过AI放大能力，实现"单人成军"',
    conceptImage: '/opc-concept.jpg',
    features: [
      { icon: 'Brain', title: '碳基智慧', description: '人类的核心创意、战略判断和情感连接能力，是OPC的决策中枢', color: 'from-cyan-500 to-blue-500' },
      { icon: 'Bot', title: '硅基执行', description: 'AI智能体集群7×24小时执行，从内容生成到客户服务全流程自动化', color: 'from-purple-500 to-pink-500' },
      { icon: 'Network', title: '全球协作', description: '连接全球自由职业者和专业服务，按需调用外部资源', color: 'from-emerald-500 to-teal-500' },
      { icon: 'TrendingUp', title: '无限扩展', description: '打破个人精力限制，AI能力可无限复制扩展业务规模', color: 'from-amber-500 to-orange-500' },
    ],
    trends: [
      { icon: 'Lightbulb', title: '为什么是OPC？', content: '2025年互联网一人公司创业占比达36%，六年间增长53%。技术平权让个人具备公司级能力，"一个人+AI员工"打开了全新创业空间。' },
      { icon: 'Zap', title: 'AI驱动的变革', content: 'OpenAI CEO山姆·奥特曼预言：2026-2028年将出现"一人独角兽"——一个人创办估值10亿美元的公司。' },
    ],
    quote: '"一个人 + 一套AI智能体 = 一家无需通勤、情绪稳定、效率爆表、7×24小时运营的公司"',
    quoteAuthor: '—— 个人智能体OpenClaw创始人彼得·斯坦伯格（Peter Steinberger）',
  },
  tools: {
    sectionBadge: 'AI工具生态',
    title: '你的AI员工团队',
    highlightText: 'AI员工团队',
    description: '从设计、开发到营销、运营，AI工具矩阵覆盖全链路业务场景',
    toolsImage: '/ai-tools.jpg',
    categories: [
      {
        icon: 'Palette',
        title: '设计创作',
        color: 'from-pink-500 to-rose-500',
        tools: [
          { name: 'Midjourney', desc: 'AI图像生成', link: '#' },
          { name: 'Stable Diffusion', desc: '开源图像生成', link: '#' },
          { name: 'Canva', desc: '在线设计工具', link: '#' },
          { name: 'Figma', desc: '协作界面设计', link: '#' },
          { name: 'D-ID', desc: 'AI数字人视频', link: '#' },
        ],
      },
      {
        icon: 'Code2',
        title: '开发编程',
        color: 'from-cyan-500 to-blue-500',
        tools: [
          { name: 'GitHub Copilot', desc: 'AI代码助手', link: '#' },
          { name: 'Cursor', desc: 'AI原生IDE', link: '#' },
          { name: 'V0', desc: 'AI生成UI组件', link: '#' },
          { name: 'Trae', desc: '字节AI编程工具', link: '#' },
          { name: 'Replit', desc: '云端开发环境', link: '#' },
        ],
      },
      {
        icon: 'Megaphone',
        title: '营销增长',
        color: 'from-purple-500 to-violet-500',
        tools: [
          { name: '原圈天工', desc: 'AI营销内容生成', link: '#' },
          { name: 'HubSpot', desc: '营销自动化', link: '#' },
          { name: 'Buffer', desc: '社媒管理', link: '#' },
          { name: 'Copy.ai', desc: 'AI文案写作', link: '#' },
          { name: 'Jasper', desc: 'AI内容营销', link: '#' },
        ],
      },
      {
        icon: 'Settings',
        title: '运营自动化',
        color: 'from-emerald-500 to-teal-500',
        tools: [
          { name: 'Zapier', desc: '工作流自动化', link: '#' },
          { name: 'Make', desc: '可视化自动化', link: '#' },
          { name: 'Dify', desc: 'AI应用开发平台', link: '#' },
          { name: 'Notion', desc: '全能工作空间', link: '#' },
          { name: 'Airtable', desc: '智能数据库', link: '#' },
        ],
      },
    ],
    agentExamples: [
      { icon: 'Wand2', title: '内容创作Agent', description: '自动生成博客、社媒内容、视频脚本' },
      { icon: 'GitBranch', title: '代码开发Agent', description: '辅助编程、代码审查、自动化测试' },
      { icon: 'BarChart3', title: '数据分析Agent', description: '自动收集数据、生成报表、洞察分析' },
      { icon: 'MessageSquare', title: '客户服务Agent', description: '7×24小时在线客服、智能问答' },
    ],
    agentTitle: 'AI智能体应用场景',
    agentSubtitle: '40个AI Agent可替代5人团队的营销工作',
    stats: [
      { value: '40%', label: 'Kimi code节省编码时间' },
      { value: '10分钟', label: 'AI生成公众号内容（原需8小时）' },
      { value: '70%', label: '客户响应时间缩短' },
    ],
  },
  businessLoop: {
    sectionBadge: '全链路闭环',
    title: '从创意到商业',
    highlightText1: '创意',
    highlightText2: '商业',
    description: '一个人独立完成产品设计、研发、市场投放、用户运营的全链路商业闭环',
    businessImage: '/business-loop.jpg',
    steps: [
      {
        icon: 'Lightbulb',
        title: '产品设计',
        subtitle: 'Product Design',
        description: '从创意到原型，AI辅助市场调研、用户画像、功能规划',
        tools: ['ChatGPT', 'Claude', 'Midjourney', 'Figma'],
        outputs: ['产品需求文档', '用户画像', '原型设计', '竞品分析'],
        color: 'from-cyan-500 to-blue-500',
      },
      {
        icon: 'Code',
        title: '研发实现',
        subtitle: 'Development',
        description: 'AI编程助手加速开发，从代码生成到测试部署',
        tools: ['GitHub Copilot', 'Cursor', 'V0', 'Replit'],
        outputs: ['MVP产品', '技术架构', '代码仓库', '自动化测试'],
        color: 'from-purple-500 to-pink-500',
      },
      {
        icon: 'Rocket',
        title: '市场投放',
        subtitle: 'Marketing',
        description: 'AI生成营销内容，自动化投放，精准触达目标用户',
        tools: ['Copy.ai', 'Buffer', 'HubSpot', '原圈天工'],
        outputs: ['品牌内容', '社媒运营', '广告投放', 'SEO优化'],
        color: 'from-amber-500 to-orange-500',
      },
      {
        icon: 'Users',
        title: '用户运营',
        subtitle: 'Operations',
        description: 'AI客服7×24在线，自动化用户旅程，数据驱动增长',
        tools: ['Zapier', 'Dify', 'Notion', 'Intercom'],
        outputs: ['用户增长', '客户成功', '数据分析', '产品迭代'],
        color: 'from-emerald-500 to-teal-500',
      },
    ],
    cycleText: '数据驱动持续迭代优化',
    benefitsTitle: 'OPC模式的核心优势',
    benefits: [
      '启动资金低于500元',
      '无需组建高配团队',
      '边试错边迭代',
      '灵活调整节奏',
      '7×24小时运营',
      '理论上无规模上限',
    ],
  },
  cases: {
    sectionBadge: '成功案例',
    title: '他们正在实现"一人独角兽"',
    highlightText: '一人独角兽',
    description: '从年入百万的超级个体到月增收数千的副业创作者，OPC模式正在创造无限可能',
    globalStats: [
      { value: '36%', label: '美国一人公司占比', growth: '六年增长53%' },
      { value: '$10B', label: '预测一人独角兽估值', growth: '2026-2028年' },
      { value: '90%+', label: '启动资金低于$500', growth: 'AI降低门槛' },
      { value: '30个+', label: '苏州OPC社区', growth: '2025年下半年建成' },
    ],
    cases: [
      {
        name: 'Marc Lou',
        role: '独立开发者',
        avatar: 'ML',
        avatarColor: 'from-cyan-500 to-blue-500',
        income: '$65,000/月',
        product: 'ShipFast',
        description: '开发网站模板帮助创业者一键生成产品官网，发布当月即创收4万美元，3个月累计收入超16.8万美元。',
        tags: ['SaaS', '独立开发', '模板'],
        metrics: [
          { icon: 'DollarSign', value: '$168K', label: '3个月收入' },
          { icon: 'Users', value: '1000+', label: '付费用户' },
        ],
      },
      {
        name: 'LK',
        role: 'AI创业者',
        avatar: 'LK',
        avatarColor: 'from-purple-500 to-pink-500',
        income: '¥100万+/年',
        product: 'HalfDone',
        description: '从大厂离职后独自开发AI网站，转向B端产品后客单价提升至50-100万元，实现年入百万。',
        tags: ['AI应用', 'B端服务', '独立开发'],
        metrics: [
          { icon: 'DollarSign', value: '¥50-100万', label: '客单价' },
          { icon: 'Clock', value: '3个月', label: '开发周期' },
        ],
      },
      {
        name: '匿名大厂员工',
        role: '超级个体',
        avatar: 'SJ',
        avatarColor: 'from-amber-500 to-orange-500',
        income: '¥100万/年',
        product: 'AI咨询',
        description: '裸辞后借助AI同时开展自媒体、AI讲师、B端咨询三项业务，年入近百万，工作时间更短、赚钱效率更高。',
        tags: ['知识付费', 'AI咨询', '自媒体'],
        metrics: [
          { icon: 'TrendingUp', value: '3项', label: '并行业务' },
          { icon: 'Clock', value: '50%', label: '工作时间' },
        ],
      },
      {
        name: '情感咨询师',
        role: '知识创作者',
        avatar: 'QC',
        avatarColor: 'from-emerald-500 to-teal-500',
        income: '+¥3,000/月',
        product: '情感咨询智能体',
        description: '在百度搜索创建情感咨询智能体，24小时在线自主代答，真人专注高价值一对一服务，月增收3000元。',
        tags: ['智能体', '知识变现', '咨询服务'],
        metrics: [
          { icon: 'Users', value: '24/7', label: '在线服务' },
          { icon: 'DollarSign', value: '¥3,000', label: '月增收' },
        ],
      },
    ],
    quote: '"在AI时代，一个人有可能创办一家估值10亿美元的公司。这样的公司可能在2026年到2028年出现。"',
    quoteAuthor: '—— 山姆·奥特曼 OpenAI CEO',
  },
  policy: {
    sectionBadge: '政策支持',
    title: '从"边缘形态"到"主流生态"',
    highlightText1: '边缘形态',
    highlightText2: '主流生态',
    description: '各地政府纷纷出台OPC专项支持政策，一人公司正在进入主流创业生态',
    policyImage: '/policy-support.jpg',
    cityPolicies: [
      {
        city: '苏州',
        policy: 'OPC创业首选城市',
        icon: 'Building2',
        color: 'from-cyan-500 to-blue-500',
        supports: [
          { label: '一次性创业补贴', value: '最高1万元' },
          { label: '场地租金补贴', value: '每月最高5000元' },
          { label: '算力券', value: '每年最高20万元' },
          { label: '股权投资', value: '最高2000万元' },
          { label: '领军人才工程', value: '最高5000万元' },
        ],
        target: '到2028年培育1000家OPC企业',
      },
      {
        city: '上海临港',
        policy: '超级个体288行动',
        icon: 'Landmark',
        color: 'from-purple-500 to-pink-500',
        supports: [
          { label: '办公空间', value: '零租金' },
          { label: '居住空间', value: '配套提供' },
          { label: '孵化器', value: '零界魔方' },
          { label: '生态支持', value: '全周期' },
        ],
        target: '打造OPC创业高地',
      },
      {
        city: '武汉',
        policy: '滨江亲橙OPC社区',
        icon: 'MapPin',
        color: 'from-emerald-500 to-teal-500',
        supports: [
          { label: '依托生态', value: '阿里生态' },
          { label: '支持周期', value: '全周期' },
          { label: '社区数量', value: '专业化运营' },
        ],
        target: '培育"一人独角兽"',
      },
      {
        city: '北京海淀',
        policy: '中关村AI北纬社区',
        icon: 'Cpu',
        color: 'from-amber-500 to-orange-500',
        supports: [
          { label: '服务计划', value: '全链条赋能' },
          { label: '基础设施', value: '完善配套' },
          { label: '生态体系', value: 'AI产业聚集' },
        ],
        target: '构建AI创业生态',
      },
    ],
    taxTitle: '税收优惠政策',
    taxSubtitle: '国家层面为个体工商户和小微企业提供多重税收优惠',
    taxBenefits: [
      {
        title: '个体工商户税收优惠',
        icon: 'Calculator',
        items: [
          { label: '个人所得税减半', desc: '年应纳税所得额不超过200万元部分' },
          { label: '增值税免征', desc: '月销售额10万元以下（含）' },
          { label: '六税两费减半', desc: '资源税、城建税、房产税等' },
          { label: '政策期限', desc: '2023年1月1日至2027年12月31日' },
        ],
      },
      {
        title: '小型微利企业优惠',
        icon: 'TrendingUp',
        items: [
          { label: '企业所得税', desc: '减按25%计入应纳税所得额，按20%税率缴纳' },
          { label: '适用条件', desc: '年应纳税所得额不超过300万元' },
          { label: '从业人数', desc: '不超过300人' },
          { label: '资产总额', desc: '不超过5000万元' },
        ],
      },
    ],
    ctaText: '查看完整税收政策指引',
    ctaLink: 'https://www.chinatax.gov.cn',
  },
  globalNetwork: {
    sectionBadge: '全球协作网络',
    title: '打破地理边界，连接全球智慧',
    highlightText: '连接全球智慧',
    description: 'OPC不是单打独斗，而是按需调用全球自由职业者和专业服务，构建无边界的协作网络',
    platforms: [
      {
        name: 'Upwork',
        description: '全球最大的综合性自由职业平台，连接180+国家的自由职业者',
        icon: 'Globe',
        color: 'from-green-500 to-emerald-500',
        features: ['按小时/项目计费', 'Escrow托管支付', '50+技能类别', '远程工作机会'],
        website: 'https://www.upwork.com',
      },
      {
        name: 'Fiverr',
        description: '以色列创立的全球服务平台，适合小额任务和快速交付',
        icon: 'Briefcase',
        color: 'from-green-400 to-teal-500',
        features: ['服务起价$5', '创意服务丰富', '快速交付', '买家保护'],
        website: 'https://www.fiverr.com',
      },
      {
        name: 'Toptal',
        description: '高端自由职业市场，仅接受全球前3%的人才',
        icon: 'Users',
        color: 'from-blue-500 to-indigo-500',
        features: ['精英人才', '严格筛选', '企业级服务', '高薪项目'],
        website: 'https://www.toptal.com',
      },
      {
        name: 'Freelancer',
        description: '竞标制自由职业平台，适合各类预算项目',
        icon: 'Wallet',
        color: 'from-cyan-500 to-blue-500',
        features: ['竞标模式', '项目多样', '全球用户', '竞赛功能'],
        website: 'https://www.freelancer.com',
      },
    ],
    advantagesTitle: '全球协作的优势',
    advantages: [
      { icon: 'Shield', title: '信任保障', description: '平台提供Escrow托管支付，保障双方权益' },
      { icon: 'Clock', title: '灵活时间', description: '按需雇佣，按项目合作，无长期雇佣成本' },
      { icon: 'Globe', title: '全球人才', description: '触达全球180+国家的专业人才' },
      { icon: 'Wallet', title: '成本优化', description: '根据预算选择合适的服务和人才' },
    ],
    stats: [
      { value: '180+', label: '覆盖国家' },
      { value: '50+', label: '技能类别' },
      { value: '$1T+', label: '全球自由职业经济' },
      { value: '35%', label: '美国自由职业者占比' },
    ],
  },
  cta: {
    title: '准备好开启你的\nOPC之旅',
    highlightText: 'OPC之旅',
    description: '一个人 + AI智能体集群 = 一家无需通勤、情绪稳定、效率爆表、7×24小时运营的公司。\n现在就开始，成为AI时代的"超级个体"。',
    features: [
      { icon: 'Sparkles', text: '启动资金低于$500', color: 'cyan' },
      { icon: 'Sparkles', text: 'AI工具全程赋能', color: 'purple' },
      { icon: 'Sparkles', text: '政策红利支持', color: 'emerald' },
    ],
    primaryCta: '立即开始',
    secondaryCta: '获取创业指南',
    trustTitle: '加入全球OPC创业者社区',
    trustStats: [
      { value: '36%', label: '美国占比' },
      { value: '1000+', label: '苏州目标' },
      { value: '$10B', label: '独角兽目标' },
    ],
  },
  footer: {
    brandName: 'OPC服务平台',
    brandSubname: 'One Person Company',
    description: '碳基智慧 + 硅基执行，一个人借助AI工具完成全链路商业闭环的新型组织形态。',
    linkGroups: [
      {
        title: '产品服务',
        links: [
          { label: 'OPC工具库', href: '#' },
          { label: 'AI智能体', href: '#' },
          { label: '自动化工作流', href: '#' },
          { label: '全球协作网络', href: '#' },
        ],
      },
      {
        title: '资源中心',
        links: [
          { label: '创业指南', href: '#' },
          { label: '政策解读', href: '#' },
          { label: '成功案例', href: '#' },
          { label: '工具推荐', href: '#' },
        ],
      },
      {
        title: '社区',
        links: [
          { label: 'OPC论坛', href: '#' },
          { label: '线下活动', href: '#' },
          { label: '合作伙伴', href: '#' },
          { label: '加入社群', href: '#' },
        ],
      },
      {
        title: '关于',
        links: [
          { label: '关于我们', href: '#' },
          { label: '联系方式', href: '#' },
          { label: '隐私政策', href: '#' },
          { label: '服务条款', href: '#' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'Twitter', href: '#', label: 'Twitter' },
      { icon: 'Github', href: '#', label: 'GitHub' },
      { icon: 'Linkedin', href: '#', label: 'LinkedIn' },
      { icon: 'Mail', href: '#', label: 'Email' },
    ],
    copyright: '© 2026 OPC Platform. All rights reserved.',
    partnerLinks: [
      { label: '36氪', href: 'https://www.36kr.com' },
      { label: '国家税务总局', href: 'https://www.chinatax.gov.cn' },
    ],
  },
};

/**
 * 从数据库读取所有内容
 */
async function readContent() {
  try {
    const rows = await query('SELECT section_name, section_data FROM website_content');
    const content = { ...defaultContent };
    
    rows.forEach(row => {
      try {
        content[row.section_name] = JSON.parse(row.section_data);
      } catch (e) {
        console.error(`解析 ${row.section_name} 数据失败:`, e);
      }
    });
    
    return content;
  } catch (error) {
    console.error('从数据库读取内容失败:', error);
    return defaultContent;
  }
}

/**
 * 保存所有内容到数据库
 */
async function writeContent(content) {
  const sections = Object.keys(content);
  
  for (const section of sections) {
    await query(
      `INSERT INTO website_content (section_name, section_data) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE section_data = VALUES(section_data)`,
      [section, JSON.stringify(content[section])]
    );
  }
}

/**
 * 初始化默认数据到数据库
 */
async function initDefaultData() {
  try {
    const count = await query('SELECT COUNT(*) as count FROM website_content');
    if (count[0].count === 0) {
      console.log('📝 初始化默认数据到数据库...');
      await writeContent(defaultContent);
      console.log('✅ 默认数据初始化完成');
    }
  } catch (error) {
    console.error('初始化默认数据失败:', error);
  }
}

// API 路由

// 获取所有内容
app.get('/api/content', async (req, res) => {
  try {
    const content = await readContent();
    res.json({ success: true, data: content });
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ success: false, message: '读取内容失败' });
  }
});

// 获取特定区块内容
app.get('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const content = await readContent();
    
    if (section in content) {
      res.json({ success: true, data: content[section] });
    } else {
      res.status(404).json({ success: false, message: '区块不存在' });
    }
  } catch (error) {
    console.error('Error reading section:', error);
    res.status(500).json({ success: false, message: '读取内容失败' });
  }
});

// 更新所有内容
app.post('/api/content', async (req, res) => {
  try {
    const newContent = req.body;
    await writeContent(newContent);
    res.json({ success: true, message: '内容已保存' });
  } catch (error) {
    console.error('Error writing content:', error);
    res.status(500).json({ success: false, message: '保存内容失败' });
  }
});

// 更新特定区块
app.put('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const sectionData = req.body;
    
    await query(
      `INSERT INTO website_content (section_name, section_data) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE section_data = VALUES(section_data)`,
      [section, JSON.stringify(sectionData)]
    );
    
    res.json({ success: true, message: '区块已更新' });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ success: false, message: '更新内容失败' });
  }
});

// 重置为默认内容
app.post('/api/content/reset', async (req, res) => {
  try {
    await writeContent(defaultContent);
    res.json({ success: true, message: '内容已重置为默认值', data: defaultContent });
  } catch (error) {
    console.error('Error resetting content:', error);
    res.status(500).json({ success: false, message: '重置内容失败' });
  }
});

// 健康检查
app.get('/api/health', async (req, res) => {
  const dbConnected = await checkConnection();
  res.json({ 
    success: true, 
    message: 'API 服务正常运行',
    database: dbConnected ? '已连接' : '未连接'
  });
});

// 启动服务器
async function startServer() {
  try {
    // 初始化数据库
    await initDatabase();
    
    // 初始化默认数据
    await initDefaultData();
    
    app.listen(PORT, () => {
      console.log(`🚀 OPC 内容管理 API 服务已启动`);
      console.log(`📍 地址: http://localhost:${PORT}`);
      console.log(`🗄️  数据库: MySQL`);
      console.log('');
      console.log('可用接口:');
      console.log(`  GET    http://localhost:${PORT}/api/health`);
      console.log(`  GET    http://localhost:${PORT}/api/content`);
      console.log(`  GET    http://localhost:${PORT}/api/content/:section`);
      console.log(`  POST   http://localhost:${PORT}/api/content`);
      console.log(`  PUT    http://localhost:${PORT}/api/content/:section`);
      console.log(`  POST   http://localhost:${PORT}/api/content/reset`);
    });
  } catch (error) {
    console.error('❌ 服务器启动失败:', error);
    process.exit(1);
  }
}

startServer();
