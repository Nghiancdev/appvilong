import { da } from 'date-fns/locale';
import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const getOrderHistory = (page, search, field_by, field_by_value) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/carts/orders?page=${page}&search=${search}&field_by=${field_by}&field_by_value=${field_by_value}`,
    'get',
  );
};

const getOneOrder = (orderCode) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/carts/orders/${orderCode}`,
    'get',
  );
};

const cancelOrder = (data) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/carts/orders/cancel`,
    'post',
    data,
  );
};

const review = (idProduct, data) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/products/${idProduct}/reviews`,
    'post',
    data,
  );
};

export const order = {
  getOrderHistory,
  getOneOrder,
  cancelOrder,
  review,
};
