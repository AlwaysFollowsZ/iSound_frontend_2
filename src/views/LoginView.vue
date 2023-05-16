<template>
    <!-- <n-button @click="showLogin = true">登录</n-button> -->
    <n-modal :show="showLogin">
        <div>
            <n-card :style="{'width': `600px`, '--n-border-radius': `20px`}" :bordered="false"  role="dialog" aria-modal="true">
                <template #header>
                    <div>
                        <n-grid :x-gap="12">
                            <n-gi :span="2"></n-gi>
                            <n-gi :span="20">
                                <h3 class="login-card-title">欢迎回到 iSound，请先完成登录！</h3>
                            </n-gi>
                            <n-gi :span="2">
                                <div style="padding-top: 30%" @click="closeLWindow">
                                    <close-outline/>
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
                        <span>用户名</span>
                        <n-input type="text" placeholder="请输入用户名" :value="username" @input="username = $event" clearable />
                        <span>密码</span>
                        <n-input type="password" show-password-on="mousedown" placeholder="请输入密码" :minlength="8" :value="password" @input="password = $event"/>
                        <n-grid class="login-button-top" x-gap="6" :cols="2">
                            <n-gi>
                                <n-button strong secondary type="success" @click="login">
                                    登录
                                </n-button>
                            </n-gi>
                            <n-gi>
                                <n-button strong secondary type="Warning" @click="switchToRegister">
                                    注册
                                </n-button>
                            </n-gi>
                        </n-grid>
                    </n-gi>
                </n-grid>
                <div class="login-notice-text">
                    注册账号并登录表示用户承诺遵守网站公约，同时网站承诺将保护用户隐私信息。
                </div>
            </n-card>
        </div>
        
    </n-modal>
</template>

<script>
import { CloseOutline } from '@vicons/ionicons5'
export default{
    name: "LoginView",
    data() {
        return {
            username: '',
            password: ''
        };
    },
    components: {
        CloseOutline,
    },
    props: {
        showLogin: Boolean,
    },
    methods: {
        closeLWindow() {
            this.$emit('closeLoginWindow')
        },
        switchToRegister() {
            this.$emit('switch')
        },
        login() {
            let data = new FormData();
            data.append('username', this.username);
            data.append('password', this.password);
            this.$http.post('/accounts/login/', data).then(response => {
                if(response.data.code == '0') {
                    console.log(response);
                    this.closeLWindow();
                } else if (response.data.code == '-1') {
                    alert('登录失败，请重新登录！');
                    this.closeLWindow();
                }
            }); 
        }
    }
    
}
</script>

<style>
.login-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}
.login-image {
    width: 80%;
}
.n-card__content {
    border-radius: 20px;
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
</style>