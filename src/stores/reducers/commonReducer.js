/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-08-09 13:11:53
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-13 11:48:54
 * @FilePath: /open-platform/src/stores/reducers/commonReducer.ts
 */
import { MENU_COLLAPSED, USER_INFO, DICT_ALL_DATA, MENU_LIST, NAVIGATION_MODE, IS_All_FULL_SCREEN } from '@/stores/actionTypes';
import { SYSTEM_LOADING } from '../actionTypes';
import { getLocalStorageItem } from '@/utils/utils';
const token = getLocalStorageItem('token');
export const navigationModeIni = {
    overallStyle: 'dark',
    themeColor: 'rgb(24, 144, 255)',
    menuTrigger: false,
    breadcrumb: true,
    fixedHeader: true,
    displaySystemConfig: true,
};

export const menuIni = [
    {
        id: 'index',
        pid: 0,
        name: "首页",
        path: "/",
        icon: "SettingOutlined",
        cmpPath: "pages/index",
        isShow: '1',
        isRouter: '1',
        sort: 0,
    }
];
export const initialState = {
    /** 
     * 菜单展开收缩 
     * collapsed:true 收缩
     * */
    collapsed: false,
    /** 
     * table全屏状态下把modal挂在table上 
     * isAllFullScreen:true 在全屏状态下
     * */
    isAllFullScreen: false,
    /** 数据字典 */
    dictAllData: {},
    /** 菜单列表 */
    menusList: menuIni,
    /** 用户信息 */
    userInfo: {
        id: '',
        username: '',
    },
    /** 系统个性化配置 */
    navigationMode: navigationModeIni,

    fullScreenLoading: !!token
};

function common(state = initialState, actions) {
    switch (actions.type) {
        case SYSTEM_LOADING:
            return {
                ...state,
                fullScreenLoading: actions.fullScreenLoading,
            };
        case USER_INFO:
            return {
                ...state,
                userInfo: actions.userInfo,
            };
        case MENU_COLLAPSED:
            return {
                ...state,
                collapsed: actions.collapsed,

            };
        case MENU_LIST:
            return {
                ...state,
                menusList: [...menuIni, ...actions.menusList],
            };
        case DICT_ALL_DATA:
            return {
                ...state,
                dictAllData: actions.dictAllData,

            };
        case NAVIGATION_MODE:
            const { themeColor } = actions.navigationMode;
            if (themeColor !== state.navigationMode.themeColor) {
                window.less.modifyVars({ '@primary-color': themeColor, });
            }
            return {
                ...state,
                navigationMode: actions.navigationMode,
            };
        case IS_All_FULL_SCREEN:
            return {
                ...state,
                isAllFullScreen: actions.isAllFullScreen,
            };
        default:
            return state;
    }
}
export default common;