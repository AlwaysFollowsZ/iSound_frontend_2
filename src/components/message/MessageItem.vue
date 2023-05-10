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
          time: '2023-05-09-20:10',
          disabled:false
        },
        { 
          id: 2, 
          from: 'iSound',
          content: 'the second message',
          music: null,
          time: '2023-05-09-20:20',
          disabled:false
        },
        { 
          id: 3, 
          from: 'iSound',
          content: 'the third message',
          music: null,
          time: '2023-05-09-20:20',
          disabled:false
        }]
      }
    },
    components: {
      NCard,
    },
    methods: {
      removeMessage(message) {
        this.messages = this.messages.filter((t) => t !== message)
      },
      reply() {
        this.$router.push({path:'/message/send'})
      }
    }
  });
</script>

<template>
  <ul class="ul">
    <n-card v-for="message in messages" title="卡片" hoverable closable @close="removeMessage(message)">
    {{ message.from }}
    {{ message.content }}
    {{ message.music }}
    {{ message.time }}
    <span>
      <n-button strong secondary type="info" :disabled="message.disabled" @click="message.disabled=!message.disabled">
      已读
      </n-button>
      <n-button strong secondary type="info" @click="reply">
      回复
      </n-button>
    </span>
    </n-card>
  </ul>
  
</template>

<style scoped>
.ul {
  padding: 0;
}
.n-card {
  max-width: 90%;
  margin: 10px auto;
}
</style>
