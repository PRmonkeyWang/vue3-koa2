<template>
  <div class="trade-wrapper">
    <div class="header-container">
      <common-label class="mt0" value="消费记录" color="#ffffff" ></common-label>
    </div>
    <div class="card" v-if="false">
      <div class="item" v-for="(item, index) in 10" :key="index">
        <div class="t">
          <span>洗澡:</span>
          <span>500.00</span>
        </div>
        <div class="b">
          2022-5-22 10:09:33
        </div>
      </div>
    </div>
    <div class="empty" v-else>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, unref, computed, watch } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElForm } from 'element-plus';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const inputDom = ref(ElForm);

    const state = reactive({
    })

    const test = computed(() => {
      return true
    })

    const methods = reactive({
      next() {
        router.push('/treatDetail')
      }
    })

    onMounted(() => {
    })

    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss" scoped>
.cBlue {
  color: #198bfd;
}
.cOrange {
  color: #ff7a0e;
}
.mt0 {
  margin-top: rem(0)!important
}
.trade-wrapper {
  min-height: 100vh;
  height: auto!important;
  padding-bottom: rem(21);
  background: #efefef;

  .header-container {
    width: rem(375);
    height: rem(123);
    padding: rem(24) rem(15) 0;
    background: #3e9fff;
  }
  .card {
    width: rem(345);
    min-height: rem(10);
    height: auto!important;
    // margin: rem(14) auto 0;
    margin: rem(-69) auto 0;
    padding: rem(3) rem(20) rem(9);
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
    border-radius: rem(7);
    background: #ffffff;
  
    .item {
      padding: rem(16) 0;
      display: flex;
      flex-direction: column;
  
      &+.item {
        border-top: solid 1px #e6e6e6;
      }
      .t {
        display: flex;
        justify-content: space-between;
  
        span {
          font-size: rem(17);
          line-height: rem(17);
          font-family: SourceHanSansCN-Normal;
          color: #666666;
        }
      }
      .b {
        margin-top: rem(13);
        font-size: rem(14);
        line-height: rem(14);
        font-family: SourceHanSansCN-Normal;
        color: #666666;
      }
    }
  }
  .empty {
    width: rem(205);
    height: rem(138);
    margin: rem(156) auto;
    background: #ffffff;
  }
}
</style>