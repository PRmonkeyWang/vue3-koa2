<template>
  <div>
    <div class="mt-10">
      <common-button @click="demo">
        默认
      </common-button>
    </div>
    <div class="mt-10">
      <common-button disabled>
        禁用
      </common-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const methods = reactive({
      demo(e) {
        console.log(e)
      }
    })
    return {
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss" scoped>
  .mt-10{
    margin-bottom: 10px;
  }
</style>
