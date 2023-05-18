<script>
import { h, ref, defineProps, computed } from 'vue'
import { NDataTable, NButton, NPopover, NEllipsis } from 'naive-ui'
import { Heart12Filled, Star12Filled } from '@vicons/fluent';
import { getFontColorString, getBackgroundColorString, globalThemeColor, changeThemeColorByImage, getRGBString } from '/src/colorMode'

export default {
    data() {
        let viewMode=this.viewMode//转换一下
        const themeColor = globalThemeColor
        const HeadBackgroundColorString = getBackgroundColorString(themeColor, 225)
        const DataBackgroundColorString = getBackgroundColorString(themeColor, 180)
        const fontColorString = getFontColorString(themeColor)
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
                title: (column) => {
                    return h(NButton, {
                        onClick: () => {
                            for (let i = 0; i < selectedEntries.length; i++) {
                                songData.value[selectedEntries[i]].isLiked = true
                            }
                        },
                        style: {
                            'opacity': isSelected ? '1' : '0',
                            '--n-color': getRGBString(HeadBackgroundColorString.value, 1, 'background', viewMode),
                            '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font', viewMode)}`,
                            '--n-border-focus': `none`,
                            '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font', viewMode)}`,
                            '--n-border-disabled': `none`,
                            '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font', viewMode)
                        }
                    }, {
                        icon: () => h(Heart12Filled, {
                            style: {
                                'color': 'rgb(204,12,32)'
                            }
                        })
                    })
                },
                key: 'actions',
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
                                        viewMode)
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
                title: (column) => {
                    return h(NButton, {
                        onClick: () => {
                            for (let i = 0; i < selectedEntries.length; i++) {
                                songData.value[selectedEntries[i]].isCollected = true
                            }

                        },
                        style: {
                            'opacity': isSelected ? '1' : '0',
                            '--n-color': getRGBString(HeadBackgroundColorString.value, 1, 'background', viewMode),
                            '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.8, 'font', viewMode)}`,
                            '--n-border-focus': `none`,
                            '--n-border-pressed': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font', viewMode)}`,
                            '--n-border-disabled': `none`,
                            '--n-ripple-color': getRGBString(fontColorString.value, 0.8, 'font', viewMode)
                        }
                    }, {
                        icon: () => h(Star12Filled, {
                            style: {
                                'color': 'rgb(210,195,135)'
                            }
                        })
                    })
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
                                        viewMode)
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
            pageSize: 10
        }//分页工具
        return {
            themeColor, HeadBackgroundColorString, DataBackgroundColorString, fontColorString,
            isSelected, selectedEntries, songData, columns, pagination,getRGBString
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
                '--n-td-color': getRGBString(HeadBackgroundColorString, 0.6, 'background', viewMode),
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
.data-table {
    display: inline-block;
}

.table-box {
    text-align: center;
    padding: 20px;
}
:deep(.n-data-table__pagination){
    justify-content: center;
}
</style>