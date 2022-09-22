import { useStore } from '@/store'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
const store = useStore()
const WIDTH = 1024 // refer to Bootstrap's responsive design

export default function () {
  const device = computed(() => {
    return store.state.app.device
  })

  const currentRoute = useRoute()

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const watchRouter = watch(() => currentRoute, () => {
    if (isMobile() && store.state.app.silderStatus) {
      store.commit('app/SET_ISCOLLAPSE', false)
    }
  })

  const resizeMounted = () => {
    if (isMobile()) {
      store.commit('app/SETDEVICE', 'mobile')
    } else {
      store.commit('app/SETDEVICE', 'pc')
    }
  }

  const resizeHandler = () => {
    if (isMobile()) {
      store.commit('app/SETDEVICE', 'mobile')
    } else {
      store.commit('app/SETDEVICE', 'pc')
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    device,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter
  }
}
