function detectMacOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    const isMacOS = /Macintosh.*Mac OS X/i.test(userAgent);
    
    return isMacOS;
}

document$.subscribe(function() {
    // performance.navigation.type: 0 = 刷新/直接访问, 1 = 导航, 2 = 前进/后退
    const isRefresh = performance.navigation && performance.navigation.type === 1;
    
    // 刷新或首次访问时显示
    if (isRefresh) {
        const message = detectMacOS() 
            ? "🥰 欢迎光临本站！" 
            : "🤔 注意，本文档只适用于 Apple Silicon Mac";
        
        alert$.next(message);
    }
});
