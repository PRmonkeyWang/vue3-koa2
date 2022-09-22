<template>
  <div class="pets-wrapper">
    <div class="header-container">
      <common-label class="mt0" value="顾客中心" color="#ffffff"></common-label>
      <div class="card">
        <div class="name">
          乐乐
        </div>
        <div class="b">
          <div class="ID">
            <div>
              <img src="./icon1.png" alt="" />
              <span>柯基犬</span>
            </div>
            <div>
              <img src="./icon1.png" alt="" />
              <span>公</span>
            </div>
            <div>
              <img src="./icon1.png" alt="" />
              <span>10KG</span>
            </div>
            <div>
              <img src="./icon1.png" alt="" />
              <span>2岁10个月</span>
            </div>
          </div>
          <div class="case">
            <div>
              <span></span>
              <span>是否绝育:</span>
              <span>是</span>
            </div>
            <div>
              <span></span>
              <span>是否免疫:</span>
              <span>是</span>
            </div>
            <div>
              <span></span>
              <span>是否驱虫:</span>
              <span>是</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="link-container">
      <div class="link" @click="next">
        <span>查看</span>
        <span></span>
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
        router.push('/health')
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
.pets-wrapper {
  min-height: 100vh;
  background: #efefef;

  .header-container {
    width: rem(375);
    height: rem(221);
    padding: rem(23) rem(15);
    position: relative;
    background: url(./bg.png) no-repeat center top/contain;

    .card {
      width: rem(345);
      height: rem(167);
      position: absolute;
      left: rem(15);
      top: rem(118);
      padding: rem(7) rem(15) rem(20);
      box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
      border-radius: rem(7);
      background: #ffffff;

      .name {
        width: rem(316);
        height: rem(74);
        font-size: rem(30);
        line-height: rem(74);
        font-family: SourceHanSansCN-Normal;
        text-align: center;
        border-bottom: rem(2) solid #e6e6e6;
        color: #666666;
      }
      .b {
        width: rem(315);
        height: rem(68);
        margin-top: rem(18);
        padding: 0 rem(4);
        display: flex;
        flex-direction: column;
        // background-color: #f2f9ff;
        border-radius: rem(7);
      
        .ID {
          display: flex;
          justify-content: space-between;
      
          & > div {
            display: flex;
      
            & > img {
              width: rem(16);
              height: rem(16)
            }
            & > span {
              margin-left: rem(5);
              font-size: rem(14);
              line-height: rem(16);
              color: #666666;
              font-family: SourceHanSansCN-Normal;
            }
          }
        }
        .case {
          margin-top: rem(17);
          display: flex;
          justify-content: space-between;
      
          & > div {
            display: flex;
            align-items: center;
      
            & > span:nth-of-type(1){
              width: rem(4);
              height: rem(4);
              background: #3e9fff;
            }
            & > span:nth-of-type(2){
              margin-left: rem(3);
              font-size: rem(14);
              line-height: rem(14);
              font-family: SourceHanSansCN-Normal;
              color: #999999;
            }
            & > span:nth-of-type(3){
              margin-left: rem(5);
              font-size: rem(14);
              line-height: rem(14);
              font-family: SourceHanSansCN-Normal;
              color: #999999;
            }
          }
        }
      }
    }
  }
  .link-container {
    width: rem(345);
    height: rem(135);
    margin: rem(81) auto;
    box-shadow: 0px 0px 8px 2px rgba(204, 204, 204, 0.15);
    border-radius: rem(7);
    position: relative;
    background: #ffffff;

    .link {
      width: rem(40);
      height: rem(14);
      position: absolute;
      left: rem(24);
      top: rem(57);
      display: flex;
      align-items: center;
    
      span:nth-of-type(1) {
        font-size: rem(14);
        line-height: rem(14);
        font-family: SourceHanSansCN-Regular;
        color: #333333;
      }
      span:nth-of-type(2) {
        width: rem(7);
        height: rem(13);
        margin-top: rem(1);
        margin-left: rem(5);
        background: url(./jtRight.png) no-repeat center top/contain;
      }
    }
  }
}
</style>