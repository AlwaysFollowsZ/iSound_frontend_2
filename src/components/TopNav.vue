<template>
  <div class="topnav">
    <n-grid x-gap="0">
      <n-gi :span="4">
        <img src="/src/assets/iSound.png" style="padding-left: 10px; height:40px;cursor:pointer" :preview-disabled="true"
          @click="jumpToHome" />
      </n-gi>
      <n-gi :span="7">
      </n-gi>
      <n-gi :span="2">
      </n-gi>
      <n-gi :span="4"></n-gi>
      <n-gi :span="6">
        <n-grid>
          <n-gi :span="3" v-if="!this.isLoggedIn"></n-gi>
          <n-gi :span="15">
            <div style="padding-top: 3%; padding-right: 3%; padding-left: 7%">
              <n-input :style="{
                '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                '--n-color-focus':
                  this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                '--n-border-radius': `10px`,
                '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                border: '1px solid rgb(224, 224, 230)',
                '--n-border-hover': '1px solid ' + 'rgb(' + this.accentColor + ')',
                '--n-border-focus': '1px solid ' + 'rgb(' + this.accentColor + ')',
                '--n-box-shadow-focus':
                  '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
              }" type="text" v-model:value="searchValue" placeholder="歌曲、歌单以及更多内容" @keyup.enter="search" />
            </div>
          </n-gi>
          <n-gi :span="3">
            <div style="padding-top: 20%" class="search-icon-container" :style="{
              color: this.searchIconIsHovered
                ? 'rgba(' + this.accentColor + ', 0.9)'
                : colorMode === 'white' ? 'grey' : 'lightgrey',
              'transition': 'all linear 0.4s'
            }" @mouseover="this.searchIconIsHovered = true" @mouseout="this.searchIconIsHovered = false">
              <n-icon :component="SearchOutline" size="27px" @click="search" />
            </div>
          </n-gi>
          <n-gi :span="3">
            <div class="color-icon-container">
              <n-tooltip :style="{ maxWidth: '270px', maxHeight: '200px' }" placement="bottom-start" trigger="hover"
                @update:show="handleUpdateShow">
                <template #trigger>
                  <div :style="{
                    'color': 'rgba(' + this.accentColor + ')',
                    'transition': 'all linear 0.3s'
                  }">
                    <n-icon size="27px" v-if="this.colorMode === 'white'"
                      @click="changeColorMode"><moon-outline /></n-icon>
                    <n-icon size="27px" v-else @click="changeColorMode"><sunny-outline /></n-icon>
                  </div>
                </template>
                <template #default>
                  <div>
                    <span class="choose-color-default" @click="
                      this.setAccentColor(
                        this.colorMode === 'white' ? '0,0,0' : '255,255,255'
                      )
                      ">
                      默认
                    </span>
                    <span style="max-width: 200px" v-for="(c, idx) in accentColorChoices" :key="idx">
                      <button class="round-button" :style="{
                        'background-color': 'rgb(' + c + ')',
                        border: '1px solid rgb(' + c + ')',
                      }" @click="this.setAccentColor(c)"></button>
                      <!-- < :style="{'--n-color': }" @click="this.setAccentColor(c); console.log(c)"/> -->
                    </span>
                    <div style="margin-top: 3%">
                      <n-grid>
                        <n-gi :span="14">开启多彩背景色变换</n-gi>
                        <n-gi :span="5"></n-gi>
                        <n-gi :span="5">
                          <n-switch :rail-style="railStyle" v-model:value="multiColorShouldDisplay"
                            @update:value="handleMultiColorChange" :style="{ '--n-rail-color': 'grey' }" />
                        </n-gi>
                      </n-grid>
                    </div>
                  </div>
                </template>
              </n-tooltip>
            </div>
          </n-gi>

          <n-gi :span="3" v-if="this.isLoggedIn">
            <div style="padding-top: 20%">
              <n-badge dot :offset="[-2.5, 7.5]" :show="showMessage">
                <n-icon @mouseenter="mailIconIsHovered = true" @mouseleave="mailIconIsHovered = false" :style="{
                  'transition': 'all linear 0.4s'
                }" class="mail-icon" :component="MailOutline" size="27px" @click="readMessage"
                  :color="mailIconIsHovered ? `rgb(${accentColor},0.9)` : colorMode === 'white' ? 'grey' : 'lightgrey'" />
              </n-badge>
            </div>
          </n-gi>
        </n-grid>
      </n-gi>
      <n-gi :span="1">
        <n-dropdown v-if="isLoggedIn" trigger="hover" :options="options">
          <n-avatar v-if="isLoggedIn" class="user-avatar" @click="jumpToUserView" @mouseover="renderDropDown"
            :src="this.avatarFile" size="large"></n-avatar>
          <n-avatar v-else src="/api/media/default/visitor-avatar.png" size="large"></n-avatar>
        </n-dropdown>
        <n-tooltip v-else placement="bottom-start" trigger="hover">
          <template #trigger>
            <n-avatar class="user-avatar" src="/api/media/default/visitor-avatar.png" size="large"></n-avatar>
          </template>
          已有账号？请<a style="color: cornflowerblue" @click="showLogin = true">登录</a>；未注册账号？请<a style="color: cornflowerblue"
            @click="showRegister = true">注册</a>。
        </n-tooltip>
      </n-gi>
    </n-grid>
  </div>
  <login-view :showLogin="showLogin" @closeLoginWindow="showLogin = false" @switch2Register="
    showLogin = false;
  showRegister = true;
  " @switch2ResetPasswd="
  showLogin = false;
