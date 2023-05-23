<script>
import ImageTable from './ImageTable.vue'
import {Rows} from './ImageRowData.js'
export default {
    props: {
        count: {
            type: Number,
            default:Rows.length
        },
        //布局：先声明行(rows),再声明列
        layout: {
            type: JSON.type,
            default: [
                //这是一行
                [
                    [{

                    }],
                    [{

                    },
                        {
                        
                    }],
                    [{
                        
                    }, {
                        
                        }, {
                        
                    }]
                ]
                //这是一列
        ]}
        
    }
}
</script>
<template>
    
</template>
<style scoped>

</style>