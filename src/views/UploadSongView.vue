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
                                    <img :src="SongPageUrl" @click="uploadFile" />
                                    <input type="file" ref="fileInput" style="display: none"
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
                            <span>歌手</span>
                            <n-input type="text" size="small" placeholder="请输入歌手" :value="songAuthor"
                                @input="songAuthor = $event" />
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
            songAuthor: '',
            songSrcFile: null,
            songLyricFile: null,
            songPageFile: null,
            songPageUrl: "/src/assets/upload-logo.png",
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
            location.reload();
        },
        // uploadFile() {
        //     this.$refs.fileInput.click()
        // },
        // handleSongPageChange(e) {
        //     this.songPageFile = e.target.files[0];
        // },
        // handleSongSrcFileChange(e) {
        //     this.songSrcFile = e.target.files[0];
        // },
        // handleSongLyricFileChange(e) {
        //     this.songLyricFile = e.target.files[0];
        // },
        // submitUpload() {
        //     let data = new FormData();
        //     data.append('title', this.songName);
        //     data.append('artist', this.songAuthor);
        //     data.append('cover', this.songPageFile);
        //     data.append('source', this.songSrcFile);
        //     data.append('lyrics', this.songLyricFile);
        //     this.$http.post('/api/music/upload/', data).then(response => {
        //         console.log(response);
        //         if (response.data.code === '0') {
        //             this.closeUWindow();
        //             alert('上传歌曲成功!')
        //         } else if (response.data.code === '-1') {
        //             alert('上传歌曲失败，请重新上传!');
        //         }
        //     });
        // }
    }
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