<script>
    import { MenuOutlined, FileDoneOutlined, MailOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons-vue';
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'MessagePageHeader',
        components: {
            MenuOutlined,
            FileDoneOutlined,
            MailOutlined,
            EditOutlined,
            MessageOutlined
        },
        methods: {
            back() {
                this.$router.push({path:'/'})
            }
        }
    });

</script>

<template>
    
    <div class="message-page-header">
        <a-page-header
        :backIcon="false"
        ></a-page-header>
        <div>
            <a-button class="back-button" type="primary" shape="circle" @click="back()">
                <template #icon><menu-outlined /></template>
            </a-button>
        </div>
        <div class="admin-avatar">
            <img src="../assets/default-admin.jpg" alt="管理员头像" class="default-admin">
        </div>
    </div>

    <div class="message-page-body">
        <a-row>
            <a-col :span="4">
                <a-card title="消息中心" :bordered="false">
                    <a-menu class="left-menu"
                        mode="vertical"
                        @click="handleClick">
                        <a-menu-item key="1">
                        <template #icon>
                            <MessageOutlined />
                        </template>我的消息</a-menu-item>
                        <a-menu-item key="2">
                        <template #icon>
                            <FileDoneOutlined />
                        </template>我的回复</a-menu-item>
                        <a-menu-item key="3">
                        <template #icon>
                            <EditOutlined />
                        </template>去写信</a-menu-item>
                    </a-menu>
                </a-card>
            </a-col>

            <a-col :span="20">
                
            </a-col>
        </a-row>
    </div>
</template>



<style>
.message-page-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 55px;
    border: 3px solid rgb(235, 237, 240)
}
.back-button {
    position: fixed;
    top: 10px;
    left: 10px;
}
.admin-avatar {
    position: fixed;
    top: 10px;
    right: 10px;
}
.default-admin {
    width: 35px;
}
.message-page-body {
    position: fixed;
    margin-left: 10vw;
    margin-top: 55px;
    background:aquamarine ;
    width: 80vw;
    height: 100vw;
}
.ant-card {
    height: 100vw;
    border: 2px solid rgb(191, 191, 191);
}
.left-menu {
    position: relative;
    margin-left: 0;
}
</style>

