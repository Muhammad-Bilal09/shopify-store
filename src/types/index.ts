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

export type SessionData = {
  user?: {
    id: string;
    email: string;
    password: string;
    name?: string;
  };
};

export type UserSession = {
  id: string;
  email: string;
  name: string;
};

export type ShopifyImageNode = {
  node: {
    src: string;
  };
};

export type ShopifyVariantNode = {
  node: {
    id: string;
    price: {
      amount: string;
    };
  };
};

export type ProductTypeStore = {
  id: string;
  title: string;
  descriptionHtml: string;
  images: {
    edges: ShopifyImageNode[];
  };
  variants: {
    edges: ShopifyVariantNode[];
  };
};

export type ProductContentProps = {
  product: ProductTypeStore;
};

export type HeaderType = {
  isErrorPage?: boolean;
  searchTerm: string;
  setSearchTerm?: (term: string) => void;
};

export type SliderItem = {
  title: string;
  image: {
    url: string;
  };
};

export type ContentfulResponse = {
  data: {
    sliderItemCollection?: { items: SliderItem[] };
    sliderItem2Collection?: { items: SliderItem[] };
  };
  errors?: { message: string }[];
};

export type ProductDescriptionType = {
  show: boolean;
};

export type GalleryProductType = {
  images?: {
    edges: ShopifyImageNode[];
  };
};

export type SubscribeItem = {
  title: string;
  image: {
    url: string;
  };
};

export type ContentfulResponseSubscribe = {
  data: {
    subscribeCollection?: {
      items: SubscribeItem[];
    };
  };
  errors?: { message: string }[];
};

export type ImageNode = {
  src: string;
};

export type VariantNode = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
};

export type ProductNode = {
  id: string;
  title: string;
  descriptionHtml: string;
  images: {
    edges: { node: ImageNode }[];
  };
  variants: {
    edges: { node: VariantNode }[];
  };
};

export type ShopifyProductResponse = {
  data: {
    products: {
      edges: { node: ProductNode }[];
    };
  };
};

export type ForgotMail = {
  email: string;
};

export type FeaturedItem = {
  title: string;
  image?: {
    url: string;
  };
  buttontext?: string;
  description?: string;
  price?: string;
};

export type ContentfulResponseIndex = {
  data: {
    moredetailsCollection?: { items: FeaturedItem[] };
    viewallCollection?: { items: FeaturedItem[] };
    showcollectionCollection?: { items: FeaturedItem[] };
    shippingCollection?: { items: FeaturedItem[] };
    paymentCollection?: { items: FeaturedItem[] };
    guaranteeCollection?: { items: FeaturedItem[] };
    assetsCollection?: { items: FeaturedItem[] };
  };
  errors?: { message: string }[];
};

export type LayoutType = {
  title?: string;
  children?: React.ReactNode;
};
