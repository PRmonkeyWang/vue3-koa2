<template>
  <div class="auth-wrapper">

  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup () {
    
    const state = reactive({
    })

    const test = computed(() => {
      return true
    })

    const methods = reactive({

    })
    onMounted(async() => {
      interface test {
        <T extends object, K extends keyof T>(o: T, name: K): T[K] 
      }
      const obj = {
        a: 1,
        b: 'b'
      }
      let get: test = (o, name) => {
        return o[name]
      }

      console.log(get(obj, 'b'))
    })

    return {
      ...toRefs(state),
      ...toRefs(methods),
    }
  }
})
</script>
<style lang="scss" scoped>
  .auth-wrapper {
    font-size: rem(20);
    position: relative;
    min-height: 100vh;
    overflow: hidden;
  }
</style>

