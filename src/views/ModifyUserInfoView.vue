<template>
  <n-modal :show="showModifyUserInfo" :style="{
    'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)',
  }" :block-scroll="false">
    <div class="outer-container">
      <div class="title-container" style="min-width: 790px;">
        <div style="margin-bottom: 30px">
          <n-grid>
            <n-gi :span="2"></n-gi>
            <n-gi :span="20">
              <div class="modify-card-title" :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }"
                @click="console.log('this.username ' + this.username)">
                编辑个人信息
              </div>
            </n-gi>
            <!-- <n-gi :span="1"></n-gi> -->
            <n-gi :span="2">
              <div class="close-icon" style="padding-top: 5px" @click="closeMWindow()"
                :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }">
                <n-icon size="40"><close-outline /></n-icon>
              </div>
            </n-gi>
          </n-grid>
        </div>
      </div>
      <div class="body-container" style="min-width: 790px;">
        <n-grid>
          <n-gi :span="10">
            <div class="avatar">
              <n-popover trigger="hover" raw>
                <template #trigger>
                  <span>
                    <img :src="avatarUrl" @click="uploadFile" />
                    <input type="file" ref="fileInput" style="display: none" accept="image/*"
                      @change="handleFileChange" />
                  </span>
                </template>
                <div class="avatar-prompt" :style="{
                  'font-weight':'600',
                  'margin':'5px 20px',
                  'display':'flex',
                  'justify-content':'center',
                  'align-items':'center',
                  'height':'30px',
                  'color': `rgb(${this.accentColor},0.7)`,
                  'background-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                }">
                  <span>点击以更换头像</span>
                </div>
              </n-popover>
            </div>

          </n-gi>
          <n-gi :span="14">
            <div class="body-item">
              <n-grid>
                <n-gi :span="3"></n-gi>
                <n-gi :span="18">
                  <div class="body-item-title">用户名</div>
                  <n-input type="text" size="small" :placeholder="username" :value="username" @input="username = $event"
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
                      '--n-height': '50px',
                      '--n-font-size': '18px',
                      '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                      '--n-box-shadow-focus':
                        '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                    }" />
                </n-gi>
                <n-gi :span="3"></n-gi>
              </n-grid>
            </div>
            <div class="body-item">
              <n-grid>
                <n-gi :span="3"></n-gi>
                <n-gi :span="18">
                  <div class="body-item-title">邮箱</div>
                  <n-input type="text" :placeholder="email" :value="email" @input="email = $event" :style="{
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
                    '--n-height': '50px',
                    '--n-font-size': '18px',
                    '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                    '--n-box-shadow-focus':
                      '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                  }" />
                </n-gi>
                <n-gi :span="3"></n-gi>
              </n-grid>
            </div>
            <div class="body-item">
              <n-grid>
                <n-gi :span="3"></n-gi>
                <n-gi :span="18">
                  <div class="body-item-title">历史记录条数</div>
                  <n-input type="text" :placeholder="recordNum" :value="recordNum" @input="recordNum = $event" :style="{
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
                    '--n-height': '50px',
                    '--n-font-size': '18px',
                    '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                    '--n-box-shadow-focus':
                      '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                  }" />
                </n-gi>
                <n-gi :span="3"></n-gi>
              </n-grid>
            </div>
            <div class="body-item">
              <n-grid>
                <n-gi :span="3"></n-gi>
                <n-gi :span="18">
                  <div class="body-item-title">个性签名</div>
                  <n-input type="textarea" size="small" :placeholder="bio" :value="bio" @input="bio = $event" :style="{
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
                    '--n-font-size': '18px',
                    '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                    '--n-box-shadow-focus':
                      '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                  }" :resizable="false" />
                </n-gi>
                <n-gi :span="3"></n-gi>
              </n-grid>
            </div>
          </n-gi>
        </n-grid>
      </div>
      <div style="margin-top: 20px; margin-bottom: 25px; min-width: 790px;">
        <n-grid class="login-button-top">
          <n-gi :span="4"></n-gi>
          <n-gi :span="4" style="display: flex; justify-content: right">
            <n-button strong secondary type="success" @click="
              submitModify();
            //closeMWindow();
            " :focusable="false" :style="{
              '--n-color': 'rgba(' + this.accentColor + ', 0.25)',
              '--n-color-hover': 'rgba(' + this.accentColor + ', 0.45)',
              '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.45)',
              '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
              '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
              '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
              '--n-border': '1px solid transparent',
              '--n-border-hover': '1px solid transparent',
              '--n-border-pressed': '1px solid transparent',
              '--n-border-radius': '5px',
              '--n-width': '64px',
              '--n-height': '39px',
              '--n-font-size': '18px',
}">
              完成
            </n-button>
          </n-gi>
          <n-gi :span="8"></n-gi>
          <n-gi :span="4" style="display: flex; justify-content: left">
            <n-button strong secondary type="Warning" @click="closeMWindow()" :style="{
              '--n-color': 'grey',
              '--n-color-hover': '#5d5d60',
              '--n-color-pressed': '#5d5d60',
              '--n-text-color': 'white',
              '--n-text-color-hover': 'white',
              '--n-text-color-pressed': 'white',
              '--n-border': '1px solid transparent',
              '--n-border-hover': '1px solid transparent',
              '--n-border-pressed': '1px solid transparent',
              '--n-border-radius': '5px',
              '--n-width': '64px',
              '--n-height': '39px',
              '--n-font-size': '18px',
            }">
              取消
            </n-button>
          </n-gi>
          <n-gi :span="4"></n-gi>
        </n-grid>
      </div>
    </div>
  </n-modal>
