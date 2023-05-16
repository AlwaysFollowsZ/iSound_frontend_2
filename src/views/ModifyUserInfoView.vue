<template>
    <n-modal :show="showModifyUserInfo" style="border-radius: 30%">
        <div style="background-color:aliceblue">
            <n-card style="width: 800px; --n-border-radius: 20px;" :bordered="false" :role="dialog" aria-modal="true">
                <template #header>
                    <div>
                        <n-grid :x-gap="12">
                            <n-gi :span="2"></n-gi>
                            <n-gi :span="20">
                                <span class="modify-title">请修改您的个人信息</span>
                            </n-gi>
                            <n-gi :span="2">
                                <div style="padding-top: 30%" @click="closeMWindow">
                                    <close-outline />
                                </div>
                            </n-gi>
                        </n-grid>
                    </div>
                </template>
                <n-grid x-gap="12" :cols="2">
                    <n-gi>
                        <div class="avatar">
                            <img :src="avatarUrl" @click="uploadFile" />
                            <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
                        </div>
                    </n-gi>
                    <n-gi>
                        <span>用户名</span>
                        <n-input type="text" size="small" placeholder="这里是用户名" :value="username"
                            @input="username = $event" />
                        <span>邮箱</span>
                        <n-input type="text" size="small" placeholder="这里是用户的邮箱" :value="email"
                            @input="email = $event" />
                        <span>历史记录条数</span>
                        <n-input type="text" size="small" placeholder="这里是历史记录条数" :value="recordNum"
                            @input="recordNum = $event" />
                        <span>个性签名</span>
                        <n-input type="textarea" size="small" placeholder="这里是用户的个性签名" :value="bio"
                            @input="bio = $event" />
                        <!-- <n-switch v-model:value="active" class="modify-button-position"/> -->
                        <n-button strong secondary round type="primary" class="modify-button-position" @click="submitModify">
                            确认修改
                        </n-button>
                    </n-gi>
                </n-grid>
                <div class="modify-notice-text">
                    点击头像即可修改用户头像，点击按钮即可修改用户信息。
                </div>
            </n-card>
        </div>
    </n-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
import { CloseOutline } from '@vicons/ionicons5'
export default {
    name: 'ModifyUserInfo',
    data() {
        return {
            username: '',
            email: '',
            recordNum: '',
            bio: '',
            file: null,
            avatarUrl: ref('/src/assets/default-admin.jpg'),
        }
    },
    components: {
        CloseOutline,
    },
    props: {
        showModifyUserInfo: Boolean,
    },
    methods: {
        closeMWindow() {
            this.$emit('closeModifyWindow')
        },
        uploadFile() {
            this.$refs.fileInput.click()
        },
        handleFileChange(e) {
            const file = e.target.files[0]
            this.file = file
            // this.uploadImage()
        },
        submitModify() {
            console.log(this.username),
            console.log(this.email),
            console.log(this.recordNum),
            console.log(this.bio)
            let data = new FormData();
            data.append('username', this.username);
            data.append('email', this.email);
            data.append('record_num', this.recordNum);
            data.append('profile', this.bio)
            this.$http.post('/accounts/update/', data).then(response => {
                if(response.data.code == '0') {
                    // this.closeLWindow();
                    alert('修改成功!')
                } else if (response.data.code == '-1') {
                    alert('修改失败，请重新修改！');
                    // this.closeLWindow();
                }
            }); 
        },
    },
    setup() {
        return {
            active: ref(false),
        };
    }
};
</script>
<style>
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