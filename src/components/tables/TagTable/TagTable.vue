<template>
    <div :style="{ width: this.width + 'px' }">
        <n-grid :y-gap="16">
            <n-gi :span="24">
                <div v-for="(content, idx) in contents" :key="idx" :style="{ 'display': 'inline-block' }">
                    <div class="tag-entry-container" :style="getTagStyle(idx)" @mouseenter="idx===31?'':isHoverOnTag[idx] = true"
                        @mouseleave="idx === 31 ? '' : isHoverOnTag[idx] = false">
                        <tag-entry :index="idx" :content="content" :color-display="this.colorMode === 'white' ?
                            (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 0.3)' : 'rgba(' + this.accentColor + ', 0.5)') :
                            (idx % 2 === 0 ? '#5f5c5c' : '#bcbbbb')" :color-hover="this.colorMode === 'white' ?
        (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 0.6)' : 'rgba(' + this.accentColor + ', 0.65)') :
        (idx % 2 === 0 ? '#373333' : '#373333')"
                            :color-text="this.colorMode === 'white' ?
                                (idx % 2 === 0 ? 'rgb(' + this.accentColor + ')' : 'white') :
                                (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 1)' : 'rgba(' + this.accentColor + ', 0.9)')"
                            :should-animate="shouldAnimate" @click="handleClickTag(content)" @mouseenter="idx !== 31 ? '' : isHoverOnTag[idx] = true"
                            @mouseleave="idx !== 31 ? '' : isHoverOnTag[idx] = false"/>
                    </div>
                </div>
            </n-gi>
        </n-grid>
    </div>
</template>

<script>
import TagEntry from './TagEntry.vue'
import { mapState } from 'vuex'
import { getFontColorString, getBackgroundColorString, getRGBString, globalThemeColor } from '/src/colorMode.js'
export default {
    name: 'TagTable',
    components: {
        TagEntry,
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
        let isHoverOnTag = new Array(32)
        isHoverOnTag.forEach((i) => {
            i = false
        })
        return {
            isHoverOnTag,
            getFontColorString,
            getBackgroundColorString,
            getRGBString,
            globalThemeColor,
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
            this.$router.push("/tags/" + tagName);
            console.log(`push to search the tag: ${tagName}`);
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
                        'transform': 'scale(1.3)'
                    }
                }
                else {//其他标签
                    return {
                        // 'height': '80px',
                        // 'width': `${140-Math.abs(hoverIndex-index)*10}px'`,
                        'margin': `0 ${15 - Math.abs(hoverIndex - index)*2}px`
                    }
                }
            }

        }
    }
}
</script>

<style>
.tag-entry-container {
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
    height: 70px;
    width: 150px;
    margin:0 10px;
    display: inline-block;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.tag-entry-container:hover {
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.7s;
}
</style>