import { RouteRecordRaw } from 'vue-router'
import Config from './role.config';

export default () => {
  const AccountRouter: Array<RouteRecordRaw> = [
    ...Config()
  ]
  return AccountRouter
}
