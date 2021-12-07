import React, { useState } from 'react';
import { Tooltip, Tree, Row, Divider } from 'antd';
import {
    SettingOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import WrapperDropdown from '@/components/WrapperDropdown';
import WrapperButton from '@/components/WrapperButton';
import styles from './index.module.less';

const useTableSetting = ({ columns = [], setFilterColnmnsKey, filterColnmnsKey }) => {
    const [visible, setVisible] = useState(false);
    const [gData, setGData] = useState([{
        key: 'all',
        title: <span>显示列表设置<span style={{ fontSize: 12, color: '#999' }}>（可上下拖动排序）</span></span>,
        children: [
            ...columns
        ]
    }]);

    const onVisibleChange = (e) => setVisible(e);

    const menuClass = classnames(
        styles['wrapper-title-tool-tableSetting'],
        'ant-dropdown-menu',
    );

    const onDrop = info => {
        if (info.node.key === 'all') {
            return;
        }
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };
        const data = [...gData];

        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
                // in previous version, we use item.children.push(dragObj) to insert the
                // item to the tail of the children
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }
        setGData(data);
        const targetKey = [];
        data[0]?.children?.forEach(val => {
            filterColnmnsKey.forEach(item => {
                if (val.key === item) {
                    targetKey.push(val.key);
                }
            });
        });
        setFilterColnmnsKey(targetKey);
    };
    const reset = () => {
        setFilterColnmnsKey(columns.map(val => val.key));
    };
    const onCheck = (checkedKeys) => {
        setFilterColnmnsKey(checkedKeys);
    };
    const menu = <div className={menuClass} >
        <Row className={styles['wrapper-title-tool-tableSetting-title']} justify="space-between" align="middle">
            <WrapperButton
                type={'primary'}
                size={'small'}
                onClick={reset}
            >
                重置
            </WrapperButton>
        </Row>
        <Divider className={styles['wrapper-title-tool-tableSetting-divider']} />

        <Tree
            className="table-setting-draggable-tree"
            draggable
            expandedKeys={['all']}
            blockNode
            checkedKeys={filterColnmnsKey}
            onCheck={onCheck}
            checkable
            selectable={false}
            allowDrop={(e) => e.dropPosition === 1}
            onDrop={onDrop}
            treeData={gData}
        />
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
