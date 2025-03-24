import { ref, type Ref } from 'vue';
import { SignalRService } from '~/services/signalRService';
import type { Message } from '~/types/messageType';
import { mapToMessage } from '~/utils/mapper/messageMapper';

export class UseSignalR {
  private readonly signalRService: SignalRService;
  public readonly connectionStatus: Ref<string>;
  public readonly isConnected: Ref<boolean>;
  public readonly messages: Ref<Message[]>;

  constructor(apiBaseUrl: string) {
    this.signalRService = new SignalRService(apiBaseUrl);
    this.connectionStatus = ref(localStorage.getItem('signalRStatus') || 'Disconnected');
    this.isConnected = ref(localStorage.getItem('signalRConnected') === 'true');

    const storedMessages = localStorage.getItem('signalRMessages');
    this.messages = ref<Message[]>(storedMessages ? JSON.parse(storedMessages) : []);

    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

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
      localStorage.setItem('signalRStatus', 'Connecting...');
      const connectionId = await this.signalRService.startConnection(userId);
      console.log('Connection started with ID:', connectionId);

      this.signalRService.onReceiveMessage((receivedMessage) => {
        console.log('Received message in UseSignalR:', receivedMessage);
        this.pushMessage(receivedMessage);
      });

      this.signalRService.onClose(async () => {
        await this.signalRService.unregisterConnection(userId);
        this.isConnected.value = false;
        this.connectionStatus.value = 'Disconnected';
        localStorage.setItem('signalRConnected', 'false');
        localStorage.setItem('signalRStatus', 'Disconnected');
      });
      await this.signalRService.registerConnection(userId, connectionId);
      this.isConnected.value = true;
      this.connectionStatus.value = 'Connected';
      localStorage.setItem('signalRConnected', 'true');
      localStorage.setItem('signalRStatus', 'Connected');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.connectionStatus.value = `Error: ${errorMessage}`;
      this.isConnected.value = false;
      localStorage.setItem('signalRStatus', `Error: ${errorMessage}`);
      localStorage.setItem('signalRConnected', 'false');
      throw error;
    }
  }

  async disconnect(userId: string): Promise<void> {
    try {
      await this.signalRService.unregisterConnection(userId);
      this.isConnected.value = false;
      this.connectionStatus.value = 'Disconnected';
      this.messages.value = [];
      localStorage.setItem('signalRConnected', 'false');
      localStorage.setItem('signalRStatus', 'Disconnected');
      localStorage.setItem('signalRMessages', JSON.stringify(this.messages.value));
      localStorage.removeItem('signalRStatus');
      localStorage.removeItem('signalRConnected');
      localStorage.removeItem('signalRMessages');      
    } catch (error) {
      console.error('Failed to disconnect:', error);
      throw error;
    }
  }

  async sendMessage(message: Message): Promise<void> {
    try {
      await this.signalRService.sendMessage(message);
      this.pushMessage(message);
    } catch (error) {
      throw error;
    }
  }

  async getChatHistory(senderId: string, receiverId: string, maxResults?: number): Promise<void> {
    const rawHistory = await this.signalRService.getChatHistory(senderId, receiverId, maxResults);
    const history: Message[] = rawHistory.map(mapToMessage);
    this.pushMessage(...history);
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'signalRStatus') {
      this.connectionStatus.value = event.newValue || 'Disconnected';
    }
    if (event.key === 'signalRConnected') {
      this.isConnected.value = event.newValue === 'true';
    }
    if (event.key === 'signalRMessages') {
      this.messages.value = event.newValue ? JSON.parse(event.newValue) : [];
    }
  }

  async signOut(userId: string): Promise<void> {
    try {
      await this.disconnect(userId);
      localStorage.removeItem('signalRStatus');
      localStorage.removeItem('signalRConnected');
      localStorage.removeItem('signalRMessages');
    } catch (error) {
      console.error('Failed to sign out SignalR:', error);
      throw error;
    }
  }

  private pushMessage(...newMessages: Message[]): void {
    const uniqueMessages = newMessages
      .filter((msg) => !msg.rowKey || !this.messages.value.some((existing) => existing.rowKey === msg.rowKey));
  
    this.messages.value.push(...uniqueMessages);
    localStorage.setItem('signalRMessages', JSON.stringify(this.messages.value));
  }
}