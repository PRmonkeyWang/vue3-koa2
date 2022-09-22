<template>
  <div class="caseDetail-wrapper">
    <van-tabs v-model:active="active" :shrink="true" v-if="form.healthTestVos && form.healthTestVos.length">
      <van-tab v-for="(item, index) in form.healthTestVos" :title="item.createTime">
        <div v-if="item.chiefCompiants && item.chiefCompiants.length">
          <common-label value="顾客主诉"></common-label>
          <el-descriptions
            class="descriptions"
            :column="1"
            size="small"
            border
          >
            <el-descriptions-item v-for="(innerItem, innerIndex) in item.chiefCompiants" :key="innerIndex">
              <template #label>
                <div style="width: 80px">{{ innerItem.label }}</div>
              </template>
              {{ ['text', 'textarea'].includes(innerItem.valueType) ? innerItem.value : innerItem.value === '0' ? '' : ((dictData[innerItem.key] || []).find(i => (i.dictValue === innerItem.value)) || {}).dictLabel }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        
        <div v-if="item.testContents && item.testContents.length">
          <common-label value="基础检查"></common-label>
          <el-descriptions
            class="descriptions"
            :column="1"
            size="small"
            border
          >
            <el-descriptions-item v-for="(innerItem, innerIndex) in item.testContents" :key="innerIndex">
              <template #label>
                <div style="width: 80px">{{ innerItem.label }}</div>
              </template>
              {{ ['text', 'textarea'].includes(innerItem.valueType) ? innerItem.value : innerItem.value === '0' ? '' : ((dictData[innerItem.key] || []).find(i => (i.dictValue === innerItem.value)) || {}).dictLabel }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </van-tab>
    </van-tabs>

    <div v-if="form.petChemicalTests && form.petChemicalTests.length">
      <common-label value="化验检查"></common-label>
      <div class="mt10" v-for="(item, index) in form.petChemicalTests" :key="index">
        <el-descriptions
          class="descriptions"
          direction="vertical"
          :column="8"
          size="small"
          border
        >
          <el-descriptions-item :label="innerItem.label" v-for="(innerItem, innerIndex) in hyList" :key="innerIndex">
            <tempalte v-if="innerItem.enum">
              {{ innerItem.enum[item[innerItem.key]] }}
            </tempalte>
            <template v-else>
              {{ innerItem.valueType === 'text' ? item[innerItem.key] : item[innerItem.key] === '0' ? '' : ((dictData[innerItem.key] || []).find(i => (i.dictValue === item[innerItem.key])) || {}).dictLabel }}
            </template>
          </el-descriptions-item>
        </el-descriptions>
        <div class="report">
          <common-label :line="false" value="报告说明" ></common-label>
          <div class="mt10">
            {{ item.chemDesc }}
          </div>
          <common-label :line="false" value="附件" ></common-label>
          <img class="mt10" :src="item.attachment" alt="" />
        </div>
      </div>
    </div>

    <div v-if="form.petImageTests && form.petImageTests.length">
      <common-label value="检测影像"></common-label>
      <div class="mt10" v-for="(item, index) in form.petImageTests" :key="index">
        <el-descriptions
          class="descriptions"
          direction="vertical"
          :column="8"
          size="small"
          border
        >
          <el-descriptions-item :label="innerItem.label" v-for="(innerItem, innerIndex) in hyList" :key="innerIndex">
            <tempalte v-if="innerItem.enum">
              {{ innerItem.enum[item[innerItem.key]] }}
            </tempalte>
            <template v-else>
              {{ innerItem.valueType === 'text' ? item[innerItem.key] : item[innerItem.key] === '0' ? '' : ((dictData[innerItem.key] || []).find(i => (i.dictValue === item[innerItem.key])) || {}).dictLabel }}
            </template>
          </el-descriptions-item>
        </el-descriptions>
        <div class="report">
          <common-label :line="false" value="报告说明" ></common-label>
          <div class="mt10">
            {{ item.imgDesc }}
          </div>
          <common-label :line="false" value="影像" ></common-label>
          <img class="mt10" :src="item.imagePic" alt="" />
          <common-label :line="false" value="附件" ></common-label>
          <img class="mt10" :src="item.attachment" alt="" />
        </div>
      </div>
    </div>

    <div v-if="form.petOutpatientDiagnoses && form.petOutpatientDiagnoses.length">
      <common-label value="病情诊断"></common-label>
      <div v-for="(item, index) in form.petOutpatientDiagnoses" :key="index">
        <el-descriptions
          class="descriptions"
          :column="2"
          size="small"
          direction="vertical"
          border
        >
          <template v-for="(innerItem, innerIndex) in bqzdList" :key="innerIndex">
            <el-descriptions-item :label="innerItem.label" v-if="item[innerItem.key]">
              {{ innerItem.valueType === 'text' ? item[innerItem.key] : (item[innerItem.key] === '0' || !item[innerItem.key]) ? '' : ((dictData[innerItem.mappingKey || innerItem.key] || []).find(i => (i.dictValue === item[innerItem.key])) || {}).dictLabel }}
            </el-descriptions-item>
          </template>
        </el-descriptions>
        <el-descriptions
          v-if="item.illnessDiagnose"
          class="descriptions"
          :column="1"
          size="small"
          direction="vertical"
          border
        >
          <el-descriptions-item label="病情诊断">
            {{ item.illnessDiagnose }}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions
          v-if="item.diagnoseScheme"
          class="descriptions"
          :column="1"
          size="small"
          direction="vertical"
          border
        >
          <el-descriptions-item label="方案">
            {{ item.diagnoseScheme }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

    <div v-if="form.petOutpatientDiagnoseDetails && form.petOutpatientDiagnoseDetails.length && (form.petOutpatientDiagnoseDetails.some((item) => (item.diagnoseDetailsZero || item.diagnoseDetailsOne || item.diagnoseDetailsTwo)))">
      <common-label value="诊疗方案"></common-label>
      <div v-for="(item, index) in form.petOutpatientDiagnoseDetails" :key="index">
        <div v-if="item.diagnoseDetailsZero && item.diagnoseDetailsZero.length">
          <common-label :line="false" value="处方" ></common-label>
          <div v-for="(items, indexs) in item.diagnoseDetailsZero" :key="indexs">
            <el-descriptions
              class="descriptions"
              direction="vertical"
              :column="5"
              size="small"
              border
            >
              <el-descriptions-item :label="innerItem.label" v-for="(innerItem, innerIndex) in cfList" :key="innerIndex">
                {{ innerItem.valueType === 'text' ? items[innerItem.key] : (items[innerItem.key] === '0' || !items[innerItem.key]) ? '' : ((dictData[innerItem.mappingKey || innerItem.key] || []).find(i => (i.dictValue === items[innerItem.key])) || {}).dictLabel }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div v-if="item.diagnoseDetailsOne && item.diagnoseDetailsOne.length">
          <common-label :line="false" value="手术" ></common-label>
          <div v-for="(items, indexs) in item.diagnoseDetailsOne" :key="indexs">
            <el-descriptions
              class="descriptions"
              direction="vertical"
              :column="5"
              size="small"
              border
            >
              <el-descriptions-item :label="innerItem.label" v-for="(innerItem, innerIndex) in czList" :key="innerIndex">
                {{ innerItem.valueType === 'text' ? items[innerItem.key] : (items[innerItem.key] === '0' || !items[innerItem.key]) ? '' : ((dictData[innerItem.mappingKey || innerItem.key] || []).find(i => (i.dictValue === items[innerItem.key])) || {}).dictLabel }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div v-if="item.diagnoseDetailsTwo && item.diagnoseDetailsTwo.length">
          <common-label :line="false" value="处置" ></common-label>
          <div v-for="(items, indexs) in item.diagnoseDetailsTwo" :key="indexs">
            <el-descriptions
              class="descriptions"
              direction="vertical"
              :column="5"
              size="small"
              border
            >
              <el-descriptions-item :label="innerItem.label" v-for="(innerItem, innerIndex) in czList" :key="innerIndex">
                {{ innerItem.valueType === 'text' ? items[innerItem.key] : (items[innerItem.key] === '0' || !items[innerItem.key]) ? '' : ((dictData[innerItem.mappingKey || innerItem.key] || []).find(i => (i.dictValue === items[innerItem.key])) || {}).dictLabel }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, unref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElForm } from 'element-plus';
import { getOutPatientById, getDictData } from '@/apis/user';
import { omit } from 'lodash';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const inputDom = ref(ElForm);

    const state = reactive({
      active: 0,
      form: {
        healthTestVos: [
          {
            chiefCompiants: [],
            testContents: []
          }
        ],
        petImageTests: [],
        petOutpatientDiagnoses: [],
        petChemicalTests: {},
        petOutpatientDiagnoseDetails: [
          {
            diagnoseDetailsZero: [],
            diagnoseDetailsOne: [],
            diagnoseDetailsTwo: []
          }
        ]
      },
      dictData: {},
      hyList: [
        { label: '检查项', key: 'productName', valueType: 'text' },
        { label: '数量', key: 'qty', valueType: 'text' },
        { label: '单价', key: 'price', valueType: 'text' },
        { label: '小计', key: 'fee', valueType: 'text' },
        { label: '服务人员', key: 'serviceBy', valueType: 'text' },
        { label: '结算情况', key: 'isSettled', valueType: 'select', enum: {0: '未结算', 1: '已结算', 2: '已作废'} },
        { label: '完成情况', key: 'isFinished', valueType: 'select', enum: {0: '未完成', 1: '已完成'} }
      ],
      bqzdList: [
        { label: '诊疗科目', key: 'diagnoseSubject', valueType: 'select', mappingKey: 'illness_subject' },
        { label: '初步诊断', key: 'illnessType', valueType: 'select' }
      ],
      cfList: [
        { label: '商品名称', key: 'productName', valueType: 'text' },
        { label: '数量', key: 'qty', valueType: 'text' },
        { label: '单价', key: 'price', valueType: 'text' },
        { label: '小计', key: 'fee', valueType: 'text' },
        { label: '服务人员', key: 'serviceBy', valueType: 'text' },
      ],
      czList: [
        { label: '服务名称', key: 'productName', valueType: 'text' },
        { label: '数量', key: 'qty', valueType: 'text' },
        { label: '单价', key: 'price', valueType: 'text' },
        { label: '小计', key: 'fee', valueType: 'text' },
        { label: '服务人员', key: 'serviceBy', valueType: 'text' },
      ],
      dic_supply: {
        ct_urine_color: '尿色',
        ct_urine_niaoliang: '尿量',
        ct_laxi_cishu: '拉稀次数',
        ct_outu_tezheng: '呕吐特征',
        ct_laxi_ingredient: '拉稀成分',
        ct_eat_lastest: '最近吃过什么'
      }
    })

    const test = computed(() => {
      return true
    })

    const methods = reactive({
      async init() {
        const { storeId, petOutPatientId } = route.query
        const res:any = await getOutPatientById({
          storeId,
          petOutPatientId
        })
        if (res.code === 0) {
          state.form = Object.assign(state.form, res.data)
          state.form = {
            ...state.form,
            ...omit(res.data, ['healthTestVos']),
            healthTestVos: res.data.healthTestVos?.map((item: any) => {
              return {
                ...omit(item, ['chiefCompiants']),
                chiefCompiants: item.chiefCompiants?.filter((innerItem: any) => {
                  return !innerItem.key.includes('ct_eat_lastest_')
                }).map((innerItem: any) => {
                  if (state.dic_supply[innerItem.key] && !innerItem.label) {
                    return {
                      ...omit(innerItem, ['label']),
                      label: state.dic_supply[innerItem.key]
                    }
                  } else {
                    return innerItem
                  }
                }) || []
              }
            }) || []
          }
        }
      },
      async getDic() {
        const res:any = await getDictData({})
        if (res.code === 0) {
          state.dictData = res.data
        }
      }
    })

    onMounted(() => {
      methods.getDic();
      methods.init();
    })

    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss" scoped>
.mt10 {
  margin-top: rem(10);
}
.caseDetail-wrapper {
  min-height: 100vh;
  padding: rem(15);
  // background: #efefef;

  .descriptions {
    margin-top: rem(10);
  }
  .report {

    img {
      width: rem(200);
    }
  }
}
</style>