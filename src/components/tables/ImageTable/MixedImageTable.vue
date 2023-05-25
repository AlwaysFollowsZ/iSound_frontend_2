<script>
import ImageTableEntry from './ImageTableEntry.vue'
import MixedImageTableBody from './MixedImageTableBody.vue'
import { Rows } from './ImageRowData.js'
import { NButton } from 'naive-ui'
import { changeColorMode, getRGBString, getBackgroundColorString, globalThemeColor, getFontColorString } from '/src/colorMode'

export default {
    props: {
        BackgroundColorString: {
            type: String,
            default: getBackgroundColorString(globalThemeColor)
        },
        layout: {
            type: Array,
            required: true,
            default: [[1, 2, 1], [1, 3, [1, 1, 1]]]
        },
        TableSize: {
            type: Array,
            default: [1000, 1000]
        }
    },
    data() {
        const fontColorString = getFontColorString(globalThemeColor)
        return { fontColorString, Rows, getRGBString, changeColorMode }
    },
}
</script>


<template>
    <div :style="{
        'width': `${TableSize[0]}px`, 'height': `${TableSize[1]}px`,
        'background': getRGBString(BackgroundColorString, 0.7)
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
        <mixed-image-table-body :height="TableSize[1]-100" :width="TableSize[0]" :layout="layout"></mixed-image-table-body>
    </div>
</template >

<style scoped>
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