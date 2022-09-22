<template>
  <van-button
    type="primary"
    v-bind="$attrs"
    class="common-button"
    @click="triggle"
  >
    <slot />
  </van-button>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { throttle } from 'lodash';
export default defineComponent({
  inheritAttrs: false,
  props: {
    throttleTime: {
      type: Number,
      default: () => (500)
    }
  },
  emits: ['click'],
  setup (props, context) {
    const methods = reactive({
      triggle: throttle(function (e) {
        context.emit('click', e)
      }, props.throttleTime)
    })
    return {
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss">
.common-button {
  width: 100%;
  background: #284EFF;
  border-radius: rem(5);
  height: rem(38);
  line-height: rem(38);
  font-weight: 500;
  color: #ffffff;
  font-size: rem(16);
  &.van-button--disabled {
    background: #dddddd;
    opacity: 1;
    border: #dddddd;
  }
}
</style>
