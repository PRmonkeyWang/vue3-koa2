import JsBrige from './webViewJsBridge';
import { isIos } from '@/utils';

class JsSdk extends JsBrige {
  birdge = null;

  init() {
    this.setUpWbJsBrige((wbBirdge: any) => (this.birdge = wbBirdge));
  }

  getParams(params: any) {
    if (!isIos()) {
      // 安卓参数序列化
      params = JSON.stringify(params);
    }
    return params;
  }

  async action(actionType: any, params: any) {
    params = { ...params, action: actionType };
    params = this.getParams(params);
    console.log('------- 传给app的参数 ------', params);
    const res = await this.invoke('actionRequest', params);
    console.log('------- app返回的参数 ------', res);
    return this.sendRes(res);
  }

  sendRes(res: any) {
    if (typeof res === 'string') {
      res = JSON.parse(res);
    }
    return res;
  }

  /**
   * native上报通讯录
   *  */
  reportContacts (params: any) {
    return this.action('UPLOAD_CONTACTS', params);
  }
}

export default new JsSdk();
