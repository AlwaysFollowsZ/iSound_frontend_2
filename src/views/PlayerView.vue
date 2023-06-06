<template>
    <div class="player-page" id="top">
        <img class="background-img" :src="music.cover" />
        <div class="background-imgfloat"></div>
        <div class="content">
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
                        <n-image class="music-cover-img" :src="music.cover" width="400" height="400" />
                    </div>
                    <div class="three-buttons" v-if="this.$cookies.get('is_superuser') == 'false'">
                        <n-grid>
                            <n-gi :span="4"></n-gi>
                            <n-gi :span="4" style="margin: auto">
                                <span style="margin-right: 3px; margin-top: 2px">
                                    <n-icon class="hoverable-icon" v-if="islike" size="45" color="#ff6666" @click="like">
                                        <Heart />
                                    </n-icon>
                                    <n-icon v-else size="45" @click="like" color="rgba(255,255,255,0.7)"
                                        class="hoverable-icon">
                                        <HeartOutline />
                                    </n-icon>
                                </span>
                            </n-gi>
                            <n-gi :span="4" style="margin: auto">
                                <span style="margin-right: 3px; margin-top: 2px">
                                    <n-icon class="hoverable-icon" v-if="iscollect" size="40" color="#FFD700"
                                        @click="collect">
                                        <Star />
                                    </n-icon>
                                    <n-icon v-else size="40" @click="collect" color="rgba(255,255,255,0.7)"
                                        class="hoverable-icon">
                                        <StarOutline />
                                    </n-icon>
                                </span>
                            </n-gi>
                            <n-gi :span="4" style="margin: auto">
                                <span style="margin-right: 3px; margin-top: 2px">
                                    <!-- <n-icon
                    v-if="iscomplain"
                    size="45"
                    color="#ff6666"
                    @click="complain"
                  >
                    <Warning />
                  </n-icon> -->
                                    <n-icon size="45" @click="complain" color="#e65c5c" class="hoverable-icon">
                                        <WarningOutline />
                                    </n-icon>
                                </span>
                            </n-gi>
                            <n-gi :span="4" style="margin: auto">
                                <span style="margin-right: 3px; margin-top: 2px">
                                    <!-- <n-icon
                    v-if="iscomplain"
                    size="45"
                    color="#ff6666"
                    @click="complain"
                  >
                    <Warning />
                  </n-icon> -->
                  <n-icon size="40" @click="scrollToComments" color="rgba(255,255,255,0.7)" class="hoverable-icon">
                    <ChatbubbleEllipsesOutline />
                  </n-icon>
                </span>
              </n-gi>
              <!-- <n-gi :span="6"></n-gi> -->
            </n-grid>
          </div>
        </n-gi>
        <n-gi :span="10">
          <div class="lyrics-part">
            <n-grid :y-gap="15" :cols="1">
              <n-gi class="music-name">
                <div style="color: #fff">
                  {{ music.name }}
                </div>
              </n-gi>
              <n-gi>
                <div class="music-artist" style="color: #fff">
                  歌手：{{ music.artist }}
                </div>
                <div style="color: #fff">
                  <span>来源： </span>
                  <router-link
                    :to="
                      this.$cookies.get('userid') == music.up.id
                        ? '/home'
                        : `/home/user/${music.up.id}`
                    "
                  >
                    <span class="upload-user" style="color: #fff">{{
                      music.up.username
                    }}</span>
                  </router-link>
                </div>
              </n-gi>
              <n-gi>
                <div class="song-tags">
                  <div class="tag-container">
                    <span v-for="(tag, i) in this.songtags" :key="i">
                      <n-tag
                        :bordered="false"
                        :style="{
                          '--n-border-radius': `5px`,
                          '--n-font-weight-strong': `bold`,
                          '--n-height': `20px`,
                          '--n-close-margin': `0 18px 0 18px`,
                        }"
                        class="tag-item"
                      >
                        {{ tag }}
                      </n-tag>
                    </span>
                  </div>
                </div>
              </n-gi>
              <n-gi>
                <div style="font-size: larger">
                  <n-scrollbar style="max-height: 400px" ref="lyricsRef">
                    <div
                      v-for="(obj, i) in lyricsObjArr"
                      :key="i"
                      :style="{
                        marginBottom:
                          hasTranslation && showTranslation ? '12.5px' : '31.35px',
                      }"
                      class="lyrics-wrap"
                      :class="{ current: lyricsIndex === i }"
                    >
                      <n-grid class="lyrics">
                        <n-gi :span="2" class="time">
                          {{ obj.timeStr.slice(0, 5) + "&nbsp;" }}
                        </n-gi>
                        <n-gi :span="20" class="content">
                          {{ obj.lyrics }}
                        </n-gi>
                        <n-gi :span="2" class="jumpLink">
                          <Play color="#fff" @click="jumpToLyrics(obj, i)" width="14px" />
                        </n-gi>
                      </n-grid>
                      <div class="translation" v-show="hasTranslation && showTranslation">
                        {{ obj.translation }}
                      </div>
                    </div>
                  </n-scrollbar>
                  <div class="translationSwitch">
                    <n-switch
                      :rail-style="railStyle"
                      v-if="hasTranslation"
                      v-model:value="showTranslation"
                      
                      @click="scroll"
                      :style="{ '--n-rail-color': 'grey' }"
                    >
                      <template #icon> 译 </template>
                    </n-switch>
                  </div>
                </div>
              </n-gi>
            </n-grid>
          </div>
        </n-gi>
        <n-gi :span="3"></n-gi>
      </n-grid>
    </div>
  </div>
  <div class="edit-comment" ref="scrollTarget">
    <n-grid>
      <n-gi :span="4"></n-gi>
      <n-gi :span="16">
        <div>
          <n-collapse>
            <n-collapse-item  :disabled="!this.$cookies.isKey('userid')">
              <template #arrow>
                <div style="color: white"></div>
              </template>
              <template #header>
                <span style="margin-right: 3px; margin-top: 2px" @click="judgeLogState">
                  <n-grid>
                    <n-gi :span="23" id="comment-top">
                      <span style="font-size: 30px; font-weight: 500" :style="{'color': 'rgb(' + this.accentColor + ')'}"> 全部评论 </span>
                    </n-gi>
                    <n-gi :span="1" style="padding-top: 5px">
                      <n-icon id="comment-fold" size="36" :color="'rgb(' + this.accentColor + ')'">
                        <ChatbubbleEllipsesOutline />
                      </n-icon>
                    </n-gi>
                  </n-grid>
                </span>
              </template>
              <div>
                <n-input
                  style="margin-bottom: 15px"
                  maxlength="200"
                  show-count
                  placeholder="音你而美，畅所欲言"
                  type="textarea"
                  v-model:value="value"
                  :style="{
                    '--n-color': 'transparent',
                    '--n-color-focus': 'transparent',
                    '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                    '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                    '--n-border-hover': 'transparent',
                    '--n-border-focus': 'transparent',
                    '--n-placeholder-color':
                      this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                    '--n-border-radius': '8px',
                    '--n-font-size': '15px',
                    '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                    '--n-box-shadow-focus':
                      '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                  }"
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
                    :focusable="false"
                    @click="sendComment"
                    :style="{
                      '--n-color': 'rgba(' + this.accentColor + ', 0.1)',
                      '--n-color-hover':  'rgba(' + this.accentColor + ', 0.25)',
                      '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.25)',
                      '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                      '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                      '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                      '--n-border': '1px solid transparent',
                      '--n-border-hover': '1px solid transparent',
                      '--n-border-pressed': '1px solid transparent',
                      '--n-border-radius': '5px',
                      '--n-height': '36px',
                      '--n-font-size': '16px',
                  }"
                  >
                    发送
                  </n-button>
                  <n-button
                    class="clean-button"
                    style="margin-left: 938px"
                    strong
                    secondary
                    type="tertiary"
                    :focusable="false"
                    :style="{
                      '--n-color': 'rgba(' + this.accentColor + ', 0.1)',
                      '--n-color-hover':  'rgba(' + this.accentColor + ', 0.25)',
                      '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.25)',
                      '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                      '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                      '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                      '--n-border': '1px solid transparent',
                      '--n-border-hover': '1px solid transparent',
                      '--n-border-pressed': '1px solid transparent',
                      '--n-border-radius': '5px',
                      '--n-height': '36px',
                      '--n-font-size': '16px',
                  }"
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
  <div class="comments" style="margin-top: 10px" :key="this.refreshCommentVir">
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
              <span key="reply-comment">
                <span style="padding-left: 843px; cursor: auto">
                  <!-- <n-popover trigger="hover">
                    <template #trigger> -->
                                    <n-button text circle :focusable="false" @click="editReplyComment(comment)"
                                        :disabled="!this.$cookies.isKey('userid')" :style="{
                                            '--n-color': 'transparent',
                                            '--n-color-hover': 'transparent',
                                            '--n-color-pressed': 'transparent',
                                            '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.6)',
                                            '--n-border': '1px solid transparent',
                                            '--n-border-hover': '1px solid transparent',
                                            '--n-border-pressed': '1px solid transparent',
                                        }">
                                        <n-icon size="18">
                                            <ChatboxEllipsesOutline />
                                        </n-icon>
                                    </n-button>
                                    <!-- </template>
                    <span>回复评论</span>
                  </n-popover> -->
                                </span>
                            </span>
                            <span key="edit-comment">
                                <span style="padding-left: 3px; cursor: auto;">
                                    <!-- <n-popover trigger="hover">
                    <template #trigger> -->
                                    <n-button text circle :focusable="false" @click="editMyComment(comment)"
                                        :disabled="this.$cookies.get('userid') != comment.up.id" :style="{
                                            '--n-color': 'transparent',
                                            '--n-color-hover': 'transparent',
                                            '--n-color-pressed': 'transparent',
                                            '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.6)',
                                            '--n-border': '1px solid transparent',
                                            '--n-border-hover': '1px solid transparent',
                                            '--n-border-pressed': '1px solid transparent',
                                        }">
                                        <n-icon size="18">
                                            <CreateOutline />
                                        </n-icon>
                                    </n-button>
                                    <!-- </template> -->
                                    <!-- <span>编辑我的评论</span> -->
                                    <!-- </n-popover> -->
                                </span>
                            </span>
                            <span key="delete-comment" style="display: inline-block">
                                <span style="padding-left: 3px; cursor: auto">
                                    <n-popconfirm @positive-click="handlePositiveClick(comment)"
                                        @negative-click="handleNegativeClick" positive-text="确认" negative-text="取消" :style="{
                                            '--n-text-color': this.colorMode === 'white' ? 'rgb(57,57,57)' : 'white',
                                            '--n-color': this.colorMode === 'white' ? '#fff' : 'rgb(72,72,72)',
                                            '--n-border-radius': '12px',
                                        }" :negative-button-props="{
    style: {
        '--n-color': 'transparent',
        '--n-color-hover': 'transparent',
        '--n-color-pressed': 'transparent',
        '--n-color-focus': 'transparent',
        '--n-text-color': '',
        '--n-text-color-hover': 'rgb(' + this.accentColor + ')',
        '--n-text-color-pressed': 'rgb(' + this.accentColor + ')',
        '--n-text-color-focus': 'rgb(' + this.accentColor + ')',
        '--n-border': '1px solid rgb(224, 224, 230)',
        '--n-border-hover': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-pressed': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-focus': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-radius': '8px',
    }
}" :positive-button-props="{
    style: {
        '--n-color': 'rgba(' + this.accentColor + ', 0.7)',
        '--n-color-hover': 'rgba(' + this.accentColor + ', 0.8)',
        '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.8)',
        '--n-color-focus': 'rgba(' + this.accentColor + ', 0.8)',
        '--n-text-color': 'white',
        '--n-text-color-hover': 'white',
        '--n-text-color-pressed': 'white',
        '--n-text-color-focus': 'white',
        '--n-border': '1px solid rgb(224, 224, 230)',
        '--n-border-hover': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-pressed': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-focus': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-radius': '8px',
    }
}">
                                        <template #trigger>
                                            <n-button text circle :focusable="false"
                                                :disabled="this.$cookies.get('userid') != comment.up.id" :style="{
                                                    '--n-color': 'transparent',
                                                    '--n-color-hover': 'transparent',
                                                    '--n-color-pressed': 'transparent',
                                                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                                    '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.6)',
                                                    '--n-border': '1px solid transparent',
                                                    '--n-border-hover': '1px solid transparent',
                                                    '--n-border-pressed': '1px solid transparent',
                                                }">
                                                <n-icon size="18">
                                                    <TrashOutline />
                                                </n-icon>
                                            </n-button>
                                        </template>
                                        确认删除这条评论吗？
                                    </n-popconfirm>
                                </span>
                            </span>
                        </template>
                        <template #author>
                            <router-link :to="`/home/user/${comment.up.id}`">
                                <div style="font-size: 18px" :style="{ 'color': 'rgb(' + this.accentColor + ')' }">{{
                                    comment.up.username }}</div>
                            </router-link>
                        </template>
                        <template #avatar>
                            <router-link :to="`/home/user/${comment.up.id}`">
                                <a-avatar :src="comment.up.avatar" :size="50" />
                            </router-link>
                        </template>
                        <template #content>
                            <p style="font-size: 13.5px; margin-top: 8px; margin-bottom: 0px"
                                :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
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
                        <div v-if="this.edit1stComment && this.editCommentId == comment.id">
                            <div>
                                <n-input style="margin-bottom: 15px" maxlength="200" show-count placeholder="延续心动旋律"
                                    type="textarea" v-model:value="value" :style="{
                                        '--n-color': 'transparent',
                                        '--n-color-focus': 'transparent',
                                        '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                        '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                        '--n-border-hover': 'transparent',
                                        '--n-border-focus': 'transparent',
                                        '--n-placeholder-color':
                                            this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                        '--n-border-radius': '8px',
                                        '--n-font-size': '15px',
                                        '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                        '--n-box-shadow-focus':
                                            '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                    }" :autosize="{
    minRows: 6,
    maxRows: 6,
}" />
                                <div class="my-comment-button">
                                    <n-button class="send-button" strong secondary type="tertiary" :style="{
                                        '--n-color': 'rgba(' + this.accentColor + ', 0.1)',
                                        '--n-color-hover': 'rgba(' + this.accentColor + ', 0.25)',
                                        '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.25)',
                                        '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                        '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                        '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                        '--n-border': '1px solid transparent',
                                        '--n-border-hover': '1px solid transparent',
                                        '--n-border-pressed': '1px solid transparent',
                                        '--n-border-radius': '5px',
                                        '--n-height': '36px',
                                        '--n-font-size': '16px',
                                    }" @click="sendComment">
                                        发送
                                    </n-button>
                                    <n-button class="clean-button" style="margin-left: 893px" strong secondary
                                        type="tertiary" @click="cleanComment" :style="{
                                            '--n-color': 'rgba(' + this.accentColor + ', 0.1)',
                                            '--n-color-hover': 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                            '--n-border': '1px solid transparent',
                                            '--n-border-hover': '1px solid transparent',
                                            '--n-border-pressed': '1px solid transparent',
                                            '--n-border-radius': '5px',
                                            '--n-height': '36px',
                                            '--n-font-size': '16px',
                                        }">
                                        清空
                                    </n-button>
                                </div>
                            </div>
                        </div>
                        <div v-if="this.reply2ndComment && this.edit2ndCommentParentId == comment.id">
                            <div>
                                <n-input style="margin-bottom: 15px" maxlength="200" show-count placeholder="延续心动旋律"
                                    type="textarea" v-model:value="value" :style="{
                                        '--n-color': 'transparent',
                                        '--n-color-focus': 'transparent',
                                        '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                        '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                        '--n-border-hover': 'transparent',
                                        '--n-border-focus': 'transparent',
                                        '--n-placeholder-color':
                                            this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                        '--n-border-radius': '8px',
                                        '--n-font-size': '15px',
                                        '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                        '--n-box-shadow-focus':
                                            '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                    }" :autosize="{
    minRows: 6,
    maxRows: 6,
}" />
                                <div class="my-comment-button">
                                    <n-button class="send-button" strong secondary type="tertiary" :style="{
                                        '--n-color': 'rgba(' + this.accentColor + ', 0.1)',
                                        '--n-color-hover': 'rgba(' + this.accentColor + ', 0.25)',
                                        '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.25)',
                                        '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                        '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                        '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                        '--n-border': '1px solid transparent',
                                        '--n-border-hover': '1px solid transparent',
                                        '--n-border-pressed': '1px solid transparent',
                                        '--n-border-radius': '5px',
                                        '--n-height': '36px',
                                        '--n-font-size': '16px',
                                    }" @click="send2ndComment">
                                        发送
                                    </n-button>
                                    <n-button class="clean-button" style="margin-left: 893px" strong secondary
                                        type="tertiary" :style="{
                                            '--n-color': 'rgba(' + this.accentColor + ', 0.1)',
                                            '--n-color-hover': 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                            '--n-border': '1px solid transparent',
                                            '--n-border-hover': '1px solid transparent',
                                            '--n-border-pressed': '1px solid transparent',
                                            '--n-border-radius': '5px',
                                            '--n-height': '36px',
                                            '--n-font-size': '16px',
                                        }" @click="cleanComment">
                                        清空
                                    </n-button>
                                </div>
                            </div>
                        </div>
                        <div v-if="comment.comment_set.length > 0">
                            <div v-for="(comment_2nd, idx) in comment.comment_set" :key="idx">
                                <a-comment>
                                    <template #actions>
                                        <span key="edit-comment">
                                            <span style="padding-left: 830px; cursor: auto">
                                                <!-- <n-popover trigger="hover">
                          <template #trigger> -->
                                                <n-button text circle :focusable="false"
                                                    @click="editMy2ndComment(comment_2nd)"
                                                    :disabled="this.$cookies.get('userid') != comment_2nd.up.id" :style="{
                                                        '--n-color': 'transparent',
                                                        '--n-color-hover': 'transparent',
                                                        '--n-color-pressed': 'transparent',
                                                        '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                                        '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                                        '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                                        '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.6)',
                                                        '--n-border': '1px solid transparent',
                                                        '--n-border-hover': '1px solid transparent',
                                                        '--n-border-pressed': '1px solid transparent',
                                                    }">
                                                    <n-icon size="18">
                                                        <CreateOutline />
                                                    </n-icon>
                                                </n-button>
                                                <!-- </template> -->
                                                <!-- <span>编辑我的评论</span>
                        </n-popover> -->
                                            </span>
                                        </span>
                                        <span key="delete-comment">
                                            <span style="padding-left: 3px; cursor: auto">
                                                <n-popconfirm @positive-click="handlePositiveClick(comment_2nd)"
                                                    @negative-click="handleNegativeClick" positive-text="确认"
                                                    negative-text="取消" :style="{
                                                        '--n-text-color': this.colorMode === 'white' ? 'rgb(57,57,57)' : 'white',
                                                        '--n-color': this.colorMode === 'white' ? '#fff' : 'rgb(72,72,72)',
                                                        '--n-border-radius': '12px',
                                                    }" :negative-button-props="{
    style: {
        '--n-color': 'transparent',
        '--n-color-hover': 'transparent',
        '--n-color-pressed': 'transparent',
        '--n-color-focus': 'transparent',
        '--n-text-color': '',
        '--n-text-color-hover': 'rgb(' + this.accentColor + ')',
        '--n-text-color-pressed': 'rgb(' + this.accentColor + ')',
        '--n-text-color-focus': 'rgb(' + this.accentColor + ')',
        '--n-border': '1px solid rgb(224, 224, 230)',
        '--n-border-hover': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-pressed': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-focus': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-radius': '8px',
    }
}" :positive-button-props="{
    style: {
        '--n-color': 'rgba(' + this.accentColor + ', 0.7)',
        '--n-color-hover': 'rgba(' + this.accentColor + ', 0.8)',
        '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.8)',
        '--n-color-focus': 'rgba(' + this.accentColor + ', 0.8)',
        '--n-text-color': 'white',
        '--n-text-color-hover': 'white',
        '--n-text-color-pressed': 'white',
        '--n-text-color-focus': 'white',
        '--n-border': '1px solid rgb(224, 224, 230)',
        '--n-border-hover': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-pressed': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-focus': '1px solid rgb(' + this.accentColor + ')',
        '--n-border-radius': '8px',
    }
}">
                                                    <template #trigger>
                                                        <n-button text circle :focusable="false"
                                                            :disabled="this.$cookies.get('userid') != comment_2nd.up.id"
                                                            :style="{
                                                                '--n-color': 'transparent',
                                                                '--n-color-hover': 'transparent',
                                                                '--n-color-pressed': 'transparent',
                                                                '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                                                '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                                                '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                                                '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.6)',
                                                                '--n-border': '1px solid transparent',
                                                                '--n-border-hover': '1px solid transparent',
                                                                '--n-border-pressed': '1px solid transparent',
                                                            }">
                                                            <n-icon size="18">
                                                                <TrashOutline />
                                                            </n-icon>
                                                        </n-button>
                                                    </template>
                                                    确认删除这条评论吗？
                                                </n-popconfirm>
                                            </span>
                                        </span>
                                    </template>
                                    <template #author>
                                        <router-link :to="`/home/user/${comment_2nd.up.id}`">
                                            <div style="font-size: 18px"
                                                :style="{ 'color': 'rgb(' + this.accentColor + ')' }">{{
                                                    comment_2nd.up.username }}</div>
                                        </router-link></template>
                                    <template #avatar>
                                        <router-link :to="`/home/user/${comment_2nd.up.id}`">
                                            <a-avatar :src="comment_2nd.up.avatar" :size="50" /></router-link>
                                    </template>
                                    <template #content>
                                        <p style="font-size: 13.5px; margin-top: 8px; margin-bottom: 0px"
                                            :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                                            {{ comment_2nd.content }}
                                        </p>
                                    </template>
                                    <template #datetime>
                                        <a-tooltip :title="comment_2nd.date.replace('T', ' ').split('.')[0]">
                                            <span style="margin-bottom: 0; font-size: 10px">
                                                {{
                                                    dayjs(
                                                        comment_2nd.date.replace("T", " ").split(".")[0]
                                                    ).fromNow()
                                                }}
                                            </span>
                                        </a-tooltip>
                                    </template>
                                    <div v-if="this.edit2ndComment && this.edit2ndCommentId == comment_2nd.id">
                                        <div>
                                            <n-input style="margin-bottom: 15px" maxlength="200" show-count placeholder=""
                                                type="textarea" v-model:value="value" :style="{
                                                    '--n-color': 'transparent',
                                                    '--n-color-focus': 'transparent',
                                                    '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                                    '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                                    '--n-border-hover': 'transparent',
                                                    '--n-border-focus': 'transparent',
                                                    '--n-placeholder-color':
                                                        this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                                    '--n-border-radius': '8px',
                                                    '--n-font-size': '15px',
                                                    '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                                    '--n-box-shadow-focus':
                                                        '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                                }" :autosize="{
    minRows: 6,
    maxRows: 6,
}" />
                                            <div class="my-comment-button">
                                                <n-button class="send-button" strong secondary type="tertiary" :style="{
                                                    '--n-color': 'rgba(' + this.accentColor + ', 0.1)',
                                                    '--n-color-hover': 'rgba(' + this.accentColor + ', 0.25)',
                                                    '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.25)',
                                                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                                    '--n-border': '1px solid transparent',
                                                    '--n-border-hover': '1px solid transparent',
                                                    '--n-border-pressed': '1px solid transparent',
                                                    '--n-border-radius': '5px',
                                                    '--n-height': '36px',
                                                    '--n-font-size': '16px',
                                                }" @click="send2ndComment">
                                                    发送
                                                </n-button>
                                                <n-button class="clean-button-2nd" strong secondary type="tertiary" :style="{
                                                    '--n-color': 'rgba(' + this.accentColor + ', 0.1)',
                                                    '--n-color-hover': 'rgba(' + this.accentColor + ', 0.25)',
                                                    '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.25)',
                                                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.8)',
                                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                                    '--n-border': '1px solid transparent',
                                                    '--n-border-hover': '1px solid transparent',
                                                    '--n-border-pressed': '1px solid transparent',
                                                    '--n-border-radius': '5px',
                                                    '--n-height': '36px',
                                                    '--n-font-size': '16px',
                                                }" @click="cleanComment">
                                                    清空
                                                </n-button>
                                            </div>
                                        </div>
                                    </div>
                                </a-comment>
                            </div>
                        </div>
                    </a-comment>
                </div>
                <div class="card-pagination">
                    <n-grid>
                        <n-gi :span="8"></n-gi>
                        <n-gi :span="8">
                            <div style="display: flex; justify-content: center" v-if="comments.length > 0">
                                <n-pagination v-model:page="page" :page-count="Math.ceil(comments.length / 5)" :style="{
                                    '--n-item-text-color-hover': 'rgb(' + this.accentColor + ')',
                                    '--n-item-text-color-active': 'rgb(' + this.accentColor + ')',
                                    '--n-item-text-color-pressed': 'rgb(' + this.accentColor + ')',
                                    '--n-item-border-active': '1px solid rgb(' + this.accentColor + ')',
                                    '--n-item-color-disabled': 'transparent',
                                }" />
                            </div>
                            <div style="display: flex; justify-content: center; font-size: 20px" v-else :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                期待你的评论
                            </div>
                        </n-gi>
                        <n-gi :span="8"></n-gi>
                    </n-grid>
                </div>
            </n-gi>
            <n-gi :span="4"></n-gi>
        </n-grid>
    </div>
    <modify-complain-view :showModifyComplainView="showModifyComplainView"
        @closeModifyWindow="showModifyComplainView = false"></modify-complain-view>
    <div v-show="false"><top-nav></top-nav></div>
    <n-modal :z-index="2" v-model:show="showCollections">
        <div :style="{
            'background': getRGBString(backgroundColorString, 0.6),
            'position': 'relative',
            'top': '-50px',
            'text-align': 'center',
            'border-radius': '50px'
        }">
            <div :style="{
                'margin': '20px',
                'font-size': '25px',
                'font-weight': '700',
                'background-color': getRGBString(backgroundColorString, 0.8),
                'color': getRGBString(fontColorString, 0.8),
                'margin-top': '20px',
                'border-radius': '50px',
                'animation': isCollectChanged ? 'bounceIn' : '',
                'animation-duration': '1s'
            }">{{ headChange === true ? '添加成功' : '请选择收藏夹' }}
            </div>
            <image-table :rows="collectionData" :tableSize="[1000,]" :entrySize="[200, 200]" :position="'CollectionView'"
                @flushCollections="updateCollections" :handleClickEntry="handleClickEntry"></image-table>
        </div>

    </n-modal>
