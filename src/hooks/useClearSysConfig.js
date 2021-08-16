/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-23 14:42:07
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-07 16:47:20
 * @FilePath: /open-platform/src/hooks/useSetSysTheme.tsx
 */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavigationMode, setDictAllData, setMenusList, setUserInfo } from '@/stores/actions/commonAction';
import { navigationModeIni, initialState } from '@/stores/reducers/commonReducer';
import { clearAllLocalStorage } from "@/utils/utils";
const useClearSysConfig = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clearSysConfig = (messageText = '操作成功', messageType = 'success', path = '/login', theme = true, localStorage = true,) => {
        path && navigate(path);
        theme && dispatch(setNavigationMode(navigationModeIni));
        dispatch(setMenusList([]));
        dispatch(setDictAllData(initialState.dictAllData));
        dispatch(setUserInfo(initialState.userInfo));
        localStorage && clearAllLocalStorage();
        messageText && window?.message[messageType](messageText);
    };
    return clearSysConfig;
};

export default useClearSysConfig;
