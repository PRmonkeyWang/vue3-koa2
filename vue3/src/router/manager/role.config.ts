const route = [
  //  首页
  {
    path: '/',
    component: () => import('@/views/index/index.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/treatOL',
    component: () => import('@/views/treatOL/index.vue'),
    meta: {
      title: '远程辅助诊疗',
      login: true
    }
  },
  {
    path: '/treatDetail',
    component: () => import('@/views/treatDetail/index.vue'),
    meta: {
      title: '远程辅助诊疗详情',
      login: true
    }
  },
  {
    path: '/account',
    component: () => import('@/views/account/index.vue'),
    meta: {
      title: '佣金账户',
      login: true
    }
  },
  {
    path: '/tradeRecord',
    component: () => import('@/views/tradeRecord/index.vue'),
    meta: {
      title: '交易记录',
      login: true
    }
  },
  {
    path: '/customerCenter',
    component: () => import('@/views/customerCenter/index.vue'),
    meta: {
      title: '顾客中心',
      login: true
    }
  },
  {
    path: '/myPets',
    component: () => import('@/views/myPets/index.vue'),
    meta: {
      title: '我的宠物',
      login: true
    },
  },
  {
    path: '/health',
    component: () => import('@/views/health/index.vue'),
    meta: {
      title: '健康档案',
      login: true
    },
  },
  {
    path: '/vip',
    component: () => import('@/views/vip/index.vue'),
    meta: {
      title: '储值卡',
      login: true
    }
  },
  {
    path: '/consumeRecord',
    component: () => import('@/views/consumeRecord/index.vue'),
    meta: {
      title: '消费记录',
      login: true
    }
  },
  {
    path: '/caseDetail',
    component: () => import('@/views/caseDetail/index.vue'),
    meta: {
      title: '病例',
      login: true
    }
  },
]

export default () => {
  return route
}
