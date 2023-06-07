<template>
    <n-modal :show="showUploadSong" :style="{ 'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)' }"
        :block-scroll="false" :z-index="1">
        <div class="outer-container">
            <div class="title-container">
                <div style="margin-bottom: 30px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="upload-card-title"
                                :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">上传歌曲：编织你的音乐篇章</div>
                        </n-gi>
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="closeUWindow"
                                :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                                <n-icon size="40"><close-outline /></n-icon>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <div class="body-container">
                <n-grid>
                    <n-gi :span="10">

                        <n-popover row trigger="hover" class="cover-prompt" :style="{ 'color': fontColorString }">
                            <template #trigger>
                                <div class="upload-song-page">
                                    <div :style="{
                                        'border': this.songPageUrl === '/src/assets/upload-logo.png' ? `2px solid rgba(${this.accentColor},0.3)` : '',
                                        'display': 'flex',
                                        'justify-content': 'center',
                                        'align-items': 'center',
                                        'border-radius': '10px',
                                        'background': `rgb(${this.accentColor},0.1)`,
                                        'height': '220px',
                                        'margin-bottom': '18px',
                                        'aspect-ratio': '1',
                                    }" @click="uploadFile">
                                        <n-icon size="150" :depth="3" :color="`rgb(${this.accentColor})`"
                                            v-if="this.songPageUrl === '/src/assets/upload-logo.png'"><image-outline /></n-icon>
                                        <img v-else style="border-radius: 10px;" :src="this.songPageUrl"
                                            @click="uploadFile" />
                                    </div>
                                    <input type="file" ref="fileInput" style="display: none" accept="image/*"
                                        @change="handleSongPageChange" />
                                </div>
                            </template>
                            <div class="avatar-prompt" :style="{
                                'font-weight': '600',
                                'margin': '5px 20px',
                                'display': 'flex',
                                'justify-content': 'center',
                                'align-items': 'center',
                                'height': '30px',
                                'color': `rgb(${this.accentColor},0.7)`,
                                'background-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                            }">
                                <span>点击此处上传歌曲封面</span>
                            </div>
                        </n-popover>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="1"></n-gi>
                                <n-gi :span="23" class="tags-container">
                                    <div class="body-item-title">分类标签</div>
                                    <n-select v-model:value="value" multiple :options="options" placeholder="为歌曲添加1～3个分类标签"
                                        max-tag-count="responsive" @update:value="handleUpdateValue" @click="renderTags" />
                                </n-gi>
                            </n-grid>
                        </div>
                    </n-gi>
                    <!-- <n-gi :span="1"></n-gi> -->
                    <n-gi :span="14">
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title" @click="testfunc">你需要上传歌曲文件</div>
                                    <div class="body-item-file-input">
                                        <n-button strong secondary type="primary" @click="uploadSongFile" :focusable="false"
                                            :style="{
                                                '--n-color':
                                                    'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-color-hover':
                                                    'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-pressed':
                                                    'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-focus':
                                                    'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-text-color':
                                                    'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-text-color-hover':
                                                    'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-text-color-pressed':
                                                    'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-text-color-focus':
                                                    'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-border': '1px solid transparent',
                                                '--n-border-hover': '1px solid transparent',
                                                '--n-border-pressed': '1px solid transparent',
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
                                    <div class="body-item-title">你可以选择上传歌词文件</div>
                                    <div class="body-item-file-input">
                                        <n-button strong secondary type="primary" @click="uploadLyricFile"
                                            :focusable="false" :style="{
                                                '--n-color':
                                                    'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-color-hover':
                                                    'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-pressed':
                                                    'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-focus':
                                                    'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-text-color':
                                                    'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-text-color-hover':
                                                    'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-text-color-pressed':
                                                    'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-text-color-focus':
                                                    'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-border': '1px solid transparent',
                                                '--n-border-hover': '1px solid transparent',
                                                '--n-border-pressed': '1px solid transparent',
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
                                    <div class="body-item-title">歌名</div>
                                    <n-input type="text" size="small" placeholder="你需要填写歌曲名称" :value="songName"
                                        @input="songName = $event" :style="{
                                            '--n-color': 'white',
                                            '--n-color-focus': 'white',
                                            '--n-text-color': 'black',
                                            '--n-caret-color': 'black',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': 'grey',
                                            '--n-border-radius': '8px',
                                            '--n-height': '40px',
                                            '--n-font-size': '16px',
                                            '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
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
                                    <div class="body-item-title">歌手</div>
                                    <n-input type="text" size="small" placeholder="佚名" :value="songAuthor"
                                        @input="songAuthor = $event" :style="{
                                            '--n-color': 'white',
                                            '--n-color-focus': 'white',
                                            '--n-text-color': 'black',
                                            '--n-caret-color': 'black',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': 'grey',
                                            '--n-border-radius': '8px',
                                            '--n-height': '40px',
                                            '--n-font-size': '16px',
                                            '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                            '--n-icon-size': '25px',
                                        }" />
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                    </n-gi>
                </n-grid>
            </div>
            <div style="margin-top: 20px; margin-bottom: 25px">
                <n-grid class="login-button-top">
                    <n-gi :span="4"></n-gi>
                    <n-gi :span="4" style="display: flex; justify-content: right">
                        <n-button strong secondary type="success" @click="submitUpload" :focusable="false" :style="{
                            '--n-color':
                                'rgba(' + this.accentColor + ', 0.25)',
                            '--n-color-hover':
                                'rgba(' + this.accentColor + ', 0.45)',
                            '--n-color-pressed':
                                'rgba(' + this.accentColor + ', 0.45)',
                            '--n-text-color':
                                'rgba(' + this.accentColor + ', 0.8)',
                            '--n-text-color-hover':
                                'rgba(' + this.accentColor + ', 0.8)',
                            '--n-text-color-pressed':
                                'rgba(' + this.accentColor + ', 0.8)',
                            '--n-text-color-focus':
                                'rgba(' + this.accentColor + ', 0.8)',
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
                                'grey',
                            '--n-color-hover':
                                '#5d5d60',
                            '--n-color-pressed':
                                '#5d5d60',
                            '--n-text-color':
                                'white',
                            '--n-text-color-hover':
                                'white',
                            '--n-text-color-pressed':
                                'white',
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
    </n-modal>
    <n-modal :show="isUploading" :z-index="150">
        <n-progress type="circle" status="success" :percentage="percentage" rail-color="lightgrey" :style="{
            'width': '200px',
            'aspect-ratio': 1,
            '--n-fill-color':
                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                    'grey' :
                    'rgb(' + this.accentColor + ')',
        }">
            <template #default>
                <div v-if="this.percentage < 85">
                    <n-icon size="50" :color="this.accentColor === '0,0,0' || this.accentColor === '255,255,255'
                        ? 'grey'
                        : 'rgba(' + this.accentColor + ', 0.7)'
                        " :class="{
        'animate__animated animate__slideInLeft': this.percentage > 85,
    }">
                        <musical-notes-outline />
                    </n-icon>
                </div>
                <div v-else>
                    <n-icon size="56" color="#63e2b8" class="animate__animated animate__zoomIn">
                        <checkmark-circle-outline />
                    </n-icon>
                </div>
            </template>
        </n-progress>
    </n-modal>
