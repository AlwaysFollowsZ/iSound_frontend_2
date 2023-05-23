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
        value2: ref(null)
      };
    },
    methods: {
      cleanContent() {
        this.value2=""
      }
    }
   
  });
</script>

<template>
    <n-space vertical :style="{'margin-top':'20px'}">

      <table>
        <tbody>
          <tr>
            <td style="width: 50px" :style="{'display':'inline-block','margin-right':'20px'}">
              <div style="width: 50px; padding-top: 10%" :style="{'text-align':'right'}">收件人</div></td>
            <td style="width: 800px">
              <n-input 
              :style="{'--n-border-radius': `10px`}" 
              type="text" 
              placeholder="请输入收件人" 
              clearable
              maxlength="20" show-count/>
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <td style="width: 50px" :style="{'display':'inline-block','margin-right':'20px'}">
              <div style="width: 50px; padding-top: 10%" :style="{'text-align':'right'}">正文</div></td>
            <td style="width: 800px">
              <n-input
              :style="{'--n-border-radius': `20px`}"
              v-model:value="value2"
              type="textarea"
              :autosize="{
                minRows: 20,
                maxRows: 20
              }" 
              show-count
              placeholder="请输入正文"/>
            </td>
          </tr>
        </tbody>
      </table>
  
      <span>
      <n-button class="cancel-button" type="info" @click="cleanContent">清空</n-button>
      <n-button class="send-button" type="info">发送</n-button>
      </span>
    </n-space>

</template>
  
<style>
.cancel-button {
  position: fixed;
  right: 290px;
}

.send-button {
  position: fixed;
  right: 218px;
}

.receive-person {
  width: 60px;
}


</style>