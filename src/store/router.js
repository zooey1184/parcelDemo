// 路由前进后退状态  前进=》forward   后退=》backward
export default {
  state: {
    router: 'forward'
  },
  mutations: {
    SET_ROUTER(state, router) {
      state.router = router
    }
  },
  actions: {
    set_router(state, router) {
      state.commit('SET_ROUTER', router)
    }
  },
  getters: {
    get_router(state) {
      return state.router
    }
  }
}
