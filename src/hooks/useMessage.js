import { message } from 'antd';

import useContainerDom from '@/hooks/useContainerDom';
const useMessage = () => {
    const getContainer = useContainerDom();
    message.config({
        maxCount: 1,
        getContainer: getContainer
    });
    return message;
};

export default useMessage;
