<script>
import { MenuOutlined, FileDoneOutlined, MailOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import MessageItem from '../components/message/MessageItem.vue';
import MessageSend from '../components/message/MessageSend.vue';
import AdminTopNav from '../components/AdminTopNav.vue';

export default defineComponent({
    name: 'MessageView',
    components: {
        AdminTopNav,
        MenuOutlined,
        FileDoneOutlined,
        MailOutlined,
        EditOutlined,
        MessageOutlined,
        MessageItem,
        MessageSend,
    },
    methods: {
        myMessage() {
            this.$router.push('receive')
        },
        replyMessage() {
            this.$router.push('reply')
        },
        sendMessage() {
            this.$router.push('send')
        },
    },
    created() {
        document.title = "消息中心";
    }
    setup() {

    }
});

</script>

<template>
    <div><admin-top-nav :isSearchPage="false"></admin-top-nav></div>
    <div class="message-page-body">
        <a-row>

            <a-col :span="4">
                <div class="message-center-left-container">
                    <div class="message-center-title">消息中心</div>
                    <div style="margin-top: 10px;">
                        <div class="message-center-sub-route" @click="myMessage()">
                            <n-icon style="margin-right:8%">
                                <MessageOutlined />
                            </n-icon>我的消息
                        </div>
                        <div class="message-center-sub-route" @click="replyMessage()">
                            <n-icon style="margin-right:8%">
                                <FileDoneOutlined />
                            </n-icon>我的回复
                        </div>
                        <div class="message-center-sub-route" @click="sendMessage()">
                            <n-icon style="margin-right:8%">
                                <EditOutlined />
                            </n-icon>去写信
                        </div>
                    </div>
                </div>
            </a-col>
            <a-col :span="20">
                <div>
                    <router-view></router-view>
                </div>
            </a-col>
        </a-row>
    </div>
</template>



<style scoped>
.message-page-body {
    margin-left: 10vw;
    margin-top: 2%;
    width: 80vw;
    height: 90vh;
}

.message-center-left-container {
    margin-left: 30%;

}

.message-center-title {
    font-size: 30px;
    font-weight: bold;
}

.message-center-sub-route {
    padding-top: 6%;
    padding-bottom: 5%;
    font-size: 18px;
    font-weight: 500;
}

.message-center-sub-route:hover {
    cursor: pointer;
}</style>

