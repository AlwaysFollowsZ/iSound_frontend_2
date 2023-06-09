<script>
import { NButton, NIcon } from 'naive-ui';
import { defineComponent, ref, computed } from 'vue';
import { backgroundColor, getRGBString, globalThemeColor, getFontColorString } from '/src/colorMode';
import { ChevronBack, MusicalNotesOutline, PlayOutline, OpenOutline, CreateOutline, CloseOutline, ImageOutline, WarningOutline } from '@vicons/ionicons5';
import { message } from 'ant-design-vue';
import { mapState } from 'vuex'
import ModifyComplainView from '../views/ModifyComplainView.vue';
export default defineComponent({
    computed: {
        ...mapState(['accentColor', 'colorMode']),
    },
    components: {
        ChevronBack,
        MusicalNotesOutline,
        PlayOutline,
        OpenOutline,
        CreateOutline,
        CloseOutline,
        ImageOutline,
        WarningOutline,
        ModifyComplainView,
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        closeWindow() {
            this.$emit('closeCreateWindow')
            this.showShareListModify = false;
        },
        uploadFile() {
            this.$refs.fileInput.click()
        },
        handleSongPageChange(e) {
            this.songPageFile = e.target.files[0];
            this.songPageUrl = URL.createObjectURL(this.songPageFile);
        },
        submitEdit() {
            //todo
            if (this.listName == '') {
                this.warning('收藏夹名称不得为空');
            }
            if (this.tags.length == 0) {
                this.warning('请选择收藏夹标签( 1 ~ 3 个 )')
            }
            else {
                let form = new FormData()
                form.append('title', this.listName)
                form.append('profile', this.listIntro)
                form.append('cover', this.songPageFile)
                form.append('tags', this.tags.join(' '))
                this.$http.post('/api/playlist/create/', form).then(() => {
                    this.$emit('flushCollections')//通知上层组件更新收藏夹
                    //this.success('新建收藏夹成功');
                    this.closeWindow()
                    //清空信息
                    this.listName = ''
                    this.listIntro = ''
                    this.songPageFile = null
                    this.songPageUrl = ''
                    this.tags = []
                })
            }

        },
        handleTagList() {
            this.tagList = [];
            this.tags.forEach((value) => {
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
            this.tags.forEach((value) => {
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
            this.tags.forEach((value) => {
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
        },
    },
    emits: ['closeCreateWindow', 'flushCollections'],
    setup() {
        const fontColorString = computed(() => {
            return getRGBString(getFontColorString(globalThemeColor), 0.8)
        })
        return {
            fontColorString,
            songPageFile: undefined,
            songPagrUrl: '',
            warning(msg) {
                message.warning({
                    content: msg,
                    duration: 1,
                    style: {
                        "z-index": 3,
                    },
                })
            },
            success(msg) {
                message.success({
                    content: msg,
                    duration: 1,
                    style: {
                        "z-index": 3,
                    },
                });
            },
        }
    },
    props: {
        show: Boolean
    },
    data() {
        return {
            value: [],
            songPageUrl: "/src/assets/upload-logo.png",
            listName: ref('默认收藏夹'),
            listIntro: ref(''),
            songNum: 0,
            showShareListModify: false,
            showModifyComplainView: false,
            MusicalNotesOutline,
            tags: [], // 存储所选内容的数组
            options: [
                { label: "华语", value: "华语" },
                { label: "流行", value: "流行" },
                { label: "民谣", value: "民谣" },
                { label: "轻音乐", value: "轻音乐" },
                { label: "电子", value: "电子" },
                { label: "摇滚", value: "摇滚" },
                { label: "日韩", value: "日韩" },
                { label: "粤语", value: "粤语" },
                { label: "舞曲", value: "舞曲" },
                { label: "说唱", value: "说唱" },
                { label: "爵士", value: "爵士" },
                { label: "乡村", value: "乡村" },
                { label: "古典", value: "古典" },
                { label: "民族", value: "民族" },
                { label: "金属", value: "金属" },
                { label: "古风", value: "古风" },
                { label: "游戏", value: "游戏" },
                { label: "清晨", value: "清晨" },
                { label: "夜晚", value: "夜晚" },
                { label: "学习", value: "学习" },
                { label: "工作", value: "工作" },
                { label: "午休", value: "午休" },
                { label: "散步", value: "散步" },
                { label: "下午茶", value: "下午茶" },
                { label: "旅行", value: "旅行" },
                { label: "运动", value: "运动" },
                { label: "怀旧", value: "怀旧" },
                { label: "伤感", value: "伤感" },
                { label: "放松", value: "放松" },
                { label: "浪漫", value: "浪漫" },
                { label: "安静", value: "安静" },
                { label: "思念", value: "思念" },
            ],
            tagList: [],
            tagString: '', // 为了传给后端tag而设置的。

        }
    }
}
)
</script>
<template>
    <n-modal :show="show" :z-index="2"
        :style="{ 'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)' }" :block-scroll="false">
        <div class="outer-container">
            <div class="title-container">
                <div style="margin-bottom: 30px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="modify-card-title"
                                :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                                收藏新篇章
                            </div>
                        </n-gi>
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="closeWindow"
                                :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                                <n-icon size="40"><close-outline /></n-icon>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <div class="body-container">
                <n-grid>
                    <n-gi :span="1"></n-gi>
                    <n-gi :span="9">
                        <div style="height: 280px; position: relative" class="img-container">
                            <div style="position: absolute; top: 10%;">
                                <n-popover trigger="hover" raw>
                                    <template #trigger>
                                        <div class="upload-list-cover" :style="{
                                            'border': this.songPageUrl === '/src/assets/upload-logo.png' ? `2px solid rgba(${this.accentColor},0.3)` : '',
                                            'background': `rgb(${this.accentColor},0.1)`,
                                        }" @click="uploadFile">
                                            <input type="file" ref="fileInput" style="display: none" accept="image/*"
                                                @change="handleSongPageChange" />
                                            <n-icon v-if="songPageUrl === '/src/assets/upload-logo.png'" size="100"
                                                depth="3" :color="`rgb(${this.accentColor})`">
                                                <ImageOutline />
                                            </n-icon>
                                            <img v-else :src="songPageUrl" style="width: 100%;" />
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
                                    }">
                      <span>点击以上传封面</span>
                    </div>
                                </n-popover>
                            </div>
                        </div>
                        <div>
                            <div class="body-item-title" :style="{
                                'color': (this.colorMode === 'white') ? 'black' : 'white',
                            }">分类标签</div>
                            <n-select v-model:value="tags" multiple :options="options" placeholder="为歌曲添加1～3个分类标签"
                                max-tag-count="responsive" @update:value="handleUpdateValue" @click="renderTags" />

                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">

                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                    </n-gi>

                    <n-gi :span="14">
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">
                                        名称
                                    </div>
                                    <n-input type="text" placeholder="收藏夹名称不应为空" :maxlength="20" show-count :style="{
                                        '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                        '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                        '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                        '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                        '--n-border-hover': 'transparent',
                                        '--n-border-focus': 'transparent',
                                        '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                        '--n-border-radius': '8px',
                                        '--n-height': '40px',
                                        '--n-font-size': '16px',
                                        '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                        '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                        '--n-icon-size': '25px',
                                    }" v-model:value="listName" />
                                </n-gi>
                                <n-grid :span="3"></n-grid>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">
                                        简介
                                    </div>
                                    <n-input v-model:value="listIntro" type="textarea" placeholder="" :autosize="{
                                        minRows: 8,
                                        maxRows: 8
                                    }" :maxlength="150" show-count :style="{
    '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
    '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
    '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
    '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
    '--n-border-hover': 'transparent',
    '--n-border-focus': 'transparent',
    '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
    '--n-border-radius': '8px',
    '--n-font-size': '18px',
    '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
    '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
}">
                                    </n-input>
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div style="display: flex; justify-content: right;">
                                        <n-button strong secondary type="primary" @click="submitEdit" :focusable="false"
                                            :style="{
                                                '--n-color': 'rgba(' + this.accentColor + ', 0.25)',
                                                '--n-color-hover':
                                                    'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-color-pressed':
                                                    'rgba(' + this.accentColor + ', 0.45)',
                                                '--n-text-color':
                                                    'rgba(' + this.accentColor + ', 1)',
                                                '--n-text-color-hover':
                                                    'rgba(' + this.accentColor + ', 1)',
                                                '--n-text-color-pressed':
                                                    'rgba(' + this.accentColor + ', 1)',
                                                '--n-border': '1px solid transparent',
                                                '--n-border-hover': '1px solid transparent',
                                                '--n-border-pressed': '1px solid transparent',
                                                '--n-border-radius': '5px',
                                                '--n-width': '64px',
                                                '--n-height': '39px',
                                                '--n-font-size': '18px',
                                            }">
                                            新建
                                        </n-button>
                                    </div>
                                </n-gi>
                            </n-grid>
                        </div>

                    </n-gi>
                </n-grid>
            </div>
            <div style="width: 100%; display: flex; justify-content:right">

            </div>
        </div>
    </n-modal>
    <modify-complain-view :showModifyComplainView="showModifyComplainView"
        @closeModifyWindow="showModifyComplainView = false"></modify-complain-view>
