// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';

class ProductStore {
  loading = true;
  product = null;
  averagedStars = null;
  totalReview = null;
  listReview = null;
  listProductSimilar = null;
  currentPage = 1;
  isEndLoadMore = false;
  isLoadingProduct = false;
  productsPurcharsed = [];

  constructor() {
    makeObservable(this, {
      loading: observable,
      product: observable,
      totalReview: observable,
      averagedStars: observable,
      listReview: observable,
      listProductSimilar: observable,
      currentPage: observable,
      isEndLoadMore: observable,
      isLoadingProduct: observable,
      productsPurcharsed: observable,
      getProductDetail: action.bound,
      favoriteProduct: action.bound,
      getReviewProduct: action.bound,
      getSimilarProduct: action.bound,
      getPurcharsedProducts: action.bound,
      getAllFavorite: action.bound,
    });
  }

  getPurcharsedProducts = async (isLoadMore = false, isRefresh = false) => {
    if (isRefresh === true) {
      this.currentPage = 1;
      this.loading = true;
      this.isEndLoadMore = false;
    } else if (!isLoadMore) {
      this.isEndLoadMore = false;
      this.isLoadingProduct = true;
      this.currentPage = 1;
    }

    if (this.isEndLoadMore) {
      return;
    }

    try {
      var res = await RepoManager.product.getAllPurchasedProducts(
        isLoadMore ? this.currentPage : 1,
      );
      var list = res.data.data.data;

      if (list.length < 20) {
        this.isEndLoadMore = true;
      }
      this.currentPage = this.currentPage + 1;
      if (isLoadMore === false) {
        this.productsPurcharsed = list;
      } else {
        this.productsPurcharsed.push(...list);
      }
    } catch (err) {
      console.log(err);
    }
    this.isLoadingProduct = false;
    this.loading = false;
  };

  getProductDetail = async id => {
    try {
      this.loading = true;
      const response = await RepoManager.product.getProductDetail(id);
      console.log(
        'response ==================================',
        response?.data?.data,
      );

      this.product = response?.data?.data;
      console.log(this.product);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  favoriteProduct = async (id, is_favorite) => {
    try {
      const response = await RepoManager.product.favoriteProduct(
        id,
        is_favorite,
      );
      this.product.is_favorite = is_favorite;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  getReviewProduct = async id => {
    try {
      const response = await RepoManager.product.getReviewProduct(
        id,
        '',
        '',
        '',
      );

      this.averagedStars = response?.data?.data?.averaged_stars;
      this.totalReview = response?.data?.data?.total_reviews;

      this.listReview = response?.data?.data?.data;

      console.log(this.product);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  getSimilarProduct = async id => {
    try {
      const response = await RepoManager.product.getSimilarProduct(id);

      this.listProductSimilar = response?.data?.data;

      console.log(this.product);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  getAllFavorite = async (isLoadMore = false, isRefresh = false) => {
    if (isRefresh === true) {
      this.currentPage = 1;
      this.loading = true;
      this.isEndLoadMore = false;
    } else if (!isLoadMore) {
      this.isEndLoadMore = false;
      this.isLoadingProduct = true;
      this.currentPage = 1;
    }

    if (this.isEndLoadMore) {
      return;
    }

    try {
      var res = await RepoManager.product.getAllFavorite(
        isLoadMore ? this.currentPage : 1,
      );
      var list = res.data.data.data;

      if (list.length < 20) {
        this.isEndLoadMore = true;
      }
      this.currentPage = this.currentPage + 1;
      if (isLoadMore === false) {
        this.productsPurcharsed = list;
      } else {
        this.productsPurcharsed.push(...list);
      }
    } catch (err) {
      console.log(err);
    }
    this.isLoadingProduct = false;
    this.loading = false;
  };
}

// Instantiate the counter store.
const productStore = new ProductStore();
// Create a React Context with the counter store instance.
export const ProductStoreContext = React.createContext(productStore);
export const useProductStore = () => React.useContext(ProductStoreContext);
