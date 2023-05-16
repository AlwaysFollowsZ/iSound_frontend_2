<template>
    <!-- <n-button @click="showLogin = true">登录</n-button> -->
    <n-modal :show="showRegister" class="round-corner">
        <div>
            <n-card :style="{ 'width': `600px`, '--n-border-radius': `20px` }" :bordered="false" role="dialog"
                aria-modal="true">
                <template #header>
                    <div>
                        <n-grid :x-gap="12">
                            <n-gi :span="2"></n-gi>
                            <n-gi :span="20">
                                <h3 class="register-card-title">欢迎来到 iSound，请先完成注册！</h3>
                            </n-gi>
                            <n-gi :span="2">
                                <div style="padding-top: 30%" @click="closeRWindow">
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
                        <span>用户名</span>
                        <n-input type="text" placeholder="请输入用户名" :value="username" @input="username = $event" clearable />
                        <span>密码</span>
                        <n-input v-model="password" type="password" show-password-on="mousedown" placeholder="请输入密码" :minlength="8" :value="password1" @input="password1 = $event"/>
                        <span>再次输入密码</span>
                        <n-input v-model="password" type="password" show-password-on="mousedown" placeholder="请再次输入密码" :minlength="8" :value="password2" @input="password2 = $event"/>
                        <n-grid class="login-button-top" x-gap="6" :cols="2">
                            <n-gi>
                                <n-button strong secondary type="success" @click="register">
                                    注册
                                </n-button>
                            </n-gi>
                            <n-gi>
                                <n-button strong secondary type="Warning" @click="closeRWindow">
                                    取消
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
export default {
    name: "LoginView",
    components: {
        CloseOutline,
    },
    props: {
        showRegister: Boolean,
    },
    methods: {
        closeRWindow() {
            this.$emit('closeRegisterWindow')
        },
        register() {
            let data = new FormData();
            data.append('username', this.username);
            data.append('password1', this.password1);
            data.append('password2', this.password2);
            this.$http.post('/accounts/register/', data).then(response => {
                // console.log(response.data);
                if(response.data.code == '0') {
                    alert('注册成功，请登录！');
                    this.closeRWindow();
                } else if (response.data.code == '-1'){
                    alert('注册失败，请重新注册！');
                    this.closeRWindow();
                }
            });
        },
    },
    data() {
        return {
            username: '',
            password1: '',
            password2: ''
        };
    },
}
</script>

<style>
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
</style>