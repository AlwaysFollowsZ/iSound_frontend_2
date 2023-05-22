<script>
import listTableBody from './ListTableBody.vue'
import 'animate.css'
export default {
    mounted() {
        let key = 0;
        if (this.position === 'CollectionView') {
            this.$http.get(`/api/playlist/detail/${this.currentListId}`).then((response) => {
                this.songData = response.data.music_set.map((music) => ({
                    key: key++,
                    id: music.id,
                    name: music.name,
                    singer: music.artist,
                    length: music.duration,
                    isliked: music.is_like,
                    isCollected: music.is_favorite,
                    imgSrc: music.cover,
                }));
                this.isReady = true;
            });
        }
        else if (this.position === 'PublicView') {//公开页面,假设获取所有歌曲
            this.$http.get(`/api/index/`).then((response) => {
                this.songData = response.data.music_set.map((music) => ({
                    key: key++,
                    id: music.id,
                    name: music.name,
                    singer: music.artist,
                    length: music.duration,
                    isliked: music.is_like,
                    isCollected: music.is_favorite,
                    imgSrc: music.cover,
                }));
                this.isReady = true;
            });
        }
        else {//用户的播放记录
            
        }
    },
    data() {
        return {
            songData: [],
            isReady: false
        }
    },
    methods: {
        //喜欢全部歌曲
        handleLikeAll(keys) {
            for (let i = 0; i < keys.length; i++) {
                this.handleLike(keys[i])
            }
        },
        //喜欢单首歌曲
        handleLike(key) {
            this.songData[key].isLikeChanged = true
            this.songData[key].isLiked = !this.songData[key].isLiked
            this.cleanChangeReaction()
        },
        //收藏全部歌曲
        handleCollectAll(keys, listId) {//将选中的歌曲添加到listId中
            for (let i = 0; i < keys.length; i++) {
                this.handleCollect(keys[i], listId)
            }
        },
        //收藏单首歌曲
        handleCollect(key, listId) {
            if (this.songData[key].CollectedLists.indexOf(listId) < 0) {
            this.songData[key].CollectedLists.push(listId)
            this.songData[key].isCollected = true//更改歌曲对应的收藏夹列表
            }
            this.cleanChangeReaction()
        },
        handleRecollect(key) {
            this.handleCollect(key, this.currentListId)
        },
        //在公共区域，清空所有对应收藏夹中的歌曲记录
        handleDiscollectOnPublic(key) {
            this.songData[key].CollectedLists = []
            this.songData[key].isCollected = false
            this.cleanChangeReaction()
        },
        //在收藏夹区域，清空本收藏夹中的歌曲记录
        handleDiscollectOnCollection(key) {
            this.songData[key].CollectedLists = this.songData[key].CollectedLists.filter((value) => value !== key)
            if (this.songData[key].CollectedLists.length === 0) {
                this.songData[key].isCollected = false
            }//更新"是否收藏"选项
            console.log(this.songData[key].CollectedLists);
            this.cleanChangeReaction()
        },
        cleanChangeReaction() {
            setTimeout(() => {
                for (let i = 0; i < this.songData.length; i++) {
                    this.songData[i].isLikeChanged = false
                    this.songData[i].isCollectChanged = false
                }
            }, 500)
        }
    },
    props: {
        position: {
            type: String,
            require: true,
            default: 'CollectionView',
            validator: (value) => {
                return ['CollectionView', 'PublicView','RecordView'].includes(value)
            }
        },
        //若在CollectionView,请传入所在的收藏夹ID
        currentListId: {
            type: Number,
        },
        //若在PublicView,请传入本歌曲需要显示的参数，数组形式
        publicSpace: {
            type:Array
        }
    }

}
</script>
<template>
    <template v-if="isReady === true">
        <list-table-body :currentListId="currentListId" @likeAll="handleLikeAll" @like="handleLike"
            @collectAll="handleCollectAll" @collect="handleCollect" :songData="songData" :viewMode="viewMode"
            :position="position" @discollectOnPublic="handleDiscollectOnPublic"
            @discollectOnCollection="handleDiscollectOnCollection" @recollect="handleRecollect" :style="{
                'animation': isReady === true ? 'fadeInUp' : 'none',
                'animation-duration': '2s',
            }"></list-table-body>
    </template>

    <template v-else>
        <div class="unready_box"></div>
    </template>
</template>
<style scoped>
list-table-body {
    transition: opacity cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}

.unready_box {
    height: 300px;
}
</style>