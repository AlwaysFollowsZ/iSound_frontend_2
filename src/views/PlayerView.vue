<script>
    import 'animate.css' 
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import { defineComponent, ref } from 'vue';
    import { ChevronBack, StarOutline, FitnessOutline, WarningOutline, ChatbubbleEllipsesOutline, TrashOutline, CreateOutline, Fitness, Star, Warning } from '@vicons/ionicons5';
    dayjs.extend(relativeTime);
    import {globalThemeColor,getBackgroundColorString,getRGBString, changeThemeColorByImage} from '/src/colorMode.js'
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
            Fitness,
            Star,
            Warning,
        },
        created() {
            this.$watch(
                () => this.$route.params,
                () => {
                    const musicId = this.$route.params.musicId;
                    this.$http.get(`/api/music/detail/${musicId}/`).then((response) => {
                        this.music = response.data.music_set[0];
                        console.log(this.music.cover);
                        changeThemeColorByImage(this.music.cover)
                    });
                    this.$http.get(`/api/comment/of/${musicId}/`).then((response) => {
                        this.comments = response.data.comment_set;
                    });
                },
                { immediate: true },
            );
        },
        setup() {
            return {
                handlePositiveClick(comment) {
                    // alert("该评论已删除");
                    console.log(comment.content.length);
                    const index = this.comments.findIndex(cmt => cmt.id === comment.id);
                    if (index !== -1) {
                        this.comments.splice(index, 1);
                    }
                    if ((this.page - 1) * 5 >= this.comments.length) {
                        this.page -= 1;
                    }
                },
                handleNegativeClick() {
                    // alert("取消");
                },
                dayjs,
                value: ref(null),
                islike: ref(false),
                iscollect: ref(false),
                iscomplain: ref(false),
            };
        },
        data() {
            return {
                id: 0,
                page: 1,
                comments: [],
                music: {},
                getRGBString,
                backgroundColorString: getBackgroundColorString(globalThemeColor,225),
            }
        },
        computed: {
            num1() {
                return 5*(this.page-1);
            },
            num2() {
                return 5*(this.page-1) + ((5*this.page>this.comments.length) ? (this.comments.length%5) : 5);
            },
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            like() {
                //todo
                this.islike = !this.islike;
            },
            collect() {
                //todo
                this.iscollect = !this.iscollect;
            },
            complain() {
                //todo
                this.iscomplain = !this.iscomplain;
            },
            // getImageUrl(url) {
            //     return new URL(url, import.meta.url).href;
            // },
            cleanComment() {
                this.value="";
            },
            sendComment() {
                const musicId = this.$route.params.musicId;
                let formData = new FormData();
                formData.append('content', this.value);
                this.$http.post(`/api/comment/on/${musicId}/`, formData).then((response) => {
                    console.log(response.data);
                });
            },
            deleteMyComment() {
                //todo
            },
            editMyComment(comment) {
                // alert("yes!");
                this.value=comment.content;
                document.querySelector('#comment-top').scrollIntoView({
                    behavior: 'smooth'
                });
                if (document.querySelector('.n-input-wrapper') == null) {
                    document.querySelector('#comment-fold').click();
                }
            },
        }
    });
</script>

