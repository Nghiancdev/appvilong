import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';

const getAllFavorite = page => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/favorites?page=${page}`,
    'get',
  );
};

const getAllPurchasedProducts = page => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/purchased_products?page=${page}`,
    'get',
  );
};
const getProductDetail = id => {
  return callApi(`customer/${StoreCode.getStoreCode()}/products/${id}`, 'get');
};

const favoriteProduct = (id, is_favorite) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/products/${id}/favorites`,
    'post',
    {is_favorite: is_favorite},
  );
};

const getReviewProduct = (id, filterBy, filterByValue, hasImage) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/products/${id}/reviews?filter_by=${filterBy}&filter_by_value=${filterByValue}&has_image=${hasImage}`,
    'get',
  );
};

const getSimilarProduct = id => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/products/${id}/similar_products`,
    'get',
  );
};

const getWatchedProduct = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/watched_products`,
    'get',
  );
};

const get10HistorySearch = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/search_histories`,
    'get',
  );
};

const getComboCustomer = () => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/combos`,
    'get',
  );
};

const getBonusCustomer = (product_id) => {
  return callApi(
    `customer/${StoreCode.getStoreCode()}/bonus_products?product_id=${product_id}`,
    'get',
  );
};



const searchProduct = obj => {
  const objectToQueryString = obj => {
    return Object.keys(obj)
      .map(key => {
        const value = obj[key];
        if (value !== null && value !== undefined) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        } else {
          return ''; // Nếu giá trị là null hoặc undefined, chuyển thành chuỗi trống
        }
      })
      .filter(param => param !== '') // Loại bỏ các trường rỗng
      .join('&');
  };
  const params = objectToQueryString(obj);
  return callApi(
    `customer/${StoreCode.getStoreCode()}/products?${params}`,
    'get',
  );
};

const getAllCategory = () => {
  return callApi(`customer/${StoreCode.getStoreCode()}/categories`, 'get');
};

export const product = {
  getProductDetail,
  favoriteProduct,
  getReviewProduct,
  getSimilarProduct,
  searchProduct,
  getAllCategory,
  get10HistorySearch,
  getAllPurchasedProducts,
  getAllFavorite,
  getWatchedProduct,
  getComboCustomer,
  getBonusCustomer,
};
