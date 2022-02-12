import create, { State, StateCreator } from 'zustand';
import getElements from './getElements';
import produce, { Draft } from 'immer';
import { devtools } from 'zustand/middleware';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { WritableDraft } from 'immer/dist/internal';

export interface IElement {
  id: string;
  content: string;
  goals: number;
  date: string;
}

type IElementsMap = Map<string, IElement>;

export interface PageState {
  bears: number;
  increase: (by: number) => void;
  elements: IElementsMap;
  increaseElementGoals: (id: string) => void;
  addElement: (element: IElement) => void;
  setElementContent: () => void;
}

const immer =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce<T>(fn)), get, api);

type StoreSet = (fn: (draft: WritableDraft<PageState>) => void) => void;

const store = (set: StoreSet) => ({
  bears: 0,
  increase: (by: number) =>
    set((state) => {
      state.bears += by;
    }),
  elements: getElements,
  addElement: (element: IElement) =>
    set((state) => {
      state.elements.set(element.id, element);
    }),
  increaseElementGoals: (id: string) =>
    set((state) => {
      const element = state.elements.get(id);
      if (!element) return;
      element.goals += 1;
    }),
  setElementContent: () =>
    set((state) => {
      const element = state.elements.get('1');
      if (!element) return;
      element.content = 'KARTAL';
    }),
});

export const useStore = createSelectorHooks(
  create<PageState>(devtools(immer(store)))
);

// export const immer = (config) => (set, get) =>
//   config((fn) => set(produce(fn)), get);
