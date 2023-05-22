import Vuex from 'vuex'
 
export default new Vuex.Store({
    //数据，相当于data
    state: {
        colorMode: 'white',
        currentThemeColor: [200, 200, 200],//修改过的封面主题色
        originalThemeColor:[200,200,200],//原始的封面主题色
        isLoggedIn: false,
        //isAdmin: false,      // 测试阶段设为 true，正式情况下将设为 false
    },
    mutations: {
        changeColorMode(state) {
            state.colorMode = state.colorMode === 'white' ? 'black' : 'white'
            return 0
        },
        changeThemeColor(state, [fixedRgb, originalRgb]) {//谔谔，不能超过两个参数
            state.currentThemeColor = fixedRgb
            state.originalThemeColor=originalRgb
        },
        setLogState(state, b) {
            state.isLoggedIn = b
        },
        // setIsAdmin(state, b) {
        //     state.isAdmin = b
        // },
    }
})