<template>
    <div class="fan-list-title">
        全部粉丝
    </div>
    <div class="loading-animate" v-if="isLoading">
        <n-progress style="height: 50px; width: 400px" class="animate__animated" type="line" :percentage="loadingPercentage"
            rail-color="lightgrey" :style="{
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
    <div class="fan-list-border animate__animated animate__slideInUp" style="animation-duration: 0.9s" v-else>
        <div class="fan-container" v-for="(fan, idx) in 
        fansList.slice(4 * (page - 1), 4 * (page - 1) + ((4 * page > fansList.length) ? (fansList.length % 4) : 4))"
            :key="idx">
            <div class="fan-card">
                <n-grid x-gap="12">
                    <n-gi :span="3"><span @click="jumpToFan(fan.id)" style="cursor:pointer">
                            <img class="fan-card-image" :src="fan.avatarImg" /></span></n-gi>
                    <n-gi :span="18">
                        <span style="cursor:pointer" @click="jumpToFan(fan.id)">
                            <div class="fan-card-name" :style="{ 'color': 'rgb(' + this.accentColor + ')' }">
                                {{ fan.name }}
                            </div>
                        </span>
                        <div class="fan-card-bio">
                            <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false">
                                <div style="word-wrap: break-word;">
                                    <span>
                                        {{ fan.bio }}
                                    </span>
                                </div>
                            </n-ellipsis>
                        </div>
                    </n-gi>
                    <n-gi span="3">
                        <n-popconfirm v-if="fan.isFollowed" @positive-click="follow(fan)" positive-text="确认"
                            negative-text="取消" :style="{
                                '--n-text-color': this.colorMode === 'white' ? 'rgb(57,57,57)' : 'white',
                                '--n-color': this.colorMode === 'white' ? '#fff' : 'rgb(72,72,72)',
                                '--n-border-radius': '12px',
                            }" :negative-button-props="{
    style: {
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
}" :positive-button-props="{
    style: {
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
}">
                            <template #trigger>
                                <n-button strong secondary round type="info" style="margin-top: 15px;" :style="{
                                    '--n-color': 'rgba(' + this.accentColor + ', 0.3)',
                                    '--n-color-hover': 'rgba(' + this.accentColor + ', 0.5)',
                                    '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.5)',
                                    '--n-color-focus': 'rgba(' + this.accentColor + ', 0.5)',
                                    '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-focus': 'rgba(' + this.accentColor + ', 1)',
                                }">
                                    已互粉
                                </n-button>
                            </template>
                            确定要取消关注该用户吗？
                        </n-popconfirm>
                        <n-button v-else strong secondary round style="margin-top: 15px;" @click="follow(fan)" :style="{
                            '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                            '--n-text-color-focus': 'rgba(' + this.accentColor + ', 1)',
                        }">
                            回关
                        </n-button>
                    </n-gi>
                </n-grid>
            </div>
        </div>
        <n-grid>
            <n-gi :span="8"></n-gi>
            <n-gi :span="8">
                <div style="display: flex; justify-content: center; margin-top: 0px;" v-if="fansList.length > 0">
                    <n-pagination v-model:page="page" :page-count="Math.ceil(fansList.length / 4)" :style="{
                        '--n-item-text-color-hover': 'rgb(' + this.accentColor + ')',
                        '--n-item-text-color-active': 'rgb(' + this.accentColor + ')',
                        '--n-item-text-color-pressed': 'rgb(' + this.accentColor + ')',
                        '--n-item-border-active': '1px solid rgb(' + this.accentColor + ')',
                        '--n-item-color-disabled': 'transparent',
                    }" />
                </div>
                <div class="no-result-info" v-else>
                    暂无粉丝
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
        },
        jumpToFan(id) {
            this.$emit('exit')
            setTimeout(() => {
                this.$router.push(`/home/user/${id}`)
            }, 900)
        }
    },
}
</script>
<style scoped>
.fan-list-title {
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

.fan-card {
    /* max-width: 400px; */
    /* padding-top: 3%;
    padding-bottom: 3%; */
    margin-bottom: 35px;
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

.no-result-info {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    text-align: center;
    opacity: 0.8;
    /* 不透明度 */
}
</style>