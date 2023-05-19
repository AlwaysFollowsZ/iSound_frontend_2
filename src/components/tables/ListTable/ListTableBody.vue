<script>
import { h, ref, defineProps, computed } from 'vue'
import { NDataTable, NButton, NPopover, NEllipsis, NPagination, NConfigProvider } from 'naive-ui'
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
            document.documentElement.style.setProperty('--my-td-color-checked', `${getRGBString(tempFontColorString.value, 0.6)}`)
            document.documentElement.style.setProperty('--my-th-color-checked', `${getRGBString(tempFontColorString.value, 0.8)}`)
            document.documentElement.style.setProperty('--my-th-border-checked', `1px solid ${getRGBString(tempFontColorString.value, 1)}`)
            document.documentElement.style.setProperty('--my-td-boeder-checked', `1px solod ${getRGBString(tempFontColorString.value, 1)}`)
        }, { immediate: true })
        const emit = this.$emit
        let isSelected = false//当前是否有歌曲被选择
        let selectedEntries = []//被选择的项（和rowKey同步更新）

        let columns = [
            {
                key: 'image',
                width: '75px',
                render(row) {
                    return h('div', {
                        style: {
                            'width': '50px',
                            'aspect-ratio': '1',
                            'background-image': `url(${row.imgSrc})`,
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%',
                            'cursor': 'pointer'
                        },
                        onClick: () => {
                            if (viewMode === 'user') {
                                changeThemeColorByImage(row.imgSrc)
                            }
                        }
                    })
                }
            },
            {
                title(column) {
                    return h('span',
                        {
                            style:
                            {
                                'font-size': '18px'
                            }
                        }, '名称')
                },
                key: 'name',
                resizable: true,
                maxWidth: '500px',
                sorter: 'default',
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
                            'color': getRGBString(fontColorString.value, 0.8, 'font', viewMode),
                            'font-size': '15px'
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
                title(column) {
                    return h('span',
                        {
                            style:
                            {
                                'font-size': '18px'
                            }
                        }, '歌手')
                },
                key: 'singer',
                maxWidth: '300px',
                sorter: 'default',
                render(row) {
                    return h(NEllipsis, {
                        'line-clamp': 1,
                        'tooltip': {
                            style: {
                                'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                                '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                            }
                        }
                    }, () => [h('div', {
                        style: {
                            'color': getRGBString(fontColorString.value, 0.8, 'font', viewMode),
                            'font-size': '15px'
                        },
                    }, row.singer)])
                }

            },
            {
                title(column) {
                    return h('div',
                        {
                            style:
                            {
                                'font-size': '18px'
                            }
                        }, '时长')
                },
                width: '200px',
                key: 'length',
                sorter: 'default',
                render(row) {
                    return h('text',
                        {
                            style:
                            {
                                'font-size': '15px'
                            }
                        }, row.length)
                }
            },
            {
                key: 'actions',
                width: '10px',
                title: (column) => h(NButton, {
                    onClick: () => {
                        emit('likeAll', this.selectedEntries)
                    },
                    style: {
                        'opacity': this.isSelected ? '1' : '0',
                        '--n-color': getRGBString(fontColorString.value, 0.3, 'background', viewMode),
                        '--n-color-hover': getRGBString(fontColorString.value, 0.5, 'background', viewMode),
                        '--n-color-focus': getRGBString(fontColorString.value, 0.4, 'background', viewMode),
                        '--n-color-pressed': getRGBString(fontColorString.value, 0.3, 'background', viewMode),
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
                                    row['isLikeChanged'] = false
                                    emit('like', row.key)
                                    setInterval(() => { row['isLikeChanged'] = true }, 100)
                                },
                                style: {
                                    '--n-color': getRGBString(DataBackgroundColorString.value, 1, 'background',
                                        viewMode),
                                    '--n-color-hover': getRGBString(DataBackgroundColorString.value, 0.6, 'background', viewMode),
                                    '--n-color-focus': getRGBString(DataBackgroundColorString.value, 1, 'background', viewMode),
                                    '--n-color-pressed': getRGBString(DataBackgroundColorString.value, 0.3, 'background', viewMode),
                                    '--n-color-disabled': getRGBString(DataBackgroundColorString.value, 1, 'background', viewMode),
                                    '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font',
                                        viewMode)}`,
                                    '--n-border-focus': `none`,
                                    '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font',
                                        viewMode)}`,
                                    '--n-border-disabled': `none`,
                                    '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font',
                                        viewMode),
                                    'animation': row.isLikeChanged === true ? 'bounceIn' : 'none',
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
                                        'font-size': '12px'
                                    }
                                },
                                [row.isLiked ? '从"我喜欢"移除' : '添加到"我喜欢"'])
                        })

                }
            },
            {
                key: "collect",
                width: '10px',
                title: (column) => h(NButton, {

                    onClick: () => {
                        emit('collectAll', this.selectedEntries)
                    },
                    style: {
                        'opacity': this.isSelected ? '1' : '0',
                        '--n-color': getRGBString(fontColorString.value, 0.3, 'background', viewMode),
                        '--n-color-hover': getRGBString(fontColorString.value, 0.5, 'background', viewMode),
                        '--n-color-focus': getRGBString(fontColorString.value, 0.4, 'background', viewMode),
                        '--n-color-pressed': getRGBString(fontColorString.value, 0.3, 'background', viewMode), '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font', viewMode)}`,
                        '--n-border-focus': `none`,
                        '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font', viewMode)}`,
                        '--n-border-disabled': `none`,
                        '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font', viewMode),
                        'animation': this.isSelected ? 'bounceIn' : 'heartBeat',
                        'animation-duration': '0.5s'
                    }
                }, {
                    icon: () => h(Star12Filled, {
                        style: {
                            'color': 'rgb(255, 230, 120)'
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
                                    row['isCollectChanged'] = false
                                    emit('collect', row.key)
                                    setInterval(() => { row['isCollectChanged'] = true }, 100)

                                },
                                style: {
                                    '--n-color': getRGBString(DataBackgroundColorString.value, 1, 'background',
                                        viewMode),
                                    '--n-color-hover': getRGBString(DataBackgroundColorString.value, 0.6, 'background', viewMode),
                                    '--n-color-focus': getRGBString(DataBackgroundColorString.value, 1, 'background', viewMode),
                                    '--n-color-pressed': getRGBString(DataBackgroundColorString.value, 0.3, 'background', viewMode),
                                    '--n-color-disabled': getRGBString(DataBackgroundColorString.value, 1, 'background', viewMode),
                                    '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font',
                                        viewMode)}`,
                                    '--n-border-focus': `none`,
                                    '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font',
                                        viewMode)}`,
                                    '--n-border-disabled': `none`,
                                    '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font',
                                        viewMode),
                                    'animation': row.isCollectChanged === true ? 'bounceIn' : 'none',
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
                                        'font-size': '12px'
                                    }
                                },
                                [row.isCollected ? '从"收藏夹"移除' : '添加到"收藏夹"'])
                        })
                }
            },
            {
                type: 'selection',
            },
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
                    'color': getRGBString(fontColorString.value, 0.6),
                    'font-weight': 700
                }
            }, '页'),
            goto: () => h('span', {
                style: {
                    'color': getRGBString(fontColorString.value, 0.6),
                    'font-weight': 700
                }
            }, '跳转到第'),
            pageSizes: [5, 10, 20, 50]
        }
        return {
            themeColor, HeadBackgroundColorString, DataBackgroundColorString, fontColorString,
            isSelected, selectedEntries, columns, getRGBString, pagination
        }
    },
    props: {
        songData: {
            type: JSON.type,
            default:
                [{
                    key: 0,
                    name: '暂无歌曲',
                    singer: '/',
                    length: '/',
                    isLiked: false,
                    isCollected: false,
                    imgSrc: ""
                }]
        },//歌曲数据
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
    },
    emits: ['like', 'collect', 'likeAll', 'collectAll']
}
</script>

