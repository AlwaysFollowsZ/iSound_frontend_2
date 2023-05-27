<template>
    <!-- <n-button @click="showLogin = true">登录</n-button> -->
    <n-modal :show="showRegister" class="round-corner" :style="{'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)'}">
        <div class="outer-container">
            <div class="title-container">
                <div style="margin-bottom: 30px;">
                    <n-grid :x-gap="0">
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="register-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">加入我们：一起建设iSound</div>
                        </n-gi>
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="closeRWindow" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                <n-icon size="40"><close-outline/></n-icon>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <div class="body-container">
                <n-grid x-gap="0">
                    <n-gi :span="9">
                        <img class="login-image"
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    </n-gi>
                    <n-gi :span="15">
                        <div class="body-item">
                            <n-grid :x-gap="12">
                                <n-gi :span="6">
                                    <div class="body-item-prompt" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                        用户名
                                    </div>
                                </n-gi>
                                <n-gi :span="16">
                                    <n-input type="text" placeholder="请输入用户名" :value="username" @input="username = $event" clearable 
                                        :style="{
                                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                            '--n-border-radius': '8px',
                                        }"
                                    />
                                </n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                            <n-grid :x-gap="12">
                                <n-gi :span="6">
                                    <div class="body-item-prompt">
                                        密码
                                    </div>
                                </n-gi>
                                <n-gi :span="16">
                                    <n-input v-model="password" type="password" show-password-on="mousedown" placeholder="请输入密码" :minlength="8" :value="password1" @input="password1 = $event"
                                        :style="{
                                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                            '--n-border-radius': '8px',
                                        }"
                                    />
                                </n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid :x-gap="12">
                                <n-gi :span="6">
                                    <div class="body-item-prompt" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                        确认密码
                                    </div>
                                </n-gi>
                                <n-gi :span="16">
                                    <n-input v-model="password" type="password" show-password-on="mousedown" placeholder="请再次输入密码" :minlength="8" :value="password2" @input="password2 = $event"
                                        :style="{
                                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                            '--n-border-radius': '8px',
                                        }"
                                    />
                                </n-gi>
                            </n-grid>
                        </div>
                        <div class="">
                            <n-grid class="login-button-top" x-gap="6">
                                <n-gi :span="7"></n-gi>
                                <n-gi :span="7">
                                    <n-button strong secondary type="success" @click="register" :style="{'--n-border-radius': '6px'}">
                                        注册
                                    </n-button>
                                </n-gi>
                                <n-gi :span="7">
                                    <n-button strong secondary type="Warning" @click="closeRWindow" :style="{'--n-border-radius': '6px'}">
                                        取消
                                    </n-button>
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <!-- <span style="font-size: 18px; font-weight: 500">用户名 </span>
                        <n-input type="text" placeholder="请输入用户名" :value="username" @input="username = $event" clearable />
                        <span style="font-size: 18px; font-weight: 500">密码</span>
                        <n-input v-model="password" type="password" show-password-on="mousedown" placeholder="请输入密码" :minlength="8" :value="password1" @input="password1 = $event"/>
                        <span style="font-size: 18px; font-weight: 500">确认密码</span>
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
                        </n-grid> -->
                    </n-gi>
                </n-grid>
            </div>
                <div class="login-notice-text" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                    注册账号表示您将承诺遵守网站公约，网站承诺保护您的隐私信息。
                </div>
        </div>
    </n-modal>
</template>

<script>
import { CloseOutline } from '@vicons/ionicons5'
import { mapState } from 'vuex'
export default {
    name: "RegisterView",
    components: {
        CloseOutline,
    },
    computed: {
        ...mapState(['accentColor', 'colorMode']),
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
            this.$http.post('/api/accounts/register/', data).then(response => {
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

<style scoped>
.close-icon:hover {
    cursor: pointer;
}
.outer-container {
    max-width: 640px; 
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
    margin-bottom: 25px;
}
.body-item-prompt {
    padding-top: 3px;
    text-align: right;
    font-size: 16px;
    font-weight: 400;
}
.register-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
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