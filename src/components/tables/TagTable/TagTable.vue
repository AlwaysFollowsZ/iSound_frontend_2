<template>
    <div :style="{ width: this.width + 'px' }">
        <n-grid :y-gap="16">
            <n-gi :span="24">
                <div v-for="(content, idx) in contents" :key="idx" :style="{ 'display': 'inline-block' }">
                    <div v-if="idx !== 31" class="tag-entry-container" :style="getTagStyle(idx)"
                        @mouseenter="idx === 31 ? '' : isHoverOnTag[idx] = true"
                        @mouseleave="idx === 31 ? '' : isHoverOnTag[idx] = false">
                        <tag-entry :index="idx" :content="content" :color-display="this.colorMode === 'white' ?
                            (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 0.3)' : 'rgba(' + this.accentColor + ', 0.5)') :
                            (idx % 2 === 0 ? '#5f5c5c' : '#bcbbbb')" :color-hover="this.colorMode === 'white' ?
        (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 0.6)' : 'rgba(' + this.accentColor + ', 0.65)') :
        (idx % 2 === 0 ? '#373333' : '#373333')"
                            :color-text="this.colorMode === 'white' ?
                                (idx % 2 === 0 ? 'rgb(' + this.accentColor + ')' : 'white') :
                                (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 1)' : 'rgba(' + this.accentColor + ', 0.9)')"
                            :should-animate="shouldAnimate" @click="handleClickTag(content)"
                            @mouseenter="idx !== 31 ? '' : isHoverOnTag[idx] = true"
                            @mouseleave="idx !== 31 ? '' : isHoverOnTag[idx] = false" />
                    </div>
                    <n-popover class="easter" :delay="5000" :style="{
                        'border-radius': '20px',
                        'background': getRGBString(getBackgroundColorString(easterColor), 0.8),
                    }" v-else-if="easterTwice === false" trigger="hover" @mouseenter="handleEaster"
                        @mouseleave="handleExitEaster">
                        <div>度し難い！&gt; _ &lt;</div>
                        <div :style="{
                            'background': `url('/src/assets/doshigatai.png')`,
                            'background-repeat': 'no-repeat',
                            'background-position': 'center center',
                            'background-size': 'cover',
                            'border-radius': '50px',
                            'width': '250px',
                            'aspect-ratio': '1',
                        }"></div>
                        <div>冗談、ただ冗談だよ！やめろー…</div>
                        <template #trigger>
                            <div class="tag-entry-container easter-entry" :style="getTagStyle(idx)"
                                @mouseenter="idx === 31 ? '' : isHoverOnTag[idx] = true"
                                @mouseleave="idx === 31 ? '' : isHoverOnTag[idx] = false">
                                <tag-entry :index="idx" :content="content" :color-display="this.colorMode === 'white' ?
                                    (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 0.3)' : 'rgba(' + this.accentColor + ', 0.5)') :
                                    (idx % 2 === 0 ? '#5f5c5c' : '#bcbbbb')" :color-hover="this.colorMode === 'white' ?
        (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 0.6)' : 'rgba(' + this.accentColor + ', 0.65)') :
        (idx % 2 === 0 ? '#373333' : '#373333')"
                                    :color-text="this.colorMode === 'white' ?
                                        (idx % 2 === 0 ? 'rgb(' + this.accentColor + ')' : 'white') :
                                        (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 1)' : 'rgba(' + this.accentColor + ', 0.9)')"
                                    :should-animate="shouldAnimate" @click="handleClickTag(content)"
                                    @mouseenter="idx !== 31 ? '' : isHoverOnTag[idx] = true"
                                    @mouseleave="idx !== 31 ? '' : isHoverOnTag[idx] = false" />
                            </div>
                        </template>
                    </n-popover>
                </div>
            </n-gi>
        </n-grid>
    </div>
</template>

