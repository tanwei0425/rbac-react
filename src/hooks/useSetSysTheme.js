/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-23 14:42:07
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-07 16:47:20
 * @FilePath: /open-platform/src/hooks/useSetSysTheme.tsx
 */
import { useSelector, useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import { setNavigationMode } from '@/stores/actions/commonAction';
import commonRequest from '@/services/common';

const useSetSysTheme = () => {
    const dispatch = useDispatch();
    const { navigationMode } = useSelector((state) => state.common);
    const { run, loading } = useRequest(commonRequest.setSkinConfig, { manual: true });
    const setSkin = async (key, value, title) => {
        const newNavigationMode = { ...navigationMode, ...{ [key]: value } };
        if (navigationMode[key] === value) return;
        const res = await run({ skin: newNavigationMode });
        if (res?.code === 200) {
            dispatch(setNavigationMode(newNavigationMode));
            window.message.success(title ? title : '系统配置更新成功');
        }
    };

    return { setSkin, loading };
};

export default useSetSysTheme;
