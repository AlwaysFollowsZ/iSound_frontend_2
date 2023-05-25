<template>
    <top-nav></top-nav>
    <div class="search-input">
        <n-grid>
            <n-gi :span="3"></n-gi>
            <n-gi :span="14">
                <div style="padding-top: 7%" @click="console.log(songs.length)">
                <n-input class="main-input" round type="text" v-model:value="searchValue" placeholder="请输入关键字" @keyup.enter="search()" />
                </div>
            </n-gi>
            <n-gi :span="2"></n-gi>
            <n-gi :span="1">
            <div style="color:lightgray; padding-top: 100%">
                <SearchOutline size="30px" @click="search()" />
            </div> 
            </n-gi> 
            <n-gi :span="4"></n-gi>
        </n-grid>      
    </div>
    <div>
        <div v-for="(song, idx) in songs" :key="idx">
            <img :src="song.cover" alt="no img"/>
            <br/>
            {{ song.name }}
            <br/>
            {{ song.singer }}
            <br/>
            {{ song.length }}
            <br/>
        </div>
    </div>
    <!-- <div class="music-list-header">
        <a-tabs v-model:activeKey="activeKey" >
        <a-tab-pane key="1">
        <template #tab>
            <span><apple-outlined />歌曲</span>
        </template>
            <a-card title="Default size card" style="width: 300px">
            <template #extra><a href="#">more</a></template>
            <p>待插入歌曲列表组件</p>
            <p>card content</p>
            <p>card content</p>
            </a-card>
        </a-tab-pane>

        <a-tab-pane key="2">
        <template #tab>
            <span><android-outlined />歌单</span>
        </template>
        待插入歌单列表
        </a-tab-pane>
    </a-tabs>
    </div> -->
</template>

<script>
import TopNav from '../components/TopNav.vue'
import { defineComponent } from 'vue';
import { SearchOutline } from '@vicons/ionicons5'
export default {
    name: 'SearchResultView',
    components: {
        TopNav,
        SearchOutline,
        
    },
    data() {
        return {
            songs: [],
            songlists: [],
            searchValue: '',
        }
    },
    created() {
        const keyword = this.$route.params.keyword
        this.searchValue = keyword
        this.$http.get(`/api/search/`, {
            params: { 'title': keyword }
        }).then((response) => {
            this.songs = response.data.music_set.map(song => ({
                name: song.name,
                singer: song.artist,
                length: song.duration,
                cover: song.cover,
                uploader: song.up,
                audioURL: song.url,
                isLike: song.is_like,
                isFavorate: song.is_favorite,
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
                // jump to search page
                this.$router.push("/searchresult/" + this.searchValue)
                this.searchValue = ''
            }
        },
    }
};
</script>

<style scoped>
.search-input {
    position: fixed;
    top: 80px;
    width: 60vw;
    margin: 0 20vw;
}
.n-input.main-input{
    transform: scale(1.2, 1.2);
    position: relative;
} 
.music-list-header {
    position: fixed;
    top: 200px;
    left: 10vw;
    width: 80vw;
    height: 100vw;
    background: rgb(235, 237, 240);
    margin: 0;
    padding: 0 15px;
}
</style>