<template>
    <div class="table-box">
        <div class="before_table">
        </div>
        <n-data-table ref="dataTable" :bordered="false" :columns="columns" :data="songData" :pagination="pagination"
            @update:checked-row-keys="handleCheck" class="data-table" :style="{
                // 调节字体、背景、边框颜色
                '--n-loading-color': getRGBString(fontColorString, 0.5, 'font', viewMode),
                '--n-th-text-color': getRGBString(fontColorString, 1, 'font', viewMode),
                '--n-td-text-color': getRGBString(fontColorString, 0.8, 'font', viewMode),
                '--n-th-icon-color': getRGBString(fontColorString, 0.5, 'font', viewMode),
                '--n-th-icon-color-active': getRGBString(fontColorString, 1, 'font', viewMode),
                '--n-td-color': getRGBString(HeadBackgroundColorString, 0.4, 'background', viewMode),
                '--n-th-color': getRGBString(DataBackgroundColorString, 0.6, 'background', viewMode),
                '--n-td-color-hover': getRGBString(HeadBackgroundColorString, 0.1, 'background', viewMode),
                '--n-th-color-hover': getRGBString(HeadBackgroundColorString, 'background', viewMode),
                '--n-td-color-striped': getRGBString(fontColorString, 1, 'background', viewMode),
                '--n-th-color-striped': getRGBString(fontColorString, 1, 'background', viewMode),
                '--n-th-font-weight': '700',
                // '--n-border-color': getRGBString(fontColorString, 0.6, 'font', viewMode),
                '--n-color-checked': getRGBString(fontColorString, 0.8, 'font', viewMode),
                '--n-check-mark-color': getRGBString(HeadBackgroundColorString, 0.6, 'background', viewMode),
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
    /* 输入框阴影 */
    --my-shadow-active: none;
    --my-shadow-focus: none;
    /* 选择框样式 */
    --my-th-color-checked: none;
    --my-td-color-checked: none;
    --my-th-border-checked: none;
    --my-td-border-checked: none;

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

/* 表头的选择框样式 */
:deep(.n-data-table-th .n-checkbox-box) {
    --n-color-checked: var(--my-th-color-checked);
    --n-border-radius: 5px;
}

/* 数据的选择框样式 */
:deep(.n-data-table-td .n-checkbox-box) {
    --n-color-checked: var(--my-td-color-checked);
    --n-border-radius: 10px;
}

:deep(.n-data-table-th .n-checkbox-box__border) {
    --n-border-checked: var(--my-th-border-checked);
}

:deep(.n-data-table-td .n-checkbox-box__border) {
    --n-border-checked: var(--my-td-border-checked);
}
</style>