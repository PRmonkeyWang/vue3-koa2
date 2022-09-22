<template>
  <div class="common-notice" v-bind="$attrs">
    <div class="left" v-if="context.slots['icon'] || context.slots['text']">
      <span>
        <slot name="icon"></slot>
      </span>
      <span>
        <slot name="text"></slot>
      </span>
    </div>
    <div class="right" v-if="context.slots['right-icon']">
      <slot name="right-icon"></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, unref, ref } from 'vue';
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
      ...toRefs(methods),
      context
    }
  }
})
</script>

<style lang="scss">
.common-notice {
  width: 100%;
  padding: rem(8) rem(10);
  background: #E4FFC8;
  display: flex;
  justify-content: space-between;

  & > .left {
    display: flex;

    & > span:nth-last-of-type(1) {
      margin-left: rem(4)
    }
  }
  & > .right {
    display: flex;
    align-items: center;
  }
}
</style>
