<script setup>
import { defineProps,ref} from 'vue'
import { NScrollbar, NButton} from 'naive-ui'
import ImageTableEntry from './ImageTableEntry.vue'
import { getBackgroundColorString, getFontColorString, changeColorMode, globalThemeColor} from '/src/colorMode'
import { Rows } from './ImageRowData'

const Datas = defineProps({
    tableSize: {
        type: Array,
        default: ['1000', '1000']
    },
    position: {
        type: String,
        default: 'HomeView'
    },
    count: {
        type: Number,
        default: 10,
    },
    rows: {
        type: JSON.type,
        default: Rows
        }
})//传入props
const themeColor = globalThemeColor
const BackgroundColorString = getBackgroundColorString(themeColor, 225)
const fontColorString = getFontColorString(themeColor)
</script>


<template>
    <div class="image_table" 
    :style="{
        'background-color':`rgba(${BackgroundColorString},0.3)`,
        // 'border': `5px solid rgb(${themeColorString},0.7)`,
        'border-radius': '50px',
        'width':`${tableSize[0]}px`,
        'height':`${tableSize[1]}px`}">
        <n-scrollbar v-if="position==='PersonalView'" class="image_table_list">
            <template v-for="data in Datas.rows" :key="data.name">
                <image-table-entry v-bind="data" style="vertical-align: middle;"></image-table-entry>  
            </template>
        </n-scrollbar>
        <template v-else>
            
                <div class="list_top_nav">
                    <n-button class="more_button" 
                        :style="{
                            '--n-color':`rgba(${BackgroundColorString},0.15)`,
                            '--n-color-hover': `rgba(${BackgroundColorString},0.4)`,
                            '--n-color-pressed': `rgba(${BackgroundColorString},0.6)`,
                            '--n-color-focus': `rgba(${BackgroundColorString},0.1)`,
                            '--n-border': `3px solid rgba(${BackgroundColorString},0.5)`,
                            '--n-border-radius':'10px',
                            '--n-border-hover':`3px solid rgba(${BackgroundColorString},0.5)`,
                            '--n-border-pressed':`3px solid rgba(${BackgroundColorString},0.3)`,
                            '--n-border-focus':`3px solid rgba(${BackgroundColorString},0.5)`,
                            '--n-text-color':`rgba(${fontColorString},0.6)`,
                            '--n-text-color-hover': `rgba(${fontColorString},0.8)`,
                            '--n-text-color-pressed': `rgba(${fontColorString})`,
                            '--n-text-color-focus': `rgba(${fontColorString},0.6)`,
                            '--n-ripple-color':`rgba(${fontColorString},0.5)`,
                            '--n-wave-opacity':'1'
                            }" 
                            @click="changeColorMode">
                        更多
                    </n-button>
                </div>
            <div class="image_table_list"
            :style="{
                'background-color': `rgba(${BackgroundColorString},0.4)`,
                'border': `5px solid rgb(${BackgroundColorString},0.7)`,
                'border-radius': '50px',
                'height': `${tableSize[1] - 100}px`}">
                <n-scrollbar x-scrollable>
                <template v-for="data in Datas.rows" :key="data.name">
                    <image-table-entry v-bind="data"
                    style="vertical-align: middle;"></image-table-entry>  
                </template>
                </n-scrollbar>
            </div>
        </template>
    </div>
</template>

<style scoped>
*{
    padding: 0;
    margin: 0;
}

.image_table{
    margin: 30px 30px;
    padding: 20px 0px 0 0px;
    display: inline-block;
    overflow: hidden;
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
}
.list_top_nav{
    position: relative;
    margin: 10px auto 20px auto;
    height: 60px;
}
.image_table_list{
    padding:0 20px;
}

.more_button{
    position: absolute;
    right: 20px;
    top:0;
    bottom:0;
    margin: auto;
    padding: 30px 30px;
    font-size: 25px;
    font-weight: 700;
}

</style>