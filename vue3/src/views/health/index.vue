<template>
  <div class="health-wrapper">
    <div class="header-container">
      <div class="card">
      </div>
    </div>
    <div class="t-container">
      <common-label value="静态指标" rightValue="最后更新日：2022-5-21"></common-label>
      <div class="content">
        <div class="item" v-for="(item, index) in 10" :key="index">
          <span>宠物编号</span>
          <span>:</span>
          <span>IP0009</span>
        </div>
      </div>
    </div>
    <div class="t-container">
      <common-label value="静态指标" rightValue="最后更新日：2022-5-21"></common-label>
      <common-label class="mt14" :line="false" value="诊疗日期：2022-5-21"></common-label>
      <table class="table mt14" border>
        <tr>
          <th v-for="(item, index) in list_h" :key="index">{{item}}</th>
        </tr>
        <tr>
          <td v-for="(item, index) in list_d" :key="index">{{item}}</td>
        </tr>
      </table>
      <common-label class="mt17" :line="false" value="诊疗日期：2022-5-20"></common-label>
      <table class="table mt14" border>
        <tr>
          <th v-for="(item, index) in list_h" :key="index">{{item}}</th>
        </tr>
        <tr>
          <td v-for="(item, index) in list_d" :key="index">{{item}}</td>
        </tr>
      </table>
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
      list_h: ['器官', '疾病名称', '器官', '医嘱'],
      list_d: ['前腿', '骨折', '前腿粉碎性骨折', '静养，不要运动']
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
.mt14 {
  margin-top: rem(14)!important
}
.mt17 {
  margin-top: rem(17)!important
}
.health-wrapper {
  min-height: 100vh;
  padding-bottom: rem(21);
  background: #efefef;

  .header-container {
    width: rem(375);
    height: rem(123);
    padding: rem(23) rem(15) 0;
    background: #3e9fff;

    .card {
      width: rem(345);
      height: rem(135);
      margin: 0 auto;
      box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
      border-radius: rem(7);
      background: #ffffff;
    }
  }
  .t-container {
    width: rem(345);
    min-height: rem(10);
    height: auto!important;
    overflow: hidden;
    margin: rem(52) auto 0;
    padding: 0 rem(14);
    box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
    border-radius: rem(7);
    background: #ffffff;

    &+.t-container {
      margin-top: rem(17);
      padding-bottom: rem(28);
    }
    .content {
      width: rem(317);
      min-height: rem(10);
      height: auto!important;
      margin-top: rem(19);
      padding-bottom: rem(33);
      display: flex;
      flex-wrap: wrap;

      & > .item {
        width: rem(158.5);
        height: rem(14);
        margin-top: rem(13);
        display: flex;
        justify-content: center;

        & > span {
          font-size: rem(14);
          line-height: rem(14);
          font-family: SourceHanSansCN-Normal;
          color: #666666;
        }
      }
    }
    .table {
      border-collapse: collapse;
      border-color: #b0cbe3;

      tr {

        th,td {
          font-family: SourceHanSansCN-Normal;
          font-size: rem(14);
          line-height: rem(14);
          color: #666666;
        }
        th {
          padding: rem(9) rem(8) rem(10);
          word-break: keep-all;
          word-wrap:break-word;
          background: #e8f3ff;
        }
        td {
          padding: rem(23) rem(8) rem(24);
        }
      }
    }
  }
}
</style>