import React, { useState, memo, createElement, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from "antd";
import { useSelector } from 'react-redux';
import _ from 'lodash';
import * as Icon from '@ant-design/icons';
import classnames from 'classnames';
import { arrayToTree } from "@/utils/utils";
import styles from '@/layouts/layouts.module.less';

const { SubMenu } = Menu;

const Menus = ({ collapsed }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { menusList, navigationMode } = useSelector((state) => state.common);
    const [menusTree, setMenuTree] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [rootSubmenuKeys, setRootSubmenuKeys] = useState([]);
    const defaultProps = collapsed ? {} : { openKeys };
    // 渲染图标
    const renderIcon = (title) => Icon[title] && createElement(Icon[title]);

    // 只展开当前父级菜单
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    // menu渲染
    const render = (menus) => {
        return menus.map((menu) => {
            const targetMenu = _.filter(menu?.children, { isShow: '1' });
            if (menu?.children && targetMenu.length > 0) {
                return (
                    <SubMenu
                        key={menu.path}
                        title={<span>{menu.name}</span>}
                        icon={menu.icon && renderIcon(menu.icon)}
                    >
                        {render(menu?.children)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item
                        key={menu.path}
                        icon={menu.icon && renderIcon(menu.icon)}
                        onClick={_ => menu.path && navigate(menu.path)}
                    >
                        <span>{menu.name}</span>
                    </Menu.Item>
                );
            }
        });
    };

    useEffect(() => {
        const newMenuTree = arrayToTree(menusList);
        const showMenuTree = newMenuTree?.filter(val => val.isShow === '1');
        setMenuTree(showMenuTree);
    }, []);

    const filterFatherSelectedKeys = (path, arr = []) => {
        const nowRoter = menusList.find(item => item.path === path);
        if (nowRoter?.isShow === '0') {
            menusList.forEach(val => {
                if (val.id === nowRoter.pid && val?.path) {
                    val.isShow === '1' ? arr.push(val.path) : filterFatherSelectedKeys(val.path, arr);
                }
            });
        } else {
            arr.push(path);
        }
        return arr;
    };

    const filterFatherOpenKeys = (targetData, dataSource, targetOpenKeys = []) => {
        if (targetData?.pid && targetData?.path && targetData.pid !== 0) {
            const newData = dataSource.find(val => val.id === targetData.pid);
            // 只有在栏目下(isRouter === 0)，添加
            // rootSubmenuKeys.includes(newData?.path) && targetOpenKeys.push(newData.path);
            targetOpenKeys.push(newData.path);
            return filterFatherOpenKeys(newData, dataSource, targetOpenKeys);
        } else {
            return targetOpenKeys;
        }
    };

    useEffect(() => {
        // 非菜单路由选中父菜单
        const selectedKeys = filterFatherSelectedKeys(pathname);
        setSelectedKeys(selectedKeys);
    }, [collapsed, openKeys, menusList]);


    useEffect(() => {
        // 可折叠项菜单
        const target = menusTree.filter(val => val.children).map(val => val.path);
        setRootSubmenuKeys(target);
    }, [menusList]);

    useEffect(() => {
        // pathname查找当前数据
        const nowData = menusList.find(val => val.path === pathname);
        // 根据数据递归找到所有父级
        const openKeys = filterFatherOpenKeys(nowData, menusList);
        // 展开菜单
        setOpenKeys(openKeys);
    }, [collapsed, pathname]);


    const TMenuTriggerClass = classnames(
        styles['t-layout-sider-menu'],
        navigationMode?.menuTrigger && styles['t-layout-sider-menuTrigger']
    );
    return (
        <Menu
            mode="inline"
            theme={navigationMode?.overallStyle}
            style={{ width: '100%' }}
            className={TMenuTriggerClass}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            {...defaultProps}
        >
            {render(menusTree)}
        </Menu>
    );
};

export default memo(Menus);