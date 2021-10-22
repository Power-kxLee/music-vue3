import { createStore } from 'vuex'
import {state} from './state'
import {mutations} from './mutations'
export const store = createStore({
  state,
  mutations
})