<template>
    <div class="player-page" id="top" :style="{
        'background-color':getRGBString(backgroundColorString,0.7)
        }">
        <n-grid>
            <n-gi :span="4">
                <div>
                <n-button tertiary circle class="back-button" @click="back">
                <ChevronBack style="width: 36px; position: absolute; left: 0px"/>
                </n-button>
            </div>
            </n-gi>
            <n-gi :span="7">
                <div class="music-cover">
                <n-image class="music-cover-img"
                    :src="music.cover" 
                />
                </div>
                <div class="three-buttons">
                    <n-grid>
                        <n-gi :span="6"></n-gi>
                        <n-gi :span="4" style="margin: auto">
                            <span style="margin-right: 3px; margin-top: 2px;" >
                                <n-icon v-if="islike" size="30" color="#ff69b4" @click="like" class="animate__animated animate__heartBeat"><Fitness/></n-icon>
                                <n-icon v-else size="30" @click="like"><FitnessOutline/></n-icon>
                            </span>
                        </n-gi>
                        <n-gi :span="4" style="margin: auto">
                            <span style="margin-right: 3px; margin-top: 2px;">
                                <n-icon v-if="iscollect" size="30" color="#FFD700" @click="collect" class="animate__animated animate__flash"><Star/></n-icon>
                                <n-icon v-else size="30" @click="collect"><StarOutline/></n-icon>
                            </span>
                        </n-gi>
                        <n-gi :span="4" style="margin: auto">
                            <span style="margin-right: 3px; margin-top: 2px;">
                                <n-icon v-if="iscomplain" size="30" color="#DC143C" @click="complain" class="animate__animated animate__headShake"><Warning/></n-icon>
                                <n-icon v-else size="30" @click="complain"><WarningOutline/></n-icon>
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
                            <div style="font-size:xx-large">{{ music.name }}</div>
                        </n-gi>
                        <n-gi>
                            <div>歌手：{{ music.artist }}</div>
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
                    <n-collapse-item >
                    <template #arrow><div style="color: white"></div></template>
                    <template #header>
                        <span style="margin-right: 3px; margin-top: 2px;">
                            <n-grid>
                                <n-gi :span="23" id="comment-top">
                                    <span style="font-size: 22px;">
                                        全部评论
                                    </span>
                                </n-gi>
                                <n-gi :span="1" style="padding-top: 5px;">
                                    <n-icon id="comment-fold" size="27"><ChatbubbleEllipsesOutline /></n-icon>
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
                                <n-button class="clean-button" strong secondary type="tertiary" @click="cleanComment">
                                清空
                                </n-button>
                                <n-button calss="send-button" strong secondary type="tertiary" @click="sendComment">
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
    <a-divider style="height: 1.8px; background-color: #dddddd"/>
    <div class="comments">
        <n-grid>
            <n-gi :span="4"></n-gi>
            <n-gi :span="16">
                <div v-for="(comment, idx) in comments.slice( num1, num2 )"
                    
                :key="idx">
                    <a-comment>
                        <template #actions>
                            <span key="edit-comment">
                                <span style="padding-left: 860px; cursor: auto">
                                    <n-popover trigger="hover">
                                        <template #trigger>
                                        <n-icon size="18" @click="editMyComment(comment)">
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
                                        @positive-click="handlePositiveClick(comment)"
                                        @negative-click="handleNegativeClick"
                                    >
                                    <template #trigger>
                                    <n-icon size="18" @click="deleteMyComment">
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
                            <a-avatar :src="comment.avatar" :size="50"/>
                        </template>
                        <template #content>
                        <p style="font-size: 13.5px; margin-top: 8px; margin-bottom: 0px;">
                            {{ comment.content }}
                        </p>
                        </template>
                        <template #datetime>
                        <a-tooltip :title="comment.date.replace('T', ' ').split('.')[0]">
                            <span style="margin-bottom: 0; font-size: 10px;">
                                {{ dayjs(comment.date.replace('T', ' ').split('.')[0]).fromNow() }}
                            </span>
                        </a-tooltip>
                        </template>
                    </a-comment>
                </div> 
                <div class="card-pagination">
                    <n-grid>
                        <n-gi :span="8"></n-gi>
                        <n-gi :span="8">
                        <div style="display: flex; justify-content: center;" v-if="comments.length > 0">
                            <n-pagination v-model:page="page" :page-count="Math.ceil(comments.length / 5)" />
                        </div>
                        <div style="display: flex; justify-content: center; font-size: 20px" v-else>
                            期待你的评论！
                        </div>
                        </n-gi>
                        <n-gi :span="8"></n-gi>
                    </n-grid>
                </div>
            </n-gi>
            <n-gi :span="4"></n-gi>
        </n-grid>
    </div>
        
    
</template>

<style scoped>
.player-page{
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}
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

.ant-divider-horizontal {
    display: flex;
    clear: both;
    width: 984px;
    min-width: 984px;
    margin-top: 0;
    margin-bottom: 30px;
    margin-left: 244px;
    margin-right: 244px;
}

.edit-comment {
    margin-top: 24px;
}
.clean-button {
    margin-right: 15px;
    margin-left: 853px;
}
.my-comment-button {
    margin-bottom: 15px;
}

.html {
    scroll-behavior: smooth;
}
</style>