showResetPasswd = true;
" @login="toLogIn"></login-view>
  <register-view :showRegister="showRegister" @closeRegisterWindow="showRegister = false"></register-view>
  <reset-passwd-view :showResetPasswd="showResetPasswd"
    @closeResetPasswdWindow="showResetPasswd = false"></reset-passwd-view>
  <modify-user-message-view :showModifyUserMessage="showModifyUserMessage"
    @closeModifyWindow="showModifyUserMessage = false"></modify-user-message-view>
  <change-passwd-view v-if="isLoggedIn" :showChangePasswd="showChangePasswd"
    @closeChangePasswdWindow="showChangePasswd = false"></change-passwd-view>
</template>

<script>
import { SearchOutline, MailOutline, SunnyOutline, MoonOutline } from "@vicons/ionicons5";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ResetPasswdView from "../views/ResetPasswdView.vue";
import ChangePasswdView from "../views/ChangePasswdView.vue";
import { mapState, mapMutations } from "vuex";
import ModifyUserMessageView from "../views/ModifyUserMessageView.vue";
import { changeColorMode } from "/src/colorMode";
import 'animate.css'
export default {
  name: "TopNav",
  components: {
    SearchOutline,
    LoginView,
    RegisterView,
    ResetPasswdView,
    ChangePasswdView,
    MailOutline,
    SunnyOutline,
    MoonOutline,
    ModifyUserMessageView,
  },
  computed: {
    ...mapState(["isLoggedIn", "accentColor", "colorMode"]),
  },
  mounted() {
    this.setLogState(this.$cookies.isKey("userid"));
    if (this.isLoggedIn) {
      // console.log(this.isLoggedIn)
      this.fetchData();
    }
  },
  created() {
    this.$EventBus.on("setShowMessage", (unread) => {
      if (unread == 0) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
    });
    this.$EventBus.on("showLoginModal", () => {
      this.showLogin = true;
    });
    this.$EventBus.on('refresh', () => {
      this.fetchData()
    })
  },
  data() {
    return {
      accentColorChoices: [
        "0,122,255", // 蓝色
        "150,62,150", // 紫色
        "248,79,158", // 粉色
        "224,56,61", // 红色
        "246,130,27", // 橙色
        "255,200,37", // 黄色
        "98,186,70", // 绿色
        "152,152,152", // 灰色
      ],
      showModifyUserMessage: false,
      searchValue: "",
      showLogin: false,
      showRegister: false,
      showResetPasswd: false,
      showChangePasswd: false,
      searchIconIsHovered: false,
      mailIconIsHovered: false,
      backToHomeIsHovered: false,
      multiColorShouldDisplay: false, // 多彩背景变换，要求必须默认 false
      SearchOutline,
      MailOutline,
      showMessage: false,
      avatarFile: null, // 得改！！！
      options: [
        {
          label: "个人主页",
          props: {
            onClick: () => {
              if (this.$route.name !== 'UserView') {
                this.$emit('exit')
                setTimeout(() => {
                  this.$router.push("/home");
                  console.log("user page");
                }, 900)
              }
            },
          },
        },
        {
          label: "历史记录",
          props: {
            onClick: () => {
              if (this.$route.name !== 'HistoryView') {
                this.$emit('exit')
                setTimeout(() => {
                  this.$router.push("/history");
                  console.log("history");
                }, 900)
              }

            },
          },
        },
        {
          label: "修改密码",
          props: {
            onClick: () => {
              this.showChangePasswd = true;
              console.log("修改密码页面");
            },
          },
        },
        {
          label: "登出",
          props: {
            onClick: () => {
              this.setLogState(false);
              this.$http.post("/api/accounts/logout/");
              this.$cookies.remove("userid");
              this.$cookies.remove("is_superuser");
              this.$emit('exit')
              setTimeout(() => {
                this.$router.push("/");
              })

            },
          },
        },
      ],
    };
  },
  setup() {
    return {
      railStyle: ({ focused, checked }) => {
        const style = {};
        if (checked) {
          style.background = "#fff";
          if (focused) {
            style.boxShadow = "0 0 0 2px #fff";
          }
        } else {
          style.background = "grey";
          if (focused) {
            style.boxShadow = "0 0 0 2px grey";
          }
        }
        return style;
      },
    };
  },
  methods: {
    ...mapMutations(["setLogState", "setAccentColor", "setMultiColor"]),
    search() {
      if (this.searchValue.trim().length !== 0) {
        // console.log(`searchValue: ${this.searchValue}`)
        // jump to search page
        if (this.$route.name !== 'searchresult') {
          this.$emit('exit')
          setTimeout(() => {
            this.$router.push("/searchresult/" + this.searchValue);
            this.searchValue = "";
          }, 900)
        }
        else {
          this.$router.push("/searchresult/" + this.searchValue);
          this.searchValue = "";
        }
        // console.log('hhh')
        // this.$router.replace('/')
        // this.$router.replace('/searchresult/' + this.searchValue, () => {

        // });

        // window.location.reload()
      }
    },
    fetchData() {
      if (this.$cookies.isKey('userid')) {
        this.$http.get("/api/message/of/0/").then((response) => {
          if (response.data.unread == 0) {
            this.showMessage = false;
          } else {
            this.showMessage = true;
          }
        });
        this.$http
          .get("/api/accounts/detail/0/")
          .then((response) => {
            this.avatarFile = response.data.avatar;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    toLogIn() {
      this.setLogState(true);
      this.fetchData();
      console.log("hello");
    },
    readMessage() {
      this.showModifyUserMessage = true;
    },
    changeColorMode,
    handleMultiColorChange() {
      this.setMultiColor(this.multiColorShouldDisplay);
    },
    renderDropDown() {
      setTimeout(() => {
        let menuarr = document.getElementsByClassName("n-dropdown-menu");
        if (menuarr.length > 0) {
          let menu = menuarr[0];
          menu.style.setProperty(
            "--n-color",
            this.colorMode === "white" ? "white" : "rgb(72,72,72)"
          );
          menu.style.setProperty(
            "--n-option-text-color",
            "rgb(" + this.accentColor + ")"
          );
          menu.style.transition = "color 1s";
          console.log("color: " + this.accentColor);
        }
        // console.log(menu.length)
      }, 120);
    },
    jumpToUserView() {
      if (this.$route.name !== 'UserView') {
        this.$emit('exit')
        setTimeout(() => {
          this.$router.push('/home')
        }, 1100)
      }
    },
    jumpToHome() {
      if (this.$route.name !== 'home') {
        this.$emit('exit')
        setTimeout(() => {
          this.$router.push('/')
        }, 900)
      }
    },
  },
};
</script>

<style>
.topnav {
  padding-top: 7px;
  padding-bottom: 7px;
  min-width: 1400px;
  position: sticky;
  top: 0;
  background: rgba(var(--background-color),0.9);
  z-index: 1;
  transition:all linear 1s;
  /*border: dashed;*/
}

.router-link-active {
  text-decoration: none;
  /* 去除 router-link 中文字的下划线 */
}

.isound-style {
  display: inline;
  vertical-align: text-bottom;
  color: black;
  font-weight: bold;
  /* font-style: italic; */
  font-size: 35px;
  padding-left: 5%;
}

.search-icon-container:hover {
  cursor: pointer;
}

.color-icon-container {
  opacity: 0.5;
  padding-top: 20%;
  transition: all linear 0.3s
}

.color-icon-container:hover {
  opacity: 1;
  cursor: pointer;
}

.color-btn {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.round-button {
  margin-left: 4px;
  margin-right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  line-height: 16px;
  cursor: pointer;
}

.choose-color-default {
  vertical-align: bottom;
  display: inline-block;
  padding-right: 3px;
  color: cornflowerblue;
}

.choose-color-default:hover {
  cursor: pointer;
}

.back-to-home {
  font-size: 30px;
  font-weight: 400;
  padding-top: 8%;
}

.back-to-home:hover {
  cursor: pointer;
}

.user-avatar {
  border-radius: 10px;
  cursor: pointer;
  transition: all linear 0.5s;
}

.user-avatar:hover {
  opacity: 0.7;
  transform: scale(1.03);
  transition: all linear 0.3s;
}

.mail-icon:hover {
  cursor: pointer;
}

.n-dropdown-option {
  transition: all linear 0.5s;
}

.n-dropdown-option:hover {
  background: rgba(var(--theme-color), 0.8);
  transition: all linear 0.3s;
}
</style>
