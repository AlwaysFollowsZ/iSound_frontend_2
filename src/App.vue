<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TopNav from './components/TopNav.vue';
import ImageTable from './components/tables/ImageTable/ImageTable.vue';
import MessageItem from './components/message/MessageItem.vue';
import MessageSend from './components/message/MessageSend.vue'
</script>

<template>
  <!-- <TopNav></TopNav> -->
  <!-- <image-table></image-table> -->
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  <RouterView />
  <!-- <message-item></message-item> -->
  <!-- <message-send></message-send> -->
</template>

