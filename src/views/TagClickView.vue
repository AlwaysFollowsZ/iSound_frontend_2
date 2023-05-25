<template>
    <div class="top-nav-container"><top-nav /></div>
    <div class="tag-view-container">
        <div class="tag-table-container">
            <!-- <tag-table /> -->
        </div>
        <div class="tag-search-results>">
            <div v-for="item in this.songs">
                {{ item.name }}
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
            name: '',
        }
    },
    create() {
        this.$watch(
            () => this.$route.params.tagName,
            (newTagName) => {
                this.$http.get('/api/search/', { params: { 'tags': newTagName } }).then((response) => {
                    this.songs = response.data.music_set;
                    console.log(response);
                });
            },
            { immediate: true }
        );
    }
}
</script>
<style scoped></style>