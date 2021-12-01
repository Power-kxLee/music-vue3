export const mutations = {
  setTabbarData (state:any, value:any) {
    state.tabbarData = value
  },
  update(state:any, val:any) {
    state[val.key] = val.value
  },

}