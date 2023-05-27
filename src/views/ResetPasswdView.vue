<template>
    <n-modal :show="showResetPasswd" :style="{'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)'}">
        <div class="outer-container">
            <div class="title-container">
                <div style="margin-bottom: 30px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="reset-passwd-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">请确认你的账号已绑定邮箱</div>
                            <div class="reset-passwd-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white', 'font-size': '25px'}">重置密码</div>
                        </n-gi>
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="closeResetWindow" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                <n-icon size="40"><close-outline/></n-icon>
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
                            <n-input type="text" placeholder="用户名" :value="username" @input="username = $event"
                                :style="{
                                    '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                    '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                    '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                    '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                    '--n-border-hover': 'transparent',
                                    '--n-border-focus': 'transparent',
                                    '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                    '--n-border-radius': '5px',
                                    '--n-height': '55px',
                                    '--n-font-size': '18px',
                                    '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                    '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                }"
                                @keyup.enter="this.emailInputShouldShow = true"
                            >
                                <template #suffix>
                                    <n-icon 
                                    class="username-forward-icon" 
                                    size="30" 
                                    @click="this.emailInputShouldShow = true"
                                    :class="{'animate__animated animate__zoomOut': this.emailInputShouldShow}"
                                    ><ArrowForwardCircleOutline/></n-icon>
                                </template>
                            </n-input>
                        </n-gi>
                        <n-gi :span="3"></n-gi>
                    </n-grid>
                </div>
                <div class="body-item animate__animated animate__fadeInDown" v-if="emailInputShouldShow">
                    <n-grid>
                        <n-gi :span="3"></n-gi>
                        <n-gi :span="18">
                            <n-input type="text" placeholder="邮箱" :value="email" @input="email = $event"
                                :style="{
                                    '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                    '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                    '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                    '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                    '--n-border-hover': 'transparent',
                                    '--n-border-focus': 'transparent',
                                    '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                    '--n-border-radius': '8px',
                                    '--n-height': '55px',
                                    '--n-font-size': '18px',
                                    '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                    '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                    '--n-icon-size': '25px'
                                }"
                                @keyup.enter="handleReset"
                            >
                                <template #suffix>
                                    <n-icon 
                                        class="username-forward-icon animate__animated animate__zoomIn" 
                                        size="30" 
                                        @click="handleReset"
                                        style="animation-delay: 1s"
                                        :color="(this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 'grey' : 'rgb(' + this.accentColor + ')'"
                                        ><ArrowForwardCircleOutline/></n-icon>
                                </template>
                            </n-input>
                        </n-gi>
                        <n-gi :span="3"></n-gi>
                    </n-grid>
                </div><div style="height: 75px" v-else></div>
            </div>
            <div class="reset-passwd-prompt" >
                通过邮箱验证后，重置的密码将发送到你的邮箱。
            </div>
            <div class="reset-passwd-sub-prompt" >
                登录后，你可以在头像的下拉菜单中修改密码。
            </div>
        </div>
        
            <!-- <n-card :style="{ 'width': `600px`, '--n-border-radius': `20px` }" :bordered="false" role="dialog"
                aria-modal="true">
                <template #header>
                    <div>
                        <n-grid :x-gap="12">
                            <n-gi :span="2"></n-gi>
                            <n-gi :span="20">
                                <h3 class="register-card-title">找回密码</h3>
                            </n-gi>
                            <n-gi :span="2">
                                <div style="padding-top: 30%" @click="closeResetWindow">
                                    <close-outline />
                                </div>
                            </n-gi>
                        </n-grid>
                    </div>
                </template>
                <n-grid x-gap="12" :cols="2">
                    <n-gi>
                        <img class="login-image"
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    </n-gi>
                    <n-gi>
                        <div class="input-detail-container">
                            <span>用户名</span>
                            <n-input type="text" placeholder="请输入用户名" :value="username" @input="username = $event"
                                clearable />
                            <span>邮箱</span>
                            <n-input type="text" placeholder="请输入绑定邮箱" :value="email" @input="email = $event" clearable />
                            <n-grid class="login-button-top" x-gap="6" :cols="2">
                                <n-gi>
                                    <n-button strong secondary type="success" @click="handleReset">
                                        找回
                                    </n-button>
                                </n-gi>
                                <n-gi>
                                    <n-button strong secondary type="Warning" @click="closeResetWindow">
                                        取消
                                    </n-button>
                                </n-gi>
                            </n-grid>
                        </div>
                    </n-gi>
                </n-grid>
                <div class="login-notice-text">
                    如果您的账号没有绑定邮箱，就无法进行找回密码操作。
                </div>
            </n-card> -->
    </n-modal>
</template>

<script>
import { CloseOutline, ArrowForwardCircleOutline } from '@vicons/ionicons5'
import { mapState } from 'vuex'
import 'animate.css'
export default {
    name: "ResetPasswdView",
    components: {
        CloseOutline,
        ArrowForwardCircleOutline,
    },
    computed: {
        ...mapState(['accentColor', 'colorMode']),
    },
    data() {
        return {
            username: '',
            email: '',
            emailInputShouldShow: false,
        };
    },
    props: {
        showResetPasswd: Boolean,
    },
    methods: {
        closeResetWindow() {
            this.$emit('closeResetPasswdWindow');
        },
        handleReset() {
            let data = new FormData();
            data.append('username', this.username);
            data.append('email', this.email);
            this.$http.post('/api/accounts/password_reset/', data).then(response => {
                if(response.data.code == '0') {
                    alert('重置密码已发送至您的邮箱，请注意查收。')
                    this.closeResetWindow();
                } else if (response.data.code == '-1') {
                    alert('找回错误，请重新尝试');
                    this.closeResetWindow();
                }
            }); 
        }
    },
}
</script>

<style scoped>
.close-icon:hover {
    cursor: pointer;
  }
  .outer-container {
    max-width: 640px; 
    height: 440px;
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
  .reset-passwd-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
  }
.register-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}

.login-image {
    width: 80%;
}

.login-notice-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.login-button-top {
    margin-top: 20px;
}
.reset-passwd-prompt {
    font-size: 18px;
    text-align: center;
    padding-top: 20px;
    color: #0066cc;
  }
  
  .reset-passwd-sub-prompt {
    font-size: 16px;
    text-align: center;
    padding-top: 20px;
    color: #0066cc;
  }
</style>