<script setup>
import { defineProps,computed} from 'vue'
import { NScrollbar, NButton, install } from 'naive-ui'
import ImageTableEntry from './ImageTableEntry.vue'
import { getThemeColorString, getFontColorString,changeColorMode} from '/src/components/tables/colorMode'
const datas = defineProps({
    tableSize: {
        type: Array,
        default:[1000,1000]
    },
    position: {
        type: String,
        default: 'HomeView'
    },
    count: {
        type: Number,
        default: 10,
    },
    themeColor: {
        type: Array,
        default: [203, 203, 255]
    },
    rows: {
        type: JSON.type,
        default: [
            {
                Type: 'songList',
                imagePath: '/src/assets/logo.svg',
                SongCount: 10,
                Name: 'test112345678765432123456789',
                imageSize: 300,
                themeColor: [173, 133, 189]
            },
            {
                Type: 'Song',
                imagePath: '/src/assets/logo.svg',
                SongCount: 10,
                Name: 'test112345678765432123456789',
                imageSize: 200,
                themeColor: [75, 243, 189]
            },
            {
                Type: 'songList',
                imagePath: '/src/assets/logo.svg',
                SongCount: 10,
                Name: 'test112345678765432123456789',
                imageSize: 400,
                themeColor: [203, 143, 189]
            },
            {
                Type: 'songList',
                imagePath: '/src/assets/logo.svg',
                SongCount: 10,
                Name: 'test112345678765432123456789',
                imageSize: 150,
                themeColor: [104, 75, 199]
            },
            {
                Type: 'songList',
                imagePath: '/src/assets/logo.svg',
                SongCount: 10,
                Name: 'test112345678765432123456789',
                imageSize: 150,
                themeColor: [10, 204, 144]
            },
            {
                Type: 'songList',
                imagePath: '/src/assets/logo.svg',
                SongCount: 10,
                Name: 'test112345678765432123456789',
                imageSize: 250,
                themeColor: [87, 193, 71]
            },
        ]
    }
})
const themeColor = datas.themeColor
const themeColorString =  getThemeColorString(themeColor)
const fontColorString = getFontColorString(themeColor)
</script>

<template>
    <div class="image_table" 
    :style="{'background-color':`rgba(${themeColorString},0.3)`,
        'border': `5px solid rgb(${themeColorString},0.5)`,
        'border-radius':`${tableSize[0]/10}px ${tableSize[1]/10}px`,
        'width':`${tableSize[0]}px`,
        'height':`${tableSize[1]}px`}">
        <n-scrollbar v-if="position==='PersonalView'" class="image_table_list">
            <template v-for="data in datas.rows" :key="data.name">
                <image-table-entry v-bind="data" style="vertical-align: middle;"></image-table-entry>  
            </template>
        </n-scrollbar>
        <template v-else>
            
                <div class="list_top_nav">
                    <n-button class="more_button" 
                        :style="{
                            '--n-color':`rgba(${themeColorString},0.15)`,
                            '--n-color-hover': `rgba(${themeColorString},0.4)`,
                            '--n-color-pressed': `rgba(${themeColorString},0.6)`,
                            '--n-color-focus': `rgba(${themeColorString},0.1)`,
                            '--n-border': `3px solid rgba(${themeColorString},0.5)`,
                            '--n-border-radius':'10px',
                            '--n-border-hover':`3px solid rgba(${themeColorString},0.5)`,
                            '--n-border-pressed':`3px solid rgba(${themeColorString},0.3)`,
                            '--n-border-focus':`3px solid rgba(${themeColorString},0.5)`,
                            '--n-text-color':`rgba(${fontColorString},0.6)`,
                            '--n-text-color-hover': `rgba(${fontColorString},0.8)`,
                            '--n-text-color-pressed': `rgba(${fontColorString})`,
                            '--n-text-color-focus': `rgba(${fontColorString},0.6)`,
                            '--n-ripple-color':`rgba(${themeColorString})`
                            }" 
                            @click="changeColorMode">
                        更多
                    </n-button>
                </div>
            <n-scrollbar class="image_table_list"
            :style="{'height':`${tableSize[1]-150}px`}">
            <template v-for="data in datas.rows" :key="data.name">
                <image-table-entry v-bind="data"
                style="vertical-align: middle;"></image-table-entry>  
            </template>
            </n-scrollbar>
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
    padding: 20px 40px;
    overflow: hidden;
}
.list_top_nav{
    position: relative;
    margin: 10px auto 20px auto;
    height: 60px;
}
.image_table_list{
    padding: 10px 20px;
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