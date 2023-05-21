<template>
    <div class="upload-song-sheet-container">
        <div class="upload-song-sheet-title">
            上传歌曲
            <a-divider style="height: 1.8px; background-color: #dddddd"/>
        </div>
        <div>
            <n-popover trigger="hover">
                <template #trigger>
                    <n-button @click="goToUploadSong = true">
                        <cloud-upload-outline style="width: 40px; height: 60px;"/>
                    </n-button>
                </template>
                <span>点击此处可以上传歌曲</span>
            </n-popover>
        </div>
    </div>
    <div class="already-upload-song-sheet">
        <div class="upload-song-sheet-title">
            已上传的歌曲
            <n-divider />
        </div>
        <div class="song-sheet-container">
            <n-grid :x-gap="12" :y-gap="6" :col="3">
                <n-gi :span="8" v-for="(song, idx) in songSheets" :key="idx">
                    <div class="single-card-container">
                        <div class="single-card-img-container">
                            <img class="single-card-img" :src="song.imgSrc">
                        </div>
                        <div class="single-card-info-container">
                            <div class="single-card-info-name">
                                {{ song.title }}
                            </div>
                            <div class="single-card-info-singer">
                                {{ song.singer }}
                            </div>
                        </div>
                    </div>
                </n-gi>
            </n-grid>
        </div>
    </div>
    <upload-song-view :goToUploadSong="goToUploadSong" @closeUploadWindow="goToUploadSong = false"></upload-song-view>
</template>
<script>
import UploadSongView from '../views/UploadSongView.vue';
import { CloudUploadOutline } from '@vicons/ionicons5'
export default {
    components: {
        UploadSongView,
        CloudUploadOutline,
    },
    data() {
        return {
            goToUploadSong: false,
            uploadSongEntryLogoUrl: "/src/assets/upload-logo.png",
            songSheets: [
                {
                    imgSrc: "/src/assets/song1.jpg",
                    title: "陪你度过漫长岁月",
                    jumpLink: "1",
                    singer: "陈奕迅"
                },
                {
                    imgSrc: "/src/assets/song2.jpg",
                    title: "给自己的情书",
                    jumpLink: "2",
                    singer: "王菲"
                },
                {
                    imgSrc: "/src/assets/song3.jpg",
                    title: "Yesterday Once More",
                    jumpLink: "3",
                    singer: "Carpenters"
                },
                {
                    imgSrc: "/src/assets/song4.jpg",
                    title: "守时",
                    jumpLink: "4",
                    singer: "王菲"
                },
            ]
        }
    },
}
</script>
<style scoped>
.upload-song-sheet-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
}

.single-card-container {
    max-width: 180px;
    padding-top: 3%;
    padding-bottom: 3%;
    word-wrap: break-word;
}

.single-card-img-container {
    width: 160px;
    height: 160px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}

.single-card-img {
    width: 100%;
    height: 100%;
}

.single-card-info-name {
    font-size: medium;
    font-weight: 700;
}

.single-card-info-singer {
    font-size: small;
    font-weight: 500;
    color: grey;
}
</style>