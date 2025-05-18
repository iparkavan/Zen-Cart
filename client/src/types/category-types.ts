export interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface CategoriesResponseType {
  message: string;
  categories: Category[];
}
