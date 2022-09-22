<template>
  <div class="vip-wrapper">
    <common-label class="mt0" value="储值卡"></common-label>
    <div class="card-container">
      <div class="name">储值卡</div>
      <div class="date">开卡日期：2022-5-22</div>
      <div class="type">金卡</div>
      <div class="balance">
        <span>余额</span>
        <span>20,000.00</span>
      </div>
      <div class="increase">
        <span>增额</span>
        <span>1,000.00</span>
      </div>
    </div>
    <div class="list-container">
      <div class="item" v-for="(item, index) in 10" :key="index">
        <div class="t">
          <span>佣金收入:</span>
          <span>500.00</span>
        </div>
        <div class="b">
          2022-5-22 10:09:33
        </div>
      </div>
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
        router.push('/tradeRecord')
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
.mt0 {
  margin-top: rem(0)!important
}
.vip-wrapper {
  min-height: 100vh;
  padding: rem(23) rem(15) rem(20);
  background: #ffffff;

  .card-container {
    width: rem(345);
    height: rem(151);
    position: relative;
    margin: rem(14) auto 0;
    box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
    border-radius: rem(7);
    background: url(./vip.png) no-repeat center top/contain;
  
    & > div {
      position: absolute;
    }
    .name {
      left: rem(35);
      top: rem(13);
      font-size: rem(13);
      line-height: rem(13);
      font-family: SourceHanSansCN-Light;
      color: #632816;
    }
    .date {
      left: rem(207);
      top: rem(13);
      font-size: rem(13);
      line-height: rem(13);
      font-family: SourceHanSansCN-Light;
      color: #632816;
    }
    .type {
      left: rem(35);
      top: rem(42);
      font-size: rem(33);
      line-height: rem(33);
      font-family: SourceHanSansCN-Normal;
      color: #d8875b;
    }
    .balance {
      left: rem(34);
      top: rem(98);

      span:nth-of-type(1) {
        font-size: rem(16);
        line-height: rem(16);
        font-family: SourceHanSansCN-Medium;
        color: #632816;
      }
      span:nth-of-type(2) {
        font-size: rem(22);
        line-height: rem(22);
        font-family: SourceHanSansCN-Medium;
        color: #632816;
      }
    }
    .increase {
      left: rem(206);
      top: rem(98);

      span:nth-of-type(1) {
        font-size: rem(16);
        line-height: rem(16);
        font-family: SourceHanSansCN-Medium;
        color: #632816;
      }
      span:nth-of-type(2) {
        font-size: rem(22);
        line-height: rem(22);
        font-family: SourceHanSansCN-Medium;
        color: #632816;
      }
    }
  }
  .list-container {
    width: rem(315);
    min-height: rem(10);
    height: auto!important;
    margin: rem(11) auto 0;
    display: flex;
    flex-direction: column;
    background: #ffffff;
  
    .item {
      padding: rem(17) rem(5);
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
}
</style>