</template>

<script>
import "animate.css";
import { NModal } from 'naive-ui';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TopNav from "../components/TopNav.vue";
import ModifyComplainView from "../views/ModifyComplainView.vue";
import { defineComponent, ref } from "vue";
import { message } from "ant-design-vue";
import { mapState } from 'vuex';
import {
    ChevronBack,
    StarOutline,
    FitnessOutline,
    WarningOutline,
    ChatbubbleEllipsesOutline,
    ChatboxEllipsesOutline,
    TrashOutline,
    CreateOutline,
    Fitness,
    Star,
    Warning,
    Play,
    HeartOutline,
    Heart,
} from "@vicons/ionicons5";
dayjs.extend(relativeTime);
import {
    globalThemeColor,
    getBackgroundColorString,
    getRGBString,
    getFontColorString,
    changeThemeColorByImage,
} from "/src/colorMode.js";
import ImageTable from '/src/components/tables/ImageTable/ImageTable.vue';
export default defineComponent({
    name: "PlayerView",
    components: {
        ChevronBack,
        StarOutline,
        FitnessOutline,
        WarningOutline,
        ChatbubbleEllipsesOutline,
        ChatboxEllipsesOutline,
        TrashOutline,
        CreateOutline,
        Fitness,
        Star,
        Warning,
        Play,
        ModifyComplainView,
        HeartOutline,
        Heart,
        ImageTable,
        NModal
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
                    document.title = `${this.music.name} - ${this.music.artist}`;
                    this.islike = this.music.is_like;
                    this.iscollect = this.music.is_favorite;
                    this.songtags = this.music.tags;
                    this.iscomplain = this.music.is_complained;
                    if (this.music.lrc != null) {
                        this.$http.get(`${this.music.lrc}`).then((response) => {
                            this.updateLyrics(response.data);
                        });
                    } else {
                        this.updateLyrics("[00:00.000]暂无歌词");
                    }
                });
                this.$http.get(`/api/comment/of/${musicId}/`).then((response) => {
                    this.comments = response.data.comment_set;
                });
            },
            { immediate: true }
        );
    },
    mounted() {
        this.lyricsIndex = 0;
        this.scroll("auto");
    },
    computed: {
        ...mapState(['colorMode', 'accentColor']),
    },
    setup() {
        return {
            handlePositiveClick(comment) {
                const index = this.comments.findIndex((cmt) => cmt.id === comment.id);
                if (index !== -1) {
                    this.comments.splice(index, 1);
                }
                if ((this.page - 1) * 5 >= this.comments.length) {
                    this.page -= 1;
                }
                this.deleteMyComment(comment);
            },
            handleNegativeClick() {
                // alert("取消");
            },
            success(msg) {
                message.success({
                    content: msg,
                    duration: 1,
                });
            },
            warning(msg) {
                message.warning({
                    content: msg,
                    duration: 1,
                });
            },
            railStyle: ({ focused, checked }) => {
                const style = {};
                if (checked) {
                    style.background = "#fff";
                    if (focused) {
                        style.boxShadow = "0 0 0 2px #fff";
                    }
                } else {
                    style.background = "grey";
                    if (focused) {
                        style.boxShadow = "0 0 0 2px grey";
                    }
                }
                return style;
            },
            dayjs,
            value: ref(""),
            editCommentId: ref(0), // 一级评论的评论id
            editNewCommentId: ref(1), // 编辑新评论
            edit2ndCommentId: ref(0), // 二级评论的评论id
            edit2ndCommentParentId: ref(0), // 二级评论的父评论，即对应的一级评论
            islike: ref(false),
            iscollect: ref(false),
            iscomplain: ref(false),
            lyricsRef: ref(),
            edit1stComment: ref(false), // 修改一级评论
            reply2ndComment: ref(false), // 回复一级评论，即编辑二级评论
            edit2ndComment: ref(false), // 修改二级评论
        };
    },
    data() {
        return {
            id: 0,
            page: 1,
            comments: [],
            songtags: [],
            music: {},
            lyricsIndex: 0,
            lyricsObjArr: [],
            collctionData: this.updateCollections(),
            showCollections: false,
            isCollectChanged: false,
            headChange: false,
            hasTranslation: false,
            showTranslation: true,
            getRGBString,
            backgroundColorString: getBackgroundColorString(globalThemeColor, 225),
            fontColorString: getFontColorString(globalThemeColor),
            showModifyComplainView: false,
            refreshCommentVir: 0,
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        like() {
            if (!this.$cookies.isKey('userid')) { // 未登录
                this.$EventBus.emit('showLoginModal');
            } else {                              // 已登录
                this.islike = !this.islike;
                /* if (this.islike == true) {
                  this.success("已添加至我喜欢");
                } else {
                  this.success("已从我喜欢移除");
                } */
                this.$http.post(`/api/like/${this.music.id}/`).then((response) => {
                    console.log(response.data);
                });
            }
        },
        judgeLogState() {
            if (!this.$cookies.isKey('userid')) {
                this.$EventBus.emit('showLoginModal')
            }
        },
        collect() {
            //todo
            this.showCollections = true
        },
        complain() {
            //todo
            // if (this.iscomplain == false) {
            //     this.iscomplain = !this.iscomplain;
            // }
            if (!this.$cookies.isKey('userid')) {
              this.$EventBus.emit('showLoginModal')
            } else {
              this.showModifyComplainView = true;
            }
            
        },
        cleanComment() {
            this.value = "";
        },
        sendComment() {
            if (this.value == "") {
                this.warning("评论内容不能为空");
                return;
            }
            let formData = new FormData();
            formData.append("content", this.value);
            if (this.editNewCommentId == 1) {
                this.$http.post(`/api/comment/on/music/${this.music.id}/`, formData).then(() => {
                    //this.success("评论成功");
                    this.regetComments();
                });
            } else if (this.editNewCommentId == 0 && this.editCommentId != 0) {
                this.$http.post(`/api/comment/edit/${this.editCommentId}/`, formData).then(() => {
                    //this.success("编辑成功");
                    this.regetComments();
                });
                this.editCommentId = 0;
                this.editNewCommentId = 1;
            }
            this.refreshCommentVir++;
            console.log(this.refreshCommentVir);
            this.value = "";
        },
        deleteMyComment(comment) {
            this.$http.delete(`/api/comment/delete/${comment.id}/`).then(() => {
                //this.success("删除成功");
                this.regetComments();
            });
            this.refreshCommentVir++;
            console.log(this.refreshCommentVir);
        },
        send2ndComment() {
            if (this.value == "") {
                this.warning("评论内容不能为空");
                return;
            }
            let formData = new FormData();
            formData.append("content", this.value);
            if (this.edit2ndCommentId == 0) {
                this.$http
                    .post(`/api/comment/on/comment/${this.edit2ndCommentParentId}/`, formData)
                    .then(() => {
                        //this.success("回复评论成功");
                        this.regetComments();
                    });
            } else {
                this.$http
                    .post(`/api/comment/edit/${this.edit2ndCommentId}/`, formData)
                    .then(() => {
                        //this.success("编辑成功");
                        this.regetComments();
                    });
                this.edit2ndCommentId = 0;
                this.edit2ndCommentParentId = 0;
            }
            this.refreshCommentVir++;
            console.log(this.refreshCommentVir);
            this.value = "";
        },
        // 编辑回复评论
        editReplyComment(comment) {
            this.edit2ndCommentParentId = comment.id;
            if (!this.reply2ndComment) {
                this.reply2ndComment = true;
            } else {
                this.value = "";
                this.reply2ndComment = false;
            }
        },
        // 修改回复评论
        editMy2ndComment(comment) {
            this.edit2ndCommentId = comment.id;
            this.value = comment.content;
            if (!this.edit2ndComment) {
                this.edit2ndComment = true;
            } else {
                this.value = "";
                this.edit2ndComment = false;
            }
        },
        // 修改我的评论
        editMyComment(comment) {
            // console.log(this.$cookies.get("userid"));
            // console.log(comment.author_id);
            // alert("yes!");
            this.value = comment.content;
            this.editNewCommentId = 0;
            this.editCommentId = comment.id;
            if (!this.edit1stComment) {
                this.edit1stComment = true;
            } else {
                this.value = "";
                this.edit1stComment = false;
            }
            // document.querySelector("#comment-top").scrollIntoView({
            //   behavior: "smooth",
            // });
            // if (document.querySelector(".n-input-wrapper") == null) {
            //   document.querySelector("#comment-fold").click();
            // }
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
                top = this.lyricsIndex > 3 ? 77.8 + 57.75 * (this.lyricsIndex - 5) : 0;
            } else {
                top = this.lyricsIndex > 3 ? 57.75 * (this.lyricsIndex - 3) : 0;
            }
            this.lyricsRef.scrollTo({
                left: 0,
                top: top,
                behavior: behavior,
            });
        },
        regetComments() {
            const musicId = this.$route.params.musicId;
            this.$http.get(`/api/comment/of/${musicId}/`).then((response) => {
                this.comments = response.data.comment_set;
            });
        },
        scrollToComments() {
            const t = this.$refs.scrollTarget
            t.scrollIntoView({ behavior: 'smooth' })
        },
        handleClickEntry(listId) {
            this.isCollectChanged = true
            this.headChange = true
            this.iscollect = true
            this.$http.post(`/api/favorite/${listId}/${this.music.id}/`)
            setTimeout(() => {
                this.showCollections = false
                setTimeout(() => {
                    this.headChange = false
                    this.isCollectChanged = false
                }, 500)
            }, 800)
        },
        updateCollections() {
            this.$http.get('/api/playlist/of/0/').then((response) => {
                let key = 0
                if (response.data.playlist_set.length == 0) {
                    this.collectionData = []
                    return
                }
                this.collectionData = response.data.playlist_set.map((collection) => {
                    return {
                        Key: key++,
                        Id: collection.id,
                        imagePath: collection.cover,
                        Name: collection.title,
                        songCount: collection.music_set.length,
                        Type: 'Collection'
                    }
                })
            })//更新当前用户的收藏夹数据
        },
    },
});
</script>


