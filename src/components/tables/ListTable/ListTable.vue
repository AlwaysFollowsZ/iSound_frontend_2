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
            },]
        }
    },
    methods: {
        handleLikeAll(keys) {
            for (let i = 0; i < keys.length; i++) {
                this.songData[keys[i]].isLiked = !this.songData[keys[i]].isLiked
                this.songData[keys[i]].isLikeChanged = true
            }
            this.cleanChangeReaction()
        },
        handleLike(key) {
            this.songData[key].isLiked = !this.songData[key].isLiked
            this.cleanChangeReaction()
        },
        handleCollectAll(keys) {
            for (let i = 0; i < keys.length; i++) {
                this.songData[keys[i]].isCollected = !this.songData[keys[i]].isCollected
                this.songData[keys[i]].isCollectChanged = true
            }
            this.cleanChangeReaction()
        },
        handleCollect(key) {
            this.songData[key].isCollected = !this.songData[key].isCollected
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
    }

}
</script>

<template>
    <list-table-body @likeAll="handleLikeAll" @like="handleLike" @collectAll="handleCollectAll" @collect="handleCollect"
        :songData="songData" :viewMode="viewMode"></list-table-body>
</template>