<script>
import { h, ref, defineProps, computed } from 'vue'
import { NDataTable, NButton, NPopover, NEllipsis, NPagination } from 'naive-ui'
import { Heart12Filled, Star12Filled } from '@vicons/fluent';
import { getFontColorString, getBackgroundColorString, globalThemeColor, changeThemeColorByImage, getRGBString, antiBackgroundColor } from '/src/colorMode'
import 'animate.css';
export default {
    data() {
        let viewMode = this.viewMode//转换一下
        const themeColor = globalThemeColor
        const HeadBackgroundColorString = getBackgroundColorString(themeColor, 225)
        const DataBackgroundColorString = getBackgroundColorString(themeColor, 180)
        const BackgroundColorString = DataBackgroundColorString
        const fontColorString = getFontColorString(themeColor)
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
        let isSelected = false//当前是否有歌曲被选择
        let selectedEntries = []//被选择的项（和rowKey同步更新）
        let songData = [
            {
                key: 0,
                name: '只因你太美',
                singer: '蔡只因',
                length: '3:40',
                isLiked: false,
                isCollected: false,
                imgSrc: "/src/assets/song5.png"
            },
            {
                key: 1,
                name: '给自己的情书',
                singer: '王菲',
                length: '4:05',
                isLiked: false,
                isCollected: false,
                imgSrc: "/src/assets/song2.jpg"
            }, {
                key: 2,
                name: 'Yesterday Once More',
                singer: 'Carpenters',
                length: '4:24',
                isLiked: false,
                isCollected: false,
                imgSrc: "/src/assets/song3.jpg"
            }, {
                key: 3,
                name: '守时',
                singer: '王菲',
                length: '3:56',
                isLiked: false,
                isCollected: false,
                imgSrc: "/src/assets/song4.jpg"
            },
        ]//歌曲数据
        let columns = [
            {
                type: 'selection',
            },
            {
                title: '名称',
                key: 'name',
                resizable: true,
                render(row) {
                    return h(NEllipsis, {
                        'line-clamp': 1,
                        'tooltip': {
                            style: {
                                'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                                '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                            }
                        }
                    }, () => [h('a', {
                        style: {
                            'text-decoration': 'none',
                            'display': 'block',
                            'cursor': 'pointer',
                            'color': getRGBString(fontColorString.value, 0.8, 'font', viewMode)
                        },
                        onClick: () => {
                            if (viewMode === 'user') {
                                changeThemeColorByImage(row.imgSrc)
                            }
                        }
                    }, row.name)])
                }
            },
            {
                title: '歌手',
                key: 'singer'
            },
            {
                title: '时长',
                key: 'length'
            },
            {
                key: 'actions',
                title: (column) => h(NButton, {
                    onClick: () => {
                        for (let i = 0; i < this.selectedEntries.length; i++) {
                            this.songData[this.selectedEntries[i]].isLiked = true
                        }
                    },
                    style: {
                        'opacity': this.isSelected ? '1' : '0',
                        '--n-color': getRGBString(HeadBackgroundColorString.value, 1, 'background', viewMode),
                        '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font', viewMode)}`,
                        '--n-border-focus': `none`,
                        '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font', viewMode)}`,
                        '--n-border-disabled': `none`,
                        '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font', viewMode),
                        'animation': this.isSelected ? 'bounceIn' : 'heartBeat',
                        'animation-duration': '0.5s'
                    },
                }, {
                    icon: () => h(Heart12Filled, {
                        style: {
                            'color': 'rgb(204,12,32)'
                        }
                    })
                }),

                style: {
                    "text-align": "center"
                },
                render(row) {
                    return h(NPopover, {
                        trigger: 'hover',
                        style: {
                            'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                            '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                        }
                    },
                        {
                            trigger: () => h(NButton, {
                                onClick: () => {
                                    row.isLiked = !row.isLiked
                                },
                                style: {
                                    '--n-color': getRGBString(DataBackgroundColorString.value, 1, 'background',
                                        viewMode),
                                    '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font',
                                        viewMode)}`,
                                    '--n-border-focus': `none`,
                                    '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font',
                                        viewMode)}`,
                                    '--n-border-disabled': `none`,
                                    '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font',
                                        viewMode),
                                    'animation': row.isLiked ? 'bounceIn' : 'heartBeat',
                                    'animation-duration': '0.5s'
                                }
                            },
                                {
                                    icon: () => h(Heart12Filled, {
                                        style: {
                                            'color': row.isLiked ? 'rgb(204,12,32)' : 'white'
                                        }
                                    })
                                }),//"我喜欢按钮"
                            default: () => h('span',
                                {
                                    style: {
                                        'font-size': '20px'
                                    }
                                },
                                [row.isLiked ? '从"我喜欢"移除' : '添加到"我喜欢"'])
                        })
                }
            },
            {
                key: "collect",
                title: (column) => h(NButton, {
                    onClick: () => {
                        for (let i = 0; i < this.selectedEntries.length; i++) {
                            this.songData[this.selectedEntries[i]].isCollected = true
                        }
                    },
                    style: {
                        'opacity': this.isSelected ? '1' : '0',
                        '--n-color': getRGBString(HeadBackgroundColorString.value, 1, 'background', viewMode),
                        '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font', viewMode)}`,
                        '--n-border-focus': `none`,
                        '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font', viewMode)}`,
                        '--n-border-disabled': `none`,
                        '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font', viewMode),
                        'animation': isSelected ? 'bounceIn' : 'heartBeat',
                        'animation-duration': '0.5s'
                    }
                }, {
                    icon: () => h(Star12Filled, {
                        style: {
                            'color': 'rgb(210,195,135)'
                        }
                    })
                }),
                render(row) {
                    return h(NPopover, {
                        trigger: 'hover',
                        style: {
                            'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                            '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                        }
                    },
                        {
                            trigger: () => h(NButton, {
                                onClick: () => {
                                    row.isCollected = !row.isCollected
                                },
                                style: {
                                    '--n-color': getRGBString(DataBackgroundColorString.value, 1, 'background',
                                        viewMode),
                                    '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font',
                                        viewMode)}`,
                                    '--n-border-focus': `none`,
                                    '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font',
                                        viewMode)}`,
                                    '--n-border-disabled': `none`,
                                    '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font',
                                        viewMode),
                                    'animation': row.isCollected ? 'bounceIn' : 'heartBeat',
                                    'animation-duration': '0.5s'
                                }
                            },
                                {
                                    icon: () => h(Star12Filled, {
                                        style: {
                                            'color': row.isCollected ? 'rgb(255, 230, 120)' : 'white'
                                        }
                                    })
                                }),//收藏按钮
                            default: () => h('span',
                                {
                                    style: {
                                        'font-size': '20px'
                                    }
                                },
                                [row.isCollected ? '从"收藏夹"移除' : '添加到"收藏夹"'])
                        })
                }
            }
        ]//表头和表项
        let pagination = {
            style: {
                //页面按钮
                '--n-item-text-color': getRGBString(antiBackgroundColor.value, 0.6, 'font'),
                '--n-item-text-color-hover': getRGBString(antiBackgroundColor.value, 0.4, 'font'),
                '--n-item-text-color-active': getRGBString(fontColorString.value, 0.8),
                '--n-item-text-color-pressed': getRGBString(fontColorString.value, 0.2),
                '--n-item-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.6)}`,
                '--n-item-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.3)}`,
                '--n-item-border-active': `1px solid ${getRGBString(fontColorString.value, 0.8)}`,
                '--n-item-border-active-hover': `1px solid ${getRGBString(fontColorString.value, 1)}`,
                //不可用的跳转按钮
                '--n-item-border-disabled': `1px solid ${getRGBString(BackgroundColorString.value, 0.6)}`,
                '--n-item-color-disabled': `1px solid ${getRGBString(BackgroundColorString.value, 0.3)}`,
                //可用的跳转按钮
                '--n-button-color-hover': getRGBString(BackgroundColorString.value, 0.6),
                '--n-button-border': `1px solid ${getRGBString(fontColorString.value, 0.8)}`,
                '--n-button-border-hover': `1px solid ${getRGBString(fontColorString.value)}`,
                '--n-button-icon-color': `${getRGBString(fontColorString.value, 0.8)}`,
                '--n-button-icon-color-hover': `${getRGBString(fontColorString.value, 0.5)}`,
                '--n-jumper-text-color': `${getRGBString(fontColorString.value, 0.6)}`,
                // 单页加载量选择按钮(需要v-deep,此处仅作为标记)
                // '--n-border-hover': `${getRGBString(fontColorString, 0.6)} `,
                // '--n-arrow-color': `${getRGBString(fontColorString, 0.5)}`,
                // '--n-text-color': `${getRGBString(fontColorString, 0.8)}`,
                // '--n-color': `${getRGBString(BackgroundColorString, 1)}`,
                // '--n-caret-color': `${getRGBString(fontColorString.value, 0.6)}`

            },
            showSizePicker: true,
            showQuickJumper: true,
            suffix: () => h('span', {
                style: {
                    'color': getRGBString(fontColorString.value,0.6),
                    'font-weight': 700
                }
            }, '页'),
            goto: () => h('span', {
                style: {
                    'color': getRGBString(fontColorString.value,0.6),
                    'font-weight': 700
                }
            }, '跳转到第'),
            pageSizes: [5, 10, 20, 50]
        }
        return {
            themeColor, HeadBackgroundColorString, DataBackgroundColorString, fontColorString,
            isSelected, selectedEntries, songData, columns, getRGBString, pagination
        }
    },
    props: {
        viewMode: {
            type: String,
            default: 'user'
        }//是否在管理员界面
    },
    methods: {
        handleCheck(rowKeys) {
            this.selectedEntries = rowKeys
            if (rowKeys.length === 0) {
                this.isSelected = false
            }
            else {
                this.isSelected = true
            }
        }
    }
}
</script>

