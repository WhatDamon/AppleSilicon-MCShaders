function detectMacOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    const isMacOS = /Macintosh.*Mac OS X 10[._]15/i.test(userAgent);
    
    return isMacOS;
}

function showNotice(message, bgColor, autoClose = false) {
    if (document.getElementById('os-notice')) return;

    const notice = document.createElement('div');
    notice.id = 'os-notice';
    const background = bgColor === 'yellow' ? '#f8a100ff' : '#40a23e';
    const textColor = bgColor === 'yellow' ? 'black' : 'white';

    notice.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 80%;
        background-color: ${background};
        color: ${textColor};
        padding: 10px 15px;
        border-radius: 3px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: default;
        transition: opacity 0.5s ease;
        opacity: 1;
    `;

    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    notice.appendChild(textSpan);

    if (!autoClose) {
        const closeBtn = document.createElement('span');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = `
            margin-left: 15px;
            font-weight: bold;
            cursor: pointer;
            padding: 0 5px;
            line-height: 1;
        `;

        const closeNotice = () => {
            notice.style.opacity = '0';
            setTimeout(() => {
                if (notice.parentNode) {
                    document.body.removeChild(notice);
                }
            }, 500);
        };

        closeBtn.addEventListener('click', closeNotice);
        notice.appendChild(closeBtn);
    }

    document.body.appendChild(notice);

    if (autoClose) {
        setTimeout(() => {
            notice.style.opacity = '0';
            setTimeout(() => {
                if (notice.parentNode) {
                    document.body.removeChild(notice);
                }
            }, 500);
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (detectMacOS()) {
        showNotice('🥰 欢迎光临本站！', 'green', true);
    } else {
        showNotice('🤔 注意，本文档只适用于 Apple Silicon Mac', 'yellow', false);
    }
});