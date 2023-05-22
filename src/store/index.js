import Vuex from 'vuex'

export default new Vuex.Store({
    //数据，相当于data
    state: {
        colorMode: 'white',
        currentThemeColor: [200,200,200],
        isLoggedIn: false,
        accentColor: '0,0,0'
    },
    mutations: {
        changeColorMode(state) {
            state.colorMode = state.colorMode === 'white' ? 'black' : 'white'
            if (state.colorMode === 'black' && state.accentColor === '0,0,0') {
                state.accentColor = '255,255,255'
            } else if (state.colorMode === 'white' && state.accentColor === '255,255,255') {
                state.accentColor = '0,0,0'
            }
        },
        changeThemeColor(state, rgb) {
            state.currentThemeColor = rgb
        },
        setLogState(state, b) {
            state.isLoggedIn = b
        },
        setAccentColor(state, c) {
            state.accentColor = c
        },
    }
})