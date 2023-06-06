<template>
  <div><admin-top-nav :isSearchPage="true"></admin-top-nav></div>
  <div class="message-page-search">
    <n-grid>
      <n-gi :span="3"></n-gi>
      <n-gi :span="14">
        <div style="padding-top: 7%">
          <n-input
            :style="{
              '--n-color': 'white',
              '--n-color-focus': 'white',
              '--n-border-radius': `10px`,
              '--n-height': '50px',
              '--n-text-color': 'black',
              '--n-caret-color': 'black',
              '--n-border': '1px solid rgb(224, 224, 230)',
              '--n-border-hover': '1px solid ' + 'lightgrey',
              '--n-border-focus': '1px solid ' + 'lightgrey',
              '--n-box-shadow-focus': '0 0 0 2px ' + 'grey',
              '--n-font-size': '20px',
            }"
            type="text"
            v-model:value="searchValue"
            placeholder="输入关键字以检索"
            @keyup.enter="search()"
          />
        </div>
      </n-gi>
      <n-gi :span="1"></n-gi>
      <n-gi :span="1">
        <div class="search-icon" style="color: lightgray; padding-top: 40px">
          <n-icon size="50px"><SearchOutline @click="search()" /></n-icon>
        </div>
      </n-gi>
      <n-gi :span="4"></n-gi>
    </n-grid>
  </div>
  <div class="tab-container">
    <n-tabs
      size="large"
      type="line"
      animated
      :style="{
        '--n-bar-color': 'black',
        '--n-tab-text-color': 'black',
        '--n-tab-text-color-active': 'black',
        '--n-tab-text-color-hover': 'rgba(' + '0,0,0' + ', 0.85)',
        '--n-pane-text-color': 'rgba(' + '0,0,0' + ', 0.9)',
        '--n-tab-border-color': 'rgba(' + '0,0,0' + ', 0.6)',
      }"
    >
      <n-tab-pane name="歌曲" tab="歌曲">
        <list-table
          :key="refresh"
          :position="'PublicView'"
          :viewMode="'user'"
          v-model:songData="songs"
        ></list-table>
      </n-tab-pane>
      <n-tab-pane name="歌单" tab="歌单">
        <image-table
          :key="refresh"
          :position="'SongList'"
          :table-size="[1350]"
          :entry-size="[330, 240]"
          v-model:rows="songlists"
        >
        </image-table>
      </n-tab-pane>
      <template #suffix>
        <div class="show-all" @click="showAll">显示全部</div>
      </template>
    </n-tabs>
  </div>
</template>

<script>
import { BellOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import { SearchOutline } from "@vicons/ionicons5";
import AdminTopNav from "../components/AdminTopNav.vue";
export default defineComponent({
  components: {
    BellOutlined,
    SearchOutline,
    AdminTopNav,
  },
  data() {
    return {
      refresh: 1,
      searchValue: "",
      all_songs: [],
      all_songlists: [],
      songs: [],
      songlists: [],
    };
  },
  created() {
    this.$http.get(`/api/index/`).then((response) => {
      let i = 0;
      this.all_songs = response.data.music_set.map((song) => ({
        key: i++,
        name: song.name,
        singer: song.artist,
        id: song.id,
        length:
          `${Math.floor(song.duration / 60)}`.padStart(2, "0") +
          ":" +
          `${Math.round(song.duration % 60)}`.padStart(2, "0"),
        imgSrc: song.cover,
        isLiked: song.is_like,
        isCollected: false,
        showCollection: false,
      }));
      this.songs = this.all_songs;
      this.all_songlists = response.data.playlist_set.map((songlist) => ({
        Key: j++,
        Type: "songList",
        imagePath: "/src/assets/song1.jpg", // === NEED TO BE REPLACED ===
        songCount: songlist.music_set.length,
        Name: songlist.title,
      }));
      this.refresh++;
    });
  },
  methods: {
    search() {
      if (this.searchValue.trim().length !== 0) {
        let i = 0,
          j = 0;
        this.$http
          .get(`api/search/`, {
            params: { keyword: this.searchValue.trim() },
          })
          .then((response) => {
            this.songs = response.data.music_set.map((song) => ({
              key: i++,
              name: song.name,
              singer: song.artist,
              id: song.id,
              length:
                `${Math.floor(song.duration / 60)}`.padStart(2, "0") +
                ":" +
                `${Math.round(song.duration % 60)}`.padStart(2, "0"),
              imgSrc: song.cover,
              isLiked: song.is_like,
              isCollected: false,
              showCollection: false,
            }));
            this.songlists = response.data.playlist_set.map((songlist) => ({
              Key: j++,
              Id: songlist.id,
              Type: "SongList",
              imagePath: songlist.cover, // === NEED TO BE REPLACED ===
              songCount: songlist.music_set.length,
              Name: songlist.title,
            }));
          });
      }
    },
    showAll() {
      this.songs = this.all_songs;
      this.songlists = this.all_songlists;
      this.searchValue = "";
      this.refresh--;
    },
  },
});
</script>

<style scoped>
.message-page-search {
  padding-top: 2%;
}
.search-icon:hover {
  cursor: pointer;
}
.tab-container {
  margin-left: 180px;
  margin-right: 180px;
}
.show-all {
  font-size: 16px;
  color: cornflowerblue;
}
.show-all:hover {
  cursor: pointer;
}
</style>
