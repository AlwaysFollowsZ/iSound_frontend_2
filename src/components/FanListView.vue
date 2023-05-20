<template>
    <div class="fan-list-title">
        全部粉丝
        <n-divider />
    </div>
    <div class="fan-list-border">
        <div class="fan-container" v-for="(fan, idx) in 
        fansList.slice(5 * (page - 1), 5 * (page - 1) + ((5 * page > fansList.length) ? (fansList.length % 5) : 5))"
            :key="idx">
            <div class="fan-card">
                <n-grid x-gap="12">
                    <n-gi :span="3"><router-link :to="`/home/user/${fan.id}`"><img class="fan-card-image"
                                :src="fan.avatarImg" /></router-link></n-gi>
                    <n-gi :span="18">
                        <router-link :to="`/home/user/${fan.id}`">
                            <div class="fan-card-name">
                                {{ fan.name }}
                            </div>
                        </router-link>
                        <div class="fan-card-bio">
                            <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false">
                                <div style="  word-wrap: break-word;">
                                    <span>
                                        {{ fan.bio }}
                                    </span>
                                </div>
                            </n-ellipsis>
                        </div>
                    </n-gi>
                    <n-gi span="3">
                        <n-button v-if="fan.isFollowed" strong secondary round type="info" style="margin-top: 15px;"
                            @click="follow(fan)">已关注</n-button>
                        <n-button v-else strong secondary round style="margin-top: 15px;" @click="follow(fan)">回关</n-button>
                    </n-gi>
                </n-grid>
                <n-divider dashed />
            </div>
        </div>
        <n-grid>
            <n-gi :span="8"></n-gi>
            <n-gi :span="8">
                <div style="display: flex; justify-content: center;" v-if="fansList.length > 0">
                    <n-pagination v-model:page="page" :page-count="Math.ceil(fansList.length / 5)" />
                </div>
                <div style="display: flex; justify-content: center; font-size: 20px" v-else>
                    您还没有粉丝哦~
                </div>
            </n-gi>
            <n-gi :span="8"></n-gi>
        </n-grid>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    data() {
        return {
            page: 1,
            fansList: [],
        }
    },
    created() {
        this.$http.get('/api/accounts/fans/0/').then((response) => {
            console.log(response);
            this.fansList = response.data.fans.map(fan => ({
                id: fan.id,
                name: fan.username,
                bio: fan.profile,
                avatarImg: fan.avatar,
                isFollowed: true,
            }));
        });
    },
    methods: {
        follow(fan) {
            fan.isFollowed = !fan.isFollowed;
        }
    },
}
</script>
<style>
.fan-list-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    /* text-align: center; */
}

.fan-card {
    /* max-width: 400px; */
    /* padding-top: 3%;
    padding-bottom: 3%; */
    word-wrap: break-word;
}

.fan-card-image {
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

.fan-card-name {
    font-size: medium;
    font-weight: 700;
}

.fan-card-bio {
    font-size: small;
    font-weight: 500;
    color: grey;
}
</style>