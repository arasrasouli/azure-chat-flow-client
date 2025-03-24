export interface Message {
  rowKey?: string,
  senderId: string;
  receiverId: string;
  message: string;
  sendAt: Date;
  readStatus?: number;
}

// TODO: Consider defining a separate ChatUserProps interface
