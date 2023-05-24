<script>
    import { CloseOutline } from '@vicons/ionicons5'
    import { defineComponent } from "vue";
    import { NModal } from "naive-ui";
    export default defineComponent({
        name: 'ModifyComplainView',
        components: {
            NModal,
            CloseOutline,
        },
        props: {
            showModifyComplainView: Boolean,
        },
        methods: {
            closeWindow() {
                this.$emit('closeModifyWindow')
            },
            sendComplain() {
                //todo
            },
            cleanComplain() {
                this.value=""
            },
        },
        setup() {
            return {
            value: ref(null)
            };
        }
    })
</script>

<template>
    <n-modal :show="showModifyComplainView">
        <div>
            <n-card class="complain-hodder" style="--n-border-radius: 20px;">
                <n-grid>
                    <n-gi :span="23">
                        <span class="modify-title"><div class="complain-title">告诉我们你的投诉理由</div></span>
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
                        maxRows: 11
                    }"
                    />
                </div>
                <n-grid>
                    <n-gi :span="18"></n-gi>
                    <n-gi :span="3" class="clean-button-div">
                        <n-button class="clean-button" @click="cleanComplain">清空</n-button>
                    </n-gi>
                    <n-gi :span="3" class="send-button-div">
                        <n-button class="send-button" @click="sendComplain">发送</n-button>
                    </n-gi>
                </n-grid>                 
            </n-card>
        </div>
    </n-modal>
</template>
<style scoped>
.complain-hodder {
    width: 640px;
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
</style>