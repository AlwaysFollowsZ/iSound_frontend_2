<template>
    <div :style="{
        'animation': isEnteringPage ? 'fadeIn' : 'fadeOut',
        'animation-duration': '1s'
    }">
        <div class="user-page-TopNav"><top-nav @exit="this.isEnteringPage = false"></top-nav></div>
        <div class="user-page-body" style="min-width: 1400px">
            <n-grid x-gap="0">
                <n-gi :span="2"> <!--左右边栏留一部分空袭空隙，使主页主体居中--></n-gi>
                <n-gi :span="7">
                    <div class="user-info-container">
                        <div class="avatar">
                            <img :src="avatarUrl" alt="avatar" @click="showModifyUserInfo = true" />
                        </div>
                        <div class="user-info-card">
                            <div class="user-info-title" :style="{ color: 'rgb(' + this.accentColor + ')' }">
                                {{ this.username }}
                            </div>
                            <div class="user-info-body">
                                <!-- <person-circle-sharp style="width: 20px; margin-top: 3px;" />用户名：{{ this.username }}<br /> -->
                                <!-- <newspaper-outline style="width: 20px; margin-top: 3px;" /> -->

                                <div class="user-info-body-title" :style="{ color: 'rgb(' + this.accentColor + ')' }">
                                    邮箱
                                </div>
                                <div class="user-info-body-content"
                                    :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }">
                                    {{ this.email }}
                                </div>

                                <div class="user-info-body-title" :style="{ color: 'rgb(' + this.accentColor + ')' }">
                                    个性签名
                                </div>
                                <div class="user-info-body-content"
                                    :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }">
                                    {{ this.bio }}
                                </div>

                                <!-- <pricetag-outline style="width: 20px; margin-top: 3px;" /> -->
                            </div>
                            <div><br /><!--用来隔开基本信息和修改个人信息--></div>
                            <div class="modify-user-info-button">
                                <n-button text @click="showModifyUserInfo = true" :focusable="false" :style="{
                                    '--n-color': 'transparent',
                                    '--n-color-hover': 'transparent',
                                    '--n-color-pressed': 'transparent',
                                    '--n-color-focus': 'transparent',
                                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.7)',
                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-focus': 'rgba(' + this.accentColor + ', 1)',
                                }">
                                    <template #icon><n-icon size="25"><create-outline /></n-icon></template>编辑个人信息
                                </n-button>
                            </div>
                        </div>
                    </div>
                </n-gi>
                <n-gi :span="1"></n-gi>
                <n-gi :span="12">
                    <div class="user-other-info-container">
                        <div class="user-tabs">
                            <div>
                                <n-tabs size="large" type="line" animated :style="{
                                    '--n-bar-color': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-tab-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                    '--n-tab-text-color-active': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-tab-text-color-hover': 'rgba(' + this.accentColor + ', 0.85)',
                                    '--n-pane-text-color': 'rgba(' + this.accentColor + ', 0.9)',
                                    '--n-tab-border-color': 'rgba(' + this.accentColor + ', 0.6)',
                                }">
                                    <n-tab-pane name="收藏夹" tab="收藏夹">
                                        <my-song-sheet-view @exit="this.isEnteringPage=false" />
                                    </n-tab-pane>
                                    <n-tab-pane name="我喜欢" tab="我喜欢">
                                        <my-favorites/>
                                    </n-tab-pane>
                                    <n-tab-pane name="分享歌单" tab="分享歌单">
                                        <shared-song-sheet-view @exit="this.isEnteringPage = false"/>
                                    </n-tab-pane>
                                    <n-tab-pane name="我的歌曲" tab="我的歌曲">
                                        <my-upload-song-view @exit="this.isEnteringPage = false"/>
                                    </n-tab-pane>
                                    <n-tab-pane name="我的关注" tab="我的关注">
                                        <follow-list-view @exit="this.isEnteringPage = false"/>
                                    </n-tab-pane>
                                    <n-tab-pane name="我的粉丝" tab="我的粉丝">
                                        <fan-list-view @exit="this.isEnteringPage = false"/>
                                    </n-tab-pane>
                                    <template #suffix>
                                        <div :style="{
                                            'color': 'rgba(' + this.accentColor + ',0.9)',
                                            'transition': 'all linear 0.3s'
                                        }">
                                            粉丝数：{{ this.fansNum }}
                                            <a-divider type="vertical" style="width: 1.5px; background-color: #dddddd" />
                                            <!-- <flash-outline style="width: 20px;"/>  -->
                                            关注数：{{ this.followingNum }}
                                        </div>
                                        <!-- <flower-outline style="width: 20px;"/> -->
                                    </template>
                                </n-tabs>
                            </div>
                        </div>
                    </div>
                </n-gi>
                <n-gi :span="2"></n-gi>
            </n-grid>
        </div>
    </div>

    <modify-user-info-view :showModifyUserInfo="showModifyUserInfo" @closeModifyWindow="
        showModifyUserInfo = false;
    updateInfo();
    "></modify-user-info-view>

    <!-- <ModifyUserInfo @update-user-info="updateUserInfo" /> -->
