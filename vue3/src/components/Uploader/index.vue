<template>
  <van-uploader
    v-bind="$attrs"
    class="common-uploader"
  >
    <slot />
  </van-uploader>
</template>
<script>
import { defineComponent } from 'vue';
import { Uploader as vanUploader } from 'vant'
export default defineComponent({
  components: {
    vanUploader
  }
})
</script>

<style lang="scss">
</style>
