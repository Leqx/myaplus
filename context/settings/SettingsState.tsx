import React from 'react';
import SettingsContext from './settings-context';
import settingsReducer from './settings-reducer';
import {
  GET_NOTIFICATIONS,
  ENABLE_NOTIFICATIONS,
  DISABLE_NOTIFICATIONS,
  SET_DARKMODE,
  SET_LIGHTMODE,
  CHANGE_THEME,
  REMOVE_ADS,
  UPGRADE_TO_PREMIUM,
} from './settings-actions';

export default function SettingsState(props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const settingsInitialState = {
    notifications: [],
    notificationStatus: 'enabled',
    accountType: 'standard',
    ads: true,
    darkMode: false,
    lightMode: true,
    theme: {},
  };

  const [settingsState, dispatch] = React.useReducer(
    settingsReducer,
    settingsInitialState
  );

  // get notifications
  const getNotifications = (notifications: []) => {
    dispatch({
      type: GET_NOTIFICATIONS,
    });
  };

  // enable notifications
  const enableNotifications = (notificationStatus: 'enabled') => {
    dispatch({
      type: ENABLE_NOTIFICATIONS,
    });
  };

  // disable notifications
  const disableNotifications = (notificationStatus: 'disable') => {
    dispatch({
      type: DISABLE_NOTIFICATIONS,
    });
  };

  // upgrade to premium
  const upgradeToPremium = (accountType: 'premium') => {
    dispatch({
      type: UPGRADE_TO_PREMIUM,
    });
  };

  // set darkmode
  const setDarkmode = (darkmode: true) => {
    dispatch({
      type: SET_DARKMODE,
    });
  };

  // set lightmode
  const setLightmode = (lightMode: true) => {
    dispatch({
      type: SET_LIGHTMODE,
    });
  };

  // remove ads
  const removeAds = (ads: false) => {
    dispatch({
      type: REMOVE_ADS,
    });
  };

  // change theme
  const changeTheme = (theme: {}) => {
    dispatch({
      type: CHANGE_THEME,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settingsState,
        getNotifications,
        enableNotifications,
        disableNotifications,
        upgradeToPremium,
        setDarkmode,
        setLightmode,
        removeAds,
        changeTheme,
      }}>
      {props.children}
    </SettingsContext.Provider>
  );
}
