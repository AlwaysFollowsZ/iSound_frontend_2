<script>
import { defineProps, ref, computed } from 'vue'
import { NButton, NEllipsis, NInput, NIcon, NIconWrapper, NTooltip, NPopover } from 'naive-ui'
import { MusicNote220Regular,CalendarStar20Regular } from '@vicons/fluent'
import { LibraryMusicOutlined } from '@vicons/material'
import { getBackgroundColorString, getFontColorString, getThemeColorByImage } from '/src/colorMode'
import { getRGBString } from '/src/colorMode'
// 从父级传入内容类型、图片路径、歌曲数（如有）、名字、图片大小、主题色等信息
export default {
    components: {
        MusicNote220Regular,LibraryMusicOutlined,CalendarStar20Regular
    },
    data() {
        const themeColor = ref([])
        getThemeColorByImage(this.imagePath, themeColor)
        const imageSizeAvg = (this.imageSize[0] + this.imageSize[1]) / 2
        //图片长宽平均值
        const fontSize = (imageSizeAvg) / 12
        const fontColorString = getFontColorString(themeColor)
        const themeColorString = getBackgroundColorString(themeColor)
        const isHoverOnBottom = ref(false)
        const isHoverOnTitle = ref(false)
        const isHoverOnMask = ref(false)
        const isClickOnMask = ref(false)
        return {
            themeColor, fontSize, fontColorString, themeColorString, isHoverOnBottom, isHoverOnMask, isClickOnMask, isHoverOnTitle,
            imageSizeAvg,getRGBString
        }
    },
    props: {
        //传入歌曲/收藏夹/歌单id以触发emit
        Key: {
            type: Number,
            required: true
        },
        //类型包括歌单、收藏夹、歌曲
        Type: {
            type: String,
            default: 'songList',
            validator(value) {
                return ['songList', 'Song', 'Collection'].includes(value)
            }
        },
        //图片路径
        imagePath: {
            type: String,
            default: '/src/assets/song1.jpg'
        },
        // 歌曲数量(仅在Type为songList和Collection时有效)
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
        //图片宽高
        imageSize: {
            type: Array,
            default: [250, 250]
        },
    }
}




</script>
<template>
    <div class="outer_box" :style="{
        'width': `${(imageSize[0] + 50) * 1.4}px`,
        'height': `${(imageSize[1] + 100) * 1.4}px`
    }">
        <!-- 大盒子的动态属性有背景色和宽高 -->
        <div class="mask_box" :style="{
            'padding': `${imageSizeAvg / 8}px ${imageSizeAvg / 6}px ${imageSizeAvg / 10}px ${imageSizeAvg / 6}px`,
            'border-radius': `${imageSizeAvg / 10}px`,
            'background-color': isHoverOnMask ? `rgb(${themeColorString},0.8)` : `rgb(${themeColorString},0.5)`,
            'box-shadow': isHoverOnMask ? `0 0 8px 3px rgb(${themeColorString},0.8)` : '',
            'border': isHoverOnMask ? `3px solid rgb(${themeColorString})` : `3px dashed rgb(${themeColorString},0.7)`
        }" :class="[isHoverOnMask ? 'mask_box-hover' : '',
isClickOnMask ? 'mask_box-click' : '']" @mouseenter="isHoverOnMask = true" @mouseleave="isHoverOnMask = false"
            @mousedown="isClickOnMask = true" @mouseup="isClickOnMask = false" @click="$emit('clickEntry', Key)">
            <!-- 动态属性为图片路径 -->
            <div class="image" :style="{
                'background-image': `url(${imagePath})`,
                'width': `${imageSize[0]}px`,
                'height':`${imageSize[1]}px`,
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
                        'box-shadow': `0 0 5px 2px ${getRGBString(themeColorString)}`
                    }">
                        <template #trigger>
                            <n-icon-wrapper :style="{
                                'margin-right': `${imageSizeAvg > 300 ? imageSizeAvg / 10 : imageSizeAvg / 15}px`
                            }" :size="imageSizeAvg / 8" :border-radius="imageSizeAvg / 20" :color="getRGBString(themeColorString,0.9)">
                                <n-icon :component="Type === 'songList' ? LibraryMusicOutlined : MusicNote220Regular"
                                    :size="imageSizeAvg / 10" >
                                <library-music-outlined v-if="Type === 'songList'"></library-music-outlined>
                                <music-note220-regular v-if="Type==='Song'"></music-note220-regular>
                                <calendar-star20-regular v-if="Type==='Collection'"></calendar-star20-regular>
                                </n-icon>
                            </n-icon-wrapper>
                        </template>
                        {{ Type === 'Song' ? '这是一首歌曲' : Type === 'songList' ? '这是一个歌单' : '这是一个收藏夹' }}
                    </n-popover>
                    <transition name="count">
                        <span class="count" v-if="isHoverOnBottom && Type !== 'SongList'" :style="{
                            'color': `rgb(${fontColorString},0.9)`,
                            'font-size': `${fontSize}px`,
                            'line-height': `${imageSizeAvg / 10}px`,
                            'background-color': `rgb(${themeColorString},0.8)`,
                            'border-radius': `${imageSizeAvg / 20}px`,
                            'padding': `${imageSizeAvg / 50}px ${imageSizeAvg / 30}px`
                        }">
                            歌曲数量 : {{ songCount }}
                        </span>
                    </transition>

                </div>
            </div>
            <div class="title_box" :style="{
                'width': `${imageSize[0]}px`,
                'color': `rgb(${fontColorString})`,
                'text-shadow': isHoverOnTitle ?
                    `0 0 ${fontSize / 3}px rgb(${themeColorString})` : ''
            }" :class="isHoverOnTitle ? 'title-hover' : ''" @mouseenter="isHoverOnTitle = true"
                @mouseleave="isHoverOnTitle = false">
                <n-ellipsis :style="{ 'font-size': `${fontSize}px` }" :tooltip="{
                    style: {
                        '--n-text-color': `rgb(${fontColorString})`,
                        '--n-color': `rgb(${themeColorString},0.8)`,
                        'border': `3px solid rgb(${themeColorString})`,
                        'font-weight': '700',
                        'border-radius': '10px',
                        'padding': '5px 10px',
                        '--n-box-shadow': `0 0 5px 5px rgb(${themeColorString},0.3)`
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
    /* aspect-ratio: 1; */
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
    transition: all cubic-bezier(0.165, 0.74, 0.44, 0.78) 1s;
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
    padding: 15px 10px 5px 10px;
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}

.title-hover {
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.25s;
}

.count {
    width: max-content;
    padding: 5px 10px;
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