<script>
    import { BellOutlined } from '@ant-design/icons-vue';
    import { defineComponent } from 'vue';
    import { SearchOutline } from '@vicons/ionicons5'
    import AdminTopNav from '../components/AdminTopNav.vue';
    export default defineComponent({
        name: 'AdminPageHeader',
        components: {
            BellOutlined,
            SearchOutline,
            AdminTopNav,
        },
        data() {
            return {
                searchValue: '',
            }
        },
        methods: {
            /*gotoMessage() {
                this.$router.push({path:'/message'})
            },*/
            search() {
                if (this.searchValue.trim().length !== 0) {
                    console.log(`searchValue: ${this.searchValue}`)
                    // do search
                    this.searchValue = ''
                }
            },
        }
    });
</script>


<template>
    <div><admin-top-nav :isSearchPage="true"></admin-top-nav></div>
    <div class="message-page-search">
        <n-grid>
            <n-gi :span="3"></n-gi>
            <n-gi :span="14">
                <div style="padding-top: 7%">
                <n-input round type="text" v-model:value="searchValue" placeholder="请输入关键字" @keyup.enter="search()" />
                </div>
            </n-gi>
            <n-gi :span="2"></n-gi>
            <n-gi :span="1">
            <div style="color:lightgray; padding-top: 100%">
                <SearchOutline size="30px" @click="search()" />
            </div> 
            </n-gi> 
            <n-gi :span="4"></n-gi>
        </n-grid>      
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
.ant-space-item {
    background-color:aqua;
}
/*.message-page-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 55px;
    border: 3px solid rgb(235, 237, 240)
}*/
/*.isound-admin-style {
    padding-top: 1%;
    font-size: 28px;
}
.go-message-button {
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
.search-input {
    position: fixed;
    right: 60px;
    top: 12px;
}

.message-page-search {
    position: fixed;
    top: 58px;
    width: 60vw;
    margin: 0 20vw;
}
.music-list-header {
    position: fixed;
    top: 170px;
    left: 10vw;
    width: 80vw;
    height: 100vw;
    background: rgb(235, 237, 240);
    margin: 0;
    padding: 0 15px;
}
.n-input {
    transform: scale(1.2, 1.2);
    position: relative;
} 
</style>