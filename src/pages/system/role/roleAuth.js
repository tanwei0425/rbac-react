import React, { useEffect, useState, useImperativeHandle } from 'react';
import WrapperTree from '@/components/WrapperTree';
import { Row, Col, Spin } from 'antd';
import { treeFind } from '@/utils/utils';
import styles from './index.module.less';
const Index = ({ allMenuElementApiData, roleAuthDetailData, roleAuthRef, loading }) => {
    const [checkableMenus, setCheckableMenus] = useState([]);
    const [halfCheckedKeysMenus, setHalfCheckedKeysMenus] = useState([]);
    const [checkableApis, setCheckableApis] = useState([]);
    const [checkableElements, setCheckableElements] = useState([]);
    const [allElements, setAllElement] = useState([]);
    const [allApis, setAllApis] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    useEffect(() => {
        const menusDetailsData = roleAuthDetailData?.menus || [];
        setCheckableMenus(menusDetailsData);
        setCheckableElements(roleAuthDetailData?.elements || []);
        setCheckableApis(roleAuthDetailData?.apis || []);
        eleShow(roleAuthDetailData?.menus, 'elements');
        eleShow(roleAuthDetailData?.menus, 'apis');
        // 控制元素和接口树展开
        setExpandedKeys([0, "public", ...menusDetailsData]);
    }, [roleAuthDetailData]);
    const onCheckMenu = (checkedKeys, e) => {
        setCheckableMenus(checkedKeys);
        setHalfCheckedKeysMenus(e.halfCheckedKeys);
        // 选中的时候清空全部，解除页面看着默认选中，但实际数据并没有选中的问题
        if (e.checked) {
            const clearCheckableRemoveElements = checkableElements?.filter(val => val !== 0);
            const clearCheckableRemoveApis = checkableApis?.filter(val => val !== 0);
            setCheckableElements(clearCheckableRemoveElements);
            setCheckableApis(clearCheckableRemoveApis);
        }
        // 渲染元素权限和接口权限（key都是permissionId）
        eleShow(checkedKeys, 'elements', e.checked === false);
        eleShow(checkedKeys, 'apis', e.checked === false);
        // 控制元素和接口树展开
        setExpandedKeys([0, "public", ...checkedKeys]);
    };

    // const treeRes = (data) => {
    //     console.log(data, 'data');
    // data.forEach(item => {
    //     const a = treeRes(item);
    // });
    // };
    const eleShow = (targetMenus = [], type, menuClickStatus) => {
        const menuIdArr = [];
        // 因为key不能用各自元素、接口、菜单的id（不是同一张表，id会重复，所以用的是permissionId为key）
        // 根据permissionId找到menuId
        console.log(allMenuElementApiData['menus'], 'allMenuElementApiData[]');
        // const newTargetMenus = targetMenus.map(val => {
        //     treeRes(allMenuElementApiData['menus']);
        // });

        // 
        const targetElements = allMenuElementApiData[type]?.filter(val => {
            if (targetMenus.includes(val?.menuId) && val?.menuId !== 0 && !menuIdArr.includes(val?.menuId)) menuIdArr.push(val?.menuId);
            return targetMenus.includes(val?.menuId);
        });

        const targetMenuElements = findElementsFatherMenu(targetElements, menuIdArr);
        const publicType = type === 'elements' ? allMenuElementApiData?.publicElements : allMenuElementApiData?.publicApis;
        const publicData = [];
        if (publicType?.length > 0) {
            publicData.push({
                key: 'public',
                title: '公共',
                children: [...publicType]
            });
        }
        const data = [{
            key: 0,
            title: '全部',
            children: [...publicData, ...targetMenuElements]
        }];
        if (type === 'elements') setAllElement(data);
        if (type === 'apis') setAllApis(data);
        // 取消菜单的时候清空元素和接口中值不存在的选中的值
        if (menuClickStatus) {
            const allRenderKey = getNowEleVal(data);
            const checkableData = type === 'elements' ? checkableElements : checkableApis;
            const newCheckableElements = checkableData?.filter(val => allRenderKey.includes(val));
            type === 'elements' ? setCheckableElements(newCheckableElements) : setCheckableApis(newCheckableElements);
        }
    };
    const getNowEleVal = (data, resArr = []) => {
        data?.forEach(val => {
            if (val.children && val.children.length > 0) {
                resArr.push(val.key);
                return getNowEleVal(val.children, resArr);
            }
            resArr.push(val.key);
        });
        return resArr;
    };

    const findElementsFatherMenu = (targetElements, menuIdArr) => {
        const targetMenuElements = menuIdArr.map(val => {
            const targetMenu = treeFind(allMenuElementApiData?.menus, (item) => item.key === val);
            return targetMenu && {
                key: targetMenu.key,
                title: targetMenu.title,
                children: targetElements?.filter(item => targetMenu.key === item.menuId)
            };
        })?.filter(val => val);
        return targetMenuElements;
    };
    /**
     * useImperativeHandle 使用 ref 时自定义暴露给父组件的实例值
     */
    useImperativeHandle(roleAuthRef, () => ({
        checkableMenus,
        checkableElements,
        checkableApis,
        halfCheckedKeysMenus,
    }));
    return (
        <Spin spinning={loading}>
            <Row gutter={16}>
                <Col span={8}>
                    <div className={styles['t-role-auth']}>
                        <p className={styles['t-role-auth-title']}>菜单权限</p>
                        {allMenuElementApiData?.menus?.length > 0 && <WrapperTree
                            className={styles['t-role-auth-content']}
                            checkable
                            selectable={false}
                            onCheck={(checkedKeys, e) => onCheckMenu(checkedKeys, e)}
                            checkedKeys={checkableMenus}
                            treeData={allMenuElementApiData?.menus || []}
                        />}
                    </div>
                </Col>
                <Col span={8}>
                    <div className={styles['t-role-auth']}>
                        <p className={styles['t-role-auth-title']}>元素权限</p>
                        {allMenuElementApiData?.elements?.length > 0 && <WrapperTree
                            className={styles['t-role-auth-content']}
                            checkable
                            expandedKeys={expandedKeys}
                            checkedKeys={checkableElements}
                            selectable={false}
                            onCheck={(e) => {
                                setCheckableElements(e);
                            }}
                            treeData={allElements}
                        />}
                    </div>
                </Col>
                <Col span={8}>
                    <div className={styles['t-role-auth']}>
                        <p className={styles['t-role-auth-title']}>接口权限</p>
                        {allMenuElementApiData?.apis?.length > 0 && <WrapperTree
                            className={styles['t-role-auth-content']}
                            checkable
                            expandedKeys={expandedKeys}
                            checkedKeys={checkableApis}
                            selectable={false}
                            onCheck={(e) => setCheckableApis(e)}
                            treeData={allApis}
                        />}
                    </div>
                </Col>
            </Row>
        </Spin>
    );
};

export default Index;
