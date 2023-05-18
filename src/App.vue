<script setup>
import { RouterLink, RouterView } from 'vue-router';
import{backgroundColor,getRGBString} from '/src/colorMode';
import HelloWorld from './components/HelloWorld.vue';
import ImageTable from './components/tables/ImageTable/ImageTable.vue';
import MessageItem from './components/message/MessageItem.vue';
import MessageSend from './components/message/MessageSend.vue';
import TopNav from './components/TopNav.vue';
import ListTable from './components/tables/ListTable/ListTable.vue';
import Player from './components/Player.vue';
</script>

<template>
  <!-- <TopNav></TopNav> -->
  <!-- <message-item></message-item> -->
  <!-- <message-send></message-send> -->

  <div :style="{'background':backgroundColor }" class='page_background'></div> 
    <RouterView />
    <!-- <div :style="{'text-align':'center'}"> -->
      <!-- 请直接传入数字(px)(高度可略)-->
      <image-table :table-size="[1000,]"></image-table>
     <list-table :view-mode="user"></list-table> 
  
  <Player />
  <!-- </div> -->
</template>

<style scoped>
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

.page_background{
  position: fixed;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  transition: height cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
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
