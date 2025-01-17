export interface VideoProject {
  id: string;
  title: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  duration: number;
  script: string;
  musicTrack?: string;
  status: 'draft' | 'processing' | 'completed';
  createdAt: Date;
}

export interface VideoTemplate {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
}