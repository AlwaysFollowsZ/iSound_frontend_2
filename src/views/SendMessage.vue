<script>
    import { defineComponent } from 'vue';
    import  MessageSend  from '../components/message/MessageSend.vue';
    export default defineComponent({
        name : 'ReceiveMessage',
        components: {
            MessageSend,
        }
    });
</script>

<template>
    <div class="send-message">
    <message-send :style="{'width':'90%','margin-left':'5%'}" ></message-send>
    </div>
</template>

