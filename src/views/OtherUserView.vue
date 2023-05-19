<template>
    <div class="user-page-TopNav"><top-nav></top-nav></div>
    <div>
        <n-grid :x-gap="0">
            <n-gi :span="4">
                <div>
                    <n-button tertiary circle class="back-button" @click="back">
                        <ChevronBack style="width: 36px; position: absolute; left: 0px" />
                    </n-button>
                </div>
            </n-gi>
            <n-gi :span="18">
                <div class="user-info-title">
                    <n-grid :x-gap="0">
                        <n-gi :span="10">
                            <div class="user-avatar">
                                <n-image class="user-avatar-img" :src="userAvatar" />
                            </div>
                        </n-gi>
                        <n-gi :span="14">
                            <div class="user-info">
                                <n-grid :y-gap="12" :cols="1">
                                    <n-gi>
                                        <div class="user-name">{{ this.username }}</div>
                                    </n-gi>
                                    <n-gi>
                                        <div class="user-email">
                                            <newspaper-outline style="width: 20px; margin-top: 3px;" />邮箱：{{ this.userEmail
                                            }}
                                        </div>
                                    </n-gi>
                                    <n-gi>
                                        <div class="user-bio"><pricetag-outline
                                                style="width: 20px; margin-top: 3px;" />个性签名：{{ this.userBio }}</div>
                                    </n-gi>
                                    <n-gi>
                                        <n-button>+关注</n-button>
                                    </n-gi>
                                </n-grid>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
                <div class="user-song-songsheet">
                    <n-tabs type="line" animated>
                        <n-tab-pane name="ta的歌单" tab="ta的歌单">
                            <other-user-song-sheet-view/>
                        </n-tab-pane>
                        <n-tab-pane name="ta的歌曲" tab="ta的歌曲">
                            <other-user-upload-song-view/>
                        </n-tab-pane>
                    </n-tabs>
                </div>
            </n-gi>
            <n-gi :span="2"></n-gi>
        </n-grid>
    </div>
</template>
<script>
import TopNav from '../components/TopNav.vue';
import MySongSheetView from '../components/MySongSheetView.vue';
import MyUploadSongView from '../components/MyUploadSongView.vue';
import OtherUserSongSheetView from '../components/OtherUserSongSheetView.vue';
import OtherUserUploadSongView from '../components/OtherUserUploadedSongView.vue'
import { CreateOutline, PaperPlaneOutline, PersonCircleSharp, PricetagOutline, ChevronBack } from '@vicons/ionicons5';
import { NewspaperOutline } from '@vicons/ionicons5';
export default {
    components: {
        PersonCircleSharp,
        NewspaperOutline,
        PricetagOutline,
        ChevronBack,
        MySongSheetView,
        MyUploadSongView,
        OtherUserUploadSongView,
    },
    data() {
        return {
            userid: '',
            username: '',
            userBio: '',
            userAvatar: null,
            userEmail: '',
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (newParams) => {
                const userId = newParams.userId;
                this.$http.get(`/api/accounts/detail/${userId}/`).then((response) => {
                    this.userid = response.data.id;
                    this.username = response.data.username;
                    this.userBio = response.data.profile;
                    this.userEmail = response.data.email;
                    this.userAvatar = response.data.avatar;
                    console.log(response);
                });
            },
            { immediate: true },
        );
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
    }
}
</script>
<style scoped>
.back-button {
    width: 40px;
    height: 40px;
    /* position: fixed; */
    left: 20px;
}

.user-info-title {
    height: 55vh;
    overflow: hidden;
    text-align: left;
}

.user-avatar {
    margin-top: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.user-avatar-img {
    margin: auto;
    width: 360px;
    height: 360px;
    border-radius: 50%;
}

.user-info {
    height: 55vh;
    margin-left: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.user-name {
    font-size: 60px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
}

.user-email {
    font-size: 15px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 400;
    color: grey;
}

.user-bio {
    font-size: 15px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 400;
    color: grey;
}

.user-song-songsheet {
    margin-top: 20px;
}
</style>