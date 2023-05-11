<script setup>
import { ref, defineProps, computed } from 'vue'
import { NDataTable } from 'naive-ui'
const columns = ref([
    {
        title: '名称',
        key:'name'
    }
])
const data = ref([
    {
        key: 0,
        name:'A'
    }
])
const pagination = ref({
    pageSize:10
})
</script>

<template>
    <div>
        <n-data-table
            :bordered="false"
            :columns="columns"
            :data="data"
            :pagination="pagination"
            class="data-table">
        </n-data-table>
    </div>
</template>



<style scoped>
.data-table{
    display: inline-block;
    margin:20px 100px
}
</style>