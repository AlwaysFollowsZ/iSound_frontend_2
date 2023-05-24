<template>
    <n-modal :show="showChangePasswd">
        <div>
            <n-card :style="{ 'width': `700px`, '--n-border-radius': `20px` }" :bordered="false" role="dialog"
                aria-modal="true">
                <template #header>
                    <div>
                        <n-grid :x-gap="12">
                            <n-gi :span="2"></n-gi>
                            <n-gi :span="20">
                                <h3 class="login-card-title">修改密码</h3>
                            </n-gi>
                            <n-gi :span="2">
                                <div style="padding-top: 30%" @click="closeCWindow">
                                    <close-outline />
                                </div>
                            </n-gi>
                        </n-grid>
                    </div>
                </template>
                <n-grid x-gap="12" :cols="2">
                    <n-gi>
                        <img class="user-avatar-image" :src="avatarFile" />
                        <div class="user-name-cards">{{ this.username }}</div>
                    </n-gi>
                    <n-gi>
                        <span>原密码</span>
                        <n-input type="password" show-password-on="mousedown" placeholder="请输入原密码" :minlength="8"
                            :value="password" @input="password = $event" />
                        <span>新密码</span>
                        <n-input type="password" show-password-on="mousedown" placeholder="请输入新密码" :minlength="8"
                            :value="new_password1" @input="new_password1 = $event" />
                        <span>请重新输入新密码</span>
                        <n-input type="password" show-password-on="mousedown" placeholder="请再次输入新密码" :minlength="8"
                            :value="new_password2" @input="new_password2 = $event" />
                        <n-grid class="login-button-top" x-gap="6" :cols="2">
                            <n-gi>
                                <n-button strong secondary type="success" @click="handleChange">
                                    修改
                                </n-button>
                            </n-gi>
                            <n-gi>
                                <n-button strong secondary type="Warning" @click="closeCWindow">
                                    取消
                                </n-button>
                            </n-gi>
                        </n-grid>
                    </n-gi>
                </n-grid>
                <div class="login-notice-text">
                    修改密码后不能撤销，请慎重考虑。
                </div>
            </n-card>
        </div>

    </n-modal>
</template>

<script>
import { CloseOutline } from '@vicons/ionicons5'
export default {
    name: "ChangePasswdView",
    data() {
        return {
            username: '',
            avatarFile: '',
            password: '',
            new_password1: '',
            new_password2: '',
        };
    },
    components: {
        CloseOutline,
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
            let data = new FormData();
            data.append('old_password', this.password);
            data.append('new_password1', this.new_password1);
            data.append('new_password2', this.new_password2);
            this.$http.post('/api/accounts/password_change/', data).then(response => {
                if(response.data.code == '0') {
                    alert('修改密码成功');
                    this.closeCWindow;
                } else if (response.data.code == '-1') {
                    alert('修改失败，请重试！');
                    this.closeCWindow();
                }
            }); 
        }
    }
}
</script>

<style scoped>
.login-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}

.user-avatar-image {
    width: 80%;
    border-radius: 50%;
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