import { computed } from 'vue'
import store from '/src/store'
import ColorThief from 'colorthief'


//我们的设计包括白天/黑夜模式和每一首歌曲或歌单的背景图片的主题背景色
const colorThief = new ColorThief()

export const colorMode = computed(() => store.state.colorMode)//从这里获取白天和黑夜模式
export const globalThemeColor = computed(() => Object.assign([], store.state.currentThemeColor))//全局的主题色
const originalThemeColor = computed(() => Object.assign([], store.state.originalThemeColor))//原始主题色

export const backgroundColor = computed(() => {
    let colorBaseWhite = 150
    let colorBaseBlack = 235
    let oppositeColorBase = 255 - colorBaseBlack
    let whiteRate = (255 - colorBaseWhite) / 255
    let blackRate = oppositeColorBase / 255
    let themeColor = globalThemeColor.value
    if (colorMode.value === 'black') {
        return [oppositeColorBase + blackRate * themeColor[0], oppositeColorBase + blackRate * themeColor[1], oppositeColorBase + blackRate * themeColor[2]]
    }
    else {
        return [colorBaseWhite + whiteRate * themeColor[0], colorBaseWhite + whiteRate * themeColor[1], colorBaseWhite + whiteRate * themeColor[2]]
    }
})//从这里获取白天/黑夜模式的背景色.返回数组
export const antiBackgroundColor = computed(() => {
    return colorMode.value === 'white' ?
        '15,15,20' : '245,245,245'
})//从这里获取两种模式的相反色。用于pagination

//以下两个方法的输入为一个数组'[]',包含表示RGB的三个数字
//colorBase表示颜色基底[0,255]，值越高和背景色差别越小


//获取主题字体色的方法,返回'a,b,c'形式的字符串
export const getFontColorString = (themeColorInput, colorBase = 125) => {
    return computed(() => {
        const a = globalThemeColor.value
        let themeColor
        if (themeColorInput instanceof Array == false) {
            themeColor = themeColorInput.value
        }
        else {
            themeColor = themeColorInput
        }
        const whiteColorRate = (255 - colorBase) / 255
        const blackColorRate = colorBase / 255
        const fontColorString = colorMode.value === 'black' ?
            `${colorBase + themeColor[0] * whiteColorRate},${colorBase + themeColor[1] * whiteColorRate},${colorBase + themeColor[2] * whiteColorRate}`
            : `${themeColor[0] * blackColorRate},${themeColor[1] * blackColorRate},${themeColor[2] * blackColorRate}`
        return fontColorString
    })
}
//获取主题背景色的方法,返回'a,b,c'形式的字符串
export const getBackgroundColorString = (themeColorInput=globalThemeColor) => {
    //当歌曲主题色未解析完时可能投入空数组，忽略即可
    return computed(() => {
        //const a = [globalThemeColor.value,colorMode.value]
        let themeColor//不能直接对传入的对象进行更改，因此设置一个中间变量
        if ((typeof themeColorInput == Array) == false) {
            themeColor = themeColorInput.value
        }
        if (themeColor === undefined) {
            themeColor=JSON.parse(JSON.stringify(themeColorInput))
        }//不是数组不一定就是响应式变量
        if (themeColor === undefined) {
            return []
        }
        const themeColorString = themeColor.join(',')//`${themeColor[0]},${themeColor[1]},${themeColor[2]}`
        // console.log(themeColor)

        return themeColorString
    })
}

//输入形如'a,b,c'的颜色字符串、不透明度和类型(仅在管理员模式下有效),viewMode(仅在管理员模式下有效)
//获取形如'rgba(a,b,c,opacity)'的rgba字段
export const getRGBString = (colorInput, opacity = 1, type = 'normal', viewMode = 'user') => {
    let color
    if (typeof (colorInput) === 'string') {
        color = colorInput
    }
    else {
        color = colorInput.value
    }
    //转换成value
    if (viewMode !== 'admin') {
        if (color === 'transparent')
            return 'transparent'
        else
            return `rgba(${color},${opacity})`
    }
    else {
        if (type === 'font') {
            return 'rgba(100,100,100,0.7)'
        }
        else if (type === 'background') {
            return 'transparent'
        }
    }
}

//更改白天/黑夜模式
export const changeColorMode = () => {
    store.commit('changeColorMode')
    changeThemeColor(originalThemeColor.value)//由于模式变化，需要刷新主题色
}

