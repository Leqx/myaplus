import create, { State, StateCreator } from 'zustand';
import produce, { Draft } from 'immer';
import { devtools } from 'zustand/middleware';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { WritableDraft } from 'immer/dist/internal';

import { createStore } from 'zustand-immer-store';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  img: string;
  price: number;
  category: string;
  discount: number;
  amount: number;
  available: boolean;
}

export interface ICart {
  product: IProduct;
  total: number;
}

const useCounterStore = createStore(
  { products: [] as IProduct[], cart: [] as IProduct[] },
  {
    createActions: (set) => ({
      addToCart: (product: IProduct) =>
        set((draft) => {
          const productExists = draft.state.cart.find(
            (x) => x.name === product.name
          );
          if (!productExists) {
            draft.state.cart.push(product);
            product.amount = 1;
          }
        }),
      removeItemFromCart: (id: string) =>
        set((draft) => {
          const idx = draft.state.cart.findIndex((x) => x.id === id);
          draft.state.cart.splice(idx, 1);
        }),
      clearCart: () =>
        set((draft) => {
          draft.state.cart = [];
        }),
      changeCartQty: (id: string) =>
        set((draft) => {
          draft.state;
          console.log('change cart qty');
        }),
      cartTotal: () =>
        set((draft) => {
          draft.state.cart.reduce((acc, prod) => (acc += prod.amount), 0);
        }),
      sortByPrice: () =>
        set((draft) => {
          draft.state;
          console.log('sorted by price');
        }),
      filterByStock: () =>
        set((draft) => {
          draft.state;
          console.log('filtered by stock');
        }),
      filterBySearch: () =>
        set((draft) => {
          draft.state;
          console.log('filtered by search');
        }),
      clearFilters: () =>
        set((draft) => {
          draft.state;
          console.log('cleared filters');
        }),
    }),
  }
);

export interface IProduct {
  id: string;
  name: string;
  description: string;
  img: string;
  price: number;
  category: string;
  discount: number;
  amount: number;
  available: boolean;
}

// type IProductMap = Map<string, IProduct>;

export interface IProductInCart {
  id: string;
  name: string;
  img: string;
  price: number;
  category: string;
  discount: number;
  amount: number;
}

// export interface ICart {
//   product: TProductInCart;
//   total: number;
// }

export interface TProductState {
  products: Array<IProduct>;
  getProducts: () => void;
  cart: Array<IProductInCart>;
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  changeQty: (id: string, amount: number) => void;
  sortByPrice: () => void;
  filterByStock: () => void;
  filterBySearch: () => void;
  clearFilters: () => void;
}

// const immer =
//   <T extends State>(
//     config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
//   ): StateCreator<T> =>
//   (set, get, api) =>
//     config((fn) => set(produce<T>(fn)), get, api);

export const immer =
  (config: {
    (set: ProductStoreSet): {
      products: {}[];
      getProducts: () => void;
      cart: {}[];
      addToCart: (product: IProduct) => void;
      removeFromCart: (id: string) => void;
      clearCart: () => void;
      changeQty: (id: string, amount: number) => void;
      sortByPrice: () => void;
      filterByStock: () => void;
      filterBySearch: () => void;
      clearFilters: () => void;
    };
    (arg0: (fn: any) => any, arg1: any): any;
  }) =>
  (
    set: (arg0: (base: unknown, ...args: unknown[]) => unknown) => any,
    get: any
  ) =>
    config((fn: any) => set(produce(fn)), get);

type ProductStoreSet = (
  fn: (draft: WritableDraft<TProductState>) => void
) => void;

const productStore = (set: ProductStoreSet) => ({
  products: [{}],
  getProducts: () =>
    set((state) => {
      console.log('get products');
    }),
  cart: [{}],
  addToCart: (product: IProduct) =>
    set((state) => {
      state.cart.push(product);
      console.log(`added to cart${product.name}`);
    }),
  removeFromCart: (id: string) =>
    set((state) => {
      state.cart.filter((x) => x.id !== id);
    }),
  clearCart: () =>
    set((state) => {
      console.log('cart cleared');
    }),
  changeQty: (id: string, amount: number) =>
    set((state) => {
      const cartItem = state.cart.find((x) => x.id === id);
      if (!cartItem) return;
    }),
  sortByPrice: () =>
    set((state) => {
      console.log('sorted by price');
    }),
  filterByStock: () =>
    set((state) => {
      console.log('filtered by stock');
    }),
  filterBySearch: () =>
    set((state) => {
      console.log('filtered by search');
    }),
  clearFilters: () =>
    set((state) => {
      console.log('cleared filters');
    }),
});

export const useProductStore = createSelectorHooks(
  create<TProductState>(devtools(immer(productStore)))
);

// export const useProductStore = create<TProductStore>((set) => ({
//   products: [],
//   getProducts: () => set(produce(state, (_draft) => {})),
//   cart: [],
//   addToCart: (_product: TProductInCart) => set(produce(state, (_draft) => {})),
//   removeFromCart: (_id: number) => set(produce(state, (_draft) => {})),
//   clearCart: () => set(produce(state, (_draft) => {})),
//   changeQty: (_id: number, _qty: number) => set(produce(state, (_draft) => {})),
//   sortByPrice: () => set(produce(state, (_draft) => {})),
//   filterByStock: () => set(produce(state, (_draft) => {})),
//   filterBySearch: () => set(produce(state, (_draft) => {})),
//   clearFilters: () => set(produce(state, (_draft) => {})),
// }));
// function state<T>(
//   _state: any,
//   _arg1: (draft: import('immer/dist/internal').WritableDraft<IProduct>) => void
// ): import('zustand').PartialState<
//   TProductStore,
//   keyof TProductStore,
//   keyof TProductStore,
//   keyof TProductStore,
//   keyof TProductStore
// > {
//   throw new Error('Function not implemented.');
// }
