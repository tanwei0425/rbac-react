/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-10-24 16:45:11
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-07 20:22:29
 * @FilePath: /open-platform/src/components/WrapperModal/index.tsx
 */
import React, { useState } from 'react';
import { Modal, Spin } from 'antd';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import _ from 'lodash';

/**
 * 
 * @param {*} props 
 * draggable:是否支持拖动
 * modalRender:自定义渲染对话框
 * @returns 
 */
const WrapperModal = (props) => {
    const { wrapClassName, draggable, confirmLoading = false, children, onOk, ...restProps } = props;
    const [draggableDisabled, setDraggableDisabled] = useState(true);
    const TWrapClassName = classNames(
        't-modal',
        wrapClassName,
    );
    !restProps?.okText && delete restProps.okText;
    if (draggable) {
        // 增加拖动功能
        restProps.modalRender = (node) => <Draggable disabled={draggableDisabled}>{node}</Draggable>;
        restProps.title = <div
            style={{
                width: '100%',
                cursor: 'move',
            }}
            onMouseOver={() => {
                if (draggableDisabled) {
                    setDraggableDisabled(false);
                }
            }}
            onMouseOut={() => {
                setDraggableDisabled(true);
            }}
            onFocus={() => { }}
            onBlur={() => { }}
        >{restProps.title}</div>;
    }
    const newOnOk = onOk && _.debounce(onOk, 200);
    return (
        <Modal
            wrapClassName={TWrapClassName}
            centered={true}
            destroyOnClose={true}
            maskClosable={true}
            keyboard={false}
            cancelText={'关闭'}
            okText={'确定'}
            confirmLoading={confirmLoading}
            onOk={newOnOk}
            {...restProps}
        >
            <Spin spinning={confirmLoading}>{children}</Spin>
        </Modal>
    );
};

export default WrapperModal;
