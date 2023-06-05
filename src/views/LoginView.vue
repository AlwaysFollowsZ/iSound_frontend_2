<template>
  <!-- <n-button @click="showLogin = true">登录</n-button> -->
  <n-modal
    :show="showLogin"
    :style="{
      'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)',
    }"
    :block-scroll="false"
  >
    <div class="outer-container">
      <div class="title-container">
        <div style="margin-bottom: 30px">
          <n-grid>
            <n-gi :span="2"></n-gi>
            <n-gi :span="20">
              <div
                class="login-card-title"
                :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }"
              >
                开启独一无二的音乐之旅
              </div>
              <div
                class="login-card-title"
                :style="{
                  color: this.colorMode === 'white' ? 'black' : 'white',
                  'font-size': '25px',
                }"
              >
                登录你的 iSound 账号
              </div>
            </n-gi>
            <n-gi :span="2">
              <div
                class="close-icon"
                style="padding-top: 5px"
                @click="closeLWindow"
                :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }"
              >
                <n-icon size="40"><close-outline /></n-icon>
              </div>
            </n-gi>
          </n-grid>
        </div>
      </div>
      <div class="body-container">
        <div class="body-item">
          <n-grid>
            <n-gi :span="3"></n-gi>
            <n-gi :span="18">
              <n-input
                type="text"
                placeholder="用户名"
                :value="username"
                @input="username = $event"
                :style="{
                  '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                  '--n-color-focus':
                    this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                  '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                  '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                  '--n-border-hover': 'transparent',
                  '--n-border-focus': 'transparent',
                  '--n-placeholder-color':
                    this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                  '--n-border-radius': '5px',
                  '--n-height': '55px',
                  '--n-font-size': '18px',
                  '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                  '--n-box-shadow-focus':
                    '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                }"
                @keyup.enter="this.passwdInputShouldShow = true"
              >
                <template #suffix>
                  <n-icon
                    class="username-forward-icon"
                    size="30"
                    @click="this.passwdInputShouldShow = true"
                    :class="{
                      'animate__animated animate__zoomOut': this.passwdInputShouldShow,
                    }"
                    ><ArrowForwardCircleOutline
                  /></n-icon>
                </template>
              </n-input>
            </n-gi>
            <n-gi :span="3"></n-gi>
          </n-grid>
        </div>
        <div
          class="body-item animate__animated animate__fadeInDown"
          v-if="passwdInputShouldShow"
        >
          <n-grid>
            <n-gi :span="3"></n-gi>
            <n-gi :span="18">
              <n-input
                type="password"
                placeholder="密码"
                :minlength="8"
                :value="password"
                @input="password = $event"
                :style="{
                  '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                  '--n-color-focus':
                    this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                  '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                  '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                  '--n-border-hover': 'transparent',
                  '--n-border-focus': 'transparent',
                  '--n-placeholder-color':
                    this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                  '--n-border-radius': '8px',
                  '--n-height': '55px',
                  '--n-font-size': '18px',
                  '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                  '--n-box-shadow-focus':
                    '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                  '--n-icon-size': '25px',
                }"
                @keyup.enter="login"
              >
                <template #suffix>
                  <n-icon
                    class="username-forward-icon animate__animated animate__zoomIn"
                    size="30"
                    @click="login"
                    style="animation-delay: 1s"
                    :color="
                      this.accentColor === '0,0,0' || this.accentColor === '255,255,255'
                        ? 'grey'
                        : 'rgb(' + this.accentColor + ')'
                    "
                    ><ArrowForwardCircleOutline
                  /></n-icon>
                </template>
              </n-input>
            </n-gi>
            <n-gi :span="3"></n-gi>
          </n-grid>
        </div>
        <div style="height: 75px" v-else></div>
        <div
          class="login-prompt"
          :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }"
        >
          登录 iSound 账号，体验评论、上传、收藏、分享新功能。
        </div>
        <div
          class="login-sub-prompt"
          :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }"
        >
          未注册账号？<span class="login-link" @click="switchToRegister"
            >前往创建你的 iSound 账号
            <div style="display: inline-block; vertical-align: top">
              <n-icon size="20px"><OpenOutline /></n-icon></div
          ></span>
        </div>
        <div
          class="login-sub-prompt"
          :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }"
        >
          忘记密码？<span class="login-link" @click="switch2ResetPasswd"
            >前往重置密码
            <div style="display: inline-block; vertical-align: top">
              <n-icon size="20px"><OpenOutline /></n-icon></div
          ></span>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import { CloseOutline, ArrowForwardCircleOutline, OpenOutline } from "@vicons/ionicons5";
import { mapState } from "vuex";
import "animate.css";
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      passwdInputShouldShow: false,
    };
  },
  computed: {
    ...mapState(["accentColor", "colorMode"]),
  },
  components: {
    CloseOutline,
    ArrowForwardCircleOutline,
    OpenOutline,
  },
  props: {
    showLogin: Boolean,
  },
  methods: {
    closeLWindow() {
      this.$emit("closeLoginWindow");
    },
    switchToRegister() {
      this.$emit("switch2Register");
    },
    switch2ResetPasswd() {
      this.$emit("switch2ResetPasswd");
    },
    changeToLoggedIn() {
      this.$emit("login");
    },
    login() {
      let data = new FormData();
      data.append("username", this.username);
      data.append("password", this.password);
      this.$http.post("/api/accounts/login/", data).then((response) => {
        if (response.data.code == "0") {
          this.$cookies.set("userid", response.data.up.id);
          this.$cookies.set("is_superuser", response.data.up.is_superuser);
          if (response.data.up.is_superuser) {
            this.$router.push("admin");
          }
          this.changeToLoggedIn();
          this.closeLWindow();
        } else if (response.data.code == "-1") {
          alert("登录失败，请重新登录！");
          // this.closeLWindow();
        }
      });
    },
  },
};
</script>

<style scoped>
.close-icon:hover {
  cursor: pointer;
}
.outer-container {
  max-width: 640px;
  height: 470px;
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 25px;
  padding-right: 25px;
}
.username-forward-icon:hover {
  cursor: pointer;
}
.title-container {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 600px;
}
.body-item {
  max-height: 75px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.login-image {
  width: 80%;
}
.n-card__content {
  border-radius: 20px;
}
.login-prompt {
  font-size: 16px;
  text-align: center;
  padding-top: 20px;
}

.login-sub-prompt {
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
}
.login-button-top {
  margin-top: 20px;
}
.login-link {
  color: #0066cc;
}
.login-link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
