# 免费在线视频搜索与观看平台（静态代码）

## 📺 项目简介

这是一个轻量级、免费的在线视频搜索与观看平台，提供来自多个视频源的内容搜索与播放服务。项目采用纯前端技术构建，具有以下特点：

- 🚀 **即开即用**：无需注册和复杂配置，部署后立即可用
- 💻 **多端适配**：完美支持PC、平板和手机等多种设备访问
- 🎯 **聚合搜索**：整合多个视频源，提供统一的搜索接口
- 🛡️ **无广告**：内置广告过滤功能，提供清爽的观看体验
- 🔄 **实时播放**：支持实时视频流媒体播放
- 💾 **本地缓存**：自动记录观看历史和收藏夹

## ⚙️ 环境要求

- 支持静态网页托管的服务器或平台（如GitHub Pages、Vercel、Netlify等）
- 现代浏览器（Chrome、Firefox、Safari、Edge等较新版本）
- 稳定的网络连接（建议带宽≥10Mbps）

## 🔧 配置修改指南

在部署到自己的网站之前，需要修改以下文件中的配置：

### 1. js/config.js

这是项目的核心配置文件，主要修改 `SITE_CONFIG` ，`PROXY_URL`配置项：

`PROXY_URL`: 修改为你自己的代理服务地址（默认不稳定）

const SITE_CONFIG = {
    name: '在线视频',  // 网站名称
    url: 'https://www.example.com',  // 你的网站URL
    description: '免费在线视频搜索与观看平台',  // 网站描述
    logo: 'https://example.com/logo.png',  // 网站logo URL
    version: '1.0.0'
};

### 2. index.html

主页面需要修改以下内容：

1. SEO相关配置：
```html
<title>你的网站名称 - 在线视频平台</title>
<meta name="description" content="你的网站描述">
<meta name="keywords" content="在线视频,免费视频,视频搜索,电影,电视剧">
<meta name="author" content="你的名字">
```

2. 社交媒体分享配置：
```html
<meta property="og:url" content="https://www.example.com">
<meta property="twitter:url" content="https://www.example.com">
```

3. 规范链接：
```html
<link rel="canonical" href="https://www.example.com">
```

4. 结构化数据：
```html
<script type="application/ld+json">
{
    "@type": "WebSite",
    "name": "你的网站名称",
    "url": "https://www.example.com",
    "target": "https://www.example.com/?s={search_term_string}"
}
</script>
```

### 3. about.html 和 privacy.html

记得更新这两个页面中的网站信息：

```html
<!-- about.html -->
<p class="text-gray-300 mb-4">
    欢迎访问我的网站：
    <a href="https://www.example.com" class="text-blue-400 hover:underline">https://www.example.com</a>
</p>

<!-- privacy.html -->
<title>隐私政策 - 你的网站名称</title>
```

## 🚀 部署步骤

1. **下载项目文件**
   - 克隆或下载本项目代码
   - 解压到本地目录

2. **修改配置**
   - 按照上述配置指南修改相关文件
   - 确保所有URL都改为你自己的域名

3. **本地测试**
   - 使用任意静态服务器（如 `npx serve`）在本地运行测试
   - 确保所有功能正常运行

4. **部署上线**
   - 将所有文件上传到你的网站服务器

## 🛠️ 技术栈

- **前端框架**
  - HTML5 + CSS3 + JavaScript (ES6+)
  - Tailwind CSS (通过CDN引入)

- **视频播放**
  - HLS.js - HLS流处理
  - DPlayer - 视频播放器核心

- **其他技术**
  - 前端API请求拦截
  - localStorage本地存储
  - 响应式设计

## ⚠️ 免责声明

本项目仅作为视频搜索工具，不存储、上传或分发任何视频内容。所有视频均来自第三方API接口提供的搜索结果。如有侵权内容，请联系相应的内容提供方。使用本项目时，请确保遵守当地法律法规。