<template>
    <div class="table-box">
        <div class="before_table">
        </div>
        <n-data-table ref="dataTable" :bordered="false" :columns="columns" :data="songData" :pagination="pagination"
            @update:checked-row-keys="handleCheck" class="data-table" :style="{
                // 调节字体、背景、边框颜色
                '--n-th-text-color': getRGBString(fontColorString, 1, 'font', viewMode),
                '--n-td-text-color': getRGBString(fontColorString, 0.8, 'font', viewMode),
                '--n-td-color': getRGBString(HeadBackgroundColorString, 0.4, 'background', viewMode),
                '--n-th-color': getRGBString(DataBackgroundColorString, 0.6, 'background', viewMode),
                '--n-td-color-hover': getRGBString(HeadBackgroundColorString, 0.1, 'background', viewMode),
                '--n-th-font-weight': '700',
                '--n-border-color': getRGBString(fontColorString, 0.6, 'font', viewMode),
                '--n-color-checked': getRGBString(fontColorString, 0.8, 'font', viewMode),
                '--n-check-mark-color': getRGBString(HeadBackgroundColorString, 0.6, 'background', viewMode),
                '--n-font-size': '20px'
            }">
        </n-data-table>
    </div>
</template>



<style scoped>
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

.data-table {
    display: inline-block;
}

.table-box {
    text-align: center;
    padding: 20px;
}

:deep(.n-data-table__pagination) {
    justify-content: center;
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