<template>
  <div class="account-wrapper">
    <div class="header-container">
      <common-label class="mt0" value="佣金账户" color="#ffffff" ></common-label>
      <div class="card">
        <div class="label">待发放:</div>
        <div class="amount">¥{{ proxy.$filters.money(form.grantNo, 2) }}</div>
        <div class="detail" @click="next">
          <span>明细</span>
          <span></span>
        </div>
        <div class="icon"></div>
        <div class="row-line"></div>
        <div class="total">
          <span class="label">总接单数:</span>
          <span class="number">{{ form.orderSum }}</span>
        </div>
        <div class="col-line"></div>
        <div class="history">
          <span class="label">累计收入:</span>
          <span class="number">¥{{ proxy.$filters.money(form.earningSum, 2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, unref, computed, watch, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElForm } from 'element-plus';
import { getDoctorAccount } from '@/apis/user';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const inputDom = ref(ElForm);
    const { proxy } = (getCurrentInstance() as any);

    const state = reactive({
      form: {
        doctorId: '',
        earningSum: '',
        grantNo: '',
        orderSum: ''
      }
    })

    const test = computed(() => {
      return true
    })

    const methods = reactive({
      async init() {
        const res: any = await getDoctorAccount({})
        if (res.code === 0) {
          state.form = res.data
        }
      },
      next() {
        router.push('/tradeRecord')
      }
    })

    onMounted(() => {
      methods.init()
    })

    return {
      ...toRefs(state),
      ...toRefs(methods),
      proxy
    }
  }
})
</script>

<style lang="scss" scoped>
.mt0 {
  margin-top: rem(0)!important
}
.account-wrapper {
  min-height: 100vh;
  padding-bottom: rem(21);
  background: #efefef;

  .header-container {
    width: rem(375);
    height: rem(123);
    padding: rem(24) rem(15) 0;
    background: #3e9fff;

    .card {
      width: rem(345);
      height: rem(195);
      position: relative;
      margin: rem(14) auto 0;
      display: flex;
      flex-direction: column;
      box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
      border-radius: rem(7);
      background: #ffffff;

      & > div {
        position: absolute;
      }
      & > .label {
        left: rem(30);
        top: rem(17);
        font-family: SourceHanSansCN-Normal;
        color: #666666;
      }
      .amount {
        left: rem(30);
        top: rem(46);
        font-size: rem(28);
        font-family: SourceHanSansCN-Regular;
        color: #198bfd;
      }
      .detail {
        left: rem(30);
        top: rem(83);
        display: flex;
        align-items: center;

        span:nth-of-type(1) {
          font-size: rem(14);
          line-height: rem(14);
          font-family: SourceHanSansCN-Normal;
          color: #666666;
        }
        span:nth-of-type(2) {
          width: rem(7);
          height: rem(13);
          margin-left: rem(5);
          background: url(./jtRight.png) no-repeat center top/contain;
        }
      }
      .icon {
        width: rem(57);
        height: rem(51);
        right: rem(15);
        top: rem(44);
        background: url(./icon.png) no-repeat center top/contain;
      }
      .row-line {
        width: rem(316);
        height: rem(2);
        left: rem(15);
        top: rem(114);
        background: #e6e6e6;
      }
      .total {
        left: rem(30);
        top: rem(133);
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .label {
          font-size: rem(14);
          line-height: rem(14);
          font-family: SourceHanSansCN-Normal;
          color: #666666;
        }
        .number {
          margin-top: rem(11);
          font-family: SourceHanSansCN-Medium;
          font-size: rem(21);
          line-height: rem(21);
          color: #333333;
        }
      }
      .col-line {
        width: rem(2);
        height: rem(68);
        left: rem(172);
        top: rem(120);
        background: #e6e6e6;
      }
      .history {
        left: rem(187);
        top: rem(133);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        
        .label {
          font-size: rem(14);
          line-height: rem(14);
          font-family: SourceHanSansCN-Normal;
          color: #666666;
        }
        .number {
          margin-top: rem(11);
          font-family: SourceHanSansCN-Medium;
          font-size: rem(21);
          line-height: rem(21);
          color: #333333;
        }
      }
    }
  }
}
</style>