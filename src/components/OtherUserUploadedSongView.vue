<template>
    <div class="other-upload-song-title">
        全部歌曲
    </div>
    <div class="loading-animate" v-if="isLoading">
        <n-progress style="height: 50px; width: 400px" class="animate__animated" type="line" :percentage="loadingPercentage"
            rail-color="lightgrey" :style="{
                '--n-fill-color':
                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                        'grey' :
                        'rgb(' + this.accentColor + ')',
            }" :class="[`${this.loadingIconShouldOut ? 'animate__zoomOut' : 'animate__zoomIn'}`]">
            <template #default>
                <div v-if="this.loadingPercentage < 95">
                </div>
                <div v-else>
                </div>
            </template>
        </n-progress>
    </div>
    <div class="animate__animated animate__slideInUp" style="animation-duration: 0.9s" v-else>
        <div v-if="this.songs.length == 0" class="no-result-info">
            ta还没有上传的歌曲...看看别的地方吧
        </div>
        <div v-else>
            <div style="text-align:center"><image-table :rows="songs" :handleClickEntry="playSong" :position="'ResultView'"
                    :entrySize="[200, 200]"></image-table></div>
        </div>
    </div>
</template>
<script>
import 'animate.css'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            songs: [],
            loadingPercentage: 0,
            loadingIconShouldOut: false,
            isLoading: true,
        }
    },
    computed: {
        ...mapState(['colorMode', 'accentColor']),
    },
    created() {

        this.$watch(
            () => this.$route.params,
            (newParams) => {
                const userId = newParams.userId; 
                let t1 = setInterval(() => {
                    this.loadingPercentage += 1
                }, 300)
                this.$http.get(`/api/music/of/${userId}/`).then((response) => {
                    let key = 0
                    this.songs = response.data.music_set.map(song => ({
                        Singer: song.artist,
                        Key: key++,
                        Id: song.id,
                        imagePath: song.cover,
                        Name: song.name,
                        Type: 'Song'
                    }));
                    if (this.loadingPercentage >= 100) {
                        clearInterval(t1)
                        this.loadingIconShouldOut = true
                        setTimeout(() => {
                            this.isLoading = false
                        }, 500)
                    } else {
                        let t2 = setInterval(() => {
                            this.loadingPercentage += 10
                        }, 50)
                        setTimeout(() => {
                            clearInterval(t1)
                            clearInterval(t2)
                            this.loadingIconShouldOut = true
                            setTimeout(() => {
                                this.isLoading = false
                            }, 500)
                        }, 1500)
                    }
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

.loading-animate {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>