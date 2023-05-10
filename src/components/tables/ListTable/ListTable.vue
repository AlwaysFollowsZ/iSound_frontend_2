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
    <n-data-table
        :bordered="false"
        :columns="columns"
        :data="data"
        :pagination="pagination">
    </n-data-table>
</template>



<style>

</style>