<template>
    <div class="topnav">
        <n-grid x-gap="12">
            <n-gi :span="4">
                <router-link to="/">
                    <n-image width="45" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                        style="padding-left: 4%" preview-disabled="true" />
                    <div class="isound-style">iSound</div>
                </router-link>
            </n-gi>
            <n-gi :span="10"></n-gi>
            <n-gi :span="3">
                <div style="padding-top: 3%">
                    <n-input round type="text" v-model:value="searchValue" placeholder="请输入关键字" @keyup.enter="search" />
                </div>
            </n-gi>
            <n-gi :span="1">
                <div style="color:lightgray; padding-top: 13%">
                    <n-icon :component="SearchOutline" size="30px" @click="search" />
                </div>

            </n-gi>
            <n-gi :span="5"></n-gi>
            <n-gi>
                <n-dropdown v-if="loggedIn" trigger="hover" :options="options">
                    <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>
                </n-dropdown>
                <n-tooltip v-else placement="bottom-start" trigger="hover">
                    <template #trigger>
                        <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>
                    </template>
                    已有账号？请<a href="/login">登录</a>；未注册账号？请<a href="/register">注册</a>。
                </n-tooltip>
            </n-gi>
        </n-grid>
    </div>
</template>
  
<script>
import { SearchOutline } from '@vicons/ionicons5'

export default {
    components: {
        SearchOutline,
    },
    data() {
        return {
            searchValue: '',
            loggedIn: true,
            SearchOutline,
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
                            this.loggedIn = false
                            console.log('logout')
                        }
                    }
                }
            ],
        }
    },
    methods: {
        search() {
            if (this.searchValue.trim().length !== 0) {
                console.log(`searchValue: ${this.searchValue}`)
                // do search
                this.searchValue = ''
            }
        },
    }
};
</script>

<style>
.topnav {
    padding-top: 1%;
    border: dashed;
}

.isound-style {
    display: inline;
    font-family: 'Monaco', 'Courier New', Courier, monospace;
    color: dimgray;
    font-weight: bold;
    font-style: italic;
    font-size: 30px;
    vertical-align: top;
    padding-left: 5%;
}
</style>