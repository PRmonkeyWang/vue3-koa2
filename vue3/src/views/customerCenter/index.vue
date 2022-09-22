<template>
  <div class="center-wrapper">
    <common-label class="mt0" value="顾客中心"></common-label>
    <div class="header-container">
      <div class="headIcon"></div>
    </div>
    <div class="pets-container">
      <div class="title">我的宠物:</div>
      <div class="cardBox">
        <div class="swiperBox">
          <div class="swiper">
            <div class="item" v-for="item in 5" :key="item" @click="next('myPets')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="vip-container">
      <div class="title">我的会员卡:</div>
      <div class="cardBox">
        <div class="swiperBox">
          <div class="swiper">
            <div class="item" v-for="item in 5" :key="item" @click="next('vip')"></div>
          </div>
        </div>
      </div>
      <div class="detail" @click="next('consumeRecord')">
        <span>查看我的消费记录</span>
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
      next(path: any) {
        router.push(`/${path}`)
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
.center-wrapper {
  min-height: 100vh;
  padding: rem(24) rem(15);
  background: #efefef;

  .header-container {
    width: rem(345);
    height: rem(123);
    margin-top: rem(48);
    position: relative;
    background: url(./bg.png) no-repeat center top/contain;

    .headIcon {
      width: rem(75);
      height: rem(75);
      position: absolute;
      left: 50%;
      top: rem(-30);
      transform: translate(-50%);
      background: url(./headIcon.png) no-repeat center top/contain;
    }
  }
  .pets-container {
    width: rem(345);
    height: rem(135);
    margin-top: rem(17);
    box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
    border-radius: rem(7);
    position: relative;
    background: #ffffff;

    .title {
      height: rem(16);
      position: absolute;
      left: rem(13);
      top: rem(12);
      font-size: rem(16);
      line-height: rem(16);
      font-family: SourceHanSansCN-Regular;
      color: #333333;
    }
    .cardBox {
      width: rem(345);
      height: rem(80);
      position: absolute;
      left: 0;
      top: rem(40);
      overflow: hidden;

      .swiperBox {
        width: rem(345);
        height: rem(90);
        position: absolute;
        left: 0;
        top: 0;
        overflow: auto;

        .swiper {
          min-width: rem(100);
          width: auto;
          height: rem(83);
          position: absolute;
          left: rem(14);
          top: rem(0);
          display: flex;

          .item {
            width: rem(80);
            height: rem(80);
            background: #eeeeee;
            margin-right: rem(17);
          }
        }
      }
    }
  }
  .vip-container {
    width: rem(345);
    height: rem(174);
    margin-top: rem(17);
    box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
    border-radius: rem(7);
    position: relative;
    background: #ffffff;
    
    .title {
      height: rem(16);
      position: absolute;
      left: rem(13);
      top: rem(12);
      font-size: rem(16);
      line-height: rem(16);
      font-family: SourceHanSansCN-Regular;
      color: #333333;
    }
    .cardBox {
      width: rem(345);
      height: rem(80);
      position: absolute;
      left: 0;
      top: rem(40);
      overflow: hidden;
    
      .swiperBox {
        width: rem(345);
        height: rem(90);
        position: absolute;
        left: 0;
        top: 0;
        overflow: auto;
    
        .swiper {
          min-width: rem(100);
          width: auto;
          height: rem(83);
          position: absolute;
          left: rem(14);
          top: rem(0);
          display: flex;
    
          .item {
            width: rem(180);
            height: rem(83);
            background: #eeeeee;
            margin-right: rem(15);
          }
        }
      }
    }
    .detail {
      width: rem(150);
      height: rem(16);
      position: absolute;
      left: rem(13);
      top: rem(141);
      display: flex;
      align-items: center;
    
      span:nth-of-type(1) {
        font-size: rem(16);
        line-height: rem(16);
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