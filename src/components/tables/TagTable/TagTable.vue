<template>
    <div :style="{ width: this.width + 'vw'}">
        <n-grid :y-gap="12">
            <n-gi :span="3" v-for="(content, idx) in contents" :key="idx">
                <div class="tag-entry-container">
                    <tag-entry 
                        :content="content"
                        :color-display="idx % 2 === 0 ? 
                                        this.getRGBString(this.getFontColorString(this.globalThemeColor, 80).value, 0.6) :
                                        this.getRGBString(this.getBackgroundColorString(this.globalThemeColor).value, 0.6)"
                        :color-hover="idx % 2 === 0 ? 
                                      this.getRGBString(this.getFontColorString(this.globalThemeColor, 80).value, 0.9) :
                                      this.getRGBString(this.getBackgroundColorString(this.globalThemeColor).value, 0.9)"
                        :color-text="idx % 2 === 0 ? 
                                     this.getRGBString(this.getBackgroundColorString(this.globalThemeColor).value, 0.9) :
                                     this.getRGBString(this.getFontColorString(this.globalThemeColor, 80).value, 0.9)"
                    />
                </div>
            </n-gi>
        </n-grid>
    </div>
</template>

<script>
import TagEntry from './TagEntry.vue';
import { getFontColorString, getBackgroundColorString, getRGBString, globalThemeColor } from '/src/colorMode.js'
export default {
    name: 'TagTable',
    components: {
        TagEntry,
    },
    props: {
        width: Number,
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