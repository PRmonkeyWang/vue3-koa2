<template>
  <div class="guide">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="guide-item"
    >
      <div class="title">
        组件{{ index }}:
      </div>
      <component :is="index" />
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'

const mergemModules = (() => {
  const modulesFiles = require.context('./demo', true, /\.vue$/)
  return modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = 'common' + modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
})()

export default defineComponent({
  components: {
    ...mergemModules
  },
  setup () {
    const state = reactive({
      list: mergemModules
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
  .guide{
    padding: rem(20);
    .title{
      margin: rem(10) 0;
    }
    .guide-item{
      margin-bottom: rem(20);
    }
  }
</style>
