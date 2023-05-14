<template>
    <div class="fan-list-title">
        全部粉丝
        <n-divider />
    </div>
    <div class="fan-container" v-for="fan in fansList">
        <div class="fan-card">
            <n-grid x-gap="12">
                <n-gi :span="3"><img class="fan-card-image" :src="fan.avatarImg" /></n-gi>
                <n-gi :span="18">
                    <div class="fan-card-name">
                        {{ fan.name }}
                    </div>
                    <div class="fan-card-bio">
                        {{ fan.bio }}
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
            fansList: [
                {
                    name: "周一行",
                    bio: "Hello World.",
                    avatarImg: "/src/assets/song4.jpg"
                },
                {
                    name: "王菲",
                    bio: "匆匆那年",
                    avatarImg: "/src/assets/song2.jpg"
                },
                {
                    name: "iSound",
                    bio: "我是一个很固执的人，从来不管别人怎么说，怎么做。如果你也和我一样，那么这件事情就真的，泰！裤！辣！",
                    avatarImg: "/src/assets/default-admin.jpg"
                },
            ]
        }
    }
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