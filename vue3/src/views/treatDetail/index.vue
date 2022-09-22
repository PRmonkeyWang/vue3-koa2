<template>
  <div class="treatDetail-wrapper">
    <div class="header-container">
      <div class="card">
        <div class="t">
          <img class="img" :src="form.petMemberRegVo.petPic" alt="" />
          <div class="intro">
            <div class="st-1">
              <span class="time" v-if="true">{{ form.createTime }}</span>
              <span class="name" v-else>{{ form.petMemberRegVo.breed1Name }}</span>
              <span class="tag" v-if="true">{{ form.statusStr }}</span>
            </div>
            <div class="nd-2">
              <div class="lt">
                <span class="name" v-if="true">{{ form.petMemberRegVo.breed1Name }}</span>
                <!-- <span class="label">前腿骨折</span> -->
              </div>
            </div>
            <div class="line"></div>
            <div class="rd-3">
              <span></span>
              <span>{{ form.storeName }}</span>
            </div>
          </div>
        </div>
        <div class="b">
          <div class="ID">
            <div>
              <img src="./icon1.png" alt="" />
              <span>{{ form.petMemberRegVo.breed2Name }}</span>
            </div>
            <div>
              <img src="./icon1.png" alt="" />
              <span>{{ form.petMemberRegVo.petSex === 0 ? '公' : '母' }}</span>
            </div>
            <div>
              <img src="./icon1.png" alt="" />
              <span>{{ form.petMemberRegVo.weight || 0 }}</span>
            </div>
            <div>
              <img src="./icon1.png" alt="" />
              <span>{{ form.petMemberRegVo.petAge }}</span>
            </div>
          </div>
          <div class="case">
            <div>
              <span></span>
              <span>是否绝育:</span>
              <span>{{ form.petMemberRegVo.isParous ? '否' : '是' }}</span>
            </div>
            <div>
              <!-- <span></span>
              <span>是否免疫:</span>
              <span>无</span> -->
            </div>
            <div>
              <!-- <span></span>
              <span>是否驱虫:</span>
              <span>无</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-container mt106">
      <div v-if="form.initialSpec">
        <common-label value="初诊说明">
          <div class="submit-pos">
            <span class="btn" @click="show">查看病例</span>
          </div>
        </common-label>
        <div class="text">
          {{ form.initialSpec }}
        </div>
      </div>
      <div v-if="form.helpContent">
        <common-label value="求助内容"></common-label>
        <div class="text">
          {{ form.helpContent }}
        </div>
      </div>

      <div v-for="(item, index) in form.feedbackHistoryVos" :key="index">
        <div v-if="item.feedback">
          <common-label value="回复内容" :rightValue="item.feedbackTime"></common-label>
          <div class="feedBack">
            <div class="feedBackItem">
              {{ item.feedback }}
              <template v-if="form.feedbackHistoryVos.feedbackPic">
                <img class="img" v-for="(item, index) in form.feedbackHistoryVos.feedbackPic.split(',')" :src="item" alt="" />
              </template>
            </div>
          </div>
        </div>
        <div v-if="item.replenish">
          <common-label value="门店反馈" :rightValue="item.replenishTime"></common-label>
          <div class="feedBack">
            <div class="feedBackItem">
              {{ item.replenish }}
              <template v-if="form.feedbackHistoryVos.feedbackPic">
                <img class="img" v-for="(item, index) in form.feedbackHistoryVos.feedbackPic.split(',')" :src="item" alt="" />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div v-if="form.residueCount !== 0">
        <common-label value="回复内容"></common-label>
        <van-field
          class="textarea"
          v-model="form.feedbacks"
          :autosize="{maxHeight: 135}"
          type="textarea"
          placeholder="请输入"
          :disabled="![3, 6, 10].includes(form.status) && form.residueCount !== 0"
        >
          <template #extra>
            <div class="extra" v-if="[3, 6, 10].includes(form.status) && form.residueCount !== 0">
              <span class="btn" @click="submit(['feedbacks'], 0)">提交</span>
            </div>
          </template>
        </van-field>
      </div>

      <common-label value="远程视频会议邀请" :rightValue="form.meetingBegin"></common-label>
      <div class="submit" v-if="form.status === 3">
        <span class="btn" @click="apply">申请会议</span>
      </div>
      <common-label class="mt16" :line="false" :value="`会议时间：${form.meetingTimeStr || ''}`" v-if="form.meetingTimeStr"></common-label>
      <common-label class="mt7" :line="false" :value="`会议方式：${form.meetingWay || ''}`" v-if="form.meetingWay"></common-label>
      <div v-if="form.meetingSpec">
        <div class="line"></div>
        <div class="text mt8 flex">
          <span>{{ form.meetingSpec }}</span>
          <div class="extra">
            <span class="btn" @click="copy(form.meetingSpec)">复制</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container mt17">
      <common-label value="诊疗方案" ></common-label>
      <common-label :line="false" class="mt16" value="病情诊断" ></common-label>
      <van-field
        class="textarea"
        v-model="form.diagnosis"
        :autosize="{maxHeight: 135}"
        type="textarea"
        placeholder="请输入"
        :disabled="![3, 6, 10].includes(form.status) && form.residueCount !== 0"
      >
      </van-field>
      <common-label class="mt14" :line="false" value="诊疗方案" ></common-label>
      <van-field
        class="textarea"
        v-model="form.scheme"
        :autosize="{maxHeight: 135}"
        type="textarea"
        placeholder="请输入"
        :disabled="![3, 6, 10].includes(form.status) && form.residueCount !== 0"
      >
      </van-field>
      <div class="submit" v-if="[3, 6, 10].includes(form.status)">
        <span class="btn" @click="submit(['diagnosis', 'scheme'], 1)">提交</span>
      </div>
    </div>

    <div class="content-container mt18" v-if="form.schemeEstimate || form.serverEstimate || form.replenish">
      <div v-if="form.schemeEstimate">
        <common-label value="门店评价" ></common-label>
        <common-label :line="false" class="mt16" value="方案评价" ></common-label>
        <div class="text" >
          {{ form.schemeEstimate }}
        </div>
      </div>
      <div v-if="form.serverEstimate">
        <common-label class="mt16" :line="false" value="服务评价" ></common-label>
        <div class="text" >
          {{ form.serverEstimate }}
        </div>
      </div>
      <div v-if="form.replenish">
        <common-label class="mt16" :line="false" value="整体评价" ></common-label>
        <div class="text" >
          {{ form.replenish }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, unref, computed, watch } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElForm } from 'element-plus';
