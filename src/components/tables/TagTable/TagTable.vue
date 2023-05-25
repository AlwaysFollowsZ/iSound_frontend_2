<template>
    <div :style="{ width: this.width + 'px'}">
        <n-grid :y-gap="16">
            <n-gi :span="3" v-for="(content, idx) in contents" :key="idx">
                <div class="tag-entry-container">
                    <tag-entry 
                        :index="idx"
                        :content="content"
                        :color-display="this.colorMode === 'white' ? 
                                        (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 0.3)': 'rgba(' + this.accentColor + ', 0.5)') : 
                                        (idx % 2 === 0 ? '#908e8e' : '#bcbbbb')"
                        :color-hover="this.colorMode === 'white' ?
                                      (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 0.6)' : 'rgba(' + this.accentColor + ', 0.65)') : 
                                      (idx % 2 === 0 ? '#373333' : '#373333')"
                        :color-text="this.colorMode === 'white' ?
                                     (idx % 2 === 0 ? 'rgb(' + this.accentColor + ')' : 'white') : 
                                     (idx % 2 === 0 ? 'rgba(' + this.accentColor + ', 1)' : 'rgba(' + this.accentColor + ', 0.9)')"
                        :should-animate="shouldAnimate"
                    />
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
        return {
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
}
</script>

<style>
.tag-entry-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>