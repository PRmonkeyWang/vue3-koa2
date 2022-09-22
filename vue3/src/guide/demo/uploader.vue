<template>
  <div>
    <common-uploader :after-read="afterRead">
      <common-button>上传组件：可用你的样式</common-button>
    </common-uploader>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { Toast } from 'vant';

export default defineComponent({
  setup() {
    const methods = reactive({
      afterRead(e) {
        Toast('回调参数已经打印')
        console.log(e)
      }
    })
    return {
      ...toRefs(methods)
    }
  }
})
</script>
