/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-01-30 16:25:47
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-13 19:15:56
 * @FilePath: /open-platform/src/hooks/useGetAllConfig.tsx
 */
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import { setUserInfo, setDictAllData, setMenusList, setNavigationMode } from '@/stores/actions/commonAction';
import commonRequest from '@/services/common';
const Index = () => {
    const dispatch = useDispatch();
    const { getUser, getMenus, getDictAll } = commonRequest;
    const userInfo = useRequest(getUser, { manual: true });
    const menus = useRequest(getMenus, { manual: true });
    const dictAll = useRequest(getDictAll, { manual: true });
    const runFun = async () => {
        const userInfoRes = await userInfo.run();
        if (userInfoRes?.code === 200) {
            const { skin, ...restProps } = userInfoRes?.data || {};
            let userInfoData = { ...restProps };
            dispatch(setUserInfo(userInfoData));
            const navigationMode = skin && JSON.parse(skin);
            navigationMode && dispatch(setNavigationMode(navigationMode));
        }
        const menusRes = await menus.run();
        if (menusRes?.code === 200) {
            const menuList = menusRes?.data || [];
            dispatch(setMenusList([...menuList]));
        }
        const dictAllRes = await dictAll.run();
        if (dictAllRes?.code === 200) {
            dispatch(setDictAllData(dictAllRes?.data || []));
        }
        return userInfoRes?.code === 200 && menusRes?.code === 200 && dictAllRes?.code === 200;
    };
    return { runFun };
};
export default Index;