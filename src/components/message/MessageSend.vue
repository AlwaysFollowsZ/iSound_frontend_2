<script>
  import { defineComponent, ref } from "vue";
  import { NSpace, NInput } from "naive-ui";
  export default defineComponent({
    name : 'MessageSend',
    components: {
        NSpace,
        NInput,
    },
    setup() {
      return {
        value1: ref(null),
        value2: ref(null),
      };
    }
  });
</script>

<template>
    <n-space vertical>
      收件人：<n-input v-model:value="value1" type="text" placeholder="基本的 Input" />
      内容：<n-input
        v-model:value="value2"
        type="textarea"
        placeholder="基本的 Textarea"
      />
    </n-space>
</template>
  
