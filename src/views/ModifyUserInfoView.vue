<template>
    <n-modal :show="showModifyUserInfo" :style="{'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)'}" :block-scroll="false">
        <div class="outer-container">
            <div class="title-container">
                <div style="margin-bottom: 30px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="modify-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">编辑个人信息</div>
                        </n-gi>
                        <!-- <n-gi :span="1"></n-gi> -->
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="submitModify(); closeMWindow()" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                <n-icon size="40"><close-outline/></n-icon>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <div class="body-container">
                <n-grid>
                    <n-gi :span="10">
                        <div class="avatar">
                            <img :src="avatarUrl" @click="uploadFile" />
                            <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
                        </div>
                        <div class="avatar-prompt" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">点击以更换头像</div>
                    </n-gi>
                    <n-gi :span="14">
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">
                                        用户名
                                    </div>
                                    <n-input type="text" size="small" :placeholder="username" :value="username" @input="username = $event" 
                                        :style="{
                                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                            '--n-border-radius': '8px',
                                            '--n-height': '50px',
                                            '--n-font-size': '18px',
                                            '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                        }"
                                    />
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                            
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">
                                        邮箱
                                    </div>
                                    <n-input type="text" :placeholder="email" :value="email" @input="email = $event" 
                                        :style="{
                                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                            '--n-border-radius': '8px',
                                            '--n-height': '50px',
                                            '--n-font-size': '18px',
                                            '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                        }"
                                    />
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">
                                        历史记录条数
                                    </div>
                                    <n-input type="text" :placeholder="recordNum" :value="recordNum" @input="recordNum = $event" 
                                        :style="{
                                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                            '--n-border-radius': '8px',
                                            '--n-height': '50px',
                                            '--n-font-size': '18px',
                                            '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                        }"
                                    />
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">
                                        个性签名
                                    </div>
                                    <n-input type="textarea" size="small" :placeholder="bio" :value="bio" @input="bio = $event" 
                                        :style="{
                                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                            '--n-border-radius': '8px',
                                            '--n-font-size': '18px',
                                            '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                        }"
                                        :resizable="false"
                                    />
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                            
                        </div>
                    </n-gi>
                </n-grid>
            </div>
        </div>
        <!-- <div style="background-color:aliceblue">
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
                        <n-input :style="{ '--n-border-radius': `10px` }" type="text" size="small" :placeholder="username"
                            :value="username" @input="username = $event" />
                        <span>邮箱</span>
                        <n-input :style="{ '--n-border-radius': `10px` }" type="text" size="small" :placeholder="email"
                            :value="email" @input="email = $event" />
                        <span>历史记录条数</span>
                        <n-input :style="{ '--n-border-radius': `10px` }" type="text" size="small" :placeholder="recordNum"
                            :value="recordNum" @input="recordNum = $event" />
                        <span>个性签名</span>
                        <n-input :style="{ '--n-border-radius': `10px` }" type="textarea" size="small" :placeholder="bio"
                            :value="bio" @input="bio = $event" />
                        <n-button strong secondary round type="primary" class="modify-button-position"
                            @click="submitModify">
                            确认修改
                        </n-button>
                    </n-gi>
                </n-grid>
                <div class="modify-notice-text">
                    点击头像即可修改用户头像，点击按钮即可修改用户信息。
                </div>
            </n-card>
        </div> -->
    </n-modal>
</template>
<script>
import { CloseOutline } from '@vicons/ionicons5'
import { mapState } from 'vuex'
export default {
    name: 'ModifyUserInfo',
    data() {
        return {
            username: '',
            email: '',
            recordNum: '',
            bio: '',
            avatarFile: null,
            avatarUrl: ''
        }
    },
    computed: {
        ...mapState(['accentColor', 'colorMode']),
    },
    created() {
        this.$http.get('/api/accounts/detail/0/').then(response => {
            this.username = response.data.username;
            this.email = response.data.email;
            this.recordNum = response.data.record_num;
            this.bio = response.data.profile;
            this.avatarFile = response.data.avatar;
            this.avatarUrl = response.data.avatar;
        }).catch(error => {
            console.error(error);
        });
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
            // location.reload(); // 可以自动刷新一下，但是会抖动一下，观看效果不太好。
        },
        uploadFile() {
            this.$refs.fileInput.click()
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
            let data = new FormData();
            data.append('username', this.username);
            data.append('email', this.email);
            data.append('record_num', this.recordNum);
            data.append('profile', this.bio);
            data.append('avatar', this.avatarFile);
            this.$http.post('/api/accounts/update/', data).then(response => {
                console.log(response);
                if (response.data.code === '0') {
                    // this.closeMWindow();
                    // alert('修改成功!')
                } else if (response.data.code === '-1') {
                    alert('修改失败，请重新修改！');
                    // this.closeMWindow();
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
    padding-left: 30px;
    padding-top: 40px;
}

.avatar:hover {
    cursor: pointer;
}
.avatar-prompt {
    margin-top: 10px;
    padding-left: 30px;
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