</template>
<style scoped>
.close-icon:hover {
    cursor: pointer;
}

.outer-container {
    width: 800px;
    min-width: 800px;
    border-radius: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
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

.modify-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}

.modify-title {
    font-size: larger;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}


/* Deprecated */
.back-button {
    width: 40px;
    height: 40px;
    /* position: absolute; */
    left: 20px;
    top: 20px;
}

.list-cover {
    /* position: absolute; */
    margin-top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.list-cover-img {
    /* position: absolute; */
    margin: auto;
    width: 245px;
    height: 245px;
    border-radius: 10%;
}

.list-information {
    display: flex;
    margin-top: 4%;
}

.list-circle {
    margin-top: 10px;
    margin-right: 5px;
}

.ant-divider-horizontal {
    display: flex;
    clear: both;
    width: 100%;
    min-width: 0px;
    margin-top: 0;
    margin-bottom: 0px;
}

.playall-button {
    margin-right: 20px;
}

.modify-title {
    font-size: 25px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
}

.edit-list-hodder {
    width: 800px;
    height: 500px;
}

.close-edit-modify {
    margin-right: 0px;
    margin-top: 0px;
    cursor: pointer;
}

.edit-list-title {
    display: flex;
    font-weight: bold;
}

.upload-list-cover {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border-style: dashed;
    border-width:3px; */
    color: rgb(209, 209, 209);
    height: 220px;
    width: 220px;
    border-radius: 5%;
    overflow: hidden;
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}

.upload-list-cover:hover {
    transform: scale(1.03);
    opacity: 0.8;
}

.edit-list-main {
    margin: 30px 30px;
}

.upload-list-cover-image {
    height: 200px;
    width: 200px;
}

:deep(.n-upload-trigger.n-upload-trigger--image-card) {
    margin-top: -8px;
    width: 216px;
    height: 216px;
    z-index: 1;

}

:deep(.n-upload-dragger) {
    border-radius: 5%;
    border-width: 3px;
}

:deep(.n-upload-file-list .n-upload-file.n-upload-file--image-card-type) {
    position: relative;
    width: 200px;
    height: 200px;
    border: var(--n-item-border-image-card);
    border-radius: var(--n-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color .3s var(--n-bezier), background-color .3s var(--n-bezier);
    border-radius: var(--n-border-radius);
    overflow: hidden;
    border-radius: 5%;
}

.submit-button {
    margin-top: 15px;
    display: flex;
    justify-content: right;
}

.tags {
    margin-right: 10px;
}

.share-list-hodder {
    width: 480px;
    height: 300px;
}

.confirm-message {
    margin-top: 20px;
    display: flex;
    align-content: center;
    justify-content: center;
    height: 140px;
    font-size: 18px;
}

.buttons {
    margin-top: 20px;
    display: flex;
    align-content: center;
    justify-content: right;
}

.share-button {
    margin-right: 20px;
}

:deep(.n-base-selection .n-base-selection-tags) {
    --n-color: var(--my-modal-select-color);
}

:deep(.n-base-selection .n-tag) {
    --n-color: var(--my-modal-select-tag-color) !important;
    --n-text-color: var(--my-modal-select-text-color) !important
}

:deep(.n-base-close) {
    --n-close-icon-color: var(--my-modal-select-text-color) !important;
    --n-close-icon-color-hover: red !important
}

.img-container{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>