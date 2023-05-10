import { computed } from 'vue'
import store from '/src/store'

export const colorMode=computed(()=>store.state.colorMode)
export const getFontColorString = (themeColor) => {
    return computed(() => {
        const colorRate = (255 - 125) / 255
        const fontColorString= colorMode.value === 'black' ?
            `${125 + themeColor[0] * colorRate},${125 + themeColor[1] * colorRate},${125 + themeColor[2] * colorRate}`
            : `${themeColor[0] * colorRate},${themeColor[1] * colorRate},${themeColor[2] * colorRate}`
        console.log(fontColorString)
        return fontColorString
    })
}
export const getThemeColorString = (themeColor) => {
    return computed(() => {
        return `${themeColor[0]}, ${themeColor[1]}, ${themeColor[2]}`
    })//以防万一，对这里也加一下计算属性
}

export const changeColorMode = () => {
    store.commit('changeColorMode')
}