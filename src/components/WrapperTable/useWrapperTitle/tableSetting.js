import React, { useState } from 'react';
import { Tooltip, Checkbox, Row, Col, Divider } from 'antd';
import {
    SettingOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import WrapperDropdown from '@/components/WrapperDropdown';
import WrapperButton from '@/components/WrapperButton';
import styles from './index.module.less';

const useTableSetting = ({ columns = [], setFilterColnmnsKey, filterColnmnsKey }) => {
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const [visible, setVisible] = useState(false);

    const onCheckAllChange = e => {
        setFilterColnmnsKey(e.target.checked ? columns.map(val => val.value) : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    const onChange = list => {
        setFilterColnmnsKey(list);
        setIndeterminate(!!list.length && list.length < columns.length);
        setCheckAll(list.length === columns.length);
    };
    const reset = () => {
        setFilterColnmnsKey(columns.map(val => val.value));
        setIndeterminate(false);
        setCheckAll(true);
    };
    const onVisibleChange = (e) => setVisible(e);

    const menuClass = classnames(
        styles['wrapper-title-tool-tableSetting'],
        'ant-dropdown-menu',
    );
    const menu = <div className={menuClass} >

        <Row className={styles['wrapper-title-tool-tableSetting-title']} justify="space-between" align="middle">
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                列展示
            </Checkbox>
            <WrapperButton
                type={'primary'}
                size={'small'}
                onClick={reset}
            >
                重置
            </WrapperButton>
        </Row>
        <Divider className={styles['wrapper-title-tool-tableSetting-divider']} />
        <Checkbox.Group className={styles['wrapper-title-tool-tableSetting-checkbox']} value={filterColnmnsKey} style={{ width: '100%' }} onChange={onChange}>
            {columns.map(val => {
                return <Col
                    key={val.value}
                    className={styles['wrapper-title-tool-tableSetting-checkbox-group']}
                    span={24}>
                    <Checkbox value={val.value}>{val.label}</Checkbox>
                </Col>;
            })}
        </Checkbox.Group>
        {/* <Divider className={styles['wrapper-title-tool-tableSetting-divider']} /> */}

        {/* <Row justify="end" align="middle">
            <WrapperButton
                type={'primary'}
                size={'small'}
                onClick={reset}
            >
                保存
            </WrapperButton>
        </Row> */}
    </div>;
    return (
        <div>
            <Tooltip arrowPointAtCenter placement="top" title={'列设置'}>
                <WrapperDropdown onVisibleChange={onVisibleChange} visible={visible} overlay={menu} trigger={['click']}>
                    <SettingOutlined className={styles['wrapper-title-tool-icon']} />
                </WrapperDropdown>
            </Tooltip>
        </div>
    );
};

export default useTableSetting;
