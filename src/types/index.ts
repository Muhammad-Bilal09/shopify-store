export type VotesType = {
  count: number;
  value: number;
};

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[];
};

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
};

export type VariantType = {
  id: string;
  color: string;
  size: string;
};

export type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
  images: string[];
  discount?: string;
  currentPrice: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
  variants?: VariantType[];
};

export type ProductTypeList = {
  id: string;
  name: string;
  price: number;
  color?: string;
  images: string[];
  discount?: string;
  currentPrice?: number;
  variantId?: string;
};

export type ProductStoreType = {
  id: string;
  name: string;
  thumb: string;
  price: number;
  count: number;
  color: string;
  size: string;
  variantId?: string;
};

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string;
};
