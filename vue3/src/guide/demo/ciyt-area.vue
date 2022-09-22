<template>
  <div>
    <div class="mt-10">
      <common-city-area
        v-model:visable="visable"
        value="310101"
        @confirm="confirm"
      >
        <common-button @click="open">
          省市区下拉 默认选择上海
        </common-button>
      </common-city-area>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      visable: false
    })

    const methods = reactive({
      open() {
        state.visable = true
      },
      confirm(e) {
        console.log(e)
      }
    })

    return {
      ...toRefs(state),
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
