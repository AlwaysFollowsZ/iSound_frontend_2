<template>
    <div class="history-page">
        <div class="user-page-TopNav"><top-nav></top-nav></div>
        <div class="page-title-container">
            <n-grid>
                <n-gi :span="2"></n-gi>
                <n-gi :span="20">
                    <div class="page-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                        历史记录：{{ this.historyPrompt[Math.floor(Math.random() * this.historyPrompt.length)]}}
                    </div>
                </n-gi>
                <n-gi :span="2"></n-gi>
            </n-grid>
            
        </div>
        <div class="loading-animate" v-if="isLoading">
            <n-progress 
                style="height: 200px; width: 200px"
                class="animate__animated"
                type="circle" 
                :percentage="loadingPercentage" 
                rail-color="lightgrey" 
                :style="{
                    '--n-fill-color': 
                        (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                        'grey' :
                        'rgb(' + this.accentColor + ')',
                }"
                :class="[`${this.loadingIconShouldOut ? 'animate__zoomOut' : 'animate__zoomIn'}`]"
            >
                <template #default>
                    <div v-if="this.loadingPercentage < 95">
                        <n-icon size="60" 
                            :color="
                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                'grey' :
                                'rgba(' + this.accentColor + ', 0.7)'"
                            :class="{'animate__animated animate__slideInLeft': (this.loadingPercentage > 96)}"
                        >
                            <musical-notes-outline/>
                        </n-icon>
                    </div>
                    <div v-else>
                        <n-icon size="70" color="#63e2b8" class="animate__animated animate__zoomIn">
                            <checkmark-circle-outline/>
                        </n-icon>
                    </div>
                </template>
            </n-progress>
        </div>
        <div class="page-body" v-else>
            <!-- <div class="page-body-icon" style="width: 30px">
                <alarm />
            </div> -->
            <div class="page-body-list" v-if="historyNowCount !== 0">
                <div >
                    <n-grid :x-gap="12">
                        <n-gi :span="4"></n-gi>
                        <n-gi :span="16">
                            <n-timeline>
                                <n-timeline-item 
                                    v-for="(item, index) in historyData" 
                                    :key="index" 
                                    type=""
                                    :content="item.content" :time="item.date.replace('T', ' ').split('.')[0]"
                                    line-type="dashed"
                                    class="animate__animated animate__fadeInDown"
                                    :style="{
                                        'animation-delay': `${0.3 + index * 0.05}s`,
                                        '--n-line-color': 'rgba(' + this.accentColor + ', 0.55)',
                                        '--n-circle-border': '2px solid rgba(' + this.accentColor + ', 0.85)',
                                        '--n-meta-text-color': 'rgba(' + this.accentColor + ', 0.95)'
                                    }"
                                >
                                    <n-grid :x-gap="12">
                                        <n-gi :span="3">
                                            <img 
                                                class="song-image" 
                                                :src="item.music.cover" 
                                                @click="playMusic(item.music.id)"
                                            />
                                        </n-gi>
                                        <n-gi :span="21">
                                            <div 
                                                class="song-detail-card" 
                                                @click="playMusic(item.music.id)"
                                            >
                                                <div class="song-name" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                                    {{ item.music.name }}
                                                </div>
                                                <div class="song-singer" :style="{'color': this.colorMode === 'white' ? 'grey' : 'lightgrey'}">
                                                    {{ item.music.artist }}
                                                </div>
                                                <span class="song-upload-username" :style="{'color': this.colorMode === 'white' ? 'grey' : 'lightgrey'}">
                                                    {{ item.music.up.username }}
                                                </span>
                                                <span class="song-tags" :style="{'color': this.colorMode === 'white' ? 'grey' : 'lightgrey'}">
                                                    {{ item.music.tags }}
                                                </span>
                                            </div>
                                        </n-gi>
                                    </n-grid>
                                    <a-divider
                                        style="height: 1px; position: absolute; button: 0;" 
                                        :style="{'background-color': 'rgba(' + this.accentColor + ', 0.7)'}"
                                    />
                                </n-timeline-item>
                            </n-timeline>
                        </n-gi>
                        <n-gi :span="4"></n-gi>
                    </n-grid>
                </div>
            </div>
            <div v-else>
                <div class="no-history-container animate__animated animate__zoomIn" 
                    :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}"
                >
                    你还没有听歌记录
                </div>
                <div style="padding-left: 8%; font-size: 30px; font-weight: bold; margin-top: 1%;margin-bottom: 1%; animation-delay: 0.3s"
                    :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}"
                    class="animate__animated animate__slideInLeft"
                >
                    为你推荐
                </div>
                <div><recommend-for-you/></div>
            </div>
        </div>
    </div>
