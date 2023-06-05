<script>
import { NButton, NIcon } from "naive-ui";
import { defineComponent, ref } from "vue";
import ListTable from "/src/components/tables/ListTable/ListTable.Vue";
import {
  ChevronBack,
  MusicalNotesOutline,
  PlayOutline,
  OpenOutline,
  CreateOutline,
  CloseOutline,
  ImageOutline,
  WarningOutline,
} from "@vicons/ionicons5";
import { message } from "ant-design-vue";
import ModifyComplainView from "../views/ModifyComplainView.vue";
export default defineComponent({
  name: "ListDetailed",
  components: {
    ChevronBack,
    MusicalNotesOutline,
    PlayOutline,
    OpenOutline,
    CreateOutline,
    CloseOutline,
    ImageOutline,
    WarningOutline,
    ModifyComplainView,
    ListTable,
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.updateData(this.$route.params.playlistId);
      },
      { immediate: true }
    );
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    editList() {
      this.showEditListModify = true;
    },
    closeWindow() {
      this.showEditListModify = false;
      this.showShareListModify = false;
      this.cover = null;
    },
    submitEdit() {
      //todo
      if (this.listName == "") {
        this.warning("歌单名不得为空");
      } else {
        let formData = new FormData();
        formData.append("title", this.listName);
        formData.append("profile", this.listIntro);
        formData.append("tags", this.tags.join(" "));
        if (this.cover != null) {
          formData.append("cover", this.cover);
        }
        this.$http
          .post(`/api/playlist/edit/${this.playlist.id}/`, formData)
          .then((response) => {
            this.updateData(this.playlist.id);
          });
        this.success("修改歌单信息成功");
        this.closeWindow();
      }
    },
    shareList() {
      this.showShareListModify = true;
    },
    confirmShare() {
      this.$http.post(`/api/playlist/share/${this.playlist.id}/`);
      this.playlist.shared = true;
      this.success("分享歌单成功");
      this.closeWindow();
    },
    unshareList() {
      this.$http.post(`/api/playlist/unshare/${this.playlist.id}/`);
      if (
        this.$cookies.get("is_superuser") == "true" &&
        this.$cookies.get("userid") != this.up.id
      ) {
        let formData = new FormData();
        formData.append(
          "content",
          `您的歌单${this.playlist.title}涉嫌违规，已被取消分享。`
        );
        this.$http.post(`/api/message/to/${this.up.id}/`, formData);
      }
      this.playlist.shared = false;
      this.success("取消分享成功");
    },
    playAll() {
      this.$EventBus.emit("playAll", this.playlist.id);
    },
    complainList() {
      this.showModifyComplainView = true;
    },
    updateData(playlistId) {
      this.$http.get(`/api/playlist/detail/${playlistId}/`).then((response) => {
        this.playlist = response.data;
        this.songNum = this.playlist.music_set.length;
        this.tagsNum = this.playlist.tags.length;
        this.listName = this.playlist.title;
        this.listIntro = this.playlist.profile;
        this.tags = this.playlist.tags;
        this.up = this.playlist.up;
        let key = 0;
        this.songData = this.playlist.music_set.map((music) => ({
          key: key++,
          id: music.id,
          name: music.name,
          singer: music.artist,
          length:
            `${Math.floor(music.duration / 60)}`.padStart(2, "0") +
            ":" +
            `${Math.floor(music.duration % 60)}`.padStart(2, "0"),
          isliked: music.is_like,
          isCollected: music.is_favorite,
          imgSrc: music.cover,
          showCollection: false,
        }));
      });
    },
    handleCoverChange(e) {
      this.cover = e.file.file;
    },
  },
  setup() {
    const showModalRef = ref(false);
    const previewImageUrlRef = ref("");
    function handlePreview(file) {
      const { url } = file;
      previewImageUrlRef.value = url;
      showModalRef.value = true;
    }
    return {
      handlePreview,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      warning(msg) {
        message.warning({
          content: msg,
          duration: 1,
          style: {
            "z-index": 2,
          },
        });
      },
      success(msg) {
        message.success({
          content: msg,
          duration: 1,
          style: {
            "z-index": 2,
          },
        });
      },
    };
  },
  data() {
    return {
      playlist: {},
      up: {},
      listName: "",
      listIntro: "",
      songNum: 0,
      tagsNum: 0,
      songData: [],
      cover: null,
      showEditListModify: false,
      showShareListModify: false,
      showModifyComplainView: false,
      MusicalNotesOutline,
      tags: [], // 存储所选内容的数组
      options: [
        { label: "华语", value: "华语" },
        { label: "流行", value: "流行" },
        { label: "民谣", value: "民谣" },
        { label: "轻音乐", value: "轻音乐" },
        { label: "电子", value: "电子" },
        { label: "摇滚", value: "摇滚" },
        { label: "日韩", value: "日韩" },
        { label: "粤语", value: "粤语" },
        { label: "舞曲", value: "舞曲" },
        { label: "说唱", value: "说唱" },
        { label: "爵士", value: "爵士" },
        { label: "乡村", value: "乡村" },
        { label: "古典", value: "古典" },
        { label: "民族", value: "民族" },
        { label: "金属", value: "金属" },
        { label: "古风", value: "古风" },
        { label: "游戏", value: "游戏" },
        { label: "清晨", value: "清晨" },
        { label: "夜晚", value: "夜晚" },
        { label: "学习", value: "学习" },
        { label: "工作", value: "工作" },
        { label: "午休", value: "午休" },
        { label: "散步", value: "散步" },
        { label: "下午茶", value: "下午茶" },
        { label: "旅行", value: "旅行" },
        { label: "运动", value: "运动" },
        { label: "怀旧", value: "怀旧" },
        { label: "伤感", value: "伤感" },
        { label: "放松", value: "放松" },
        { label: "浪漫", value: "浪漫" },
        { label: "安静", value: "安静" },
        { label: "思念", value: "思念" },
      ],
      tagList: [],
      tagString: "", // 为了传给后端tag而设置的。
    };
  },
});
</script>
<template>
  <div class="list-detail-page" v-if="this.playlist.up !== undefined">
    <n-grid>
      <n-gi :span="4">
        <n-button tertiary circle class="back-button" @click="back">
          <ChevronBack style="width: 36px; position: absolute; left: 0px" /> </n-button
      ></n-gi>
      <n-gi :span="4">
        <div class="list-cover">
          <n-image class="list-cover-img" :src="this.playlist.cover" />
        </div>
        <div style="margin: 30px 0px 20px 0px">
          <n-breadcrumb>
            <n-breadcrumb-item style="font-size: 25px">
              <n-icon :component="MusicalNotesOutline" size="30" />
              歌曲列表</n-breadcrumb-item
            >
          </n-breadcrumb>
        </div>
      </n-gi>
      <n-gi :span="1"></n-gi>
      <n-gi :span="11" class="list-information">
        <div style="height: 245px">
          <n-grid :y-gap="10" :cols="1" style="width: 671px; height: 256px">
            <n-gi style="height: 50px">
              <n-grid>
                <n-gi :span="21">
                  <div style="font-size: xx-large; height: 50px">
                    {{ this.playlist.title }}
                  </div>
                </n-gi>
                <n-gi v-if="this.$cookies.get('userid') == this.up.id" :span="3">
                  <n-button quaternary :focusable="false" @click="editList">
                    <n-icon>
                      <CreateOutline />
                    </n-icon>
                    编辑
                  </n-button>
                </n-gi>
              </n-grid>
            </n-gi>
            <n-gi>
              <div>
                <a
                  v-if="this.$cookies.get('userid') == this.up.id && this.tagsNum == 0"
                  @click="editList"
                  >添加标签</a
                >
                <n-tag v-else v-for="(tag, i) in this.playlist.tags" :key="i" class="tags"
                  >#{{ tag }}</n-tag
                >
              </div>
            </n-gi>
            <n-gi>
              来源：
              <span
                class="up-link"
                @click="
                  this.$router.push(
                    this.$cookies.get('userid') == this.up.id
                      ? '/home'
                      : `/home/user/${this.up.id}`
                  )
                "
              >
                {{ this.up.username }}
              </span>
            </n-gi>
            <n-gi>
              <div>歌曲数：{{ this.songNum }}</div>
            </n-gi>
            <n-gi>
              <div>歌单简介：{{ this.playlist.profile }}</div>
            </n-gi>
            <n-gi>
              <n-button :focusable="false" @click="playAll" class="playall-button">
                <n-icon>
                  <PlayOutline />
                </n-icon>
                播放全部
              </n-button>
              <n-button
                v-if="
                  this.$cookies.get('userid') == this.up.id &&
                  this.playlist.shared == false
                "
                :focusable="false"
                @click="shareList"
                class="share-button"
              >
                <n-icon>
                  <OpenOutline />
                </n-icon>
                分享歌单
              </n-button>
              <n-button
                v-if="
                  (this.$cookies.get('userid') == this.up.id ||
                    this.$cookies.get('is_superuser') == 'true') &&
                  this.playlist.shared == true
                "
                :focusable="false"
                @click="unshareList"
                class="share-button"
              >
                <n-icon>
                  <OpenOutline />
                </n-icon>
                取消分享
              </n-button>
              <n-button
                v-if="
                  this.$cookies.isKey('userid') &&
                  this.$cookies.get('userid') != this.up.id
                "
                :focusable="false"
                @click="complainList"
              >
                <n-icon>
                  <WarningOutline />
                </n-icon>
                投诉歌单
              </n-button>
            </n-gi>
          </n-grid>
        </div>
      </n-gi>
      <n-gi :span="4"></n-gi>
    </n-grid>
  </div>
  <div class="music-list-item" v-if="this.playlist.up !== undefined">
    <n-grid>
      <n-gi :span="4"></n-gi>
      <n-gi :span="16">
        <a-divider style="height: 1.8px; background-color: #dddddd" />
        <list-table
          v-if="playlist.music_set.length > 0"
          :view-mode="'user'"
          :position="'PublicView'"
          v-model:songData="this.songData"
        ></list-table>
      </n-gi>
      <n-gi :span="4"></n-gi>
    </n-grid>
  </div>
  <n-modal :show="showEditListModify" z-index="1">
    <div>
      <n-card class="edit-list-hodder" style="--n-border-radius: 20px">
        <n-grid>
          <n-gi :span="1"></n-gi>
          <n-gi :span="22">
            <span class="modify-title">
              <div class="edit-list-title">
                编辑{{ this.playlist.shared ? "歌单" : "收藏夹" }}信息
              </div>
            </span>
          </n-gi>
          <n-gi :span="1">
            <div class="close-edit-modify">
              <n-icon size="32px" @click="closeWindow">
                <close-outline />
              </n-icon>
            </div>
          </n-gi>
        </n-grid>
        <div class="edit-list-main">
          <n-grid>
            <n-gi :span="8">
              <n-popover trigger="hover">
                <template #trigger>
                  <div class="upload-list-cover" @click="uploadFile">
                    <n-upload
                      class="upload-list-cover-image"
                      list-type="image-card"
                      accept="image/*"
                      max="1"
                      @preview="handlePreview"
                      :on-change="handleCoverChange"
                      style="max-width: 200px"
                    >
                      <n-icon size="100" depth="5">
                        <ImageOutline />
                      </n-icon>
                    </n-upload>
                    <n-image :src="previewImageUrl" style="width: 200px" />
                  </div>
                </template>
                <span>点击此处上传歌单封面</span>
              </n-popover>
            </n-gi>
            <n-gi :span="1"></n-gi>
            <n-gi :span="15">
              <div>
                <div style="padding-bottom: 3px; font-size: 16px">歌单名</div>
                <n-input
                  type="text"
                  placeholder="请输入歌单名称"
                  :maxlength="20"
                  show-count
                  v-model:value="listName"
                />
              </div>
              <div>
                <div style="padding: 10px 0px 3px 0px; font-size: 16px">标签</div>
                <n-space vertical>
                  <n-select
                    v-model:value="tags"
                    multiple
                    :options="options"
                    placeholder="请选择歌单标签"
                  />
                </n-space>
              </div>
              <div>
                <div style="padding: 10px 0px 3px 0px; font-size: 16px">简介</div>
                <n-input
                  v-model:value="listIntro"
                  type="textarea"
                  placeholder="每张歌单都有自己的故事~"
                  :autosize="{
                    minRows: 6,
                    maxRows: 6,
                  }"
                  :maxlength="150"
                  show-count
                >
                </n-input>
              </div>
              <div class="submit-button">
                <n-button strong secondary type="primary" @click="submitEdit">
                  保存修改
                </n-button>
              </div>
            </n-gi>
          </n-grid>
        </div>
      </n-card>
    </div>
  </n-modal>
  <n-modal :show="showShareListModify" z-index="1">
    <div>
      <n-card class="share-list-hodder" style="--n-border-radius: 20px">
        <span class="modify-title">
          <div class="share-list-title">iSound提醒您</div>
        </span>
        <div class="confirm-message">
          您确认歌单名了吗？<br /><br />
          您为歌单添加标签了吗？<br /><br />
          您为歌单添加简介了吗？
        </div>
        <div class="buttons">
          <n-button :focusable="false" @click="closeWindow" style="margin: 0 10px"
            >取消</n-button
          >
          <n-button :focusable="false" @click="confirmShare" style="margin: 0 10px"
            >确认</n-button
          >
        </div>
      </n-card>
    </div>
  </n-modal>
  <modify-complain-view
    :showModifyComplainView="showModifyComplainView"
    @closeModifyWindow="showModifyComplainView = false"
  ></modify-complain-view>
