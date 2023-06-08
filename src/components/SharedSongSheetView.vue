<template>
    <div :style="{ 'position': 'relative' }">
        <div class="shared-song-sheet-title">
            全部分享歌单
        </div>
        <!-- <div class="no-result-info" v-if="this.songlistData.length == 0">
            暂无已分享的歌单...从收藏夹分享一个？
        </div>
        <div v-else> -->
        <div style="text-align:center"><image-table :position="'Songlist'" :rows="songlistData" :entrySize="[200, 200]"
                @flushSonglists="updateSonglists" :handleClickEntry="clickSonglists"></image-table></div>
        <!-- </div> -->
    </div>
</template>
<script>
import 'animate.css';
import ImageTable from '/src/components/tables/ImageTable/ImageTable.vue';
export default {
    components: {
        ImageTable
    },
    methods: {
        clickSonglists(Id) {
            this.$router.push(`/listdetail/${Id}`)
        },//点击收藏夹。这时候应该跳转到收藏夹详情页面
        updateSonglists() {
            if (this.$cookies.isKey('userid')) {
                this.$http.get('/api/playlist/of/0/',
                    {
                        params: {
                            'shared': 'True'
                        }
                    }).then((response) => {
                        let key = 0
                        if (response.data.playlist_set.length == 0) {
                            this.songlistData = []
                            return
                        }
                        this.songlistData = response.data.playlist_set.map((songlist) => {
                            return {
                                Key: key++,
                                Id: songlist.id,
                                imagePath: songlist.cover,
                                Name: songlist.title,
                                songCount: songlist.music_set.length,
                                Type: 'songList'
                            }
                        })
                    })
            }
        }
    },
    data() {
        let songlistData = [];//收藏夹数据
        this.updateSonglists()//获取收藏夹数据
        return {
            songlistData,
            songSheets: [
                {
                    imgSrc: "/src/assets/song2.jpg",
                    title: "给自己的情书",
                    jumpLink: "1",
                    singer: "王菲"
                },
                {
                    imgSrc: "/src/assets/song3.jpg",
                    title: "Yesterday Once More",
                    jumpLink: "2",
                    singer: "Carpenters"
                },
                {
                    imgSrc: "/src/assets/song4.jpg",
                    title: "守时",
                    jumpLink: "3",
                    singer: "王菲"
                },
                {
                    imgSrc: "/src/assets/song1.jpg",
                    title: "陪你度过漫长岁月",
                    jumpLink: "4",
                    singer: "陈奕迅"
                },
            ]
        }
    },
}
</script>
<style scoped>
.shared-song-sheet-title {
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
    width: 330px;
    height: 200px;
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

.no-result-info {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    text-align: center;
    opacity: 0.8;
    /* 不透明度 */
}
</style>