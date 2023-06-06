<template>
    <div class="fan-list-title">
        记录心动瞬间
    </div>
    <div class="loading-animate" v-if="isLoading">
        <n-progress style="height: 50px; width: 400px" class="animate__animated" type="line"
            :percentage="loadingPercentage" rail-color="lightgrey" :style="{
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
        <list-table :position="'PublicView'" :viewMode="'user'" v-model:songData="songs"></list-table>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import 'animate.css'
import { MusicalNotesOutline, CheckmarkCircleOutline } from '@vicons/ionicons5'
import ListTable from './tables/ListTable/ListTable.vue'
export default {
    components: {
        MusicalNotesOutline,
        CheckmarkCircleOutline,
        ListTable,
    },
    data() {
        return {
            loadingPercentage: 0,
            loadingIconShouldOut: false,
            isLoading: true,
            songs: [],
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'accentColor', 'colorMode']),
    },
    async created() {
        let t1 = setInterval(() => {
            this.loadingPercentage += 1
        }, 300)
        let i = 0
        this.$http.get('/api/like/of/0/').then((response) => {
            this.songs = response.data.music_set.map(song => ({
                key: i++,
                name: song.name,
                singer: song.artist,
                id: song.id,
                length: `${Math.floor(song.duration / 60)}`.padStart(2, '0') + ':' + `${Math.floor(song.duration % 60)}`.padStart(2, '0'),
                imgSrc: song.cover,
                isLiked: song.is_like,
                isCollected: song.is_favorite,
                showCollection: false,
            }))
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
        });
    },
    methods: {
        
    },
}
</script>
<style scoped>
.fan-list-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 5px;
    /* text-align: center; */
}

.loading-animate {
    padding-top: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>