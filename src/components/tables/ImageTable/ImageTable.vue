<script>
import { watch, h } from 'vue'
import { NScrollbar, NButton, NIcon, NPagination } from 'naive-ui'
import { CloudUploadOutline } from "@vicons/ionicons5"
import { FolderAdd20Regular } from '@vicons/fluent'
import ImageTableEntry from './ImageTableEntry.vue'
import UploadSongView from '/src/views/UploadSongView.vue';
import { getBackgroundColorString, getFontColorString, changeColorMode, globalThemeColor, getRGBString, antiBackgroundColor, changeThemeColorByImage } from '/src/colorMode'
import { Rows } from './ImageRowData'
import { backgroundColor } from '../../../colorMode'
// 说明：单个table组件。所有元素之间水平对齐。适用于局部布局
export default {
    components: {
        CloudUploadOutline, FolderAdd20Regular, ImageTableEntry, UploadSongView
    },
    data() {
        const fontColorString = getFontColorString(globalThemeColor)
        const defaultBGString = getBackgroundColorString(globalThemeColor)
        //在这里设置需要使用:deep更改的穿透样式，并在:root中定义相应变量
        watch(globalThemeColor, () => {
            const tempFontColorString = getFontColorString(globalThemeColor)
            const tempBackgroundColorString = getBackgroundColorString(globalThemeColor)
            document.documentElement.style.setProperty('--my-arrow-color', getRGBString(tempFontColorString.value, 0.5))
            document.documentElement.style.setProperty('--my-text-color', getRGBString(tempFontColorString.value, 0.8))
            document.documentElement.style.setProperty('--my-color', getRGBString(tempBackgroundColorString.value, 0.5))
            document.documentElement.style.setProperty('--my-color-focus', `1px solid ${getRGBString(tempBackgroundColorString.value, 0.7)}`)
            document.documentElement.style.setProperty('--my-color-active', `1px solid ${getRGBString(tempBackgroundColorString.value, 0.8)}`)
            document.documentElement.style.setProperty('--my-border-hover', `1px solid ${getRGBString(tempFontColorString.value, 0.6)}`)
            document.documentElement.style.setProperty('--my-border', `1px solid ${getRGBString(tempFontColorString.value, 0.1)}`)
            document.documentElement.style.setProperty('--my-border-active', `1px solid ${getRGBString(tempFontColorString.value, 0.8)}`)
            document.documentElement.style.setProperty('--my-border-focus', `1px solid ${getRGBString(tempFontColorString.value, 0.8)}`)
            document.documentElement.style.setProperty('--my-shadow-active', `0 0 0 2px ${getRGBString(tempFontColorString.value, 0.6)}`)
            document.documentElement.style.setProperty('--my-shadow-focus', `0 0 0 2px ${getRGBString(tempFontColorString.value, 0.7)}`)
        }, { immediate: true })

        return {
            getRGBString,
            antiBackgroundColor,
            pageArgs: { currentPage: 1, pageSize: 10 },
            fontColorString,
            defaultBGString,
            changeColorMode,
            h
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.rows.length / this.pageArgs.pageSize)
        },
        currentPageData() {
            const rows = JSON.parse(JSON.stringify(this.rows))//todo:深拷贝
            console.log(rows)
            const startIndex = (this.pageArgs.currentPage - 1) * this.pageArgs.pageSize
            if (this.position === 'CollectionView') {
                for (let i = 0; i < rows.length; i++) {
                    rows[i]['EntrySize'] = [150, 150]
                }
            }
            return rows.slice(startIndex, startIndex + this.pageArgs.pageSize)
        },
    },
    props: {
        //可自定义imageTable的背景色。默认和歌曲封面主题色对齐
        BackgroundColorString: {
            type: String,
            default: getBackgroundColorString(globalThemeColor)
        },
        //table的大小(宽和高)
        tableSize: {
            type: Array,
            default: []
        },
        // tableEntry 的宽高
        entrySize: {
            type: Array,
            default: [300, 250]
        },
        //使用该组件的位置包括
        //个人主页：收藏夹(Colletion)，歌单(Songlist)，已上传歌曲(UploadedSongs)
        //公开页面：主要是在listTable选择收藏夹的页面(CollectionView)
        position: {
            type: String,
            default: 'Collection',
            validator: (value) => {
                return ['Collection', 'Songlist', 'UploadedSongs', 'CollectionView'].includes(value)
            }
        },
        //歌曲总数
        count: {
            type: Number,
            default: Rows.length
        },
        //数据来源
        rows: {
            type: JSON.type,
            default: Rows
        },
        //处理点击entry事件的方法
        handleClickEntry: {
            type: Function,
            default: (Key) => {
                changeThemeColorByImage(Rows[Key].imagePath)
            }
        },
        //处理点击删除收藏夹事件的方法
        handleClickDeleteCollection: {
            type: Function,
            default: (Key) => {
                alert('todo:deleteCollection')
                //changeThemeColorByImage(Rows[Key].imagePath)
            }
        },
        //处理点击分享收藏夹事件的方法
        handleClickShareCollection: {
            type: Function,
            default: (Key) => {
                alert('todo:shareCollection')
                //changeThemeColorByImage(Rows[Key].imagePath)
            }
        },
        //处理点击取消分享歌单事件的方法
        handleClickCancelShare: {
            type: Function,
            default: (Key) => {
                alert('todo:cancelShare')
                //changeThemeColorByImage(Rows[Key].imagePath)
            }
        },
        //处理点击删除已上传歌曲事件的方法
        handleClickDeleteUploadedSongs: {
            type: Function,
            default: (Key) => {
                alert('todo:deleteUploadedSongs')
                //changeThemeColorByImage(Rows[Key].imagePath)
            }
        }

    },
    methods: {
        handleTopClick() {
            //这两个只会在个人主页用到
            if (this.position === 'Collection') {
                alert("todo:新建收藏夹")
                //this.$emit('clickCreateCollection')
            }
            else if (this.position === 'UploadedSongs') {
                // alert("上传歌曲")
                this.$emit('clickUpload')
            }
        }
    },
    emits: ['clickUpload'],
}
</script>
<template>
    <div class="image_table" :style="{
        'background-color': getRGBString(BackgroundColorString, 0.2),
        'border-radius': '50px',
        'width': `${tableSize[0]}px`,
        'height': `${tableSize[1]}px`
    }">
        <!-- 根据不同的情况判断，在个人主页的“收藏夹”页面会显示“新建”按钮，
            在个人主页的“上传歌曲”页面会显示“上传”按钮 -->
        <div class="list_top_nav" v-if="['Collection', 'UploadedSongs'].includes(position)">


            <!-- 这是第一个图标 -->
            <n-popover trigger="hover" :style="{
                'border-radius': `10px`,
                'font-weight': 700,
                '--n-text-color': `rgb(${fontColorString})`,
                '--n-color': `rgb(${defaultBGString},0.7)`,
                'font-size': `15px`,
                'box-shadow': 'n-icon-wrapper'
            }">
                <template #trigger>
                    <n-button class="more_button" :style="{
                        '--n-color': getRGBString(BackgroundColorString, 0.15),
                        '--n-color-hover': getRGBString(BackgroundColorString, 0.4),
                        '--n-color-pressed': getRGBString(BackgroundColorString, 0.6),
                        '--n-color-focus': getRGBString(BackgroundColorString, 0.1),
                        '--n-border': `3px solid ${getRGBString(BackgroundColorString, 0.5)}`,
                        '--n-border-radius': '10px',
                        '--n-border-hover': `3px solid ${getRGBString(BackgroundColorString, 0.5)}`,
                        '--n-border-pressed': `3px solid ${getRGBString(BackgroundColorString, 0.3)})`,
                        '--n-border-focus': `3px solid ${getRGBString(BackgroundColorString, 0.5)}`,
                        '--n-text-color': getRGBString(fontColorString, 0.6),
                        '--n-text-color-hover': getRGBString(fontColorString, 0.8),
                        '--n-text-color-pressed': getRGBString(fontColorString, 1),
                        '--n-text-color-focus': getRGBString(fontColorString, 0.6),
                        '--n-ripple-color': getRGBString(fontColorString, 0.5),
                        '--n-wave-opacity': '1'
                    }" @click="handleTopClick">
                        <n-icon :size="25" v-if="position === 'UploadedSongs'">
                            <cloud-upload-outline></cloud-upload-outline>
                        </n-icon>
                        <n-icon :size="25" v-if="position === 'Collection'">
                            <folder-add20-regular></folder-add20-regular>
                        </n-icon>
                    </n-button>
                </template>
                {{ position === 'Collection' ? '新建收藏夹' : '上传新的歌曲' }}
            </n-popover>




        </div>
        <!-- 这个组件不会用在首页，因此都采用有pagination的形式 -->
        <div class="image_table_list">
            <template v-for="data in currentPageData" :key="data.Key">
                <image-table-entry v-bind="data" style="vertical-align: middle;" @clickEntry="handleClickEntry"
                    @deleteCollection="handleClickDeleteCollection" @shareCollection="handleClickShareCollection"
                    @cancelShare="handleClickCancelShare" @deleteUploadedSong="handleClickDeleteUploadedSongs"
                    :EntrySize="entrySize"
                    :Edit="['Collection', 'Songlist', 'UploadedSongs'].includes(position)"></image-table-entry>
            </template>
            <div class="pagination_box">
                <n-pagination :page-count="pageCount" v-model:page-size="pageArgs.pageSize"
                    v-model:page="pageArgs.currentPage" show-quick-jumper show-size-picker :default-page-size="1"
                    :page-sizes="[{
                        label: '5条/页',
                        value: 5
                    }, {
                        label: '10条/页',
                        value: 10
                    }, {
                        label: '20条/页',
                        value: 20
                    }, {
                        label: '50条/页',
                        value: 50
                    }]" :suffix="() => h('span', {
    style: {
        'color': getRGBString(fontColorString, 0.6),
        'font-weight': 700
    }
}, '页')" :style="{
    //页面按钮
    '--n-item-text-color': getRGBString(antiBackgroundColor, 0.6, 'font'),
    '--n-item-text-color-hover': getRGBString(antiBackgroundColor, 0.4, 'font'),
    '--n-item-text-color-active': getRGBString(fontColorString, 0.8),
    '--n-item-text-color-pressed': getRGBString(fontColorString, 0.2),
    '--n-item-border-hover': `1px solid ${getRGBString(fontColorString, 0.6)}`,
    '--n-item-border-pressed': `1px solid ${getRGBString(fontColorString, 0.3)}`,
    '--n-item-border-active': `1px solid ${getRGBString(fontColorString, 0.8)}`,
    '--n-item-border-active-hover': `1px solid ${getRGBString(fontColorString, 1)}`,
    //不可用的跳转按钮
    '--n-item-border-disabled': `1px solid ${getRGBString(BackgroundColorString, 0.6)}`,
    '--n-item-color-disabled': `1px solid ${getRGBString(BackgroundColorString, 0.3)}`,
    //可用的跳转按钮
    '--n-button-color-hover': getRGBString(BackgroundColorString, 0.6),
    '--n-button-border': `1px solid ${getRGBString(fontColorString, 0.8)}`,
    '--n-button-border-hover': `1px solid ${getRGBString(fontColorString)}`,
    '--n-button-icon-color': `${getRGBString(fontColorString, 0.8)}`,
    '--n-button-icon-color-hover': `${getRGBString(fontColorString, 0.5)}`,
    '--n-jumper-text-color': `${getRGBString(fontColorString, 0.6)}`,
    // 单页加载量选择按钮(需要v-deep,此处仅作为标记)
    // '--n-border-hover': `${getRGBString(fontColorString, 0.6)} `,
    // '--n-arrow-color': `${getRGBString(fontColorString, 0.5)}`,
    // '--n-text-color': `${getRGBString(fontColorString, 0.8)}`,
    // '--n-color': `${getRGBString(BackgroundColorString, 1)}`,
    // '--n-caret-color': `${getRGBString(fontColorString.value, 0.6)}`
}">

                    <template #goto>
                        跳转到第
                    </template>
                </n-pagination>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

