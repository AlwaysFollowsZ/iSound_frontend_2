<template>
    <div class="follow-list-border animate__animated animate__slideInUp" style="animation-duration: 0.9s">
        <div class="follower-container"
            v-for="(user, idx) in 
        list.slice(4 * (page - 1), 4 * (page - 1) + ((4 * page > list.length) ? (list.length % 4) : 4))" :key="idx">
            <div class="follower-card">
                <n-grid x-gap="0">
                    <n-gi :span="2">
                        <router-link :to="`/home/user/${user.id}`"><img class="follower-card-image"
                                :src="user.avatarImg" /></router-link></n-gi>
                    <n-gi :span="18">
                        <router-link :to="`/home/user/${user.id}`">
                            <div class="follower-card-name" :style="{'color': 'rgb(' + this.accentColor + ')'}">
                                {{ user.name }}
                            </div>
                        </router-link>
                        <div class="follower-card-bio">
                            <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false">
                                <div style="word-wrap: break-word;">
                                    <span>
                                        {{ user.bio }}
                                    </span>
                                </div>
                            </n-ellipsis>
                        </div>
                    </n-gi>
                    <n-gi :span="1"></n-gi>
                    <n-gi span="3" style="display: flex; justify-content: center">
                        <n-popconfirm 
                            v-if="user.isFollowing" @positive-click="follow(user)" 
                            positive-text="确认" negative-text="取消"
                            :style="{
                                '--n-text-color': this.colorMode === 'white' ? 'rgb(57,57,57)' : 'white',
                                '--n-color': this.colorMode === 'white' ? '#fff' : 'rgb(72,72,72)',
                                '--n-border-radius': '12px',
                            }"  
                            :negative-button-props="{
                                style:{
                                    '--n-color': 'transparent',
                                    '--n-color-hover': 'transparent',
                                    '--n-color-pressed': 'transparent',
                                    '--n-color-focus': 'transparent',
                                    '--n-text-color': '',
                                    '--n-text-color-hover': 'rgb(' + this.accentColor + ')',
                                    '--n-text-color-pressed': 'rgb(' + this.accentColor + ')',
                                    '--n-text-color-focus': 'rgb(' + this.accentColor + ')',
                                    '--n-border': '1px solid rgb(224, 224, 230)',
                                    '--n-border-hover': '1px solid rgb(' + this.accentColor + ')',
                                    '--n-border-pressed': '1px solid rgb(' + this.accentColor + ')',
                                    '--n-border-focus': '1px solid rgb(' + this.accentColor + ')',
                                    '--n-border-radius': '8px',
                                }
                            }"
                            :positive-button-props="{
                                style:{
                                    '--n-color': 'rgba(' + this.accentColor + ', 0.7)',
                                    '--n-color-hover': 'rgba(' + this.accentColor + ', 0.8)',
                                    '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.8)',
                                    '--n-color-focus': 'rgba(' + this.accentColor + ', 0.8)',
                                    '--n-text-color': 'white',
                                    '--n-text-color-hover': 'white',
                                    '--n-text-color-pressed': 'white',
                                    '--n-text-color-focus': 'white',
                                    '--n-border': '1px solid rgb(224, 224, 230)',
                                    '--n-border-hover': '1px solid rgb(' + this.accentColor + ')',
                                    '--n-border-pressed': '1px solid rgb(' + this.accentColor + ')',
                                    '--n-border-focus': '1px solid rgb(' + this.accentColor + ')',
                                    '--n-border-radius': '8px',
                                }
                            }"
                        >
                            <template #trigger>
                                <n-button strong secondary round type="primary" style="margin-top: 15px;" :focusable="false"
                                :style="{
                                    '--n-color': 'rgba(' + this.accentColor + ', 0.3)',
                                    '--n-color-hover': 'rgba(' + this.accentColor + ', 0.5)',
                                    '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.5)', 
                                    '--n-color-focus': 'rgba(' + this.accentColor + ', 0.5)',
                                    '--n-text-color': 'rgba(' + this.accentColor + ', 1)', 
                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)', 
                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)', 
                                    '--n-text-color-focus': 'rgba(' + this.accentColor + ', 1)', 
                                  }"
                                >已关注</n-button>
                            </template>
                            确定要取消关注该用户吗？
                        </n-popconfirm>
                        <n-button v-else strong secondary round style="margin-top: 15px;" @click="follow(user)"
                            :style="{
                                '--n-text-color': 'rgba(' + this.accentColor + ', 1)', 
                                '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)', 
                                '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)', 
                                '--n-text-color-focus': 'rgba(' + this.accentColor + ', 1)', 
                            }"
                        >
                            关注
                        </n-button>
                    </n-gi>
                </n-grid>
            </div>
        </div>
        <n-grid>
            <n-gi :span="8"></n-gi>
            <n-gi :span="8">
                <div style="display: flex; justify-content: center; margin-top: 25px" v-if="list.length > 0">
                    <n-pagination 
                        v-model:page="page" 
                        :page-count="Math.ceil(list.length / 4)" 
                        :style="{
                            '--n-item-text-color-hover': 'rgb(' + this.accentColor + ')',
                            '--n-item-text-color-active': 'rgb(' + this.accentColor + ')',
                            '--n-item-text-color-pressed': 'rgb(' + this.accentColor + ')',
                            '--n-item-border-active': '1px solid rgb(' + this.accentColor + ')',
                            '--n-item-color-disabled': 'transparent',
                        }"    
                    />
                </div>
                <div style="display: flex; justify-content: center; font-size: 20px" v-else>
                    未搜索到用户
                </div>
            </n-gi>
            <n-gi :span="8"></n-gi>
        </n-grid>
    </div>
</template>
    
<script>
import 'animate.css'
import { mapState } from 'vuex'
export default {
    name: 'UserList',
    props: {
        list: [],
    },
    data() {
        return {
            page: 1,
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'accentColor', 'colorMode']),
    },
    methods: {
        follow(follower) {
            if (!this.isLoggedIn) {
                this.$EventBus.emit('showLoginModal')
            } else {
                follower.isFollowing = !follower.isFollowing;
                if (follower.isFollowing) {
                    this.followUser(follower);
                } else {
                    this.unFollowUser(follower);
                }
            }
            
        },
        followUser(user) {
            this.$http.post(`/api/follow/${user.id}/`).then((response) => {
                console.log(response);
                // this.followerList.push(user);
            })
        },
        unFollowUser(user) {
            this.$http.post(`/api/follow/${user.id}/`).then((response) => {
                console.log(response);
                // const index = this.followerList.findIndex(follower => follower.id === user.id);
                // if (index != -1) {
                //     this.followerList.splice(index, 1);
                // }
            })
        },
    }
}
</script>

<style scoped>
.follower-list-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    /* text-align: center; */
}

.loading-animate {
    padding-top: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.follower-card {
    /* max-width: 400px; */
    /* padding-top: 3%;
    padding-bottom: 3%; */
    margin-bottom: 35px;
    word-wrap: break-word;
}

.follower-card-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    /* round */
    /* border-radius: 10px; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}

.follower-card-name {
    font-size: medium;
    font-weight: 600;
}

.follower-card-bio {
    font-size: small;
    font-weight: 500;
    color: grey;
}

</style>