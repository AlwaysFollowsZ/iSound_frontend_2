<template>
    <div class="history-page">
        <div class="user-page-TopNav"><top-nav></top-nav></div>
        <div class="page-title"></div>
        <div class="page-body">
            <div class="page-body-icon" style="width: 30px">
                <alarm />
            </div>
            <span>历史记录</span>
            <div class="page-body-list">
                <div v-if="historyNowCount !== 0">
                    <n-grid :x-gap="12">
                        <n-gi :span="4"></n-gi>
                        <n-gi :span="16">
                            <n-timeline>
                                <n-timeline-item v-for="(item, index) in historyData" :key="index" type=""
                                    :content="item.content" :time="item.date.replace('T', ' ').split('.')[0]"
                                    line-type="dashed">
                                    <n-grid :x-gap="12">
                                        <n-gi :span="3">
                                            <img class="song-image" :src="item.music.cover" @click="playMusic(item.music.id)"/>
                                        </n-gi>
                                        <n-gi :span="21">
                                            <div class="song-detail-card" @click="playMusic(item.music.id)">
                                                <span class="song-name">
                                                    {{ item.music.name }}
                                                </span><br />
                                                <span class="song-singer">
                                                    {{ item.music.artist }}
                                                </span><br />
                                                <span class="song-upload-username">
                                                    {{ item.music.up }}
                                                </span>
                                                <span class="song-tags">
                                                    <!-- {{ item.tags }} -->
                                                    流行乐
                                                </span>
                                            </div>
                                        </n-gi>
                                    </n-grid>
                                    <a-divider
                                        style="height: 1px; background-color: #dddddd; position: absolute; button: 0;" />
                                </n-timeline-item>
                            </n-timeline>
                        </n-gi>
                        <n-gi :span="4"></n-gi>
                    </n-grid>
                </div>
                <div v-else>
                    你还没有听歌记录。
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Alarm } from '@vicons/ionicons5';
export default {
    components: {
        Alarm,
    },
    data() {
        return {
            historyData: [],
            historyNowCount: 0,
        };
    },
    created() {
        this.$http.get(`api/music/record/`).then((response) => {
            this.historyData = response.data.record_set;
            this.historyNowCount = this.historyData.length;
        }); 
    },
    methods: {
        playMusic(musicId) {
            this.$EventBus.emit('play', musicId);
        }
    }
}
</script>
<style scoped>
.song-image {
    height: 100px;
    border-radius: 5px;
}

.song-name {
    font-size: 20px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
}

.song-singer {
    font-size: 16px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
}

.song-upload-username {
    font-size: 16px;
    font-family: SimSun, Song, STSong, '宋体', sans-serif;
    font-weight: bold;
    /* position: absolute;
    bottom: 0; */
}

.song-tags {
    font-size: 16px;
    font-family: SimSun, Song, STSong, '宋体', sans-serif;
    font-weight: bold;
    /* position: absolute;
    bottom: 0; */
}</style>