import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const getScoreHistory = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/point_history`, 'get');
};

const getRewardPointCtm = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/reward_points`, 'get');
};
const getLayout = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/home_app/layouts`,
    'get',
  );
};

const getAppTheme = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/app-theme`, 'get');
};

const getBanner = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/home_web/banners`,
    'get',
  );
};

const getHomeButton = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/home_app/buttons`,
    'get',
  );
};

const getAllCategory = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/categories`, 'get');
};

const getBadge = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/badges`, 'get');
};

const getProductDiscount = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/home_web/product_discounts`,
    'get',
  );
};

const getProductNews = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/home_web/product_news`,
    'get',
  );
};

const getProductTopSales = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/home_web/product_top_sales`,
    'get',
  );
};

const getPopup = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/home_web/ads`, 'get');
};

const getBannerAdsApp = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/home_app/ads`, 'get');
};

const getProductByCategory = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/home_web/product_by_category`,
    'get',
  );
};

const getInfoCustomer = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/profile`, 'get');
};

const getPostNew = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/home_web/posts_new`,
    'get',
  );
};

const login = data => {
  return callApi(`customer/${StoreCode.getStoreCode()}/login`, 'post', data);
};

const resetPassword = data => {
  return callApi(`customer/${StoreCode.getStoreCode()}/reset_password`, 'post', data);
};

const tokenDevice = data => {
  return callApi(`customer/${StoreCode.getStoreCode()}/device_token_customer`, 'post', data);
};

const checkExists = data => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/login/check_exists`,
    'post',
    data,
  );
};

const registerAccount = data => {
  return callApi(`customer/${StoreCode.getStoreCode()}/register`, 'post', data);
};

const sendOtp = data => {
  return callApi(`send_otp`, 'post', data);
};

const sendEmailOtpCus = data => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/send_email_otp`,
    'post',
    data,
  );
};

export const dataApp = {
  getLayout,
  getAppTheme,
  getBanner,
  getHomeButton,
  getAllCategory,
  getProductDiscount,
  getProductNews,
  getPopup,
  getBannerAdsApp,
  getProductTopSales,
  getBadge,
  getProductByCategory,
  getInfoCustomer,
  getPostNew,
  login,
  resetPassword,
  registerAccount,
  checkExists,
  getScoreHistory,
  getRewardPointCtm,
  sendOtp,
  sendEmailOtpCus,
  tokenDevice,
};
