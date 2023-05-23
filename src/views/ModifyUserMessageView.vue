<script>
    import { CloseOutline } from '@vicons/ionicons5'
    import { defineComponent } from "vue";
    import { NModal } from "naive-ui";
    import UserMessageItem from "../components/message/UserMessageItem.vue";
    export default defineComponent({
        name: 'ModifyUserMessage',
        data() {

        },
        components: {
            NModal,
            CloseOutline,
            UserMessageItem,
        },
        props: {
            showModifyUserMessage: Boolean,
        },
        methods: {
            closeWindow() {
                this.$emit('closeModifyWindow')
            },
        }
    })
</script>

<template>
    <n-modal :show="showModifyUserMessage">
        <div>
            <n-card class="user-message-hodder" style="--n-border-radius: 20px;">
                <n-grid>
                    <n-gi :span="1"></n-gi>
                    <n-gi :span="22">
                        <span class="modify-title"><h3 class="message-card-title">我的消息</h3></span>
                    </n-gi>
                    <n-gi :span="1">
                        <div class="close-message-modify">                        
                        <n-icon size="40px" @click="closeWindow">
                            <close-outline />
                        </n-icon>
                        </div>
                    </n-gi>
                </n-grid>
                <UserMessageItem/>
            </n-card>
        </div>
    </n-modal>
   
</template>

<style scoped>
.user-message-hodder {
    width: 800px;
    height: 500px;
}
.close-message-modify {
    margin-right: 0px;
    margin-top: 0px;
}
.message-card-title {
    display: flex;
    font-weight: bold;
}
.modify-title {
    font-size: larger;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
}
</style>