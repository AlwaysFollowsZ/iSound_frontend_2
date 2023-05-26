<template>
    <!-- mmd,number和Number有什么区别 -->
    <div :style="{
        'width': `${tableSize[0]}px`,
        'height': `${tableSize[1]}px`,
        'display': 'inline-block'
    }">
        <template v-for="(row, rowIndex) in layout" :key="rowIndex">
            <ImageTableEntry v-if="row.data !== undefined && row.data !== 'blank'" :EntrySize="getChildAttr(row)"
                v-bind="row.data">
            </ImageTableEntry>
            <div v-else-if="row.data==='blank'" :style="getBoxStyle(row)"></div>
            <NestedLayout v-else :layout="row.content" :direction="direction === 1 ? 0 : 1" :tableSize="getChildAttr(row)"
                :index="index">
            </NestedLayout>
        </template>
    </div>
</template>

<script>
import ImageTableEntry from './ImageTableEntry.vue'
import { Rows } from './ImageRowData.js'
import { NButton } from 'naive-ui'
import { changeColorMode, getRGBString, getBackgroundColorString, globalThemeColor, getFontColorString } from '/src/colorMode'
export default {
    name: 'NestedLayout',
    data() {
    },
    props: {
        //layout必须是一个数组，下一级必须只有数字或者字典
        layout: {
            type: Array,
            default: [
                {
                    size: 1,
                    data: Rows[0]
                }, { size: 2, data: Rows[1] }, { size: 3, data: Rows[2] }, {
                    size: 1,
                    content: [{ size: 4, data: Rows[3] }, { size: 5, data: 'blank' }, { size: 6, data: Rows[5] }]
                }
            ]
        },
        BackgroundColorString: {
            type: String,
            default: 'transparent'
        },
        tableSize: {
            type: Array,
            default: [1000, 1000]
        },
        direction: {
            type: Number,
            default: 1,
        },//延伸方向，0表示横向分布，1表示纵向分布
    },

    methods: {
        //这里必须是数字
        getChildAttr(child) {
            let height, width;
            if (this.direction == 0) {//横向排布,高相同
                height = this.tableSize[1];
                width = this.tableSize[0] * this.getRatio(child);
            }
            else {//纵向排布
                width = this.tableSize[0];
                height = this.tableSize[1] * this.getRatio(child);
            }
            return [width, height]
        },
        getBoxStyle(child) {
            let height, width;
            if (this.direction == 0) {//横向排布,高相同
                height = this.tableSize[1];
                width = this.tableSize[0] * this.getRatio(child);
            }
            else {//纵向排布
                width = this.tableSize[0];
                height = this.tableSize[1] * this.getRatio(child);
            }
            return {
                'width': `${width}px`,
                'height': `${height}px`,
                'display':'inline-block'
            }
        },
        //获取长/宽比率
        getRatio(child) {
            let sum = 0;
            let c = child.size;
            for (let i = 0; i < this.layout.length; i++) {
                sum += this.layout[i].size;
            }
            return c / sum;
        },
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}
/* Add any additional styling as needed */
</style>
