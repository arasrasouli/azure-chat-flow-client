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
  import type { WordCountsMessage } from "~/types/serviceBus";
  import "~/assets/components/wordsCount.css";
 
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