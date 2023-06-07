<template>
  <div><top-nav></top-nav></div>
  <div class="img-show" :class="{ 'animate__animated animate__zoomIn': !isLoggedIn }">
    <n-grid>
      <n-gi :span="24">
        <div style="padding-bottom: 0%; padding-left: 4.5%">
          <div style="
          /* min-width:1400px; */
          margin-bottom: 0; font-size: 30px; font-weight: bold; transition: color 1s;"
            :style="{ 'color': 'rgb(' + this.accentColor + ')' }" @click="prompt('hello')">
            来点不一样的歌单
          </div>
        </div>
        <div class="carousel-container">
          <n-carousel :autoplay="true" :interval="5000" effect="card"
            prev-slide-style="transform: translateX(-120%) translateZ(-500px);"
            next-slide-style="transform: translateX(20%) translateZ(-500px);" style="height: 85%" :show-dots="true">
            <n-carousel-item class="carousel-item-container" :style="{ width: '60%' }"
              v-for="(songlist, idx) in songlists" :key="idx">
              <img class="carousel-img" :src="songlist.path" draggable="false" @click="jumpToSongList(songlist.id)">
            </n-carousel-item>
          </n-carousel>
        </div>
      </n-gi>
    </n-grid>
  </div>
  <div v-if="scrollPromptShouldDisplay && !isLoggedIn"
    :class="[`${songEntryShouldAnimate && !isLoggedIn ? 'animate__animated animate__zoomOut' : 'animate__animated animate__zoomIn animate__slow'}`]">
    <n-grid>
      <n-gi :span="9"></n-gi>
      <n-gi :span="8">
        <div class="scroll-prompt rainbow-text" style="min-width: 1400px">往下滑，探索新世界</div>
      </n-gi><n-gi :span="7"></n-gi>
    </n-grid>
  </div>


  <div v-if="songEntryShouldAnimate || isLoggedIn">
    <div class="animate__animated" :class="{ 'animate__slideInLeft': songEntryShouldAnimate && !isLoggedIn }" style=" 
      min-width:1400px;padding-left: 4.5%; margin-bottom: 0; font-size: 30px; font-weight: bold; transition: color 1s;"
      :style="{ 'color': 'rgb(' + this.accentColor + ')' }">现在就听</div>
    <div class="song-entry-outter animate__animated"
      :class="{ 'animate__fadeInRight': songEntryShouldAnimate && !isLoggedIn }">
      <n-grid :x-gap="0" :y-gap="0">
        <n-gi :span="6" v-for="(song, idx) in songs.slice(6, 18)" :key="idx">
          <div class="song-entry-card-container">
            <div class="song-entry-container">
              <div style="padding-bottom: 3%; padding-top: 3%; height: 15px;">
                <!-- <hr style="box-shadow: none;  margin: 0; transition: color 1s;" 
                :style="{'border-color': 'rgba(' + this.accentColor + ',0.7)', 'background-color': 'rgba(' + this.accentColor + ',0.7)'}"
                /> -->
              </div>
              <n-grid @click="jumpToSong(song.id)" class="song-entry-content">
                <n-gi :span="4">
                  <div class="song-entry-img-container">
                    <img class="song-entry-img" :src="song.imgSrc" draggable="false">
                  </div>
                </n-gi>
                <n-gi :span="2"></n-gi>
                <n-gi :span="15">
                  <div class="song-entry-info-container">
                    <div class="song-entry-info-name"
                      :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                      <n-ellipsis style="max-width: 200px">{{ song.title }}</n-ellipsis>
                    </div>
                    <div class="song-entry-info-singer" :style="{ 'color': 'rgba(' + this.accentColor + ',0.7)' }">
                      <n-ellipsis style="max-width: 200px">{{ song.singer }}</n-ellipsis>
                    </div>
                  </div>
                </n-gi>
              </n-grid>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </div>
  <div ref="songEntryRef" class="placeholder" v-else></div>

  <div v-if="cardsShouldAnimate || isLoggedIn">
    <div class="animate__animated" :class="{ 'animate__slideInLeft': cardsShouldAnimate && !isLoggedIn }"
      style="min-width:1400px; padding-left: 4.5%; margin-bottom: 0; font-size: 30px; font-weight: bold; transition: color 1s;"
      :style="{ 'color': 'rgb(' + this.accentColor + ')' }">猜你喜欢</div>
    <div class="card-container animate__animated " :class="{ 'animate__fadeInRight': cardsShouldAnimate && !isLoggedIn }">
      <n-grid :col="6">
        <n-gi :span="4" v-for="(song, idx) in songs.slice(0, 6)" :key="idx">
          <div class="single-card-container-wrap">
            <div class="single-card-container">
              <div class="single-card-img-container">
                <img class="single-card-img" draggable="false" :src="song.imgSrc" @click="jumpToSong(song.id)">
              </div>
              <div class="single-card-info-container">
                <div class="single-card-info-name" :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                  <n-ellipsis style="max-width: 160px" @click="jumpToSong(song.id)">{{ song.title }}</n-ellipsis>
                </div>
                <div class="single-card-info-singer" :style="{ 'color': 'rgba(' + this.accentColor + ',0.7)' }">
                  <n-ellipsis style="max-width: 160px">{{ song.singer }}</n-ellipsis>
                </div>
              </div>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </div>
  <div ref="songCardRef" class="placeholder" v-else></div>


  <div v-if="hotsShouldAnimate || isLoggedIn">
    <div class="animate__animated" :class="{ 'animate__slideInLeft': hotsShouldAnimate && !isLoggedIn }"
      style="min-width:1400px; padding-left: 4.5%; margin-bottom: 0; font-size: 30px; font-weight: bold; transition: color 1s;"
      :style="{ 'color': 'rgb(' + this.accentColor + ')' }">最近热门</div>
    <div class="card-container animate__animated " :class="{ 'animate__fadeInRight': hotsShouldAnimate && !isLoggedIn }">
      <n-grid :col="6">
        <n-gi :span="4" v-for="(song, idx) in hotSongs.slice(0, 6)" :key="idx">
          <div class="single-card-container-wrap">
            <div class="single-card-container">
              <div class="single-card-img-container">
                <img class="single-card-img" draggable="false" :src="song.imgSrc" @click="jumpToSong(song.id)">
              </div>
              <div class="single-card-info-container">
                <div class="single-card-info-name" :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                  <n-ellipsis style="max-width: 160px" @click="jumpToSong(song.id)">{{ song.title }}</n-ellipsis>
                </div>
                <div class="single-card-info-singer" :style="{ 'color': 'rgba(' + this.accentColor + ',0.7)' }">
                  <n-ellipsis style="max-width: 160px">{{ song.singer }}</n-ellipsis>
                </div>
              </div>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </div>
  <div ref="songHotRef" class="placeholder" v-else></div>


  <div v-if="tagShouldAnimate || isLoggedIn">
    <div class="animate__animated" :class="{ 'animate__slideInLeft': tagShouldAnimate && !isLoggedIn }"
      style="padding-left: 4.5%; margin-bottom: 0; font-size: 30px; font-weight: bold; transition: color 1s; min-width:1400px;"
      :style="{ 'color': 'rgb(' + this.accentColor + ')' }">
      分类标签：总有你的喜欢
    </div>
    <div class="tagtable-container animate__animated">
      <tag-table :width="1400" :should-animate="true" />
    </div>
  </div>
  <div ref="tagRef" class="placeholder" v-else></div>
