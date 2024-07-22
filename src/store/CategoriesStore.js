// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import { set } from 'date-fns';

class CategoriesStore {
  navigation = useNavigation();

  isLoadingScreen = false;
  isLoadingCategory = false;
  loadInit = true;
  isLoadingProductMore = false;
  categories = [];
  categoriesChild = [];
  products = [];
  categoryCurrent = -1;
  categoryCurrentChild = -1;
  textSearch = '';
  sortByShow = '';
  descendingShow = true;
  currentPage = 1;
  isChooseDiscountSort = false;
  canLoadMore = true;
  isDown = false;
  sortByCurrent = null;
  histories = [];
  listAttributeSearch = [];
  listAttributeSearchChoose = [];
  categoryChildInput = null;

  setCategoryCurrent = cate => {
    this.categoryCurrent = cate;
  };
  setCategoryCurrentChild = cate => {
    this.categoryCurrentChild = cate;
  };

  setTextSearch = text => {
    this.textSearch = text;
  };
  setCategoryChildInput = cate => {
    this.categoryChildInput = cate;
  };

  setCategories = cate => {
    this.categories = cate;
  };

  setSortByShow = sortBy => {
    this.sortByShow = sortBy;
  };

  setIsChooseDiscountSort = isChooseDiscountSort => {
    this.isChooseDiscountSort = isChooseDiscountSort;
  };

  constructor() {
    makeObservable(this, {
      isLoadingScreen: observable,
      categoryChildInput: observable,
      isLoadingCategory: observable,
      loadInit: observable,
      isLoadingProductMore: observable,
      categories: observable,
      categoriesChild: observable,
      products: observable,
      categoryCurrent: observable,
      categoryCurrentChild: observable,
      textSearch: observable,
      sortByShow: observable,
      descendingShow: observable,
      currentPage: observable,
      isChooseDiscountSort: observable,
      canLoadMore: observable,
      isDown: observable,
      sortByCurrent: observable,
      histories: observable,
      listAttributeSearch: observable,
      listAttributeSearchChoose: observable,
      searchProduct: action.bound,
      getAllCategory: action.bound,
      setCategoryCurrent: action.bound,
      setCategoryCurrentChild: action.bound,
      setTextSearch: action.bound,
      setCategoryChildInput: action.bound,
      setCategories: action.bound,
      getSearchHistory: action.bound,
      setSortByShow: action.bound,
      setIsChooseDiscountSort: action.bound,
    });
  }

  searchProduct = async (
    search,
    descending,
    sortBy,
    idCategory,
    idCategoryChild,
    isLoadMore = false,
  ) => {
    try {
    
      this.sortByCurrent = sortBy;
      if (!isLoadMore) {
        this.currentPage = 1;
        this.canLoadMore = true;
        this.loadInit = true;
      }

      if (isLoadMore) {
        if (!this.canLoadMore) return true;
        this.isLoadingProductMore = true;
      }

      if (search !== null) {
        this.textSearch = search || '';
      }

      if (descending !== null) {
        this.descendingShow = descending || '';
      }

      if (sortBy !== null) {
        this.sortByShow = sortBy || '';
      }

      

      const list = await RepoManager.product.searchProduct({
        page: this.currentPage,
        search: this.textSearch,
        has_discount: this.isChooseDiscountSort,
        attribute_search_children_ids:
          this.listAttributeSearchChoose.length > 0
            ? listAttributeSearchChoose
                .map(e => e.id)
                .toString()
                .replace(/[\[\] ]/g, '')
            : null,
        category_ids:
          this.categoryCurrent === -1 ? null : this.categoryCurrent.toString(),
        category_children_ids:
          this.categoryCurrentChild === -1
            ? null
            : this.categoryCurrentChild.toString(),
        descending: sortBy == 'price' ? this.descendingShow : true,
        sort_by: this.sortByShow === '' ? null : this.sortByShow,
      });

      if (!isLoadMore) {
        this.products = list?.data?.data?.data;
      } else {
        this.products.push(...list?.data?.data?.data);
      }

      console.log('this.products', list?.data?.data?.data.length);

      if (list?.data?.data?.data.length < 20) {
        this.canLoadMore = false;
      } else {
        this.currentPage = this.currentPage + 1;
      }

      if (this.isChooseDiscountSort) {
        //  sortDiscount();
      }
      this.loadInit = false;
      this.isLoadingProductMore = false;
      return true;
    } catch (err) {
      this.loadInit = false;
      this.isLoadingProductMore = false;
      return null;
    }
  };

  getAllCategory = async () => {
    this.isLoadingProduct = true;
    this.isLoadingCategory = true;

    try {
      // Assuming an asynchronous function call, similar to 'await' in Dart
      var res = await RepoManager.product.getAllCategory();

      // Assuming 'categories' is a function that sets some value
      this.categories = res?.data?.data;

      console.log('this.categories', this.categories);
      this.categories.unshift({name: 'Tất cả', id: -1});

      if (this.categoryCurrent !== -1) {
        var cate = this.categories.find(e => e.id === this.categoryCurrent);
        this.categoryCurrent = cate.id ?? -1;
        this.categoryCurrentChild = -1;
        if (cate?.id == null) {
          this.categoriesChild = [];
        } else {
          this.categoriesChild = cate?.category_children;
        }
      }

      var index = this.categories.findIndex(e => e.id === this.categoryCurrent);

      if (
        this.categories[index].category_children != null &&
        this.categories[index].category_children.length > 0
      ) {
        this.navigation.push('CATEGORIES_SUB', {
          textSearch: this.textSearch,
          categoryId: this.categories[index].id,
          categoryChildInput: this.categories[index].category_children,
        });
      }

      // categories.refresh();
      // scrollToIndex();
    } catch (err) {
      console.log(err);
    }

    this.isLoadingCategory = false;
  };

  getSearchHistory = async () => {
    try {
      const data = await RepoManager.product.get10HistorySearch();
      this.histories = data?.data?.data;
      console.log('this.histories', this.histories);
    } catch (err) {
      // Xử lý lỗi nếu cần thiết
    }
  };

  
}

const categoriesStore = new CategoriesStore();

export const categoriesStoreContext = React.createContext(categoriesStore);
export const useCategoriesStore = () =>
  React.useContext(categoriesStoreContext);
