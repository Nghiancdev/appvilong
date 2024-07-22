import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const getBonusCustomer = product_id => {
  return callApi(
    (product_id ?? '') == ''
      ? `customer/${StoreCode.getStoreCode()}/bonus_products`
      : `customer/${StoreCode.getStoreCode()}/bonus_products?product_id=${
          product_id ?? ''
        }`,
    'get',
  );
};

export const actionTap = {
  getBonusCustomer,
};