import { getRemoteById, updateRemoteClinic, applyForMeeting } from '@/apis/user';
import { Toast } from 'vant';
import { pick, debounce } from 'lodash';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const inputDom = ref(ElForm);

    const state = reactive({
      id: '',
      form: {
        feedbacks: '',
        diagnosis: '',
        scheme: '',

        feedbackPic: '',
        petMemberRegVo: {}
      } as any
    })

    const test = computed(() => {
      return true
    })

    const methods = reactive({
      async init() {
        const res:any = await getRemoteById({
          remoteClinicId: state.id
        })
        if (res.code === 0) {
          state.form = Object.assign(state.form, res.data)
          console.log(12345, state.form)
        }
      },
      copy(val: any) {
        let input = val + '';
        const el = document.createElement('input');
        el.value = input;
        el.setAttribute('readonly', '');
        // el.style.contain = 'strict';
        el.style.position = 'absolute';
        el.style.left = '-100vw';
        el.style.fontSize = '12px'; // Prevent zooming on iOS
        document.body.appendChild(el);
        el.select();
        el.selectionStart = 0;
        el.selectionEnd = input.length;
        var success = false;
        try {
          success = document.execCommand('copy');
        } catch (err) { }
        document.body.removeChild(el);
        Toast('已复制')
      },
      show: debounce(async () => {
        router.push(`/caseDetail?storeId=${state.form.storeId}&petOutPatientId=${state.form.outpatientId}`)
      }, 200), 
      apply: debounce(async () => {
        const res:any = await applyForMeeting({
          id: state.id
        })
        if (res.code === 0) {
          Toast('申请成功')
          methods.init();
        }
      }, 200), 
      submit: debounce(async (fieldList: any, submitType: any) => {
        const params = fieldList.reduce((obj: any, cur: any) => ({
          ...obj,
          [cur === 'feedbacks' ? 'feedback' : cur]: state.form[cur].replace("\n", "\r\n")
        }), {
          id: state.id,
          submitType,
        })
        const res:any = await updateRemoteClinic(params)
        if (res.code === 0) {
          Toast('提交成功');
          fieldList.forEach((item: any) => {
            state.form[item] = '';
          })
          
          methods.init();
        }
      }, 200),
      next() {
        router.push('/treatDetail')
      }
    })

    onMounted(() => {
      const id: any = route.query.id;
      state.id = id;
      if (id) {
        methods.init();
      }
    })

    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss" scoped>
