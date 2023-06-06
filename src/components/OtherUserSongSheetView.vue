<template>
    <div class="song-sheet-title">
        全部歌单
    </div>
    <div class="song-sheet-body">
        <div v-if="this.songLists.length == 0" class="no-result-info">
            ta还没有分享的歌单...看看别的地方吧
        </div>
        <div v-else>
            <div style="text-align:center"><image-table :position="'ResultView'" :rows="songLists" :entrySize="[200, 200]"
                    @flushSonglists="updateSonglists" :handleClickEntry="clickSonglists"></image-table></div>
        </div>
    </div>
</template>
<script>
import 'animate.css';
export default {
    data() {
        return {
            songLists: [],
            loadingPercentage: 0,
            loadingIconShouldOut: false,
            isLoading: true,
        }
    },
    mounted() {
        let i = 0;
        this.$watch(
            () => this.$route.params,
            (newParams) => {
                const userId = newParams.userId;
                this.$http.get(`/api/playlist/of/${userId}/`, { params: { 'shared': 'True' } }).then((response) => {
                    this.songLists = response.data.playlist_set.map(songlist => ({
                        Key: i++,
                        Id: songlist.id,
                        imagePath: songlist.cover,
                        Name: songlist.title,
                        songCount: songlist.music_set.length,
                        Type: 'songList'
                    }));

                })
            },
            { immediate: true }
        );

    },
    methods: {
        clickSonglists(Id) {
            this.$router.push(`/listdetail/${Id}`)
        },
    },
    components: {
    },
}
</script>
<style scoped>
.song-sheet-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
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

.loading-animate {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>