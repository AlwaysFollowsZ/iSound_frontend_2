<script>
import { NButton, NIcon } from "naive-ui";
import { defineComponent, ref } from "vue";
import { mapState } from 'vuex'
//import ListTable from "/src/components/tables/ListTable/ListTable.Vue";
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
import ListTable from "/src/components/tables/ListTable/ListTable.vue";
import ModifyComplainView from "../views/ModifyComplainView.vue";
import { getBackgroundColorString, globalThemeColor, getRGBString } from '/src/colorMode.js'
import TopNav from "../components/TopNav.vue";
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
        TopNav,
    },
    computed: {
        ...mapState(['colorMode', 'accentColor']),
        BackgroundColorString() {
            return getRGBString(getBackgroundColorString(globalThemeColor))
        }
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
            setTimeout(() => {
                let selections = document.getElementsByClassName('n-base-selection n-base-selection--multiple')

                // let tags = document.getElementsByClassName('n-tag')
                // console.log(tags.length)
                if (selections.length > 0) {
                    // 含有 '--' 分隔的属性只能这么写
                    selections[0].style.setProperty('--n-color', 'white')
                    selections[0].style.setProperty('--n-color-focus', 'white')
                    selections[0].style.setProperty('--n-color-active', 'white')
                    selections[0].style.setProperty('--n-border', '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)')
                    selections[0].style.setProperty('--n-border-active', '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)')
                    selections[0].style.setProperty('--n-border-focus', '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)')
                    selections[0].style.setProperty('--n-border-hover', '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)')
                    selections[0].style.setProperty('--n-border-radius', '8px')
                    selections[0].style.setProperty('--n-box-shadow-active', '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)')
                    selections[0].style.setProperty('--n-box-shadow-focus', '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)')
                    selections[0].style.setProperty('--n-box-shadow-hover', '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)')
                    selections[0].style.setProperty('--n-font-size', '16px')
                    selections[0].style.setProperty('--n-height', '40px')
                    selections[0].style.setProperty('--n-caret-color', 'black')
                    selections[0].style.setProperty('--n-placeholder-color', 'grey')
                    selections[0].style.setProperty('--n-text-color', 'black')
                    selections[0].style.setProperty('--n-arrow-color', 'black')
                }
                // if (tags.length > 0) {
                //     tags[0].style.setProperty('--n-color', 'red')
                // }
            }, 50)
        },
        closeWindow() {
            this.active1 = false
            this.active2 = false
            this.active3 = false
            this.confirmButton = false
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
            setTimeout(() => {
                this.$router.push('/home')
            }, 1000)
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
            setTimeout(() => {
                this.$router.push('/home')
            }, 1000)
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
                document.title = `${this.up.username}的歌单 - ${this.playlist.title}`;
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
                    isLiked: music.is_like,
                    isCollected: music.is_favorite,
                    imgSrc: music.cover,
                    showCollection: false,
                }));
            });
        },
        handleCoverChange(e) {
            this.cover = e.file.file;
        },
        handleSwitchActive() {
            this.confirmButton = (this.active1 && this.active2 && this.active3)
        },
        handleUpdateValue(value, option) {
            if (value.length > 3) {
                value.splice(0, 1)
            }
            let options = []
            this.tags.forEach((value) => {
                const option = this.options.find((option) => option.value == value);
                if (option) {
                    options.push(option);
                    option.style={
                        'background-color': this.accentColor === '0,0,0' || this.accentColor === '0,0,0' ? 
                        this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)' :
                        'rgba(' + this.accentColor + ', 0.2)',
                        'color': 'rgb(' + this.accentColor + ')',
                        '--n-option-check-color': 'rgb(' + this.accentColor + ')',
                    }   
                }
            })
            let op=this.options.filter(function(v){return options.indexOf(v)==-1})
            let i=0,j=0;
            for(i=0;i<op.length;i++){
                for(j=0;j<this.options.length;j++){
                    if(op[i].value==this.options[j].value){
                        this.options[j].style={'background-color':this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                        'color':this.colorMode === 'white' ? 'black' : 'white',
                        '--n-option-check-color': 'rgb(' + this.accentColor + ')',}
                    }
                }
            } 
        },
        renderTags() {
            let menus = document.getElementsByClassName('n-base-select-menu n-base-select-menu--multiple n-select-menu')
            if (menus.length > 0) {
                let menu = menus[0]
                menu.style.setProperty('--n-option-color-pending', this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108')
                menu.style.setProperty('--n-option-color-active-pending', this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108')
            }
            //let options = []
            
            for (let i = 0; i < this.options.length; i++) {
                this.options[i].style = 
                    { 
                      'background-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                      'color': this.colorMode === 'white' ? 'black' : 'white',
                    }
            }
            this.tags.forEach((value) => {      
                const option = this.options.find((option) => option.value == value);
                if (option) {
                    //options.push(option);
                    option.style={
                        'background-color': this.accentColor === '0,0,0' || this.accentColor === '0,0,0' ? 
                        this.colorMode === 'white' ? 'rgb(243, 243, 245)' : 'rgb(108,108,108)' :
                        'rgba(' + this.accentColor + ', 0.2)',
                        'color': 'rgb(' + this.accentColor + ')',
                        '--n-option-check-color': 'rgb(' + this.accentColor + ')',
                    }   
                }
            })
        }
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
                        "z-index": "2",
                    },
                });
            },
            success(msg) {
                message.success({
                    content: msg,
                    duration: 1,
                    style: {
                        "z-index": "2",
                    },
                });
            },
        };
    },
    mounted() {
        if (this.$route.params.shareModal === 'true') {
            this.shareList()
        }
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
            active1: false,
            active2: false,
            active3: false,
            confirmButton: false,
        };
    },
});
</script>
<template>
    <div class="list-detail-page" style="min-width: 1400px;" v-if="this.playlist.up !== undefined">
        <n-grid>
            <n-gi :span="4">
                <n-button tertiary circle class="back-button" @click="back">
                    <ChevronBack style="width: 36px; position: absolute; left: 0px;" />
                </n-button></n-gi>
            <n-gi :span="4">
                <div class="list-cover">
                    <img draggable="false" class="list-cover-img" :src="this.playlist.cover" />
                </div>
                <div style="margin: 30px 0px 20px 0px">
                    <n-breadcrumb>
                        <n-breadcrumb-item >
                            <div style="font-size: 30px; font-weight: 500" :style="{'color': 'rgb(' + this.accentColor + ')'}">
                                <n-icon :component="MusicalNotesOutline" size="36" :color="'rgb(' + this.accentColor + ')'"/>
                                歌曲列表
                            </div>
                            </n-breadcrumb-item>
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
                                    <div style="font-size: 30px; font-weight:500; height: 50px" :style="{'color': 'rgb(' + this.accentColor + ')'}">
                                        {{ this.playlist.title }}
                                    </div>
                                </n-gi>
                                <n-gi v-if="this.$cookies.get('userid') == this.up.id" :span="3">
                                    <n-button :focusable="false" @click="editList"
                                    :style="{
                                        '--n-color': 'transparent',
                                        '--n-color-hover': 'transparent',
                                        '--n-color-pressed': 'transparent',
                                        '--n-text-color': 'rgba(' + this.accentColor + ', 0.7)',
                                        '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                        '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                        '--n-border': '1px solid transparent',
                                        '--n-border-hover': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                        '--n-border-pressed': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                        '--n-border-radius': '5px',
                                        '--n-height': '36px',
                                        '--n-font-size': '16px',
                                    }"
                                    >
                                        <n-icon size="20">
                                            <CreateOutline />
                                        </n-icon>
                                        <div style="font-size: 16px">编辑</div>
                                    </n-button>
                                </n-gi>
                            </n-grid>
                        </n-gi>
                        <n-gi>
                            <div>
                                <a v-if="this.$cookies.get('userid') == this.up.id && this.tagsNum == 0"
                                    @click="editList">添加标签</a>
                                <n-tag 
                                    v-else v-for="(tag, i) in this.playlist.tags" :key="i" class="tags"
                                    :style="{
                                        '--n-border-radius': '4px',
                                        '--n-border': '1px solid rgba(' + this.accentColor + ', 0.5)',
                                        '--n-color': 'transparent',
                                        '--n-text-color': 'rgb(' + this.accentColor + ')',
                                    }"
                                >
                                    # {{ tag }}
                                </n-tag>
                            </div>
                        </n-gi>
                        <n-gi>
                            <span style="font-size: 16px; font-weight: 450" :style="{'color': 'rgb(' + this.accentColor + ')'}">来源  </span>
                            <span class="up-link" @click="
                                this.$router.push(
                                    this.$cookies.get('userid') == this.up.id
                                        ? '/home'
                                        : `/home/user/${this.up.id}`
                                )
                                "
                                :style="{'color': this.colorMode === 'white' ? 'rgb(50,50,50)' : 'rgb(222,222,222)'}"  
                                style="font-size: 16px"  
                            >
                                {{ this.up.username }}
                            </span>
                        </n-gi>
                        <n-gi>
                            <div>
                                <span style="font-size: 16px; font-weight: 450" :style="{'color': 'rgb(' + this.accentColor + ')'}">
                                    歌曲数量  
                                </span>
                                <span style="font-size: 16px" :style="{'color': this.colorMode === 'white' ? 'rgb(50,50,50)' : 'rgb(222,222,222)'}">
                                {{ this.songNum }}
                                </span>
                            </div>
                        </n-gi>
                        <n-gi>
                            <div>
                                <span style="font-size: 16px; font-weight: 450" :style="{'color': 'rgb(' + this.accentColor + ')'}">
                                    歌单简介 
                                </span>
                                <span style="font-size: 16px" :style="{'color': this.colorMode === 'white' ? 'rgb(50,50,50)' : 'rgb(222,222,222)'}">
                                    {{ this.playlist.profile }}
                                </span>
                            </div>
                        </n-gi>
                        <n-gi>
                            <n-button :focusable="false" @click="playAll" class="playall-button"
                                :style="{
                                    '--n-color': 'transparent',
                                    '--n-color-hover': 'transparent',
                                    '--n-color-pressed': 'transparent',
                                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.7)',
                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-border': '1px solid rgba(' + this.accentColor + ', 0.25)',
                                    '--n-border-hover': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                    '--n-border-pressed': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                    '--n-border-radius': '5px',
                                    '--n-height': '36px',
                                    '--n-font-size': '16px',
                                }"
                            >
                                <n-icon>
                                    <PlayOutline />
                                </n-icon>
                                &nbsp; 播放全部
                            </n-button>
                            <n-button v-if="this.$cookies.get('userid') == this.up.id &&
                                this.playlist.shared == false
                                " :focusable="false" @click="shareList" class="share-button"
                                :style="{
                                    '--n-color': 'transparent',
                                    '--n-color-hover': 'transparent',
                                    '--n-color-pressed': 'transparent',
                                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.7)',
                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-border': '1px solid rgba(' + this.accentColor + ', 0.25)',
                                    '--n-border-hover': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                    '--n-border-pressed': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                    '--n-border-radius': '5px',
                                    '--n-height': '36px',
                                    '--n-font-size': '16px',
                                }"    
                            >
                                <n-icon>
                                    <OpenOutline />
                                </n-icon>
                                &nbsp; 分享歌单
                            </n-button>
                            <n-button v-if="(this.$cookies.get('userid') == this.up.id ||
                                this.$cookies.get('is_superuser') == 'true') &&
                                this.playlist.shared == true
                                " :focusable="false" @click="unshareList" class="share-button"
                                :style="{
                                    '--n-color': 'transparent',
                                    '--n-color-hover': 'transparent',
                                    '--n-color-pressed': 'transparent',
                                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.7)',
                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-border': '1px solid rgba(' + this.accentColor + ', 0.25)',
                                    '--n-border-hover': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                    '--n-border-pressed': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                    '--n-border-radius': '5px',
                                    '--n-height': '36px',
                                    '--n-font-size': '16px',
                                }"        
                            >
                                <n-icon>
                                    <OpenOutline />
                                </n-icon>
                                &nbsp; 取消分享
                            </n-button>
                            <n-button v-if="this.$cookies.isKey('userid') &&
                                this.$cookies.get('userid') != this.up.id
                                " :focusable="false" @click="complainList"
                                :style="{
                                    '--n-color': 'transparent',
                                    '--n-color-hover': 'transparent',
                                    '--n-color-pressed': 'transparent',
                                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.7)',
                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-border': '1px solid rgba(' + this.accentColor + ', 0.25)',
                                    '--n-border-hover': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                    '--n-border-pressed': '1px solid rgba(' + this.accentColor + ', 0.6)',
                                    '--n-border-radius': '5px',
                                    '--n-height': '36px',
                                    '--n-font-size': '16px',
                                }"    
                            >
                                <n-icon>
                                    <WarningOutline />
                                </n-icon>
                                &nbsp; 投诉歌单
                            </n-button>
                        </n-gi>
                    </n-grid>
                </div>
            </n-gi>
            <n-gi :span="4"></n-gi>
        </n-grid>
    </div>
    <div class="music-list-item" style="min-width: 1400px" v-if="this.playlist.up !== undefined">
        <n-grid>
            <n-gi :span="4"></n-gi>
            <n-gi :span="16">
                <a-divider style="height: 1.8px; background-color: #dddddd" />
                <list-table v-if="playlist.music_set.length > 0" :view-mode="'user'" :position="playlist.shared===true?'PublicView':'CollectionView'"
                    v-model:songData="this.songData" :currentListId="playlist.id"></list-table>
            </n-gi>
            <n-gi :span="4"></n-gi>
        </n-grid>
    </div>
    <n-modal :show="showEditListModify" :style="{'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)'}" :block-scroll="false"  z-index="2">
        
            <div class="outer-container" style="width: 700px">
                <div class="title-container">
                    <div style="margin-bottom: 25px">
                        
                            <n-grid>
                                <n-gi :span="2"></n-gi>
                                <n-gi :span="20">
                                    <div class="register-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                        编辑{{ this.playlist.shared ? "歌单" : "收藏夹" }}
                                    </div>
                                </n-gi>
                                <n-gi :span="2">
                                    <n-icon class="close-icon" style="padding-top: 5px" size="40px" @click="closeWindow" :color="this.colorMode === 'white' ? 'black' : 'white'">
                                        <close-outline />
                                    </n-icon>
                                </n-gi>
                            </n-grid>
                    </div>
                </div>
                <div class="body-container">
                    <n-grid>
                        <n-gi :span="1"></n-gi>
                        <n-gi :span="6">
                            <n-popover trigger="hover">
                                <template #trigger>
                                    <div class="upload-list-cover" @click="uploadFile">
                                        <n-upload class="upload-list-cover-image" list-type="image-card" accept="image/*"
                                            max="1" @preview="handlePreview" :on-change="handleCoverChange"
                                            style="max-width: 200px">
                                            <n-icon size="100" depth="5">
                                                <ImageOutline />
                                            </n-icon>
                                        </n-upload>
                                        <n-image :src="previewImageUrl" style="width: 200px" />
                                    </div>
                                </template>
                                <span>点击以上传封面</span>
                            </n-popover>
                        </n-gi>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="15">
                            <div class="body-item">
                                <n-grid>
                                    <n-gi :span="3"></n-gi>
                                    <n-gi :span="18">
                                        <div class="body-item-title">
                                            {{ this.playlist.shared ? "歌单" : "收藏夹" }}名称
                                        </div>
                                        <n-input type="text" :placeholder="'你需要填写' + (this.playlist.shared ? '歌单' : '收藏夹') + '名称'" :maxlength="20" show-count
                                            v-model:value="listName"
                                            :style="{
                                                '--n-text-color-disabled': 'black',
                                                '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                                '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                                '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                                '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                                '--n-border-hover': 'transparent',
                                                '--n-border-focus': 'transparent',
                                                '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                                '--n-border-radius': '5px',
                                                '--n-height': '40px',
                                                '--n-font-size': '18px',
                                                '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                                '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                            }"    
                                        />
                                    </n-gi>
                                    <n-gi :span="3"></n-gi>
                                </n-grid>
                            </div>
                            <div class="body-item">
                                <n-grid>
                                    <n-gi :span="3"></n-gi>
                                    <n-gi :span="18">
                                        <div class="body-item-title">
                                            分类标签
                                        </div>
                                        <n-select v-model:value="tags" multiple :options="options" :placeholder="'你需要选择1～3个分类标签'" @click="renderTags" @update:value="handleUpdateValue"/>
                                    </n-gi>
                                    <n-gi :span="3"></n-gi>
                                </n-grid>
                            </div>
                            <div class="body-item">
                                <n-grid>
                                    <n-gi :span="3"></n-gi>
                                    <n-gi :span="18">
                                        <div class="body-item-title">
                                            简介
                                        </div>
                                        <n-input v-model:value="listIntro" type="textarea" placeholder="" :autosize="{
                                            minRows: 6,
                                            maxRows: 6,
                                        }" :maxlength="150" show-count
                                        :style="{
                                            '--n-text-color-disabled': 'black',
                                            '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                                            '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                                            '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                                            '--n-border-hover': 'transparent',
                                            '--n-border-focus': 'transparent',
                                            '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                                            '--n-border-radius': '5px',
                                            '--n-font-size': '18px',
                                            '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                                            '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
                                        }"   
                                        >
                                        </n-input>
                                    </n-gi>
                                    <n-gi :span="3"></n-gi>
                                </n-grid>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
                <div style="width: 100%;">
                    <n-grid>
                        <n-gi :span="20"></n-gi>
                        <n-gi :span="2">
                            <div style="display: flex; justify-content: right">
                                <n-button strong secondary type="primary" @click="submitEdit"
                                :style="{
                                    '--n-color': 'rgba(' + this.accentColor + ', 0.25)',
                                    '--n-color-hover': 'rgba(' + this.accentColor + ', 0.45)',
                                    '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.45)',
                                    '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                                    '--n-border': '1px solid transparent',
                                    '--n-border-hover': '1px solid transparent',
                                    '--n-border-pressed': '1px solid transparent',
                                    '--n-border-radius': '5px',
                                    '--n-height': '40px',
                                    '--n-font-size': '18px',
                                }"
                                >
                                    完成
                                </n-button>
                            </div>
                        </n-gi>
                    </n-grid>
                    
                </div>
            
            <!-- <n-card class="edit-list-hodder" style="--n-border-radius: 20px">
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
                                        <n-upload class="upload-list-cover-image" list-type="image-card" accept="image/*"
                                            max="1" @preview="handlePreview" :on-change="handleCoverChange"
                                            style="max-width: 200px">
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
                                <n-input type="text" placeholder="请输入歌单名称" :maxlength="20" show-count
                                    v-model:value="listName" />
                            </div>
                            <div>
                                <div style="padding: 10px 0px 3px 0px; font-size: 16px">标签</div>
                                <n-space vertical>
                                    <n-select v-model:value="tags" multiple :options="options" placeholder="请选择歌单标签" />
                                </n-space>
                            </div>
                            <div>
                                <div style="padding: 10px 0px 3px 0px; font-size: 16px">简介</div>
                                <n-input v-model:value="listIntro" type="textarea" placeholder="每张歌单都有自己的故事~" :autosize="{
                                    minRows: 6,
                                    maxRows: 6,
                                }" :maxlength="150" show-count>
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
            </n-card> -->
        </div>
    </n-modal>
    <n-modal :show="showShareListModify" :style="{'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)'}" :block-scroll="false"  z-index="2">
        <div class="outer-container">
            <div class="title container">
                <div style="margin-bottom: 25px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="register-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                来自 iSound 的提醒
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
                <div class="body-container">
                    <div class="body-item" :style="{'color': 'rgb(' + this.accentColor + ')', 'font-size': '20px'}">
                        <n-grid><n-gi :span="3"></n-gi>
                        <n-gi :span="18">
                            <div :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                            你确认歌单名称了吗&nbsp;
                            <n-switch v-model:value="active1" @update:value="handleSwitchActive"></n-switch>
                        </div>
                        </n-gi>
                        <n-gi :span="3"></n-gi>
                    </n-grid>
                    </div>
                    <div class="body-item" :style="{'color': 'rgb(' + this.accentColor + ')', 'font-size': '20px'}">
                        <n-grid><n-gi :span="3"></n-gi>
                        <n-gi :span="18">
                            <div :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                            你确认分类标签了吗&nbsp;
                            <n-switch v-model:value="active2" @update:value="handleSwitchActive"></n-switch>
                            </div>
                        </n-gi>
                        <n-gi :span="3"></n-gi></n-grid>
                    </div>
                    <div class="body-item" :style="{'color': 'rgb(' + this.accentColor + ')', 'font-size': '20px'}">
                        <n-grid><n-gi :span="3"></n-gi>
                        <n-gi :span="18">
                            <div :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                            你确认歌单简介了吗&nbsp;
                            <n-switch v-model:value="active3" @update:value="handleSwitchActive"></n-switch>
                            </div>
                        </n-gi>
                        <n-gi :span="3"></n-gi></n-grid>
                    </div>
                </div>
                <div style="width: 100%; display: flex; justify-content: center">
                    <n-button :focusable="false" @click="closeWindow" style="margin: 0 10px"
                    :style="{
                        '--n-color': 'rgba(' + this.accentColor + ', 0.25)',
                        '--n-color-hover': 'rgba(' + this.accentColor + ', 0.45)',
                        '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.45)',
                        '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                        '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                        '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                        '--n-border': '1px solid transparent',
                        '--n-border-hover': '1px solid transparent',
                        '--n-border-pressed': '1px solid transparent',
                        '--n-border-radius': '5px',
                        '--n-height': '36px',
                        '--n-font-size': '18px',
                    }"
                    >取消</n-button>
                    <n-button :focusable="false" @click="confirmShare" style="margin: 0 10px" :disabled="!confirmButton"
                    :style="{
                        '--n-color': 'rgba(' + this.accentColor + ', 0.25)',
                        '--n-color-hover': 'rgba(' + this.accentColor + ', 0.45)',
                        '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.45)',
                        '--n-color-disabled': 'grey',
                        '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                        '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                        '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                        '--n-text-color-disabled': 'white',
                        '--n-border': '1px solid transparent',
                        '--n-border-hover': '1px solid transparent',
                        '--n-border-pressed': '1px solid transparent',
                        '--n-border-disabled': '1px solid transparent',
                        '--n-border-radius': '5px',
                        '--n-height': '36px',
                        '--n-font-size': '18px',
                    }"
                    >确认</n-button>
                </div>
            </div>
        </div>
            <!-- <n-card class="share-list-hodder" style="--n-border-radius: 20px">
                <span class="modify-title">
                    <div class="share-list-title">来自 iSound 的提醒</div>
                </span>
                <div class="confirm-message">
                    您确认歌单名了吗？<br /><br />
                    您为歌单添加标签了吗？<br /><br />
                    您为歌单添加简介了吗？
                </div>
                <div class="buttons">
                    <n-button :focusable="false" @click="closeWindow" style="margin: 0 10px">取消</n-button>
                    <n-button :focusable="false" @click="confirmShare" style="margin: 0 10px">确认</n-button>
                </div>
            </n-card> -->
        
    </n-modal>
    <modify-complain-view :showModifyComplainView="showModifyComplainView"
        @closeModifyWindow="showModifyComplainView = false"></modify-complain-view>
    <div v-show="false"><top-nav></top-nav></div>
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
  transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
}

.list-cover-img:hover {
  /* box-shadow: inset 0 0 0px 15px v-bind("BackgroundColorString") ; */
  opacity: 0.8;
  transition: all cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
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
    padding-bottom: 1px;
    border-radius: 5px;
    font-size: 13px;
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

.outer-container {
    border-radius: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
}
.title-container {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
}
.body-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}

.body-item-title {
    color: grey
}

.close-icon:hover {
    cursor: pointer;
}
</style>
