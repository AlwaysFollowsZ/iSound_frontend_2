<template>
    <n-modal v-model:show="goToUploadSong" style="border-radius: 30px;">
        <div style="background-color:aliceblue">
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
                                    <img :src="uploadSongPageUrl" @click="uploadFile" />
                                    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
                                </div>
                            </template>
                            <span>点击此处上传歌曲封面</span>
                        </n-popover>
                    </n-gi>
                    <n-gi>
                        <div>
                            <span>歌曲文件</span>
                            <n-space>
                                <n-button dashed @click="uploadFile">
                                    <template #icon><n-icon><arrow-up-outline /></n-icon></template>请上传音频格式文件
                                </n-button>
                            </n-space>
                        </div>
                        <div>
                            <span>歌词文件</span>
                            <n-space>
                                <n-button dashed @click="uploadFile">
                                    <template #icon><n-icon><arrow-up-outline /></n-icon></template>请上传歌词格式文件
                                </n-button>
                            </n-space>
                        </div>
                        <div>
                            <span>歌名</span>
                            <n-input type="text" size="small" placeholder="请输入歌名" :value="songName"
                                @input="songName = $event" />
                        </div>
                        <div>
                            <span>歌曲描述</span>
                            <n-input type="textarea" size="small" placeholder="这里是歌曲的简介" :value="songDiscription"
                                @input="songDiscription = $event" />
                        </div>
                        <div>
                            <span>标签选择</span>
                            <n-space vertical>
                                <n-select v-model:value="value" multiple :options="options" />
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
        </div>
    </n-modal>
</template>
  
<script>
import { CloseOutline, ArrowUpOutline } from '@vicons/ionicons5'
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "UploadSong",
    data() {
        return {
            songName: '',
            songDiscription: '',
            songSrcFile: '',
            songLyricFile: '',
            uploadSongPageUrl: "/src/assets/upload-logo.png",
            options: [
                {
                    label: "Everybody's Got Something to Hide Except Me and My Monkey",
                    value: "song0",
                },
                {
                    label: "Drive My Car",
                    value: "song1"
                },
                {
                    label: "Norwegian Wood",
                    value: "song2"
                },
                {
                    label: "You Won't See",
                    value: "song3",
                    disabled: true
                },
                {
                    label: "Nowhere Man",
                    value: "song4"
                },
                {
                    label: "Think For Yourself",
                    value: "song5"
                },
                {
                    label: "The Word",
                    value: "song6"
                },
                {
                    label: "Michelle",
                    value: "song7",
                    disabled: true
                },
                {
                    label: "What goes on",
                    value: "song8"
                },
                {
                    label: "Girl",
                    value: "song9"
                },
                {
                    label: "I'm looking through you",
                    value: "song10"
                },
                {
                    label: "In My Life",
                    value: "song11"
                },
                {
                    label: "Wait",
                    value: "song12"
                }
            ]
        }
    },
    components: {
        CloseOutline,
        ArrowUpOutline,
    },
    props: {
        goToUploadSong: Boolean,
    },
    methods: {
        closeUWindow() {
            this.$emit('closeUploadWindow');
        },
        submitUpload() {
            console.log(this.songName);
        },
        uploadFile() {
            this.$refs.fileInput.click()
        },
        //     uploadFile() {
        //         this.$refs.fileInput.click()
        //     },
        //     handleFileChange(e) {
        //         const file = e.target.files[0]
        //         this.file = file
        //         // this.uploadImage()
        //     },
    },
});
</script>
<style>
.upload-song-page {
    display: flex;
    align-items: center;
    justify-content: center;
}

.upload-song-page img {
    width: 256px;
    height: 256px;
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
</style>