<script>
    import { defineComponent } from 'vue';
    import  MessageItem  from '../components/message/MessageItem.vue';
    export default defineComponent({
        name : 'ReceiveMessage',
        components: {
            MessageItem,
        }
    });
</script>

<template>
    <div class="reply-message">
    <message-item></message-item>
    </div>
</template>

