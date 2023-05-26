<script>
import { watch, h } from 'vue'
import { NScrollbar, NButton, NPagination } from 'naive-ui'
import ImageTableEntry from './ImageTableEntry.vue'
import { getBackgroundColorString, getFontColorString, changeColorMode, globalThemeColor, getRGBString, antiBackgroundColor, changeThemeColorByImage } from '/src/colorMode'
import { Rows } from './ImageRowData'
import { backgroundColor } from '../../../colorMode'
// 说明：单个table组件。所有元素之间水平对齐。适用于局部布局
export default {
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
            default: [1000,]
        },
        // tableEntry 的宽高
        entrySize: {
            type: Array,
            default: [260, 260]
        },
        //使用该组件的位置包括个人主页/收藏夹选择悬浮框和音乐馆主页
        //分别为PersonalView,CollectionView,HomeView
        position: {
            type: String,
            default: 'PersonalView'
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
        //处理点击事件的方法
        handleClick: {
            type: Function,
            default: (Key) => {
                alert(Key)
                changeThemeColorByImage(Rows[Key].imagePath)
            }
        }
    },
}
</script>
<template>
    <div class="image_table" :style="{
        'background-color': getRGBString(BackgroundColorString, 0.2),
        'border-radius': '50px',
        'width': `${tableSize[0]}px`,
        'height': `${tableSize[1]}px`
    }">
        <n-scrollbar v-if="['PersonalView', 'CollectionView'].includes(position)" class="image_table_list">
            <template v-for="data in currentPageData" :key="data.Key">
                <image-table-entry v-bind="data" style="vertical-align: middle;" @clickEntry="handleClick"
                    :EntrySize="[300, 300]"></image-table-entry>
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
        </n-scrollbar>
        <template v-else>
            <div class="list_top_nav">
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
                }" @click="changeColorMode">
                    更多
                </n-button>
            </div>
            <div class="image_table_list" :style="{
                'background-color': `rgba(${BackgroundColorString},0.25)`,
                'border': `5px solid rgb(${BackgroundColorString},0.7)`,
                'border-radius': '50px',
                'height': `${tableSize[1] - 100}px`
            }">
                <template v-for=" data  in  rows " :key="data.name">
                    <image-table-entry v-bind="data" style="vertical-align: middle;">
                    </image-table-entry>
                </template>
            </div>
        </template>
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
    margin: 10px auto 20px auto;
    height: 60px;
}

.image_table_list {
    padding: 0 20px;
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
    padding: 30px 30px;
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