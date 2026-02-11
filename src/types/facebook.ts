export interface FacebookUser {
  id: string;
  name: string;
  email: string;
  image: string;
  accessToken: string;
}

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
  tasks: string[];
}

export interface FacebookPost {
  id: string;
  message?: string;
  full_picture?: string;
  created_time: string;
  permalink_url: string;
  attachments?: {
    data: Array<{
      media: {
        image: {
          src: string;
        }
      }
    }>
  }
}

export interface ExtractedProduct {
  id: string;
  title: string;
  price?: number;
  currency?: string;
  description: string;
  images: string[];
  originalUrl: string;
}
