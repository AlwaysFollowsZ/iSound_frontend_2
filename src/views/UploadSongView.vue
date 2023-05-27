<template>
    <n-modal :show="showUploadSong" :style="{'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)'}" :block-scroll="false">
         <div class="outer-container">
            
           <div class="title-container">
                <div style="margin-bottom: 30px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="upload-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">上传歌曲：编织你的音乐篇章</div>
                        </n-gi>
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="closeUWindow" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                                <n-icon size="40"><close-outline/></n-icon>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <div class="body-container">
                <n-grid>
                    <n-gi :span="9">
                        <n-popover trigger="hover">
                            <template #trigger>
                                <div class="upload-song-page">
                                    <img :src="songPageUrl" @click="uploadFile" />
                                    <input type="file" ref="fileInput" style="display: none"
                                    accept="image/*"    
                                    @change="handleSongPageChange" />
                                </div>
                            </template>
                            <span>点击此处上传歌曲封面</span>
                        </n-popover>
                    </n-gi>
                    <n-gi :span="15">
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">你需要上传歌曲文件</div>
                                    <div class="body-item-file-input">
                                        <n-button strong secondary type="primary" @click="uploadSongFile"
                                        :style="{
                                            '--n-color': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#8cbef8' : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-color-hover': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#539df5' : 'rgba(' + this.accentColor + ', 0.45)',
                                            '--n-color-pressed': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#539df5' : 'rgba(' + this.accentColor + ', 0.45)',
                                            '--n-text-color': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-hover': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-pressed': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-border': '1px solid transparent',
                                            '--n-border-hover': '1px solid transparent',
                                            '--n-border-pressed': '1px solid transparent',
                                            '--n-border-radius': '5px',
                                            '--n-width': '80px',
                                            '--n-height': '48px',
                                            '--n-font-size': '18px',
                                        }"
                                        >
                                            {{ songFileName }}
                                        </n-button>
                                        <input type="file" ref="songFileInput" @change="handleSongSrcFileChange" style="display: none"/>
                                    </div>
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">你可以选择上传歌词文件</div>
                                    <div class="body-item-file-input">
                                        <n-button strong secondary type="primary" @click="uploadLyricFile"
                                        :style="{
                                            '--n-color': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#8cbef8' : 'rgba(' + this.accentColor + ', 0.25)',
                                            '--n-color-hover': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#539df5' : 'rgba(' + this.accentColor + ', 0.45)',
                                            '--n-color-pressed': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    '#539df5' : 'rgba(' + this.accentColor + ', 0.45)',
                                            '--n-text-color': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-hover': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-text-color-pressed': 
                                                (this.accentColor === '0,0,0' || this.accentColor === '255,255,255') ? 
                                                    'white' : 'rgba(' + this.accentColor + ', 1)',
                                            '--n-border': '1px solid transparent',
                                            '--n-border-hover': '1px solid transparent',
                                            '--n-border-pressed': '1px solid transparent',
                                            '--n-border-radius': '5px',
                                            '--n-width': '80px',
                                            '--n-height': '48px',
                                            '--n-font-size': '18px',
                                        }"
                                        >
                                            {{ songLyricName }}
                                        </n-button>
                                        <input type="file" ref="songLyricInput" @change="handleSongLyricFileChange" style="display: none"/>
                                    </div>
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">歌手</div>
                                    <n-input type="text" size="small" placeholder="佚名" :value="songAuthor"
                                        @input="songAuthor = $event" />
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                        <div class="body-item">
                            <n-grid>
                                <n-gi :span="3"></n-gi>
                                <n-gi :span="18">
                                    <div class="body-item-title">分类标签</div>
                                    <n-select v-model:value="value" multiple :options="options" placeholder="你需要为歌曲添加1～4个分类标签" max-tag-count="responsive"/>
                                </n-gi>
                                <n-gi :span="3"></n-gi>
                            </n-grid>
                        </div>
                    </n-gi>
                </n-grid>
            </div>
        </div> 
        <!-- <div style="background-color:aliceblue">
            <n-card style="width: 800px; --n-border-radius: 20px;" :bordered="false" :role="dialog" aria-modal="true">
                <template #header>
                    <div>
                        <n-grid :x-gap="12">
                            <n-gi :span="2"></n-gi>
                            <n-gi :span="20">
                                <span class="modify-title">请上传您的歌曲</span>
                            </n-gi>
                            <n-gi :span="2">
                                <div style="padding-top: 30%" @click="closeUWindow">
                                    <close-outline />
                                </div>
                            </n-gi>
                        </n-grid>
                    </div>
                </template>
                <n-grid x-gap="12" :cols="2">
                    <n-gi>
                        <n-popover trigger="hover">
                            <template #trigger>
                                <div class="upload-song-page">
                                    <img :src="songPageUrl" @click="uploadFile" />
                                    <input type="file" ref="fileInput" style="display: none"
                                    accept="image/*"    
                                    @change="handleSongPageChange" />
                                </div>
                            </template>
                            <span>点击此处上传歌曲封面</span>
                        </n-popover>
                    </n-gi>
                    <n-gi>
                        <div>
                            <span>歌曲文件</span>
                            <n-space>
                                <input type="file" @change="handleSongSrcFileChange" />
                            </n-space>
                        </div>
                        <div>
                            <span>歌词文件</span>
                            <n-space>
                                <input type="file" @change="handleSongLyricFileChange" />
                            </n-space>
                        </div>
                        <div>
                            <span>歌名</span>
                            <n-input type="text" size="small" placeholder="请输入歌名" :value="songName"
                                @input="songName = $event" />
                        </div>
                        <div>
                            <span>歌手</span>
                            <n-input type="text" size="small" placeholder="请输入歌手" :value="songAuthor"
                                @input="songAuthor = $event" />
                        </div>
                        <div>
                            <span>标签选择</span>
                            <n-space vertical>
                                <n-select v-model:value="value" multiple :options="options" placeholder="请选择歌曲标签" max-tag-count="responsive"/>
                            </n-space>
                        </div>
                        <n-button strong secondary round type="primary" class="upload-button-position"
                            @click="submitUpload">
                            确认上传
                        </n-button>
                    </n-gi>
                </n-grid>
                <div class="modify-notice-text">
                    请上传符合社会主义核心价值观的歌曲
                </div>
            </n-card>
        </div> -->
    </n-modal>
