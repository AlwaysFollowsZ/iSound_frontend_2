<script>
  import { defineComponent } from 'vue'
  import { NCard, NButton } from 'naive-ui'
  import { CloseOutline } from '@vicons/ionicons5'
  import 'animate.css' 
  export default defineComponent({
    name : 'MessageItemReply',
    data() {
      return {
        id: 0,
        page: 1,
        refreshPage: true,
        messages: [
          { 
            id: 1, 
            title: '消息标题1',
            from: 'zyh123456',
            content: 'Welcome to iSound!',
            music: null,
            time: '2023-05-09 20:10:45',
            disabled:false
          },
          { 
            id: 2, 
            title: '消息标题2',
            from: 'authormq',
            content: 'the secon这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦条消息点擦不擦的返回d message',
            music: null,
            time: '2023-05-09 20:20:36',
            disabled:false
          },
          { 
            id: 3, 
            title: '消息标题3',
            from: 'iSound',
            content: 'the third message',
            music: null,
            time: '2023-05-09 21:13:57',
            disabled:false
          },
          { 
            id: 4, 
            title: '消息标题4',
            from: 'iSound1',
            content: '这是第四条消这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦的返回',
            music: null,
            time: '2023-05-13 07:14:24',
            disabled:false
          },
          { 
            id: 5, 
            title: '消息标题5',
            from: 'iSound2',
            content: 
            '这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 6, 
            title: '消息标题6',
            from: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 7, 
            title: '消息标题7',
            from: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 8, 
            title: '消息标题8',
            from: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 9, 
            title: '消息标题9',
            from: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 10, 
            title: '消息标题10',
            from: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 11, 
            title: '消息标题11',
            from: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 12, 
            title: '消息标题12',
            from: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          }
        ]
      }
    },
    components: {
      NCard,
      NButton,
      CloseOutline,
    },
    methods: {
      removeMessage(message) {
        message['isDeleted'] = true
        this.refreshPage = false
        setTimeout(() => {
          const index = this.messages.findIndex(msg => msg.id === message.id)
          if (index !== -1) {
            this.messages.splice(index, 1)
            for (var i = index; i < this.messages.length; i++) {
              this.messages[i].id = Math.random()
            }
            this.refreshPage = true
          }
          if ((this.page - 1) * 5 >= this.messages.length) {
            this.page -= 1
          }
        }, 700)
      },
      reply() {
        this.$router.push({path:'/message/send'})
      },
      toRefreshPage() {
        this.refreshPage = false
        setTimeout(() => {
          this.refreshPage = true
        }, 600)
      }
    }
  });
</script>

<template>
  <div class="message-card-outer">
    <n-scrollbar style="max-height: 90vh" trigger="none">
    <div :class="['message-card', 'animate__animated', `${message.isDeleted ? 'animate__fadeOutRight' : 'animate__slideInUp'}`]" 
      v-for="(message) in 
        messages.slice(7 * (page - 1), 7 * (page - 1) + ((7 * page > messages.length) ? (messages.length % 7) : 7))" 
      :key="message.id">
      <div class="message-card-header">
        <n-grid>
          <n-gi :span="12">
            <div class="message-card-header-contents">
              <span class="message-card-header-title">
                {{ message.title }}
              </span>
              <span class="message-card-header-info">
                {{ message.time }} 发送给{{ message.from }}
              </span>
            </div>            
          </n-gi>

          <n-gi :span="10">
          </n-gi>

          <n-gi :span="2">
            <div class="message-card-header-close-button" @click="removeMessage(message)">
              <n-icon size="30">
                <close-outline/>
              </n-icon>
            </div>
          </n-gi>
        </n-grid>
      </div>
      <div class="messgae-card-content">
        <div style="padding-left: 2%; padding-bottom: 0.6%; max-width: 789px;">
          <n-grid>
            <n-gi :span="2">
              <div style=" font-weight:bold">内容：</div>
            </n-gi>
            <n-gi :span="22">
              <span>
                <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false">
                  <div style="  word-wrap: break-word;">
                    
                    <span>
                      {{ message.content }}
                    </span>
                  </div>
                </n-ellipsis>
              </span>
            </n-gi>
          </n-grid>
        </div>
      </div>
    </div>
    <div class="card-pagination">
      <n-grid>
        <n-gi :span="8"></n-gi>
        <n-gi :span="8">
          <div :class="['animate__animated', `${refreshPage ? 'animate__zoomIn' : 'animate__zoomOut'}`]" 
            style="display: flex; justify-content: center;" v-if="messages.length > 0"
          >
            <n-pagination v-model:page="page" :page-count="Math.ceil(messages.length / 7)" @click="toRefreshPage" />
          </div>
          <div style="display: flex; justify-content: center; font-size: 20px" v-else>
            您暂未收到任何消息
          </div>
        </n-gi>
        <n-gi :span="8"></n-gi>
      </n-grid>
    </div>
    </n-scrollbar>
  </div>
  
</template>

<style scoped>
.message-card-outer {

}
.message-card {
  background-color: white;
  border-radius: 20px;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 2%;
  margin-bottom: 2%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.message-card-header {

}
.message-card-header-contents {
  padding-top: 2%;
  padding-left: 4%;
}
.message-card-header-title {
  font-size: 20px;
  font-weight: bold;
}
.message-card-header-info {
  padding-left: 2%;
  font-size: 15px;
  font-weight: 500;
  color: gray;
}
.message-card-header-close-button {
  padding-top: 15%;
  padding-left: 40%;
}
.message-card-content {
  padding-left: 4%;
}
.message-card-footer {

}
.message-card-header-close-button:hover {
  color: grey;
  cursor: pointer;
}
.message-card-footer-read {
  padding-bottom: 10%;
}
.message-card-footer-reply {
  padding-bottom: 10%;
}
.card-pagination {
  padding-top: 3%;
}

</style>
