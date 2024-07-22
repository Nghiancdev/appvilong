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

class OrderCtvStore {
  navigation = useNavigation();

  isEnd = false;
  currentPage = 1;
  isLoading = false;
  loadInit = true;
  listOrder = [];
  tabCurrent = '';
  isClickTab = false;

  /// one order

  oneLoading = true;
  order = {};

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      loadInit: observable,
      listOrder: observable,
      tabCurrent: observable,
      isClickTab: observable,
      getAllOrder: action.bound,
      setTabCurrent: action.bound,
      setClickTab: action.bound,
      getAllOrderDeboucer: action.bound,
      /// one order
      oneLoading: observable,
      order: observable,
      getOneOrder: action.bound,
      cancelOrder: action.bound,
    });
  }
   nameToStatus = {
    'Chờ xử lý': ORDER_STATUS.WAITING_FOR_PROGRESSING,
    'Đang chuẩn bị hàng': ORDER_STATUS.PACKING,
    'Đang giao hàng': ORDER_STATUS.SHIPPING,
    'Đã hoàn thành': ORDER_STATUS.COMPLETED,
    'Đã nhận hàng': ORDER_STATUS.RECEIVED_PRODUCT,
    'Hết hàng': ORDER_STATUS.OUT_OF_STOCK,
    'Shop huỷ': ORDER_STATUS.USER_CANCELLED,
    'Khách đã huỷ': ORDER_STATUS.CUSTOMER_CANCELLED,
    'Lỗi giao hàng': ORDER_STATUS.DELIVERY_ERROR,
    'Chờ trả hàng': ORDER_STATUS.CUSTOMER_RETURNING,
    'Đã trả hàng': ORDER_STATUS.CUSTOMER_HAS_RETURNS,
    'Tất cả': ORDER_STATUS.ALL,
  };


  setTabCurrent = tab => {
    this.tabCurrent = tab;
  };

  setClickTab = isClickTab => {
    this.isClickTab = isClickTab;
  };

  getAllOrder = async (isRefresh, field_by_value, tab, isBack) => {
    if (isBack != true) {
      if (this.tabCurrent === tab) {
        return;
      }
      this.tabCurrent = tab;
    }
   
    if (isRefresh === true) {
      this.currentPage = 1;
      this.isEnd = false;
      this.loadInit = true;
    }
    try {
      if (this.isEnd === false) {
        this.isLoading = true;
        const data = await RepoManager.orderCtv.getOrderHistory(
          this.currentPage,
          '',
          'order_status_code',
          field_by_value ?? this.nameToStatus[this.tabCurrent],
        );

        if (isRefresh === true) {
          this.listOrder = data.data.data?.data;
        } else {
          this.listOrder.push(...data.data.data?.data);
        }

        if (data.data?.data?.next_page_url === null) {
          this.isEnd = true;
        } else {
          this.isEnd = false;
          this.currentPage = this.currentPage + 1;
        }
        this.loadInit = false;
      }
      this.isLoading = false;
     
    } catch (err) {
      console.log('err', err);
    }
  };

  getOneOrder = async orderCode => {
    this.oneLoading = true;
    try {
      const res = await RepoManager.order.getOneOrder(orderCode);
      this.order = res.data?.data;
      console.log('this.order', res.data?.data);
      console.log('this.order', this.order);
    } catch (err) {
      toast.erorr(err);
    }
    this.oneLoading = false;
  };

  cancelOrder = async (orderCode, reasonCancel) => {
    this.oneLoading = true;
    try {
      const res = await RepoManager.order.cancelOrder({
        order_code: orderCode,
        note: reasonCancel,
      });
      this.order = res.data?.data;
      console.log('this.order', res.data?.data);
      console.log('this.order', this.order);
    } catch (err) {
      toast.erorr(err);
    }
    this.oneLoading = false;
  };

  getAllOrderDeboucer(isRefresh, field_by_value, tab, isBack) {
    this.debouncedUpdateItemCart(isRefresh, field_by_value, tab, isBack);
  }

  debouncedUpdateItemCart = _.debounce((isRefresh, field_by_value, tab) => {
    this.getAllOrder(isRefresh, field_by_value, tab);
  }, 10);
}

const orderCtvStore = new OrderCtvStore();

export const orderCtvStoreContext = React.createContext(orderCtvStore);
export const useOrderCtvStore = () => React.useContext(orderCtvStoreContext);
