<script>
    import { CloseOutline } from '@vicons/ionicons5'
    import { defineComponent } from "vue";
    import { NModal } from "naive-ui";
    import { mapState } from 'vuex';
    import UserMessageItem from "../components/message/UserMessageItem.vue";
    export default defineComponent({
        name: 'ModifyUserMessage',
        data() {

        },
        computed: {
            ...mapState(['colorMode', 'accentColor']),
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
    <n-modal :show="showModifyUserMessage" :style="{ 'background-color': this.colorMode === 'white' ? 'white' : 'rgb(50,50,50)' }" :block-scroll="false">
        <div class="outer-container">
            <div class="title-container">
                <div style=" margin-bottom: 30px">
                    <n-grid>
                        <n-gi :span="2"></n-gi>
                        <n-gi :span="20">
                            <div class="upload-card-title" :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                                消息列表
                            </div>
                        </n-gi>
                        <n-gi :span="2">
                            <div class="close-icon" style="padding-top: 5px" @click="closeWindow"
                                :style="{ 'color': this.colorMode === 'white' ? 'black' : 'white' }">
                                <n-icon size="40"><close-outline /></n-icon>
                            </div>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <UserMessageItem/>
        </div>
        <!-- <div>
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
        </div> -->
    </n-modal>
   
</template>

<style scoped>
.user-message-hodder {
    width: 800px;
    height: 550px;
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
.close-icon:hover {
    cursor: pointer;
}

.outer-container {
    height: 550px;
    width: 800px;
    border-radius: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 25px;
}
.title-container {
    margin-top: 10px;
    margin-bottom: 10px;
}
.upload-card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}
</style>