</template>
<style scoped>
.back-button {
  width: 40px;
  height: 40px;
  /* position: absolute; */
  left: 20px;
  top: 20px;
}

.list-cover {
  /* position: absolute; */
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.list-cover-img {
  /* position: absolute; */
  margin: auto;
  width: 245px;
  height: 245px;
  border-radius: 10%;
}

.list-information {
  display: flex;
  margin-top: 4%;
}

.list-circle {
  margin-top: 10px;
  margin-right: 5px;
}

.ant-divider-horizontal {
  display: flex;
  clear: both;
  width: 100%;
  min-width: 0px;
  margin-top: 0;
  margin-bottom: 0px;
}

.playall-button {
  margin-right: 20px;
}

.modify-title {
  font-size: 25px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
}

.edit-list-hodder {
  width: 800px;
  height: 500px;
}

.close-edit-modify {
  margin-right: 0px;
  margin-top: 0px;
}

.edit-list-title {
  display: flex;
  font-weight: bold;
}

.upload-list-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-style: dashed;
    border-width:3px; */
  color: rgb(209, 209, 209);
  height: 220px;
  width: 220px;
  border-radius: 5%;
}

/* .upload-list-cover:hover {
    cursor: pointer;
} */

.edit-list-main {
  margin: 30px 30px;
}

.upload-list-cover-image {
  height: 200px;
  width: 200px;
}

:deep(.n-upload-trigger.n-upload-trigger--image-card) {
  margin-top: -8px;
  width: 216px;
  height: 216px;
  z-index: 1;
}

:deep(.n-upload-dragger) {
  border-radius: 5%;
  border-width: 3px;
}

:deep(.n-upload-file-list .n-upload-file.n-upload-file--image-card-type) {
  position: relative;
  width: 200px;
  height: 200px;
  border: var(--n-item-border-image-card);
  border-radius: var(--n-border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier);
  border-radius: var(--n-border-radius);
  overflow: hidden;
  border-radius: 5%;
}

.submit-button {
  margin-top: 15px;
  display: flex;
  justify-content: right;
}

.tags {
  margin-right: 10px;
}

.share-list-hodder {
  width: 480px;
  height: 300px;
}

.confirm-message {
  margin-top: 20px;
  display: flex;
  align-content: center;
  justify-content: center;
  height: 140px;
  font-size: 18px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  align-content: center;
  justify-content: right;
}

.share-button {
  margin-right: 20px;
}

.up-link:hover {
  cursor: pointer;
}
</style>