</template>
<script>
import { Alarm, MusicalNotesOutline, CheckmarkCircleOutline } from '@vicons/ionicons5';
import RecommendForYou from '/src/components/RecommendForYou.vue'
import { mapState } from 'vuex'
import 'animate.css'
export default {
    name: 'HistoryView',
    components: {
        Alarm,
        MusicalNotesOutline,
        CheckmarkCircleOutline,
        RecommendForYou,
    },
    computed: {
        ...mapState(['isLoggedIn', 'accentColor', 'colorMode']),
    },
    data() {
        return {
            historyData: [],
            historyNowCount: 0,
            loadingPercentage: 0,
            loadingIconShouldOut: false,
            isLoading: true,
            historyPrompt: [
                '寻觅音符的足迹',
                '记录美好的音符瞬间',
                '时光中的和音密码',
                '沉淀的回忆',
                '声音跨越时空的旅程',
                '谱写音符的流年记忆',
                '倾听心灵的旅途',
            ],
        };
    },
    async created() {
        let t1 = setInterval(() => {
            this.loadingPercentage += 1
        }, 300)
        this.$http.get(`/api/music/record/`).then((response) => {
            this.historyData = response.data.record_set
            this.historyNowCount = this.historyData.length
            if (this.loadingPercentage >= 100) {
                clearInterval(t1)
                this.loadingIconShouldOut = true
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            } else {
                let t2 = setInterval(() => {
                    this.loadingPercentage += 10
                }, 50)
                setTimeout(() => {
                    clearInterval(t1)
                    clearInterval(t2)
                    this.loadingIconShouldOut = true
                    setTimeout(() => {
                        this.isLoading = false
                    }, 500)
                }, 1500)
        }
    });
        // try {
        //     const response = await this.$http.get(`api/music/record/`);
        //     this.historyData = response.data.record_set;
        //     this.historyNowCount = this.historyData.length;
        //    // alert('数据获取成功');
        // } catch (error) {
        //     console.error('数据获取失败', error);
        // }
        
            
        
        
    },
    mounted() {
                // while (this.loadingPercentage <= 100) {
                //     setTimeout(() => {
                //         this.loadingPercentage += 5
                //     }, 100)
                // }
            
            
    },
    // created() {
        // this.$http.get(`api/music/record/`).then((response) => {
        //     this.historyData = response.data.record_set;
        //     this.historyNowCount = this.historyData.length;
        // }); 
    // },
    methods: {
        playMusic(musicId) {
            this.$EventBus.emit('play', musicId);
        },
    }
}
</script>
<style scoped>
.page-title-container {
    margin-bottom: 1%;
}
.loading-animate {
    padding-top: 3%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.page-title {
    font-size: 35px;
    font-weight: bold;
}
.song-image {
    height: 100px;
    border-radius: 5px;
}

.song-name {
    font-size: 20px;
    padding-bottom: 1%;
    font-weight: bold;
}

.song-singer {
    font-size: 16px;
    font-weight: 420;
    padding-bottom: 1%;
}

.song-upload-username {
    font-size: 16px;
    font-weight: 350;
    /* position: absolute;
    bottom: 0; */
}

.song-tags {
    font-size: 16px;
    font-weight: 350;
    /* position: absolute;
    bottom: 0; */
}
.no-history-container {
    width: 100%;
    font-size: 25px;
    font-weight: 400;
    text-align: center;
}
</style>