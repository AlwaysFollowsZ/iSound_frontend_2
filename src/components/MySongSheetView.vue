<template>
    <div>
        <div class="my-song-sheet-title">
            全部收藏夹
        </div>
        <div style="text-align:center;position:relative"><image-table :position="'Collection'" :entrySize="[200, 200]"
                :rows="collectionData" @flushCollections="updateCollections"
                :handleClickEntry="clickCollection"></image-table></div>
    </div>
</template>
<script>
import 'animate.css'
import ImageTable from '/src/components/tables/ImageTable/ImageTable.vue';
export default {
    components: {
        ImageTable
    },
    data() {
        let collectionData = [];//收藏夹数据
        this.updateCollections()//获取收藏夹数据
        return {
            collectionData,
            songSheets: [
                {
                    imgSrc: "/src/assets/song1.jpg",
                    title: "陪你度过漫长岁月",
                    jumpLink: "1",
                    singer: "陈奕迅"
                },
                {
                    imgSrc: "/src/assets/song2.jpg",
                    title: "给自己的情书",
                    jumpLink: "2",
                    singer: "王菲"
                },
                {
                    imgSrc: "/src/assets/song3.jpg",
                    title: "Yesterday Once More",
                    jumpLink: "3",
                    singer: "Carpenters"
                },
                {
                    imgSrc: "/src/assets/song4.jpg",
                    title: "守时",
                    jumpLink: "4",
                    singer: "王菲"
                },
            ]
        }
    },
    methods: {
        clickCollection(Id) {
            this.$emit('exit')
            setTimeout(() => {
                this.$router.push(`/listdetail/${Id}`)
            }, 900);
        },//点击收藏夹。这时候应该跳转到收藏夹详情页面
        updateCollections() {
            this.$http.get('/api/playlist/of/0/').then((response) => {
                let key = 0
                console.log('update:content=' + response.data.playlist_set)
                if (response.data.playlist_set.length == 0) {
                    this.collectionData = []
                    return
                }
                this.collectionData = response.data.playlist_set.map((collection) => {
                    return {
                        Key: key++,
                        Id: collection.id,
                        imagePath: collection.cover,
                        Name: collection.title,
                        songCount: collection.music_set.length,
                        Type: 'Collection'
                    }
                })
                console.log('cod' + JSON.stringify(response.data))
            })//更新当前用户的收藏夹数据
        },
    }
}
</script>
<style scoped>
.my-song-sheet-title {
    /* animation: slideInLeft;
    animation-duration: 0.5s; */
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
}

.single-card-container {
    max-width: 180px;
    padding-top: 3%;
    padding-bottom: 3%;
    word-wrap: break-word;
}

.single-card-img-container {
    width: 330px;
    height: 200px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}

.single-card-img {
    width: 100%;
    height: 100%;
}

.single-card-info-name {
    font-size: medium;
    font-weight: 700;
}

.single-card-info-singer {
    font-size: small;
    font-weight: 500;
    color: grey;
}
</style>