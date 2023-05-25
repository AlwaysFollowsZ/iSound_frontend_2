<script>
import { ThumbDislike16Filled } from '@vicons/fluent';
import { backgroundColor, getRGBString, findSimilarColors, globalThemeColor } from '/src/colorMode';
import { mapState } from 'vuex'; // 便于直接引用 store 中的 state
export default {
    computed: {
        ...mapState(['multiColor']),    // 为 true 表示开启渐变效果
        // 引用方式 `this.multiColor` or `multiColor`
        // 在 methods 中添加关于此变量的判断决定是否开启渐变；默认不开启
    },
    data() {
        watch(backgroundColor, () => {//切换背景色优先
            this.currentColor = this.themeColor
            this.transitionTime = 1
        })
        return {
            themeColor: backgroundColor, // RGB 主题色
            currentColor: [], // 当前颜色
            transitionTime: 1,
            getRGBString,
            globalThemeColor
        };
    },
    created() {
        this.startAnimation()
    },
    methods: {
        startAnimation() {
            this.currentColor = [this.themeColor[0], this.themeColor[1], this.themeColor[2]]
            const loopAnimation = () => {
                if (this.multiColor===true) {
                    const color = this.themeColor//存储主题色
                    const beforeColor = [this.currentColor[0], this.currentColor[1], this.currentColor[2]]//变换之前的背景色
                    let updatedColor
                    let transitionDelta
                    do {
                        updatedColor = findSimilarColors(color, 100, 0.6)[Math.floor(Math.random() * 100)]
                        //计算几何变化值
                        transitionDelta = Math.sqrt(Math.pow((beforeColor[0] - updatedColor[0]), 2) + Math.pow((beforeColor[1] - updatedColor[1]), 2) + Math.pow((beforeColor[2] - updatedColor[2]), 2))
                    } while (transitionDelta < 5)//随机选取一个相近的颜色,数值越大相似度越高
                    //如果颜色变化过小则重新寻找
                    //更新过渡时间和当前颜色
                    this.currentColor = updatedColor
                    this.transitionTime = transitionDelta / this.updateSpeed
                    //  console.log(this.transitionTime, updatedColor);
                }
                else {
                    this.currentColor=this.themeColor
                }
                    setTimeout(loopAnimation, this.transitionTime * 1000)
                
            }
            loopAnimation()
        }
    },
    props: {
        updateSpeed: {//背景动画的变化快慢
            type: Number,
            default:25,
            validator(value) {
                return value > 0
            }
        }
    }
}
</script>



<template>
    <div class='page_background bg-pan-bottom' :style="{
        'transition': `height cubic-bezier(0.165, 0.84, 0.44, 1) 1s ,background-color linear ${transitionTime}s`,
        'background-color': getRGBString(`${currentColor[0]},${currentColor[1]},${currentColor[2]}`)
        // 'background':`linear-gradient(to top,${getRGBString(currentColor.join(','))},${getRGBString(globalThemeColor.join(','))},${getRGBString(currentColor.join(','))})`
    }"></div>
</template>
<style scoped>
.page_background {
    position: fixed;
    z-index: -1;
    height: 100vh;
    width: 100vw;
    /* background-repeat: no-repeat; */
}

.bg-pan-bottom {
    /* animation: bg-pan-bottom 5s infinite  forwards linear; */
}


@keyframes bg-pan-bottom {
    0% {
        background-position: 0 50vw;
        background-size: 100% 100%;

    }

    100% {
        background-position: 0 0;
        background-size: 100% 100%;
    }
}
</style>
