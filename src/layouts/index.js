/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-08-17 11:16:20
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-13 12:44:10
 * @FilePath: /open-platform/src/layouts/index.tsx
 */
import React, { memo } from "react";
import { Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import { collapsedClick } from '@/stores/actions/commonAction';
import { ColorChangeLogo } from '@/components/Logo';
import MyHeader from '@/layouts/header';
import Breadcrumb from "@/layouts/breadcrumb";
import Setting from "@/layouts/setting";
import Menus from '@/layouts/menus';
import styles from '@/layouts/layouts.module.less';
import config from '@/config';
const { Content, Header, Sider } = Layout;

const UseLayout = () => {
  const { collapsed, navigationMode } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const onCollapse = () => dispatch(collapsedClick(!collapsed));

  const FixedHeaderClass = classnames(
    styles['t-layout-info-header'],
    navigationMode?.fixedHeader && styles['t-layout-info-fixedHeader'],
    navigationMode?.fixedHeader && collapsed && styles['t-layout-info-fixedHeaderCollapsed'],
  );

  const ContentDivClass = classnames(
    styles['t-layout-info-content-div'],
    navigationMode?.breadcrumb && styles['t-layout-info-content-divComplex']
  );

  const LogoTitleClass = classnames(
    styles['t-layout-sider-logo-title'],
    navigationMode?.overallStyle === 'dark' && styles['t-layout-sider-logo-titleDark']
  );

  const IconDarkClass = classnames(
    styles['t-layout-trigger-icon'],
    navigationMode?.overallStyle === 'dark' && styles['t-layout-trigger-iconDark']
  );

  const TriggerClass = classnames(
    styles['t-layout-sider-trigger'],
    navigationMode?.overallStyle === 'dark' && styles['t-layout-sider-triggerDark']
  );
  return (
    <Layout className={styles['t-layout']} >
      <Sider
        theme={navigationMode?.overallStyle}
        className={styles['t-layout-sider']}
        trigger={null}
        collapsible
        collapsedWidth={62}
        collapsed={collapsed}
        width={220}
      >
        <div className={styles['t-layout-sider-logo']}>
          <ColorChangeLogo className={styles['t-layout-sider-logo-svg']} />
          {!collapsed && <h1 className={LogoTitleClass}>{config?.menuTitle}</h1>}
        </div>
        <Menus collapsed={collapsed} />
        {!navigationMode?.menuTrigger &&
          <div className={TriggerClass}>
            <span
              className={IconDarkClass}
              onClick={onCollapse}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>}
      </Sider>
      <Layout className={styles['t-layout-info']} >
        <Header className={FixedHeaderClass}>
          <MyHeader />
        </Header>
        <Breadcrumb />
        <Content className={styles['t-layout-info-content']}>
          <div className={ContentDivClass}>
            <Outlet />
          </div>
        </Content>
      </Layout>
      {navigationMode?.displaySystemConfig && <Setting />}
    </Layout>
  );
};

export default memo(UseLayout);

