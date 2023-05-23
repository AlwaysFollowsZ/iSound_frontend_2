<script>
import { ThumbDislike16Filled } from '@vicons/fluent';
import { backgroundColor, getRGBString, findSimilarColors, globalThemeColor } from '/src/colorMode';
export default {
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
                const color = this.themeColor//存储主题色
                const beforeColor = [this.currentColor[0], this.currentColor[1], this.currentColor[2]]//变换之前的背景色
                let updatedColor
                let transitionDelta
                do {
                    updatedColor = findSimilarColors(color, 100,this.Similarity)[Math.floor(Math.random() * 100)]
                    //计算几何变化值
                    transitionDelta = Math.sqrt(Math.pow((beforeColor[0] - updatedColor[0]), 2) + Math.pow((beforeColor[1] - updatedColor[1]), 2) + Math.pow((beforeColor[2] - updatedColor[2]), 2))
                } while (transitionDelta < 10)//随机选取一个相近的颜色,数值越大相似度越高,如果颜色变化过小则重新寻找
                //更新过渡时间和当前颜色
                this.currentColor = updatedColor
                this.transitionTime = transitionDelta / this.updateSpeed
                //约束过渡时间下限
                if (this.transitionTime < 1) {
                    this.transitionTime = 1
                }
                setTimeout(loopAnimation, this.transitionTime * 1000)
            }
            if (this.animateSwitch === true) {
                setTimeout(loopAnimation, 1000)
            }
        }
    },
    props: {
        updateSpeed: {//背景动画的变化快慢
            type: Number,
            default: 15,
            validator(value) {
                return value > 0
            }
        },
        Similarity: {//变换颜色的相似度
            type: Number,
            default: 0.2,
            validator(value) {
                return 0 <= value <= 1
            }
        },
        animateSwitch: {//是否开启变换颜色
            type: Boolean,
            default: true
        }
    }
}
</script>



<template>
    <div class='page_background bg-pan-bottom' :style="{
        'transition': `height  cubic-bezier(0.19, 1, 0.22, 1) 1s ,background-color linear ${transitionTime}s`,
        'background-color': getRGBString(currentColor.join(','))
    }"></div>
</template>
<style scoped>
.page_background {
    position: fixed;
    z-index: -1;
    height: 100vh;
    width: 100vw;
}
</style>
