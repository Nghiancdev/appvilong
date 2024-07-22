import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const updateInfoCTV = data => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/agency/account`,
    'post',
    data,
  );
};

const requestPayment = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/agency/request_payment`,
    'post',
  );
};

const getGeneralInfoPaymentCtv = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/agency/info`,
    'get',
  );
};

const getPaymentCtvHistory = (page) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/agency/history_balace?page=${page}`,
    'get',
  );
};

const getReportRose = (page) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/agency/bonus?page=${page}`,
    'get',
  );
};

const getAllCollaborator = (page, date_from, date_to) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/agency/get_all_referral_agency?page=${page}&date_from=${date_from}&date_to=${date_to}`,
    'get',
  );
};

const getInfoCTV = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/agency/account`,
    'get',
  );
};

const registerCtv = data => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/agency/reg`,
    'post',
    data,
  );
};

export const agency = {
  getInfoCTV,
  getGeneralInfoPaymentCtv,
  getPaymentCtvHistory,
  getAllCollaborator,
  getReportRose,
  requestPayment,
  updateInfoCTV,
  registerCtv,
};
