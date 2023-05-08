<script setup>
import { ref, defineProps,computed } from 'vue'
import {NScrollbar,NButton} from 'naive-ui'
import ImageTableEntry from './ImageTableEntry.vue'


const datas = defineProps({
    tableSize: {
        type: Array,
        default:[1000,800]
    },
    position: {
        type: String,
        default: 'PersonalView'
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
const themeColorString = computed(() => {
    return `${datas.themeColor[0]}, ${datas.themeColor[1]}, ${datas.themeColor[2]}`
})

</script>

<template>
    <div class="image_table" 
    :style="{'background-color':`rgba(${themeColorString},0.2)`,
        'border': `5px solid rgb(${themeColorString},0.5)`,
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
                            '--n-border': `50px solid rgba(${themeColorString},0.2)`,
                            '--n-border-radius':`20px`
                            }" 
                        :color="`rgba(${themeColorString},0.5)`"
                        :text-color="`rgba(${themeColorString},0.8)`">
                        更多
                    </n-button>
                </div>
            <n-scrollbar>
            <template v-for="data in datas.rows" :key="data.name">
                <image-table-entry v-bind="data" style="vertical-align: middle;"></image-table-entry>  
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
}
.list_top_nav{
    position: relative;
    margin: 10px auto 20px auto;
    height: 60px;
}
.image_table_list{
    max-height: 1000px;
    overflow: scroll;
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