<template>
  <div class="login-wrapper">
    <div class="header-container">
      <div class="text">欢迎光临宠医平台</div>
    </div>
    <!-- <div class="form-container">
    </div> -->
    <van-form class="form-container" @submit="onSubmit">
      <van-field
        class="input-item"
        v-model="form.phone"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
       <template #left-icon>
         <img class="input-icon" src="./user.png" alt="" />
       </template> 
      </van-field>
      <van-field
        class="input-item"
        v-model="form.password"
        type="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <template #left-icon>
          <img class="input-icon" src="./password.png" alt="" />
        </template> 
      </van-field>
      <div class="input-btn">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, unref, computed, watch } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElForm } from 'element-plus';
import { loginRequest } from '@/apis/user';
import { setToken } from '@/utils/cookies';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const inputDom = ref(ElForm);

    const state = reactive({
      form: {
        phone: '',
        // phone: '18799999999',
        password: '',
        tenantId: '1000001',
        loginType: '0'
      }
    })

    const test = computed(() => {
      return true
    })

    const methods = reactive({
      async onSubmit() {
        const res: any = await loginRequest({
          ...state.form
        });
        if (res.code === 0) {
          setToken(res.data)
          const next_url: any = route.query?.redirect_url ? decodeURIComponent(route.query?.redirect_url as any) : ''
          router.push({
            path: next_url || '/treatOL'
          })
        }
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
.login-wrapper {
  min-height: 100vh;
  padding-top: rem(32);

  .header-container {
    width: rem(375);
    height: rem(287);
    position: relative;
    background: url(./bg.png) no-repeat center top/contain;

    .text {
      width: 100%;
      position: absolute;
      left: 0;
      top: rem(9);
      font-size: rem(23);
      text-align: center;
      color: #6ebdd9;
    }
  }
  .form-container {
    width: rem(231);
    margin: rem(48) auto 0;

    .input-item {
      padding: rem(9)!important;
      border-bottom: rem(1) solid #bababa;

      &+.input-item {
        margin-top: rem(20);
      }
      .input-icon {
        width: rem(21);
        height: rem(21);
      }
    }
    .input-btn {
      margin-top: rem(30);
    }
  }
}
</style>