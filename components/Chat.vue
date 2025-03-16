<template>
  <div class="chat-container">
    <header class="chat-header">
      <span class="sender-user">{{ senderName }}</span>
      <span class="receiver-user">{{ receiverName }}</span>
    </header>

    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="(message, index) in signalR.messagesValue" 
        :key="index"
        :class="['message', message.senderId === senderId ? 'sent' : 'received']"
      >
        <div class="message-content">
          <span class="message-text">{{ message.message }}</span>
          <span class="message-time">{{ formatTime(message.date) }}</span>
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
import { ref, onMounted, nextTick } from 'vue';
import { formatTime } from '~/utils/helpers/dateHelper';
import { UseSignalR } from '~/composables/useSignalR';
import '~/assets/components/chat.css';

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

const sendMessage = async () => {
  if (!newMessage.value.trim() || !signalR.isConnectedValue) return;

  try {
    await signalR.sendMessage(props.senderId, props.receiverId, newMessage.value.trim());
    newMessage.value = '';
    
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Failed to send message:', errorMessage);
    alert(errorMessage);
  }
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
</script>
