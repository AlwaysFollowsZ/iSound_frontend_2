<script>
  import { defineComponent } from 'vue'
  import { NCard, NButton } from 'naive-ui'
  import { CloseCircleOutline } from '@vicons/ionicons5'
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
      NButton,
      CloseCircleOutline,
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
    <n-card v-for="message in messages" title="卡片" hoverable>
      
      <!-- <n-button class="close-button" type="info" quaternary @click="removeMessage(message)"> -->
        <!-- <CloseCircleOutline style="width: 20px" @click="removeMessage(message)"/> -->
      <!-- </n-button> -->
    <n-button class="close-button" tertiary circle style="width: 25px; height: 25px;">
      <CloseCircleOutline style="width: 25px" @click="removeMessage(message)"/>
    </n-button>
    {{ message.from }}
    {{ message.content }}
    {{ message.music }}
    {{ message.time }}
    <span>
      <n-button class="already-read" strong secondary type="info" :disabled="message.disabled" @click="message.disabled=!message.disabled">
      已读
      </n-button>
      <n-button class="reply-read" strong secondary type="info" @click="reply">
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
.already-read {
  position: absolute;
  right: 75px;
}
.reply-read {
  position: absolute;
  right: 10px;
}
.close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  
}
</style>
