<script>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import { defineComponent } from 'vue';
    import { useMessage } from "naive-ui";
    import { ChevronBack, StarOutline, FitnessOutline, WarningOutline, ChatbubbleEllipsesOutline, TrashOutline, CreateOutline } from '@vicons/ionicons5';
    dayjs.extend(relativeTime);
    export default defineComponent({
        name: 'PlayerView',
        components: {
            ChevronBack,
            StarOutline,
            FitnessOutline,
            WarningOutline,
            ChatbubbleEllipsesOutline,
            TrashOutline,
            CreateOutline,
        },
        setup() {
            const message = useMessage();
            return {
                handlePositiveClick() {
                    message.info("该评论已删除");
                },
                handleNegativeClick() {
                    message.info("取消");
                },
                dayjs,
                value: ref(null),
            };
        },
        data() {
            return {
                id: 0,
                page: 1,
                comments:[
                    {
                        id: 1,
                        author: "Iris",
                        avatar: '/src/assets/song4.jpg',
                        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
                    },
                    {
                        id: 2,
                        author: "zjq",
                        avatar: "/src/assets/song6.jpg",
                        content: "这是我的评论评论评论评论评论评论"
                    },
                    {
                        id: 3,
                        author: "中文试一下",
                        avatar: "/src/assets/song1.jpg",
                        content: "这是很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论很多行评论"
                    },
                ]
            }
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
            getImageUrl(url) {
                return new URL(url, import.meta.url).href;
            },
            cleanComment() {
                this.value=""
            },
            sendComment() {
                //todo
            },
            deleteMyComment() {
                //todo
            },
            editMyComment() {
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
                                    <span style="font-size: 22px;">
                                        全部评论
                                    </span>
                                </n-gi>
                                <n-gi :span="1">
                                    <n-icon size="27"><ChatbubbleEllipsesOutline/></n-icon>
                                </n-gi>
                            </n-grid>
                        </span>
                    </template>
                        <div>
                            <n-input
                            style="margin-bottom: 15px;"
                            maxlength="200" 
                            show-count
                            placeholder="我的评论"
                            type="textarea"
                            v-model:value="value"
                            :style="{'--n-border-radius' : `10px`}"
                            :autosize="{
                                minRows: 6,
                                maxRows: 6
                            }"/>
                            <div class="my-comment-button">
                                <n-button class="clean-button" strong secondary type="tertiary" @click="cleanComment()">
                                清空
                                </n-button>
                                <n-button calss="send-button" strong secondary type="tertiary" @click="sendComment()">
                                发送
                                </n-button>
                            </div>
                        </div>
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
                <div v-for="comment in comments">
                    <a-comment>
                        <template #actions>
                            <span key="edit-comment">
                                <span style="padding-left: 855px; cursor: auto">
                                    <n-popover trigger="hover">
                                        <template #trigger>
                                        <n-icon size="18" @click="editMyComment()">
                                        <CreateOutline/>
                                        </n-icon>
                                        </template>
                                        <span>编辑我的评论</span>
                                    </n-popover>
                                </span>
                            </span>
                            <span key="delete-comment">
                                <span style="padding-left: 3px; cursor: auto">
                                    <n-popconfirm
                                        @positive-click="handlePositiveClick"
                                        @negative-click="handleNegativeClick"
                                    >
                                    <template #trigger>
                                    <n-icon size="18" @click="deleteMyComment()">
                                    <TrashOutline/>
                                    </n-icon>
                                    </template>
                                    确认删除这条评论吗？
                                    </n-popconfirm>
                                </span>
                            </span>
                        </template>
                        <template #author><a style="font-size: 18px;">{{ comment.author }}</a></template>
                        <template #avatar>
                            <a-avatar src="/src/assets/song4.jpg" :size="50"/>
                        </template>
                        <template #content>
                        <p style="font-size: 13.5px; margin-top: 8px; margin-bottom: 0px;">
                            {{ comment.content }}
                        </p>
                        </template>
                        <template #datetime>
                        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                            <span style="margin-bottom: 0; font-size: 10px;">{{ dayjs().fromNow() }}</span>
                            
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
    padding-bottom: 5px;
}
:deep(.ant-comment-actions) {
    margin-top: 0;
}
.edit-comment {
    margin-top: 24px;
}
.clean-button {
    margin-right: 15px;
    margin-left: 849px;
}
.my-comment-button {
    margin-bottom: 30px;
}
</style>