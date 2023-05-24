<script>
import { defineComponent, ref } from "vue";
import { NSpace, NInput } from "naive-ui";
export default defineComponent({
  name: 'MessageSend',
  components: {
    NSpace,
    NInput,
  },
  setup() {
    return {
      value1: ref(null),
      value2: ref(null)
    };
  },
  methods: {
    cleanContent() {
      this.value2 = ""
    }
  }

});
</script>

<template>
  <n-space vertical :style="{ 'margin-top': '20px' }">

    <table>
      <tbody>
        <tr>
          <td style="width: 60px" :style="{ 'display': 'inline-block', 'margin-right': '20px' }">
            <div class="item-title" style="width: 60px; padding-top: 10%" :style="{ 'text-align': 'center' }">收件人</div>
          </td>
          <td style="width: 800px">
            <n-input :style="{ 
              '--n-border-radius': `10px`,
              '--n-border-hover': `rgb(108, 108, 108)`,
              '--n-border-focus': `rgb(108, 108, 108)`,
              '--n-caret-color': `rgb(108, 108, 108)`,
              '--n-loading-color': `rgb(108, 108, 108)`,
              '--n-box-shadow-focus': `rgb(108, 108, 108)`,}" type="text" placeholder="请输入收件人" clearable maxlength="20"
              show-count class="input-body-card"/>
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <tbody>
        <tr>
          <td style="width: 60px" :style="{ 'display': 'inline-block', 'margin-right': '20px' }">
            <div class="item-title" style="width: 60px; padding-top: 10%" :style="{ 'text-align': 'center' }">正文</div>
          </td>
          <td style="width: 800px">
            <n-input :style="{ 
              '--n-border-radius': `20px` ,
              '--n-border-hover': `rgb(108, 108, 108)`,
              '--n-border-focus': `rgb(108, 108, 108)`,
              '--n-caret-color': `rgb(108, 108, 108)`,
              '--n-loading-color': `rgb(108, 108, 108)`,
              '--n-box-shadow-focus': `rgb(108, 108, 108)`,
            }" v-model:value="value2" type="textarea" :autosize="{
              minRows: 20,
              maxRows: 20
            }" show-count placeholder="请输入正文" class="input-body-card" />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <n-grid x-gap="12">
        <n-gi :span="19"></n-gi>
        <n-gi :span="2">
          <n-button class="cancel-button" type="info" @click="cleanContent" :style="{
            '--n-color': `rgba(40, 180, 40, 0.657)`,
            '--n-color-hover': `rgba(40, 180, 40, 0.9)`,
            '--n-color-disabled': `rgba(46, 51, 56, .05)`,
            '--n-text-color': `white`,
            '--n-text-color-hover': `white`,
            '--n-text-color-disabled': `rgb(90, 90, 90)`,
          }">清空</n-button></n-gi>
        <n-gi :span="2">
          <n-button class="send-button" type="info" :style="{
            '--n-color': `rgba(40, 120, 200, 0.711)`,
            '--n-color-hover': `rgba(40, 120, 200, 0.95)`,
            '--n-text-color': `white`,
            '--n-text-color-hover': `white`,
          }">发送</n-button></n-gi>
        <n-gi :span="1"></n-gi>
      </n-grid>
    </div>
  </n-space>
</template>
  
<style scoped>
.input-body-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.item-title {
  font-size: 16px;
  font-weight: 500;
}
</style>