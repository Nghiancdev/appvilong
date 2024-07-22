import StoreCode from '../singletons/StoreCode';
import {callApi} from '../utils/apis';
const getAllNews = (search, category_ids, descending, sort_by) => {
    return callApi(
        `customer/${StoreCode.getStoreCode()}/posts?=&search=${search ?? ""}&category_ids=${category_ids ?? ''}&descending=${descending ?? ''}&sort_by=${sort_by ?? ""}`,
        'get'
    )
}

const getAllCategoryNews = () => {
    return callApi(
        `customer/${StoreCode.getStoreCode()}/post_categories`,
        'get'
    )
}

const getOneNew = (newId) => {
    return callApi(
        `customer/${StoreCode.getStoreCode()}/posts/${newId}`,
        'get'
    )
}

export const news = {
    getAllNews,
    getAllCategoryNews,
    getOneNew
};
