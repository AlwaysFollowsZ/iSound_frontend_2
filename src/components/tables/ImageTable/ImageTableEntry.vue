<script>
import 'animate.css'
import { defineProps, ref, computed } from 'vue'
import { NButton, NEllipsis, NInput, NIcon, NIconWrapper, NTooltip, NPopover, NConfigProvider } from 'naive-ui'
import { MusicNote220Regular, BookStar20Regular, ShareCloseTray20Regular, Delete20Regular, ShareIos20Regular } from '@vicons/fluent'
import { LibraryMusicOutlined, PlaylistRemoveOutlined } from '@vicons/material'
import { getBackgroundColorString, getFontColorString, getThemeColorByImage } from '/src/colorMode'
// 从父级传入内容类型、图片路径、歌曲数（如有）、名字、图片大小、主题色等信息
export default {
    components: {
        MusicNote220Regular, BookStar20Regular, LibraryMusicOutlined, ShareCloseTray20Regular, Delete20Regular, PlaylistRemoveOutlined, ShareIos20Regular
    },
    data() {
        const themeColor = ref([])
        getThemeColorByImage(this.imagePath, themeColor)
        const imageSize = [(this.EntrySize[0] / 1.6), (this.EntrySize[1] / 1.6)]
        const imageSizeAvg = (imageSize[0] + imageSize[1]) / 2
        const fontSize = (imageSizeAvg) / 12
        const fontColorString = getFontColorString(themeColor)
        const themeColorString = getBackgroundColorString(themeColor)
        let isHoverOnBottom = ref(false)
        let isHoverOnTitle = ref(false)
        let isHoverOnMask = ref(false)
        let isClickOnMask = ref(false)
        let isHoverOnButton1 = ref(false)
        let isHoverOnButton2 = ref(false)
        return {
            themeColor, fontSize, fontColorString, themeColorString, isHoverOnBottom, isHoverOnMask, isClickOnMask, isHoverOnTitle,
            imageSizeAvg, imageSize, isHoverOnButton1, isHoverOnButton2,
        }
    },
    props: {
        //只有在个人主页的歌单/歌曲/收藏夹才能修改
        Edit: {
            type: Boolean,
            default: false
        },
        Key: {
            type: Number,
            required: true
        },
        //包括歌单、歌曲和收藏夹
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
        Singer: {
            type: String,
            default: 'Unknown'
        },
        EntrySize: {
            type: Array,
            default: [300, 300]
        },
    }
}

