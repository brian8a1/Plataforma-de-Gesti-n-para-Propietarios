export type UserRole = 'guest' | 'pending' | 'verified' | 'moderator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  apartment?: string;
  tower?: string;
  avatar?: string;
  alias?: string;
  phone?: string;
}

export interface Provider {
  id: string;
  name: string;
  category: ProviderCategory;
  rating: number;
  reviewCount: number;
  phone: string;
  services: string[];
  badges: ProviderBadge[];
  description?: string;
  priceRange?: string;
  schedule?: string;
  reviews?: Review[];
}

export type ProviderCategory =
'Aseo y limpieza' |
'Plomería' |
'Electricidad' |
'Aires acondicionados' |
'Internet y TV' |
'Carpintería' |
'Cerrajería' |
'Lavandería' |
'Fumigación' |
'Transporte' |
'Mantenimiento general';

export type ProviderBadge = 'verified' | 'featured' | 'new' | 'warning';

export interface Review {
  id: string;
  providerId: string;
  authorAlias: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
  priceRange?: string;
  wouldHireAgain: boolean;
}

export interface ChatMessage {
  id: string;
  alias: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  photoUrl?: string;
  reactions?: number;
  room?: string;
}

export interface TimelineEvent {
  id: string;
  type:
  'incident' |
  'assembly' |
  'rule' |
  'financial' |
  'maintenance' |
  'community';
  title: string;
  description: string;
  date: string;
  status: 'active' | 'resolved' | 'scheduled' | 'completed';
  attachments?: string[];
  forumTopicId?: string;
}

export interface Resident {
  id: string;
  tower: string;
  apartment: string;
  hasRegisteredUser: boolean;
}

// Forum Types
export type ForumCategory =
'Administración y PH' |
'Proveedores y servicios' |
'Convivencia' |
'Compra, venta, arriendo' |
'Seguridad y emergencias';

export interface ForumTopic {
  id: string;
  title: string;
  category: ForumCategory;
  authorName: string;
  authorAlias: string;
  isAnonymous: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
  viewCount: number;
  isResolved: boolean;
  solutionId?: string;
  tags?: string[];
  isPinned?: boolean;
}

export interface ForumReply {
  id: string;
  topicId: string;
  authorName: string;
  authorAlias: string;
  content: string;
  createdAt: string;
  isSolution: boolean;
  likes: number;
}

// Wiki Types
export type WikiCategory = 'Guías' | 'Protocolos' | 'FAQ' | 'Contactos';

export interface WikiArticle {
  id: string;
  title: string;
  category: WikiCategory;
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  votes: number;
  viewCount: number;
  tags?: string[];
}

// Messages Types
export interface DirectMessage {
  id: string;
  senderId: string;
  senderName?: string;
  senderApartment?: string;
  isAnonymous: boolean;
  recipientId: string;
  recipientApartment: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantApartment: string;
  participantName?: string;
  isAnonymous: boolean;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

// Notification Types
export type NotificationType =
'emergency' |
'incident' |
'message' |
'assembly' |
'forum' |
'community' |
'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}