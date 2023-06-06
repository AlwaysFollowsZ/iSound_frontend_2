<script>
import { NGrid } from "naive-ui";
import { defineComponent } from "vue";
import { MailOutline, TrashOutline, MailOpenOutline } from "@vicons/ionicons5";
import { mapState } from 'vuex'
export default defineComponent({
  name: "UserMessageItem",
  components: {
    MailOutline,
    TrashOutline,
    MailOpenOutline,
  },
  computed: {
    ...mapState(['colorMode', 'accentColor']),
  },
  data() {
    return {
      id: 0,
      unread: 0,
      messages: [],
    };
  },
  created() {
    this.$http.get("/api/message/of/0/").then((response) => {
      this.messages = response.data.message_set;
      this.unread = response.data.unread;
    });
  },
  methods: {
    removeMessage(message) {
      this.messages = this.messages.filter((t) => t !== message);
      this.$http.delete(`/api/message/delete/${message.id}/`).then(() => {
        if (message.read == false) {
          this.unread--;
          this.$EventBus.emit("setShowMessage", this.unread);
        }
      });
    },
    readMessage(message) {
      this.$http.post(`/api/message/read/${message.id}/`).then(() => {
        this.unread--;
        message.read = !message.read;
        this.$EventBus.emit("setShowMessage", this.unread);
      });
    },
  },
});
</script>
<template>
  <div class="message-card-outer">
    <n-scrollbar style="max-height: 400px" trigger="none" :size="10">
      <div class="message-card" v-for="(message, i) in messages" :key="i" :style="{'background-color': this.colorMode === 'white' ? 'rgb(240,240,240' : '-moz-initial(72,72,72'}">
        <div>
          <n-grid>
            <n-gi :span="4" class="message-card-date">
              <div class="message-date" :style="{'color': 'rgb(' + this.accentColor + ')', 'font-weight': 'bold'}">
                {{ message.date.replace("T", " ").split(".")[0] }}
              </div>
            </n-gi>
            <n-gi :span="20">
              <n-grid :y-gap="8" :cols="1">
                <n-gi>
                  <div style="font-size: 20px; font-weight: 500" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                    来自 iSound 的消息
                  </div>
                </n-gi>
                <n-gi>
                  <div style="font-size: 16px; font-weight: 400" :style="{'color': this.colorMode === 'white' ? 'black' : 'white'}">
                    {{ message.content }}
                  </div>
                </n-gi>
              </n-grid>
            </n-gi>
            <!-- <n-gi :span="1" class="isread-button">
                  <n-button text circle :focusable="false" :disabled="message.read"
                  :style="{
                    '--n-color': 'transparent',
                    '--n-color-hover': 'transparent',
                    '--n-color-pressed': 'transparent',
                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.7)',
                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                    '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.7)',
                    '--n-border': '1px solid transparent',
                    '--n-border-hover': '1px solid transparent',
                    '--n-border-pressed': '1px solid transparent',
                    '--n-border-radius': '5px',
                    '--n-font-size': '18px',
                }"
            >
                    <n-icon v-if="message.read" size="20"><MailOpenOutline /></n-icon>
                    <n-icon v-else size="20" @click="readMessage(message)"
                      ><MailOutline
                    /></n-icon>
                  </n-button>
            </n-gi>
            <n-gi :span="1" class="remove-button">
                  <n-button text circle :focusable="false"
                  :style="{
                    '--n-color': 'transparent',
                    '--n-color-hover': 'transparent',
                    '--n-color-pressed': 'transparent',
                    '--n-text-color': 'rgba(' + this.accentColor + ', 0.7)',
                    '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                    '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                    '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.7)',
                    '--n-border': '1px solid transparent',
                    '--n-border-hover': '1px solid transparent',
                    '--n-border-pressed': '1px solid transparent',
                    '--n-border-radius': '5px',
                    '--n-font-size': '18px',
                }">
                    <n-icon size="20" @click="removeMessage(message)" 
                      ><TrashOutline
                    /></n-icon>
                  </n-button>
            </n-gi> -->
          </n-grid>
        </div>
        <div style="width: 100%; display: flex; justify-content: right; margin-top: 10px; padding-right: 5px">
          <n-grid>
            <n-gi :span="21"></n-gi>
            <n-gi :span="1">
              <n-button text circle :focusable="false" :disabled="message.read"
              :style="{
                '--n-color': 'transparent',
                '--n-color-hover': 'transparent',
                '--n-color-pressed': 'transparent',
                '--n-text-color': 'rgba(' + this.accentColor + ', 0.6)',
                '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.4)',
                '--n-border': '1px solid transparent',
                '--n-border-hover': '1px solid transparent',
                '--n-border-pressed': '1px solid transparent',
                '--n-border-radius': '5px',
                '--n-font-size': '18px',
            }"
        >
                <n-icon v-if="message.read" size="30"><MailOpenOutline /></n-icon>
                <n-icon v-else size="30" @click="readMessage(message)"
                  ><MailOutline
                /></n-icon>
              </n-button>
            </n-gi>
            <n-gi :span="1"></n-gi>
            <n-gi :span="1">
              <n-button text circle :focusable="false"
              :style="{
                '--n-color': 'transparent',
                '--n-color-hover': 'transparent',
                '--n-color-pressed': 'transparent',
                '--n-text-color': 'rgba(' + this.accentColor + ', 0.6)',
                '--n-text-color-hover': 'rgba(' + this.accentColor + ', 1)',
                '--n-text-color-pressed': 'rgba(' + this.accentColor + ', 1)',
                '--n-text-color-disabled': 'rgba(' + this.accentColor + ', 0.4)',
                '--n-border': '1px solid transparent',
                '--n-border-hover': '1px solid transparent',
                '--n-border-pressed': '1px solid transparent',
                '--n-border-radius': '5px',
                '--n-font-size': '18px',
            }">
                <n-icon size="30" @click="removeMessage(message)" 
                  ><TrashOutline
                /></n-icon>
              </n-button>
            </n-gi>
          </n-grid>
          
                    
        </div>
      </div>
      
    </n-scrollbar>
  </div>
</template>
<style scoped>
.message-card-outer {
  /*width: 760px;
  height: 500px;*/
}
.message-card {
  border-radius: 20px;
  margin-left: 15px;
  margin-right: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 15px;
}
.message-date {
  /*margin: auto;*/
}
.isread-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.remove-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.message-card-date {
  display: flex;
  text-align: center;
  padding-top: 2px;
  padding-right: 5px;
}
</style>
