import create, { State, StateCreator } from 'zustand';
import produce, { Draft } from 'immer';
import { persist, devtools } from 'zustand/middleware';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { WritableDraft } from 'immer/dist/internal';

// export interface Settings {
//   darkMode: boolean;
//   lightMode: boolean;
// }

export interface TSettingsState {
  useSettings: {};
  getNotifications: () => void;
  enableNotifications: () => void;
  disableNotifications: () => void;
  setDarkMode: () => void;
  setLightMode: () => void;
  changeTheme: () => void;
  removeAds: () => void;
  upgradeToPremium: () => void;
}

// const immer =
//   <T extends State>(
//     config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
//   ): StateCreator<T> =>
//   (set, get, api) =>
//     config((fn) => set(produce<T>(fn)), get, api);

export const immer =
  (config: {
    (set: SettingsStoreSet): {
      useSettings: {};
      getNotifications: () => void;
      enableNotifications: () => void;
      disableNotifications: () => void;
      setDarkMode: () => void;
      setLightMode: () => void;
      changeTheme: () => void;
      removeAds: () => void;
      upgradeToPremium: () => void;
    };
    (arg0: (fn: any) => any, arg1: any): any;
  }) =>
  (
    set: (arg0: (base: unknown, ...args: unknown[]) => unknown) => any,
    get: any
  ) =>
    config((fn: any) => set(produce(fn)), get);

type SettingsStoreSet = (
  fn: (draft: WritableDraft<TSettingsState>) => void
) => void;

const settingsStore = (set: SettingsStoreSet) => ({
  useSettings: {},
  getNotifications: () =>
    set((state) => {
      console.log('get notifications');
    }),
  enableNotifications: () =>
    set((state) => {
      console.log('enabled notifications');
    }),
  disableNotifications: () =>
    set((state) => {
      console.log('disabled notifications');
    }),
  setDarkMode: () =>
    set((state) => {
      console.log('enabled darkmode');
    }),
  setLightMode: () =>
    set((state) => {
      console.log('enabled lightmode');
    }),
  changeTheme: () =>
    set((state) => {
      console.log('changed theme');
    }),
  removeAds: () =>
    set((state) => {
      console.log('removed ads');
    }),
  upgradeToPremium: () =>
    set((state) => {
      console.log('upgraded to premium');
    }),
});

export const useSettingsStore = createSelectorHooks(
  create<TSettingsState>(devtools(immer(settingsStore)))
);

// export const useSettingsStore = create<TSettingsStore>((set) => ({
//   useSettings: {},
//   getNotifications: () =>
//     set(
//       produce((state) => {
//         console.log(state);
//       })
//     ),
//   enableNotifications: () =>
//     set(
//       produce((state) => {
//         console.log(state);
//       })
//     ),
//   disableNotifications: () =>
//     set(
//       produce((state) => {
//         console.log(state);
//       })
//     ),
//   setDarkMode: () =>
//     set(
//       produce((state) => {
//         console.log(state);
//       })
//     ),
//   setLightMode: () =>
//     set(
//       produce((state) => {
//         console.log(state);
//       })
//     ),
//   changeTheme: () =>
//     set(
//       produce((state) => {
//         console.log(state);
//       })
//     ),
//   removeAds: () =>
//     set(
//       produce((state) => {
//         console.log(state);
//       })
//     ),
//   upgradeToPremium: () =>
//     set(
//       produce((state) => {
//         console.log(state);
//       })
//     ),
// }));