<script>
import 'animate.css'
import { message } from 'ant-design-vue'
import TagEntry from './TagEntry.vue'
import { NPopover } from 'naive-ui'
import { mapState } from 'vuex'
import { changeThemeColor, getFontColorString, getBackgroundColorString, getRGBString, globalThemeColor, changeColorMode, getThemeColorByImage } from '/src/colorMode.js'
export default {
    name: 'TagTable',
    components: {
        TagEntry,
        NPopover
    },
    computed: {
        ...mapState(['accentColor', 'colorMode']),
    },
    props: {
        width: Number,
        shouldAnimate: Boolean,
    },
    created() {
        console.log(this.getRGBString(this.getFontColorString(this.globalThemeColor).value, 0.6))
    },
    data() {
        let easterColor = []
        getThemeColorByImage('/src/assets/doshigatai.png', easterColor)
        let isHoverOnTag = new Array(32)
        isHoverOnTag.forEach((i) => {
            i = false
        })
        return {
            isEastered: false,
            easterTwice: false,
            easterColor,
            isHoverOnTag,
            getFontColorString,
            getBackgroundColorString,
            getRGBString,
            globalThemeColor,
            changeColorMode,
            contents: [
                '华语',
                '流行',
                '民谣',
                '轻音乐',
                '电子',
                '摇滚',
                '日韩',
                '粤语',
                '舞曲',
                '说唱',
                '爵士',
                '乡村',
                '古典',
                '民族',
                '金属',
                '古风',
                '游戏',
                '清晨',
                '夜晚',
                '学习',
                '工作',
                '午休',
                '散步',
                '下午茶',
                '旅行',
                '运动',
                '怀旧',
                '伤感',
                '放松',
                '浪漫',
                '安静',
                '思念',
            ],
        }
    },
    methods: {
        handleClickTag(tagName) {
            this.$emit('exit')
            setTimeout(() => {
                this.$router.push("/tags/" + tagName);
                console.log(`push to search the tag: ${tagName}`);
            }, 1100)
        },
        getTagStyle(index) {
            let start = Math.floor(index / 8) * 8//设置起始下标
            let flag = 0
            let hoverIndex = 0
            for (let i = start; i < start + 8; i++) {
                if (this.isHoverOnTag[i] === true) {
                    flag = 1
                    hoverIndex = i
                    break
                }
            }
            if (flag === 1) {//有标签被hover
                if (hoverIndex === index) {//是被hover的标签
                    return {
                        // 'height': '80px',
                        'width': '170px',
                        'transform': 'scale(1.3)',
                    }
                }
                else {//其他标签
                    return {
                        // 'height': '80px',
                        // 'width': `${140-Math.abs(hoverIndex-index)*10}px'`,
                        'margin': `0 ${15 - Math.abs(hoverIndex - index) * 2}px`
                    }
                }
            }
        },
        success(msg) {
            message.success({
                content: msg,
                duration: 1,
            });
        },
        warning(msg) {
            message.warning({
                content: msg,
                duration: 1,
            });
        },
        error(msg) {
            message.error({
                content: msg,
                duration: 1,
            });
        },
        handleEaster() {
            if (this.isEastered === false) {
                this.success('恭喜你发现了彩蛋！')
                changeColorMode()
            }
            else if (this.easterTwice === false) {
                this.error('度し難い！')
                changeThemeColor([255, 0, 0])//变红了，别惹reg
                changeColorMode()
                this.easterTwice = true
            }
        },
        handleExitEaster() {
            if (this.isEastered === false) {
                this.success('下次再来和Reg一起玩噢!')
                changeColorMode()
                setTimeout(() => {
                    this.isEastered = true
                }, 5000)

            }
        }

    }
}
</script>

<style>
:root {
    --easter-animation-time: 0.1s;
    --easter-animation-scale: 10;
}

.tag-entry-container {
    transition: all linear 0.5s,
        width cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
    height: 70px;
    width: 150px;
    margin: 0 10px;
    display: inline-block;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.tag-entry-container:hover {
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.7s;
}


.easter:hover {
    animation: deny cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-duration: 0.4s;
    transform-origin: bottom center;
}


.easter-entry:hover {
    animation: bumb linear 30;
    animation-delay: 2s;
    animation-duration: var(--easter-animation-time);
}

@keyframes deny {
    0% {
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        transform: translate(0, 0);
    }

    25% {
        transform: translate(-5%, 0) rotateY(30deg) rotateZ(-3deg);
    }

    75% {
        transform: translate(5%, 0) rotateY(-30deg) rotateZ(3deg);
        animation-timing-function: linear;
    }

}

/* calc要用空格隔开... */
/* @keyframes bumb {
    0% {
        transform: scale(calc(var(--easter-animation-scale) - 9.9));
    }

    100% {
        transform: scale(1.2);
    }
} */

@keyframes bumb {
    0% {
        transform: scale(calc(var(--easter-animation-scale) / 100 + 1));
    }

    25% {
        transform: translateX(-2px) scale(calc(var(--easter-animation-scale) / 100 + 1));
    }

    75% {
        transform: translateX(2px) scale(calc(var(--easter-animation-scale) / 100 + 1));
    }

    100% {
        /* --easter-animation-time: calc(-1 * var(--easter-animation-time) / 2) !important;
        --easter-animation-scale: calc(var(--easter-animation-scale) + 2) !important; */
        transform: scale(calc(var(--easter-animation-scale) / 100 + 1));
    }
}
</style>