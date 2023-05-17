import Vuex from 'vuex'

export default new Vuex.Store({
    //数据，相当于data
    state: {
        colorMode: 'black',
        currentThemeColor: [200,200,200]
    },
    mutations: {
        changeColorMode(state) {
            state.colorMode = state.colorMode === 'white' ? 'black' : 'white'
        },
        changeThemeColor(state, rgb) {
            state.currentThemeColor = rgb
        }
    }
})