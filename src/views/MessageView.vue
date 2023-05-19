<script>
    import { MenuOutlined, FileDoneOutlined, MailOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons-vue';
    import { defineComponent } from 'vue';
    import MessageItem  from '../components/message/MessageItem.vue';
    import MessageSend  from '../components/message/MessageSend.vue';
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
            /*back() {
                this.$router.push({path:'/admin'})
            },*/
            myMessage(){
                this.$router.push('receive')
            },
            replyMessage(){
                this.$router.push('reply')
            },
            sendMessage(){
                this.$router.push('send')
            },
        },
        setup() {

        }
    });

</script>

<template>
    <div><admin-top-nav :isSearchPage="false"></admin-top-nav></div>
    <div class="message-page-body">
        <a-row>
            <a-col :span="4">
                <a-card title="消息中心" :bordered="false">
                    <a-menu class="left-menu"
                        mode="vertical"
                       >
                        <a-menu-item key="1" @click="myMessage()">
                        <template #icon>
                            <MessageOutlined />
                        </template>
                        我的消息</a-menu-item>
                        <a-menu-item key="2" @click="replyMessage()">
                        <template #icon>
                            <FileDoneOutlined />
                        </template>我的回复</a-menu-item>
                        <a-menu-item key="3" @click="sendMessage()">
                        <template #icon>
                            <EditOutlined />
                        </template>去写信</a-menu-item>
                    </a-menu>
                </a-card>
            </a-col>

            <a-col :span="20" :style="{'background-color': `lightsteelblue`}">
                <div style="background-color:lightsteelblue">
                    <router-view></router-view>
                </div>
                <!-- <MessageItem />
                <MessageSend /> -->
                
            </a-col>
        </a-row>
    </div>
</template>



<style scoped>
/*.isound-admin-style {
    padding-top: 1%;
    font-size: 28px;
}*/
/*.message-page-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 55px;
    border: 3px solid rgb(235, 237, 240)
}*/
/*
.back-button {
    position: fixed;
    top: 10px;
    left: 10px;
    background-color: lightgray;
    border-color: lightgray;
}
.admin-avatar {
    position: fixed;
    top: 10px;
    right: 10px;
}
.default-admin-avatar {
    width: 35px;
}*/
.message-page-body {
    position: fixed;
    margin-left: 10vw;
    margin-top: 55px;
    background:rgba(154, 211, 252, 0.516) ;
    width: 80vw;
    height: 100vw;
}
.ant-card {
    height: 100vw;
    background: rgb(255, 255, 255);
    border: 3px solid rgb(235, 237, 240);
    margin: 0;
}
.left-menu {
    position: relative;
    margin-left: 0;
}
</style>

