<script>
import { mapState } from 'vuex'
import store from '/src/store/index.js'
import { h, ref, defineProps, computed, watch } from 'vue'
import { Rows } from '/src/components/tables/ImageTable/ImageRowData'
import { NDataTable, NButton, NPopconfirm, NPopover, NEllipsis, NPagination, NConfigProvider, NModal, NIcon } from 'naive-ui'
import { Heart12Filled, Star12Filled, Delete20Regular, DeleteDismiss20Regular } from '@vicons/fluent';
import { ArrowBack, CheckmarkCircleOutline } from '@vicons/ionicons5';
import { getFontColorString, getBackgroundColorString, globalThemeColor, changeThemeColorByImage, getRGBString, antiBackgroundColor } from '/src/colorMode'
import imageTable from '../ImageTable/ImageTable.vue';
import 'animate.css';
import { backgroundColor } from '../../../colorMode';
export default {
    data() {
        let isLoggedIn = computed(() => {
            return this.$cookies.isKey('userid')
        })
        let isAdmin = computed(() => {
            return this.$cookies.get('is_superuser') == 'true'
        })
        let collectionData = []//当前用户的收藏夹的数据
        let formData = new FormData()
        formData.append('shared', false)
        this.$http.get('/api/playlist/of/0/', formData).then((response) => {
            let key = 0
            this.collectionData = response.data.playlist_set.map((collection) => {
                return {
                    Key: key++,
                    Id: collection.id,
                    imagePath: collection.cover,
                    Name: collection.title,
                    songCount: collection.music_set.length
                }
            })
        })//获取当前用户的收藏夹数据(会在nmodal中使用)
        let viewMode = this.viewMode//转换一下
        let headChange = false//模态框标题是否转换
        let showCollection = false//表头的收藏夹是否显示模态框(表项的在每一行定义)
        let isCollectChanged = false
        const HeadBackgroundColorString = getBackgroundColorString(globalThemeColor)
        const DataBackgroundColorString = getBackgroundColorString(globalThemeColor)
        const BackgroundColorString = DataBackgroundColorString
        const fontColorString = getFontColorString(globalThemeColor)
        watch(globalThemeColor, () => {
            const tempFontColorString = getFontColorString(globalThemeColor)
            const tempBackgroundColorString = getBackgroundColorString(globalThemeColor)
            document.documentElement.style.setProperty('--my-arrow-color', getRGBString(tempFontColorString.value, 0.5))
            document.documentElement.style.setProperty('--my-text-color', getRGBString(tempFontColorString.value, 0.8))
            document.documentElement.style.setProperty('--my-color', getRGBString(tempBackgroundColorString.value, 0.5))
            document.documentElement.style.setProperty('--my-color-focus', getRGBString(tempBackgroundColorString.value, 0.7))
            document.documentElement.style.setProperty('--my-color-active', getRGBString(tempBackgroundColorString.value, 0.8))
            document.documentElement.style.setProperty('--my-border', `1px solid ${getRGBString(tempFontColorString.value, 0.1)}`)
            document.documentElement.style.setProperty('--my-border-hover', `1px solid ${getRGBString(tempFontColorString.value, 0.6)}`)
            document.documentElement.style.setProperty('--my-border-active', `1px solid ${getRGBString(tempFontColorString.value, 0.8)}`)
            document.documentElement.style.setProperty('--my-border-focus', `1px solid ${getRGBString(tempFontColorString.value, 0.8)}`)
            // document.documentElement.style.setProperty('--my-shadow', `0 0 1px 1px ${getRGBString(tempFontColorString.value, 0.5)}`)
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
        let columns = computed(() => [
            {
                title(column) {
                    return h('div',
                        {
                            style:
                            {
                                'font-size': '18px',
                                'padding-left': '60px'
                            }
                        }, `歌曲`)
                },
                titleColSpan: 2,
                key: 'name',
                sorter: 'default',
                width: '75px',
                render: (row) => {
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
                            this.$EventBus.emit('play', row.id)
                        }
                    })
                }
            },
            {
                key: 'name',
                resizable: true,
                maxWidth: '1000px',
                render: (row) => {
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
                            this.$EventBus.emit('play', row.id)
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
            //我喜欢只在用户界面出现
            (isLoggedIn.value && !isAdmin.value) ? {
                key: 'like',
                width: '10px',
                title: (column) => h(NPopover, {
                    trigger: 'hover',
                    style: {
                        'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                        '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                    }
                },
                    {
                        trigger: () => h(NButton, {
                            onClick: () => {
                                emit('likeAll', this.selectedEntries)
                            },
                            style: {
                                'display': this.isSelected ? '' : 'none',
                                '--n-color': getRGBString(fontColorString.value, 0.3, 'background', viewMode),
                                '--n-color-hover': getRGBString(fontColorString.value, 0.5, 'background', viewMode),
                                '--n-color-focus': getRGBString(fontColorString.value, 0.4, 'background', viewMode),
                                '--n-color-pressed': getRGBString(fontColorString.value, 0.3, 'background', viewMode),
                                '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font', viewMode)}`,
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
                        default: () => {
                            return h('span',
                                {
                                    style: {
                                        'font-size': '12px'
                                    }
                                },
                                ['从"我喜欢"移除 / 添加到"我喜欢"'])
                        }
                    })
                ,
                style: {
                    "text-align": "center"
                },
                render: (row) => {
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
                                    emit('like', row.key)
                                    // setTimeout(() => { row['isLikeChanged'] = false }, 200)
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
                                            'color': row.isLiked ? 'rgb(204,12,32)' : 'rgb(235,245,235)'
                                        }
                                    })
                                }),//"我喜欢按钮"
                            default: () => {
                                return h('span',
                                    {
                                        style: {
                                            'font-size': '12px'
                                        }
                                    },
                                    [row.isLiked ? `从"我喜欢"移除` : `添加到"我喜欢"`])
                            }
                        })

                }
            } : {},
            //收藏夹也只在用户界面出现
            (isLoggedIn.value && !isAdmin.value) ? {
                key: "collect",
                width: '10px',
                title: (column) => {
                    const position = this.position
                    return h('div', [h(NPopover, {
                        trigger: 'hover',
                        style: {
                            'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                            '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                        }
                    },
                        {
                            trigger: () => h(NButton, {
                                onClick: () => {
                                    this.showCollection = true
                                },
                                style: {
                                    'display': this.isSelected ? '' : 'none',
                                    '--n-color': getRGBString(fontColorString.value, 0.3, 'background', viewMode),
                                    '--n-color-hover': getRGBString(fontColorString.value, 0.5, 'background', viewMode),
                                    '--n-color-focus': getRGBString(fontColorString.value, 0.4, 'background', viewMode),
                                    '--n-color-pressed': getRGBString(fontColorString.value, 0.3, 'background', viewMode),
                                    '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font', viewMode)}`,
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
                            default: () => {
                                return h('span',
                                    {
                                        style: {
                                            'font-size': '12px'
                                        }
                                    },
                                    ['添加到收藏夹'])
                            }
                        }),
                    //标题模态框
                        h(NModal, {
                        blockScroll:false,
                        'z-index': 1,
                        show: this.showCollection,
                        'on-mask-click': () => {
                            this.showCollection = false
                        },
                    }
                        , h('div', {
                            style: {
                                'background': getRGBString(BackgroundColorString, 0.6),
                                'position': 'relative',
                                'top': '-50px',
                                'text-align': 'center',
                                'border-radius': '50px'
                            }
                        }, [
                            //除了多选外，“请选择收藏夹”的标题不会在收藏夹页面出现
                            h('div', {
                                style: {
                                    'margin': '20px',
                                    'font-size': '25px',
                                    'font-weight': '700',
                                    'background-color': getRGBString(BackgroundColorString.value, 0.8),
                                    'color': getRGBString(fontColorString.value, 0.8),
                                    'margin-top': '20px',
                                    'border-radius': '50px',
                                    'animation': this.isCollectChanged ? 'bounceIn' : '',
                                    'animation-duration': '1s'
                                },
                            }, this.headChange === true ? '添加成功' : '请选择收藏夹'),
                            //除了多选外，“选择收藏夹”的imageTable不会在收藏夹页面出现
                            h(imageTable, {
                                rows: this.collectionData,
                                tableSize: [1000,],
                                entrySize: [200, 200],
                                position: 'CollectionView',
                                onFlushCollections: this.updateCollections,
                                //注意传出来的是ID
                                handleClickEntry: (listId) => {
                                    this.isCollectChanged = true
                                    this.headChange = true
                                    //先设置所有项的isCollectChanged
                                    for (let i = 0; i < this.selectedEntries.length; i++) {
                                        this.songData[i].isCollectChanged = true
                                        this.songData[i].isCollected = true
                                    }
                                    setTimeout(() => {
                                        this.showCollection = false
                                        this.headChange = false
                                        setTimeout(() => {
                                            emit('collectAll', this.selectedEntries, listId)
                                            this.isCollectChanged = false
                                        }, 500)
                                    }, 800)
                                }
                            }, ''),
                        ]))])
                },
                render: (row) => {
                    const position = this.position
                    return h('div', [h(NPopover, {
                        trigger: 'hover',
                        style: {
                            'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                            '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                        }
                    },
                        {
                            trigger: () => h(NButton, {
                                onClick: () => {
                                    //若列表处于收藏夹页面，则row.isCollected需要变为true
                                    if (this.position === 'CollectionView' && !row.isCollected) {
                                        row.isCollected = true
                                        row.isCollectChanged = true
                                        emit('recollect', row.key)
                                        setTimeout(() => {
                                            row.isCollectChanged = false
                                        },500)
                                    }
                                    else {
                                        row.showCollection = true
                                    }
                                },
                                style: {
                                    '--n-color': getRGBString(DataBackgroundColorString.value, 1, 'background',
                                        viewMode),
                                    '--n-color-hover': getRGBString(DataBackgroundColorString.value, 0.6, 'background', viewMode),
                                    '--n-color-focus': getRGBString(DataBackgroundColorString.value, 1, 'background', viewMode),
                                    '--n-color-pressed': getRGBString(DataBackgroundColorString.value, 0.3, 'background', viewMode),
                                    '--n-color-disabled': getRGBString(DataBackgroundColorString.value, 1, 'background', viewMode),
                                    '--n-border-hover': `1px solid ${getRGBString(fontColorString.value, 0.5, 'font',
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
                                            'color': row.isCollected === true ? 'rgb(255, 230, 120)' : 'rgb(235,245,235)'
                                        }
                                    }),
                                }),//收藏按钮
                            default: () => {
                                return h('span',
                                    {
                                        style: {
                                            'font-size': '12px',
                                        }
                                    },
                                    [row.isCollected ? (this.position === 'CollectionView' ? '取消收藏' : '添加到新的收藏夹') :
                                        (this.position === 'CollectionView' ? '重新收藏' : '添加到收藏夹')])
                            },
                            // 
                        }), h(NModal, {
                            blockScroll:false,
                            'z-index': 1,
                            show: row.showCollection,
                            'on-mask-click': () => {
                                row.showCollection = false
                            },
                        }
                            , h('div', {
                                style: {
                                    'background': getRGBString(BackgroundColorString, 0.6),
                                    'position': 'relative',
                                    'top': '-50px',
                                    'text-align': 'center',
                                    'border-radius': '50px'
                                }
                            }, [
                                //“请选择收藏夹”的标题不会在收藏夹页面出现
                                h('div', {
                                    style: {
                                        'display': (this.position !== 'CollectionView') ? 'default' : 'none',
                                        'margin': '20px',
                                        'font-size': '25px',
                                        'font-weight': '700',
                                        'background-color': getRGBString(BackgroundColorString.value, 0.8),
                                        'color': getRGBString(fontColorString.value, 0.8),
                                        'margin-top': '20px',
                                        'border-radius': '50px',
                                        'animation': row.isCollectChanged === true ? 'bounceIn' : 'none',
                                        'animation-duration': '1s'
                                    },
                                }, this.headChange ? '添加歌曲成功' : '请选择收藏夹'),
                                //“选择收藏夹”的imageTable不会在收藏夹页面出现
                                (this.position !== 'CollectionView') ? h(imageTable, {
                                    rows: this.collectionData,
                                    onFlushCollections: this.updateCollections,
                                    tableSize: [1000,],
                                    entrySize: [200, 200],
                                    position: 'CollectionView',//需要显示的是收藏夹页面
                                    handleClickEntry: (listId) => {
                                        this.headChange = true
                                        row.isCollectChanged = true
                                        row.isCollected = true
                                        setTimeout(() => {
                                            row.showCollection = false
                                            setTimeout(() => {
                                                emit('collect', row.key, listId)
                                                this.headChange = false
                                            }, 500)
                                        }, 800)
                                    }
                                }, '') : '',
                                //取消收藏的modal.只能在收藏夹页面取消收藏
                                h('div', {
                                    style: {
                                        'display': (this.position === 'CollectionView') ? 'block' : 'none',
                                        'padding': '0 20px',
                                        'margin': '20px',
                                        'font-size': '25px',
                                        'font-weight': '700',
                                        'background-color': getRGBString(BackgroundColorString.value, 0.7),
                                        'color': getRGBString(fontColorString.value, 0.8),
                                        'margin-top': '20px',
                                        'border-radius': '50px',
                                        'animation': row.isCollectChanged === true ? 'bounceIn' : 'none',
                                        'animation-duration': '1s'
                                    },
                                }, [this.headChange === true ? `取消收藏成功` : `是否取消收藏?`]),
                                //取消按钮
                                [h(NButton, {
                                    color: getRGBString(this.BackgroundColorString, 0.8),
                                    circle: true,
                                    ghost: true,
                                    focus: false,
                                    style: {
                                        'display': (this.position === 'CollectionView') ? 'default' : 'none',
                                        'font-size': '30px',
                                        'margin': '50px 100px 50px 50px'
                                    },
                                    onClick: () => {
                                        row['showCollection'] = false
                                    }
                                },
                                    h(NIcon, h(ArrowBack))),
                                //确定按钮
                                h(NButton, {
                                    color: getRGBString(this.BackgroundColorString, 0.8),
                                    circle: true,
                                    ghost: true,
                                    focus: false,
                                    style: {
                                        'display': (this.position === 'CollectionView') ? 'default' : 'none',
                                        'font-size': '25px',
                                        'margin': '50px 50px 50px 100px'
                                    },
                                    onClick: () => {
                                        this.headChange = true
                                        row.isCollected = false
                                        row.isCollectChanged = true
                                        emit('discollectOnCollection', row.key)
                                        //先通知更新数据
                                        setTimeout(() => {
                                            //现在公共界面不能取消收藏，只能添加到收藏夹
                                            row.showCollection = false
                                            setTimeout(() => {
                                                this.headChange = false
                                                row.isCollectChanged=false
                                            }, 500)
                                        }, 800)
                                    }
                                }, h(NIcon, h(CheckmarkCircleOutline)))]
                            ]))])
                }
            } : {},
            //删除歌曲只能在管理员界面出现
            (isAdmin.value) ? {
                key: 'delete',
                width: '10px',
                title: (column) => h(NPopconfirm, {
                    positiveText: '确定',
                    negativeText: '取消',
                    negativeButtonProps: {
                        focusable: false,
                        color: getRGBString(fontColorString.value, 0.7, 'font', viewMode)
                    },
                    positiveButtonProps: {
                        color: 'rgb(204,12,32)'
                    },
                    onPositiveClick: () => {
                        emit('deleteAll', this.selectedEntries)
                    },
                    onNegativeClick: () => { },//什么都不做
                    style: {
                        'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                        '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                    }
                },
                    {
                        trigger: () => h(NButton, {
                            focusable: false,
                            style: {
                                'display': this.isSelected ? '' : 'none',
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
                            icon: () => h(Delete20Regular, {
                                style: {
                                    'color': 'rgb(204,12,32)'
                                }
                            })
                        }),
                        default: () => {
                            return h('span',
                                {
                                    style: {
                                        'font-size': '12px'
                                    }
                                },
                                ['确认删除所选的歌曲?'])
                        }
                    })
                ,
                style: {
                    "text-align": "center"
                },
                render: (row) => {
                    return h(NPopconfirm, {
                        positiveText: '确定',
                        negativeText: '取消',
                        negativeButtonProps: {
                            focusable: false,
                            color: getRGBString(fontColorString.value, 0.7, 'font', viewMode)
                        },
                        positiveButtonProps: {
                            color: 'rgb(204,12,32)'
                        },
                        onPositiveClick: () => {
                            emit('delete', row.key)
                        },
                        onNegativeClick: () => { },//什么都不做
                        style: {
                            'color': getRGBString(fontColorString.value, 1, 'font', viewMode),
                            '--n-color': getRGBString(HeadBackgroundColorString.value, 0.8, 'background', viewMode)
                        }
                    },
                        {
                            trigger: () => h(NButton, {
                                focusable: false,
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
                                },
                            }, {
                                icon: () => h(Delete20Regular, {
                                    color: 'rgb(204,12,32)'
                                })
                            }),
                            default: () => {
                                return h('span',
                                    {
                                        style: {
                                            'font-size': '12px'
                                        }
                                    },
                                    ['确认删除歌曲?'])
                            }
                        })
                }
            } : {},
            {
                type: 'selection',
            },
        ])//表头和表项
        let rowProps = (row) => {
            if (row.isDeleted !== undefined && isAdmin.value) {//只有管理员有删除动画
                return {
                    style: {
                        'animation': row.isDeleted ? 'slideOutRight' : 'none',
                        'animation-duration': '1.5s'
                    }
                }
            }
        }
        return {
            collectionData, HeadBackgroundColorString, DataBackgroundColorString, fontColorString,
            isSelected, selectedEntries, columns, getRGBString, h, BackgroundColorString, headChange,
            showCollection, isCollectChanged, rowProps
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
                    isCollected: false,//公开页面：是否被自己任意一个收藏夹收藏过；个人页面：被打开的收藏夹收藏过
                    CollectedLists: [],//公开页面：收藏本歌曲的收藏夹id；个人页面：无作用
                    imgSrc: "/src/assets/song4.jpg"
                }]
        },//歌曲数据
        //使用该组件的位置，包括公开页面PublicView和自己的收藏夹页面CollectionView
        //在公开页面、歌单和播放记录页面，收藏按钮点击后可以选择需要收藏的收藏夹；而在收藏夹界面，点击后只会弹出“是否取消收藏”。
        position: {
            type: String,
            require: true,
            default: 'CollectionView',
            validator: (value) => {
                return ['CollectionView', 'PublicView'].includes(value)
            }
        },
        //当前所在的歌单或收藏夹的ID
        currentListId: {
            type: Number
        }
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
        },
        updateCollections() {
            this.$http.get('/api/playlist/of/0/', formData).then((response) => {
                let key = 0
                console.log('update:content=' + response.data.playlist_set)
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
                        songCount: collection.music_set.length
                    }
                })
                console.log('cod' + JSON.stringify(response.data))
            })//更新当前用户的收藏夹数据(会在nmodal中使用)
        },
    },
    emits: ['like', 'collect', 'likeAll', 'collectAll', 'discollectOnPublic', 'discollectOnCollection', 'removeSong', 'deleteAll', 'delete']
}
</script>

<template>
    <div class="table-box">
        <div class="before_table">
        </div>
        <n-data-table ref="dataTable" :bordered="false" :columns="columns" :row-props="rowProps" :data="songData"
            :pagination="{
                style: {
                    'font-weight': '700',
                    //页面按钮
                    '--n-item-text-color': getRGBString(fontColorString, 0.8, 'font'),
                    '--n-item-text-color-hover': getRGBString(fontColorString, 0.8, 'font'),
                    '--n-item-text-color-active': getRGBString(fontColorString, 0.5),
                    '--n-item-text-color-pressed': getRGBString(fontColorString, 0.2),
                    '--n-item-border-hover': `1px solid ${getRGBString(fontColorString, 0.6)}`,
                    '--n-item-border-pressed': `1px solid ${getRGBString(fontColorString, 0.3)}`,
                    '--n-item-border-active': `1px solid ${getRGBString(fontColorString, 0.6)}`,
                    '--n-item-border-active-hover': `1px solid ${getRGBString(fontColorString, 1)}`,
                    //不可用的跳转按钮
                    '--n-item-border-disabled': `1px solid ${getRGBString(BackgroundColorString, 0.6)}`,
                    '--n-item-color-disabled': getRGBString(BackgroundColorString, 0.3),
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

                },
                showSizePicker: true,
                showQuickJumper: true,
                suffix: () => h('span', {
                    style: {
                        'color': getRGBString(fontColorString, 0.6),
                        'font-weight': 700
                    }
                }, '页'),
                goto: () => h('span', {
                    style: {
                        'color': getRGBString(fontColorString, 0.6),
                        'font-weight': 700
                    }
                }, '跳转到第'),
                pageSizes: [{
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
                }]
            }" @update:checked-row-keys="handleCheck" class="data-table" :style="{
    // 调节字体、背景、边框颜色
    '--n-border-color': getRGBString(fontColorString, 0.3, 'background', viewMode),
    '--n-loading-color': getRGBString(fontColorString, 0.5, 'font', viewMode),
    '--n-th-text-color': getRGBString(fontColorString, 1, 'font', viewMode),
    '--n-td-text-color': getRGBString(fontColorString, 1, 'font', viewMode),
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
    --my-shadow: none;
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

/* 设置动画样式 */
:deep(.n-data-table-td) {
    animation: fadeIn;
    animation-duration: 1.5s;
}

:deep(.n-data-table-th) {
    animation: slideInRight;
    animation-duration: 1s;
}

:deep(.n-pagination .n-pagination-item.n-pagination-item--disabled) {
    cursor: default;
}

/* 表头的选择框样式 */
:deep(.n-data-table-th .n-checkbox-box) {
    --n-color-checked: var(--my-th-color-checked);
    --n-border-radius: 5px;
    --n-border-focus: var(--my-border-focus);
    /* --n-box-shadow: var(--my-shadow); */
    --n-box-shadow-focus: var(--my-shadow-focus);
    --n-box-shadow-active: var(--my-shadow-active);
}

/* 数据的选择框样式 */
:deep(.n-data-table-td .n-checkbox-box) {
    --n-color-checked: var(--my-td-color-checked);
    --n-border-radius: 10px;
    --n-border-focus: var(--my-border-focus);
    /* --n-box-shadow: var(--my-shadow); */
    --n-box-shadow-focus: var(--my-shadow-focus);
    --n-box-shadow-active: var(--my-shadow-active);
}

:deep(.n-data-table-th .n-checkbox-box__border) {
    --n-border-checked: var(--my-th-border-checked);
    --n-border: none;
}

:deep(.n-data-table-td .n-checkbox-box__border) {
    --n-border-checked: var(--my-td-border-checked);
    --n-border: none;
}



/* 修复多选框深度 */
:deep(.n-data-table .n-data-table-th.n-data-table-th--selection) {
    z-index: 0;
}
</style>