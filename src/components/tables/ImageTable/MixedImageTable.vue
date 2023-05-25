<script>
import MixedImageTableBody from './MixedImageTableBody.vue'
import { Rows } from './ImageRowData.js'
import { NButton } from 'naive-ui'
import { changeColorMode, getRGBString, getBackgroundColorString, globalThemeColor, getFontColorString } from '/src/colorMode'

export default {
    components: {
        MixedImageTableBody,
        NButton
    },
    props: {
        //可以传入'transparent'表示透明
        tableColorString: {
            type: String,
            default: 'transparent'
        },
        //注意，layout中需要包含数据
        layout: {
            type: Array,
            default: [
                {
                    size: 2,
                    content: [{
                        size: 1,
                        data: Rows[0]
                    }, {
                        size: 2,
                        data: Rows[1]
                    }]
                },
                {
                    size: 1,
                    data: 'blank'
                },
                {
                    size: 5,
                    content: [
                        {
                            size: 4,
                            data: Rows[3]
                        },
                        {
                            size: 1,
                            data: Rows[1]
                        },
                    ]
                },
                {
                    size: 1,
                    data: 'blank'
                },
                {
                    size: 3,
                    content: [
                        {
                            size: 2,
                            data: Rows[3]
                        },
                        {
                            size: 1,
                            content: [
                                {
                                    size: 1,
                                    data: Rows[4]
                                },
                                {
                                    size: 0.5,
                                    data: 'blank'
                                },
                                {
                                    size: 1,
                                    data: Rows[5]
                                }
                            ]
                        }
                    ]
                }

            ]
        },
        TableSize: {
            type: Array,
            default: [1400, 1300]
        }
    },
    data() {
        const fontColorString = getFontColorString(globalThemeColor)
        const BackgroundColorString = getBackgroundColorString(globalThemeColor)
        return {
            fontColorString, BackgroundColorString,
            Rows, getRGBString, changeColorMode
        }
    },
}
</script>


<template>
    <div class='image_table' :style="{
        'width': `${TableSize[0]}px`, 'height': `${TableSize[1]}px`,
        'border-radius': '50px',
        'background': getRGBString(tableColorString, 0.2)
    }">
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
        <MixedImageTableBody :tableSize="[TableSize[0], TableSize[1] - 150]" :layout="layout" :position="1">
        </MixedImageTableBody>
    </div>
</template >


<style scoped>
.image_table {
    margin: 0 auto;
    padding: 20px 0px 0 0px;
    /* display: inline-block; */
    overflow: hidden;
    transition: cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
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

.list_top_nav {
    position: relative;
    margin: 10px auto 20px auto;
    height: 60px;
}
</style>