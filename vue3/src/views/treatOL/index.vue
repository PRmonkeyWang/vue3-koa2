<template>
  <div class="treatOL-wrapper">
    <div class="header-container">
      <div class="card">
        <div class="label">
          <img class="icon" src="./icon.png" alt="" />
          <div class="text">
            <span>我可以接单</span>
            <span>开启时正常接单，关闭时暂不接单</span>
          </div>
        </div>
        <van-switch class="switch" :model-value="form.checked" size="20" @update:model-value="onUpdateValue" />
      </div>
      <van-tabs class="nav" v-model:active="active" shrink background="#3e9fff" color="#ffffff" title-active-color="#ffffff" title-inactive-color="#ffffff">
        <van-tab class="tab-container" v-for="(item, index) in stateList" :title="item">
          <van-pull-refresh v-model="freshLoading" @refresh="onRefresh" style="min-height: 100%">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              :offset="10"
              finished-text="没有更多了"
              @load="init()"
              :immediate-check="false"
            >
              <div class="cell-item" v-for="(innerItem, innerIndex) in cellList" :key="innerIndex">
                <img class="img" :src="innerItem.petMemberRegVo.petPic" alt="" />
                <div class="intro">
                  <div class="st-1">
                    <span class="time" v-if="true">{{ innerItem.createTime }}</span>
                    <span class="name" v-else>{{ innerItem.petMemberRegVo.breed1Name }}</span>
                    <span class="tag" v-if="false">{{ innerItem.statusStr }}</span>
                    <div class="rt" v-else>
                      <span class="btns" v-if="innerItem.status === 0" @click="sure(innerItem)">确定</span>
                      <span class="btn" v-if="innerItem.status !== 0" @click="next(innerItem)">查看</span>
                      <span class="iconRt" v-if="innerItem.status !== 0"></span>
                    </div>
                  </div>
                  <div class="nd-2">
                    <div class="lt">
                      <span class="name" v-if="true">{{ innerItem.petMemberRegVo.breed1Name }}</span>
                      <!-- <span class="label">前腿骨折</span> -->
                    </div>
                    <div class="rt" v-if="false">
                      <span class="btns" v-if="innerItem.status === 0" @click="sure(innerItem)">确定</span>
                      <span class="btn" v-if="innerItem.status !== 0" @click="next(innerItem)">查看</span>
                      <span class="iconRt" v-if="innerItem.status !== 0"></span>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="rd-3">
                    <span></span>
                    <span>{{ innerItem.storeName }}</span>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, unref, computed, watch } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElForm } from 'element-plus';
import { listByStatus, catchClinic, getOrderStatus, updateOrderStatus } from '@/apis/user';
import { Toast } from 'vant';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const inputDom = ref(ElForm);

    const state = reactive({
      active: 0,
      stateList: ['未完成', '已完成', '已取消'],
      freshLoading: false,
      loading: false,
      finished: false,
      form: {
        checked: false
      },
      pageForm: {
        pageNum: 0,
        pageSize: 10
      },
      cellList: [] as any
    })

    const test = computed(() => {
      return true
    })

    watch(() => state.active, (status: any) => {
      methods.init('clear');
    })
    const methods = reactive({
      init(init?: any) {
        return new Promise(async (resolve: any, reject: any) => {
          console.log('到达底部', state.loading)
          if (init) {
            state.pageForm.pageNum = 0
            state.cellList = [];
          }
          const { pageNum, pageSize } = state.pageForm;
          try {
            const res:any = await listByStatus({
              status: state.active,
              pageNum,
              pageSize
            })
            if (res.code === 200) {
              console.log(111, res.rows)
              state.cellList = [
                ...state.cellList,
                ...res.rows
              ]
              state.pageForm.pageNum += 1
              state.loading = false;
              if (res.rows.length < 10) {
                state.finished = true;
              }
              resolve()
            } else {
              reject()
            }
          } catch (err) {
            reject()
          }
        })
      },
      async getOrderStatus() {
        const res: any = await getOrderStatus({})
        if (res.code === 0) {
          state.form = {
            ...res.data,
            checked: res.data.orderStatus === 0
          }
        }
      },
      async onUpdateValue(val: any) {
        console.log(11, val)
        const res: any = await updateOrderStatus({
          orderStatus: val ? 0 : 1
        })
        if (res.code === 0) {
          methods.getOrderStatus();
        }
      },
      async sure(row: any) {
        const { id } = row;
        const res:any = await catchClinic({
          id
        })
        if (res.code === 0) {
          Toast('操作成功')
          methods.init('clear');
        }
      },
      async onRefresh() {
        await methods.init('clear');
        state.finished = false;
        state.freshLoading = false;
      },
      next(item: any) {
        const { id } = item;
        router.push({
          path: '/treatDetail',
          query: {
            id
          }
        })
      }
    })

    onMounted(() => {
      methods.init('clear');
      methods.getOrderStatus();
    })

    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss" scoped>
