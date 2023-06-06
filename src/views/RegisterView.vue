<template>
    <!-- <n-button @click="showLogin = true">登录</n-button> -->
    <n-modal :show="showRegister" :style="{'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)'}" :block-scroll="false"  z-index="2">
        <div class="outer-container">
            <div class="title-container">
                <div style="margin-bottom: 30px;">
                    <n-grid :x-gap="0">
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="register-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">加入我们：携手踏上音乐之旅</div>
                            <div class="register-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white', 'font-size': '25px'}">创建你的 iSound 账号</div>
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
                <div class="body-item">
                    <n-grid>
                        <n-gi :span="3"></n-gi>
                        <n-gi :span="18">
                            <n-input type="text" placeholder="用户名" :value="username" @input="username = $event"
                                :style="{
                                    '--n-text-color-disabled': 'black',
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
                            />
                            <div style="color: grey">用户名将作为你登录网站的账号。</div>
                        </n-gi>
                        <n-gi :span="3"></n-gi>
                    </n-grid>
                </div>
                <div class="body-item" :style="{'margin-bottom': '30px', 'color': this.colorMode === 'white' ? 'black' : 'white'}">
                    <n-grid>
                        <n-gi :span="3"></n-gi>
                        <n-gi :span="18">
                            <n-input v-model="password" type="password" show-password-on="mousedown" placeholder="密码" :minlength="8" :value="password1" @input="password1 = $event"
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
                                    '--n-icon-size': '25px',
                                }"
                            />
                        </n-gi>
                        <n-gi :span="3"></n-gi>
                    </n-grid>
                </div>
                <div class="body-item">
                    <n-grid >
                        <n-gi :span="3"></n-gi>
                        <n-gi :span="18">
                            <n-input v-model="password" type="password" show-password-on="mousedown" placeholder="确认密码" :minlength="8" :value="password2" @input="password2 = $event"
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
                                    '--n-icon-size': '25px',
                                }"
                            />
                        </n-gi>
                        <n-gi :span="3"></n-gi>
                    </n-grid>
                </div>
                        <div style="margin-top: 35px; margin-bottom: 30px">
                            <n-grid class="login-button-top">
                                <n-gi :span="4"></n-gi>
                                <n-gi :span="4" style="display: flex; justify-content: right">
                                    <n-button strong secondary type="success" @click="register" :focusable="false"
                                        :style="{
                                            '--n-color': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#8cbef8' : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-color-hover': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#539df5' : 'rgba(' + this.accentColor + ', 0.45)',
                                            '--n-color-pressed': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#539df5' : 'rgba(' + this.accentColor + ', 0.45)',
                                            '--n-text-color': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-hover': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-pressed': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-border': '1px solid transparent',
                                            '--n-border-hover': '1px solid transparent',
                                            '--n-border-pressed': '1px solid transparent',
                                            '--n-border-radius': '5px',
                                            '--n-width': '80px',
                                            '--n-height': '48px',
                                            '--n-font-size': '18px',
                                        }"
                                    >
                                        注册
                                    </n-button>
                                </n-gi>
                                <n-gi :span="8"></n-gi>
                                <n-gi :span="4" style="display: flex; justify-content: left">
                                    <n-button strong secondary type="Warning" @click="closeRWindow"
                                        :style="{
                                            '--n-color': 
                                                'grey',
                                            '--n-color-hover': 
                                                '#5d5d60',
                                            '--n-color-pressed': 
                                                '#5d5d60',
                                            '--n-text-color': 
                                                'white',
                                            '--n-text-color-hover': 
                                                'white',
                                            '--n-text-color-pressed': 
                                                'white',
                                            '--n-border': '1px solid transparent',
                                            '--n-border-hover': '1px solid transparent',
                                            '--n-border-pressed': '1px solid transparent',
                                            '--n-border-radius': '5px',
                                            '--n-width': '80px',
                                            '--n-height': '48px',
                                            '--n-font-size': '18px',
                                        }"
                                    >
                                        取消
                                    </n-button>
                                </n-gi>
                                <n-gi :span="4"></n-gi>
                            </n-grid>
                        </div>
            </div>
                <div class="login-notice-text" :style="{'color': 'grey'}">
                    注册账号表示你将承诺遵守网站公约，网站承诺保护你的隐私信息。
                </div>
        </div>
    </n-modal>
</template>

<script>
import { CloseOutline, Magnet } from '@vicons/ionicons5'
import { mapState } from 'vuex'
import { message } from "ant-design-vue";
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
            if(this.username == ''){
                this.warning('用户名不得为空');
                return;
            }
            if(this.password1 == ''){
                this.warning('密码不得为空');
                return;
            }
            if(this.password2 == ''){
                this.warning('请确认密码');
                return;
            }
            let data = new FormData();
            data.append('username', this.username);
            data.append('password1', this.password1);
            data.append('password2', this.password2);
            this.$http.post('/api/accounts/register/', data).then(response => {
                // console.log(response.data);
                if(response.data.code == '0') {
                    this.closeRWindow();
                } 
                else if (response.data.code == '-1'){
                    const message = response.data.message;
                    if ('username' in response.data.message) {
                        this.error(message.username[0].replaceAll('。', ' '));
                    }
                    else if ('password2' in response.data.message) {
                        this.error(message.password2[0].replaceAll('。', ' '));
                    }
                    //this.closeRWindow();
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
    setup() {
        return {
            error(msg) {
                message.error({
                    content: msg,
                    duration: 2,
                    style: {
                        "z-index": 101,
                    },
                });
            },
            warning(msg) {
                message.warning({
                    content: msg,
                    duration: 2,
                    style: {
                        "z-index": 101,
                    },
                })
            }
        }
    }
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
    width: 600px;
}
.body-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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