import * as signalR from '@microsoft/signalr';
import type { Message } from '~/types/messageType';
import type { NegotiateResponse } from '~/types/signalRTypes';

export class SignalRService {
    private connection: signalR.HubConnection | null = null;
    private readonly apiBaseUrl: string;

    constructor(apiBaseUrl: string) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async startConnection(userId: string): Promise<string> {
        const response = await fetch(`${this.apiBaseUrl}/negotiate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UserId: userId })
        });
        if (!response.ok) throw new Error(`Negotiate failed: ${response.status}`);

        const { url, accessToken } = await response.json() as NegotiateResponse;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(url, { accessTokenFactory: () => accessToken })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        await this.connection.start();
        return this.connection.connectionId!;
    }

    onReceiveMessage(callback: (message: Message) => void) {
        this.connection?.on('ReceiveMessage', (senderId: string, receiverId: string, message: string, sendAt: string) => {
            try {
                const receivedMessage: Message = {
                    senderId: senderId,
                    receiverId: receiverId,
                    message: message,
                    sendAt: new Date(sendAt)
                };
                callback(receivedMessage);
            } catch (error) {
                console.error(`Error processing received message from ${senderId} to ${receiverId}:`, error);
            }
        });
    }

    onClose(callback: () => Promise<void>) {
        this.connection?.onclose(async (error) => {
            console.log('Connection closed:', error);
            await callback();
        });
    }

    async registerConnection(userId: string, connectionId: string) {
        const response = await fetch(`${this.apiBaseUrl}/RegisterConnection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UserId: userId, ConnectionId: connectionId })
        });
        if (!response.ok) throw new Error('RegisterConnection failed');
    }

    async unregisterConnection(userId: string) {
        const response = await fetch(`${this.apiBaseUrl}/UnregisterConnection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UserId: userId })
        });
        if (!response.ok) throw new Error('UnregisterConnection failed');
    }

    async sendMessage(message: Message) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/SendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    SenderId: message.senderId,
                    ReceiverId: message.receiverId,
                    Message: message.message,
                    SendAt: message.sendAt.toISOString()
                })
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            console.log(`Message sent successfully from ${message.senderId} to ${message.receiverId}: ${message.message}`);
        } catch (error) {
            console.error(`Error sending message from ${message.senderId} to ${message.receiverId}:`, error);
            throw error;
        }
    }

    async getOnlineUsers(): Promise<string[]> {
        const response = await fetch(`${this.apiBaseUrl}/GetOnlineUsers`);
        if (!response.ok) throw new Error('GetOnlineUsers failed');
        return response.json();
    }
}