export interface User {
  id?: string;
  username?: string;
  role?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: string;
  userId?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Article {
  id: string;
  userId?: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt: Date | string;
  user?: User;
  category: Category;
}
