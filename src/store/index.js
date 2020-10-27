import Vuex from "vuex";
export default Vuex.createStore({
  state: {
    user: null,
    planList: []
  },
  mutations: {
    // 删除一个计划
    deletePlan(state, index) {
      state.planList.splice(index, 1);
    },
    // 新增一个计划
    addPlan(state, plan) {
      state.planList.push(plan);
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {},
  modules: {}
});
