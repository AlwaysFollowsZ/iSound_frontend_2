import Vuex from 'vuex'

export default new Vuex.Store({
    //数据，相当于data
    state: {
        colorMode: 'white',
        currentThemeColor: [200,200,200],
        isLoggedIn: false,
        //isAdmin: false,      // 测试阶段设为 true，正式情况下将设为 false
    },
    mutations: {
        changeColorMode(state) {
            state.colorMode = state.colorMode === 'white' ? 'black' : 'white'
        },
        changeThemeColor(state, rgb) {
            state.currentThemeColor = rgb
        },
        setLogState(state, b) {
            state.isLoggedIn = b
        },
        // setIsAdmin(state, b) {
        //     state.isAdmin = b
        // },
    }
})