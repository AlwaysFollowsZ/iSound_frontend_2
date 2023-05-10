<script>
  import { defineComponent } from 'vue'
  import { NCard } from 'naive-ui'
  export default defineComponent({
    name : 'MessageItem',
    data() {
      return {
        id: 0,
        messages: [
        { 
          id: 1, 
          from: 'iSound',
          content: 'Welcome to iSound!',
          music: null,
          time: '2023-05-09-20:10'
        },
        { 
          id: 2, 
          from: 'iSound',
          content: 'the second message',
          music: null,
          time: '2023-05-09-20:20'
        },
        { 
          id: 3, 
          from: 'iSound',
          content: 'the third message',
          music: null,
          time: '2023-05-09-20:20'
        }]
      }
    },
    components: {
      NCard,
    },
    methods: {
      removeMessage(message) {
        this.messages = this.messages.filter((t) => t !== message)
      }
    }
  });
  // const messages = ref([
  //   { 
  //     id: id++, 
  //     from: 'iSound',
  //     content: 'Welcome to iSound!',
  //     music: null,
  //     time: '2023-05-09-20:10'
  //   },
  //   { 
  //     id: id++, 
  //     from: 'iSound',
  //     content: 'the second message',
  //     music: null,
  //     time: '2023-05-09-20:20'
  //   },
  //   { 
  //     id: id++, 
  //     from: 'iSound',
  //     content: 'the third message',
  //     music: null,
  //     time: '2023-05-09-20:20'
  //   }
  // ])
  // function removeMessage(message) {
  //   messages.value = messages.value.filter((t) => t !== message)
  // }
</script>

<template>
  <ul>
    <n-card v-for="message in messages" title="卡片" hoverable closable @close="removeMessage(message)">
    {{ message.from }}
    {{ message.content }}
    {{ message.music }}
    {{ message.time }}
    </n-card>
  </ul>
  
</template>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>