<style scoped>
.content {
    position: relative;
    z-index: 2;
}

.background-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(40px) saturate(1);
    /* 背景图片模糊效果 */
    opacity: 0.5;
    z-index: -1;
}

.background-imgfloat {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    /* 黑色遮罩，透明度为0.5 */
    z-index: 1;
}

.player-page {
    height: 100vh;
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
    margin-top: 27%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.music-cover-img {
    /* position: absolute; */
    margin: auto;
    border-radius: 10px;
}

.three-buttons {
    margin-top: 8%;
}

.button {
    margin: auto;
}

.lyrics-part {
    display: flex;
    width: 500px;
    margin: auto;
    margin-top: 12%;
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

:deep(.n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main) {
    display: inline;
}

:deep(.n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner) {
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

.clean-button-2nd {
    position: absolute;
    margin-left: 850px;
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

.lyrics-part {
    text-align: center;
}

.music-name {
    font-size: 24px;
    text-align: center;
}

.music-artist {
    font-size: 16px;
    text-align: center;
}

.lyrics-wrap>.lyrics {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.lyrics-wrap>.lyrics>.content {
    color: #fff;
    font-size: 16px;
    opacity: 0.7;
}

.lyrics-wrap>.translation {
    color: #fff;
    font-size: 12px;
    opacity: 0.7;
}

.lyrics-wrap.current>.lyrics>.content {
    font-size: 18px;
    font-weight: 600;
    opacity: 1;
}

.lyrics-wrap.current>.translation {
    color: #fff;
    font-size: 16px;
    opacity: 1;
}

.lyrics-wrap:hover>.lyrics>.content {
    opacity: 1;
}

.lyrics-wrap:hover>.translation {
    opacity: 1;
}

.lyrics-wrap>.lyrics>.time {
    visibility: hidden;
}

.lyrics-wrap:hover>.lyrics>.time {
    visibility: visible;
    display: flex;
    justify-content: flex-end;
    color: #fff;
    font-size: 12px;
    font-weight: lighter;
}

.lyrics-wrap>.lyrics>.jumpLink {
    visibility: hidden;
}

.lyrics-wrap:hover>.lyrics>.jumpLink {
    visibility: visible;
    display: flex;
    justify-content: flex-start;
}

.jumpLink:hover {
    cursor: pointer;
}

.translationSwitch {
    padding-right: 15px;
    display: flex;
    justify-content: flex-end;
}

.tag-item {
    margin-left: 10px;
}

.hoverable-icon:hover {
    cursor: pointer;
}
</style>
