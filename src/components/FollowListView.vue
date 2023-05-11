<template>
    <div class="follower-list-title">
        全部关注
        <n-divider />
    </div>
    <div class="follower-container" v-for="follower in followerList">
        <div class="follower-card">
            <n-grid x-gap="12">
                <n-gi :span="3"><img class="follower-card-image" :src="follower.avatarImg" /></n-gi>
                <n-gi :span="18">
                    <div class="follower-card-name">
                        {{ follower.name }}
                    </div>
                    <div class="follower-card-bio">
                        {{ follower.bio }}
                    </div>
                </n-gi>
                <n-gi span="3">
                    <n-button strong secondary round type="info" style="margin-top: 15px;">
                        已关注
                    </n-button>
                </n-gi>
            </n-grid>
            <n-divider dashed />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            followerList: [
                {
                    name: "iSound",
                    bio: "我是一个很固执的人，从来不管别人怎么说，怎么做。如果你也和我一样，那么这件事情就真的，泰！裤！辣！",
                    avatarImg: "/src/assets/avatar.jpg"
                },
                {
                    name: "周一行",
                    bio: "Hello World.",
                    avatarImg: "/src/assets/song4.jpg"
                },
                {
                    name: "王菲",
                    bio: "匆匆那年",
                    avatarImg: "/src/assets/song2.jpg"
                }
            ]
        }
    }
}
</script>
<style>
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