// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import Toast from 'react-native-toast-message';
import {useDataAppStore} from './DataAppStore';
import _ from 'lodash';
import {toast} from '../utils/apis/toast';
import {CART, ORDER_STATUS} from '../constants';
import UserUtil from '../utils/apis/userUtil';
import {useNavigation} from '@react-navigation/native';
import {validateEmail} from '../utils/apis/stringUtil';
import {set} from 'date-fns';

class CodeRetroduceStore {
  navigation = useNavigation();

  isEnd = false;
  currentPage = 1;
  isLoading = false;
  loadInit = true;
  listInfoCustomer = [];

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      loadInit: observable,
      listInfoCustomer: observable,
      getAllReferral: action.bound,
    });
  }
  getAllReferral = async (isRefresh = false) => {
    if (isRefresh === true) {
      this.currentPage = 1;
      this.isEnd = false;
    }

    try {
      if (!this.isEnd) {
        var res = await RepoManager.retroduce.getAllReferral(this.currentPage);
        var list = res.data.data.data;
        this.isLoading = true;

        if (isRefresh == true) {
          this.listInfoCustomer = list;
        } else {
          this.listInfoCustomer.push(...list);
        }

        if (res?.data?.data?.next_page_url == null) {
          this.isEnd = true;
        } else {
          this.isEnd = false;
          this.currentPage = this.currentPage + 1;
        }
      }
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.loadInit = false;
  };
}

const codeRetroduceStore = new CodeRetroduceStore();

export const codeRetroduceStoreContext =
  React.createContext(codeRetroduceStore);
export const useCodeRetroduceStore = () =>
  React.useContext(codeRetroduceStoreContext);
