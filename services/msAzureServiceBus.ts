import { ServiceBusClient, type ProcessErrorArgs, type ServiceBusReceivedMessage, type ServiceBusReceiver } from "@azure/service-bus";
import { Buffer } from 'buffer';

export class MsAzureServiceBus {
    private sbClient: ServiceBusClient;
    private queueName: string;
    private receivedMessage: string = "";

    constructor(connectionString: string, queueName: string) {
        if (!connectionString) {
            throw new Error("Connection string is undefined or empty");
        }

        this.sbClient = new ServiceBusClient(connectionString.trim());
        this.queueName = queueName;
    }

    private static formatMessageBody(messageReceived: ServiceBusReceivedMessage): string {
        if (messageReceived.body instanceof Buffer) {
            return messageReceived.body.toString("utf-8");
        } else if (typeof messageReceived.body === "string") {
            return messageReceived.body;
        }
        return JSON.stringify(messageReceived.body);
    }

    private async myMessageHandler(messageReceived: ServiceBusReceivedMessage, receiver: ServiceBusReceiver): Promise<void> {
        const body = MsAzureServiceBus.formatMessageBody(messageReceived);
        console.log(`Received message: ${body}`);
        this.receivedMessage = body;

        try {
            await receiver.completeMessage(messageReceived);
            console.log("Message completed and removed from the queue.");
        } catch (error) {
            console.error("Failed to complete the message: ", error);
        }

        await receiver.close();
        console.log("Receiver closed after processing the message.");
    }

    private async myErrorHandler(error: ProcessErrorArgs): Promise<void> {
        console.error("Error occurred: ", error.error);
    }

    public async receiveMessage(): Promise<string> {
        const receiver = await this.createReceiver();
        if (!receiver) return "";
        try {
            console.log("Start Listening to queue ...");

            const messageProcessed = new Promise<void>((resolve, reject) => {
                const subscription = receiver.subscribe({
                    processMessage: async (messageReceived) => {
                        try {
                            await this.myMessageHandler(messageReceived, receiver);
                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    },
                    processError: this.myErrorHandler,
                });
            });

            await messageProcessed;
        } catch (error) {
            console.error("Error in receiveMessage: ", error instanceof Error ? error.message : error);
            return "";
        }

        return this.receivedMessage;
    }

    private async createReceiver() {
        try {
            const receiver = this.sbClient?.createReceiver(this.queueName);
            if (!receiver) {
                throw new Error("Receiver could not be created. Check the connection and queue name.");
            }
            return receiver;
        } catch (error) {
            console.error("Error creating receiver: ", error);
            return null;
        }
    }

    public async close(): Promise<void> {
        await this.sbClient?.close();
    }
}