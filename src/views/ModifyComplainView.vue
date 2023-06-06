<script>
import { CloseOutline } from "@vicons/ionicons5";
import { defineComponent } from "vue";
import { NModal } from "naive-ui";
import { mapState } from 'vuex';
import { message } from "ant-design-vue";
export default defineComponent({
  name: "ModifyComplainView",
  components: {
    NModal,
    CloseOutline,
  },
  computed: {
    ...mapState(['colorMode', 'accentColor'])
  },
  props: {
    showModifyComplainView: Boolean,
  },
  methods: {
    closeWindow() {
      this.$emit("closeModifyWindow");
    },
    sendComplain() {
      if (this.value == null) {
        this.warning("你需要填写投诉理由");
      } else {
        let data = new FormData();
        data.append("content", this.value);
        if (this.$router.currentRoute.value.name == "player") {
          data.append("music", this.$route.params.musicId);
        } else if (this.$router.currentRoute.value.name == "listdetail") {
          data.append("playlist", this.$route.params.playlistId);
        }
        this.$http.post("/api/message/to/1/", data).then(() => {
          this.closeWindow();
          this.value = null;
        });
      }
    },
    cleanComplain() {
      this.value = null;
    },
  },
  setup() {
    return {
      warning(msg) {
        message.warning({
          content: msg,
          duration: 1,
          style: {
            "z-index": 101,
          },
        });
      },
      success(msg) {
        message.success({
          content: msg,
          duration: 1,
          style: {
            "z-index": 101,
          },
        });
      },
      value: ref(null),
    };
  },
});
</script>

<template>
  <n-modal :show="showModifyComplainView" z-index="2" :style="{'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)'}" :block-scroll="false">
    <div class="outer-container">
      <div class="title-container">
        <div style="margin-bottom: 30px">
          <n-grid>
            <n-gi :span="2"></n-gi>
            <n-gi :span="20">
              <div class="register-card-title" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                投诉
              </div>
            </n-gi>
            <n-gi :span="2">
              <div class="close-icon" style="padding-top: 5px" @click="closeWindow" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                <n-icon size="40"><close-outline/></n-icon>
            </div>
            </n-gi>
          </n-grid>
          
        </div>
      </div>
      <div class="body-container">
        <div class="body-item">
          <n-grid>
            <n-gi :span="1"></n-gi>
            <n-gi :span="22">
              <n-input
              v-model:value="value"
              type="textarea"
              placeholder="你需要填写投诉理由"
              :style="{
                '--n-text-color-disabled': 'black',
                '--n-color': this.colorMode === 'white' ? 'white' : 'rgb(72,72,72)',
                '--n-color-focus': this.colorMode === 'white' ? 'white' : 'rgb(100,100,100)',
                '--n-text-color': this.colorMode === 'white' ? 'black' : 'white',
                '--n-caret-color': this.colorMode === 'white' ? 'black' : 'white',
                '--n-border-hover': 'transparent',
                '--n-border-focus': 'transparent',
                '--n-placeholder-color': this.colorMode === 'white' ? 'grey' : 'rgb(200,200,200)',
                '--n-border-radius': '5px',
                '--n-font-size': '18px',
                '--n-border': '1px solid ' + 'rgba(' + this.accentColor + ', 0.8)',
                '--n-box-shadow-focus': '0 0 0 2px ' + 'rgba(' + this.accentColor + ', 0.6)',
            }"
              :autosize="{
                minRows: 11,
                maxRows: 11,
              }"
            />
            </n-gi>
            <n-gi :span="1"></n-gi>
          </n-grid>
        </div>
        <div class="body-item">
          <n-grid>
            <n-gi :span="17"></n-gi>
            <n-gi :span="3">
              <n-button class="clean-button" @click="cleanComplain" :focusable="false"
              :style="{
                '--n-color': 'rgba(' + this.accentColor + ', 0.25)',
                '--n-color-hover': 'rgba(' + this.accentColor + ', 0.45)',
                '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.45)',
                '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                '--n-border': '1px solid transparent',
                '--n-border-hover': '1px solid transparent',
                '--n-border-pressed': '1px solid transparent',
                '--n-border-radius': '5px',
                '--n-width': '60px',
                '--n-height': '36px',
                '--n-font-size': '16px',
            }"
              >清空</n-button
            >
            </n-gi>
             
            <n-gi :span="3">
              <div style="display: flex; justify-content: right">
              <n-button class="send-button" @click="sendComplain" :focusable="false"
              :style="{
                '--n-color': 'rgba(' + this.accentColor + ', 0.25)',
                '--n-color-hover': 'rgba(' + this.accentColor + ', 0.45)',
                '--n-color-pressed': 'rgba(' + this.accentColor + ', 0.45)',
                '--n-text-color': 'rgba(' + this.accentColor + ', 1)',
                '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                '--n-border': '1px solid transparent',
                '--n-border-hover': '1px solid transparent',
                '--n-border-pressed': '1px solid transparent',
                '--n-border-radius': '5px',
                '--n-width': '60px',
                '--n-height': '36px',
                '--n-font-size': '16px',
            }"
              >发送</n-button
            >
          </div>
            </n-gi>
            <n-gi :span="1"></n-gi>
          </n-grid>
        </div>
      </div>
    </div>
    <!-- <div>
      <n-card class="complain-hodder" style="--n-border-radius: 20px">
        <n-grid>
          <n-gi :span="23">
            <span class="modify-title"
              ><div class="complain-title">告诉我们你的投诉理由</div></span
            >
          </n-gi>
          <n-gi :span="1">
            <div class="close-complain-modify">
              <n-icon size="32px" @click="closeWindow">
                <close-outline />
              </n-icon>
            </div>
          </n-gi>
        </n-grid>
        <div>
          <n-input
            class="complain-input"
            v-model:value="value"
            type="textarea"
            placeholder="告诉我们你的投诉理由"
            :autosize="{
              minRows: 11,
              maxRows: 11,
            }"
          />
        </div>
        <n-grid>
          <n-gi :span="18"></n-gi>
          <n-gi :span="3" class="clean-button-div">
            <n-button class="clean-button" @click="cleanComplain" :focusable="false"
              >清空</n-button
            >
          </n-gi>
          <n-gi :span="3" class="send-button-div">
            <n-button class="send-button" @click="sendComplain" :focusable="false"
              >发送</n-button
            >
          </n-gi>
        </n-grid>
      </n-card>
    </div> -->
  </n-modal>
</template>

<style scoped>
.complain-hodder {
  width: 540px;
  height: 400px;
}
.close-complain-modify {
  margin-right: 0px;
  margin-top: 0px;
}
.complain-title {
  display: flex;
  font-weight: bold;
}
.modify-title {
  font-size: 25px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
}
.complain-input {
  margin-top: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
}
.clean-button-div {
  display: flex;
  justify-content: right;
}
.send-button-div {
  display: flex;
  justify-content: right;
}

.close-icon:hover {
  cursor: pointer;
}
.outer-container {
  max-width: 640px; 
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 25px;
  padding-right: 25px;
}
.title-container {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 600px;
}
.body-item {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.body-item-prompt {
  padding-top: 3px;
  text-align: right;
  font-size: 16px;
  font-weight: 400;
}
.register-card-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}

</style>