.treatOL-wrapper {

  .header-container {
    width: rem(375);
    height: rem(123);
    padding-top: rem(15);
    padding-bottom: rem(3);
    background: #3e9fff;

    & > .card {
      width: rem(345);
      height: rem(63);
      margin: 0 auto;
      padding: rem(14) rem(15) rem(14) rem(13);
      border-radius: rem(7);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;

      & > .label {
        height: rem(36);
        display: flex;

        & > .icon {
          width: rem(34);
          height: rem(36);
        }
        & > .text {
          margin-left: rem(12);
          display: flex;
          flex-direction: column;

          & > span:nth-of-type(1) {
            font-size: rem(16);
            line-height: rem(14);
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            font-family: SourceHanSansCN-Normal;
            color: #333333;
          }
          & > span:nth-of-type(2) {
            margin-top: rem(6);
            font-size: rem(12);
            line-height: rem(14);
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            font-family: SourceHanSansCN-Light;
            color: #666666;
          }
        }
      }
      & > .switch {
        width: rem(35);
        height: rem(20);
      }
    }
    & > .nav {

      .tab-container {
        height: calc(100vh - 1.23rem);
        margin-top: rem(2);
        padding: rem(15);
        overflow: auto;
        background: #efefef;

        .cell-item {
          width: rem(345);
          height: rem(100);
          padding: rem(10) rem(15) rem(10) rem(10);
          display: flex;
          box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
          border-radius: rem(7);
          background: #ffffff;

          &+.cell-item {
            margin-top: rem(15);
          }
          & > .img {
            width: rem(80);
            height: rem(80);
          }
          & > .intro {
            flex: 1;
            margin-left: rem(21);

            & > .st-1 {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .time {
                font-family: SourceHanSansCN-Normal;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 14px;
                letter-spacing: 0px;
                color: #666666;
              }
              .tag {
                height: rem(18);
                padding: 0 rem(4);
                border-radius: rem(2);
                font-family: SourceHanSansCN-Normal;
                font-size: rem(14);
                line-height: rem(18);
                text-align: center;
                color: #ff900e;
                background-color: #fff8e8;
                border: solid 1px #ffb864;
              }
            }
            & > .nd-2 {
              display: flex;
              justify-content: space-between;
              margin-top: rem(8);

              .lt {
                display: flex;
                align-items: flex-end;

                // & > .name {
                //   margin-right: rem(18);
                //   font-size: rem(18);
                //   line-height: rem(18);
                //   font-family: SourceHanSansCN-Normal;
                //   color: #333333;
                // }
                & > .label {
                  font-size: rem(14);
                  line-height: rem(14);
                  font-family: SourceHanSansCN-Normal;
                  color: #666666;
                }
              }
              // .rt {
              //   display: flex;
              //   align-items: flex-end;

              //   & > .btn {
              //     font-size: rem(14);
              //     line-height: rem(14);
              //     font-family: SourceHanSansCN-Normal;
              //     color: #666666;
              //   }
              //   & > .iconRt {
              //     width: rem(13);
              //     height: rem(13);
              //     margin-left: rem(5);
              //     background: url(./jtRight.png) no-repeat center top/contain;
              //   }
              // }
            }
            & > .line {
              width: 100%;
              height: rem(2);
              margin-top: rem(10);
              background: #e6e6e6;
            }
            & > .rd-3 {
              display: flex;
              margin-top: rem(9);

              span:nth-of-type(1) {
                width: rem(14);
                height: rem(14);
                background: url(./icon5.png) no-repeat center top/contain;
              }
              span:nth-of-type(2) {
                margin-left: rem(9);
                font-size: rem(14);
                line-height: rem(14);
                color: #666666;
                font-family: SourceHanSansCN-Normal;
              }
            }
            // ------------------------------
            .name {
              margin-right: rem(18);
              font-size: rem(18);
              line-height: rem(18);
              font-family: SourceHanSansCN-Normal;
              color: #333333;
            }
            .rt {
              display: flex;
              align-items: flex-end;
            
              & > .btn {
                font-size: rem(14);
                line-height: rem(14);
                font-family: SourceHanSansCN-Normal;
                color: #666666;
              }
              & > .btns {
                padding: 0 rem(5);
                font-size: rem(12);
                line-height: rem(14);
                font-family: SourceHanSansCN-Normal;
                border: solid 1px #3e9fff;
                border-radius: rem(2);
                color: #3e9fff;
              }
              & > .iconRt {
                width: rem(13);
                height: rem(13);
                margin-left: rem(5);
                background: url(./jtRight.png) no-repeat center top/contain;
              }
            }
          }
        }
      }
    }
  }
}
</style>