<script>
import ImageTableEntry from './ImageTableEntry.vue'
import { Rows } from './ImageRowData.js'
import { NButton } from 'naive-ui'
import { changeColorMode, getRGBString, getBackgroundColorString, globalThemeColor, getFontColorString } from '/src/colorMode'
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
            default: [[1, 2, 1], [1, 3, [1, 1, 1]]]
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
        NestedComponent: {
            props: {
                layout: {
                    type: Array,
                    required: true,
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
        return { fontColorString, Rows }
    },
    methods: {
        getRGBString,
        changeColorMode,
        getLength: (child, parent, totalLength) => {
            const getSumRatio = (elm) => {//计算组件比率
                let ratio = 0
                if (Array.isArray(elm)) {
                    for (let i = 0; i < elm.length; i++) {
                        ratio += getSumRatio(elm[i])
                    }
                }
                else {
                    ratio += elm
                }
                return ratio
            }
            console.log(totalLength, getSumRatio(child), getSumRatio(parent)); 
            console.log(getSumRatio(child) / getSumRatio(parent) * totalLength);
            return getSumRatio(child) / getSumRatio(parent) * totalLength
        }

    }
};
</script>
<template>
    <div class="image_table_list" :style="{
        'width': `${width}px`, 'height': `${height}px`,
        'background-color': `rgba(${BackgroundColorString},0.25)`,
        'border': `5px solid rgb(${BackgroundColorString},0.7)`,
        'border-radius': '50px',
    }">
        <div v-for="(row, rowIndex) in layout" :key="rowIndex" class="row">
            <div v-for="(col, colIndex) in row" :key="colIndex" class="col">
                <template v-if="Array.isArray(col)">
                    <NestedComponent :layout="col" :width="getLength(col, layout, width)"
                        :height="getLength(col, layout, height)" />
                </template>
                <template v-else>
                    <image-table-entry :EntrySize="// [getLength(col, layout, width), getLength(col, layout, height)]
                    [100,100]" v-bind="Rows[0]" />
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
    margin: 0px;
    flex: 1;
    border: 2px solid red;
}

.image_table_list {
    padding: 0 20px;
}
</style>
