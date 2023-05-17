<script>
    import { defineComponent } from 'vue';
    import  MessageItemReply  from '../components/message/MessageItemReply.vue';
    export default defineComponent({
        name : 'ReplyMessage',
        components: {
            MessageItemReply,
        }
    });
</script>

<template>
    <div class="reply-message">
    <message-item-reply></message-item-reply>
    </div>
</template>