</script>
<template>
    <div class="outer_box" :style="{
        'width': `${EntrySize[0]}px`,
        'height': `${EntrySize[1]}px`,
    }">
        <!-- 大盒子的动态属性有背景色和宽高 -->
        <div class="mask_box" :style="{
            'width': `${imageSize[0] + 4}px`,//适应边框大小
            'height': `fit-content`,
            'border-radius': `${imageSizeAvg / 10}px`,
            'background-color': isHoverOnMask ? `rgb(${themeColorString},0.5)` : `rgb(${themeColorString},0.2)`,
            'box-shadow': isHoverOnMask ? `0 0 8px 3px rgb(${themeColorString},0.5)` : '',
            'border': isHoverOnMask ? `3px solid rgb(${themeColorString})` : `3px solid transparent`
        }" :class="[isHoverOnMask ? 'mask_box-hover' : '',
isClickOnMask ? 'mask_box-click' : '']" @mouseenter="isHoverOnMask = true" @mouseleave="isHoverOnMask = false"
            @mousedown="isClickOnMask = true" @mouseup="isClickOnMask = false" @click="$emit('clickEntry', Key)">
            <!-- 动态属性为图片路径 -->
            <div class="image" :style="{
                'background-image': `url(${imagePath})`,
                'width': `${imageSize[0]}px`,
                'height': `${imageSize[1]}px`,
                'border-radius': `${imageSizeAvg / 12}px`
            }">
                <div class="image_top" v-if="(isHoverOnMask && Edit)" :style="{
                    'animation': 'fadeIn',
                    'animation-duration': '0.7s',
                    'box-shadow': 'n-icon-wrapper',
                }">
                    <!-- 只有收藏夹有第二个图标 -->
                    <n-popover trigger="hover" v-if="Type === 'Collection'" :style="{
                        'border-radius': `${imageSizeAvg / 12}px`,
                        'font-weight': 700,
                        '--n-text-color': `rgb(${fontColorString})`,
                        '--n-color': `rgb(${themeColorString},0.8)`,
                        'font-size': `${fontSize / 1.5}px`,
                        'box-shadow': 'n-icon-wrapper',
                    }">
                        <template #trigger>
                            <n-icon-wrapper :size="imageSizeAvg / 8" :border-radius="imageSizeAvg / 20"
                                :color="`rgb(${themeColor},0.8)`" :style="{ 'margin': `0 ${imageSizeAvg / 30}px` }">
                                <n-icon :size="imageSizeAvg / 10">
                                    <share-ios20-regular v-if="Type === 'Collection'"
                                        @click.stop="$emit('shareCollection', Key)"></share-ios20-regular>
                                </n-icon>
                            </n-icon-wrapper>
                        </template>
                        分享为歌单
                    </n-popover>
                    <!-- 这是第一个图标 -->
                    <n-popover trigger="hover" :style="{
                        'border-radius': `${imageSizeAvg / 12}px`,
                        'font-weight': 700,
                        '--n-text-color': `rgb(${fontColorString})`,
                        '--n-color': `rgb(${themeColorString},0.8)`,
                        'font-size': `${fontSize / 1.5}px`,
                        'box-shadow': 'n-icon-wrapper'
                    }">
                        <template #trigger>
                            <n-icon-wrapper :size="imageSizeAvg / 8" :border-radius="imageSizeAvg / 20"
                                :color="`rgb(${themeColor},0.8)`" @mouseenter="isHoverOnButton1 = true"
                                @mouseleave="isHoverOnButton1 = false">
                                <n-icon :size="imageSizeAvg / 10">
                                    <share-close-tray20-regular v-if="Type === 'songList'"
                                        @click.stop="$emit('cancelShare', Key)"></share-close-tray20-regular>
                                    <delete20-regular v-if="Type === 'Song'"
                                        @click.stop="$emit('deleteUploadedSong', Key)"></delete20-regular>
                                    <playlist-remove-outlined v-if="Type === 'Collection'"
                                        @click.stop="$emit('deleteCollection', Key)"></playlist-remove-outlined>
                                </n-icon>
                            </n-icon-wrapper>
                        </template>
                        {{ Type === 'Song' ? '删除歌曲' : Type === 'songList' ? '取消分享' : '删除收藏夹' }}
                    </n-popover>
                </div>
                <!-- 底部显示歌曲数量  动态属性有背景色和宽高-->
                <div class="image_bottom" @mouseenter="isHoverOnBottom = true" @mouseleave="isHoverOnBottom = false">
                    <n-popover trigger="hover" :style="{
                        'border-radius': `${imageSizeAvg / 20}px`,
                        '--n-text-color': `rgb(${fontColorString})`,
                        '--n-color': `rgb(${themeColorString},0.8)`,
                        'font-size': `${fontSize / 1.5}px`,
                        'box-shadow': 'n-icon-wrapper',
                    }">
                        <template #trigger>
                            <n-icon-wrapper :style="{
                                'margin-right': `${imageSizeAvg > 300 ? imageSizeAvg / 10 : imageSizeAvg / 15}px`
                            }" :size="imageSizeAvg / 8" :border-radius="imageSizeAvg / 20"
                                :color="`rgb(${themeColor},0.9)`">
                                <n-icon :size="imageSizeAvg / 10">
                                    <library-music-outlined v-if="Type === 'songList'"></library-music-outlined>
                                    <music-note220-regular v-if="Type === 'Song'"></music-note220-regular>
                                    <book-star20-regular v-if="Type === 'Collection'"></book-star20-regular>
                                </n-icon>
                            </n-icon-wrapper>
                        </template>
                        {{ Type === 'Song' ? '这是一首歌曲' : Type === 'songList' ? '这是一个歌单' : '这是一个收藏夹' }}
                    </n-popover>
                    <transition name="count">
                        <span class="count" v-if="isHoverOnBottom && (['songList', 'Collection'].includes(Type))" :style="{
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
                // 'height': `${fontSize * 2}px`,
                'color': `rgb(${fontColorString})`,
                'text-shadow': isHoverOnTitle ?
                    `0 0 ${fontSize / 3}px rgb(${themeColorString})` : '',
                // 'padding': `${imageSize[0] / 20}px ${imageSize[0] / 50}px ${imageSize[0] / 30}px ${imageSize[0] / 50}px`,
                'margin': '5px auto'
            }" :class="isHoverOnTitle ? 'title-hover' : ''">
                <n-ellipsis :style="{
                    'display': 'block',
                    'margin': '0 auto',
                    'font-size': `${fontSize}px`,
                    'vertical-align': 'top',
                    'height': `${fontSize * 2}px`,
                    'max-width': `${imageSize[0] * 0.8}px`
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
                    <span @mouseenter="isHoverOnTitle = true" @mouseleave="isHoverOnTitle = false">{{ Name }}</span>
                </n-ellipsis>

                <n-ellipsis :style="{
                    'color': `rgba(${fontColorString},0.5)`,
                    'font-size': `${fontSize / 1.5}px`,
                    'vertical-align': 'top',
                    'height': `${fontSize}px`,
                    'max-width': `${imageSize[0] * 0.6}px`
                }" :tooltip="{
    style: {
        '--n-text-color': `rgb(${fontColorString})`,
        '--n-color': `rgb(${themeColorString},0.8)`,
        'border': `3px solid rgb(${themeColorString})`,
        'border-radius': '10px',
        'padding': `${imageSize[0] / 50}px ${imageSize[1] / 50}px`,
        '--n-box-shadow': `0 0 5px 5px rgb(${themeColorString},0.3)`,
    },
}">
                    <template #tooltip>

                        歌手 : {{ Singer }}
                    </template>
                    <span @mouseenter="isHoverOnTitle = true" @mouseleave="isHoverOnTitle = false">{{ Singer }}</span>
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
    display: inline-block;
    position: relative;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.image_top {
    position: absolute;
    right: 0;
    top: 0;
    height: fit-content;
}

.image_bottom {
    font-weight: 700;
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
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto auto;
    display: inline-block;
    transition: all cubic-bezier(0.165, 0.74, 0.44, 0.78) 0.5s;
}

.mask_box-hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s;
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

.singer_box {
    font-weight: 300;
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