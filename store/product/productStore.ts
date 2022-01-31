import create, { State, StateCreator } from 'zustand';
import produce, { Draft } from 'immer';
import { devtools } from 'zustand/middleware';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { WritableDraft } from 'immer/dist/internal';

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

// export interface TProductInCart {
//   id: string;
//   name: string;
//   img: string;
//   price: number;
//   category: string;
//   discount: number;
//   amount: number;
// }

// export interface ICart {
//   product: TProductInCart;
//   total: number;
// }

export interface TProductState {
  products: object[];
  getProducts: () => void;
  cart: object[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  changeQty: (id: number, amount: number) => void;
  sortByPrice: () => void;
  filterByStock: () => void;
  filterBySearch: () => void;
  clearFilters: () => void;
}

const immer =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce<T>(fn)), get, api);

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
      //  cart: [product];
      console.log(`added to cart${product.name}`);
    }),
  removeFromCart: (id: number) =>
    set((state) => {
      console.log('removed from cart');
    }),
  clearCart: () =>
    set((state) => {
      console.log('cart cleared');
    }),
  changeQty: (id: number, amount: number) =>
    set((state) => {
      console.log('changed amount');
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
