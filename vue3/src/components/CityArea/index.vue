<template>
  <div>
    <slot />
    <van-overlay
      :show="visable"
      @click="close"
    >
      <div
        class="wrapper"
        @click.stop
      >
        <van-area
          :area-list="areaList"
          v-bind="$attrs"
          @confirm="confirm"
          @cancel="cancel"
        />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, nextTick, watch } from 'vue';
import { Area as vanArea, Overlay as vanOverlay } from 'vant';
import { addressList } from '@/apis/app';
import { getCityArea, setCityArea } from '@/utils/cookies'
import { flattenByKey } from '@/utils'

export default defineComponent({
  components: {
    vanArea,
    vanOverlay
  },
  emits: ['update:visable', 'confirm'],
  props: {
    visable: {
      type: Boolean,
      default: () => (false)
    },
    closeFromWrap: {
      type: Boolean,
      default: () => (true)
    }
  },
  setup (props, ctx) {
    const state = reactive({
      visable: false,
      areaList: {
        province_list: {

        },
        city_list: {

        },
        county_list: {

        }
      }
    });

    watch(() => props.visable, (v) => {
      state.visable = v
    })

    const methods = reactive({
      close () {
        if (props.closeFromWrap) {
          ctx.emit('update:visable', false)
        }
      },
      confirm (e) {
        ctx.emit('confirm', e)
        ctx.emit('update:visable', false)
      },
      cancel () {
        ctx.emit('update:visable', false)
      },
      async init () {
        let res;
        if (getCityArea()) {
          res = getCityArea()
        } else {
          res = await addressList();
          setCityArea(res)
        }

        const list = flattenByKey(res?.response?.districts, 'districts');
        list && list.map(item => {
          switch (item.level) {
            case 'province':
              state.areaList.province_list[`${item.adcode}`] = item.name
              break;
            case 'city':
              state.areaList.city_list[`${item.adcode}`] = item.name
              break;
            case 'district':
              state.areaList.county_list[`${item.adcode}`] = item.name
              break;
            default:
              break;
          }
        })
      }
    })

    onMounted(() => {
      nextTick(() => {
        methods.init();
      })
    })

    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss">
.van-overlay {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  .wrapper {
    width: 100%;
  }
}

.van-area {
  .van-picker__confirm {
    color: #1d89ff;
  }
}
</style>
