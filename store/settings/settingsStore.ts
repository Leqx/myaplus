import { createStore } from 'zustand-immer-store';

export const useSettingsStore = createStore(
  { userSettings: {} },
  {
    createActions: (set) => ({
      getNotifications: () =>
        set((draft) => {
          draft.state;
          console.log('get notifications');
        }),
      enableNotifications: () =>
        set((draft) => {
          draft.state;
          console.log('enabled notifications');
        }),
      disableNotifications: () =>
        set((draft) => {
          draft.state;
          console.log('disabled notifications');
        }),
      setDarkMode: () =>
        set((draft) => {
          draft.state;
          console.log('enabled darkmode');
        }),
      setLightMode: () =>
        set((draft) => {
          draft.state;
          console.log('enabled lightmode');
        }),
      changeTheme: () =>
        set((draft) => {
          draft.state;
          console.log('changed theme');
        }),
      removeAds: () =>
        set((draft) => {
          draft.state;
          console.log('removed ads');
        }),
    }),
  }
);
