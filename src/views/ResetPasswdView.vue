<template>
    <n-modal :show="showResetPasswd" class="round-corner">
        <div>
            <n-card :style="{ 'width': `600px`, '--n-border-radius': `20px` }" :bordered="false" role="dialog"
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
            </n-card>
        </div>
    </n-modal>
</template>

<script>
import { CloseOutline } from '@vicons/ionicons5'
export default {
    name: "ResetPasswdView",
    components: {
        CloseOutline,
    },
    data() {
        return {
            username: '',
            email: '',
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