:root {
    --my-arrow-color: none;
    --my-text-color: none;
    --my-color: none;
    --my-border: none;
    --my-border-hover: none;
    --my-color-focus: none;
    --my-color-active: none;
    --my-border-active: none;
    --my-border-focus: none;
    --my-shadow-active: none;
    --my-shadow-focus: none;
    --my-option-text-color: none;
}

.image_table {
    margin: 0;
    /*设置为0，由父级设置padding*/
    padding: 20px 0px 0 0px;
    display: inline-block;
    overflow: hidden;
    transition: cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}

.list_top_nav {
    position: relative;
    margin: auto auto;
    height: 60px;
}

.image_table_list {
    text-align: center;
}

.pagination_box {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    font-weight: 700;
    text-align: center;
}

.more_button {
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 10px;
    font-size: 25px;
    font-weight: 700;
}

:deep(.n-pagination .n-pagination-item) {
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}

:deep(.n-base-selection-label) {
    --n-arrow-color: var(--my-arrow-color);
    --n-color: var(--my-color);
    --n-color-active: var(--my-color-focus);
    --n-text-color: var(--my-text-color);
}

:deep(.n-base-selection) {
    --n-border: var(--my-border) !important;
    --n-border-hover: var(--my-border-hover) !important;
    --n-border-focus: var(--my-border-focus) !important;
    --n-border-active: var(--my-border-active) !important;
    --n-box-shadow-focus: var(--my-shadow-focus) !important;
    --n-box-shadow-active: var(--my-shadow-active) !important
}

:deep(.n-input) {
    --n-color: var(--my-color) !important;
    --n-color-focus: var(--my-color-focus) !important;
    --n-text-color: var(--my-text-color) !important;
    --n-border: var(--my-border) !important;
    --n-border-hover: var(--my-border-hover) !important;
    --n-border-focus: var(--my-border-focus) !important;
    --n-box-shadow-focus: var(--my-shadow-focus) !important;
    --n-box-shadow-active: var(--my-shadow-active) !important;
    --n-font-weight: 700;
}

:deep(.n-pagination .n-pagination-item.n-pagination-item--disabled) {
    cursor: default;
}
</style>