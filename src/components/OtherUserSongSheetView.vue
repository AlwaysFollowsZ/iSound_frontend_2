<template>
    <div class="song-sheet-title">
        全部歌单
    </div>
    <div class="song-sheet-body">
        <image-table :table-size="[1000,]" :position="PersonalView"></image-table>
    </div>
</template>
<script>
import ImageTableEntry from './tables/ImageTable/ImageTableEntry.vue';
export default {
    components: {
        ImageTableEntry,
    }
}
</script>
<style scoped>
.song-sheet-title {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
}
</style>