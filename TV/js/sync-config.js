// 配置同步模块

// 在页面加载时同步网站配置信息
function syncSiteConfig() {
    // 更新页面标题
    document.title = SITE_CONFIG.name + ' - ' + SITE_CONFIG.description;
    
    // 更新meta标签
    updateMetaTag('description', SITE_CONFIG.description);
    updateMetaTag('author', SITE_CONFIG.name);
    
    // 更新Open Graph标签
    updateMetaTag('og:title', SITE_CONFIG.name + ' - ' + SITE_CONFIG.description);
    updateMetaTag('og:description', SITE_CONFIG.description);
    updateMetaTag('og:url', SITE_CONFIG.url);
    updateMetaTag('og:image', SITE_CONFIG.logo);
    
    // 更新Twitter卡片标签
    updateMetaTag('twitter:title', SITE_CONFIG.name + ' - ' + SITE_CONFIG.description);
    updateMetaTag('twitter:description', SITE_CONFIG.description);
    updateMetaTag('twitter:url', SITE_CONFIG.url);
    updateMetaTag('twitter:image', SITE_CONFIG.logo);
    
    // 更新网站图标
    updateFavicon(SITE_CONFIG.logo);
    
    // 更新canonical链接
    updateCanonicalLink(SITE_CONFIG.url);
    
    // 更新网站标题和Logo（排除搜索框上方的标题）
    const siteTitles = document.querySelectorAll('header .gradient-text, footer .gradient-text');
    siteTitles.forEach(title => {
        title.textContent = SITE_CONFIG.name;
    });

    // 更新网站描述文本
    const siteDescription = document.querySelector('.text-gray-400.mb-8');
    if (siteDescription) {
        siteDescription.textContent = SITE_CONFIG.description;
    }

    // 更新页脚版权信息
    const footerDescription = document.querySelector('.text-gray-500.text-sm.mt-2');
    if (footerDescription) {
        footerDescription.textContent = `© ${new Date().getFullYear()} ${SITE_CONFIG.name} - ${SITE_CONFIG.description}`;
    }
}

// 更新meta标签的辅助函数
function updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    if (meta) {
        meta.setAttribute('content', content);
    }
}

// 更新网站图标的辅助函数
function updateFavicon(iconUrl) {
    let favicon = document.querySelector('link[rel="icon"]');
    let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    
    if (favicon) {
        favicon.href = iconUrl;
    }
    
    if (appleTouchIcon) {
        appleTouchIcon.href = iconUrl;
    }
}

// 更新canonical链接的辅助函数
function updateCanonicalLink(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        canonical.href = url;
    }
}

// 在页面加载完成后执行配置同步
document.addEventListener('DOMContentLoaded', syncSiteConfig);