<script>
import { NButton, NIcon } from 'naive-ui';
import { defineComponent, ref, computed } from 'vue';
import { backgroundColor, getRGBString, globalThemeColor, getFontColorString } from '/src/colorMode';
import { ChevronBack, MusicalNotesOutline, PlayOutline, OpenOutline, CreateOutline, CloseOutline, ImageOutline, WarningOutline } from '@vicons/ionicons5';
import { message } from 'ant-design-vue';
import ModifyComplainView from '../views/ModifyComplainView.vue';
export default defineComponent({
    name: 'ListDetailed',
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
            else {
                let form = new FormData()
                form.append('title', this.listName)
                form.append('profile', this.listIntro)
                form.append('cover', this.songPageFile)
                form.append('tags', this.tags.join(','))
                alert(this.songPageFile)
                this.$http.post('/api/playlist/create/', form).then(() => {
                    this.$emit('flushCollections')//通知上层组件更新收藏夹
                    this.success('新建收藏夹成功');
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
        playAll() {
            //todo
        },
        complainList() {
            this.showModifyComplainView = true;
        }
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
    <n-modal :show="show" z-index="2" :block-scroll="false">
        <div>
            <n-card class="edit-list-hodder" style="--n-border-radius: 20px;">
                <n-grid>
                    <n-gi :span="1"></n-gi>
                    <n-gi :span="22">
                        <span class="modify-title">
                            <div class="edit-list-title">编辑收藏夹信息</div>
                        </span>
                    </n-gi>
                    <n-gi :span="1">
                        <div class="close-edit-modify">
                            <n-icon size="32px" @click="closeWindow">
                                <close-outline />
                            </n-icon>
                        </div>
                    </n-gi>
                </n-grid>
                <div class="edit-list-main">
                    <n-grid>
                        <n-gi :span="8">
                            <n-popover trigger="hover">
                                <template #trigger>
                                    <div class="upload-list-cover"
                                        :style="{ 'border': `2px ${songPageUrl === '/src/assets/upload-logo.png' ? 'dashed' : 'solid'} ${fontColorString}` }"
                                        @click="uploadFile">
                                        <input type="file" ref="fileInput" style="display: none" accept="image/*"
                                            @change="handleSongPageChange" />
                                        <n-icon v-if="songPageUrl === '/src/assets/upload-logo.png'" size="100" depth="5">
                                            <ImageOutline />
                                        </n-icon>
                                        <img v-else :src="songPageUrl" style="width: 100%;" />
                                    </div>
                                </template>
                                <span>点击此处上传收藏夹封面</span>
                            </n-popover>
                        </n-gi>
                        <n-gi :span="1"></n-gi>
                        <n-gi :span="15">
                            <div>
                                <div style="padding-bottom: 3px; font-size: 16px;">收藏夹名称</div>
                                <n-input type="text" placeholder="请输入收藏夹名称" :maxlength="20" show-count
                                    v-model:value="listName" />
                            </div>
                            <div>
                                <div style="padding: 10px 0px 3px 0px; font-size: 16px;">标签</div>
                                <n-space vertical>
                                    <n-select v-model:value="tags" multiple :options="options" placeholder="请选择收藏夹标签" />
                                </n-space>
                            </div>
                            <div>
                                <div style="padding: 10px 0px 3px 0px; font-size: 16px;">简介</div>
                                <n-input v-model:value="listIntro" type="textarea" placeholder="每个收藏夹都有自己的故事~" :autosize="{
                                    minRows: 6,
                                    maxRows: 6
                                }" :maxlength="150" show-count>
                                </n-input>
                            </div>
                            <div class="submit-button">
                                <n-button strong secondary type="primary" @click="submitEdit">
                                    新建收藏夹
                                </n-button>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </n-card>
        </div>
    </n-modal>
    <modify-complain-view :showModifyComplainView="showModifyComplainView"
        @closeModifyWindow="showModifyComplainView = false"></modify-complain-view>
</template>
<style scoped>
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
    box-shadow: 0 0 3px 3px;
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
</style>