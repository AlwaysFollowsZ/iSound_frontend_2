<template>
    <div class="follower-list-title">
        全部关注
        <a-divider style="height: 1.8px; background-color: #dddddd"/>
    </div>
    <div class="follow-list-border">
        <div class="follower-container"
            v-for="(follower, idx) in 
        followerList.slice(5 * (page - 1), 5 * (page - 1) + ((5 * page > followerList.length) ? (followerList.length % 5) : 5))" :key="idx">
            <div class="follower-card">
                <n-grid x-gap="12">
                    <n-gi :span="3">
                        <router-link :to="`/home/user/${follower.id}`"><img class="follower-card-image"
                                :src="follower.avatarImg" /></router-link></n-gi>
                    <n-gi :span="18">
                        <router-link :to="`/home/user/${follower.id}`">
                            <div class="follower-card-name">
                                {{ follower.name }}
                            </div>
                        </router-link>
                        <div class="follower-card-bio">
                            <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false">
                                <div style="  word-wrap: break-word;">
                                    <span>
                                        {{ follower.bio }}
                                    </span>
                                </div>
                            </n-ellipsis>
                        </div>
                    </n-gi>
                    <n-gi span="3">
                        <n-button v-if="follower.isFollowing" strong secondary round type="info" style="margin-top: 15px;"
                            @click="follow(follower)">已关注</n-button>
                        <n-button v-else strong secondary round style="margin-top: 15px;"
                            @click="follow(follower)">加关注</n-button>
                    </n-gi>
                </n-grid>
                <n-divider dashed />
            </div>
        </div>
        <n-grid>
            <n-gi :span="8"></n-gi>
            <n-gi :span="8">
                <div style="display: flex; justify-content: center;" v-if="followerList.length > 0">
                    <n-pagination v-model:page="page" :page-count="Math.ceil(followerList.length / 5)" />
                </div>
                <div style="display: flex; justify-content: center; font-size: 20px" v-else>
                    您还没有关注他人哦~
                </div>
            </n-gi>
            <n-gi :span="8"></n-gi>
        </n-grid>
    </div>
</template>
<script>
import { NGrid } from 'naive-ui'
export default {
    components: {
        NGrid,
    },
    data() {
        return {
            page: 1,
            followerList: [],
        }
    },
    created() {
        this.$http.get(`/api/accounts/following/0/`).then((response) => {
            console.log(response);
            this.followerList = response.data.following.map(follower => ({
                id: follower.id,
                name: follower.username,
                bio: follower.profile,
                avatarImg: follower.avatar,
                isFollowing: true,
            }));
        });
    },
    methods: {
        follow(follower) {
            follower.isFollowing = !follower.isFollowing;
            if (follower.isFollowing) {
                this.followUser(follower);
            } else {
                this.unFollowUser(follower);
            }
        },
        followUser(user) {
            this.$http.post(`/api/follow/${user.id}/`).then((response) => {
                console.log(response);
                this.followerList.push(user);
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
        }
    }
}
</script>
<style scoped>
.follower-list-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    /* text-align: center; */
}

.follower-card {
    /* max-width: 400px; */
    /* padding-top: 3%;
    padding-bottom: 3%; */
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
    font-weight: 700;
}

.follower-card-bio {
    font-size: small;
    font-weight: 500;
    color: grey;
}
</style>