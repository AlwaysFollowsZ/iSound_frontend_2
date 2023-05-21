<template>
  <div><top-nav></top-nav></div>
  <div class="img-show" 
    :class="{'animate__animated animate__zoomIn': !isLoggedIn}">
    <n-grid>
      <n-gi :span="24">
        <div style="padding-bottom: 0%; padding-left: 4.5%">
          <div style="margin-bottom: 0; font-size: 30px; font-weight: bold">
            来点不一样的歌单
          </div>
        </div>
        <div class="carousel-container">
          <n-carousel autoplay :interval="3000"
            effect="card"
            prev-slide-style="transform: translateX(-120%) translateZ(-500px);"
            next-slide-style="transform: translateX(20%) translateZ(-500px);"
            style="height: 85%"
            :show-dots="true"
          >
            <n-carousel-item :style="{ width: '60%' }" v-for="(src, idx) in imgs" :key="idx" >
              <img
                class="carousel-img"
                :src="src.path"
                @click="jumpToSongList(src.jumpLink)"
              >
            </n-carousel-item>
          </n-carousel>
        </div>
      </n-gi>
    </n-grid>
  </div>
  <div v-if="scrollPromptShouldDisplay && !isLoggedIn" 
    :class="[`${cardsShouldAnimate && !isLoggedIn ? 'animate__animated animate__zoomOut' : 'animate__animated animate__zoomIn animate__slow'}`]">
    <n-grid>
      <n-gi :span="9"></n-gi>
      <n-gi :span="8">
        <div class="scroll-prompt rainbow-text">往下滑，探索新世界</div>
      </n-gi><n-gi :span="7"></n-gi>
    </n-grid>
  </div>
  <div v-if="cardsShouldAnimate || isLoggedIn">
    <div class="animate__animated" 
      :class="{'animate__slideInLeft': cardsShouldAnimate && !isLoggedIn}"
      style="padding-left: 4.5%; margin-bottom: 0; font-size: 30px; font-weight: bold" 
    >猜你喜欢</div>
    <div class="card-container animate__animated "
      :class="{'animate__fadeInRight': cardsShouldAnimate && !isLoggedIn}"
    >
      <n-grid  :col="6">
        <n-gi :span="4"  v-for="(song, idx) in songs" :key="idx">
          <div>
            <div class="single-card-container">
              <div class="single-card-img-container">
                <img class="single-card-img" :src="song.imgSrc">
              </div>
              <div class="single-card-info-container">
                <div class="single-card-info-name">
                  {{ song.title }}
                </div>
                <div class="single-card-info-singer">
                  {{ song.singer }}
                </div>
            </div>
          </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </div><div ref="songCardRef" class="placeholder" v-else></div>
  <div v-if="songEntryShouldAnimate || isLoggedIn">
    <div class="animate__animated" 
      :class="{'animate__slideInLeft': songEntryShouldAnimate && !isLoggedIn}"
      style="padding-left: 4.5%; margin-bottom: 0; font-size: 30px; font-weight: bold" >现在就听</div>
    <div class="song-entry-outter animate__animated"
      :class="{'animate__fadeInRight': songEntryShouldAnimate && !isLoggedIn}">
      <n-grid :x-gap="0" :y-gap="0" >
        <n-gi :span="6" v-for="(obj, idx) in arr" :key="idx">
          <div class="song-entry-card-container">
            <div class="song-entry-container">
              <div style="padding-bottom: 3%; padding-top: 3%">
                <hr style="box-shadow: none; border-color: rgb(255, 255, 255); margin: 0"/>
              </div>
              <n-grid>
                <n-gi :span="4">
                  <div class="song-entry-img-container" >
                    <img class="song-entry-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
                  </div>
                </n-gi>
                <n-gi :span="2"></n-gi>
                <n-gi :span="15">
                  <div class="song-entry-info-container">
                    <div class="song-entry-info-name">这里还有更多的歌</div>
                    <div class="song-entry-info-singer">singer</div>
                  </div>
                </n-gi>
              </n-grid>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </div><div ref="songEntryRef" class="placeholder" v-else></div>
  <div><tag-table :width="80"/></div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import { HeartOutline } from '@vicons/ionicons5'
