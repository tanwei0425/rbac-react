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
//设置多级菜单默认展开数组
const setMenuOpenKeys = pathname => {
    const pathnames = pathname
        .split('/')
        .filter(v => v)
        .map(s => '/' + s);
    pathnames.pop();
    const temp = [];
    return pathnames.reduce((a, c) => {
        temp.push(a + c);
        return temp;
    }, temp);
};

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
        console.log(keys, 'keys');
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
        console.log(menusList, 'menusList');
        const newMenuTree = arrayToTree(menusList);
        console.log(newMenuTree, 'newMenuTree');
        const showMenuTree = newMenuTree?.filter(val => val.isShow === '1');
        console.log(showMenuTree, 'showMenuTree');
        setMenuTree(showMenuTree);
    }, []);

    useEffect(() => {
        // 非菜单路由选中父菜单
        const target = menusList.filter(val => val.path === pathname)[0]?.isShow === '1';
        setSelectedKeys(target ? [pathname] : [openKeys[openKeys.length - 1]]);
    }, [collapsed, openKeys, pathname, menusList]);

    useEffect(() => {
        // 展开菜单
        setOpenKeys(setMenuOpenKeys(pathname));
    }, [collapsed, pathname]);

    useEffect(() => {
        // 可折叠项菜单
        const target = menusTree.filter(val => val.children).map(val => val.path);
        setRootSubmenuKeys(target);
    }, [menusList]);
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