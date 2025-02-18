import { MsAzureServiceBus } from "~/services/msAzureServiceBus";
import { useRuntimeConfig } from "#app";
import { ref, onMounted, onBeforeUnmount } from "vue";

export function useServiceBus() {
    const config = useRuntimeConfig();
    const connectionString = config.public.AZURE_SERVICE_BUS_CONNECTION_STRING as string;
    const queueName = config.public.AZURE_SERVICE_BUS_QUEUE_NAME as string;

    const serviceBus = new MsAzureServiceBus(connectionString, queueName);
    const messageReceived = ref<string | null>(null);

    let listening = false;

    const listenToQueue = async () => {
        listening = true;
        while (listening) {
            const message = await serviceBus.receiveMessage();
            if (message) {
                messageReceived.value = message;
                console.log("New message received:", message);
            }
        }
    };

    const stopListening = () => {
        listening = false;
        serviceBus.close();
    };

    onMounted(() => {
        listenToQueue();
    });

    onBeforeUnmount(() => {
        stopListening();
    });

    return {
        messageReceived,
        stopListening,
    };
}
