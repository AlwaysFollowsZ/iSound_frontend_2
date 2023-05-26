<template>
    <div class="top-nav-container"><top-nav /></div>
    <div class="tag-view-container">
        <div class="tag-table-container">
            <tag-table :width="1400" :should-animate="false" />
        </div>
        <div class="tag-search-results">
            <list-table :position="'PublicView'" :viewMode="'user'" v-model:songData="songs"></list-table>
        </div>
    </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import TagTable from '../components/tables/TagTable/TagTable.vue';
import ListTable from "../components/tables/ListTable/ListTable.vue"
export default {
    name: "TagClickView",
    components: {
        TopNav,
        TagTable,
        ListTable,
    },
    data() {
        return {
            songs: [],
        }
    },
    created() {
        const tagName = this.$route.params.tagName;
        this.$http.get(`/api/search/`, { params: { 'tags': tagName } }).then((response) => {
            let i = 0;
            this.songs = response.data.music_set.map(song => ({
                key: i++,
                name: song.name,
                singer: song.artist,
                id: song.id,
                length: `${Math.floor(song.duration / 60)}`.padStart(2, '0') + ':' + `${Math.round(song.duration % 60)}`.padStart(2, '0'),
                imgSrc: song.cover,
                isLiked: song.is_like,
                isCollected: false,
                showCollection: false,
            }))
        });
    },
    watch: {
        '$route'() {
            window.location.reload();
        }
    }
}
</script>
<style scoped></style>