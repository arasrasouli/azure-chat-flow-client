<template>
  <div class="chat-container">
    <header class="chat-header">
      <span class="sender-user">{{ props.senderName }}</span>
      <span class="receiver-user">{{ props.receiverName }}</span>
    </header>

    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="(message, index) in filteredMessages" 
        :key="index"
        :class="['message', message.senderId === props.senderId ? 'sent' : 'received']"
      >
        <div class="message-content">
          <span class="message-text">{{ message.message }}</span>
          <span class="message-time">{{ formatTime(message.sendAt) }}</span>
        </div>
      </div>
    </div>

    <footer class="input-area">
      <input 
        v-model="newMessage"
        type="text" 
        placeholder="Type a message..."
        @keyup.enter="sendMessage"
        :disabled="!signalR.isConnectedValue"
      />
      <button 
        @click="sendMessage" 
        :disabled="!signalR.isConnectedValue || !newMessage.trim()"
      >
        Send
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, inject, onMounted } from 'vue';
import { formatTime } from '~/utils/helpers/dateHelper';
import type { Message } from '~/types/messageType';
import type { UseSignalR } from '~/composables/useSignalR';
import '~/assets/components/chat.css';

const props = defineProps<{
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
}>();

const signalR = inject<UseSignalR>('signalR')!;
const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

console.log('Chat component props:', props);

const filteredMessages = computed(() => {
  const chatPair = [props.senderId, props.receiverId].sort().join(',');
  return signalR.messagesValue.filter((message) => {
    const messagePair = [message.senderId, message.receiverId].sort().join(',');
    return chatPair === messagePair;
  });
});

const sendMessage = async () => {
  if (!newMessage.value.trim() || !signalR.isConnectedValue) return;

  try {
    const message: Message = {
      senderId: props.senderId,
      receiverId: props.receiverId,
      message: newMessage.value.trim(),
      sendAt: new Date(Date.now()),
    };
    await signalR.sendMessage(message);
    newMessage.value = '';
    scrollToBottom();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Failed to send message:', errorMessage);
    alert(errorMessage);
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(filteredMessages, () => {
  scrollToBottom();
}, { deep: true });
</script>