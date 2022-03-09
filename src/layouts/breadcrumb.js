/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-09-06 17:39:30
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-13 15:37:15
 * @FilePath: /open-platform/src/layouts/breadcrumb.tsx
 */
import React, { memo } from "react";
import { Breadcrumb, PageHeader } from "antd";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import _ from 'lodash';
import styles from '@/layouts/layouts.module.less';


const findParent = (menu = [], all, arr = []) => {
  menu && arr.unshift(menu);
  const parent = all.find((val) => val.id === menu?.pid);
  parent && findParent(parent, all, arr);
  return arr;
};

const itemRender = (route) => route.href ? <Link to={route.path}>{route.breadcrumbName}</Link> : <span>{route.breadcrumbName}</span>;

const TBreadcrumb = (props) => {
  const location = useLocation();
  const { menusList, navigationMode } = useSelector((state) => state.common);
  const menusListData = _.cloneDeep(menusList);
  const allPathname = Object.fromEntries(menusListData.map(menu => [menu.path, menu]));
  const targetMenuList = findParent(allPathname[location.pathname], menusListData);
  let routes = [];

  if (!navigationMode?.breadcrumb) {
    routes = targetMenuList.map((val, index) => {
      val.breadcrumbName = val.name;
      // 第一个面包屑、最后一个面包屑和栏目的面包屑不能点击
      index !== 0 && targetMenuList.length - 1 !== index && val.isRouter === '1' && (val.href = true);
      return _.pick(val, ['breadcrumbName', 'path', 'href']);
    });
  }

  const BreadcrumbComplexClassName = classnames(
    styles['t-layout-info-breadcrumbComplex'],
    navigationMode?.fixedHeader && styles['t-layout-info-breadcrumbComplexTop'],
  );

  const BreadcrumbClassName = classnames(
    styles['t-layout-info-breadcrumb'],
    navigationMode?.fixedHeader && styles['t-layout-info-breadcrumbTop'],
  );
  return (
    navigationMode?.breadcrumb ?
      <div className={BreadcrumbClassName}>
        <Breadcrumb>
          {targetMenuList.map(
            bread => {
              return <Breadcrumb.Item key={bread.id}>
                {bread.name}
              </Breadcrumb.Item>;
            }
          )}
        </Breadcrumb>
      </div> :
      <div className={BreadcrumbComplexClassName}>
        <PageHeader
          ghost={false}
          title={Array.isArray(routes) && routes.length > 0 && routes[routes?.length - 1]?.breadcrumbName}
          breadcrumb={{ routes, itemRender }}
        />
      </div>
  );
};

export default memo(TBreadcrumb);