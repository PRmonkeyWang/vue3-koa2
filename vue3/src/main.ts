import { createApp, Directive } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import { loadAllPlugins } from './plugins';
import '@/assets/iconfont/iconfont.css';
import '@/styles/index.scss';
import 'normalize.css';
import * as directives from '@/directives';
import components from '@/components';
import filters from './utils/filter';
const app = createApp(App);
// 加载所有插件
loadAllPlugins(app);

app.use(components);

app.config.globalProperties.$filters = filters

// 自定义指令
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

app
  .use(store)
  .use(router)
  .mount('#app');
