<template>
  <div class="common-buka" v-bind="$attrs">
    <span>{{value}}</span>
    <van-icon class="icon" name="arrow-down" />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, unref, ref } from 'vue';
import { throttle } from 'lodash';
export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
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
.common-buka {
  width: rem(80);
  margin: 0 auto;
  padding: rem(6) rem(9) rem(6) rem(13);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: rem(14);
  background: #EBEBEB;

  & > span {
    font-size: rem(15);
    line-height: rem(18);
    font-family: Helvetica;
    color: #666666;
  }
  & > .icon {
    font-size: rem(9);
  }
}
</style>
