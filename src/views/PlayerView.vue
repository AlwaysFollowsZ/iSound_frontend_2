<script>
import "animate.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { defineComponent, ref } from "vue";
import {
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
  Play,
} from "@vicons/ionicons5";
dayjs.extend(relativeTime);
import {
  globalThemeColor,
  getBackgroundColorString,
  getRGBString,
  changeThemeColorByImage,
} from "/src/colorMode.js";
export default defineComponent({
  name: "PlayerView",
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
    Play,
  },
  created() {
    this.$EventBus.on("timeupdate", (currentTime) => {
      this.timeupdate(currentTime);
    });
    this.$watch(
      () => this.$route.params,
      () => {
        const musicId = this.$route.params.musicId;
        this.$http.get(`/api/music/detail/${musicId}/`).then((response) => {
          this.music = response.data.music_set[0];
          this.islike = this.music.is_like;
          this.iscollect = this.music.is_favorite;
          if (this.music.lrc != null) {
            this.$http.get(`${this.music.lrc}`).then((response) => {
              this.updateLyrics(response.data);
            });
          } else {
            this.updateLyrics("[00:00.000]暂无歌词");
          }
          changeThemeColorByImage(this.music.cover);
        });
        this.$http.get(`/api/comment/of/${musicId}/`).then((response) => {
          this.comments = response.data.comment_set;
        });
      },
      { immediate: true }
    );
  },
  setup() {
    return {
      handlePositiveClick(comment) {
        // alert("该评论已删除");
        // console.log(comment.content.length);
        const index = this.comments.findIndex((cmt) => cmt.id === comment.id);
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
      editCommentId: ref(0),
      islike: ref(false),
      iscollect: ref(false),
      iscomplain: ref(false),
      lyricsRef: ref(),
    };
  },
  data() {
    return {
      id: 0,
      page: 1,
      comments: [],
      music: {},
      lyricsIndex: 0,
      lyricsObjArr: [],
      hasTranslation: false,
      showTranslation: true,
      getRGBString,
      backgroundColorString: getBackgroundColorString(globalThemeColor, 225),
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    like() {
      this.islike = !this.islike;
      this.$http.post(`/api/like/${this.music.id}/`).then((response) => {
        console.log(response.data);
      });
    },
    collect() {
      //todo
      this.iscollect = !this.iscollect;
    },
    complain() {
      //todo
      this.iscomplain = !this.iscomplain;
    },
    cleanComment() {
      this.value = "";
    },
    sendComment() {
      let formData = new FormData();
      formData.append("content", this.value);
      if (this.editCommentId == 0) {
        this.$http
          .post(`/api/comment/on/${this.music.id}/`, formData)
          .then((response) => {
            console.log(response.data);
          });
      } else {
        this.$http
          .post(`/api/comment/edit/${this.editCommentId}/`, formData)
          .then((response) => {
            console.log(response.data);
          });
        this.editCommentId = 0;
      }
    },
    deleteMyComment(comment) {
      this.$http.delete(`/api/comment/delete/${comment.id}/`).then((response) => {
        console.log(response.data);
      });
    },
    editMyComment(comment) {
      // alert("yes!");
      this.value = comment.content;
      this.editCommentId = comment.id;
      document.querySelector("#comment-top").scrollIntoView({
        behavior: "smooth",
      });
      if (document.querySelector(".n-input-wrapper") == null) {
        document.querySelector("#comment-fold").click();
      }
    },
    parseTime(time) {
      const min = parseInt(time.match(/.*:/)[0].slice(0, 2));
      let sec = parseInt(time.match(/:.*\./)[0].slice(1, 3));
      const msIndex = time.match(/\./).index;
      const ms = time.slice(msIndex + 1);
      sec += min * 60;
      return Number(sec + "." + ms);
    },
    updateLyrics(lyrics) {
      this.lyricsObjArr = [];
      this.hasTranslation = false;
      const rows = lyrics.split(/\n/);
      rows.forEach((row) => {
        if (row == "") {
          return;
        }
        const obj = {};
        const time = row.match(/\[\d{2}:\d{2}.\d{2,3}\]/);
        if (time == null) {
          return;
        }
        obj.lyrics = row.split("]")[1].trim();
        obj.timeStr = time[0].slice(1, time[0].length - 1);
        obj.time = this.parseTime(obj.timeStr);
        if (
          this.lyricsObjArr.length > 0 &&
          obj.time <= this.lyricsObjArr[this.lyricsObjArr.length - 1].time
        ) {
          this.hasTranslation = true;
          for (let i = 0; i < this.lyricsObjArr.length; i++) {
            if (obj.time == this.lyricsObjArr[i].time) {
              this.lyricsObjArr[i].translation =
                obj.lyrics == "" ? this.lyricsObjArr[i].lyrics : obj.lyrics;
              break;
            }
          }
        } else if (obj.lyrics != "") {
          this.lyricsObjArr.push(obj);
        }
      });
      /*for (let i = 0; i < 20; i++) {
        this.lyricsObjArr.push({ lyrics: "6", timeStr: "00:00.000", time: 0 });
      }*/
    },
    timeupdate(currentTime) {
      for (let i = 1; i <= this.lyricsObjArr.length; i++) {
        if (i == this.lyricsObjArr.length || currentTime < this.lyricsObjArr[i].time) {
          if (this.lyricsIndex != i - 1) {
            this.lyricsIndex = i - 1;
            this.scroll();
          }
          break;
        }
      }
    },
    jumpToLyrics(obj, i) {
      this.lyricsIndex = i;
      this.scroll();
      this.$EventBus.emit("seek", obj.time);
    },
    scroll(behavior = "smooth") {
      let top;
      if (this.hasTranslation && this.showTranslation) {
        top = this.lyricsIndex > 2 ? 79.8 + 58.75 * (this.lyricsIndex - 4) : 0;
      } else {
        top = this.lyricsIndex > 3 ? 43.2 * (this.lyricsIndex - 3) : 0;
      }
      this.lyricsRef.scrollTo({
        left: 0,
        top: top,
        behavior: behavior,
      });
    },
  },
});
</script>

<template>
  <div
    class="player-page"
    id="top"
    :style="{
      'background-color': getRGBString(backgroundColorString, 0.7),
    }"
  >
    <n-grid>
      <n-gi :span="4">
        <div>
          <n-button tertiary circle class="back-button" @click="back">
            <ChevronBack style="width: 36px; position: absolute; left: 0px" />
          </n-button>
        </div>
      </n-gi>
      <n-gi :span="7">
        <div class="music-cover">
          <n-image class="music-cover-img" :src="music.cover" width="360" height="360" />
        </div>
        <div class="three-buttons">
          <n-grid>
            <n-gi :span="6"></n-gi>
            <n-gi :span="4" style="margin: auto">
              <span style="margin-right: 3px; margin-top: 2px">
                <n-icon
                  v-if="islike"
                  size="30"
                  color="#ff69b4"
                  @click="like"
                  class="animate__animated animate__heartBeat"
                  ><Fitness
                /></n-icon>
                <n-icon v-else size="30" @click="like"><FitnessOutline /></n-icon>
              </span>
            </n-gi>
            <n-gi :span="4" style="margin: auto">
              <span style="margin-right: 3px; margin-top: 2px">
                <n-icon
                  v-if="iscollect"
                  size="30"
                  color="#FFD700"
                  @click="collect"
                  class="animate__animated animate__flash"
                  ><Star
                /></n-icon>
                <n-icon v-else size="30" @click="collect"><StarOutline /></n-icon>
              </span>
            </n-gi>
            <n-gi :span="4" style="margin: auto">
              <span style="margin-right: 3px; margin-top: 2px">
                <n-icon
                  v-if="iscomplain"
                  size="30"
                  color="#DC143C"
                  @click="complain"
                  class="animate__animated animate__headShake"
                  ><Warning
                /></n-icon>
                <n-icon v-else size="30" @click="complain"><WarningOutline /></n-icon>
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
              <div
                style="
                  font-size: xx-large;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                {{ music.name }}
                <n-switch
                  v-if="hasTranslation"
                  v-model:value="showTranslation"
                  size="small"
                  :round="false"
                  @click="scroll"
                >
                  <template #icon> 译 </template>
                </n-switch>
              </div>
            </n-gi>
            <n-gi>
              <div>歌手：{{ music.artist }}</div>
            </n-gi>
            <n-gi>
              <div style="font-size: larger">
                <n-scrollbar style="max-height: 300px" ref="lyricsRef">
                  <div
                    v-for="(obj, i) in lyricsObjArr"
                    :key="i"
                    :style="{
                      marginBottom:
                        hasTranslation && showTranslation ? '17.9px' : '21.2px',
                    }"
                    class="lyrics-wrap"
                    :class="{ current: lyricsIndex === i }"
                  >
                    <div class="lyrics">
                      <div class="content">
                        {{ obj.lyrics }}
                      </div>
                      <div class="time">
                        {{ obj.timeStr.slice(0, 5) + "&nbsp;" }}
                        <Play
                          class="jumpLink"
                          @click="jumpToLyrics(obj, i)"
                          width="14px"
                        />
                      </div>
                    </div>
                    <div class="translation" v-show="hasTranslation && showTranslation">
                      {{ obj.translation }}
                    </div>
                  </div>
                </n-scrollbar>
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
            <n-collapse-item>
              <template #arrow><div style="color: white"></div></template>
              <template #header>
                <span style="margin-right: 3px; margin-top: 2px">
                  <n-grid>
                    <n-gi :span="23" id="comment-top">
                      <span style="font-size: 22px"> 全部评论 </span>
                    </n-gi>
                    <n-gi :span="1" style="padding-top: 5px">
                      <n-icon id="comment-fold" size="27"
                        ><ChatbubbleEllipsesOutline
                      /></n-icon>
                    </n-gi>
                  </n-grid>
                </span>
              </template>
              <div>
                <n-input
                  style="margin-bottom: 15px"
                  maxlength="200"
                  show-count
                  placeholder="我的评论"
                  type="textarea"
                  v-model:value="value"
                  :style="{ '--n-border-radius': `10px` }"
                  :autosize="{
                    minRows: 6,
                    maxRows: 6,
                  }"
                />
                <div class="my-comment-button">
                  <n-button
                    class="send-button"
                    strong
                    secondary
                    type="tertiary"
                    @click="sendComment"
                  >
                    发送
                  </n-button>
                  <n-button
                    class="clean-button"
                    strong
                    secondary
                    type="tertiary"
                    @click="cleanComment"
                  >
                    清空
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
  <a-divider style="height: 1.8px; background-color: #dddddd" />
  <div class="comments">
    <n-grid>
      <n-gi :span="4"></n-gi>
      <n-gi :span="16">
        <div
          v-for="(comment, idx) in comments.slice(
            5 * (page - 1),
            5 * (page - 1) + (5 * page > comments.length ? comments.length % 5 : 5)
          )"
          :key="idx"
        >
          <a-comment>
            <template #actions>
              <span key="edit-comment">
                <span style="padding-left: 855px; cursor: auto">
                  <n-popover trigger="hover">
                    <template #trigger>
                      <n-icon size="18" @click="editMyComment(comment)">
                        <CreateOutline />
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
                      <n-icon size="18" @click="deleteMyComment(comment)">
                        <TrashOutline />
                      </n-icon>
                    </template>
                    确认删除这条评论吗？
                  </n-popconfirm>
                </span>
              </span>
            </template>
            <template #author
              ><a style="font-size: 18px">{{ comment.author }}</a></template
            >
            <template #avatar>
              <a-avatar :src="comment.avatar" :size="50" />
            </template>
            <template #content>
              <p style="font-size: 13.5px; margin-top: 8px; margin-bottom: 0px">
                {{ comment.content }}
              </p>
            </template>
            <template #datetime>
              <a-tooltip :title="comment.date.replace('T', ' ').split('.')[0]">
                <span style="margin-bottom: 0; font-size: 10px">
                  {{ dayjs(comment.date.replace("T", " ").split(".")[0]).fromNow() }}
                </span>
              </a-tooltip>
            </template>
          </a-comment>
        </div>
        <div class="card-pagination">
          <n-grid>
            <n-gi :span="8"></n-gi>
            <n-gi :span="8">
              <div
                style="display: flex; justify-content: center"
                v-if="comments.length > 0"
              >
                <n-pagination
                  v-model:page="page"
                  :page-count="Math.ceil(comments.length / 5)"
                />
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
.player-page {
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
  font-family: Arial, Helvetica, sans-serif;
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
  width: 50px;
  height: 50px;
}
:deep(.ant-comment-content-author > span) {
  padding-right: 13px;
}
:deep(.ant-comment-content-author-time) {
  padding-top: 2px;
  font-size: 14px;
}
:deep(.n-collapse
    .n-collapse-item
    .n-collapse-item__header
    .n-collapse-item__header-main) {
  display: inline;
}
:deep(.n-collapse
    .n-collapse-item
    .n-collapse-item__content-wrapper
    .n-collapse-item__content-inner) {
  padding-top: 0;
}
:deep(.ant-comment-inner) {
  padding-top: 0;
  padding-bottom: 5px;
}
:deep(.ant-comment-actions) {
  margin-top: 0;
}

