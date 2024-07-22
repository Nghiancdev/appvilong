import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const getAllNoti = page => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/notifications_history?page=${page}`,
    'get',
  );
};

const readAllNotification = page => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/notifications_history/read_all`,
    'get',
  );
};

export const noti = {
  getAllNoti,
  readAllNotification,
};
