<script>
import { defineProps, ref, computed } from 'vue'
import { NButton, NEllipsis, NInput, NIcon, NIconWrapper, NTooltip, NPopover, NConfigProvider } from 'naive-ui'
import { MusicNote220Regular, BookStar20Regular } from '@vicons/fluent'
import { LibraryMusicOutlined } from '@vicons/material'
import { getBackgroundColorString, getFontColorString, getThemeColorByImage } from '/src/colorMode'
// 从父级传入内容类型、图片路径、歌曲数（如有）、名字、图片大小、主题色等信息
export default {
    components: {
        MusicNote220Regular, BookStar20Regular, LibraryMusicOutlined
    },
    data() {
        const themeColor = ref([])
        getThemeColorByImage(this.imagePath, themeColor)
        const imageSize = [(this.EntrySize[0] / 1.6), (this.EntrySize[1] / 1.6)]
        const imageSizeAvg = (imageSize[0] + imageSize[1]) / 2
        const fontSize = (imageSizeAvg) / 12
        const fontColorString = getFontColorString(themeColor)
        const themeColorString = getBackgroundColorString(themeColor)
        const isHoverOnBottom = ref(false)
        const isHoverOnTitle = ref(false)
        const isHoverOnMask = ref(false)
        const isClickOnMask = ref(false)
        return {
            themeColor, fontSize, fontColorString, themeColorString, isHoverOnBottom, isHoverOnMask, isClickOnMask, isHoverOnTitle,
            imageSizeAvg, imageSize
        }
    },
    props: {
        Key: {
            type: Number,
            required: true
        },
        Type: {
            type: String,
            default: 'songList',
            validator(value) {
                return ['songList', 'Song', 'Collection'].includes(value)
            }
        },
        imagePath: {
            type: String,
            default: '/src/assets/song1.jpg'
        },
        songCount: {
            type: Number,
            default: 0,
            validator(value) {
                return value >= 0
            }
        },
        Name: {
            type: String,
            default: 'songName1265434567'
        },
        EntrySize: {
            type: Array,
            default: [250, 250]
        },
    }
}