</template>
  
<script>
import { CloseOutline, ArrowUpOutline } from '@vicons/ionicons5'
import { NInput, NModal } from 'naive-ui';
import { defineComponent, ref } from "vue";
import { mapState } from 'vuex'
export default {
    name: "UploadSong",
    computed: {
        ...mapState(['accentColor', 'colorMode']),
    },
    components: {
        CloseOutline,
        ArrowUpOutline,
        NInput,
        NModal
    },
    props: {
        showUploadSong: Boolean,
    },
    data() {
        return {
            songName: '',
            songAuthor: '',
            songSrcFile: null,
            songLyricFile: null,
            songPageFile: null,
            songPageUrl: "/src/assets/upload-logo.png",
            value: [], // 存储所选内容的数组
            songFileName: '点击以上传音频文件',
            songLyricName: '点击以上传歌词文件',
            options: [
                { label: "华语", value: "tag0" },
                { label: "流行", value: "tag1" },
                { label: "民谣", value: "tag2" },
                { label: "轻音乐", value: "tag3" },
                { label: "电子", value: "tag4" },
                { label: "摇滚", value: "tag5" },
                { label: "日韩", value: "tag6" },
                { label: "粤语", value: "tag7" },
                { label: "舞曲", value: "tag8" },
                { label: "说唱", value: "tag9" },
                { label: "爵士", value: "tag10" },
                { label: "乡村", value: "tag11" },
                { label: "古典", value: "tag12" },
                { label: "民族", value: "tag13" },
                { label: "金属", value: "tag14" },
                { label: "古风", value: "tag15" },
                { label: "游戏", value: "tag16" },
                { label: "清晨", value: "tag17" },
                { label: "夜晚", value: "tag18" },
                { label: "学习", value: "tag19" },
                { label: "工作", value: "tag20" },
                { label: "午休", value: "tag21" },
                { label: "散步", value: "tag22" },
                { label: "下午茶", value: "tag23" },
                { label: "旅行", value: "tag24" },
                { label: "运动", value: "tag25" },
                { label: "怀旧", value: "tag26" },
                { label: "伤感", value: "tag27" },
                { label: "放松", value: "tag28" },
                { label: "浪漫", value: "tag29" },
                { label: "安静", value: "tag30" },
                { label: "思念", value: "tag31" },
            ],
            tagList: [],
            tagString: '', // 为了传给后端tag而设置的。
        }
    },
    methods: {
        closeUWindow() {
            this.$emit('closeUploadWindow');
            // location.reload();
        },
        uploadFile() {
            this.$refs.fileInput.click()
        },
        uploadSongFile() {
            this.$refs.songFileInput.click()
        },
        uploadLyricFile() {
            this.$refs.songLyricInput.click()
        },
        handleSongPageChange(e) {
            this.songPageFile = e.target.files[0];
            this.SongPageUrl = URL.createObjectURL(this.songPageFile);
        },
        handleSongSrcFileChange(e) {
            this.songSrcFile = e.target.files[0];
            this.songFileName = this.songSrcFile.name
            console.log('change');
        },
        handleSongLyricFileChange(e) {
            this.songLyricFile = e.target.files[0];
            this.songLyricName = this.songLyricFile.name
        },
        submitUpload() {
            this.handleTagList();
            console.log(this.tagString);
            let data = new FormData();
            data.append('title', this.songName);
            data.append('artist', this.songAuthor);
            data.append('cover', this.songPageFile);
            data.append('source', this.songSrcFile);
            data.append('lyrics', this.songLyricFile);
            data.append('tags', this.tagString);
            this.$http.post('/api/music/upload/', data).then(response => {
                console.log(response);
                if (response.data.code == '0') {
                    this.closeUWindow();
                    alert('上传歌曲成功!')
                } else if (response.data.code == '-1') {
                    alert('上传歌曲失败，请重新上传!');
                }
            });
        },
        handleTagList() {
            this.tagList = [];
            this.value.forEach((value) => {
                const option = this.options.find((option) => option.value == value);
                if (option) {
                    this.tagList.push(option.label);
                }
            })
            this.tagString = this.tagList.join(' ');
        }
    }
};
</script>
<style scoped>
.close-icon:hover {
    cursor: pointer;
}
.outer-container {
    width: 700px; 
    border-radius: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 25px;
}
.title-container {
    margin-top: 10px;
    margin-bottom: 10px;
}
.body-item {
    max-width: 500px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.body-item-title {
    color: grey;
}
.upload-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}
.upload-song-page {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 40px;
}

.upload-song-page img {
    width: 256px;
    height: 256px;
}

.upload-button-position {
    margin-top: 20px;
}

.select-container {
    height: 200px;
    /* 设置容器的高度 */
    overflow-y: scroll;
    /* 添加垂直滚动条 */
}
</style>