<template>
  <div class="IndexMain">
    <van-nav-bar title="计划">
      <template #left>
        <span @click="handelNavBack">返回</span>
      </template>
    </van-nav-bar>
    <van-swipe-cell v-for="(planItem, index) in planList" :key="planItem.id">
      <van-cell
        center
        :title="planItem.title"
        :value="planItem.date"
        :label="planItem.remark"
      />
      <template #right>
        <van-button
          @click="handelDeletePlan(index)"
          square
          type="danger"
          text="删除"
        />
      </template>
    </van-swipe-cell>
    <!-- 统计 -->
    <div class="planCount" v-if="planCount !== 0">
      共有{{ planCount }}个计划
    </div>
    <!-- 为空 -->
    <van-empty
      image-size="50"
      v-if="planList.length === 0"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无计划"
    />
    <!-- 添加的按钮 -->
    <div class="add" @click="addPopup = true">
      <van-icon color="#fff" name="plus" />
    </div>
    <!-- 添加的弹窗 -->
    <van-popup
      v-model:show="addPopup"
      round
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-form @submit="handelAddPlan" style="margin-top: 40px">
        <van-field
          v-model="addPlanForm.title"
          name="title"
          label="计划标题"
          placeholder="请输入计划标题"
          :rules="[{ required: true, message: '请填写计划标题' }]"
        />
        <van-field
          v-model="addPlanForm.remark"
          name="remark"
          label="备注"
          placeholder="请输入备注"
          :rules="[{ required: true, message: '请填写备注' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            新增
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>
<script>
import { ref, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Toast, Dialog } from "vant";
export default {
  name: "Index",
  setup() {
    const store = useStore();
    const router = useRouter();
    const planList = store.state.planList;
    const addPlanForm = reactive({
      title: "",
      remark: "",
    });
    // 添加的弹出层
    const addPopup = ref(false);
    // 计算计划的个数
    const planCount = computed(() => store.state.planList.length);
    // 如果没登录重定向到登录
    if (store.state.user === null) {
      Toast("未登录，请先登录");
      router.replace("Login");
    }
    const handelNavBack = () => {
      router.go(-1);
    };
    const handelAddPlan = (e) => {
      store.commit("addPlan", {
        ...e,
        id: Math.random().toString(36).substr(2),
        date: new Date().toDateString(),
      });
      Toast("添加计划成功");
      addPopup.value = false;
      addPlanForm.title = "";
      addPlanForm.remark = "";
    };
    const handelDeletePlan = (index) => {
      Dialog.confirm({
        title: "提示",
        message: "您缺点要删除此计划吗？",
      }).then(() => {
        store.commit("deletePlan", index);
        Toast("删除计划成功");
      });
    };
    return {
      handelNavBack,
      planList,
      addPopup,
      addPlanForm,
      handelAddPlan,
      handelDeletePlan,
      planCount,
    };
  },
};
</script>
<style scoped>
.add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: fixed;
  right: 30px;
  bottom: 100px;
  background: dodgerblue;
}
.add:active {
  opacity: 0.8;
}
.planCount {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: dimgray;
}
</style>