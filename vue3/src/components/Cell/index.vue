<template>
  <van-cell class="common-cell" value="内容" v-bind="$attrs">
    <template #title>
      <span class="cell-title" v-if="context.slots['title']">
        <slot name="title"></slot>
      </span>
    </template>
    <template #icon>
      <span class="cell-title" v-if="context.slots['icon']">
        <slot name="icon"></slot>
      </span>
    </template>
    <template #value>
      <span class="cell-value" v-if="context.slots['value']">
        <slot name="value"></slot>
      </span>
    </template>
    <template #right-icon v-if="context.slots['right-icon']">
      <span class="cell-icon">
        <slot name="right-icon"></slot>
      </span>
    </template>
  </van-cell>
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
.common-cell {

  // .cell-title {
  //   font-size: rem(13);
  //   line-height: rem(22);
  //   color: #808080;
  // }
  // .cell-value {
  //   font-size: rem(16);
  //   line-height: rem(22);
  //   font-weight: 600;
  //   color: #333333;
  // }
  // .cell-icon {
  //   width: rem(19);
  //   height: rem(19);
  //   margin-left: rem(14);
  // }
}
</style>