</template>
  
<script>
import { CloseOutline, ArrowUpOutline, WatchOutline, ImageOutline, CheckmarkCircleOutline, MusicalNoteOutline } from '@vicons/ionicons5'
import 'animate.css'
import { NInput, NModal, NPopover } from 'naive-ui';
import { defineComponent, ref, watch } from "vue";
import { mapState } from 'vuex'
import { message } from "ant-design-vue";
export default {
    name: "UploadSong",
    computed: {
        ...mapState(['accentColor', 'colorMode']),
    },
    components: {
        CloseOutline,
        ArrowUpOutline,
        NInput,
        NModal,
        ImageOutline,
        CheckmarkCircleOutline,
        MusicalNoteOutline,
    },
    props: {
        showUploadSong: Boolean,
    },
    data() {
        return {
            isUploading: false,
            percentage: 0,
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
                this.isUploading = true;
                this.handleTagList();
                console.log(this.tagString);
                let data = new FormData();
                data.append('title', this.songName);
                data.append('artist', this.songAuthor);
                data.append('cover', this.songPageFile);
                data.append('source', this.songSrcFile);
                data.append('lyrics', this.songLyricFile);
                data.append('tags', this.tagString);
                this.$http.post('/api/music/upload/', data, {
                    onUploadProgress: (progress) => {
                        this.percentage = ((progress.loaded / progress.total) * 100) | 0;
                    },
                }).then(response => {
                    this.isUploading = false;
                    console.log(response);
                    if (response.data.code == '0') {
                        this.$emit('flushUploadSongs')//刷新歌曲
                        this.closeUWindow();
                        this.percentage = 0;
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
                    option.style = {

                        '--n-color-active': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                            (this.colorMode === 'white' ? 'rgb(243,243,243)' : 'rgba(72,72,72,0.1)') : 'rgba(' + this.accentColor + ', 0.4)',
                        '--n-option-text-color': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 'black' : 'rgba(' + this.accentColor + ',1)',
                        '--n-option-text-color-active': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 'black' : 'rgba(' + this.accentColor + ',1)',
                        '--n-option-check-color': 'rgb(' + this.accentColor + ')',
                        '--n-option-color-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                        '--n-option-color-active-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                    }
                }
            })
            let op = this.options.filter(function (v) { return options.indexOf(v) == -1 })
            let i = 0, j = 0;
            for (i = 0; i < op.length; i++) {
                for (j = 0; j < this.options.length; j++) {
                    if (op[i].value == this.options[j].value) {
                        this.options[j].style = {
                            'background-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                            '--n-option-text-color': this.colorMode === 'white' ? 'black' : 'white',
                            '--n-option-check-color': 'rgb(' + this.accentColor + ')',
                            '--n-option-color-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                            '--n-option-color-active-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                            '--n-option-color-active-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                        }
                    }
                }
            }
        },
        renderTags() {
            let menus = document.getElementsByClassName('n-base-select-menu n-base-select-menu--multiple n-select-menu')
            if (menus.length > 0) {
                let menu = menus[0]
                menu.style.setProperty('--n-option-color-pending', this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)')
                menu.style.setProperty('--n-option-color-active-pending', this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)')
                menu.style.setProperty('--n-option-color-active-pending', this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)')

            }
            //let options = []

            for (let i = 0; i < this.options.length; i++) {
                this.options[i].style =
                {
                    'background-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                    '--n-option-text-color': this.colorMode === 'white' ? 'black' : 'white',
                    '--n-option-color-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                    '--n-option-color-active-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                    '--n-option-color-active-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                }
            }
            this.value.forEach((value) => {
                const option = this.options.find((option) => option.value == value);
                if (option) {
                    //options.push(option);
                    option.style = {
                        'background-color': this.accentColor === '0,0,0' || this.accentColor === '0,0,0' ?
                            this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)' :
                            'rgba(' + this.accentColor + ', 0.2)',
                        '--n-color-active': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                            (this.colorMode === 'white' ? 'rgb(243,243,243)' : 'rgba(72,72,72,0.1)') : 'rgba(' + this.accentColor + ', 0.4)',
                        '--n-option-text-color': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 'black' : 'rgba(' + this.accentColor + ',1)',
                        '--n-option-text-color-active': (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 'black' : 'rgba(' + this.accentColor + ',1)',
                        '--n-option-check-color': 'rgb(' + this.accentColor + ')',
                        '--n-option-color-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                        '--n-option-color-active-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                        '--n-option-color-active-pending': this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)',
                    }
                }
            })
        }
        // renderTagChoices() {
        //     setTimeout(() => {
        //         let selectMenu = document.getElementsByClassName('n-base-select-menu')
        //         if (selectMenu.length > 0) {
        //             selectMenu[0].style.setProperty('--n-color', this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)')
        //             selectMenu[0].style.setProperty('--n-option-color-pending', this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)')
        //             selectMenu[0].style.setProperty('--n-option-text-color', this.colorMode === 'white' ? 'black' : 'white')
        //             selectMenu[0].style.setProperty('--n-border-radius', '8px')
        //             selectMenu[0].style.setProperty('--n-option-check-color', (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
        //                     '#8cbef8' : 'rgba(' + this.accentColor + ', 0.25)')
        //             selectMenu[0].style.setProperty('--n-option-text-color-active', (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
        //                     '#8cbef8' : 'rgba(' + this.accentColor + ', 0.9)')
        //             selectMenu[0].style.setProperty('--n-option-text-color-pressed', (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
        //                     '#8cbef8' : 'rgba(' + this.accentColor + ', 0.9)')
        //                     console.log(selectMenu.length)
    }
    // let tags = document.getElementsByClassName('n-base-select-option')
    // for (let i = 0; i < tags.length; i++) {
    //     tags[i].addEventListener('click', this.tagClick)
    //     tags[i].addEventListener('hover', this.setScroll)
    //     tags[i].style.color = 
    //         (tags[i].classList.contains('n-base-select-option--selected')) ?
    //         ((this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
    //             '#8cbef8' : 'rgba(' + this.accentColor + ', 0.9)') : (this.colorMode === 'white' ? 'black' : 'white')
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
    //                     '#8cbef8' : 'rgba(' + this.accentColor + ', 0.9)') : (this.colorMode === 'white' ? 'black' : 'white')
    //         }
    //         console.log('hello')
    // },
    // tagClick() {
    //     let tags = document.getElementsByClassName('n-base-select-option')
    //     for (let i = 0; i < tags.length; i++) {
    //             tags[i].style.color = 
    //                 (tags[i].classList.contains('n-base-select-option--selected')) ?
    //                 ((this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
    //                     '#8cbef8' : 'rgba(' + this.accentColor + ', 0.9)') : (this.colorMode === 'white' ? 'black' : 'white')
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
    min-width: 700px;
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
    max-width: 500px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.body-item-title {
    color: grey;
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
}

.upload-song-page div {
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}

.upload-song-page div:hover {
    transform: scale(1.03);
    opacity: 0.8;
}

.upload-song-page img {
    width: 220px;
    height: 220px;
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


:deep(.n-base-selection .n-base-selection-tags) {
    --n-color: var(--my-modal-select-color);
}

:deep(.n-base-selection .n-tag) {
    --n-color: var(--my-modal-select-tag-color) !important;
    --n-text-color: var(--my-modal-select-text-color) !important
}

:deep(.n-base-close) {
    --n-close-icon-color: var(--my-modal-select-text-color) !important
}
</style>