import { ref, type Ref } from 'vue';
import { SignalRService } from '~/services/signalRService';
import type { Message } from '~/types/messageType';

export class UseSignalR {
    private readonly signalRService: SignalRService;
    public readonly connectionStatus: Ref<string>;
    public readonly isConnected: Ref<boolean>;
    public readonly messages: Ref<Message[]>;

    constructor() {
        const config = useRuntimeConfig();
        this.signalRService = new SignalRService(config.public.API_BASE_URL);
        this.connectionStatus = ref('Disconnected');
        this.isConnected = ref(false);
        this.messages = ref<Message[]>([]);
    }

    // Expose unwrapped getters for TypeScript
    get isConnectedValue(): boolean {
        return this.isConnected.value;
    }

    get connectionStatusValue(): string {
        return this.connectionStatus.value;
    }

    get messagesValue(): Message[] {
        return this.messages.value;
    }

    async startConnection(userId: string): Promise<void> {
        if (!userId) throw new Error('No userId available');
        try {
            this.connectionStatus.value = 'Connecting...';
            const connectionId = await this.signalRService.startConnection(userId);
            this.signalRService.onReceiveMessage((senderId, receiverId, message) => {
                this.messages.value.push({ senderId: senderId, receiverId: receiverId, message, date: new Date() });
            });
            this.signalRService.onClose(async () => {
                await this.signalRService.unregisterConnection(userId);
                this.isConnected.value = false;
                this.connectionStatus.value = 'Disconnected';
            });
            await this.signalRService.registerConnection(userId, connectionId);
            this.isConnected.value = true;
            this.connectionStatus.value = 'Connected';
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.connectionStatus.value = `Error: ${errorMessage}`;
            this.isConnected.value = false;
            throw error;
        }
    }

    async disconnect(userId: string): Promise<void> {
        try {
            await this.signalRService.unregisterConnection(userId);
            this.isConnected.value = false;
            this.connectionStatus.value = 'Disconnected';
        } catch (error) {
            console.error('Failed to disconnect:', error);
            throw error;
        }
    }    

    async sendMessage(senderId: string, receiverId: string, message: string): Promise<void> {
        try {
            await this.signalRService.sendMessage(senderId, receiverId, message);
            this.messages.value.push({ senderId: senderId, receiverId: receiverId, message, date: new Date() });
        } catch (error) {
            throw error;
        }
    }
}