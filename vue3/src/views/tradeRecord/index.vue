<template>
  <div class="trade-wrapper">
    <div class="header-container">
      <common-label class="mt0" value="交易记录" color="#ffffff" ></common-label>
    </div>
    <div class="card">
      <van-skeleton title :row="2" :loading="loading" />
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="t">
          <span>{{ item.actionType }}:</span>
          <span :class="{blue: item.actionType === '佣金收入', org: item.actionType !== '佣金收入'}">{{ item.actionType === '佣金收入' ? '+' : '-' }}{{ proxy.$filters.money(item.balance, 2) }}</span>
          <!-- item.balance -->
        </div>
        <div class="b">
          {{ item.createTime }}
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
import { listAccountDetail } from '@/apis/user';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const inputDom = ref(ElForm);
    const { proxy } = (getCurrentInstance() as any);

    const state = reactive({
      loading: true,
      list: []
    })

    const test = computed(() => {
      return true
    })

    const methods = reactive({
      async init() {
        const res: any = await listAccountDetail({})
        if (res.code === 0) {
          state.list = res.data
          state.loading = false;
        }
      },
      next() {
        router.push('/treatDetail')
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
    min-height: rem(100);
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
  
        .blue {
          color: #198bfd;
        }
        .org {
          color: #ff7a0e;
        }
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