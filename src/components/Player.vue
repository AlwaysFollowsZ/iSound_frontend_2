<template>
  <div ref="containerRef"></div>
  <a @click="launch">
    <ChevronUp class="aplayer-launch" />
  </a>
  <div class="footer"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, computed } from "vue";
import "APlayer/dist/APlayer.min.css";
import APlayer from "APlayer";
import ColorThief from "colorthief";
import { ChevronUp } from "@vicons/ionicons5";
import {
  globalThemeColor,
  getBackgroundColorString,
  getRGBString,
  changeThemeColorByImage,
  getFontColorString,
} from "/src/colorMode.js";

const containerRef = ref();
const mainColor = computed(() => {
  return getRGBString(getBackgroundColorString(globalThemeColor), 0.7);
});
const hoverColor = computed(() => {
  return getRGBString(getBackgroundColorString(globalThemeColor), 1);
});
const focusColor = computed(() => {
  return getRGBString(getBackgroundColorString(globalThemeColor), 0.1);
});
const borderColor = computed(() => {
  return getRGBString(getBackgroundColorString(globalThemeColor), 1);
});
const mainFontColor = computed(() => {
  return getRGBString(getFontColorString(globalThemeColor), 1);
});
const secondaryFontColor = computed(() => {
  return getRGBString(getFontColorString(globalThemeColor), 0.5);
});
console.log("theme:" + mainColor.value);
const footerHeight = ref("130px");
const { proxy } = getCurrentInstance();
const colorThief = new ColorThief();
const image = new Image();
const xhr = new XMLHttpRequest();

let ap;
let launched = false;
let currentMusicId;
let currentLyricsUrl;

function launch() {
  if (currentMusicId !== undefined) {
    if (launched) {
      proxy.$router.replace(`/player/${currentMusicId}`);
    } else {
      proxy.$router.push(`/player/${currentMusicId}`);
    }
    launched = true;
  }
}

function setTheme(index) {
  xhr.onload = function () {
    const coverUrl = URL.createObjectURL(this.response);
    image.onload = function () {
      const color = colorThief.getColor(image);
      mainColor.value = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ap.theme(mainColor.value, index);
      URL.revokeObjectURL(coverUrl);
    };
    image.src = coverUrl;
  };
  xhr.open("GET", ap.list.audios[index].cover, true);
  xhr.responseType = "blob";
  xhr.send();
}

function play(musicId) {
  proxy.$http.get(`/api/music/detail/${musicId}`).then((response) => {
    ap.list.clear();
    ap.list.add(response.data.music_set);
    ap.play();
  });
}

function playAll(playlistId) {
  proxy.$http.get(`/api/playlist/detail/${playlistId}`).then((response) => {
    ap.list.clear();
    ap.list.add(response.data.music_set);
    ap.play();
  });
}

onMounted(() => {
  ap = new APlayer({
    container: containerRef.value,
    fixed: true,
    mini: true,
    autoplay: false,
    theme: mainColor.value,
    loop: "all", // 'all' | 'one' | 'none',
    order: "list", // 'list' | 'random'
    preload: "auto", // 'auto' | 'metadata' | 'none'
    volume: 0.7,
    mutex: true,
    lrcType: 3,
    listFolded: true,
    listMaxHeight: "600px",
    storageName: "aplayer-setting",
  });

  proxy.$http.get("/api/index/").then((response) => {
    ap.list.add(response.data.music_set);
  });

  ap.on("timeupdate", () => {
    proxy.$EventBus.emit("timeupdate", ap.audio.currentTime);
  });

  ap.on("listswitch", (e) => {
    currentMusicId = ap.list.audios[e.index].id;
    if (proxy.$router.currentRoute.value.name == "player") {
      if (launched) {
        launch();
      } else {
        currentMusicId = proxy.$route.params.musicId;
        launched = true;
      }
    } else {
      launched = false;
    }
    changeThemeColorByImage(ap.list.audios[e.index].cover);
    setTheme(e.index);
  });

  ap.on("loadstart", () => {
    let author = document.querySelector(".aplayer-author");
    author.innerText = author.innerText.substr(2);
  });

  ap.on("lrcshow", () => {
    footerHeight.value = "130px";
  });

  ap.on("lrchide", () => {
    footerHeight.value = "82px";
  });

  proxy.$EventBus.on("play", (musicId) => {
    play(musicId);
  });

  proxy.$EventBus.on("playAll", (playlistId) => {
    playAll(playlistId);
  });

  proxy.$EventBus.on("seek", (time) => {
    ap.seek(time);
    ap.play();
  });

  document.querySelector(".aplayer-miniswitcher").click();

  onBeforeUnmount(() => {
    ap.destroy();
    proxy.$EventBus.all.clear();
  });
});
</script>

