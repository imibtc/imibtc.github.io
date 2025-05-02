// ======================
// 全局网络配置（已修改）
// ======================
const NETWORK_CONFIG = {
  // 更新代理配置（全部使用可用的公共代理）
  proxies: [
    'https://corsproxy.io/?',  // 稳定代理1
    'https://api.allorigins.win/get?url=',  // 代理2
    'https://thingproxy.freeboard.io/fetch/'  // 新增代理3
  ],
  
  // 增强的重试配置
  retryConfig: {
    maxRetries: 3,  // 增加到3次
    retryDelay: 1000, // 重试间隔1秒
    timeout: 8000 // 单个请求超时8秒
  },
  
  // 新增API健康检查
  healthCheck: {
    checkInterval: 60000 // 每分钟检查一次代理可用性
  }
};

// ======================
// 搜索专用配置（新增）
// ======================
const SEARCH_CONFIG = {
  // 搜索参数配置
  params: {
    default: {
      ac: 'videolist',
      wd: '', // 搜索关键词占位符
      pg: 1   // 页码
    },
    // 特殊API的参数覆盖
    overrides: {
      ffzy: {
        ac: 'search'
      }
    }
  },
  
  // 结果处理配置
  resultHandler: {
    minScore: 0.5, // 最低匹配分数
    maxResults: 50 // 最大返回结果数
  }
};

// ======================
// 增强的本地存储配置
// ======================
const STORAGE_CONFIG = {
  searchHistory: {
    key: 'videoSearchHistory',
    maxItems: 5,
    deduplicate: true,
    expires: 7 * 24 * 60 * 60 * 1000,
    // 新增搜索统计功能
    analytics: true // 是否记录搜索频率
  },
  recentWatched: {
    key: 'recentWatchedVideos',
    maxItems: 10,
    // 新增观看进度记录
    saveProgress: true
  },
  // 新增代理缓存
  proxyCache: {
    key: 'proxyPerformance',
    maxItems: 10
  }
};

// ======================
// 兼容旧版本
// ======================
const PROXY_URL = NETWORK_CONFIG.proxies[0];
const SEARCH_HISTORY_KEY = STORAGE_CONFIG.searchHistory.key;
const MAX_HISTORY_ITEMS = STORAGE_CONFIG.searchHistory.maxItems;

// ======================
// 新增核心搜索函数
// ======================
class SearchService {
  static async search(keyword, options = {}) {
    // 参数处理
    const searchParams = new URLSearchParams({
      ...SEARCH_CONFIG.params.default,
      wd: keyword,
      ...options
    });
    
    // 尝试所有可用代理
    for (const proxy of NETWORK_CONFIG.proxies) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), NETWORK_CONFIG.retryConfig.timeout);
        
        const response = await fetch(`${proxy}${encodeURIComponent(`${API_SITES.heimuer.api}?${searchParams}`)}`, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          return this.processResults(data);
        }
      } catch (error) {
        console.warn(`代理 ${proxy} 失败:`, error.message);
      }
    }
    
    throw new Error('所有代理尝试均失败');
  }
  
  static processResults(data) {
    // 结果过滤和处理
    return {
      success: true,
      count: data.list?.length || 0,
      results: (data.list || []).filter(item => 
        item.vod_name && item.vod_play_url
      ).slice(0, SEARCH_CONFIG.resultHandler.maxResults)
    };
  }
}

// ======================
// 使用方法示例
// ======================
/*
// 在搜索事件中调用
document.getElementById('search-btn').addEventListener('click', async () => {
  const keyword = document.getElementById('search-input').value;
  
  try {
    const result = await SearchService.search(keyword);
    if (result.success && result.count > 0) {
      // 显示结果
      displayResults(result.results);
      // 存储历史
      StorageManager.updateSearchHistory(keyword);
    } else {
      showNoResults();
    }
  } catch (error) {
    showError(error.message);
  }
});
*/

// 网站信息配置
const SITE_CONFIG = {
    name: '伊米博客TV',
    url: 'https://www.imibtc.com',
    description: '免费在线视频搜索与观看平台',
    logo: 'https://images.icon-icons.com/38/PNG/512/retrotv_5520.png',
    version: '1.0.0'
};

