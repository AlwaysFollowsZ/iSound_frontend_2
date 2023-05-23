<script>
import { ThumbDislike16Filled } from '@vicons/fluent';
import { backgroundColor, getRGBString, findSimilarColors } from '/src/colorMode';
export default {
    data() {
        watch(backgroundColor, () => {
            this.currentColor=this.themeColor
            this.transitionTime=1
        })
        return {
            themeColor: backgroundColor, // RGB 主题色
            currentColor: [], // 当前颜色
            transitionTime: 0,
            getRGBString
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
                const updatedColor = findSimilarColors(color,10,20)[Math.floor(Math.random()*5)]//随机选取一个相近的颜色,数值越小相似度越高
                this.currentColor = updatedColor
                //计算几何变化值
                const transitionDelta = Math.sqrt(Math.pow((beforeColor[0] - updatedColor[0]), 2) + Math.pow((beforeColor[1] - updatedColor[1]), 2) + Math.pow((beforeColor[2] - updatedColor[2]), 2))
                this.transitionTime = transitionDelta / this.updateSpeed
                console.log(transitionDelta);
                setTimeout(loopAnimation, this.transitionTime * 1000)
            }
            loopAnimation()
        }
    },
    props: {
        updateSpeed: {//背景动画的变化快慢
            type: Number,
            default: 10,
            validator(value) {
                return value > 0
            }
        }
    }
}
</script>



<template>
    <div class='page_background' :style="{
        'transition': `height cubic-bezier(0.165, 0.84, 0.44, 1) 1s ,background-color linear ${transitionTime}s`,
        'background-color': getRGBString(`${currentColor[0]},${currentColor[1]},${currentColor[2]}`)
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
