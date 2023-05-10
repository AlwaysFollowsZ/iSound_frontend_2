<script setup>
import { defineProps, ref} from 'vue'
import { NButton, NEllipsis, NInput,NIcon,NIconWrapper } from 'naive-ui'
import { MusicNote220Regular } from '@vicons/fluent' 
import { LibraryMusicOutlined } from '@vicons/material'
import { getThemeColorString, getFontColorString} from '/src/colorMode'
// 从父级传入内容类型、图片路径、歌曲数（如有）、名字、图片大小、主题色等信息

const { Type, imagePath, songCount, Name, imageSize, themeColor} = defineProps({
    Type: {
        type: String,
        default: 'songList',
        validator(value) {
            return ['songList','Song'].includes(value)
        }
    },
    imagePath: {
        type: String,
        default: '/src/assets/logo.svg'
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
    imageSize: {
        type: Number,
        default:250
    },
    themeColor:{
        type:Array,
        default:[128,128,128]
    },
})

const fontSize = imageSize > 300 ? imageSize / 15 : imageSize / 10
const fontColorString = getFontColorString(themeColor)
const themeColorString = getThemeColorString(themeColor)
const isHoverOnBottom = ref(false)
const isHoverOnTitle = ref(false)
const isHoverOnMask = ref(false)
const isClickOnMask = ref(false)


</script>
<template>
    <div class="outer_box"
        :style="{'width': `${(imageSize + 50) * 1.4}px`,
            'height': `${(imageSize + 100) * 1.4}px`}">
        <!-- 大盒子的动态属性有背景色和宽高 -->
        <div class="mask_box" 
            :style="{
                'padding': `${imageSize / 8}px ${imageSize / 6}px ${imageSize / 10}px ${imageSize / 6}px`,
                'border-radius': `${imageSize / 10}px`,
                'background-color':isHoverOnMask? `rgb(${themeColorString},0.5)`:`rgb(${themeColorString},0.1)`,
                'box-shadow':isHoverOnMask? `0 0 8px 3px rgb(${themeColorString},0.8)`:'',
                'border':isHoverOnMask? `3px solid rgb(${themeColorString})`:`3px dashed rgb(${themeColorString},0.7)`
            }"
            :class="[isHoverOnMask?'mask_box-hover':'',
                    isClickOnMask?'mask_box-click':'']"
            @mouseenter="isHoverOnMask=true"
            @mouseleave="isHoverOnMask=false"
            @mousedown="isClickOnMask=true"
            @mouseup="isClickOnMask=false">
                <!-- 动态属性为图片路径 -->
                <div class="image" :style="{
                    'background-image': `url(${imagePath})`,
                    'width': `${imageSize}px`,
                }">
                    <!-- 底部显示歌曲数量  动态属性有背景色和宽高-->
                    <div class="image_bottom"
                    @mouseenter="isHoverOnBottom=true"
                    @mouseleave="isHoverOnBottom=false">
                        <n-icon-wrapper :style="{
                            'margin-right': `${imageSize > 300 ? imageSize / 10 : imageSize / 15}px`
                        }" 
                        :size="imageSize/8" 
                        :border-radius="imageSize/20"
                        :color="`rgb(${themeColor},0.9)`">
                            <n-icon  
                            :component="Type === 'songList'?LibraryMusicOutlined:MusicNote220Regular" 
                            :size="imageSize/10"></n-icon>
                        </n-icon-wrapper>
                        <transition name="count">
                            <span class="count" 
                            v-if="isHoverOnBottom && Type==='songList'"
                            :style="{
                                'color': `rgb(${fontColorString},0.9)`,
                                'font-size': `${fontSize}px`,
                                'line-height': `${imageSize / 10}px`
                            }">{{ songCount }}</span>
                        </transition>
                        
                    </div>
                </div>
                <div class="title_box" 
                :style="{
                    'width': `${imageSize}px`,
                    'color': `rgb(${fontColorString})`,
                    'text-shadow':isHoverOnTitle?
                     `0 0 ${fontSize / 3}px rgb(${themeColorString})` :''
                }"
                :class="isHoverOnTitle?'title-hover':''"
                @mouseenter="isHoverOnTitle=true"
                @mouseleave="isHoverOnTitle=false">
                <n-ellipsis :style="{'font-size': `${fontSize}px`}">
                    <!-- tooltip动态属性:背景色 -->
                    <template #tooltip>
                        <div class="title_tooltip" :style="{
                            'color': `rgb(${fontColorString})`,
                            'font-weight': '700'
                        }">
                            {{(Type==='Song')?'歌曲名称':'歌单名称'}} : {{ Name }}
                        </div>
                    </template>
                {{ Name }}
            </n-ellipsis></div>
        </div>
    </div>
</template>

<style scoped>
*{
    padding: 0;
    margin: 0;
}

.image{
    position: relative;
    aspect-ratio: 1;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.image_bottom{
    position: absolute;
    left: 0;
    bottom: 0;
    height: fit-content;
}

.outer_box{
    position: relative;
    display: inline-block;
}
.mask_box{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin: auto auto;
    width: fit-content;
    height: fit-content;
    display: inline-block;
    transition: all cubic-bezier(0.165, 0.74, 0.44, 0.78) 1s;
}
.mask_box-hover{
    cursor: pointer;
    transform: scale(1.02);
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}

.mask_box-click{
    transform: scale(0.99);
    transition: all cubic-bezier(0.3, 0.04, 0.75, 0.432) 0.1s;
}


.title_box{
    font-weight: 700;
    text-align: center;
    padding: 15px 10px 5px 10px;
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}
.title-hover{
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.25s;
}


.count{
    height: 100%;
    position: absolute;
    top:0;
}

.count-enter-active,
.count-leave-active{
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.count-enter-from,
.count-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}


</style>