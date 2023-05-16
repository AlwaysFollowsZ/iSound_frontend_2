import Vuex from 'vuex'

export default new Vuex.Store({
    //数据，相当于data
    state: {
        colorMode: 'white',
    },
    mutations: {
        changeColorMode(state) {
            state.colorMode = state.colorMode === 'white' ? 'black' : 'white'
        },
    }
})