<template>
    <n-modal :show="showUploadSong" :style="{ 'background-color': BoxColorString }" :block-scroll="false" :z-index="1">
        <div class="outer-container">

            <div class="title-container">
                <div style="margin-bottom: 30px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="upload-card-title" :style="{ 'color': fontColorString }">上传歌曲：编织你的音乐篇章</div>
                        </n-gi>
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="closeUWindow"
                                :style="{ 'color': fontColorString }">
                                <n-icon size="40"><close-outline /></n-icon>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <div class="body-container">
                <n-grid>
                    <n-gi :span="9">
                        <n-popover trigger="hover" class="cover-prompt" :style="{ 'color': fontColorString }">
                            <template #trigger>
                                <div class="upload-song-page">
                                    <div :style="{
                                        'display': 'flex',
                                        'justify-content': 'center',
                                        'align-items': 'center',
                                        'border-radius': '10px',
                                        'background':fontColorSlight,
                                        'border': `5px solid ${fontColorString}`,
                                        'height': '238px',
                                        'aspect-ratio': '1',
                                    }" v-if="this.songPageUrl === '/src/assets/upload-logo.png'" @click="uploadFile">
                                        <n-icon size="150" :color="fontColorString"><image-outline /></n-icon>
                                    </div>
                                    <img v-else style="border-radius: 10px;" :src="this.songPageUrl" @click="uploadFile" />
                                    <input type="file" ref="fileInput" style="display: none" accept="image/*"
                                        @change="handleSongPageChange" />
                                </div>
                            </template>
                            点击此处上传歌曲封面</n-popover>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="2"></n-gi>
                                <n-gi :span="22">
                                    <div class="body-item-title" :style="{
                                        'color': (accentColor === '0,0,0' || accentColor === '255,255,255') ? fontColorString : 'rgba(' + this.accentColor + ', 0.25)'
                                    }">分类标签</div>
                                    <n-select v-model:value="value" multiple :options="options" placeholder="为歌曲添加1～3个分类标签"
                                        max-tag-count="responsive" @update:value="handleUpdateValue" />
                                </n-gi>
                                <!-- <n-gi :span="3"></n-gi> -->
                            </n-grid>
                        </div>
                    </n-gi>
                    <n-gi :span="15">
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title" :style="{
                                        'color': (accentColor === '0,0,0' || accentColor === '255,255,255') ? fontColorString : 'rgba(' + this.accentColor + ', 0.25)'
                                    }" @click="testfunc">你需要上传歌曲文件</div>
                                    <div class="body-item-file-input">
                                        <n-button strong secondary type="primary" @click="uploadSongFile" :focusable="false"
                                            :style="{
                                                '--n-color':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        fontColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-color-hover':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        fontColorHover : 'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-pressed':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        fontColorPress : 'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-focus':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        fontColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-text-color':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        BackgroundColorString : 'rgba(' + this.accentColor + ', 1)',
                                                '--n-text-color-hover':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        BackgroundColorHover : 'rgba(' + this.accentColor + ', 1)',
                                                '--n-text-color-pressed':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        BackgroundColorPress : 'rgba(' + this.accentColor + ', 1)',
                                                '--n-text-color-focus':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        BackgroundColorString : 'rgba(' + this.accentColor + ', 1)',
                                                '--n-border': '2px solid transparent',
                                                '--n-border-hover': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    `2px solid  ${fontColorHover}` : '2px solid rgba(' + this.accentColor + ', 1)',
                                                '--n-border-pressed': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    `2px solid  ${fontColorPress}` : '2px solid rgba(' + this.accentColor + ', 1)',
                                                '--n-border-radius': '8px',
                                                '--n-height': '36px',
                                                '--n-font-size': '18px',
                                            }">
                                            {{ songFileName }}
                                        </n-button>
                                        <input type="file" accept="audio/*" ref="songFileInput"
                                            @change="handleSongSrcFileChange" style="display: none" />
                                    </div>
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title" :style="{
                                        'color': (accentColor === '0,0,0' || accentColor === '255,255,255') ? fontColorString : 'rgba(' + this.accentColor + ', 0.25)'
                                    }">你可以选择上传歌词文件</div>
                                    <div class="body-item-file-input">
                                        <n-button strong secondary type="primary" @click="uploadLyricFile"
                                            :focusable="false" :style="{
                                                '--n-color':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        fontColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-color-hover':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        fontColorHover : 'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-pressed':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        fontColorPress : 'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-focus':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        fontColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-text-color':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        BackgroundColorString : 'rgba(' + this.accentColor + ', 1)',
                                                '--n-text-color-hover':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        BackgroundColorHover : 'rgba(' + this.accentColor + ', 1)',
                                                '--n-text-color-pressed':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        BackgroundColorPress : 'rgba(' + this.accentColor + ', 1)',
                                                '--n-text-color-focus':
                                                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                        BackgroundColorString : 'rgba(' + this.accentColor + ', 1)',
                                                '--n-border': '1px solid transparent',
                                                '--n-border-hover': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    `2px solid  ${fontColorHover}` : '2px solid rgba(' + this.accentColor + ', 1)',
                                                '--n-border-pressed': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    `2px solid  ${fontColorPress}` : '2px solid rgba(' + this.accentColor + ', 1)',
                                                '--n-border-radius': '8px',
                                                '--n-height': '36px',
                                                '--n-font-size': '18px',
                                            }">
                                            {{ songLyricName }}
                                        </n-button>
                                        <input type="file" ref="songLyricInput" @change="handleSongLyricFileChange"
                                            style="display:  none" />
                                    </div>
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title" :style="{
                                        'color': (accentColor === '0,0,0' || accentColor === '255,255,255') ? fontColorString : 'rgba(' + this.accentColor + ', 0.25)'
                                    }">歌名</div>
                                    <n-input type="text" size="small" placeholder="你需要填写歌曲名称" :value="songName"
                                        @input="songName = $event" :style="{
                                            '--n-color':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    fontColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-color-focus':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    fontColorHover : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-text-color':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    BackgroundColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-caret-color':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    BackgroundColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    BackgroundColorString : '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                            '--n-border-radius': '8px',
                                            '--n-height': '40px',
                                            '--n-font-size': '16px',
                                            '--n-border':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    `2px solid ${fontColorString}` : '2px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    `0 0 0 2px ${fontColorHover}` : '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                            '--n-icon-size': '25px',
                                        }" />
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title" :style="{
                                        'color': (accentColor === '0,0,0' || accentColor === '255,255,255') ? fontColorString : 'rgba(' + this.accentColor + ', 0.25)'
                                    }">歌手</div>
                                    <n-input type="text" size="small" placeholder="佚名" :value="songAuthor"
                                        @input="songAuthor = $event" :style="{
                                            '--n-color':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    fontColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-color-focus':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    fontColorHover : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-text-color':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    BackgroundColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-caret-color':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    BackgroundColorString : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    BackgroundColorString : '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                            '--n-border-radius': '8px',
                                            '--n-height': '40px',
                                            '--n-font-size': '16px',
                                            '--n-border':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    `2px solid ${fontColorString}` : '2px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus':
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                                    `0 0 0 2px ${fontColorHover}` : '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                            '--n-icon-size': '25px',
                                        }" />
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                    </n-gi>
                </n-grid>
            </div>
            <div style="margin-top: 20px;">
                <n-grid class="login-button-top">
                    <n-gi :span="4"></n-gi>
                    <n-gi :span="4" style="display: flex; justify-content: right">
                        <n-button strong secondary type="success" @click="submitUpload" :focusable="false" :style="{
                            '--n-color':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    fontColorString : 'rgba(' + this.accentColor + ', 0.25)',
                            '--n-color-hover':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    fontColorHover : 'rgba(' + this.accentColor + ', 0.45)',
                            '--n-color-pressed':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    fontColorPress : 'rgba(' + this.accentColor + ', 0.45)',
                            '--n-color-focus':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    fontColorString : 'rgba(' + this.accentColor + ', 0.25)',
                            '--n-text-color':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    BackgroundColorString : 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-hover':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    BackgroundColorHover : 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-pressed':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    BackgroundColorPress : 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-focus':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    BackgroundColorString : 'rgba(' + this.accentColor + ', 1)',
                            '--n-border': '1px solid transparent',
                            '--n-border-hover': '1px solid transparent',
                            '--n-border-pressed': '1px solid transparent',
                            '--n-border-radius': '5px',
                            '--n-width': '64px',
                            '--n-height': '39px',
                            '--n-font-size': '18px',
                        }">
                            上传
                        </n-button>
                    </n-gi>
                    <n-gi :span="8"></n-gi>
                    <n-gi :span="4" style="display: flex; justify-content: left">
                        <n-button strong secondary type="Warning" @click="closeUWindow" :style="{
                            '--n-color':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    BackgroundColorString : 'rgba(' + this.accentColor + ', 0.25)',
                            '--n-color-hover':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    BackgroundColorHover : 'rgba(' + this.accentColor + ', 0.45)',
                            '--n-color-pressed':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    BackgroundColorPress : 'rgba(' + this.accentColor + ', 0.45)',
                            '--n-color-focus':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    BackgroundColorString : 'rgba(' + this.accentColor + ', 0.25)',
                            '--n-text-color':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    fontColorString : 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-hover':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    fontColorHover : 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-pressed':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    fontColorPress : 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-focus':
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                                    fontColorString : 'rgba(' + this.accentColor + ', 1)',
                            '--n-border': '1px solid transparent',
                            '--n-border-hover': '1px solid transparent',
                            '--n-border-pressed': '1px solid transparent',
                            '--n-border-radius': '5px',
                            '--n-width': '64px',
                            '--n-height': '39px',
                            '--n-font-size': '18px',
                        }">
                            取消
                        </n-button>
                    </n-gi>
                    <n-gi :span="4"></n-gi>
                </n-grid>
            </div>
        </div>
        <!-- <div style="background-color:aliceblue">
            <n-card style="width: 800px; --n-border-radius: 20px;" :bordered="false" :role="dialog" aria-modal="true">
                <template #header>
                    <div>
                        <n-grid :x-gap="12">
                            <n-gi :span="2"></n-gi>
                            <n-gi :span="20">
                                <span class="modify-title">请上传您的歌曲</span>
                            </n-gi>
                            <n-gi :span="2">
                                <div style="padding-top: 30%" @click="closeUWindow">
                                    <close-outline />
                                </div>
                            </n-gi>
                        </n-grid>
                    </div>
                </template>
                <n-grid x-gap="12" :cols="2">
                    <n-gi>
                        <n-popover trigger="hover">
                            <template #trigger>
                                <div class="upload-song-page">
                                    <img :src="songPageUrl" @click="uploadFile" />
                                    <input type="file" ref="fileInput" style="display: none"
                                    accept="image/*"    
                                    @change="handleSongPageChange" />
                                </div>
                            </template>
                            <span>点击此处上传歌曲封面</span>
                        </n-popover>
                    </n-gi>
                    <n-gi>
                        <div>
                            <span>歌曲文件</span>
                            <n-space>
                                <input type="file" @change="handleSongSrcFileChange" />
                            </n-space>
                        </div>
                        <div>
                            <span>歌词文件</span>
                            <n-space>
                                <input type="file" @change="handleSongLyricFileChange" />
                            </n-space>
                        </div>
                        <div>
                            <span>歌名</span>
                            <n-input type="text" size="small" placeholder="请输入歌名" :value="songName"
                                @input="songName = $event" />
                        </div>
                        <div>
                            <span>歌手</span>
                            <n-input type="text" size="small" placeholder="请输入歌手" :value="songAuthor"
                                @input="songAuthor = $event" />
                        </div>
                        <div>
                            <span>标签选择</span>
                            <n-space vertical>
                                <n-select v-model:value="value" multiple :options="options" placeholder="请选择歌曲标签" max-tag-count="responsive"/>
                            </n-space>
                        </div>
                        <n-button strong secondary round type="primary" class="upload-button-position"
                            @click="submitUpload">
                            确认上传
                        </n-button>
                    </n-gi>
                </n-grid>
                <div class="modify-notice-text">
                    请上传符合社会主义核心价值观的歌曲
                </div>
            </n-card>
        </div> -->
    </n-modal>
