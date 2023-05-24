<template>
    <div class="topnav">
        <n-grid x-gap="0">
            <n-gi :span="4">
                <router-link to="/">
                    <n-image width="45" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                        style="padding-left: 4%" preview-disabled="true" />
                    <div class="isound-style">iSound</div>
                </router-link>
            </n-gi>
            <n-gi :span="7">
                <!-- test -->

            </n-gi>
            <n-gi :span="2">
                <div 
                    class="back-to-home"
                    :class="{'animate__animated animate__pulse': backToHomeIsHovered}"
                    style="animation-duration: 2s"
                    :style="{
                        'text-shadow': backToHomeIsHovered ? '1px 1px 1px rgba(' + this.accentColor + ', 0.8)' : '',
                        'color': this.colorMode === 'white' ? 'grey' : 'lightgrey',
                    }"
                    @mouseover="backToHomeIsHovered = true"
                    @mouseout="backToHomeIsHovered = false"
                    @click="this.$router.push('/')"
                >
                    音乐馆
                </div>
            </n-gi>
            <n-gi :span="4"></n-gi>
            <n-gi :span="6">
                <n-grid>
                    <n-gi :span="3" v-if="!this.isLoggedIn"></n-gi>
                    <n-gi :span="15">
                        <div style="padding-top: 3%; padding-right: 3%; padding-left: 7%;">
                            <n-input :style="{
                                '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                '--n-border-radius': `10px`,
                                '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                'border': '1px solid rgb(224, 224, 230)',
                                '--n-border-hover': '1px solid ' + 'rgb(' + this.accentColor + ')',
                                '--n-border-focus': '1px solid ' + 'rgb(' + this.accentColor + ')',
                                '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                            }" type="text" v-model:value="searchValue" placeholder="请输入关键字"
                                @keyup.enter="search" />
                        </div>
                    </n-gi>
                    <n-gi :span="3">
                        <div style="padding-top: 25%" class="search-icon-container"
                            :style="{ 'color': this.searchIconIsHovered ? 'rgba(' + this.accentColor + ', 0.9)' : 'lightgrey' }"
                            @mouseover="this.searchIconIsHovered = true" @mouseout="this.searchIconIsHovered = false">
                            <n-icon :component="SearchOutline" size="27px" @click="search" />
                        </div>
                    </n-gi>
                    <n-gi :span="3">
                        <div class="color-icon-container">
                            <n-tooltip :style="{ 'maxWidth': '270px', 'maxHeight': '200px' }"
                                placement="bottom-start"
                                trigger="hover"
                                @update:show="handleUpdateShow"
                            >
                                <template #trigger>
                                    <div style="color: lightgrey">
                                        <n-icon size="27px" v-if="this.colorMode === 'white'"
                                            @click="changeColorMode"><moon-outline /></n-icon>
                                        <n-icon size="27px" v-else @click="changeColorMode"><sunny-outline /></n-icon>
                                    </div>
                                </template>
                                <template #default>
                                    <div >
                                        <span class="choose-color-default"
                                            @click="this.setAccentColor(this.colorMode === 'white' ? '0,0,0' : '255,255,255')"
                                        >
                                            默认
                                        </span>
                                        <span style="max-width: 200px" v-for="(c, idx) in accentColorChoices" :key="idx">
                                            <button class="round-button"
                                                :style="{ 'background-color': 'rgb(' + c + ')', 'border': '1px solid rgb(' + c + ')' }"
                                                @click="this.setAccentColor(c)"></button>
                                            <!-- < :style="{'--n-color': }" @click="this.setAccentColor(c); console.log(c)"/> -->
                                        </span>
                                        <div style="margin-top: 3%">
                                            <n-grid>
                                                <n-gi :span="14">开启多彩背景色变换</n-gi>
                                                <n-gi :span="5"></n-gi>
                                                <n-gi :span="5">
                                                    <n-switch 
                                                        v-model:value="multiColorShouldDisplay"
                                                        @update:value="handleMultiColorChange"
                                                        :style="{'--n-rail-color': 'grey'}"
                                                   />
                                                </n-gi>
                                            </n-grid>
                                        </div>
                                    </div>

                                </template>
                            </n-tooltip>
                        </div>
                    </n-gi>
                    
                    <n-gi :span="3" v-if="this.isLoggedIn">
                        <div style="padding-top: 25%">
                            <n-badge dot :offset="[-2.5, 7.5]" :show="showMessage">
                                <n-icon :component="MailOutline" size="27px" @click="readMessage" color="lightgray" />
                            </n-badge>
                        </div>
                    </n-gi>
                </n-grid>
            </n-gi>
            <n-gi :span="1">
                <n-dropdown v-if="isLoggedIn" trigger="hover" :options="options">
                    <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>
                </n-dropdown>
                <n-tooltip v-else placement="bottom-start" trigger="hover">
                    <template #trigger>
                        <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>
                    </template>
                    已有账号？请<a style="color:cornflowerblue" @click="showLogin = true">登录</a>；未注册账号？请<a
                        style="color:cornflowerblue" @click="showRegister = true">注册</a>。
                </n-tooltip>
            </n-gi>
        </n-grid>
    </div>
    <login-view :showLogin="showLogin" @closeLoginWindow="showLogin = false"
        @switch="showLogin = false; showRegister = true" @login="toLogIn"></login-view>
    <register-view :showRegister="showRegister" @closeRegisterWindow="showRegister = false"></register-view>
    <modify-user-message-view :showModifyUserMessage="showModifyUserMessage"
        @closeModifyWindow="showModifyUserMessage = false"></modify-user-message-view>
