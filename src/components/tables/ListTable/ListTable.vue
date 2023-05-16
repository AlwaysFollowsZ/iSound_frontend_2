<script setup>
import { h, ref, defineProps, computed } from 'vue'
import { NDataTable, NButton,NPopover,NEllipsis } from 'naive-ui'
import { Heart12Filled,Star12Filled } from '@vicons/fluent';
import { getFontColorString, getBackgroundColorString,globalThemeColor,changeThemeColorByImage} from '/src/colorMode'

const themeColor = globalThemeColor
const HeadBackgroundColorString = getBackgroundColorString(themeColor, 225) 
const DataBackgroundColorString = getBackgroundColorString(themeColor, 180)
const fontColorString = getFontColorString(themeColor) 
let isSelected = false//当前是否有歌曲被选择
let selectedEntries=[]//被选择的项（和rowKey同步更新）

const data = ref([
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
])

const columns = ref([
    {
        type: 'selection',
        className:'check-box'
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
                        'color': `rgb(${fontColorString.value})`,
                        '--n-color': `rgb(${HeadBackgroundColorString.value},0.8)`
                    }
                }
            },()=>[h('a', {
                style: {
                    'text-decoration': 'none',
                    'display': 'block',
                    'cursor': 'pointer',
                    'color':`rgb(${fontColorString.value},0.8)`
                },
                onClick: () => {
                    changeThemeColorByImage(row.imgSrc)
                }
            }, row.name)])
        }
    },
    {
        title: '歌手',
        key:'singer'
    },
    {
        title: '时长',
        key:'length'
    },
    {
        title: (column) => {
            return h(NButton, {
                onClick: () => {
                    for (let i = 0; i < selectedEntries.length; i++){
                        data.value[selectedEntries[i]].isLiked=true
                    }
                },
                style: {
                    'opacity': isSelected ? '1' : '0',
                    '--n-color': `rgb(${HeadBackgroundColorString.value})`,
                    '--n-border-hover': `1px solid rgb(${fontColorString.value},0.8)`,
                    '--n-border-focus': `none`,
                    '--n-border-pressed': `1px solid rgb(${fontColorString.value},0.5)`,
                    '--n-border-disabled': `none`,
                    '--n-ripple-color': `rgb(${fontColorString.value},0.8)`
                }
            }, {
                icon: () => h(Heart12Filled, {
                    style: {
                        'color' : 'rgb(204,12,32)'
                    }
                })
            })
        },
        key: 'actions',
        style: {
            "text-align":"center"
        },
        render(row) {
            return h(NPopover, {
                trigger: 'hover',
                style: {
                    'color': `rgb(${fontColorString.value})`,
                    '--n-color': `rgb(${HeadBackgroundColorString.value},0.8)`
                }
            },
                {
                    trigger:()=> h(NButton, {
                        onClick: () => {
                            row.isLiked = !row.isLiked
                        },
                        style: {
                            '--n-color': `rgb(${DataBackgroundColorString.value})`,
                            '--n-border-hover': `1px solid rgb(${fontColorString.value},0.8)`,
                            '--n-border-focus': `none`,
                            '--n-border-pressed': `1px solid rgb(${fontColorString.value},0.5)`,
                            '--n-border-disabled': `none`,
                            '--n-ripple-color': `rgb(${fontColorString.value},0.8)`
                        }   
                    },
                        {
                            icon: () => h(Heart12Filled, {
                                style: {
                                'color':row.isLiked?'rgb(204,12,32)':'white'
                            }
                        }) }),//"我喜欢按钮"
                    default:()=> h('span',
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
                        data.value[selectedEntries[i]].isCollected = true
                    }
                
                },
                style: {
                    'opacity': isSelected ? '1' : '0',
                    '--n-color':`rgb(${HeadBackgroundColorString.value})`,
                    '--n-border-hover': `1px solid rgb(${fontColorString.value},0.8)`,
                    '--n-border-focus': `none`,
                    '--n-border-pressed': `1px solid rgb(${fontColorString.value},0.5)`,
                    '--n-border-disabled': `none`,
                    '--n-ripple-color': `rgb(${fontColorString.value},0.8)`
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
                    'color': `rgb(${fontColorString.value})`,
                    '--n-color': `rgb(${HeadBackgroundColorString.value},0.8)`
                }
            },
                {
                    trigger: () => h(NButton, {
                        onClick: () => {
                            row.isCollected = !row.isCollected
                        },
                        style: {
                            '--n-color': `rgb(${DataBackgroundColorString.value})`,
                            '--n-border-hover': `1px solid rgb(${fontColorString.value},0.8)`,
                            '--n-border-focus': `none`,
                            '--n-border-pressed': `1px solid rgb(${fontColorString.value},0.5)`,
                            '--n-border-disabled': `none`,
                            '--n-ripple-color': `rgb(${fontColorString.value},0.8)`
                        }
                    },
                        {
                            icon: () => h(Star12Filled, {
                                style: {
                                    'color': row.isCollected ? 'rgb(210,195,135)' : 'white'
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
])

const pagination = ref({
    pageSize:10
})

const handleCheck = (rowKeys) => {
    selectedEntries=rowKeys
    if (rowKeys.length === 0) {
        isSelected=false
    }
    else {
        isSelected=true
    }
}
</script>

<template>
    <div class="table-box">
        <div class="before_table">

        </div>
        <n-data-table
            ref="dataTable"
            :bordered="false"
            :columns="columns"
            :data="data"
            :pagination="pagination"
            @update:checked-row-keys="handleCheck"
            class="data-table"
            :style="{
                // 调节字体、背景、边框颜色
                '--n-th-text-color':`rgb(${fontColorString})`,
                '--n-td-text-color': `rgb(${fontColorString},0.8)`,
                '--n-td-color':`rgb(${HeadBackgroundColorString},0.6)`,
                '--n-th-color':`rgb(${DataBackgroundColorString},0.6)`,
                '--n-td-color-hover': `rgba(${HeadBackgroundColorString},0.1)`,
                '--n-th-color-hover': `rgba(${DataBackgroundColorString},0.1)`,
                '--n-th-font-weight':'700',
                '--n-border-color':`rgb(${fontColorString},0.6)`,
                '--n-color-checked': `rgb(${fontColorString},0.8)`,
                '--n-check-mark-color':`rgb(${HeadBackgroundColorString},0.6)`,
                '--n-font-size':'20px'
            }" >
        </n-data-table>
    </div>
</template>



<style scoped>

.data-table{
    display: inline-block;
    margin:20px 100px;
    max-width:1500px
}
.table-box{
    text-align: center;
    overflow: scroll;
}

</style>