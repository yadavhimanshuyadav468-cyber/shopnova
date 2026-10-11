export type Product = {
  id: number;
  name: string;
  category: 'women' | 'men' | 'shoes' | 'bags' | 'jewellery';
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  discount: number;
};

export type CartItem = Product & {
  quantity: number;
};
