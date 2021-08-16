import { useSelector } from 'react-redux';

const useContainerDom = () => {
    const { isAllFullScreen } = useSelector((state) => state.common);
    const getContainer = () => {
        const targetId = document.getElementById("t-table");
        if (isAllFullScreen) {
            return targetId || document.body;
        } else {
            return document.body;
        }
    };
    return getContainer;
};

export default useContainerDom;
