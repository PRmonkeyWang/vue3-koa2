import { useStore } from '@/store'
import { watch } from 'vue'
export default function () {
  const store = useStore()
  const watchLanguage = (cb: Function) => {
    watch(() => store.state.app.language, () => {
      cb && cb();
    })
  }

  return {
    watchLanguage
  }
}