</template>

<script>
import { watch } from 'vue'
import TopNav from '../components/TopNav.vue'
import { HeartOutline } from '@vicons/ionicons5'
import 'animate.css'
import { mapState, mapMutations } from 'vuex'
import {
  getFontColorString, getBackgroundColorString, globalThemeColor,
  changeThemeColorByImage, getRGBString, antiBackgroundColor, colorMode
} from '/src/colorMode'
import TagTable from '../components/tables/TagTable/TagTable.vue' // for test
export default {
  components: {
    TopNav,
    HeartOutline,
    TagTable,
  },
  computed: {
    ...mapState(['isLoggedIn', 'accentColor', 'colorMode']),
  },
  data() {
    return {
      cardsShouldAnimate: false,
      songEntryShouldAnimate: false,
      scrollPromptShouldDisplay: false,
      tagShouldAnimate: false,
      hotsShouldAnimate: false,
      imgs: [
        {
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
          jumpLink: "a"
        },
        {
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
          jumpLink: "b"
        },
        {
          path: "/src/assets/picture5.png",
          jumpLink: 'e'
        },
        {
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg",
          jumpLink: "c"
        },
        {
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg",
          jumpLink: "d"
        },
      ],
      songs: [],
      hotSongs: [],
      songlists: [],
      all_songs: [],
      all_songlists: [],
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }
  },
  created() {
    document.title = "iSound"
    setTimeout(() => {
      this.scrollPromptShouldDisplay = true
    }, 800)
    this.$http.get(`/api/index/`).then((response) => {
      this.all_songs = response.data.music_set.map(song => ({
        id: song.id,
        imgSrc: song.cover,
        title: song.name,
        singer: song.artist,
      }))
      this.all_songlists = response.data.playlist_set.map(playlist => ({
        path: playlist.cover,
        id: playlist.id,
        jumpLink: "h",
      }))
      this.randomSelectSongs()
      this.randomSelectLists()
      this.selectHotSongs()
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleSongEntryScroll)
    window.addEventListener('scroll', this.handleCardsScroll)
    window.addEventListener('scroll', this.handleTagScroll)
    window.addEventListener('scroll', this.handleHotScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleSongEntryScroll)
    window.removeEventListener('scroll', this.handleCardsScroll)
    window.removeEventListener('scroll', this.handleTagScroll)
    window.removeEventListener('scroll', this.handleHotScroll)
  },
  methods: {
    ...mapMutations(['setAccentColor']),
    randomSelectSongs() {
      let randomIndex = []
      let min = 0, max = this.all_songs.length - 1
      if (max <= 17) { // 总歌曲数量不够
        let i = 0
        while (randomIndex.length < 18) {
          randomIndex.push(i)
          this.songs.push(this.all_songs[i])
          i++
          if (i === max) {
            i = 0
          }
        }
      } else {
        while (randomIndex.length < 18) {
          let r = Math.floor(Math.random() * (max - min + 1)) + min
          if (!randomIndex.includes(r)) {
            randomIndex.push(r)
            this.songs.push(this.all_songs[r])
          }
        }
      }
    },
    randomSelectLists() {
      let randomIndex = []
      let min = 0, max = this.all_songlists.length - 1
      if (max <= 6) { // 总歌曲数量不够
        let i = 0
        while (randomIndex.length < 6) {
          randomIndex.push(i)
          this.songlists.push(this.all_songlists[i])
          i++
          if (i === max) {
            i = 0
          }
        }
      } else {
        while (randomIndex.length < 6) {
          let r = Math.floor(Math.random() * (max - min + 1)) + min
          if (!randomIndex.includes(r)) {
            randomIndex.push(r)
            this.songlists.push(this.all_songlists[r])
          }
        }
      }
    },
    selectHotSongs() {
      this.hotSongs = this.all_songs.sort((a, b) => {
        return a.like < b.like
      }).slice(0, 6)
      while (this.hotSongs.length < 6) {
        this.hotSongs.push(this.all_songs[Math.floor(Math.random() * this.all_songs.length)])
      }
    },
    getCorrectAccentColor() {
      if (this.colorMode === 'white') {
        return this.accentColor
      } else if (this.colorMode === 'black') {
        if (this.accentColor === '0,0,0') {
          return '255,255,255'
        } else {
          return this.accentColor
        }
      }
    },
    getCorrectBasicColor() {
      if (this.colorMode === 'white') {
        return '0,0,0'
      } else if (this.colorMode === 'black') {
        return '255,255,255'
      }
    },
    jumpToSongList(id) {
      // this.$router.push(jumpLink)
      this.$router.push('/listdetail/' + id)
    },
    jumpToSong(id) {
      // this.$router.push(jumpLink)
      this.$EventBus.emit('play', id)
    },
    handleCardsScroll() {
      if (!this.cardsShouldAnimate && !this.isLoggedIn) {
        const componentElement = this.$refs.songCardRef
        const componentOffsetTop = componentElement.offsetTop
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        if (componentOffsetTop <= scrollTop + windowHeight * 0.6) {
          this.cardsShouldAnimate = true
          setTimeout(() => {
            this.scrollPromptShouldDisplay = false
          }, 300)
        }
      }
    },
    handleSongEntryScroll() {
      if (!this.songEntryShouldAnimate && !this.isLoggedIn) {
        const componentElement = this.$refs.songEntryRef
        const componentOffsetTop = componentElement.offsetTop
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (componentOffsetTop <= scrollTop + windowHeight * 0.6) {
          this.songEntryShouldAnimate = true
        }
      }
    },
    handleTagScroll() {
      if (!this.tagShouldAnimate && !this.isLoggedIn) {
        const componentElement = this.$refs.tagRef
        const componentOffsetTop = componentElement.offsetTop
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (componentOffsetTop <= scrollTop + windowHeight * 0.6) {
          this.tagShouldAnimate = true
        }
      }
    },
    handleHotScroll() {
      if (!this.hotsShouldAnimate && !this.isLoggedIn) {
        const componentElement = this.$refs.songHotRef
        const componentOffsetTop = componentElement.offsetTop
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (componentOffsetTop <= scrollTop + windowHeight * 0.6) {
          this.hotsShouldAnimate = true
        }
      }
    }
  }
}

</script>

<style>
.img-show {
  justify-content: center;
  color: rgb(224, 224, 230);
}

.carousel-container {
  width: 1400px;
  /* display: inline-block; */
  aspect-ratio: 2.6;
  align-items: center;
  /* padding-top: 1%;
  padding-left: 10%;
  padding-right: 10%; */
  margin: 0 auto;
}

.carousel-img {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
}

.carousel-img:hover {
  cursor: pointer;
}

.card-container {
  display: inline-block;
  height: 270px;
  min-width: 1400px;
  padding-top: 1%;
  padding-left: 3.5%;
  margin: auto;
  animation-delay: 300ms;
  animation-duration: 1500ms;
}

.single-card-container-wrap {
  border-radius: 15px;
  margin: 0 5px;
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}

.single-card-container-wrap:hover {
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
  box-shadow: 3px 5px 3px 3px rgba(var(--theme-font-color), 0.4);
  background: rgba(var(--theme-color), 0.6);
  transform: scale(1.03) translateY(-5px);
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
}


.single-card-container {
  margin: 0 auto;
  max-width: 160px;
  padding-top: 3%;
  padding-bottom: 3%;
  word-wrap: break-word;

}


.single-card-img-container {
  width: 160px;
  height: 160px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden
}

.single-card-img {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.single-card-info-name {
  cursor: pointer;
  transition: color 1s;
  font-size: medium;
  font-weight: 700;
}

.single-card-info-singer {
  transition: color 1s;
  font-size: small;
  font-weight: 500;
  color: grey;
}

.single-card-img-container {
  width: 160px;
  height: 160px;
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

.song-entry-outter {
  height: 270px;
  min-width: 1400px;
  animation-delay: 300ms;
  animation-duration: 1500ms;
}

.song-entry-card-container {
  padding-left: 19%;
}


.song-entry-container {
  min-width: 320px;
  margin-top: 0%;
  margin-bottom: 0%;
}

.song-entry-content {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}

.song-entry-content:hover {
  box-shadow: 3px 5px 3px 3px rgba(var(--theme-font-color), 0.4);
  background: rgba(var(--theme-color), 0.6);
  transform: scale(1.03) translateY(-5px);
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
}

.song-entry-img-container {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden
}

.song-entry-img {
  width: 100%;
  height: 100%;
}

.song-entry-info-container {
  padding-top: 1.5%;

}

.song-entry-info-name {
  transition: color 1s;
  max-width: 12vw;
  padding-top: 3%;
  word-wrap: break-word;
  font-weight: bold;
  font-size: 14px;
}

.song-entry-info-singer {
  transition: color 1s;
  max-width: 12vw;
  word-wrap: break-word;
  font-weight: bold;
  font-size: 8px;
  color: grey;
}

.placeholder {
  height: 50vh;
}

.scroll-prompt {
  margin-top: 1.5%;
  font-size: 40px;
  font-weight: bold;
}

.rainbow-text {
  background: linear-gradient(to right, green, rgba(0, 0, 255, 0.66), indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagtable-container {
  margin-top: 1%;
  min-width: 1400px;
  transition: color 1s;
  display: flex;
  justify-content: space-evenly;
  padding-left: 1%;
  animation-delay: 300ms;
  animation-duration: 1500ms;
}

:deep(.n-carousel.n-carousel--card .n-carousel__slide.n-carousel__slide--current:hover) {
  transform: translateX(-50%) translateZ(0) scale(1.2) !important
}

:deep(.n-carousel__slide .n-carousel__slide--current .carousel-item-container:hover) {
  transform: translateX(-50%) translateZ(0) scale(1.2) !important
}
</style>