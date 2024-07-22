import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const getAllAddressCustomer = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/address`, 'get');
};

const createAddressCustomer = data => {
  return callApi(`customer/${StoreCode.getStoreCode()}/address`, 'post', data);
};

const updateAddressCustomer = (id, data) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/address/${id}`,
    'put',
    data,
  );
};

const deleteAddressCustomer = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/address/${id}`,
    'delete',
  );
};

const chargeShipmentFee = (data, id) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/carts/calculate_fee/${id}`,
    'post',
    {
      id_address_customer: data,
    },
  );
};

const getListShipper = data => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/shipment/list_shipper`,
    'post',
    {
      id_address_customer: data,
    },
  );
};


const getProvince = () => {
  return callApi(`place/vn/province`, 'get');
};

const getDistrict = idProvince => {
  return callApi(`place/vn/district/${idProvince}`, 'get');
};

const getWard = idDistrict => {
  return callApi(`place/vn/wards/${idDistrict}`, 'get');
};

export const address = {
  getAllAddressCustomer,
  createAddressCustomer,
  updateAddressCustomer,
  deleteAddressCustomer,
  chargeShipmentFee,
  getProvince,
  getDistrict,
  getWard,
  getListShipper,
};
