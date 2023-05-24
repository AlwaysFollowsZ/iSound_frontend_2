<script>
import ImageTableEntry from './ImageTableEntry.vue'
import { Rows } from './ImageRowData.js'
import { NButton } from 'naive-ui'
import { changeColorMode, getRGBString, getBackgroundColorString, globalThemeColor,getFontColorString } from '/src/colorMode'
export default {
    name: 'NestedComponent',
    props: {
        BackgroundColorString: {
            type: String,
            default: getBackgroundColorString(globalThemeColor)
        },
        layout: {
            type: Array,
            required: true,
            default: [[{}, {}, {}]]
        },
        width: {
            type: Number,
            required: true,
            default: 1000
        },
        height: {
            type: Number,
            required: true,
            default: 1000
        }
    },
    components: {
        BoxComponent: {
            props: {
                width: {
                    type: Number,
                    required: true
                },
                height: {
                    type: Number,
                    required: true
                }
            },
            template: '<image-table-entry : EntrySize="[width / row.length, height / layout.length]" v-bind="Rows[0]" />'
        },
        NestedComponent: {
            props: {
                layout: {
                    type: Array,
                    required: true
                },
                width: {
                    type: Number,
                    required: true
                },
                height: {
                    type: Number,
                    required: true
                }
            },
            template: '<NestedComponent :layout="layout" :width="width" :height="height" />'
        }
    },
    data() {
        const fontColorString = getFontColorString(globalThemeColor)
        return { fontColorString,Rows }
    },
    methods: {
        getRGBString,
        changeColorMode
    }
};
</script>
<template>
    <div :style="{ 'width': `${width}px`, 'height': `${height}px` }">
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
        <div v-for="(row, rowIndex) in layout" :key="rowIndex" class="row">
            <div v-for="(col, colIndex) in row" :key="colIndex" class="col">
                <template v-if="Array.isArray(col)">
                    <NestedComponent :layout="col" :width="width / row.length" :height="height / layout.length" />
                </template>
                <template v-else>
                    <!-- <BoxComponent :width="width / row.length" :height="height / layout.length"></BoxComponent> -->
                    <image-table-entry :EntrySize="[width / row.length, height / layout.length]" v-bind="Rows[0]" />
                </template>
            </div>
        </div>
    </div>
</template >


<style scoped>
.row {
    display: flex;
}

.col {
    margin: 10px;
    flex: 1;
    border:2px solid red;
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