.ant-divider-horizontal {
  display: flex;
  clear: both;
  width: 976.54px;
  min-width: 0px;
  margin-top: 0;
  margin-bottom: 30px;
  margin-left: 244px;
  margin-right: 244px;
}

.edit-comment {
  margin-top: 24px;
}
.clean-button {
  position: absolute;
  margin-left: 920px;
}
.send-button {
  position: absolute;
  margin-right: 100px;
}

.my-comment-button {
  margin-bottom: 50px;
}
.html {
  scroll-behavior: smooth;
}
.lyrics-wrap > .lyrics {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lyrics-wrap > .lyrics > .content {
  color: #000;
  font-size: 14px;
  opacity: 0.5;
}

.lyrics-wrap > .translation {
  color: #000;
  font-size: 12px;
  opacity: 0.5;
}

.lyrics-wrap.current > .lyrics > .content {
  font-size: 16px;
  font-weight: 600;
  opacity: 0.8;
}

.lyrics-wrap.current > .translation {
  color: #000;
  font-size: 14px;
  opacity: 0.8;
}
.lyrics-wrap:hover > .lyrics > .content {
  opacity: 0.8;
}

.lyrics-wrap:hover > .translation {
  opacity: 0.8;
}
.lyrics-wrap > .lyrics > .time {
  display: none;
}
.lyrics-wrap:hover > .lyrics > .time {
  display: flex;
  align-items: center;
  margin-right: 30px;
  color: #000;
  font-size: 12px;
  font-weight: lighter;
}

.jumpLink:hover {
  cursor: pointer;
}
</style>
