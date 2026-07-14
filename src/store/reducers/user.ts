import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { remove } from "lodash";

type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
};

export type WishlistProduct = {
  id: string;
  title: string;
  image: string;
  price: string;
  productPath: string;
};

type ToggleFavType = {
  id: string;
};

type ToggleWishlistType = {
  product: WishlistProduct;
};

type UserSliceTypes = {
  user: any;
  favProducts: string[];
  wishlistProducts: WishlistProduct[];
};

const initialState = {
  user: {
    name: "Lucas Pulliese",
  },
  favProducts: [],
  wishlistProducts: [],
} as UserSliceTypes;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFavProduct(state, action: PayloadAction<ToggleFavType>) {
      const index = state.favProducts.includes(action.payload.id);

      if (!index) {
        state.favProducts.push(action.payload.id);
        return;
      }

      remove(state.favProducts, (id) => id === action.payload.id);
    },
    toggleWishlistProduct(state, action: PayloadAction<ToggleWishlistType>) {
      const { product } = action.payload;
      // Guard against undefined during redux-persist rehydration
      state.wishlistProducts ??= [];
      state.favProducts ??= [];
      const existingIndex = state.wishlistProducts.findIndex(
        (p) => p.id === product.id
      );

      if (existingIndex === -1) {
        // Add to wishlist
        state.favProducts.push(product.id);
        state.wishlistProducts.push(product);
      } else {
        // Remove from wishlist
        state.wishlistProducts.splice(existingIndex, 1);
        remove(state.favProducts, (id) => id === product.id);
      }
    },
    removeFromWishlist(state, action: PayloadAction<{ id: string }>) {
      // Guard against undefined during redux-persist rehydration
      state.wishlistProducts ??= [];
      state.favProducts ??= [];
      state.wishlistProducts = state.wishlistProducts.filter(
        (p) => p.id !== action.payload.id
      );
      remove(state.favProducts, (id) => id === action.payload.id);
    },
    setUserLogged(state, action: PayloadAction<ProductType>) {
      const index = state.favProducts.includes(action.payload.id);

      if (!index) {
        state.favProducts.push(action.payload.id);
        return {
          ...state,
          favProducts: state.favProducts,
        };
      }

      remove(state.favProducts, (id) => id === action.payload.id);

      return {
        ...state,
        favProducts: state.favProducts,
      };
    },
  },
});

export const { toggleFavProduct, toggleWishlistProduct, removeFromWishlist, setUserLogged } = userSlice.actions;
export default userSlice.reducer;
