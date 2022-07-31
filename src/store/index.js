import { createStore } from 'vuex'
import { data } from './data'

export default createStore({
  state: () => ({
    data,
    idx: 0,
    rects: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  }),
  getters: {
    rects: state => {
      return state.rects
    }
  },
  mutations: {
    stIdx: (state, idx) => state.idx = idx,
    setItemRects: (state, data) => {
      state.rects[data[0]] = data[1]
    }
  },
})
