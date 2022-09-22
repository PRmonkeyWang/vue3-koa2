import { ElLoading, ElDescriptions, ElDescriptionsItem } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';
import 'element-plus/packages/theme-chalk/src/loading.scss';
import 'element-plus/packages/theme-chalk/src/descriptions.scss';
import 'element-plus/packages/theme-chalk/src/descriptions-item.scss';

export default function loadComponent(app: any) {
  const plugins = [
    ElLoading,
    ElDescriptions,
    ElDescriptionsItem
  ]

  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
