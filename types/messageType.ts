export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  date: Date;
}

export interface User {
  id: string;
  displayName: string;
  userPrincipalName?: string;
}