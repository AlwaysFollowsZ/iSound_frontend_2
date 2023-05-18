<template>
    <div class="user-page-TopNav"><top-nav></top-nav></div>
    <div class="user-page-body">
        <n-grid x-gap="0">
            <n-gi :span="3"> <!--左右边栏留一部分空袭空隙，使主页主体居中--></n-gi>
            <n-gi :span="5">
                <div class="user-info-container">
                    <div class="avatar">
                        <img :src="avatarUrl" alt="avatar" />
                    </div>
                    <div class="user-info-card">
                        <div class="user-info-title">{{ this.username }}</div>
                        <div class="user-info-body">
                            <div>
                                <person-circle-sharp style="width: 20px; margin-top: 3px;" />用户名：{{ this.username }}<br />
                                <newspaper-outline style="width: 20px; margin-top: 3px;" />邮箱：{{ this.email }}<br />
                                <pricetag-outline style="width: 20px; margin-top: 3px;" />个性签名：{{ this.bio }}<br />
                            </div>
                        </div>
                        <div><br /><br /><!--用来隔开基本信息和修改个人信息--></div>
                        <div>
                            <n-button text class="modify-user-info-button" @click="showModifyUserInfo = true">
                                <template #icon><n-icon><create-outline /></n-icon></template>修改个人信息
                            </n-button>
                        </div>
                    </div>
                </div>
            </n-gi>
            <n-gi :span="1">
                <!--这里本意是想用一个竖线隔开，但是这个方法不太行的通似乎。-->
                <n-divider vertical />
            </n-gi>
            <n-gi :span="12">
                <div class="user-other-info-container">
                    <div class="user-tabs">
                        <div>
                            <n-tabs size="large" type="line" animated>
                                <n-tab-pane name="我的歌单" tab="我的歌单">
                                    <my-song-sheet-view />
                                </n-tab-pane>
                                <n-tab-pane name="我的收藏" tab="我的收藏">
                                    <collect-song-sheet-view />
                                </n-tab-pane>
                                <n-tab-pane name="我的歌曲" tab="我的歌曲">
                                    <my-upload-song-view />
                                </n-tab-pane>
                                <n-tab-pane name="我的关注" tab="我的关注">
                                    <follow-list-view />
                                </n-tab-pane>
                                <n-tab-pane name="我的粉丝" tab="我的粉丝">
                                    <fan-list-view />
                                </n-tab-pane>
                                <template #suffix>
                                    <!--maybe can add some icons-->
                                    粉丝：{{ fansCount }}
                                    关注：{{ likeCount }}
                                </template>
                            </n-tabs>
                        </div>
                    </div>
                </div>
            </n-gi>
            <n-gi :span="3"></n-gi>
        </n-grid>
    </div>
    <modify-user-info-view :showModifyUserInfo="showModifyUserInfo"
        @closeModifyWindow="showModifyUserInfo = false"></modify-user-info-view>
    <ModifyUserInfo @update-user-info="updateUserInfo" />
</template>
  
<script>
import TopNav from '../components/TopNav.vue';
import ModifyUserInfoView from './ModifyUserInfoView.vue';
import MySongSheetView from '../components/MySongSheetView.vue';
import CollectSongSheetView from '../components/CollectSongSheetView.vue';
import MyUploadSongView from '../components/MyUploadSongView.vue';
import FollowListView from "../components/FollowListView.vue";
import FanListView from '../components/FanListView.vue';
import { ref } from "vue";
import { NTabs, NTabPane } from "naive-ui";
import { CreateOutline, PaperPlaneOutline, PersonCircleSharp, PricetagOutline } from '@vicons/ionicons5';
import { NewspaperOutline } from '@vicons/ionicons5'

export default {
    components: {
        ModifyUserInfoView,
        MySongSheetView,
        CollectSongSheetView,
        MyUploadSongView,
        FollowListView,
        FanListView,
        NTabs,
        NTabPane,
        CreateOutline,
        PaperPlaneOutline,
        PersonCircleSharp,
        PricetagOutline,
        NewspaperOutline
    },
    data() {
        return {
            showModifyUserInfo: false,
            currentView: "songSheet",
            username: '',
            bio: '',
            email: '',
            avatarUrl: '',
            avatarFile: ''
        }
    },
    created() {
        this.$http.get('/api/accounts/detail/0/').then(response => {
            this.username = response.data.username;
            this.email = response.data.email;
            this.recordNum = response.data.record_num;
            this.bio = response.data.profile;
            this.avatarFile = response.data.avatar;
            this.avatarUrl = response.data.avatar;
        }).catch(error => {
            console.error(error);
        });
    },
    methods: {
        updateUserInfo(userInfo) {
            this.avatarUrl = userInfo.avatarUrl;
            this.username = userInfo.username;
            this.email = userInfo.email;
            this.bio = userInfo.bio;
        },
    }
};
</script>
  
<style>
.n-tabs-tab {
    --n-tab-text-color-active: rgb(104, 9, 9);
    --n-tab-text-color: grey;
    --n-tab-text-color-hover: rgb(104, 9, 9);
}

.n-tabs-tab__label {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: bold;
    text-align: center;

}

.n-tabs-bar {
    --n-bar-color: rgb(104, 9, 9);
}

.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar img {
    width: 256px;
    height: 256px;
    border-radius: 50%;
    margin-top: 20px;
}

.user-info-card {
    margin-top: 40px;
}

.user-info-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}

.user-info-body {
    margin-top: 15px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: bold;
    width: 80%;
}

.modify-user-info-button {
    margin-top: 15px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 15px;
}

.user-tabs-title .n-tab-pane {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: bold;
}

.user-set-new-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
  