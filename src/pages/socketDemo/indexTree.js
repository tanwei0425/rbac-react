/*
 * @Descripttion: 树节点最后一层单选
 * @Author: tanwei
 * @Date: 2020-09-05 19:19:29
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:28:21
 * @FilePath: /open-platform/src/pages/index/index.tsx
 */
import React, { useState } from 'react';
import { Tree, Radio } from 'antd';
const { TreeNode } = Tree;

const Index = (props) => {
    const [data, setData] = useState([
        { key: '0-0-2-0', value: '0-0-2-0-2' },
        { key: '0-2-0', value: '0-2-0-4' },
        { key: '0-0-1-0-0', value: '0-0-1-0-0-1' },
    ]);
    const radioStyle = {
        // display: 'block',
        // height: '30px',
        // lineHeight: '30px',
    };
    const treeData = [
        {
            title: '0-0',
            key: '0-0',
            // disabled: true,
            children: [
                {
                    title: '0-0-0',
                    key: '0-0-0',
                    // disabled: true,
                    children: [
                        {
                            title: '0-0-0-2',
                            key: '0-0-0-2',
                            // disabled: true,
                            children: [
                                {
                                    key: '0-0-0-2-0',
                                    title: <Radio.Group
                                        onChange={(e) => onChange('0-0-0-2-0', e)}
                                        value={data.filter(val => val.key === '0-0-0-2-0')[0]?.value}
                                    >
                                        <Radio style={radioStyle} value={'0-0-0-2-0-1'}>全部</Radio>
                                        <Radio style={radioStyle} value={'0-0-0-2-0-2'}>本部门</Radio>
                                        <Radio style={radioStyle} value={'0-0-0-2-0-3'}>本层级</Radio>
                                        <Radio style={radioStyle} value={'0-0-0-2-0-4'}>本地区</Radio>
                                    </Radio.Group>
                                },
                            ]
                        },
                    ],
                },
                {
                    title: '0-0-1',
                    key: '0-0-1',
                    // disabled: true,
                    children: [
                        {
                            title: '0-0-1-0',
                            key: '0-0-1-0',
                            // disabled: true,
                            children: [
                                {
                                    key: '0-0-1-0-0',
                                    title: <Radio.Group
                                        onChange={(e) => onChange('0-0-1-0-0', e)}
                                        value={data.filter(val => val.key === '0-0-1-0-0')[0]?.value}
                                    >
                                        <Radio style={radioStyle} value={'0-0-1-0-0-1'}>全部</Radio>
                                        <Radio style={radioStyle} value={'0-0-1-0-0-2'}>本部门</Radio>
                                        <Radio style={radioStyle} value={'0-0-1-0-0-3'}>本层级</Radio>
                                        <Radio style={radioStyle} value={'0-0-1-0-0-4'}>本地区</Radio>
                                    </Radio.Group>
                                },
                            ]
                        },
                    ],
                },
                {
                    title: '0-0-2',
                    key: '0-0-2',
                    // disabled: true,
                    children: [
                        {
                            key: '0-0-2-0',
                            title: <Radio.Group
                                onChange={(e) => onChange('0-0-2-0', e)}
                                value={data.filter(val => val.key === '0-0-2-0')[0]?.value}

                            >
                                <Radio style={radioStyle} value={'0-0-2-0-1'}>全部</Radio>
                                <Radio style={radioStyle} value={'0-0-2-0-2'}>本部门</Radio>
                                <Radio style={radioStyle} value={'0-0-2-0-3'}>本层级</Radio>
                                <Radio style={radioStyle} value={'0-0-2-0-4'}>本地区</Radio>
                            </Radio.Group>
                        },
                    ]
                },
            ],
        },
        {
            title: '0-2',
            key: '0-2',
            // disabled: true,
            children: [
                {
                    key: '0-2-0',
                    title: <Radio.Group
                        onChange={(e) => onChange('0-2-0', e)}
                        value={data.filter(val => val.key === '0-2-0')[0]?.value}
                    >
                        <Radio style={radioStyle} value={'0-2-0-1'}>全部</Radio>
                        <Radio style={radioStyle} value={'0-2-0-2'}>本部门</Radio>
                        <Radio style={radioStyle} value={'0-2-0-3'}>本层级</Radio>
                        <Radio style={radioStyle} value={'0-2-0-4'}>本地区</Radio>
                    </Radio.Group>
                },
            ]
        },
    ];
    const onChange = (pid, e) => {
        const value = e.target.value;
        console.log(pid, value, 'selectedKeys, e');
        const isFind = data.findIndex(val => pid === val.key);
        console.log(isFind, 'isFind');
        if (isFind === -1) {
            data.push({
                key: pid,
                value: value
            });
        } else {
            data.forEach(val => {
                if (pid === val.key) {
                    val.value = value;
                }
            });

        }
        setData([...data]);
    };
    console.log(data, 'dat1a');
    const renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} disabled={item.disabled} dataRef={item}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }

            return <TreeNode key={item.key} {...item} dataRef={item} />;
        });

    return (
        <Tree
            defaultExpandAll
            selectable={false}
        >
            {renderTreeNodes(treeData)}
        </Tree>
    );
};

export default Index;
