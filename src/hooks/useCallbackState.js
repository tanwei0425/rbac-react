import { useEffect, useState, useRef } from "react";

const useCallbackState = (state) => {
    const Ref = useRef();
    const [data, setData] = useState(state);
    useEffect(() => {
        Ref.current && Ref.current(data);
    }, [data]);
    return [data, (val, callback) => {
        Ref.current = callback;
        setData(val);
    }];
};

export default useCallbackState;


// const [data,setData] = useCallbackState({});

// setData({}, function (data) {
//     console.log("啦啦啦，我是回调方法", data);
// })