<template>
  <div class="common-label" v-bind="$attrs">
    <div class="l">
      <span :class="{ line: line, point: !line }" :style="{ background: color ? color : '#3e9fff' }"></span>
      <span :class="{ lineValue: line, pointValue: !line }" :style="{ color: color ? color : '#333333' }">{{ value }}</span>
    </div>
    <div class="r" :style="{ color: color ? color : '#999999' }">{{ rightValue }}</div>
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, unref, ref } from 'vue';
import { throttle } from 'lodash';
export default defineComponent({
  inheritAttrs: false,
  props: {
    line: {
      type: Boolean,
      default: () => (true)
    },
    value: {
      type: String,
      default: () => ('')
    },
    rightValue: {
      type: String,
      default: () => ('')
    },
    color: {
      type: String,
      default: () => ('')
    },
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
.common-label {
  margin-top: rem(21);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .l {
    display: flex;
    align-items: center;

    .line {
      width: rem(3);
      height: rem(17);
      border-radius: 2px;
    }
    .point {
      width: rem(4);
      height: rem(4);
      border-radius: 50%;
    }
    .lineValue {
      margin-left: rem(7);
      font-size: rem(17);
      line-height: rem(17);
      font-family: SourceHanSansCN-Regular;
    }
    .pointValue {
      margin-left: rem(4);
      font-size: rem(14);
      line-height: rem(14);
      font-family: SourceHanSansCN-Normal;
    }
  }
  .r {
    font-size: rem(14);
    line-height: rem(14);
    font-family: SourceHanSansCN-Normal;
  }
}
</style>