// API站点配置
const API_SITES = {
    heimuer: {
        api: 'https://json.heimuer.xyz',
        name: '黑木耳',
        detail: 'https://heimuer.tv'
    },
    ffzy: {
        api: 'http://ffzy5.tv',
        name: '非凡影视',
        detail: 'http://ffzy5.tv'
    },
    tyyszy: {
        api: 'https://tyyszy.com',
        name: '天涯资源',
    },
    ckzy: {
        api: 'https://www.ckzy1.com',
        name: 'CK资源',
        adult: true
    },
    zy360: {
        api: 'https://360zy.com',
        name: '360资源',
    },
    wolong: {
        api: 'https://wolongzyw.com',
        name: '卧龙资源',
    },
    cjhw: {
        api: 'https://cjhwba.com',
        name: '新华为',
    },
    jisu: {
        api: 'https://jszyapi.com',
        name: '极速资源',
        detail: 'https://jszyapi.com'
    },
    dbzy: {
        api: 'https://dbzy.com',
        name: '豆瓣资源',
    },
    bfzy: {
        api: 'https://bfzyapi.com',
        name: '暴风资源',
    },
    mozhua: {
        api: 'https://mozhuazy.com',
        name: '魔爪资源',
    },
    mdzy: {
        api: 'https://www.mdzyapi.com',
        name: '魔都资源',
    },
    ruyi: {
        api: 'https://cj.rycjapi.com',
        name: '如意资源',
    },
    
    jkun: {
        api: 'https://jkunzyapi.com',
        name: 'jkun资源',
        adult: true
    },
    bwzy: {
        api: 'https://api.bwzym3u8.com',
        name: '百万资源',
        adult: true
    },
    souav: {
        api: 'https://api.souavzy.vip',
        name: 'souav资源',
        adult: true
    },
    siwa: {
        api: 'https://siwazyw.tv',
        name: '丝袜资源',
        adult: true
    },
    r155: {
        api: 'https://155api.com',
        name: '155资源',
        adult: true
    },
    lsb: {
        api: 'https://apilsbzy1.com',
        name: 'lsb资源',
        adult: true
    },
    huangcang: {
        api: 'https://hsckzy.vip',
        name: '黄色仓库',
        adult: true,
        detail: 'https://hsckzy.vip' // 添加detail URL以便特殊处理
    }
};

// 添加聚合搜索的配置选项
const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,             // 是否启用聚合搜索
    timeout: 8000,            // 单个源超时时间（毫秒）
    maxResults: 10000,          // 最大结果数量
    parallelRequests: true,   // 是否并行请求所有源
    showSourceBadges: true    // 是否显示来源徽章
};

// 抽象API请求配置
const API_CONFIG = {
    search: {
        // 修改搜索接口为返回更多详细数据（包括视频封面、简介和播放列表）
        path: '/api.php/provide/vod/?ac=videolist&wd=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        // 修改详情接口也使用videolist接口，但是通过ID查询，减少请求次数
        path: '/api.php/provide/vod/?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    }
};

// 优化后的正则表达式模式
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;

// 添加自定义播放器URL
const CUSTOM_PLAYER_URL = 'player.html'; // 使用相对路径引用本地player.html

// 增加视频播放相关配置
const PLAYER_CONFIG = {
    autoplay: true,
    allowFullscreen: true,
    width: '100%',
    height: '600',
    timeout: 15000,  // 播放器加载超时时间
    filterAds: true,  // 是否启用广告过滤
    autoPlayNext: true,  // 默认启用自动连播功能
    adFilteringEnabled: true, // 默认开启分片广告过滤
    adFilteringStorage: 'adFilteringEnabled' // 存储广告过滤设置的键名
};

// 增加错误信息本地化
const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，服务器响应时间过长',
    API_ERROR: 'API接口返回错误，请尝试更换数据源',
    PLAYER_ERROR: '播放器加载失败，请尝试其他视频源',
    UNKNOWN_ERROR: '发生未知错误，请刷新页面重试'
};

// 添加进一步安全设置
const SECURITY_CONFIG = {
    enableXSSProtection: true,  // 是否启用XSS保护
    sanitizeUrls: true,         // 是否清理URL
    maxQueryLength: 100,        // 最大搜索长度
    allowedApiDomains: [        // 允许的API域名
        'heimuer.xyz',
        'ffzy5.tv'
    ]
};

// 添加多个自定义API源的配置
const CUSTOM_API_CONFIG = {
    separator: ',',           // 分隔符
    maxSources: 5,            // 最大允许的自定义源数量
    testTimeout: 5000,        // 测试超时时间(毫秒)
    namePrefix: 'Custom-',    // 自定义源名称前缀
    validateUrl: true,        // 验证URL格式
    cacheResults: true,       // 缓存测试结果
    cacheExpiry: 5184000000,  // 缓存过期时间(2个月)
    adultPropName: 'isAdult'  // 用于标记成人内容的属性名
};

// 新增隐藏内置黄色采集站API的变量，默认为true
const HIDE_BUILTIN_ADULT_APIS = true;
