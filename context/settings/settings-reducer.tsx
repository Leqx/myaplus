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

const settingsReducer = (state: any, action: { type: any }) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {};

    case ENABLE_NOTIFICATIONS:
      return {};

    case DISABLE_NOTIFICATIONS:
      return {};

    case SET_DARKMODE:
      return {};

    case SET_LIGHTMODE:
      return {};

    case CHANGE_THEME:
      return {};

    case REMOVE_ADS:
      return {};

    case UPGRADE_TO_PREMIUM:
      return {};

    default:
      return state;
  }
};

export default settingsReducer;
