<script>
import listTableBody from "./ListTableBody.vue";
import { Rows } from "../ImageTable/ImageRowData.js";
import "animate.css";
export default {
    data() { },
    methods: {
        //喜欢全部歌曲
        handleLikeAll(keys) {
            for (let i = 0; i < keys.length; i++) {
                this.handleLike(keys[i]);
            }
        },
        //喜欢单首歌曲
        handleLike(key) {
            this.songData[key].isLikeChanged = !this.songData[key].isLikeChanged;
            this.$http.post(`/api/like/${this.songData[key].id}/`);
            this.songData[key].isLiked = !this.songData[key].isLiked;
            this.cleanChangeReaction();
        },
        //收藏全部歌曲
        handleCollectAll(keys, listId) {
            for (let i = 0; i < keys.length; i++) {
                this.handleCollect(keys[i], listId);
            }
        },
        //收藏单首歌曲
        handleCollect(key, listId) {
            this.$http.post(`/api/favorite/${listId}/${this.songData[key].id}/`).then(() => {
                // this.songData[key].isCollected = true; //更改歌曲对应的收藏夹列表
                this.cleanChangeReaction();
            })
        },
        handleDeleteAll(keys) {//只在adminView有
            for (let i = 0; i < keys.length; i++) {
                this.songData[keys[i]].isDeleted = true
                this.$http.delete(`/api/music/delete/${this.songData[keys[i]].id}/`)
            }
            this.$emit('flushData')//只在adminView有用
            this.cleanChangeReaction()
        },
        handleDelete(key) {
            let id = this.songData[key].id;
            this.songData[key].isDeleted = true//只在adminView有用
            this.$http.delete(`/api/music/delete/${this.songData[key].id}/`).then(() => {
                this.$emit('flushData')//只在adminView有用
                this.cleanChangeReaction()
            })
        },
        //在收藏夹页面，在本收藏夹重新收藏
        handleRecollect(key) {
            this.handleCollect(key, this.currentListId);
        },
        //在收藏夹区域，清空本收藏夹中的歌曲记录
        //注意，在收藏夹中，星星的颜色应该和歌曲是否存在于该收藏夹有关
        handleDiscollectOnCollection(key) {
            //todo:提交到服务端
            this.$http.post(`/api/unfavorite/${this.currentListId}/${this.songData[key].id}/`).then(() => {
                this.songData[key].isCollected = false;
                //更新"是否收藏"选项
                this.cleanChangeReaction();
            })
        },
        cleanChangeReaction() {
            this.$emit("update:songData", this.songData);
            setTimeout(() => {
                for (let i = 0; i < this.songData.length; i++) {
                    this.songData[i].isLikeChanged = false;
                    this.songData[i].isCollectChanged = false;
                }
            }, 300);
        },

    },
    props: {
        songData: {
            type: Array,
            default: [],
        },
        //公开页面、收藏夹页面
        position: {
            type: String,
            require: true,
            default: "CollectionView",
            validator: (value) => {
                return ["CollectionView", "PublicView"].includes(value);
            },
        },
        viewMode: {
            type: String,
            default: "user",
            validator: (value) => {
                return ["user", "admin"].includes(value);
            },
        },
        //若将本页面用于收藏夹页面，需要提供收藏夹的Id
        currentListId: {
            type: Number,
            validator: (value) => {
                return value >= 0
            },
        }
    },
    emits: ["update:songData"],
};
</script>
<template>
    <list-table-body v-if="songData.length !== 0" :currentListId="currentListId" @likeAll="handleLikeAll" @like="handleLike"
        @collectAll="handleCollectAll" @collect="handleCollect" :viewMode="viewMode" :position="position"
        @discollectOnCollection="handleDiscollectOnCollection" :songData="songData" @recollect="handleRecollect"
        @delete="handleDelete" @deleteAll="handleDeleteAll" :style="{
            // animation: 'fadeInLeft',
            // 'animation-duration': '1.5s',
        }">
    </list-table-body>
</template>
<style scoped>
list-table-body {
    transition: opacity cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}
</style>