//更改主题色。请传入RGB数组
export const changeThemeColor = (colorInput = [200, 200, 200]) => {
    let color = fixColor(colorInput)
    store.commit('changeThemeColor', [color, colorInput])//修改后的和原始的颜色都要存储，方便白天黑夜模式切换
}
//根据传入的图片路径直接更改传入的ref变量"color"
//注意！请不要放入svg图片
export const getThemeColorByImage = async (imageUrl, color) => {
    colorThief.getColorFromUrl(imageUrl, (res) => { color.value = fixColor(res) })
}
//根据传入的图片路径更换主题色
//注意！请不要放入svg图片
export const changeThemeColorByImage = (imageUrl) => {
    colorThief.getColorFromUrl(imageUrl, (res) => {
        changeThemeColor(res)
    })
}


//根据色彩模式调节主题色,返回调节后的数组
const fixColor = (colorInput) => {
    let color = JSON.parse(JSON.stringify(colorInput))//深拷贝
    const blackBrightness = Math.round((Math.max(color[0], color[1], color[2]) + Math.min(color[0], color[1], color[2])) / 2);
    const whiteBrightness = Math.round((color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000)//计算主题色明度
    if (colorMode.value === 'white') {//白色模式下应保证主题色较亮，但不能太亮
        if (whiteBrightness < 150) {//明度较低，应调高明度
            let colorBase = 150
            let rate = (255 - colorBase) / 255
            for (let i = 0; i < 3; i++) {
                color[i] = color[i] * rate + colorBase
            }
        }
        if (blackBrightness > 200) {//明度过高，降低明度
            let rate = 0.8
            for (let i = 0; i < 3; i++) {
                color[i] = color[i] * rate
            }
        }
    }
    else {//黑色模式下应保证主题色较暗,但不能太暗
        if (blackBrightness > 120) {//明度较高，应调低明度
            let colorBase = 50
            let rate = (255 - colorBase) / 255
            for (let i = 0; i < 3; i++) {
                color[i] = color[i] * rate
            }
        }
        if (whiteBrightness < 50) {//明度过暗,调高明度
            let rate = 1.2
            for (let i = 0; i < 3; i++) {
                color[i] = color[i] * rate
            }
        }
    }
    return color
}


//由于我们设计背景色为动态变化的，因此使用下面的函数在几个相近色中间随机动态变换
//输入RGB数组，返回好几个RGB数组
export const findSimilarColors = (rgbColor, count, similarity = 0.5) => {
    const similarColors = [];

    // 转换 RGB 到 HSL
    function rgbToHsl(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h, s, l;

        if (max === min) {
            h = 0;
        } else if (max === r) {
            h = ((g - b) / (max - min) + 6) % 6;
        } else if (max === g) {
            h = (b - r) / (max - min) + 2;
        } else {
            h = (r - g) / (max - min) + 4;
        }

        h = Math.round(h * 60);
        l = (max + min) / 2;

        if (max === min) {
            s = 0;
        } else if (l <= 0.5) {
            s = (max - min) / (max + min);
        } else {
            s = (max - min) / (2 - max - min);
        }

        s = Math.round(s * 100);
        l = Math.round(l * 100);

        return [h, s, l];
    }

    // 转换 HSL 到 RGB
    function hslToRgb(hsl) {
        const h = hsl[0] / 360;
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l * 255;
        } else {
            const hueToRgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
            g = Math.round(hueToRgb(p, q, h) * 255);
            b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);
        }
        return [r, g, b];
    }

    // 计算 HSL 颜色之间的距离
    function hslDistance(hsl1, hsl2) {
        const hueDiff = Math.abs(hsl1[0] - hsl2[0]) / 360;
        const saturationDiff = Math.abs(hsl1[1] - hsl2[1]) / 100;
        const lightnessDiff = Math.abs(hsl1[2] - hsl2[2]) / 100;
        return Math.sqrt(hueDiff * hueDiff + saturationDiff * saturationDiff + lightnessDiff * lightnessDiff);
    }

    // 生成相近颜色
    function generateSimilarColors() {
        const hslColor = rgbToHsl(rgbColor);

        for (let i = 0; i < count; i++) {
            let newHue;
            let newSaturation;
            let newLightness;

            do {
                newHue = (hslColor[0] + Math.random() * similarity * 360) % 360;
                newSaturation = Math.max(0, Math.min(100, hslColor[1] + Math.random() * similarity * 100));
                newLightness = Math.max(0, Math.min(100, hslColor[2] + Math.random() * similarity * 100));
            } while (hslDistance([newHue, newSaturation, newLightness], hslColor) > similarity);

            const newColor = hslToRgb([newHue, newSaturation, newLightness]);

            similarColors.push({
                color: newColor,
                distance: hslDistance([newHue, newSaturation, newLightness], hslColor)
            });
        }

        similarColors.sort((a, b) => a.distance - b.distance);
    }

    generateSimilarColors();

    return similarColors.map(colorData => colorData.color);
}