</template>
<script>
import { CloseOutline } from "@vicons/ionicons5";
import { mapState } from "vuex";
import { NPopover } from "naive-ui";
import { globalThemeColor, getFontColorString, getRGBString } from '/src/colorMode.js'
import { message } from "ant-design-vue";
export default {
  name: "ModifyUserInfo",
  data() {
    return {
      username: "",
      email: "",
      recordNum: "",
      bio: "",
      avatarFile: null,
      avatarUrl: "",
      tmpUsername: "",
      tmpEmail: "",
      tmpRecordNum: "",
      tmpBio: "",
      tmpAvatarUrl: "",
    };
  },
  computed: {
    ...mapState(["accentColor", "colorMode"]),
  },
  // created() {
  //   this.fetchData();
  // },
  mounted() {
    this.fetchData();
  },
  components: {
    CloseOutline, NPopover
  },
  props: {
    showModifyUserInfo: Boolean,
  },
  setup() {
    return {
      error(msg) {
        message.error({
          content: msg,
          duration: 200,
          class: 'helloaaa',
          style: {
            "z-index": 101,
          },
        });
      },
      warning(msg) {
        message.warning({
          content: msg,
          duration: 2,
          class: 'helloaaa',
          style: {
            "z-index": 101,

          },
        })
      }
    }
  },
  methods: {
    fetchData() {
      this.$http
        .get("/api/accounts/detail/0/")
        .then((response) => {
          this.username = response.data.username;
          this.email = response.data.email;
          this.recordNum = response.data.record_num;
          this.bio = response.data.profile;
          this.avatarFile = response.data.avatar;
          this.avatarUrl = response.data.avatar;
          this.tmpUsername = this.username + ''
          this.tmpEmail = this.email + ''
          this.tmpRecordNum = this.recordNum + ''
          this.tmpBio = this.bio + ''
          this.tmpAvatarUrl = this.avatarUrl + ''
        })
        .catch((error) => {
          console.error(error);
        });
    },
    closeMWindow() {
      this.username = this.tmpUsername
      this.email = this.tmpEmail
      this.recordNum = this.tmpRecordNum
      this.bio = this.tmpBio
      this.avatarUrl = this.tmpAvatarUrl
      this.$emit("closeModifyWindow");
      // location.reload(); // 可以自动刷新一下，但是会抖动一下，观看效果不太好。
    },
    uploadFile() {
      this.$refs.fileInput.click();
    },
    handleFileChange(e) {
      this.avatarFile = e.target.files[0];
      // 更新 avatarUrl 属性，即时更换图片
      this.avatarUrl = URL.createObjectURL(this.avatarFile);
      // let formData = new FormData();
      // formData.append('avatar', file);

      // 发送文件到后端
      // this.uploadFormData(formData);
    },
    submitModify() {
      if (this.username == '') {
        this.warning('用户名不得为空');
        return;
      }
      if (this.email == '') {
        this.warning('邮箱不得为空');
        return;
      }
      let data = new FormData();
      data.append("username", this.username);
      data.append("email", this.email);
      data.append("record_num", this.recordNum);
      data.append("profile", this.bio);
      data.append("avatar", this.avatarFile);
      this.$http.post("/api/accounts/update/", data).then((response) => {
        if (response.data.code === "0") {
          this.$EventBus.emit("updateInfo");
          this.$emit("closeModifyWindow");
          this.$EventBus.emit('refresh')
          // alert('修改成功!')
        } else if (response.data.code === "-1") {
          const message = response.data.message;
          if ('username' in response.data.message) {
            this.error(message.username[0].replaceAll('。', ' '));
          }
          else if ('email' in response.data.message) {
            this.error(message.email[0].replaceAll('。', ' '));
          }
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

.helloaaa.ant-message-notice-content {
  border-radius: 20px !important;
}

.outer-container {
  width: 800px;
  min-width: 790px;
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 25px;
  padding-right: 25px;
}

.title-container {
  margin-top: 10px;
  margin-bottom: 10px;
}

.body-item {
  max-width: 500px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.body-item-title {
  color: grey;
}

.modify-card-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}

.modify-title {
  font-size: larger;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  padding-top: 40px;
}

.avatar img {
  transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
}

.avatar img:hover {
  cursor: pointer;
  box-shadow: 0 0 0 10px var(--my-color);
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
}

.avatar-prompt {
  text-align: center;
}

.avatar img {
  width: 256px;
  height: 256px;
  border-radius: 50%;
}

.modify-notice-text {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.modify-button-position {
  margin-top: 20px;
}

.modify-button-top {
  margin-top: 20px;
}
</style>
