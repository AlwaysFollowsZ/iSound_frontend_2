<template>
    <n-modal z-index="2" :show="showChangePasswd" :style="{
        'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)',
    }" :block-scroll="false">
        <div class="outer-container">
            <div class="title-container">
                <div style="margin-bottom: 30px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="modify-card-title"
                                :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }">
                                修改密码
                            </div>
                        </n-gi>
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="closeCWindow()"
                                :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }">
                                <n-icon size="40"><close-outline /></n-icon>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <div class="body-container">
                <n-grid>
                    <n-gi :span="10">
                        <div class="avatar">
                            <img class="user-avatar-image" :src="avatarFile" />
                            <!-- <div class="avatar-prompt" :style="{ color: this.colorMode === 'white' ? 'black' : 'white' }">
                                点击以更换头像
                            </div> -->
                        </div>
                    </n-gi>
                    <n-gi :span="14">
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">原密码</div>
                                    <n-input type="password" show-password-on="mousedown" placeholder="输入原密码" :minlength="8"
                                        :value="password" @input="password = $event" :style="{
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
                                    <div class="body-item-title">新密码</div>
                                    <n-input type="password" show-password-on="mousedown" placeholder="输入新密码"
                                        :minlength="8" :value="new_password1" @input="new_password1 = $event" :style="{
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
                                    <div class="body-item-title">确认密码</div>
                                    <n-input type="password" show-password-on="mousedown" placeholder="再次输入新密码"
                                        :minlength="8" :value="new_password2" @input="new_password2 = $event" :style="{
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
                    </n-gi>
                </n-grid>
            </div>
            <div style="margin-top: 40px; margin-bottom: 25px">
                <n-grid class="login-button-top">
                    <n-gi :span="4"></n-gi>
                    <n-gi :span="4" style="display: flex; justify-content: right">
                        <n-button strong secondary type="success" @click="
                            handleChange()
                            " :focusable="false" :style="{
        '--n-color':
            this.accentColor === '0,0,0' || this.accentColor === '255,255,255'
                ? '#8cbef8'
                : 'rgba(' + this.accentColor + ', 0.25)',
        '--n-color-hover':
            this.accentColor === '0,0,0' || this.accentColor === '255,255,255'
                ? '#539df5'
                : 'rgba(' + this.accentColor + ', 0.45)',
        '--n-color-pressed':
            this.accentColor === '0,0,0' || this.accentColor === '255,255,255'
                ? '#539df5'
                : 'rgba(' + this.accentColor + ', 0.45)',
        '--n-text-color':
            this.accentColor === '0,0,0' || this.accentColor === '255,255,255'
                ? 'white'
                : 'rgba(' + this.accentColor + ', 1)',
        '--n-text-color-hover':
            this.accentColor === '0,0,0' || this.accentColor === '255,255,255'
                ? 'white'
                : 'rgba(' + this.accentColor + ', 1)',
        '--n-text-color-pressed':
            this.accentColor === '0,0,0' || this.accentColor === '255,255,255'
                ? 'white'
                : 'rgba(' + this.accentColor + ', 1)',
        '--n-border': '1px solid transparent',
        '--n-border-hover': '1px solid transparent',
        '--n-border-pressed': '1px solid transparent',
        '--n-border-radius': '5px',
        '--n-width': '64px',
        '--n-height': '39px',
        '--n-font-size': '18px',
    }">
                            确认
                        </n-button>
                    </n-gi>
                    <n-gi :span="8"></n-gi>
                    <n-gi :span="4" style="display: flex; justify-content: left">
                        <n-button strong secondary type="Warning" @click="closeCWindow()" :style="{
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
import { CloseOutline } from '@vicons/ionicons5';
import { mapState } from "vuex";
import { message } from "ant-design-vue";
import { globalThemeColor, getFontColorString, getRGBString } from '/src/colorMode.js'
export default {
    name: "ChangePasswdView",
    data() {
        return {
            username: '',
            avatarFile: '',
            password: '',
            new_password1: '',
            new_password2: '',
            error(msg) {
                message.error({
                    content: msg,
                    duration: 1,
                    style: {
                        "z-index": 100,
                    },
                });
            },  
            warning(msg) {
                message.warning({
                    content: msg,
                    duration: 1,
                    style: {
                        "z-index": 100,
                    },
                });
            },
        };
    },
    components: {
        CloseOutline,
    },
    computed: {
        ...mapState(["accentColor", "colorMode"]),
    },
    props: {
        showChangePasswd: Boolean,
    },
    created() {
        this.$http.get('/api/accounts/detail/0/').then(response => {
            this.username = response.data.username;
            this.avatarFile = response.data.avatar;
        }).catch(error => {
            console.error(error);
        });
    },
    methods: {
        closeCWindow() {
            this.$emit('closeChangePasswdWindow')
        },
        handleChange() {
            if(this.password == ''){
                this.warning('请输入原密码');
                return;
            }
            if(this.new_password1 == ''){
                this.warning('请输入新密码');
                return;
            }
            if(this.new_password2 == ''){
                this.warning('请确认新密码');
                return;
            }
            let data = new FormData();
            data.append('old_password', this.password);
            data.append('new_password1', this.new_password1);
            data.append('new_password2', this.new_password2);
            this.$http.post('/api/accounts/password_change/', data).then(response => {
                if (response.data.code == '0') {
                    this.closeCWindow();
                } else if (response.data.code == '-1') {
                    const message = response.data.message;
                    this.error(message.replaceAll('。',' '));
                    // this.closeCWindow();
                }
            });
        }
    }
}
</script>

<style scoped>
.login-notice-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.login-button-top {
    margin-top: 20px;
}

.close-icon:hover {
    cursor: pointer;
}

.helloaaa.ant-message-notice-content {
    border-radius: 20px !important;
}

.outer-container {
    width: 800px;
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
    padding-left: 40px;
    padding-top: 10px;
}

.avatar img {
    transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
}

.avatar img:hover {
    cursor: pointer;
    box-shadow: 0 0 0 10px red;
    transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
}

.avatar-prompt {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: bold;
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