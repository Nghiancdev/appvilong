import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const getAllReferral = page => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/profile/get_all_referral?page=${page}`,
    'get',
  );
};

export const retroduce = {
  getAllReferral,
};
