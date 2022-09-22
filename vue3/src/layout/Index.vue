<template>
  <div
    class="common-container"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <router-view
      v-slot="{Component}"
      v-if="keepAlive"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view
      v-slot="{Component}"
      v-else
    >
      <component :is="Component" />
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    const state: any = reactive({
      keepAlive: false
    });

    watch(
      () => route.path,
      () => {
        state.keepAlive = route.meta.keepAlive;
      }
    );
    const loading = computed(() => {
      return store.state.app.loading;
    });
    return {
      ...toRefs(state),
      loading
    };
  }
});
</script>
<style lang="scss" scoped>
//最大到1024手机端显示，电脑端剧中
.common-container {
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100vh;
}
</style>
