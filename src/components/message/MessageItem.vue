<script>
  import { defineComponent } from 'vue'
  import { NCard, NButton } from 'naive-ui'
  import { CloseOutline } from '@vicons/ionicons5'
  import 'animate.css'                                // 引入 css 文件
  export default defineComponent({
    name : 'MessageItem',
    data() {
      return {
        id: 0,
        page: 1,
        refreshPage: true,      // 设置了一个布尔量用于底部页码的刷新
        messages: [
          { 
            id: 1, 
            title: '消息标题1',
            to: 'zyh123456',
            content: 'Welcome to iSound!',
            music: null,
            time: '2023-05-09 20:10:45',
            disabled:false,
          },
          { 
            id: 2, 
            title: '消息标题2',
            to: 'authormq',
            content: 'the secon这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦条消息点擦不擦的返回d message',
            music: null,
            time: '2023-05-09 20:20:36',
            disabled:false
          },
          { 
            id: 3, 
            title: '消息标题3',
            to: 'iSound',
            content: 'the third message',
            music: null,
            time: '2023-05-09 21:13:57',
            disabled:false
          },
          { 
            id: 4, 
            title: '消息标题4',
            to: 'iSound1',
            content: '这是第四条消这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦的返回',
            music: null,
            time: '2023-05-13 07:14:24',
            disabled:false
          },
          { 
            id: 5, 
            title: '消息标题5',
            to: 'iSound2',
            content: 
            '这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回这是第五条消息点擦不擦的返回啊变成挎包发啊飞就飞哈大海的话都比阿逗逼啊电话这是第五条消息点擦不擦的返回',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 6, 
            title: '消息标题6',
            to: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 7, 
            title: '消息标题7',
            to: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 8, 
            title: '消息标题8',
            to: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 9, 
            title: '消息标题9',
            to: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 10, 
            title: '消息标题10',
            to: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 11, 
            title: '消息标题11',
            to: 'iSound2',
            content: '这是第五条消息',
            music: null,
            time: '2023-05-15 09:21:27',
            disabled:false
          },
          { 
            id: 12, 
            title: '消息标题12',
            to: 'iSound2',
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
        message['isDeleted']=true // 此设置用于消息删除离场动画
        this.refreshPage = false  // 此设置用于消息删除后短暂让页码消失
        setTimeout(() => {        // 设置定时器
          const index = this.messages.findIndex(msg => msg.id === message.id)
          if (index !== -1) {
            this.messages.splice(index, 1)
            /*
                下面的循环将 index 及其后的消息的 id 字段设为随机值
                由于我们指定了 v-for 的 key 是 id 字段
                所以只有 id 更新了，v-for 才会重刷该元素
                为了让后面的浮上来，所以从 index 往后循环
            */
            for (var i = index; i < this.messages.length; i++) {
              this.messages[i].id = Math.random()
            }
            this.refreshPage = true // 让页码重新出现
          }
          if ((this.page - 1) * 5 >= this.messages.length) {
            this.page -= 1
          }
        }, 700)    
      },
      reply() {
        this.$router.push({path:'/message/send'})
      },
      /*
          此函数用于页码刷新，原理同上，它是页码组件 @click 的响应函数
      */
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
  <div style="overflow: hidden">
    <n-scrollbar style="max-height: 90vh" trigger="none">
      <!-- 
        下面的 :class 写法使得 card div 默认有 message-card 和 animate__animated 两个特性 
        如果某 message 被删除，其 isDeleted 字段为真，添加“向右离场”动画
        否则添加“向上浮现”动画
        由于被删消息之前的消息不会被 v-for 重新渲染，故它们没有动画
      -->
    <div :class="['message-card', 'animate__animated', `${message.isDeleted ? 'animate__fadeOutRight' : 'animate__slideInUp'}`]" 
      v-for="(message) in 
        messages.slice(5 * (page - 1), 5 * (page - 1) + ((5 * page > messages.length) ? (messages.length % 5) : 5))" 
      :key="message.id">
      <div class="message-card-header">
        <n-grid>
          <n-gi :span="12">
            <div class="message-card-header-contents">
              <span class="message-card-header-title">
                {{ message.title }}
              </span>
              <span class="message-card-header-info">
                {{ message.time }} 发送给{{ message.to }}
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
        <div style="padding-left: 2%; max-width: 560px">
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
      <div class="messgae-card-footer">
        <n-grid>
          <n-gi :span="20">

          </n-gi>
          <n-gi :span="2">
            <div class="message-card-footer-read">
              <n-button  
                strong secondary type="info" 
                 :disabled="message.disabled" 
                 @click="message.disabled = !message.disabled"
                 :style="{
                  '--n-color': `rgba(40, 180, 40, 0.657)`, 
                  '--n-color-hover': `rgba(40, 180, 40, 0.9)`,
                  '--n-color-disabled': `rgba(46, 51, 56, .05)`, 
                  '--n-text-color': `white`,
                  '--n-text-color-hover': `white`,
                  '--n-text-color-disabled': `rgb(90, 90, 90)`,
                }"
              >
              已读
              </n-button>
            </div>
          </n-gi>
          <n-gi :span="2">
            <div class="message-card-footer-reply">
              <n-button 
                strong secondary type="info" @click="reply"
                :style="{
                  '--n-color': `rgba(40, 120, 200, 0.711)`, 
                  '--n-color-hover': `rgba(40, 120, 200, 0.95)`,
                  '--n-text-color': `white`,
                  '--n-text-color-hover': `white`,
                }"
              >
              回复
              </n-button>
            </div>
            </n-gi>
        </n-grid>
      </div>
    </div>
    <div class="card-pagination">
      <n-grid>
        <n-gi :span="8"></n-gi>
        <n-gi :span="8">
          <!-- 添加了动画 这种用一个布尔量实现刷新的做法证实了可靠 不复述逻辑了 -->
          <div :class="['animate__animated', `${refreshPage ? 'animate__zoomIn' : 'animate__zoomOut'}`]" 
          style="display: flex; justify-content: center;" v-if="messages.length > 0">
            <n-pagination v-model:page="page" :page-count="Math.ceil(messages.length / 5)" @click="toRefreshPage"/>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 2%;
  margin-bottom: 2%;
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
  color: lightgrey;
}
.message-card-header-close-button:hover {
  color: grey;
  cursor: pointer;
}
.message-card-content {
  padding-left: 4%;
}
.message-card-footer {

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
