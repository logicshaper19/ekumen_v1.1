export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'link';
  url: string;
  name: string;
  size?: string;
  previewUrl?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  read: boolean;
}

export interface ChatUser {
  id: string;
  name?: string;
  avatar?: string;
  role: string;
  organization?: string;
  lastSeen?: string;
  online?: boolean;
}

export interface ChatThread {
  id: string;
  participants?: ChatUser[];
  lastMessage?: Message;
  unreadCount?: number;
}
