import { isIos } from '.';

declare const WebViewJavascriptBridge: any
interface WINDOW{
  WebViewJavascriptBridge: any
  WVJBCallbacks: any
}
declare const window: WINDOW

// https://github.com/marcuswestin/WebViewJavascriptBridge
class WebViewJsBridge {
  // js 调用 native方法
  invoke(fnName: any, params: any) {
    return new Promise(resolve => {
      const handler = (bridge: any) => bridge.callHandler(fnName, params, (res: any) => resolve(res));
      if (window.WebViewJavascriptBridge) {
        handler(WebViewJavascriptBridge);
      } else {
        this.setUpWbJsBrige((bridge: any) => handler(bridge));
      }
    });
  }

  // 注册js事件 native调用
  register(fnName: any, callback: any) {
    const handler = (bridge: any) => {
      bridge.registerHandler(fnName, () => {
        alert('native 调用成功');
        callback();
      });
    };
    if (window.WebViewJavascriptBridge) {
      handler(WebViewJavascriptBridge);
    } else {
      this.setUpWbJsBrige((bridge: any) => handler(bridge));
    }
  }

  // 建立JsBridge链接
  setUpWbJsBrige(callback: any) {
    // 测试代码 del!!!!!
    // window.WebViewJavascriptBridge = {};
    // return;
    if (!isIos()) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function() {
            callback(WebViewJavascriptBridge);
          },
          false
        );
      }
    } else {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      const WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    }
  }
}

export default WebViewJsBridge;
