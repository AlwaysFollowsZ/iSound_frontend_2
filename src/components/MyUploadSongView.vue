<template>
    <div class="already-upload-song-sheet">
        <div class="upload-song-sheet-title">
            已上传的歌曲
        </div>
        <div style="text-align:center;position: relative;"><image-table :rows="songData" :handleClickEntry="playSong"
                @flushUploadSongs="updateSongs" :position="'UploadedSongs'" @clickUpload="jumpToUploadSong"
                :entrySize="[200, 200]"></image-table></div>
    </div>
    <upload-song-view @flushUploadSongs="updateSongs" :showUploadSong="goToUploadSong"
        @closeUploadWindow="goToUploadSong = false"></upload-song-view>
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
        let songData = [];//收藏夹数据
        this.updateSongs()//获取收藏夹数据
        return {
            songData,
            goToUploadSong: false,
            uploadSongEntryLogoUrl: "/src/assets/upload-logo.png",
        }
    },
    methods: {
        playSong(Id) {
            this.$EventBus.emit('play', Id)
            this.$emit('exit')
            setTimeout(() => {
                this.$router.push(`/player/${Id}`)
            }, 900)
        },
        clickSong(Id) {
            this.$emit('exit')
            setTimeout(() => {
                this.$router.push(`/listdetail/${Id}`)
            }, 900)
        },//点击收藏夹。这时候应该跳转到收藏夹详情页面
        updateSongs() {
            this.$http.get('/api/music/of/0/').then((response) => {
                let key = 0
                if (response.data.music_set.length == 0) {
                    this.songData = []
                    return
                }
                this.songData = response.data.music_set.map((song) => {
                    return {
                        Singer: song.artist,
                        Key: key++,
                        Id: song.id,
                        imagePath: song.cover,
                        Name: song.name,
                        Type: 'Song'
                    }
                })
            })
        },
        jumpToUploadSong() {
            this.goToUploadSong = true;
            // n-select 样式只能这么修改
            // 等待 DOM 加载，然后再获取，否则获取不到
            setTimeout(() => {
                let selections = document.getElementsByClassName('n-base-selection n-base-selection--multiple')

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
.already-upload-song-list {
    position: relative;
}

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