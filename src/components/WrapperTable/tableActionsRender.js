/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-02-17 12:33:42
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:26:17
 * @FilePath: /open-platform/src/components/WrapperTable/tableActionsRender.tsx
 */
import React, { memo, useEffect, useState } from 'react';
import { Tooltip, Menu } from 'antd';
import {
    EllipsisOutlined
} from '@ant-design/icons';
import classnames from 'classnames';
import WrapperButton from '@/components/WrapperButton';
import WrapperDropdown from '@/components/WrapperDropdown';
import { useSelector } from 'react-redux';
import { authority } from '@/utils/utils';
const Index = ({ data = [], record, isMoRe = true, maxShowNum = 3, }) => {
    const defaultSize = 'small';
    const { userInfo } = useSelector((state) => state.common);
    const [buttonsArrData, setButtonsArrData] = useState([]);
    const [moreButtonsData, setMoreButtonsData] = useState([]);
    useEffect(() => {
        // 按钮没有权限和隐藏的按钮不渲染
        const showButtonsArr = data?.filter(val => !val?.isHide && authority({
            dataSource: userInfo?.elements,
            target: val.authButStatus
        })) || [];
        if (isMoRe) {
            const buttonsArr = [];
            const moreButtonsArr = [];
            showButtonsArr.forEach((val, index) => {
                if (index < maxShowNum) {
                    buttonsArr.push(val);
                } else {
                    moreButtonsArr.push(val);
                }
            });
            setButtonsArrData(buttonsArr);
            setMoreButtonsData(moreButtonsArr);
        } else {
            setButtonsArrData(showButtonsArr);
        }
    }, []);
    return (
        <>
            {buttonsArrData?.map(val => {
                const { text, isHide, tip, onClick, className, ...restValProps } = val;
                const TClassName = classnames(
                    'tableActionsRenderButton',
                    className,
                );
                const WrapperButtonDom = <WrapperButton
                    className={TClassName}
                    size={defaultSize}
                    {...restValProps}
                    onClick={onClick.bind(this, record)}
                >
                    {val.text}
                </WrapperButton>;
                if (!isHide) {
                    return tip ? <Tooltip key={restValProps?.key}
                        arrowPointAtCenter
                        placement="top"
                        title={tip}
                    >
                        {WrapperButtonDom}
                    </Tooltip> : WrapperButtonDom;
                }
                return null;
            })}
            {moreButtonsData?.length > 0 &&
                <WrapperDropdown
                    overlay={
                        <Menu>
                            {moreButtonsData?.map(val => {
                                // 强行去掉icon
                                const { text, isHide, tip, onClick, className, icon, ...restValProps } = val;
                                const TClassName = classnames(
                                    'tableActionsRenderButton',
                                    className,
                                );
                                return <Menu.Item key={restValProps?.key}>
                                    <WrapperButton
                                        className={TClassName}
                                        size={defaultSize}
                                        {...restValProps}
                                        type={'link'}
                                        onClick={onClick.bind(this, record)}
                                    >
                                        {val.text || val.tip}
                                    </WrapperButton>
                                </Menu.Item>;
                            })}
                        </Menu>
                    }
                    placement="bottomLeft">
                    <Tooltip
                        arrowPointAtCenter
                        placement="top"
                        title={'更多操作'}
                    >
                        <WrapperButton size={defaultSize}>
                            <EllipsisOutlined />
                        </WrapperButton>
                    </Tooltip>
                </WrapperDropdown>
            }
        </>
    );
};

export default memo(Index);
