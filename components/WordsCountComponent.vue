<template>
    <div class="container">
      <div v-if="message" class="message-box">
        <div class="file-name-box">
          <h2>{{ message.Name }}</h2>
        </div>
        <div class="words-count">
          <div v-for="(count, word) in message.WordsCount" :key="word" class="word-count-item">
            <strong>{{ word }}:</strong> {{ count }}
          </div>
        </div>
      </div>
      <div v-else>
        <p>No message received yet.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from "vue";
  import { useServiceBus } from "~/composables/useMSServiceBus";
  import type { WordCountsMessage } from "~/types/serviceBus"; // Import the type

  const message = ref<WordCountsMessage>({ Name: "", WordsCount: {} });

  const { messageReceived } = useServiceBus();

  watch(messageReceived, (newMessage) => {
    if (newMessage) {
      try {
        const deserializedMessage: WordCountsMessage = JSON.parse(newMessage);

        if (deserializedMessage?.Name && deserializedMessage?.WordsCount) {
          message.value = deserializedMessage;
        }
      } catch (error) {
        console.error("Error deserializing message:", error);
      }
    }
  });
    
  </script>
  
  
  <style scoped>
  .container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .message-box {
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .file-name-box {
    background-color: #1d4ed8;
    color: white;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
  }
  
  .file-name-box h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .words-count {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    font-size: 1rem;
  }
  
  .word-count-item {
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .word-count-item strong {
    color: #4b5563;
  }
  
  .word-count-item {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .word-count-item:hover {
    background-color: #f1f5f9;
    cursor: pointer;
  }
  
  p {
    font-size: 1rem;
    color: #6b7280;
    text-align: center;
  }
  </style>