</template>
  
<script>
import { CloseOutline, ArrowUpOutline, WatchOutline, ImageOutline } from '@vicons/ionicons5'
import { NInput, NModal, NPopover, NIcon } from 'naive-ui';
import { defineComponent, ref, watch } from "vue";
import { mapState } from 'vuex'
import { message } from "ant-design-vue";
import { getRGBString, getFontColorString, getBackgroundColorString, globalThemeColor } from '/src/colorMode.js'
export default {
    name: "UploadSong",
    components: {
        CloseOutline,
        ArrowUpOutline,
        ImageOutline,
        NInput,
        NModal
    },
    props: {
        showUploadSong: Boolean,
    },
    computed: {
        ...mapState(['accentColor', 'colorMode']),
        BoxColorString() {
            return getRGBString(getBackgroundColorString(globalThemeColor), 0.9)
        },
        BackgroundColorString() {
            return getRGBString(getBackgroundColorString(globalThemeColor), 0.8)
        },
        fontColorString() {
            return getRGBString(getFontColorString(globalThemeColor), 0.8)
        },
        fontColorHover() {
            return getRGBString(getFontColorString(globalThemeColor), 0.6)
        },
        BackgroundColorHover() {
            return getRGBString(getBackgroundColorString(globalThemeColor), 0.6)
        },
        fontColorPress() {
            return getRGBString(getFontColorString(globalThemeColor), 0.5)
        },
        BackgroundColorPress() {
            return getRGBString(getBackgroundColorString(globalThemeColor), 0.5)
        },
        fontColorSlight() {
            return getRGBString(getFontColorString(globalThemeColor), 0.4)
        }
    },
    data() {
        return {
            isUploading: false,
            previewImageUrl: '',
            songName: '',
            songAuthor: '',
            songSrcFile: null,
            songLyricFile: null,
            songPageFile: null,
            songPageUrl: '',
            value: [], // 存储所选内容的数组
            songFileName: '点击以上传音频文件',
            songLyricName: '点击以上传歌词文件',
            options: [
                { label: "华语", value: "tag0" },
                { label: "流行", value: "tag1" },
                { label: "民谣", value: "tag2" },
                { label: "轻音乐", value: "tag3" },
                { label: "电子", value: "tag4" },
                { label: "摇滚", value: "tag5" },
                { label: "日韩", value: "tag6" },
                { label: "粤语", value: "tag7" },
                { label: "舞曲", value: "tag8" },
                { label: "说唱", value: "tag9" },
                { label: "爵士", value: "tag10" },
                { label: "乡村", value: "tag11" },
                { label: "古典", value: "tag12" },
                { label: "民族", value: "tag13" },
                { label: "金属", value: "tag14" },
                { label: "古风", value: "tag15" },
                { label: "游戏", value: "tag16" },
                { label: "清晨", value: "tag17" },
                { label: "夜晚", value: "tag18" },
                { label: "学习", value: "tag19" },
                { label: "工作", value: "tag20" },
                { label: "午休", value: "tag21" },
                { label: "散步", value: "tag22" },
                { label: "下午茶", value: "tag23" },
                { label: "旅行", value: "tag24" },
                { label: "运动", value: "tag25" },
                { label: "怀旧", value: "tag26" },
                { label: "伤感", value: "tag27" },
                { label: "放松", value: "tag28" },
                { label: "浪漫", value: "tag29" },
                { label: "安静", value: "tag30" },
                { label: "思念", value: "tag31" },
            ],
            tagList: [],
            tagString: '', // 为了传给后端tag而设置的。
            warning(msg) {
                message.warning({
                    content: msg,
                    duration: 1,
                    style: {
                        "z-index": 2,
                    },
                });
            },
            success(msg) {
                message.success({
                    content: msg,
                    duration: 1,
                    style: {
                        "z-index": 2,
                    },
                });
            },
        }
    },
    setup() {
        return {
            error(msg) {
                message.error({
                    content: msg,
                    duration: 2,
                    style: {
                        "z-index": 101,
                    },
                });
            },
            warning(msg) {
                message.warning({
                    content: msg,
                    duration: 2,
                    style: {
                        "z-index": 101,
                    },
                })
            },
        }
    },
    created() {
        this.songPageUrl = '/src/assets/upload-logo.png';
    },
    methods: {
        closeUWindow() {
            // === 关闭之前先清空内容 ===
            // === DO NOT MODIFY ===
            this.isUploading = false
            this.songName = ''
            this.songAuthor = ''
            this.songSrcFile = null
            this.songLyricFile = null
            this.songPageFile = null
            this.songPageUrl = '/src/assets/upload-logo.png'
            this.value = []
            this.songFileName = '点击以上传音频文件',
                this.songLyricName = '点击以上传歌词文件',
                this.$emit('closeUploadWindow');
            // location.reload();
        },
        uploadFile() {
            this.$refs.fileInput.click()
        },
        uploadSongFile() {
            this.$refs.songFileInput.click()
        },
        uploadLyricFile() {
            this.$refs.songLyricInput.click()
        },
        handleSongPageChange(e) {
            this.songPageFile = e.target.files[0];
            this.songPageUrl = URL.createObjectURL(this.songPageFile);
        },
        handleSongSrcFileChange(e) {
            this.songSrcFile = e.target.files[0];
            this.songFileName = this.songSrcFile.name
            console.log('change');
        },
        handleSongLyricFileChange(e) {
            this.songLyricFile = e.target.files[0];
            this.songLyricName = this.songLyricFile.name
        },
        submitUpload() {
            if (this.songSrcFile === null) {
                this.warning('请上传歌曲文件')
                return
            }
            if (this.value.length === 0) {
                this.warning('请选择歌曲标签( 1 ~ 3 个 )')
                return
            }
            if (this.isUploading === false) {
                this.isUploading = true
                this.handleTagList();
                console.log(this.tagString);
                let data = new FormData();
                data.append('title', this.songName);
                data.append('artist', this.songAuthor);
                data.append('cover', this.songPageFile);
                data.append('source', this.songSrcFile);
                data.append('lyrics', this.songLyricFile);
                data.append('tags', this.tagString);
                this.$http.post('/api/music/upload/', data).then(response => {
                    console.log(response);
                    if (response.data.code == '0') {
                        this.$emit('flushUploadSongs')//刷新歌曲
                        this.closeUWindow();
                        //this.success('上传歌曲成功!')
                    } else if (response.data.code == '-1') {
                        this.error('上传歌曲失败，请重新上传!');
                    }
                });
            }
            else {
                this.warning('正在上传歌曲，请稍后...')
            }
        },
        handleTagList() {
            this.tagList = [];
            this.value.forEach((value) => {
                const option = this.options.find((option) => option.value == value);
                if (option) {
                    this.tagList.push(option.label);
                }
            })
            this.tagString = this.tagList.join(' ');
            console.log(this.tagString)
        },
        handleUpdateValue(value, option) {
            if (value.length > 3) {
                value.splice(0, 1)
            }
            let options = []
            this.value.forEach((value) => {
                const option = this.options.find((option) => option.value == value);
                if (option) {
                    options.push(option);
                    option.style = { 'background-color': 'red', opacity: 0.4, 'color': 'yellow' }
                }
            })
            let op = this.options.filter(function (v) { return options.indexOf(v) == -1 })
            let i = 0, j = 0;
            for (i = 0; i < op.length; i++) {
                for (j = 0; j < this.options.length; j++) {
                    if (op[i].value == this.options[j].value) {
                        this.options[j].style = { 'background-color': 'white', opacity: 1, 'color': 'black' }
                    }
                }
            }
        },
        // renderTagChoices() {
        //     setTimeout(() => {
        //         let selectMenu = document.getElementsByClassName('n-base-select-menu')
        //         if (selectMenu.length > 0) {
        //             selectMenu[0].style.setProperty('--n-color', this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)')
        //             selectMenu[0].style.setProperty('--n-option-color-pending', this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)')
        //             selectMenu[0].style.setProperty('--n-option-text-color', fontColorString)
        //             selectMenu[0].style.setProperty('--n-border-radius', '8px')
        //             selectMenu[0].style.setProperty('--n-option-check-color', (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
        //                     BackgroundColorString : 'rgba(' + this.accentColor + ', 0.25)')
        //             selectMenu[0].style.setProperty('--n-option-text-color-active', (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
        //                     BackgroundColorString : 'rgba(' + this.accentColor + ', 0.9)')
        //             selectMenu[0].style.setProperty('--n-option-text-color-pressed', (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
        //                     BackgroundColorString : 'rgba(' + this.accentColor + ', 0.9)')
        //                     console.log(selectMenu.length)
    }
    // let tags = document.getElementsByClassName('n-base-select-option')
    // for (let i = 0; i < tags.length; i++) {
    //     tags[i].addEventListener('click', this.tagClick)
    //     tags[i].addEventListener('hover', this.setScroll)
    //     tags[i].style.color = 
    //         (tags[i].classList.contains('n-base-select-option--selected')) ?
    //         ((this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
    //             BackgroundColorString : 'rgba(' + this.accentColor + ', 0.9)') : (fontColorString)
    // }
    //     }, 0)
    // },
    // setScroll() {
    //     let scroll = document.getElementsByClassName('n-scrollbar')
    //         //console.log('s' + scroll.length)
    //         for (let i = 0; i < scroll.length; i++) {
    //             scroll[i].props = { 'on-scroll': this.renderTags }
    //             //scroll[i].addEventListener('scroll', this.renderTags)
    //         }
    // },
    // renderTags() {
    //     let tags = document.getElementsByClassName('n-base-select-option')
    //         for (let i = 0; i < tags.length; i++) {
    //             tags[i].addEventListener('click', this.tagClick)
    //             tags[i].addEventListener('hover', this.setScroll)
    //             tags[i].style.color = 
    //                 (tags[i].classList.contains('n-base-select-option--selected')) ?
    //                 ((this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
    //                     BackgroundColorString : 'rgba(' + this.accentColor + ', 0.9)') : (fontColorString)
    //         }
    //         console.log('hello')
    // },
    // tagClick() {
    //     let tags = document.getElementsByClassName('n-base-select-option')
    //     for (let i = 0; i < tags.length; i++) {
    //             tags[i].style.color = 
    //                 (tags[i].classList.contains('n-base-select-option--selected')) ?
    //                 ((this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
    //                     BackgroundColorString : 'rgba(' + this.accentColor + ', 0.9)') : (fontColorString)
    //         }
    // }
    // }
};
</script>
<style scoped>
.close-icon:hover {
    cursor: pointer;
}

.outer-container {
    width: 700px;
    border-radius: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 25px;
}

.title-container {
    margin-top: 10px;
    margin-bottom: 10px;
}

.body-item {
    max-width: 600px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.upload-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}

.upload-song-page {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 40px;
}

.upload-song-page img {
    height: 238px;
    aspect-ratio: 1;
    transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
}

.upload-song-page div {
    transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
}

.upload-song-page div:hover,.upload-song-page img:hover {
    opacity:0.8;
    transform: scale(1.02);
    transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.5s;
}

.upload-button-position {
    margin-top: 20px;
}

.select-container {
    height: 200px;
    /* 设置容器的高度 */
    overflow-y: scroll;
    /* 添加垂直滚动条 */
}

.login-button-top {
    margin-top: 15px;
}

.cover-prompt {
    margin-top: 10px;
    padding-left: 30px;
    text-align: center;
}

.upload-song-page:hover {
    cursor: pointer;
}

/* :global(.ant-select-dropdown){
        border-radius: 0 0 10px 10px;
}
:global(.ant-select-dropdown-menu,.ant-select-dropdown-menu-root,.ant-select-dropdown-menu-vertical){
    background-color: aquamarine;
} */
</style>