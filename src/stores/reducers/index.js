/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-08-09 13:10:12
 * @LastEditors: tanwei
 * @LastEditTime: 2020-11-27 10:43:09
 * @FilePath: /open-platform/src/stores/reducers/index.ts
 */

import { combineReducers } from 'redux';
import common from './commonReducer';

const reducer = combineReducers({
    common,
});
// ReturnType <typeof reducer>

export default reducer;