<script>
import { NGrid } from "naive-ui";
import { defineComponent } from "vue";
import { MailOutline, TrashOutline, MailOpenOutline } from "@vicons/ionicons5";
export default defineComponent({
  name: "UserMessageItem",
  components: {
    MailOutline,
    TrashOutline,
    MailOpenOutline,
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
      this.$http.delete(`/api/message/delete/${message.id}/`);
      this.unread--;
      this.$EventBus.emit("setShowMessage", this.unread);
    },
    readMessage(message) {
      this.$http.post(`/api/message/read/${message.id}/`);
      this.unread--;
      message.read = !message.read;
      this.$EventBus.emit("setShowMessage", this.unread);
    },
  },
});
</script>
<template>
  <div class="message-card-outer">
    <n-scrollbar style="max-height: 400px" trigger="none" :size="10">
      <div class="message-card" v-for="(message, i) in messages" :key="i">
        <div>
          <n-grid>
            <n-gi :span="4" class="message-card-date">
              <div class="message-date">
                {{ message.date.replace("T", " ").split(".")[0] }}
              </div>
            </n-gi>
            <n-gi :span="18">
              <n-grid :y-gap="8" :cols="1">
                <n-gi>来自iSound的消息</n-gi>
                <n-gi>{{ message.content }}</n-gi>
              </n-grid>
            </n-gi>
            <n-gi :span="1" class="isread-button">
              <n-popover trigger="hover">
                <template #trigger>
                  <n-button text circle focusable="false" :disabled="message.read">
                    <n-icon v-if="message.read" size="20"><MailOpenOutline /></n-icon>
                    <n-icon v-else size="20" @click="readMessage(message)"
                      ><MailOutline
                    /></n-icon>
                  </n-button>
                </template>
                <span>标记为已读</span>
              </n-popover>
            </n-gi>
            <n-gi :span="1" class="remove-button">
              <n-popover trigger="hover">
                <template #trigger>
                  <n-button text circle focusable="false">
                    <n-icon size="20" @click="removeMessage(message)"
                      ><TrashOutline
                    /></n-icon>
                  </n-button>
                </template>
                <span>删除该消息</span>
              </n-popover>
            </n-gi>
          </n-grid>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>
<style scoped>
.message-card-outer {
  width: 760px;
  height: 500px;
}
.message-card {
  background-color: rgb(240, 240, 240);
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
  margin: auto;
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
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
