# OPC 网站内容管理 - 后端持久化方案

## 概述

本项目已升级为支持后端持久化存储，内容数据将保存在服务器端的 JSON 文件中，而非浏览器的 localStorage。

## 架构

```
┌─────────────┐      HTTP API      ┌─────────────────┐
│  前端 React  │ ◄────────────────► │  Node.js 后端   │
│   (Vite)    │                    │  (Express)      │
└─────────────┘                    └─────────────────┘
                                          │
                                          ▼
                                    ┌─────────────┐
                                    │ content.json│
                                    │ (数据文件)   │
                                    └─────────────┘
```

## 快速开始

### 1. 安装后端依赖

```bash
cd server
npm install
cd ..
```

### 2. 启动后端服务

```bash
# 开发模式（带热重载）
npm run server:dev

# 生产模式
npm run server
```

后端服务默认运行在 `http://localhost:3001`

### 3. 启动前端（新终端窗口）

```bash
npm run dev
```

前端服务默认运行在 `http://localhost:5173`

### 4. 同时启动前后端（可选）

```bash
npm run dev:full
```

## API 接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/content` | 获取所有内容 |
| GET | `/api/content/:section` | 获取特定区块 |
| POST | `/api/content` | 保存所有内容 |
| PUT | `/api/content/:section` | 更新特定区块 |
| POST | `/api/content/reset` | 重置为默认内容 |

## 配置文件

### 环境变量

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

### 数据存储

- 数据文件：`server/data/content.json`
- 首次启动时自动创建
- 数据持久保存在服务器端

## 降级方案

如果后端服务不可用，前端会自动切换到本地模式：

1. 首次尝试连接后端 API
2. 连接失败时，尝试从 localStorage 加载数据
3. 用户可点击"使用本地模式"按钮强制切换到本地存储
4. 本地模式下，数据仅保存在浏览器中

## 部署建议

### 生产环境部署

1. **使用 PM2 管理 Node.js 进程**

```bash
npm install -g pm2
pm2 start server/api.ts --name opc-api
```

2. **配置 Nginx 反向代理**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **配置环境变量**

```bash
# .env.production
VITE_API_URL=/api
```

### 备份策略

定期备份 `server/data/content.json` 文件：

```bash
# 添加到 crontab
cp server/data/content.json backups/content-$(date +%Y%m%d).json
```

## 故障排查

### 后端服务无法启动

```bash
# 检查端口占用
lsof -i :3001

# 检查 Node.js 版本
node --version  # 需要 v18+
```

### 前端无法连接后端

1. 检查后端服务是否运行
2. 检查 `VITE_API_URL` 配置是否正确
3. 检查浏览器控制台网络请求

### 数据丢失

1. 检查 `server/data/content.json` 文件是否存在
2. 检查文件权限
3. 从备份恢复

## 特性对比

| 特性 | localStorage | 后端持久化 |
|------|-------------|-----------|
| 数据共享 | ❌ 仅限单设备 | ✅ 多设备共享 |
| 数据安全 | ❌ 浏览器清理丢失 | ✅ 服务器端持久化 |
| 离线可用 | ✅ 是 | ⚠️ 需先加载 |
| 数据量限制 | ~5MB | 无限制 |
| 协作编辑 | ❌ 不支持 | ⚠️ 需额外实现 |
