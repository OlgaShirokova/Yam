'use strict';

import { combineReducers } from 'redux';

import user from './user';
import recipes from './recipes'
const reducers = combineReducers({ user, recipes });

export default reducers;
