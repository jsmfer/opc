# OPC Web (React + TypeScript + Vite)

A marketing website with an admin content editor built in React + TypeScript using Vite.

## Quick Start

```bash
git clone https://github.com/Jsjack/opc.git
cd opcweb
npm install
npm run dev
```

### Project commands

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build

## Git setup status

- Remote: `git@github.com:Jsjack/opc.git`
- Branch: `main`
- SSH auth configured and validated (`ssh -T git@github.com` returns success)

## About

This template uses React 18, TypeScript, Tailwind, shadcn/ui components, and Vite.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 网站栏目结构分析

### 前台页面结构

网站采用单页应用(SPA)架构，主页面包含以下9个主要区块：

#### 1. Navigation（导航栏）
- 位置：页面顶部
- 功能：网站主导航菜单
- 包含：Logo、导航链接、用户操作按钮

#### 2. Hero（英雄区块）
- 位置：页面顶部主要展示区
- 功能：品牌展示和核心价值传达
- 包含：徽章、标题、副标题、描述、CTA按钮、统计数据、背景图片

#### 3. Concept（概念区块）
- 位置：Hero区块下方
- 功能：介绍核心概念和理念
- 包含：章节徽章、标题、高亮文本、描述、特色功能列表、趋势卡片

#### 4. Tools（工具区块）
- 位置：Concept区块下方
- 功能：展示提供的工具和服务
- 包含：章节徽章、标题、高亮文本、描述、工具卡片列表

#### 5. BusinessLoop（业务循环区块）
- 位置：Tools区块下方
- 功能：展示业务流程和循环
- 包含：章节徽章、标题、高亮文本、描述、业务流程图、步骤列表、优势列表

#### 6. Cases（案例区块）
- 位置：BusinessLoop区块下方
- 功能：展示成功案例和用户故事
- 包含：章节徽章、标题、高亮文本、描述、全球统计数据、案例列表、引用语

#### 7. Policy（政策区块）
- 位置：Cases区块下方
- 功能：展示政策和合规信息
- 包含：章节徽章、标题、高亮文本、描述、政策卡片列表

#### 8. GlobalNetwork（全球网络区块）
- 位置：Policy区块下方
- 功能：展示全球网络覆盖和服务
- 包含：章节徽章、标题、高亮文本、描述、平台列表、优势列表、统计数据

#### 9. CTA（行动号召区块）
- 位置：GlobalNetwork区块下方
- 功能：引导用户采取行动
- 包含：标题、高亮文本、描述、功能特性、CTA按钮、信任统计

#### 10. Footer（页脚）
- 位置：页面底部
- 功能：提供网站信息和链接
- 包含：Logo、描述、链接分组、社交媒体链接、版权信息

### 后台管理结构

#### 管理页面功能
- **登录页面** (`/login`)：管理员登录入口
- **管理主页** (`/admin`)：内容管理系统主界面

#### 编辑器组件
后台管理系统包含以下10个内容编辑器：

1. **NavigationEditor**：导航栏内容编辑
2. **HeroEditor**：英雄区块内容编辑
3. **ConceptEditor**：概念区块内容编辑
4. **ToolsEditor**：工具区块内容编辑
5. **BusinessLoopEditor**：业务循环区块内容编辑
6. **CasesEditor**：案例区块内容编辑
7. **PolicyEditor**：政策区块内容编辑
8. **GlobalNetworkEditor**：全球网络区块内容编辑
9. **CTAEditor**：行动号召区块内容编辑
10. **FooterEditor**：页脚内容编辑

### 技术架构

#### 前端技术栈
- **React 18**：用户界面框架
- **TypeScript**：类型安全的JavaScript
- **Vite**：构建工具和开发服务器
- **Tailwind CSS**：实用优先的CSS框架
- **shadcn/ui**：基于Radix UI的组件库
- **React Router**：客户端路由管理
- **Zustand**：轻量级状态管理
- **React Hook Form**：表单管理

#### 项目结构
```
src/
├── admin/           # 后台管理模块
│   ├── components/  # 管理组件
│   │   ├── editors/ # 内容编辑器
│   │   └── ...
│   └── pages/       # 管理页面
├── components/      # 通用组件
│   └── ui/          # UI组件库
├── hooks/           # 自定义Hooks
├── lib/             # 工具库
├── sections/        # 页面区块组件
└── types/           # TypeScript类型定义
```

#### 路由结构
- `/`：前台主页
- `/login`：管理员登录
- `/admin`：后台管理（需要认证）
- `*`：404重定向到主页

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
