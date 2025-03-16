export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  sendAt: Date;
}

// TODO: Consider defining a separate ChatUserProps interface