import 'animate.css'
import { mapState } from 'vuex'
import TagTable from '../components/tables/TagTable/TagTable.vue' // for test
export default {
  components: {
    TopNav,
    HeartOutline,
    TagTable,
  },
  computed: {
    ...mapState(['isLoggedIn']),
  },
  data() {
    return {
      cardsShouldAnimate: false,
      songEntryShouldAnimate: false,
      scrollPromptShouldDisplay: false,
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
      songs: [
        {
          imgSrc: "/src/assets/song5.png",
          title: "只因你太美",
          jumpLink: "1",
          singer: "蔡只因"
        },
        {
          imgSrc: "/src/assets/song2.jpg",
          title: "给自己的情书",
          jumpLink: "2",
          singer: "王菲"
        },
        {
          imgSrc: "/src/assets/song3.jpg",
          title: "Yesterday Once More",
          jumpLink: "3",
          singer: "Carpenters"
        },
        {
          imgSrc: "/src/assets/song4.jpg",
          title: "守时",
          jumpLink: "4",
          singer: "王菲"
        },
        {
          imgSrc: "/src/assets/song5.jpg",
          title: "当爱已成往事",
          jumpLink: "5",
          singer: "张国荣"
        },
        {
          imgSrc: "/src/assets/song6.jpg",
          title: "山水之间",
          jumpLink: "6",
          singer: "许嵩"
        }
      ],
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }
  },
  created() {
    setTimeout(() => {
      this.scrollPromptShouldDisplay = true
    }, 800)
  },
  mounted() {
    window.addEventListener('scroll', this.handleSongEntryScroll)
    window.addEventListener('scroll', this.handleCardsScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleSongEntryScroll)
    window.removeEventListener('scroll', this.handleCardsScroll)
  },
  methods: {
    jumpToSongList(jumpLink) {
      // this.$router.push(jumpLink)
      console.log(jumpLink)
    },
    jumpToSong(jumpLink) {
      // this.$router.push(jumpLink)
      console.log(jumpLink)
    },
    handleCardsScroll() {
      if (!this.cardsShouldAnimate) {
        const componentElement = this.$refs.songCardRef
        const componentOffsetTop = componentElement.offsetTop
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        if (componentOffsetTop <= scrollTop + windowHeight * 0.6 ) {
          this.cardsShouldAnimate = true
          setTimeout(() => {
            this.scrollPromptShouldDisplay = false
          }, 300)
        }
      }
    },
    handleSongEntryScroll() {
      if (!this.songEntryShouldAnimate) {
        const componentElement = this.$refs.songEntryRef
        const componentOffsetTop = componentElement.offsetTop
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (componentOffsetTop <= scrollTop + windowHeight * 0.6 ) {
          this.songEntryShouldAnimate = true
        }
      }
    }, 
  }
}

</script>

<style>
  .img-show {
    height: 60vh;
    /*border: dashed; */
  }
  .carousel-container {
    height: 60vh;
    align-items: center;
    padding-top: 1%;
    padding-left: 10%;
    padding-right: 10%;
    margin: auto;
  }
  .carousel-img {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    overflow: hidden;
  }
  .card-container {
    height: 30vh;
    padding-top: 1%;
    padding-left: 5%;
    margin: auto;
    animation-delay: 300ms;
    animation-duration: 1500ms;
  }
  .single-card-container {
    max-width: 180px;
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
    height: 40vh;
    animation-delay: 300ms;
    animation-duration: 1500ms;
  }
  .song-entry-card-container {
    padding-left: 19%;
  }
  .song-entry-container {
    width: 18vw;
    margin-top: 0%;
    margin-bottom: 0%;
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
    max-width: 12vw;
    padding-top: 3%;
    word-wrap: break-word;
    font-weight: bold;
    font-size: 14px;
  }
  .song-entry-info-singer {
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
    background: linear-gradient(to right,  green, rgba(0, 0, 255, 0.66), indigo, violet);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>