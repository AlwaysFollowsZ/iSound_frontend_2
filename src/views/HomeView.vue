<template>
  <div><top-nav></top-nav></div>
  <div class="img-show">
    <n-grid>
      <n-gi :span="14">
        <div class="carousel-container">
          <n-carousel autoplay :interval=3000 :style="{'border-radius': '20px'}">
            <img
              class="carousel-img"
              v-for="(src, idx) in imgs" :key="idx" :src="src.path"
              @click="jumpToSongList(src.jumpLink)"
            >
          </n-carousel>
        </div>
      </n-gi>
      <n-gi :span="10">
        <div class="card-container">
          <n-grid :x-gap="12" :y-gap="6" :col="2">
            <n-gi :span="12"  v-for="(song, idx) in songs" :key="idx">
              <div>
                <n-card :bordered="false">
                  <div @click="jumpToSong(song.jumpLink)">
                    <div class="single-img">
                      <img class="card-img" :src="song.imgSrc">
                    </div>
                    <span class="song-name-link">
                      {{song.title}}
                      <span class="song-singer-link">&nbsp;{{song.singer}}</span>
                    </span>
                    
                  </div>
                </n-card>
              </div>
            </n-gi>
          </n-grid>
        </div>
      </n-gi>
    </n-grid>
  </div>
  <div class="song-entry-outter">
    <n-grid :x-gap="0" :y-gap="0" >
      <n-gi :span="6">
        <div class="song-entry-card-container">
          <n-card content-style="padding: 2;">  
            <n-grid :x-gap="4" :col="2">
              <n-gi :span="10">
                <div class="entry-img-container">
                <img class="entry-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"/>
              </div>
              </n-gi>
              <n-gi :span="10">
                <div class="song-entry-song-container">
                  <div class="song-entry-song-name">歌名</div>
                  <div class="song-entry-song-singer">歌手</div>
                </div>
              </n-gi>
              <n-gi :span="4">
                <div class="heart-icon">
                  <n-icon><HeartOutline/></n-icon>
                </div>
              </n-gi>
            </n-grid>
        </n-card>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import { HeartOutline } from '@vicons/ionicons5'
export default {
  components: {
    TopNav,
    HeartOutline
  },
  data() {
    return {
      imgs: [
        {
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
          jumpLink: "a"
        },
        {
          path: "/src/assets/picture5.png",
          jumpLink: 'e'
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
          path: "/src/assets/picture5.png",
          jumpLink: 'e'
        },
        {
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg",
          jumpLink: "d"
        },
        {
          path: "/src/assets/picture5.png",
          jumpLink:'e'
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
        }
      ]
    }
  },
  methods: {
    jumpToSongList(jumpLink) {
      // this.$router.push(jumpLink)
      console.log(jumpLink)
    },
    jumpToSong(jumpLink) {
      // this.$router.push(jumpLink)
      console.log(jumpLink)
    }
  }
}

</script>

<style>
  .img-show {
    height: 70vh;
    /*border: dashed; */
  }
  .carousel-container {
    overflow: hidden;
    height: 65vh;
    align-items: center;
    /*padding-top: 3%;*/
    padding-left: 8%;
    padding-right: 8%;
    margin: auto;
  }
  .carousel-img {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .card-container {
    height: 65vh;
    /*padding-top: 1%;*/
    padding-right: 8%;
    margin: auto;
    
  }
  .n-card {
    align-items: center;
    max-width: 30vw;
    max-height: 32vh;
  }
  .single-img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    width: 180px;
  }
  .card-img {
    border-radius: 10px;
    zoom: 0.9;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .song-name-link {
    position: absolute;
    /*padding-top: 10%;*/
    max-width: 17vw;
    font-size: medium;
    font-weight: bold;
  }
  .song-singer-link {
    font-size: small;
    font-weight: bold;
    color: gray;
  }
  .song-entry-outter {
    height: 40vh;
    background-color: aquamarine;
    padding-left: 3%;
    padding-right: 3%;
  }
  .song-entry-card-container {
    background-color: blue;
    display: flex;
  }
  .entry-img-container {
    display: block;
    height: 60px;
    width: 60px;
  }
  .entry-img {
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }
  .song-entry-song-container {
    padding-left: 20%;
  }
  .song-entry-song-name {
    padding-top: 10%;
    font-size:larger;
    font-weight: bold;
  }
  .song-entry-song-singer {
    font-size: small;
    color: gray;
  }

</style>