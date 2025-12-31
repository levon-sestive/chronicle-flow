export interface JournalEntry {
  id: string;
  type: 'text' | 'image' | 'voice';
  content: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface Chapter {
  id: string;
  title: string;
  entries: JournalEntry[];
  createdAt: Date;
  updatedAt: Date;
}
