<template>
    <div class="other-upload-song-title">
        全部歌曲
    </div>
    <div v-if="this.songs.length == 0" class="no-result-info">
        ta还没有上传的歌曲...看看别的地方吧
    </div>
    <div v-else>
        <div style="text-align:center"><image-table :rows="songs" :handleClickEntry="playSong" :position="'ResultView'"
                :entrySize="[200, 200]"></image-table></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            songs: [],
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (newParams) => {
                const userId = newParams.userId;
                this.$http.get(`/api/music/of/${userId}/`).then((response) => {
                    let key = 0
                    if (response.data.music_set.length == 0) {
                        this.songs = []
                        return
                    }
                    this.songs = response.data.music_set.map((song) => {
                        return {
                            Singer: song.artist,
                            Key: key++,
                            Id: song.id,
                            imagePath: song.cover,
                            Name: song.name,
                            Type: 'Song'
                        }
                    })
                }
                )
            },
            { immediate: true }
        )
    },
    methods: {
        playSong(Id) {
            this.$EventBus.emit('play', Id)
        },
    },
    components: {
    }
}
</script>
<style scoped>
.other-upload-song-title {
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
</style>