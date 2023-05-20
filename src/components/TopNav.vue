<template>
    <div class="topnav">
        <n-grid x-gap="0">
            <n-gi :span="4">
                <router-link to="/">
                    <n-image
                    width="45"
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                    style="padding-left: 4%"
                    preview-disabled="true"
                    />
                    <div class="isound-style">iSound</div>
                </router-link>
            </n-gi>
            <n-gi :span="14"></n-gi>
            <n-gi :span="5">
                <n-grid>
                    <n-gi :span="18">
                        <div style="padding-top: 3%; padding-right: 3%; padding-left: 7%;">
                            <n-input round type="text" v-model:value="searchValue" placeholder="请输入关键字" @keyup.enter="search" />
                        </div>
                    </n-gi>
                    <n-gi :span="3">
                        <div style="color:lightgray; padding-top: 25%">
                            <n-icon :component="SearchOutline" size="27px" @click="search" />  
                        </div>  
                    </n-gi>
                    <n-gi :span="3">                
                        <div style="padding-top: 25%">
                            <n-badge dot :offset="[-2.5, 7.5]" :value="messageNum" :max="99">
                                <n-icon :component="MailOutline" size="27px" @click="readMessage" color="lightgray" />
                            </n-badge>
                        </div> 
                    </n-gi>
                </n-grid>
            </n-gi>
            <!-- <n-gi :span="1"></n-gi> -->
            <n-gi :span="1">
                <n-dropdown v-if="isLoggedIn" trigger="hover" :options="options">
                    <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>
                </n-dropdown>
                <n-tooltip v-else placement="bottom-start" trigger="hover">
                    <template #trigger>
                        <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>
                    </template>
                    已有账号？请<a style="color:cornflowerblue" @click="showLogin = true">登录</a>；未注册账号？请<a style="color:cornflowerblue" @click="showRegister = true">注册</a>。
                  </n-tooltip>
            </n-gi>
        </n-grid>
    </div>
    <login-view 
        :showLogin="showLogin" 
        @closeLoginWindow="showLogin = false" 
        @switch="showLogin = false; showRegister = true"
        @login="toLogIn"
    ></login-view>
    <register-view :showRegister="showRegister" @closeRegisterWindow="showRegister = false"></register-view>
    <modify-user-message-view :showModifyUserMessage="showModifyUserMessage"
        @closeModifyWindow="showModifyUserMessage = false"></modify-user-message-view>
  </template>
  
<script>
import { SearchOutline, MailOutline } from '@vicons/ionicons5'
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import { mapState, mapMutations } from 'vuex';
import ModifyUserMessageView from '../views/ModifyUserMessageView.vue';
import { message } from 'ant-design-vue';
  
  export default {
    name: 'TopNav',
    components: {
        SearchOutline,
        LoginView,
        RegisterView,
        MailOutline,
        ModifyUserMessageView,
    },
    computed: {
        ...mapState(['isLoggedIn']),
    },
    data() {
        return {
            showModifyUserMessage: false,
            searchValue: '',
            showLogin: false,
            showRegister: false,
            SearchOutline,
            MailOutline,
            messageNum: ref(0), //每个用户收到的信息数
            options: [
            {
                label: "个人主页",
                props: {
                    onClick: () => {
                        this.$router.push('/home')
                        console.log('user page')
                    }
                }
            },
            {
                label: "历史记录",
                props: {
                    onClick: () => {
                        this.$router.push('/history')
                        console.log('history')
                    }
                }
            },
            {
                label: "登出",
                props: {
                    onClick: () => {
                        this.setLogState(false)
                        console.log('logout')
                    }
                }
            }
          ],
        }
    },
    methods: {
        ...mapMutations(['setLogState']),
        search() {
            if (this.searchValue.trim().length !== 0) {
                console.log(`searchValue: ${this.searchValue}`)
                // do search
                this.searchValue = ''
            }
        },
        toLogIn() {
            this.setLogState(true)
            console.log('hello')
        },
        readMessage() {
            this.showModifyUserMessage = true;
        },
    }
};
</script>

<style>
.topnav {
    padding-top: 7px;
    padding-bottom: 7px;
    /*border: dashed;*/
}
.router-link-active {
    text-decoration: none; /* 去除 router-link 中文字的下划线 */
}
.isound-style {
    display: inline;
    vertical-align: text-bottom;
    color: black;
    font-weight: bold;
    /* font-style: italic; */
    font-size: 35px;
    padding-left: 5%;
}
</style>