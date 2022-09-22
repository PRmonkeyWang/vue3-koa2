<template>
  <van-popup
    class="common-popup"
    :show="visible"
    v-bind="$attrs"
    :before-close="close"
  >
    <template v-if="context.slots['slot']">
      <slot name='slot' />
    </template>
    <template v-else>
      <div class="popup-wrapper">
        <div class="content-container">
          {{ $attrs.content }}
        </div>
        <div class="btn-container" v-if="$attrs.options">
          <div v-if="$attrs.options.cancel">
            <common-button
              type="default"
              class="btn-style colorB"
              @click="cancel"
            >
              {{ $attrs.options.cancel }}
            </common-button>
          </div>
          <div v-if="$attrs.options.confirm">
            <common-button
              class="btn-style"
              @click="confirm"
            >
              {{ $attrs.options.confirm }}
            </common-button>
          </div>
        </div>
      </div>
    </template>
  </van-popup>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup(props, context) {
    // console.log(props)
    const state = reactive({
      show: false
    });
    const close = () => {
      context.emit('update:visible', false);
    };
    const confirm = () => {
      context.emit('confirm');
    };
    const cancel = () => {
      context.emit('cancel');
      close();
    };
    return {
      ...toRefs(state),
      close,
      confirm,
      cancel,
      context
    };
  },
  emits: ['update:visible', 'confirm', 'cancel'],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
});
</script>
<style lang="scss">
.colorB {
  color: #000000
}
.common-popup {
  border-radius: rem(9);

  .popup-wrapper {
    width: rem(316);
    // height: rem(154);
    padding: rem(21) rem(16) rem(23);

    .content-container {
      font-size: rem(14);
      line-height: rem(19);
      font-weight: 600;
      color: #222D38;
    }
    .btn-container {
      margin-top: rem(16);
      display: flex;
      justify-content: space-between;

      & > div {
        width: rem(138);
      }
      & .btn-style {
        border-radius: rem(19);
        font-size: rem(12);
        white-space: nowrap;
      }
    }
  }
}
</style>
