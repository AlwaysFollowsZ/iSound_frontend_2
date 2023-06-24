<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, computed, watch } from "vue";
import Background from "./components/GlobalBackground.vue";
import HelloWorld from "./components/HelloWorld.vue";
import ImageTable from "./components/tables/ImageTable/ImageTable.vue";
import MessageItem from "./components/message/MessageItem.vue";
import MessageSend from "./components/message/MessageSend.vue";
import TopNav from "./components/TopNav.vue";
import ListTable from "./components/tables/ListTable/ListTable.vue";
import Player from "./components/Player.vue";
import MixedTable from "./components/tables/ImageTable/MixedImageTable.vue";
import { backgroundColor,globalThemeColor, getBackgroundColorString, getFontColorString } from '/src/colorMode.js'
//全局主题色~
watch(globalThemeColor, () => {
  document.documentElement.style.setProperty('--theme-color', getBackgroundColorString(globalThemeColor).value)
  document.documentElement.style.setProperty('--theme-font-color', getFontColorString(globalThemeColor).value)
  document.documentElement.style.setProperty('--background-color', getBackgroundColorString(backgroundColor).value)
}, { immediate: true })

</script>
<template>
  <background></background>
  <RouterView />
  <Player />
</template>
<style>
* {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}
</style>
<style scoped>
* {
  scroll-behavior: smooth !important;
}

:root {
  --theme-font-color: none;
  --theme-color: none;
  --background-color:none;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