</script>
<template>
    <div class="outer_box" :style="{
        'width': `${EntrySize[0]}px`,
        'height': `${EntrySize[1]}px`
    }">
        <!-- 大盒子的动态属性有背景色和宽高 -->
        <div class="mask_box" :style="{
            'padding': `${imageSize[1] / 8}px ${imageSize[0] / 6}px ${imageSize[1] / 10}px ${imageSize[0] / 6}px`,
            'border-radius': `${imageSizeAvg / 10}px`,
            'background-color': isHoverOnMask ? `rgb(${themeColorString},0.8)` : `rgb(${themeColorString},0.5)`,
            'box-shadow': isHoverOnMask ? `0 0 8px 3px rgb(${themeColorString},0.8)` : '',
            'border': isHoverOnMask ? `3px solid rgb(${themeColorString})` : `0 solid rgb(${themeColorString},0.7)`
        }" :class="[isHoverOnMask ? 'mask_box-hover' : '',
isClickOnMask ? 'mask_box-click' : '']" @mouseenter="isHoverOnMask = true" @mouseleave="isHoverOnMask = false"
            @mousedown="isClickOnMask = true" @mouseup="isClickOnMask = false" @click="$emit('clickEntry', Key)">
            <!-- 动态属性为图片路径 -->
            <div class="image" :style="{
                'background-image': `url(${imagePath})`,
                'width': `${imageSize[0]}px`,
                'height': `${imageSize[1]}px`,
                'border-radius': `${imageSizeAvg / 15}px`
            }">
                <!-- 底部显示歌曲数量  动态属性有背景色和宽高-->
                <div class="image_bottom" @mouseenter="isHoverOnBottom = true" @mouseleave="isHoverOnBottom = false">
                    <n-popover trigger="hover" :style="{
                        'border-radius': `${imageSizeAvg / 20}px`,
                        'font-weight': 700,
                        '--n-text-color': `rgb(${fontColorString})`,
                        '--n-color': `rgb(${themeColorString},0.8)`,
                        'font-size': `${fontSize / 1.5}px`,
                        'box-shadow': 'n-icon-wrapper'
                    }">
                        <template #trigger>
                            <n-icon-wrapper :style="{
                                'margin-right': `${imageSizeAvg > 300 ? imageSizeAvg / 10 : imageSizeAvg / 15}px`
                            }" :size="imageSizeAvg / 8" :border-radius="imageSizeAvg / 20"
                                :color="`rgb(${themeColor},0.9)`">
                                <n-icon v-if="Type === 'songList'"
                                    :size="imageSizeAvg / 10"><library-music-outlined></library-music-outlined></n-icon>
                                <n-icon v-if="Type === 'Song'"
                                    :size="imageSizeAvg / 10"><music-note220-regular></music-note220-regular></n-icon>
                                <n-icon v-if="Type === 'Collection'"
                                    :size="imageSizeAvg / 10"><book-star20-regular></book-star20-regular></n-icon>
                            </n-icon-wrapper>
                        </template>
                        {{ Type === 'Song' ? '这是一首歌曲' : '这是一个歌单' }}
                    </n-popover>
                    <transition name="count">
                        <span class="count" v-if="isHoverOnBottom && Type === 'songList'" :style="{
                            'color': `rgb(${fontColorString},0.9)`,
                            'font-size': `${fontSize}px`,
                            'line-height': `${imageSizeAvg / 10}px`,
                            'background-color': `rgb(${themeColorString},0.8)`,
                            'border-radius': `${imageSizeAvg / 20}px`,
                            'padding': `${imageSize[0] / 50}px ${imageSize[1] / 30}px`
                        }">
                            歌曲数量 : {{ songCount }}
                        </span>
                    </transition>
                </div>
            </div>
            <div class="title_box" :style="{
                'height': `${fontSize * 2}px`,
                'color': `rgb(${fontColorString})`,
                'text-shadow': isHoverOnTitle ?
                    `0 0 ${fontSize / 3}px rgb(${themeColorString})` : '',
                'padding': `${imageSize[0] / 20}px ${imageSize[0] / 50}px ${imageSize[0] / 30}px ${imageSize[0] / 50}px`,
            }" :class="isHoverOnTitle ? 'title-hover' : ''" @mouseenter="isHoverOnTitle = true"
                @mouseleave="isHoverOnTitle = false">
                <n-ellipsis :style="{
                    'font-size': `${fontSize}px`,
                    'vertical-align': 'top',
                    'height': `${fontSize * 2}px`,
                    'max-width':`${imageSize[0]}px`
                }" :tooltip="{
    style: {
        '--n-text-color': `rgb(${fontColorString})`,
        '--n-color': `rgb(${themeColorString},0.8)`,
        'border': `3px solid rgb(${themeColorString})`,
        'font-weight': '700',
        'border-radius': '10px',
        'padding': `${imageSize[0] / 50}px ${imageSize[1] / 50}px`,
        '--n-box-shadow': `0 0 5px 5px rgb(${themeColorString},0.3)`,
    },
}">
                    <template #tooltip>
                        {{ Type === 'Song' ? '歌曲名称 : ' : '歌单名称 : ' }}{{ Name }}
                    </template>
                    {{ Name }}
                </n-ellipsis>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.image {
    position: relative;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.image_bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    height: fit-content;
}

.outer_box {
    position: relative;
    display: inline-block;
}

.mask_box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto auto;
    width: fit-content;
    height: fit-content;
    display: inline-block;
    transition: all cubic-bezier(0.165, 0.74, 0.44, 0.78) 0.8s;
}

.mask_box-hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}

.mask_box-click {
    transform: scale(0.99);
    transition: all cubic-bezier(0.3, 0.04, 0.75, 0.432) 0.1s;
}


.title_box {
    font-weight: 700;
    text-align: center;
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}

.title-hover {
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.25s;
}

.count {
    width: max-content;
    position: absolute;
    top: 0;
}

.count-enter-active,
.count-leave-active {
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.count-enter-from,
.count-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>