.mt7 {
  margin-top: rem(7)!important
}
.mt8 {
  margin-top: rem(8)!important
}
.mt14 {
  margin-top: rem(14)!important
}
.mt16 {
  margin-top: rem(16)!important
}
.mt17 {
  margin-top: rem(17)!important
}
.mt18 {
  margin-top: rem(18)!important
}
.mt106 {
  margin-top: rem(106)!important
}
.flex {
  display: flex;
  justify-content: space-between;

  .extra {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  
    .btn {
      width: rem(42);
      height: rem(21);
      border-radius: rem(3);
      border: solid 1px #3e9fff;
      font-family: SourceHanSansCN-Normal;
      font-size: rem(14);
      line-height: rem(21);
      text-align: center;
      color: #3e9fff;
    }
  }
}
.treatDetail-wrapper {
  min-height: 100vh;
  padding-bottom: rem(21);
  background: #efefef;

  .header-container {
    width: rem(375);
    height: rem(123);
    padding-top: rem(23);
    padding-bottom: rem(3);
    background: #3e9fff;

    .card {
      width: rem(345);
      height: rem(188);
      margin: 0 auto;
      padding: rem(10) rem(15) rem(10) rem(10);
      display: flex;
      flex-direction: column;
      box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
      border-radius: rem(7);
      background: #ffffff;

      .t {
        display: flex;

        & > .img {
          width: rem(80);
          height: rem(80);
        }
        & > .intro {
          flex: 1;
          height: rem(80);
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
          
              & > .label {
                font-size: rem(14);
                line-height: rem(14);
                font-family: SourceHanSansCN-Normal;
                color: #666666;
              }
            }
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
        }
      }
      .b {
        width: rem(325);
        height: rem(68);
        margin-top: rem(21);
        padding: rem(11) rem(9);
        display: flex;
        flex-direction: column;
        background-color: #f2f9ff;
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
  .content-container {
    width: rem(345);
    min-height: rem(100);
    height: auto!important;
    overflow: hidden;
    margin: 0 auto;
    padding: 0 rem(14) rem(21);
    box-shadow: 0px 0px rem(8) rem(2) rgba(204, 204, 204, 0.15);
    border-radius: rem(7);
    background: #ffffff;

    &  .text {
      margin-top: rem(13);
      font-size: rem(14);
      line-height: rem(23);
      font-family: SourceHanSansCN-Normal;
      color: #666666;
    }
    &  .textarea {
      height: rem(150);
      margin-top: rem(10);
      padding: rem(12);
      border-radius: rem(7);
      background-color: #f6f6f6;

      .extra {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .btn {
          width: rem(42);
          height: rem(21);
          border-radius: rem(3);
          border: solid 1px #3e9fff;
          font-family: SourceHanSansCN-Normal;
          font-size: rem(14);
          line-height: rem(21);
          text-align: center;
          color: #3e9fff;
        }
      }
    }
    &  .feedBack {
      width: rem(318);
      min-height: rem(10);
      height: auto!important;
      margin-top: rem(10);
      padding: rem(12) rem(9);
      border-radius: rem(7);
      background-color: #f6f6f6;

  //     .feedBackItem {

  //       .req {
  //         display: flex;
  //         justify-content: flex-start;
  
  //         & > div {
  //           display: flex;
  //           flex-direction: column;
  //           align-items: flex-start;

  //           span:nth-of-type(2) {
  //             font-size: rem(12);
  //             line-height: rem(14);
  //             color: #aaaaaa;
  //           }
  //         }
  //       }
  //       .res {
  //         display: flex;
  //         justify-content: flex-end;

  //         & > div {
  //           display: flex;
  //           flex-direction: column;
  //           align-items: flex-end;

  //           span:nth-of-type(2) {
  //             font-size: rem(12);
  //             line-height: rem(14);
  //             color: #aaaaaa;
  //           }
  //         }
  //       }
  //     }
      .img {
        width: 100%;
        margin-top: rem(10);
      }
    }
    &  .line {
      width: rem(320);
      height: rem(2);
      margin-top: rem(10);
      background: #e6e6e6;
    }
    &  .submit {
      display: flex;
      justify-content: flex-end;

      .btn {
        min-width: rem(32);
        height: rem(21);
        padding: 0 rem(5);
        margin-top: rem(10);
        border-radius: rem(3);
        border: solid 1px #3e9fff;
        font-family: SourceHanSansCN-Normal;
        font-size: rem(14);
        line-height: rem(21);
        text-align: center;
        color: #3e9fff;
      }
    }
    & .submit-pos {
      position: absolute;
      right: 0;
      top: rem(-2);

      .btn {
        min-width: rem(32);
        height: rem(21);
        padding: 0 rem(5);
        margin-top: rem(10);
        border-radius: rem(3);
        border: solid 1px #3e9fff;
        font-family: SourceHanSansCN-Normal;
        font-size: rem(14);
        line-height: rem(21);
        text-align: center;
        color: #3e9fff;
      }
    }
  }
}
</style>