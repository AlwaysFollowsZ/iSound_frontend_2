<template>
    <div class="top-nav-container"><top-nav /></div>
    <div class="tag-view-container">
        <div class="tag-table-container">
            <tag-table :width="1400" :should-animate="false" />
        </div>
        <div class="tag-search-results">
            {{ this.songs.length }}
            <div v-for="(song, idx) in songs" :key="idx">
                <img :src="song.cover" class="song-cover" />
            </div>
        </div>
    </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import TagTable from '../components/tables/TagTable/TagTable.vue';
export default {
    name: "TagClickView",
    components: {
        TopNav,
        TagTable,
    },
    data() {
        return {
            songs: [],
        }
    },
    created() {
        const tagName = this.$route.params.tagName;
        this.$http.get(`/api/search/`, { params:  { 'tags': tagName } }).then((response) => {
            this.songs = response.data.music_set;
        });
    }
}
</script>
<style scoped></style>