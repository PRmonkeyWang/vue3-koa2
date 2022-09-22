import { useStore } from '@/store'
import { Directive } from 'vue'
import { flattenByKey } from '@/utils'

const getPermisson = (role: string, path: string, arr: any[]) => {
  if (!arr.length || !role || !path) {
    console.error('menu 不存在 或role,path不存在')
    return
  }
  let permission = false;
  const menu = flattenByKey(arr, 'child');
  const url = path.includes('/edit') ? path.split('/edit')[0] : path
  menu.forEach(element => {
    if (element.menu_url === role && element.type === '3') {
      const parent = menu.find(n => element.parent_id === n.id)
      if (parent && parent.menu_url === url) {
        permission = true
      }
    }
  })

  return permission;
}

export const permission: Directive = {
  mounted(el, binding: any) {
    const { value } = binding;
    const path = location.pathname;
    const user = useStore().state.user.userInfo
    if (user && user.menu) {
      const { menu } = user;
      const data = getPermisson(value, path, menu);
      if (!data) {
        el.style.display = 'none'
      }
    }
  }
}
