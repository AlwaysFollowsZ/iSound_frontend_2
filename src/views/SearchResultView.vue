<template>
    <top-nav></top-nav>
    <div>
        <n-grid :x-gap="12">
            <n-gi :span="7"></n-gi>
            <n-gi :span="9">
                <div style="padding-top: 30px; display: flex; justify-content: center">
                    <n-input type="text" v-model:value="searchValue" placeholder="歌曲、歌单以及更多内容" @keyup.enter="search" :style="{
                        '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                        '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                        '--n-font-size': '18px',
                        '--n-border-radius': '12px',
                        '--n-height': '50px',
                        '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                        '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                        '--n-border': '1px solid rgb(224, 224, 230)',
                        '--n-border-hover': '1px solid ' + 'rgb(' + this.accentColor + ')',
                        '--n-border-focus': '1px solid ' + 'rgb(' + this.accentColor + ')',
                        '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                    }" />
                </div>
            </n-gi>
            <n-gi :span="1">
                <div style="">
                    <div style="padding-top: 35px" class="search-icon"
                        :style="{ 'color': this.searchIconIsHovered ? 'rgba(' + this.accentColor + ', 0.9)' : 'lightgrey' }"
                        @mouseover="this.searchIconIsHovered = true" @mouseout="this.searchIconIsHovered = false">
                        <n-icon size="40px" @click="search">
                            <SearchOutline />
                        </n-icon>
                    </div>
                </div>
            </n-gi>
        </n-grid>
    </div>
    <div class="tab-container">
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
                <div v-if="this.songlists.length == 0" class="no-result-info">
                    暂无搜索结果...
                </div>
                <div v-else>
                    <image-table :key="this.$route.params.keyword" :table-size="[1350,]" :entry-size="[330, 240]"
                        v-model:rows="songlists" :position="'ResultView'"> </image-table>
                </div>
            </n-tab-pane>
            <n-tab-pane name="用户" tab="用户">
                <div v-if="this.userlist.length == 0" class="no-result-info">
                    暂无搜索结果...
                </div>
                <div v-else>
                    <user-list :list="userlist"></user-list>
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import ImageTable from '../components/tables/ImageTable/ImageTable.vue'
import ListTable from "../components/tables/ListTable/ListTable.vue"
import UserList from "../components/UserList.vue"
import { SearchOutline } from '@vicons/ionicons5'
import { mapState } from 'vuex'
export default {
    name: 'SearchResultView',
    computed: {
        ...mapState(['accentColor', 'colorMode']),
    },
    components: {
        TopNav,
        SearchOutline,
        ListTable,
        ImageTable,
        UserList,
    },
    data() {
        return {
            refresh: 0,
            searchIconIsHovered: false,
            songs: [],
            songlists: [],
            userlist: [],
            searchValue: '',
        }
    },
    watch: {
        '$route'(to, from) {
            if (to.params.keyword !== from.params.keyword) {
                const keyword = this.$route.params.keyword
                this.setAndSearchKeyword(keyword)
            }
        }
    },
    created() {
        const keyword = this.$route.params.keyword
        this.setAndSearchKeyword(keyword)
    },
    methods: {
        setAndSearchKeyword(keyword) {
            let i = 0, j = 0
            let tmpSong = [], tmpList = []
            let songIDs = [], listIDs = []
            this.searchValue = keyword
            this.$http.get(`/api/search/`, {
                params: { 'keyword': keyword }
            }).then((response) => {
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
                this.songlists = response.data.playlist_set.map(songlist => ({
                    Key: j++,
                    Type: 'songList',
                    imagePath: '/src/assets/song1.jpg',     // === NEED TO BE REPLACED ===
                    songCount: songlist.music_set.length,
                    Name: songlist.title,
                }))
                this.userlist = response.data.up_set.map(user => ({
                    id: user.id,
                    name: user.username,
                    bio: user.profile,
                    avatarImg: user.avatar,
                    isFollowing: user.is_followed,
                }))
            })
            for (let i = 0; i < this.songs.length; i++) {
                songIDs.push(this.songs[i].id)
            }
            // === DO NOT MODIFY ===
            // for (let i = 0; i < this.songlists.length; i++) {
            //     listIDs.push(this.songlists[i].id)
            // }
            this.$http.get(`/api/search/`, {
                params: { 'tags': keyword }
            }).then((response) => {
                tmpSong = response.data.music_set.map(song => ({
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
                tmpList = response.data.playlist_set.map(songlist => ({
                    Key: j++,
                    Type: 'songList',
                    imagePath: '/src/assets/song1.jpg',     // === NEED TO BE REPLACED ===
                    songCount: songlist.music_set.length,
                    Name: songlist.title,
                }))
                for (let i = 0; i < tmpSong.length; i++) {
                    if (songIDs.indexOf(tmpSong[i].id) === -1) {
                        this.songs.push(tmpSong[i])
                        songIDs.push(tmpSong[i].id)
                    }
                }
                // === DO NOT MODIFY ===
                // for (let i = 0; i < tmpList.length; i++) {
                //     if (listIDs.indexOf(tmpList[i].id) === -1) {
                //         this.songlists.push(tmpList[i])
                //         listIDs.push(tmpList[i].id)
                //     }
                // }
            })
        },
        search() {
            if (this.searchValue.trim().length !== 0) {
                this.$router.push("/searchresult/" + this.searchValue)
                this.searchValue = ''
            }
        },
    }
};
</script>

<style scoped>
.search-icon:hover {
    cursor: pointer;
}

.tab-container {
    margin-left: 80px;
    margin-right: 80px;
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