</template>
  
<script>
import { SearchOutline, MailOutline, SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import { mapState, mapMutations } from 'vuex';
import ModifyUserMessageView from '../views/ModifyUserMessageView.vue';
import { changeColorMode } from '/src/colorMode'
import { message } from 'ant-design-vue';

export default {
    name: 'TopNav',
    components: {
        SearchOutline,
        LoginView,
        RegisterView,
        MailOutline,
        SunnyOutline,
        MoonOutline,
        ModifyUserMessageView,
    },
    computed: {
        ...mapState(['isLoggedIn', 'accentColor', 'colorMode']),
    },
    created() {
        this.$http.get('/api/message/of/0/').then((response) => {
            if (response.data.unread == 0) {
                this.showMessage = false;
            }
            else {
                this.showMessage = true;
            }
        });
        this.$EventBus.on('setShowMessage', (unread) => {
            if (unread == 0) {
                this.showMessage = false;
            }
            else {
                this.showMessage = true;
            }
        });
    },
    data() {
        return {
            accentColorChoices: [
                '0,122,255',   // 蓝色
                '150,62,150',  // 紫色
                '248,79,158',  // 粉色
                '224,56,61',  // 红色
                '246,130,27',  // 橙色
                '255,200,37',  // 黄色
                '98,186,70',   // 绿色
                '152,152,152', // 灰色
            ],
            showModifyUserMessage: false,
            searchValue: '',
            showLogin: false,
            showRegister: false,
            searchIconIsHovered: false,
            backToHomeIsHovered: false,
            multiColorShouldDisplay: false, // 多彩背景变换，要求必须默认 false
            SearchOutline,
            MailOutline,
            showMessage: ref(true),
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
        ...mapMutations(['setLogState', 'setAccentColor', 'setMultiColor']),
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
        changeColorMode,
        handleMultiColorChange() {
            this.setMultiColor(this.multiColorShouldDisplay)
        }
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
    text-decoration: none;
    /* 去除 router-link 中文字的下划线 */
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

.search-icon-container:hover {
    cursor: pointer;
}
.color-icon-container {
    padding-top: 20%;
}
.color-icon-container:hover {
    cursor: pointer;
}

.color-btn {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.round-button {
    margin-left: 4px;
    margin-right: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    line-height: 16px;
    cursor: pointer;
}
.choose-color-default {
    padding-right: 3px;
    color: cornflowerblue;
}
.choose-color-default:hover {
    cursor: pointer;
}

.back-to-home {
    font-size: 30px;
    font-weight: 400;
    padding-top: 8%;
}

.back-to-home:hover {
    cursor: pointer;
}
</style>