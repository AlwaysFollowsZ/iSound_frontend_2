<template>
    <div class="fan-list-title">
        全部粉丝
        <a-divider style="height: 1.8px; background-color: #dddddd" />
    </div>
    <div class="loading-animate" v-if="isLoading">
        <n-progress style="height: 200px; width: 200px" class="animate__animated" type="line"
            :percentage="loadingPercentage" rail-color="lightgrey" :style="{
                '--n-fill-color':
                    (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ?
                        'grey' :
                        'rgb(' + this.accentColor + ')',
            }" :class="[`${this.loadingIconShouldOut ? 'animate__zoomOut' : 'animate__zoomIn'}`]">
            <template #default>
                <div v-if="this.loadingPercentage < 95">
                </div>
                <div v-else>
                </div>
            </template>
        </n-progress>
    </div>
    <div class="fan-list-border" v-else>
        <div class="card-container" v-for="(fan, idx) in 
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
                            @click="follow(fan)">已互粉</n-button>
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
import { mapState } from 'vuex'
import 'animate.css'
import { MusicalNotesOutline, CheckmarkCircleOutline } from '@vicons/ionicons5';
export default {
    components: {
        MusicalNotesOutline,
        CheckmarkCircleOutline,
    },
    data() {
        return {
            page: 1,
            loadingPercentage: 0,
            loadingIconShouldOut: false,
            isLoading: true,
            fansList: [],
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'accentColor', 'colorMode']),
    },
    async created() {
        let t1 = setInterval(() => {
            this.loadingPercentage += 1
        }, 300)
        this.$http.get('/api/accounts/fans/').then((response) => {
            console.log(response);
            this.fansList = response.data.fans.map(fan => ({
                id: fan.id,
                name: fan.username,
                bio: fan.profile,
                avatarImg: fan.avatar,
                isFollowed: fan.is_followed,
            }));
            if (this.loadingPercentage >= 100) {
                clearInterval(t1)
                this.loadingIconShouldOut = true
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            } else {
                let t2 = setInterval(() => {
                    this.loadingPercentage += 10
                }, 50)
                setTimeout(() => {
                    clearInterval(t1)
                    clearInterval(t2)
                    this.loadingIconShouldOut = true
                    setTimeout(() => {
                        this.isLoading = false
                    }, 500)
                }, 1500)
            }
        });
    },
    methods: {
        follow(fan) {
            fan.isFollowed = !fan.isFollowed;
            if (fan.isFollowed) {
                this.unFollowUser(fan);
            } else {
                this.followUser(fan);
            }
        },
        followUser(user) {
            this.$http.post(`/api/follow/${user.id}/`).then((response) => {
                console.log(response);
            })
        },
        unFollowUser(user) {
            this.$http.post(`/api/follow/${user.id}/`).then((response) => {
                console.log(response);
            })
        }
    },
}
</script>
<style scoped>
.fan-list-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    /* text-align: center; */
}

.loading-animate {
    padding-top: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
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