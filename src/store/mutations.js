import * as types from './mutationsTypes'

const mutations = {
  [types.SAVE_ORDER_INFO] (state, order) {
    state.order = order
  },
  [types.GET_ORDER_INFO] (state) {
    return state.order
  }
}

export default mutations
