<script>
import listTableBody from './ListTableBody.vue'
export default {
    data() {
        return {
            songData: [{
                key: 0,
                name: '只因你太美',
                singer: '蔡只因',
                length: '3:40',
                isLiked: false,
                isCollected: false,
                CollectedLists: [],
                imgSrc: "/src/assets/song5.png"
            },
            {
                key: 1,
                name: '给自己的情书',
                singer: '王菲',
                length: '4:05',
                isLiked: false,
                isCollected: false,
                CollectedLists: [],
                imgSrc: "/src/assets/song2.jpg"
            }, {
                key: 2,
                name: 'Yesterday Once More',
                singer: 'Carpenters',
                length: '4:24',
                isLiked: false,
                isCollected: false,
                CollectedLists: [],
                imgSrc: "/src/assets/song3.jpg"
            }, {
                key: 3,
                name: '守时',
                singer: '王菲',
                length: '3:56',
                isLiked: false,
                isCollected: false,
                CollectedLists: [],
                imgSrc: "/src/assets/song4.jpg"
            },],
            currentListId: 0//当前所在的收藏夹ID
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
                this.handleCollect(keys[i],listId)
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
            this.handleCollect(key,this.currentListKey)
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
                return ['CollectionView','PublicView'].includes(value)
            }
        }
    }

}
</script>

<template>
    <list-table-body :currentListId="currentListId" @likeAll="handleLikeAll" @like="handleLike" @collectAll="handleCollectAll" @collect="handleCollect"
        :songData="songData" :viewMode="viewMode" :position="position" @discollectOnPublic="handleDiscollectOnPublic"
        @discollectOnCollection="handleDiscollectOnCollection" @recollect="handleRecollect"></list-table-body>
</template>