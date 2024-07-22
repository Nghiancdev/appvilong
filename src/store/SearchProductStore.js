// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

class SearchProductStore {
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

      // Gọi API searchProduct
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
        descending: this.sortBy === 'price' ? this.descendingShow : true,
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
          this.categoriesChild([]);
        } else {
          this.categoriesChild(cate?.category_children);
        }
      }

      // var index = this.categories.findIndex(
      //   e => e.id === dataAppCustomerController.inputModelProducts.categoryId,
      // );

      // if (
      //   categories[index].listCategoryChild != null &&
      //   categories[index].listCategoryChild.length > 0
      // ) {
      //   // Assuming 'Navigator.push' is a function to navigate to a new page
      //   // and 'CategoryProductStyle4' is a component or function for rendering the new page
      //   Navigator.push(
      //     Get.context,
      //     MaterialPageRoute({
      //       builder: context =>
      //         CategoryProductStyle4({
      //           textSearch: '',
      //           categoryChildInput: categories[index].listCategoryChild,
      //           categoryId: categories[index].id,
      //         }),
      //     }),
      //   );
      // }

      // Assuming 'categories.refresh()' and 'scrollToIndex()' are functions
      // categories.refresh();
      // scrollToIndex();
    } catch (err) {
      // Assuming 'handleErrorCustomer' is a function to handle errors
      // handleErrorCustomer(err);
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

const searchProductStore = new SearchProductStore();

export const searchProductStoreContext = React.createContext(searchProductStore);
export const useSearchProductStore = () =>
  React.useContext(searchProductStoreContext);
