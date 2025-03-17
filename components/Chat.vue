<template>
  <div class="chat-container">
    <header class="chat-header">
      <span class="sender-user">{{ senderName }}</span>
      <span class="receiver-user">{{ receiverName }}</span>
    </header>

    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="(message, index) in filteredMessages" 
        :key="index"
        :class="['message', message.senderId === senderId ? 'sent' : 'received']"
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
import { ref, onMounted, nextTick, computed } from 'vue';
import { formatTime } from '~/utils/helpers/dateHelper';
import { UseSignalR } from '~/composables/useSignalR';
import '~/assets/components/chat.css';
import type { Message } from '~/types/messageType';

const props = defineProps<{
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
}>();

const signalR = new UseSignalR();
const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

console.log('Chat component - IDs:', {
  senderId: props.senderId,
  receiverId: props.receiverId
});

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
    console.log(message);
    await signalR.sendMessage(message);
    newMessage.value = '';
    
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

onMounted(async () => {
  try {
    if (!signalR.isConnectedValue) {
      await signalR.startConnection(props.senderId);
    }
  } catch (error) {
    console.error('Failed to start SignalR connection:', error);
  }
});

watch(filteredMessages, () => {
  scrollToBottom();
}, { deep: true });
</script>