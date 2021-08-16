/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-08-09 13:05:19
 * @LastEditors: tanwei
 * @LastEditTime: 2020-11-24 16:33:21
 * @FilePath: /open-platform/src/redux/actions/commonAction.ts
 */
import { MENU_COLLAPSED, SYSTEM_LOADING, USER_INFO, DICT_ALL_DATA, MENU_LIST, NAVIGATION_MODE, IS_All_FULL_SCREEN } from '@/stores/actionTypes';
export const systemLoading = (fullScreenLoading) => ({
    type: SYSTEM_LOADING,
    fullScreenLoading,
});

export const collapsedClick = (collapsed) => ({
    type: MENU_COLLAPSED,
    collapsed,
});
export const setUserInfo = (userInfo) => ({
    type: USER_INFO,
    userInfo,
});

export const setDictAllData = (dictAllData) => ({
    type: DICT_ALL_DATA,
    dictAllData,
});

export const setMenusList = (menusList) => ({
    type: MENU_LIST,
    menusList,
});

export const setNavigationMode = (navigationMode) => ({
    type: NAVIGATION_MODE,
    navigationMode,
});

export const setIsAllFullScreen = (isAllFullScreen) => ({
    type: IS_All_FULL_SCREEN,
    isAllFullScreen,
});

