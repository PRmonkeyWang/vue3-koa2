export default function loadComponent() {
  (function(doc, win) {
    if (doc && win) {
      const docEl = doc.documentElement;
      const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      // 设计稿 2个终端的宽高，需根据具体
      const mobDesign = 375;
      const pcDesign = 1440;
      const recalc = function() {
        const clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // myWidth 设计稿width/20
        const myWidth = clientWidth > 1024 ? pcDesign : mobDesign;
        let size = clientWidth / myWidth * 100;
        if (clientWidth > 1920) {
          size = 1920 / myWidth;
        }

        docEl.style.setProperty('font-size', size + 'px', 'important');
        console.log(docEl.style.fontSize, 'em= =====');
      };
      if (!doc.addEventListener) return;
      recalc();
      win.addEventListener(resizeEvt, recalc, false);
    }
  })(document, window);
}
