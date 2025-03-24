import type { Message } from "~/types/messageType";

export function mapToMessage(rawMessage: any): Message {
    if (!rawMessage.SenderId || !rawMessage.ReceiverId) {
      throw new Error('Invalid message data');
    }
    return {
      senderId: rawMessage.SenderId,
      receiverId: rawMessage.ReceiverId,
      message: rawMessage.Message,
      sendAt: new Date(rawMessage.SendAt),
      readStatus: rawMessage.ReadStatus,
      rowKey: rawMessage.RowKey,
    };
  }