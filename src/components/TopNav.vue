<template>
  <div class="top-nav">
    <div class="top-left">
        <router-link to="/">
            <img src="../assets/logo.png" alt="网站Logo"><span class="isound-style">iSound</span>
        </router-link>
    </div>
    <div class="top-center">
        <div class="search-box">
            <input type="text" v-model="searchValue" @keydown.enter="search">
            <button @click="search"><img src='../assets/search.png' alt="搜索图标"></button>
        </div>
    </div>
    <div class="top-right">
        <div class="user-box" v-if="loggedIn">
            <div class="user-avatar" @mouseover="showMenu = true" @mouseleave="hideMenu">
                <img :src="avatar" alt="用户头像">
            </div>
            <div class="user-menu" v-if="showMenu" @mouseover="onMenu = true" @mouseleave="showMenu = false">
                <ul>
                    <li><router-link to="/user">个人主页</router-link></li>
                    <li><a href="#" @click="logout">登出</a></li>
                </ul>
            </div>
        </div>
        <div class="user-box" v-else>
            <div class="user-avatar" @mouseover="showPrompt = true" @mouseleave="hidePrompt">
                <img src="../assets/default-avatar.png" alt="游客头像">
            </div>
            <div class="user-prompt" v-if="showPrompt" @mouseover="onPrompt = true" @mouseleave="showPrompt = false">
                <span>已有账号？请<router-link to="/login">登录</router-link></span><br>
                <span>未注册账号？请<router-link to="/register">注册</router-link></span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>    
export default {
    name: 'TopNav',
    data() {
        return {
            searchValue: '',
            loggedIn: false,
            showMenu: false,
            showPrompt: false,
            onMenu: false,
            onPrompt: false,
            avatar: ''
        }
    },
    methods: {
        search() {
            if (this.searchValue.trim !== '') {
                console.log(`searchValue: ${this.searchValue}`)
                // do search
                this.searchValue = ''
            }
        },
        logout() {
            console.log('登出')
            this.loggedIn = false
            this.avatar = ''
        },
        hideMenu() {
            setTimeout(() => {
                if (!this.onMenu) {
                    this.showMenu = false
                }
            }, 1500)
        },
        hidePrompt() {
            setTimeout(() => {
                if (!this.onPrompt) {
                  this.showPrompt = false
                }
            }, 1500)
        }
    }
}
</script>

<style>
.top-nav {
    width:80vw;
    background-color: #e6f7ff;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    
  }
  .top-left {
    width: 15%;
    display: inline-block;
  }
  .isound-style {
    display: inline;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    font-style: italic;
    font-size: 30px;
  }
  .top-center {
    display: inline-block;
  }
  .top-right {
    display: inline-block;
    position: relative;
  }
  .user-menu, .user-prompt {
    position: absolute;
  }
  .search-box {
    padding-top: 5%;
  }
  .user-box {
    padding-top: 5%;
  }
  
</style>