<style scope>
.aplayer-fixed {
  height: 0 !important;
  position: fixed !important;
  width: 400px !important;
  overflow: visible;
  bottom: 0px !important;
  left: calc(100% - 400px) !important;
  background-color: v-bind("mainColor") !important;
}
.aplayer-list {
  color: v-bind("mainFontColor") !important;
  position: absolute !important;
  bottom: 0 !important;
  background: v-bind("mainColor") !important;
}
.aplayer .aplayer-list ol li:hover {
  background: v-bind("hoverColor") !important;
}
.aplayer .aplayer-list ol li .aplayer-list-author {
  color: v-bind("secondaryFontColor") !important;
}
.aplayer .aplayer-list ol li.aplayer-list-light {
  background: v-bind("focusColor") !important;
}
.aplayer-body {
  max-width: calc(100% - 18px) !important;
  width: calc(100% - 18px) !important;
  background: v-bind("mainColor") !important;
}
.aplayer-info {
  border: 1px solid v-bind("borderColor") !important;
}

.aplayer-pic {
  position: fixed !important;
  width: 46px !important;
  height: 46px !important;
  bottom: 10px !important;
  left: 10px !important;
  border-radius: 6px !important;
  z-index: -100 !important;
}

.aplayer-narrow + a > .aplayer-launch {
  display: none !important;
}

.aplayer-launch {
  position: fixed !important;
  width: 46px !important;
  height: 46px !important;
  bottom: 10px !important;
  left: 10px !important;
  border-radius: 6px !important;
  opacity: 0 !important;
  color: white !important;
  z-index: 100 !important;
}

.aplayer-launch:hover {
  background-color: #696969 !important;
  opacity: 0.6 !important;
  z-index: 100 !important;
}

.aplayer-fixed:not(.aplayer-narrow) > .aplayer-body > .aplayer-pic > .aplayer-button {
  display: none !important;
}

.aplayer-title {
  position: fixed !important;
  top: 15px !important;
  left: 10px !important;
}

.aplayer-author {
  position: fixed !important;
  bottom: 15px !important;
  left: 10px !important;
}

.aplayer-controller {
  width: 360px !important;
  left: calc(50% - 204px) !important;
  z-index: 100 !important;
}

.aplayer-bar-wrap {
  margin: 0 !important;
}

.aplayer-time-inner {
  position: fixed !important;
  width: 426px !important;
  bottom: 6px !important;
  left: calc(50% - 237px) !important;
  display: inline-block !important;
  visibility: hidden !important;
}

.aplayer-ptime {
  position: absolute !important;
  left: 0 !important;
  visibility: visible !important;
}

.aplayer-dtime {
  position: absolute !important;
  right: -3px !important;
  visibility: visible !important;
}

.aplayer-time {
  position: absolute !important;
  width: 100% !important;
  bottom: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  z-index: -100 !important;
}

.aplayer-volume-wrap {
  margin: 0 !important;
  bottom: 22px !important;
  left: calc(50% - 112.5px) !important;
}

.aplayer-icon-back {
  position: fixed !important;
  left: calc(50% - 84px) !important;
}

.aplayer-icon-play {
  position: fixed !important;
  left: calc(50% - 34px) !important;
}

.aplayer-icon-forward {
  position: fixed !important;
  left: calc(50% + 16px) !important;
}

.aplayer-icon-lrc {
  position: fixed !important;
  bottom: 29.5px !important;
  left: calc(50% + 68.5px) !important;
}

.aplayer-lrc {
  position: fixed !important;
  bottom: 82px !important;
  height: 32px !important;
}

.aplayer-lrc-contents > p {
  font-size: 16px !important;
}

.aplayer-icon-order {
  position: fixed !important;
  display: inline !important;
  bottom: 25.5px !important;
  right: 102.5px !important;
}

.aplayer-icon-loop {
  position: fixed !important;
  display: inline !important;
  bottom: 25.5px !important;
  right: 60px !important;
}

.aplayer-icon-menu {
  position: fixed !important;
  bottom: 23px !important;
  right: 20px !important;
}

.footer {
  position: relative !important;
  width: 100% !important;
  height: v-bind("footerHeight") !important;
}
</style>
