import Vuex from 'vuex'

export default new Vuex.Store({
    //数据，相当于data
    state: {
        colorMode: 'white',
        currentThemeColor: [200, 200, 200],//修改过的封面主题色
        originalThemeColor: [200, 200, 200],//原始的封面主题色
        isLoggedIn: false,
        accentColor: '0,0,0',               // 强调色
        multiColor: false,                  // 多彩变换，默认必须是 false
    },
    mutations: {
        changeColorMode(state) {//请不要直接调用这个方法，而是调用colorMode.js中的同名方法
            state.colorMode = state.colorMode === 'white' ? 'black' : 'white'
            if (state.colorMode === 'black' && state.accentColor === '0,0,0') {
                state.accentColor = '255,255,255'
            } else if (state.colorMode === 'white' && state.accentColor === '255,255,255') {
                state.accentColor = '0,0,0'
            }
        },
        changeThemeColor(state, [fixedRgb, originalRgb]) {//谔谔，不能超过两个参数
            console.log(fixedRgb, originalRgb);
            // alert(originalRgb,fixedRgb)
            state.currentThemeColor = fixedRgb
            state.originalThemeColor = originalRgb
        },
        setLogState(state, b) {
            state.isLoggedIn = b
        },
        setAccentColor(state, c) {
            state.accentColor = c
        },
        setMultiColor(state, b) {
            state.multiColor = b
        }
    }
})