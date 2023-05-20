<script>
import { NGrid } from 'naive-ui';
import { defineComponent, ref } from 'vue'
import { MailOutline, TrashOutline, MailOpenOutline } from '@vicons/ionicons5'
  export default defineComponent({
    name: 'UserMessageItem',
    components: {
        MailOutline,
        TrashOutline,
        MailOpenOutline,
        },
    data() {
        return {
            id: 0,
            messages: [
                {
                    id: 1,
                    title: '来自iSound的通知',
                    content: '这是第一条通知',
                    date: '2023-05-20 19:27:00',
                    isread: false,
                },
                {
                    id: 2,
                    title: '来自iSound的通知',
                    content: '这是第二条通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知',
                    date: '2023-05-20 19:27:00',
                    isread: false,
                },
                {
                    id: 3,
                    title: '来自iSound的通知',
                    content: '这是第三条通知',
                    date: '2023-05-20 19:27:00',
                    isread: false,
                },
                {
                    id: 4,
                    title: '来自iSound的通知',
                    content: '这是第四条通知',
                    date: '2023-05-20 19:27:00',
                    isread: false,
                },
                {
                    id: 5,
                    title: '来自iSound的通知',
                    content: '这是第五条通知这是第五条通知这是第五条通知这是第五条通知这是第五条通知这是第五条通知',
                    date: '2023-05-20 19:27:00',
                    isread: false,
                },
                {
                    id: 6,
                    title: '来自iSound的通知',
                    content: '这是第六条通知',
                    date: '2023-05-20 19:27:00',
                    isread: false,
                },
                {
                    id: 7,
                    title: '来自iSound的通知',
                    content: '这是第七条通知',
                    date: '2023-05-20 19:27:00',
                    isread: false,
                },
            ]
        }
    },
    methods: {
        removeMessage(message) {
            this.messages = this.messages.filter((t) => t !== message);
        },
    }
  })
</script>
<template>
    <div class="message-card-outer">
        <n-scrollbar style="max-height: 400px;" trigger="none" :size="10">
            <div class="message-card" v-for="message in messages">
                <div>
                    <n-grid>
                        <n-gi :span="4">
                            <div class="message-date">
                                {{ message.date }}
                            </div>
                        </n-gi>
                        <n-gi :span="18">
                            <n-grid :y-gap="8" :cols="1">
                            <n-gi>{{ message.title }}</n-gi>
                            <n-gi>{{ message.content }}</n-gi>
                            </n-grid>        
                        </n-gi>
                        <n-gi :span="1">
                            <n-icon v-if="message.isread" size="20"><MailOpenOutline/></n-icon>
                            <n-icon v-else size="20" @click="message.isread = !message.isread"><MailOutline/></n-icon>
                        </n-gi>
                        <n-gi :span="1">
                            <n-icon size="20" @click="removeMessage(message)"><TrashOutline/></n-icon>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
        </n-scrollbar>
    </div>
</template>
<style scoped>
.message-card-outer {
    width: 800px;
    height: 500px;
}
.message-card {
  background-color: white;
  border-radius: 20px;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 2% 2%;
}
.message-date {
    margin: auto;
}
</style>