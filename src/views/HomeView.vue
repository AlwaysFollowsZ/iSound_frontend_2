<template>
  <div><top-nav></top-nav></div>
  <div class="img-show">
    <n-grid>
      <n-gi :span="14">
        <div style="padding-bottom: 0%; padding-left: 8%">
          <div style="margin-bottom: 0; font-size: 30px; font-weight: bold">
            来点不一样的歌单
          </div>
        </div>
        <div class="carousel-container">
          <n-carousel autoplay interval="3000" :style="{'border-radius': `20px`}">
            <img
              class="carousel-img"
              v-for="(src, idx) in imgs" :key="idx" :src="src.path"
              @click="jumpToSongList(src.jumpLink)"
            >
          </n-carousel>
        </div>
      </n-gi>
      <n-gi :span="10">
        <div style="padding-bottom: 0%; padding-left: 0%">
          <div style="margin-bottom: 0; font-size: 30px; font-weight: bold">
            猜你喜欢
          </div>
        </div>
        <div class="card-container">
          <n-grid :x-gap="12" :y-gap="6" :col="3">
            <n-gi :span="8"  v-for="(song, idx) in songs" :key="idx">
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
      </n-gi>
    </n-grid>
  </div>
  <div style="padding-left: 4.5%; margin-bottom: 0; font-size: 30px; font-weight: bold" >现在就听</div>
  <div class="song-entry-outter">
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
              <!-- <n-gi :span="3">
                <div class="song-entry-heart">
                  <n-icon size="30px"><HeartOutline/></n-icon>
                </div>
              </n-gi> -->
            </n-grid>
          </div>
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
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
          jumpLink: "b"
        },
        {
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg",
          jumpLink: "c"
        },
        {
          path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg",
          jumpLink: "d"
        }
      ],
      songs: [
        {
          imgSrc: "/src/assets/song1.jpg",
          title: "陪你度过漫长岁月",
          jumpLink: "1",
          singer: "陈奕迅"
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
    height: 60vh;
    align-items: center;
    padding-top: 1%;
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
    padding-top: 1%;
    padding-right: 8%;
    margin: auto;
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
  /*.n-card {
    align-items: center;
    max-width: 30vw;
    max-height: 32vh;
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
    justify-content: 
    center; 
    align-items: center; 
    overflow: hidden
  }
  .song-entry-img {
    /*margin-top: 70%;
    margin-left: 70%;*/
    /*margin-bottom: 20%;
    margin-right: 20%;*/
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
</style>