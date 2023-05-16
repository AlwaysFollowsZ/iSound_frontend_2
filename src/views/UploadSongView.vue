<template>
    <n-modal v-model:show="goToUploadSong">
        <n-card style="width: 600px" title="模态框" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
                噢！
            </template>
            内容
            <template #footer>
                尾部
            </template>
        </n-card>
    </n-modal>
</template>
  
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "UploadSong",
    setup() {
        return {
            goToUploadSong: ref(false)
        };
    }
});
</script>