import { parse } from 'qs';
import moment from 'moment';
/**
 * 判断是否为空
 * @param val
 * @returns {boolean}
 */
function validateNull(val) {
  if (typeof val === 'boolean') {
    return false;
  }
  if (typeof val === 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
  }
  return false;
}

/**
 * 自定义区间随机数
 * @param {*} start 
 * @param {*} end 
 */
function getRandomNumberByRange(start = 1, end = 99999999999) {
  return Math.floor(Math.random() * (end - start) + start) + '';
}

/*
* 树形结构反查父节点
* */
function treeFindPath(tree, func, path = []) {
  if (!tree) return [];
  for (const data of tree) {
    // 这里按照你的需求来存放最后返回的内容吧
    path.push(data.name);
    if (func(data)) return path;
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path);
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
}

/**
 * 
 * @param {*} dataSource  arr  数据源
 * @param {*} target  arr or string 匹配目标
 * @returns 传入值为arr,返回类似{authA:ture,authB:false}的对象，传入值为string直接返回true/false
 */
const authority = ({ dataSource = [], target }) => {
  if (Array.isArray(target)) {
    const authorityRes = {};
    target.forEach(item => {
      authorityRes[item] = dataSource.includes(item);
    });
    return authorityRes;
  }
  if (typeof target === "string") {
    return dataSource.includes(target);
  }
  return false;
};

/**
 * 数组转树结构
 * @param {*} list 
 * @param {*} pid 
 */
function arrayToTree(list, pid = 0) {
  const tree = list.filter(item => {
    // console.log(item, 'item');
    return item.pid === pid;
  }).map(item => {
    // console.log(item, 'item');
    return {
      ...item,
      children: arrayToTree(list, item.id),
    };
  });
  tree.forEach(val => validateNull(val.children) && delete val.children);
  return tree || [];
}

/**
 * 树转数组结构
 * @param {*} list 
 * @param {*} newArr 
 */
function treeToArray(list, newArr = []) {
  list.forEach((item) => {
    const { children } = item;
    if (children) {
      delete item.children;

      if (children.length) {
        newArr.push(item);
        return treeToArray(children, newArr);
      }
    }
    newArr.push(item);
  });
  return newArr;
}

/**
 * 获取localStorage的key
 * @param key
 */
const getLocalStorageItem = (key) => {
  return localStorage.getItem(key) || '';
};

/**
 * 设置localStorage的值
 * @param key
 * @param value
 */
const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};

/**
 * 清空localStorage
 */
const clearAllLocalStorage = () => {
  localStorage.clear();
};

/**
 * 获取url参数
 * @param search
 */
function urlQuery(search) {
  return parse(search?.replace('?', ''));
}

/**
 * 数组更换key value的值（用于数据字典）
 * @param {*} data  //数据源
 * @param {*} reservedElement //是否保留多余元素
 * @param {*} formatValue //要修改的title和value
 * @param {*} resFormat //要返回的title和value
 * @returns 
 */
const formatOptions = (data = [], formatValue = { title: 'key', value: 'value' }, resFormat = { title: 'label', value: 'value' }, reservedElement = false) => {
  const formatOptions = data?.map(val => {
    const oldTitle = formatValue?.title;
    const oldValue = formatValue?.value;
    const newTitle = resFormat.title;
    const newValue = resFormat.value;
    let resObj = {
      [newValue]: val[oldValue],
      [newTitle]: val[oldTitle],
    };
    if (reservedElement) {
      resObj = { ...val, ...resObj, };
      delete resObj[oldTitle];
      delete resObj[oldValue];
    }
    return resObj;
  });
  return formatOptions || [];
};

/**
 * treeSelect 格式化树key
 * @param treeNodeArr 转化的数组
 * @param recursionBasis 递归的目标 默认children
 * @param formatValue title：需要转为title的参数，value：需要转化为value的参数
 * @param targetDisabled 需要禁用的值
 * @param reservedElement 是否保留多余元素
 */

const formatTreeSelect = (treeNodeArr, formatValue, recursionBasis = 'children', resFormatTitle = 'title', resFormatValue = 'value', reservedElement = false, targetDisabled) => {

  const formatTreeSelectObj = (treeNodeObj) => {
    const haveChildren = Array.isArray(treeNodeObj[recursionBasis]) && treeNodeObj[recursionBasis].length > 0;
    const title = treeNodeObj[formatValue?.title];
    const value = treeNodeObj[formatValue?.value];
    let newTreeNodeObj = {
      [resFormatTitle]: title,
      [resFormatValue]: value,
      children: haveChildren && treeNodeObj[recursionBasis].map((val) => formatTreeSelectObj(val, formatValue, recursionBasis, targetDisabled, resFormatValue))
    };
    if (reservedElement) {
      newTreeNodeObj = {
        ...treeNodeObj,
        ...newTreeNodeObj,
      };
      delete newTreeNodeObj[formatValue?.title];
      delete newTreeNodeObj[formatValue?.value];
    }
    const targetDisabledOne = Array.isArray(targetDisabled) && targetDisabled?.includes(value);
    const targetDisabledTwo = typeof targetDisabled === "string" && targetDisabled === value;
    if (targetDisabledOne || targetDisabledTwo) {
      newTreeNodeObj.disabled = true;
      delete newTreeNodeObj[recursionBasis];
    }
    !haveChildren && delete newTreeNodeObj[recursionBasis];
    return newTreeNodeObj;
  };
  const newTreeNodeArr = treeNodeArr?.map((val) => formatTreeSelectObj(val));
  return newTreeNodeArr || [];
};

/**
 * removeTreeEmptyChildren 去除空children（后端说去不了 - -！） 
 * @param treeNodeObj 转化的对象
 * @param recursionBasis 递归的目标 默认children
 * @returns 
 */
const removeTreeEmptyChildren = (treeNodeObj, recursionBasis = 'children',) => {
  const haveChildren = Array.isArray(treeNodeObj[recursionBasis]) && treeNodeObj[recursionBasis].length > 0;
  if (haveChildren) {
    treeNodeObj[recursionBasis].map((item) => removeTreeEmptyChildren(item));
  } else {
    delete treeNodeObj[recursionBasis];
  }
  return treeNodeObj;
};

/**
 * 列表字典翻译
 * @param {*} dictData // 数据源
 * @param {*} target // 目标值
 */
const tableColumnToDict = (dictData, target) => {
  if (!dictData || !target || !Array.isArray(dictData)) return target;
  const text = dictData?.find(val => val?.key === target)?.value;
  return text;
};

/**
 * 
 * @param {*} target UTC时间
 * @param {*} formatType // 转换的类型
 */
const dateTimeFormat = (target, formatType = 'YYYY-MM-DD HH:mm:ss') => {
  if (!target) return;
  const res = moment(target).format(formatType);
  return res;
};

/**
 * 
 * @param {*} tree 数据源
 * @param {*} func 传入一个函数用于判断节点是否符合条件
 * @returns 
 */
const treeFind = (tree, func) => {
  for (const data of tree) {
    if (func(data)) return data;
    if (data.children) {
      // eslint-disable-next-line no-unused-vars
      const res = treeFind(data?.children, func);
      if (res) return res;
    }
  }
  return null;
};
export {
  getRandomNumberByRange,
  treeFindPath,
  authority,
  validateNull,
  arrayToTree,
  treeToArray,
  getLocalStorageItem,
  setLocalStorageItem,
  clearAllLocalStorage,
  urlQuery,
  formatTreeSelect,
  removeTreeEmptyChildren,
  tableColumnToDict,
  dateTimeFormat,
  formatOptions,
  treeFind,
};
