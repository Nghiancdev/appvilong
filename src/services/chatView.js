import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';


const getAllMessageCustomer = (page, search) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/messages?page=${page}`,
    'get',
  );
};

const sendMessageToUser = (data) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/messages`,
    'post',
    data
  );
};


export const chatView = {
  getAllMessageCustomer,
  sendMessageToUser,
};
