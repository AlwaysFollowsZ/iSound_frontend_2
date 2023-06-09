<template>
    <div class="top-nav-container"><top-nav /></div>
    <div class="tag-view-container">
        <n-grid x-gap="12">
            <n-gi :span="3"></n-gi>
            <n-gi :span="18">
                <div class="tag-table-container">
                    <div class="tag-prompt" :style="{ 'color': 'rgb(' + this.accentColor + ')' }">分类标签“{{ this.tag }}”的搜索结果
                    </div>
                </div>
                <div class="tag-search-results">
                    <n-tabs size="large" type="line" animated :style="{
                        '--n-bar-color': 'rgba(' + this.accentColor + ', 1)',
                        '--n-tab-text-color': this.colorMode === 'white' ? 'black' : 'white',
                        '--n-tab-text-color-active': 'rgba(' + this.accentColor + ', 1)',
                        '--n-tab-text-color-hover': 'rgba(' + this.accentColor + ', 0.85)',
                        '--n-pane-text-color': 'rgba(' + this.accentColor + ', 0.9)',
                        '--n-tab-border-color': 'rgba(' + this.accentColor + ', 0.6)',
                    }">
                        <n-tab-pane name="歌曲" tab="歌曲">
                            <div v-if="this.songs.length == 0" class="no-result-info">
                                暂无搜索结果...
                            </div>
                            <div v-else>
                                <list-table :key="this.$route.params.keyword" :position="'PublicView'" :viewMode="'user'"
                                    v-model:songData="songs"></list-table>
                            </div>
                        </n-tab-pane>
                        <n-tab-pane name="歌单" tab="歌单">
                            <div v-if="this.songLists.length == 0" class="no-result-info">
                                暂无搜索结果...
                            </div>
                            <div v-else>
                                <image-table :key="this.$route.params.keyword" :table-size="[1100,]"
                                    :entry-size="[330, 240]" v-model:rows="songLists" :handleClickEntry="jumpToSonglist"> </image-table>
                            </div>
                        </n-tab-pane>
                    </n-tabs>
                    <!-- <list-table :position="'PublicView'" :viewMode="'user'" v-model:songData="songs"></list-table> -->
                </div>
            </n-gi>
            <n-gi :span="3"></n-gi>
        </n-grid>
    </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import TagTable from '../components/tables/TagTable/TagTable.vue';
import ImageTable from '../components/tables/ImageTable/ImageTable.vue'
import ListTable from "../components/tables/ListTable/ListTable.vue"
import { mapState } from 'vuex'
export default {
    name: "TagClickView",
    computed: {
        ...mapState(['accentColor', 'colorMode']),
    },
    components: {
        TopNav,
        TagTable,
        ListTable,
        ImageTable,
    },
    data() {
        return {
            tag: '',
            songs: [],
            songLists: [],
        }
    },
    created() {
        const tagName = this.$route.params.tagName;
        this.tag = tagName;
        this.$http.get(`/api/search/`, { params: { 'tags': tagName } }).then((response) => {
            let i = 0, j = 0;
            this.songs = response.data.music_set.map(song => ({
                key: i++,
                name: song.name,
                singer: song.artist,
                id: song.id,
                length: `${Math.floor(song.duration / 60)}`.padStart(2, '0') + ':' + `${Math.round(song.duration % 60)}`.padStart(2, '0'),
                imgSrc: song.cover,
                isLiked: song.is_like,
                isCollected: false,
                showCollection: false,
            }))
            this.songLists = response.data.playlist_set.map(songlist => ({
                Key: j++,
                Type: 'songList',
                imagePath: songlist.cover,     // === NEED TO BE REPLACED ===
                songCount: songlist.music_set.length,
                Name: songlist.title,
                Id: songlist.id,
            }))
        });
    },
    watch: {
        '$route'() {
            window.location.reload();
        }
    },
    methods: {
        jumpToSonglist(id) {
            this.$router.push(`/listdetail/${id}/`)
        }
    },
}
</script>
<style scoped>
.tag-prompt {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 5px;
    transition: color 1s;
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