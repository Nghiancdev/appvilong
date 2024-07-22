import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';


const getAllPersonChat = (page, search) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/person_chat?page=${page}&search=${search}`,
    'get',
  );
};


export const chat = {
  getAllPersonChat,
};