</template>

<script>
import TopNav from "../components/TopNav.vue";
import ModifyUserInfoView from "./ModifyUserInfoView.vue";
import MySongSheetView from "../components/MySongSheetView.vue";
import SharedSongSheetView from "../components/SharedSongSheetView.vue";
import MyUploadSongView from "../components/MyUploadSongView.vue";
import FollowListView from "../components/FollowListView.vue";
import FanListView from "../components/FanListView.vue";
import MyFavorites from "../components/MyFavorites.vue";
import "animate.css";
import { ref } from "vue";
import { NTabs, NTabPane } from "naive-ui";
import {
    CreateOutline,
    PaperPlaneOutline,
    PersonCircleSharp,
    PricetagOutline,
} from "@vicons/ionicons5";
import { NewspaperOutline, FlowerOutline, FlashOutline } from "@vicons/ionicons5";
import { mapState } from "vuex";
import MyFavoritesVue from "../components/MyFavorites.vue";
import { getBackgroundColorString, globalThemeColor, getRGBString } from '/src/colorMode.js'
export default {
    computed: {
        ...mapState(["colorMode", "accentColor"]),
        BackgroundColorString() {
            return getRGBString(getBackgroundColorString(globalThemeColor))
        }
    },
    components: {
        ModifyUserInfoView,
        MyFavorites,
        MySongSheetView,
        SharedSongSheetView,
        MyUploadSongView,
        FollowListView,
        FanListView,
        NTabs,
        NTabPane,
        CreateOutline,
        PaperPlaneOutline,
        PersonCircleSharp,
        PricetagOutline,
        NewspaperOutline,
        FlowerOutline,
        FlashOutline,
    },
    data() {
        return {
            showModifyUserInfo: false,
            currentView: "songSheet",
            username: "",
            bio: "",
            email: "",
            avatarUrl: "",
            avatarFile: "",
            fansNum: "",
            followingNum: "",
            isEnteringPage:true
        };
    },
    created() {
        this.updateInfo();
        this.$EventBus.on("updateInfo", () => {
            this.updateInfo();
        });
    },
    methods: {
        updateInfo() {
            this.$http
                .get("/api/accounts/detail/0/")
                .then((response) => {
                    this.username = response.data.username;
                    document.title = `${this.username}的个人主页`;
                    this.email = response.data.email;
                    this.recordNum = response.data.record_num;
                    this.bio = response.data.profile;
                    this.avatarFile = response.data.avatar;
                    this.avatarUrl = this.avatarFile;
                    this.fansNum = response.data.fans;
                    this.followingNum = response.data.following;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        // updateUserInfo(userInfo) {
        //     this.avatarUrl = userInfo.avatarUrl;
        //     this.username = userInfo.username;
        //     this.email = userInfo.email;
        //     this.bio = userInfo.bio;
        // },
    },
};
</script>

<style scoped>
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
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar img {
    cursor: pointer;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    margin-top: 20px;
    transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s;
}

.avatar img:hover {
    box-shadow: 0 0 0px 15px v-bind("BackgroundColorString");
    transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.5s;
}

.user-info-card {
    margin-top: 25px;
}

.user-info-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    transition: color 1s;
}

.user-other-info-container {
    margin-top: 10px;
}

.user-info-body {
    /*margin-top: 15px;*/
    padding-left: 15px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.user-info-body-title {
    font-size: 20px;
    font-weight: 550;
    padding-left: 30px;
    padding-top: 10px;
    transition: color 1s;
}

.user-info-body-content {
    font-size: 16px;
    font-weight: 400;
    margin-left: 30px;
    transition: color 1s;
    word-wrap: break-word;
    max-width: 300px;
}

.modify-user-info-button {
    margin-top: 15px;
    padding-left: 50px;
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
