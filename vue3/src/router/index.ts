import { getToken } from '@/utils/cookies'
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // NProgress Configuration

import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

import roleManager from './manager' // progress bar style
import { store } from '../store/index';
NProgress.configure({ showSpinner: false });

export const constantRoutes: Array<RouteRecordRaw> = [
  ...roleManager()
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// 本地环境才有案例页面
export function normlizeRouter() {
  [
    {
      path: '/guide',
      component: () => import('@/guide/index.vue')
    }
  ].forEach(element => {
    router.addRoute(element)
  });
}

if (process.env.NODE_ENV !== 'production') {
  normlizeRouter()
}

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 设置title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // 没登录情况跳转登录
  if (to.path !== '/login') {
    console.log(111, to, from)
    if (getToken()) {
      if (to.path === '/') {
        next('/treatOL')
      } else {
        next()
      }
    } else {
      to.meta.login ? next(`/login?redirect_url=${encodeURIComponent(to.fullPath)}`) : next()
    }
  } else {
    next()
  }

  NProgress.done();
});

router.afterEach(async (to) => {
  store.commit('url/SETURLSTORAGE', to.query)
})

export default router
