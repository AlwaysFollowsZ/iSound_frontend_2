<template>
    <top-nav></top-nav>
    <div>
        <n-grid :x-gap="12">
            <n-gi :span="7"></n-gi>
            <n-gi :span="9">
                <div style="padding-top: 30px; display: flex; justify-content: center">
                    <n-input type="text" v-model:value="searchValue" placeholder="请输入关键字" @keyup.enter="search" 
                        :style="{
                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                            '--n-font-size': '18px',
                            '--n-border-radius': '12px',
                            '--n-height': '40px',
                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                            '--n-border': '1px solid rgb(224, 224, 230)',
                            '--n-border-hover': '1px solid ' + 'rgb(' + this.accentColor + ')',
                            '--n-border-focus': '1px solid ' + 'rgb(' + this.accentColor + ')',
                            '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                        }"
                    />
                </div>
            </n-gi>
            <n-gi :span="1">
                <div style="">
                    <div style="padding-top: 30px" class="search-icon"
                        :style="{ 'color': this.searchIconIsHovered ? 'rgba(' + this.accentColor + ', 0.9)' : 'lightgrey' }"
                        @mouseover="this.searchIconIsHovered = true" @mouseout="this.searchIconIsHovered = false">
                        <n-icon  size="40px" @click="search">
                            <SearchOutline/>
                        </n-icon>
                    </div>
                </div> 
            </n-gi> 
        </n-grid>      
    </div>
    <div class="tab-container" :key="this.refresh">
        <n-tabs size="large" type="line" animated
            :style="{
            '--n-bar-color': 'rgba(' + this.accentColor + ', 1)',
            '--n-tab-text-color': this.colorMode === 'white' ? 'black' : 'white',
            '--n-tab-text-color-active': 'rgba(' + this.accentColor + ', 1)',
            '--n-tab-text-color-hover': 'rgba(' + this.accentColor + ', 0.85)',
            '--n-pane-text-color': 'rgba(' + this.accentColor + ', 0.9)',
            '--n-tab-border-color': 'rgba(' + this.accentColor + ', 0.6)',
            }"
        >   
            <n-tab-pane name="歌曲" tab="歌曲">
                <list-table  :position="'PublicView'" :viewMode="'user'" v-model:songData="songs"></list-table>
            </n-tab-pane>
            <n-tab-pane name="歌单" tab="歌单">
                <!-- <fan-list-view /> -->
            </n-tab-pane>
        </n-tabs> 
    </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import ListTable from "../components/tables/ListTable/ListTable.vue"
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
    },
    data() {
        return {
            refresh: 0,
            searchIconIsHovered: false,
            songs: [],
            songlists: [],
            searchValue: '',
        }
    },
    watch: {
        '$route'() {
            // this.refresh++
            window.location.reload()
        },
    },
    created() {
        const keyword = this.$route.params.keyword
        this.searchValue = keyword
        this.$http.get(`/api/search/`, {
            params: { 'title': keyword }
        }).then((response) => {
            let i = 0
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
            this.songlists = response.data.playlist_set.map(songlist => ({
                // do something
            }))
        })
    },
    methods: {
        search() {
            if (this.searchValue.trim().length !== 0) {
                console.log(`searchValue: ${this.searchValue}`)
                this.$http.get(`/api/search/`, {
                    params: { 'title': this.searchValue }
                }).then((response) => {
                    let i = 0
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
                    this.songlists = response.data.playlist_set.map(songlist => ({
                        // do something
                    }))
                })
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
</style>