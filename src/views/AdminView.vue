<script>
    import { BellOutlined } from '@ant-design/icons-vue';
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'AdminPageHeader',
        components: {
            BellOutlined,
        },
        methods: {
            gotoMessage() {
                this.$router.push({path:'/message'})
            }
        },
    });
</script>


<template>
    <div class="message-page-header">
        <a-page-header
        :backIcon="false"
        ></a-page-header>
        <div>
            <a-button class="go-message-button" type="primary" shape="circle" @click="gotoMessage()">
                <template #icon><BellOutlined /></template>
            </a-button>
        </div>
        <div class="admin-avatar">
            <img src="../assets/default-admin.jpg" alt="管理员头像" class="default-admin-avatar">
        </div>
            <a-space class="search-input" direction="vertical">
                <a-input-search
                v-model:value="value"
                placeholder="input search text"
                style="width: 200px"
                @search="onSearch"
                />
        </a-space>
    </div>
    
    <div class="music-list-header">
        <a-tabs v-model:activeKey="activeKey" >
        <a-tab-pane key="1">
        <template #tab>
            <span><apple-outlined />歌曲</span>
        </template>
            <a-card title="Default size card" style="width: 300px">
            <template #extra><a href="#">more</a></template>
            <p>待插入歌曲列表组件</p>
            <p>card content</p>
            <p>card content</p>
            </a-card>
        </a-tab-pane>

        <a-tab-pane key="2">
        <template #tab>
            <span><android-outlined />歌单</span>
        </template>
        待插入歌单列表
        </a-tab-pane>
    </a-tabs>
    </div>
    
</template>

<style scoped>
.message-page-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 55px;
    border: 3px solid rgb(235, 237, 240)
}
.go-message-button {
    position: fixed;
    top: 10px;
    left: 10px;
}
.admin-avatar {
    position: fixed;
    top: 10px;
    right: 10px;
}
.default-admin-avatar {
    width: 35px;
}
.search-input {
    position: fixed;
    right: 60px;
    top: 12px;
}

.music-list-header {
    position: fixed;
    top: 58px;
    left: 10vw;
    width: 80vw;
    height: 100vw;
    background: rgb(235, 237, 240);
    margin: 0;
    padding: 0 15px;
}

</style>