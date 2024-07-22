import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const getComboCustomer = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/combos`, 'get');
};

export const combo = {
  getComboCustomer,
};
