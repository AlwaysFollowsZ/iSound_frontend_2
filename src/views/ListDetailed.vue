<script>
    import TopNav from '../components/TopNav.vue'
    import { NButton, NIcon } from 'naive-ui';
    import { defineComponent} from 'vue';
    import { ChevronBack, ListCircleOutline } from '@vicons/ionicons5';
    export default defineComponent({
        name: 'ListDetailed',
        components: {
            ChevronBack,
            ListCircleOutline,
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
        },
        setup () {
            return {
            ListCircleOutline
        }
    }
})
</script>
<template>
    <div class="list-detail-page">
        <n-grid>
            <n-gi :span="4">
                <n-button tertiary circle class="back-button" @click="back">
                <ChevronBack style="width: 36px; position: absolute; left: 0px"/>
                </n-button></n-gi>
            <n-gi :span="4"> 
                <div class="list-cover">
                    <n-image class="list-cover-img" src="/src/assets/default-admin.jpg"/>
                </div>
                <div style="margin: 30px 0px 20px 0px">
                    <!-- <n-icon size="30" class="list-circle"><ListCircleOutline/></n-icon>
                    <span style="font-size:24px; margin-bottom: 10px;">歌曲列表</span> -->
                    <n-breadcrumb>
                        <n-breadcrumb-item style="font-size: 25px;">
                        <n-icon :component="ListCircleOutline" size="30"/> 歌曲列表</n-breadcrumb-item>
                    </n-breadcrumb>
                </div>
            </n-gi>
            <n-gi :span="1"></n-gi>
            <n-gi :span="11" class="list-information">
                <div style="height: 245px">
                <n-grid :y-gap="20" :cols="1">
                    <n-gi style="height: 50px">
                        <div style="font-size:xx-large; height: 50px">歌单名</div>
                    </n-gi>
                    <n-gi>
                        <div>标签：</div>
                        <div>歌曲：</div>
                        <div>简介：</div>
                    </n-gi>
                    
                </n-grid>
                </div>
            </n-gi>
            <n-gi :span="4"></n-gi>
        </n-grid>
    </div>
    <div class="music-list-item">
        <n-grid>
            <n-gi :span="4"></n-gi>
            <n-gi :span="16">
                <a-divider style="height: 1.8px; background-color: #dddddd" />
                <list-table :view-mode="user"></list-table> 
            </n-gi>
            <n-gi :span="4"></n-gi>
        </n-grid>
    </div>
</template>
<style scoped>
.back-button {
    width: 40px;
    height: 40px;
    /* position: absolute; */
    left: 20px;
    top: 20px;
}
.list-cover {
    /* position: absolute; */
    margin-top: 10%;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    overflow: hidden;
}
.list-cover-img {
    /* position: absolute; */
    margin: auto;
    width: 245px;
    height: 245px;
    border-radius: 10%;
}
.list-information {
    display: flex; 
    margin-top: 4%;
}
.list-circle {
    margin-top: 10px;
    margin-right: 5px;
}

.ant-divider-horizontal {
    display: flex;
    clear: both;
    width: 100%;
    min-width: 0px;
    margin-top: 0;
    margin-bottom: 0px;
}
</style>