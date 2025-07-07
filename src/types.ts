// src/types.ts

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readingTime: string;
  image?: string;
  categories?: string[];
  comments?: string[];
}
