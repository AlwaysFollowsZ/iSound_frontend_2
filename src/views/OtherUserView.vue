<template>
  <div :style="{
    'animation': isEnteringPage ? 'fadeIn' : 'fadeOutLeft',
    'animation-duration': '1s'
  }">
    <div class="user-page-TopNav"><top-nav @exit="this.isEnteringPage = false"></top-nav></div>
    <div style="min-width: 1400px">
      <n-grid :x-gap="0">
        <n-gi :span="3">
          <div>
            <n-button tertiary circle class="back-button" @click="back">
              <ChevronBack style="width: 36px; position: absolute; left: 0px" />
            </n-button>
          </div>
        </n-gi>
        <n-gi :span="18">
          <div class="user-info-title" style="min-height: 470px;">
            <n-grid :x-gap="0">
              <n-gi :span="10">
                <div class="user-avatar">
                  <img class="user-avatar-img" :src="userAvatar" />
                </div>
              </n-gi>
              <n-gi :span="14">
                <div class="user-info" style="min-height: 470px;">
                  <n-grid :y-gap="12" :cols="1">
                    <n-gi>
                      <div class="user-name" :style="{ 'color': 'rgb(' + this.accentColor + ')' }">{{ this.username }}
                      </div>
                    </n-gi>
                    <n-gi>
                      <div class="user-email" :style="{ 'color': 'rgb(' + this.accentColor + ')' }">
                        邮箱
                      </div>
                      <div class="info-content" :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                        {{ this.userEmail }}
                      </div>
                    </n-gi>
                    <n-gi>
                      <div class="user-bio" :style="{ 'color': 'rgb(' + this.accentColor + ')' }">
                        个性签名
                      </div>
                      <div class="info-content" :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                        {{ this.userBio }}
                      </div>
                    </n-gi>
                    <n-gi>
                      <div class="follow-unfollow-button">
                        <n-popconfirm v-if="this.userIsFollowed" @positive-click="follow" positive-text="确认"
                          negative-text="取消" :style="{
                            '--n-text-color': this.colorMode === 'white' ? 'rgb(57,57,57)' : 'white',
                            '--n-color': this.colorMode === 'white' ? '#fff' : 'rgb(72,72,72)',
                            '--n-border-radius': '12px',
                          }" :negative-button-props="{
  style: {
    '--n-color': 'transparent',
    '--n-color-hover': 'transparent',
    '--n-color-pressed': 'transparent',
    '--n-color-focus': 'transparent',
    '--n-text-color': '',
    '--n-text-color-hover': 'rgb(' + this.accentColor + ')',
    '--n-text-color-pressed': 'rgb(' + this.accentColor + ')',
    '--n-text-color-focus': 'rgb(' + this.accentColor + ')',
    '--n-border': '1px solid rgb(224, 224, 230)',
    '--n-border-hover': '1px solid rgb(' + this.accentColor + ')',
    '--n-border-pressed': '1px solid rgb(' + this.accentColor + ')',
    '--n-border-focus': '1px solid rgb(' + this.accentColor + ')',
    '--n-border-radius': '8px',
  }
}" :positive-button-props="{
  style: {
    '--n-color': 'rgba(' + this.accentColor + ', 0.7)',
    '--n-color-hover': 'rgba(' + this.accentColor + ', 0.8)',
    '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.8)',
    '--n-color-focus': 'rgba(' + this.accentColor + ', 0.8)',
    '--n-text-color': 'white',
    '--n-text-color-hover': 'white',
    '--n-text-color-pressed': 'white',
    '--n-text-color-focus': 'white',
    '--n-border': '1px solid rgb(224, 224, 230)',
    '--n-border-hover': '1px solid rgb(' + this.accentColor + ')',
    '--n-border-pressed': '1px solid rgb(' + this.accentColor + ')',
    '--n-border-focus': '1px solid rgb(' + this.accentColor + ')',
    '--n-border-radius': '8px',
  }
}">
                          <template #trigger>
                            <n-button round strong secondary type="primary" :focusable="false" :style="{
                              '--n-color': 'rgba(' + this.accentColor + ', 0.3)',
                              '--n-color-hover': 'rgba(' + this.accentColor + ', 0.5)',
                              '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.5)',
                              '--n-color-focus': 'rgba(' + this.accentColor + ', 0.5)',
                              '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                              '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                              '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                              '--n-text-color-focus': 'rgba(' + this.accentColor + ', 1)',
                            }">已关注</n-button>
                          </template>
                          您要确定要取消关注该用户吗？
                        </n-popconfirm>
                        <n-button v-else @click="follow()" strong secondary round type="default" :focusable="false"
                          :style="{
                            '--n-color': 'rgba(' + this.accentColor + ', 0.3)',
                            '--n-color-hover': 'rgba(' + this.accentColor + ', 0.5)',
                            '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.5)',
                            '--n-color-focus': 'rgba(' + this.accentColor + ', 0.5)',
                            '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-focus': 'rgba(' + this.accentColor + ', 1)',
                          }">加关注</n-button>
                      </div>
                    </n-gi>
                  </n-grid>
                </div>
              </n-gi>
            </n-grid>
          </div>
          <div class="user-song-songsheet">
            <n-tabs type="line" animated :style="{
              '--n-bar-color': 'rgba(' + this.accentColor + ', 1)',
              '--n-tab-text-color': this.colorMode === 'white' ? 'black' : 'white',
              '--n-tab-text-color-active': 'rgba(' + this.accentColor + ', 1)',
              '--n-tab-text-color-hover': 'rgba(' + this.accentColor + ', 0.85)',
              '--n-pane-text-color': 'rgba(' + this.accentColor + ', 0.9)',
              '--n-tab-border-color': 'rgba(' + this.accentColor + ', 0.6)',
            }">
              <n-tab-pane name="ta的歌单" tab="ta的歌单">
                <other-user-song-sheet-view />
              </n-tab-pane>
              <n-tab-pane name="ta的歌曲" tab="ta的歌曲">
                <other-user-upload-song-view />
              </n-tab-pane>
              <template #suffix>
                <div :style="{
                  'color': 'rgba(' + this.accentColor + ',0.9)',
                  'transition': 'all linear 0.3s'
                }">
                  粉丝数：{{ this.userFansNum }}
                  <a-divider type="vertical" style="width: 1.5px; background-color: #dddddd" />
                  关注数：{{ this.userFollowingNum }}
                </div>
              </template>
            </n-tabs>
          </div>
        </n-gi>
        <n-gi :span="2"></n-gi>
      </n-grid>
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import OtherUserSongSheetView from "../components/OtherUserSongSheetView.vue";
import OtherUserUploadSongView from "../components/OtherUserUploadedSongView.vue";
import { mapState } from "vuex";
import {
  CreateOutline,
  PaperPlaneOutline,
  PersonCircleSharp,
  PricetagOutline,
  ChevronBack,
  TimeSharp,
} from "@vicons/ionicons5";
import { NewspaperOutline, FlowerOutline, FlashOutline } from "@vicons/ionicons5";
import "animate.css";
export default {
  name: "OtherUserView",
  components: {
    PersonCircleSharp,
    NewspaperOutline,
    PricetagOutline,
    ChevronBack,
    FlowerOutline,
    FlashOutline,
    OtherUserSongSheetView,
    OtherUserUploadSongView,
  },
  computed: {
    ...mapState(["colorMode", "accentColor"]),
  },
  data() {
    return {
      userid: "",
      username: "",
      userBio: "",
      userAvatar: null, // 得改
      userEmail: "",
      userIsFollowed: "",
      userFansNum: "",
      userFollowingNum: "",
      isEnteringPage: true
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (newParams) => {
        const userId = newParams.userId;
        this.$http.get(`/api/accounts/detail/${userId}/`).then((response) => {
          this.userid = response.data.id;
          this.username = response.data.username;
          document.title = `${this.username}的个人主页`;
          this.userBio = response.data.profile;
          this.userEmail = response.data.email;
          this.userAvatar = response.data.avatar;
          this.userIsFollowed = response.data.is_followed;
          this.userFansNum = response.data.fans;
          this.userFollowingNum = response.data.following;
          console.log(response);
        });
        if (userId == this.$cookies.get('userid')) {
          this.$router.push("/home");
        }
      },
      { immediate: true }
    );
  },
  methods: {
    back() {
      this.isEnteringPage = false
      setTimeout(() => {
        this.$router.go(-1);
      }, 800)
    },
    follow() {
      if (!this.$cookies.isKey('userid')) {
        this.$EventBus.emit('showLoginModal')
      } else {
        this.userIsFollowed = !this.userIsFollowed;
        if (this.userIsFollowed) {
          this.followUser();
        } else {
          this.unFollowUser();
        }
      }

    },
    followUser() {
      this.$http.post(`/api/follow/${this.userid}/`).then((response) => {
        console.log(response);
      });
    },
    unFollowUser() {
      this.$http.post(`/api/follow/${this.userid}/`).then((response) => {
        console.log(response);
      });
    },
  },
};
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
  font-weight: bolder;
}

.user-email {
  font-size: 16px;
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: grey;
}

.user-bio {
  font-size: 16px;
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: grey;
}

.follow-unfollow-button {
  margin-top: 15px;
}

.user-song-songsheet {
  margin-top: 20px;
}
</style>
