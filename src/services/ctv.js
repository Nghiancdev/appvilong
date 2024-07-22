import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const updateInfoCTV = data => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/collaborator/account`,
    'post',
    data,
  );
};

const requestPayment = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/collaborator/request_payment`,
    'post',
  );
};

const getGeneralInfoPaymentCtv = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/collaborator/info`,
    'get',
  );
};

const getPaymentCtvHistory = (page) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/collaborator/history_balace?page=${page}`,
    'get',
  );
};

const getReportRose = (page) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/collaborator/bonus?page=${page}`,
    'get',
  );
};

const getAllCollaborator = (page, date_from, date_to) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/collaborator/get_all_referral_ctv?page=${page}&date_from=${date_from}&date_to=${date_to}`,
    'get',
  );
};

const getInfoCTV = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/collaborator/account`,
    'get',
  );
};

const registerCtv = data => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/collaborator/reg`,
    'post',
    data,
  );
};

export const ctv = {
  getInfoCTV,
  getGeneralInfoPaymentCtv,
  getPaymentCtvHistory,
  getAllCollaborator,
  getReportRose,
  requestPayment,
  updateInfoCTV,
  registerCtv,
};
