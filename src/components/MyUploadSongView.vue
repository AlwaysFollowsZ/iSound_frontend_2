<template>
    <!-- <div class="upload-song-sheet-container">
        <n-grid>
            <n-gi :span="4">
                <span class="upload-song-sheet-title">
                    上传歌曲
                </span>
            </n-gi>
            <n-gi :span="1"></n-gi>
            <n-gi :span="19">
                DO NOT MODIFY
                <n-icon class="upload-icon" @click="jumpToUploadSong" size="40" style="padding-top: 5px">
                    <cloud-upload-outline/>
                </n-icon>
            </n-gi>
        </n-grid>
    </div> -->
    <div class="already-upload-song-sheet">
        <div class="upload-song-sheet-title">
            已上传的歌曲
        </div>
        <!-- <div class="song-sheet-container">
            <n-grid :x-gap="10" :y-gap="6" :col="4">
                <n-gi :span="6" v-for="(song, idx) in songSheets" :key="idx">
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
        </div> -->
        <image-table :position="'UploadedSongs'" @clickUpload="jumpToUploadSong" :entrySize="[200,200]"></image-table>
    </div>
    <upload-song-view :showUploadSong="goToUploadSong" @closeUploadWindow="goToUploadSong = false"></upload-song-view>
</template>
<script>
import ImageTable from '/src/components/tables/ImageTable/ImageTable.vue';
import UploadSongView from '../views/UploadSongView.vue';
import { CloudUploadOutline } from '@vicons/ionicons5';
import { mapState } from 'vuex';
export default {
    components: {
        UploadSongView,
        CloudUploadOutline,
        ImageTable
    },
    computed: {
        ...mapState(['accentColor', 'colorMode']),
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
    methods: {
        jumpToUploadSong() {
            this.goToUploadSong = true;
            // n-select 样式只能这么修改
            // 等待 DOM 加载，然后再获取，否则获取不到
            setTimeout(() => {
                let selections = document.getElementsByClassName('n-base-selection')
                
                // let tags = document.getElementsByClassName('n-tag')
                // console.log(tags.length)
                if (selections.length > 0) {
                    // 含有 '--' 分隔的属性只能这么写
                    selections[0].style.setProperty('--n-color', 'white')
                    selections[0].style.setProperty('--n-color-focus', 'white')
                    selections[0].style.setProperty('--n-color-active', 'white')
                    selections[0].style.setProperty('--n-border', '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)')
                    selections[0].style.setProperty('--n-border-active', '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)')
                    selections[0].style.setProperty('--n-border-focus', '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)')
                    selections[0].style.setProperty('--n-border-hover', '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)')
                    selections[0].style.setProperty('--n-border-radius', '8px')
                    selections[0].style.setProperty('--n-box-shadow-active', '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)')
                    selections[0].style.setProperty('--n-box-shadow-focus', '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)')
                    selections[0].style.setProperty('--n-box-shadow-hover', '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)')
                    selections[0].style.setProperty('--n-font-size', '16px')
                    selections[0].style.setProperty('--n-height', '40px')
                    selections[0].style.setProperty('--n-caret-color', 'black')
                    selections[0].style.setProperty('--n-placeholder-color', 'grey')
                    selections[0].style.setProperty('--n-text-color', 'black')
                    selections[0].style.setProperty('--n-arrow-color', 'black')
                }
                // if (tags.length > 0) {
                //     tags[0].style.setProperty('--n-color', 'red')
                // }
            }, 50)
            
        }
    }
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
    margin-top: 10px;
    padding-top: 3%;
    padding-bottom: 3%;
    word-wrap: break-word;
}

.single-card-img-container {
    width: 155px;
    height: 155px;
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

.upload-icon:hover {
    cursor: pointer;
}
</style>