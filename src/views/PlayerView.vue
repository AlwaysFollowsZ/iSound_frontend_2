<script>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import { defineComponent } from 'vue';
    import { NButton } from "naive-ui";
    import { ChevronBack, StarOutline, FitnessOutline, WarningOutline, ChatbubbleEllipsesOutline } from '@vicons/ionicons5';
    dayjs.extend(relativeTime);
    export default defineComponent({
        name: 'PlayerView',
        components: {
            ChevronBack,
            StarOutline,
            FitnessOutline,
            WarningOutline,
            ChatbubbleEllipsesOutline,
        },
        setup() {
            return {
                dayjs,
            };
        },
        data() {
            
        },
        methods: {
            back() {
                //todo
            },
            like() {
                //todo
            },
            collect() {
                //todo
            },
            complain() {
                //todo
            },
            comment() {
                //todo
            },
        }
    });
</script>

<template>
    <div class="player-page">
        <n-grid>
            <n-gi :span="4">
                <div>
                <n-button tertiary circle class="back-button" @click="back()">
                <ChevronBack style="width: 36px; position: absolute; left: 0px"/>
                </n-button>
            </div>
            </n-gi>
            <n-gi :span="7">
                <div class="music-cover">
                <n-image class="music-cover-img"
                    src="/src/assets/default-admin.jpg" 
                />
                </div>
                <div class="three-buttons">
                    <n-grid>
                        <n-gi :span="6"></n-gi>
                        <n-gi :span="4" style="margin: auto">
                            <span style="margin-right: 3px; margin-top: 2px;" >
                                <n-icon size="30" color="#ff69b4" @click="like()"><FitnessOutline/></n-icon>
                            </span>
                        </n-gi>
                        <n-gi :span="4" style="margin: auto">
                            <span style="margin-right: 3px; margin-top: 2px;">
                                <n-icon size="30" @click="collect()"><StarOutline/></n-icon>
                            </span>
                        </n-gi>
                        <n-gi :span="4" style="margin: auto">
                            <span style="margin-right: 3px; margin-top: 2px;">
                                <n-icon size="30" @click="complain()"><WarningOutline/></n-icon>
                            </span>
                        </n-gi>
                        <n-gi :span="6"></n-gi>
                    </n-grid>
                </div>
            </n-gi>
            <n-gi :span="10">
                <div class="lyrics-part">
                    <n-grid :y-gap="20" :cols="1">
                        <n-gi>
                            <div style="font-size:xx-large">歌曲名称</div>
                        </n-gi>
                        <n-gi>
                            <div>歌手：某某</div>
                        </n-gi>
                        <n-gi>
                            <div style="font-size: larger;">
                            我是一句歌词
                            </div>
                        </n-gi>
                    </n-grid>
                </div>    
            </n-gi>
            <n-gi :span="3"></n-gi>
        </n-grid>
    </div>
    <div class="edit-comment">
        <n-grid>
            <n-gi :span="4"></n-gi>
            <n-gi :span="16">
                <div>
                    <n-collapse>
                    <n-collapse-item  name="1">
                    <template #arrow><div style="color: white"></div></template>
                    <template #header>
                        <span style="margin-right: 3px; margin-top: 2px;">
                            <n-grid>
                                <n-gi :span="23">
                                    <span style="font-size: 24px;">
                                        全部评论
                                    </span>
                                </n-gi>
                                <n-gi :span="1">
                                    <n-icon size="30"><ChatbubbleEllipsesOutline/></n-icon>
                                </n-gi>
                            </n-grid>
                        </span>
                    </template>
                        <div>
                        <n-input
                        style="margin-bottom: 30px;"
                        placeholder="我的评论"
                        type="textarea"
                        :style="{'--n-border-radius' : `10px`}"
                        :autosize="{
                            minRows: 6,
                            maxRows: 6
                        }"/></div>
                    </n-collapse-item>
                    </n-collapse>
                    
                </div>
            </n-gi>
            <n-gi :span="4"></n-gi>
        </n-grid>
    </div>
    <div class="comments">
        <n-grid>
            <n-gi :span="4"></n-gi>
            <n-gi :span="16">
                <div>
                    <a-comment>
                        <template #author><a style="font-size: 20px;">Han Solo</a></template>
                        <template #avatar>
                            <a-avatar src="src/assets/song5.png" alt="Han Solo" :size="50"/>
                        </template>
                        <template #content>
                        <p style="font-size: 15px;">
                            We supply a series of design principles, practical patterns and high quality design
                            resources (Sketch and Axure), to help people create their product prototypes beautifully and
                            efficiently.
                        </p>
                        </template>
                        <template #datetime>
                        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                            <span style="margin-bottom: 0;">{{ dayjs().fromNow() }}</span>
                        </a-tooltip>
                        </template>
                    </a-comment>
                </div> 
            </n-gi>
            <n-gi :span="4"></n-gi>
        </n-grid>
    </div>
</template>
<style scoped>
.back-button {
    width: 40px;
    height: 40px;
    position: fixed;
    left: 20px;
    top: 20px;
}
.music-cover {
    /* position: absolute; */
    margin-top: 12%;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    overflow: hidden;
}
.music-cover-img {
    /* position: absolute; */
    margin: auto;
    width: 360px;
    height: 360px;
    border-radius: 50%;
}
.three-buttons {
    margin-top: 4%;
}
.button {
    margin: auto;
}
.lyrics-part {
    display: flex; 
    width: 500px;
    margin: auto;
    margin-top: 8%;
}
:deep(.ant-comment-avatar img) {
    width: 50px ;
    height: 50px ;
}
:deep(.ant-comment-content-author > span) {
    padding-right: 13px;
}
:deep(.ant-comment-content-author-time) {
    padding-top: 2px;
    font-size: 14px;
}
:deep(.n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main) {
    display: inline;
}
:deep(.n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner) {
    padding-top: 0;
}
:deep(.ant-comment-inner){
    padding-top: 0;
}
.edit-comment {
    margin-top: 24px;
}
</style>