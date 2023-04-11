// 关怀模式 Android
(function () {
    if (typeof WeixinJSBridge == 'object' && typeof window.WeixinJSBridge.invoke == 'function') {
      handleFontSize();
    } else {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', handleFontSize);
        document.attachEvent('onWeixinJSBridgeReady', handleFontSize);
      }
    }
  
    function handleFontSize() {
      // 设置网页字体为默认大小
      window.WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 });
      // 重写设置网页字体大小的事件
      window.WeixinJSBridge.on('menu:setfont', function () {
        window.WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 });
      });
    }
  })();