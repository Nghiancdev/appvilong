// counter.store.js
import React from 'react';
import { makeObservable, action, observable, get } from 'mobx';
import { RepoManager } from '../services';
import { format as prettyFormat } from 'pretty-format'; // ES2015 modules
import UserUtil from '../utils/apis/userUtil';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DataAppStore {
  loading = false;
  appTheme = null;
  layout = null;
  allCategory = null;
  infoCustomer = null;
  badge = null;
  banner = null;
  bannerAdsApp = null;
  homeButton = null;
  popup = null;
  productDiscount = null;
  productNews = null;
  listScoreHistory = [];
  rewardPointCtm = null;
  isLogin = false;

  homeApp = {
    banner: null,
    popups: null,
    banner_ads_app: null,
    layouts: null,
  };

  constructor() {
    makeObservable(this, {
      appTheme: observable,
      allCategory: observable,
      badge: observable,
      isLogin: observable,
      banner: observable,
      homeApp: observable,
      bannerAdsApp: observable,
      homeButton: observable,
      infoCustomer: observable,
      popup: observable,
      productDiscount: observable,
      productNews: observable,
      listScoreHistory: observable,
      rewardPointCtm: observable,
      getLayout: action.bound,
      getAppTheme: action.bound,
      getAllCategory: action.bound,
      getProductTopSales: action.bound,
      getBadge: action.bound,
      getBanner: action.bound,
      getBannerAdsApp: action.bound,
      getHomeButton: action.bound,
      getPopup: action.bound,
      getProductDiscount: action.bound,
      getProductNews: action.bound,
      initData: action.bound,
      getProductByCategory: action.bound,
      getInfoCustomer: action.bound,
      getPostNew: action.bound,
      login: action.bound,
      getScoreHistory: action.bound,
      getRewardPointCtm: action.bound,
      setIsLogin: action.bound,
    });
  }

  setIsLogin = isLogin => {
    this.isLogin = isLogin;
  }

  getRewardPointCtm = async () => {
    try {
      var data =
        await RepoManager.dataApp.getRewardPointCtm();
      console.log('====================================', data?.data?.data);
      this.rewardPointCtm = data?.data?.data;
    } catch (err) {
      console.error('Error fetching data:', err);
      //SahaAlert.showError({message: err.toString()});
    }
  };

  getScoreHistory = async () => {
    try {
      var data = await RepoManager.dataApp.getScoreHistory();
      this.listScoreHistory = data.data.data.data;
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  getLayout = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getLayout();
      this.layout = response?.data?.data;
      this.homeApp.layouts = response?.data?.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getAppTheme = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getAppTheme();
      this.appTheme = response?.data?.data;
      this.appTheme.color_main_1 = this.appTheme.color_main_1.replace(
        '#ff',
        '#',
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getAllCategory = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getAllCategory();
      this.allCategory = response?.data?.data;

      const index = (this.homeApp.layouts || []).findIndex(
        e => e.type_layout === 'CATEGORY',
      );
      if (index !== -1) {
        this.homeApp.layouts[index].list = response?.data?.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getBadge = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getBadge();
      this.badge = response?.data?.data;
      //console.log(prettyFormat(response?.data?.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getBanner = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getBanner();
      this.banner = response?.data?.data;
      this.homeApp.banner = response?.data?.data;
      //console.log(prettyFormat(response?.data?.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getBannerAdsApp = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getBannerAdsApp();
      this.bannerAdsApp = response?.data?.data;
      this.homeApp.banner_ads_app = response?.data?.data;
      //  console.log(prettyFormat(response?.data?.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getHomeButton = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getHomeButton();

      this.homeButton = response?.data?.data;
      const index = (this.homeApp.layouts || []).findIndex(
        e => e.type_layout === 'HOME_BUTTON',
      );
      if (index !== -1) {
        this.homeApp.layouts[index].list = response?.data?.data;
      }
    } catch (error) {
    } finally {
      this.loading = false;
    }
  };

  getPopup = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getPopup();
      this.popup = response?.data?.data;
      this.homeApp.popups = response?.data?.data;
      //   console.log(prettyFormat(response?.data?.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getProductDiscount = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getProductDiscount();
      this.productDiscount = response?.data?.data;
      // console.log(prettyFormat(response?.data?.data));
      const index = (this.homeApp.layouts || []).findIndex(
        e => e.type_layout === 'PRODUCTS_DISCOUNT',
      );
      if (index != -1) {
        this.homeApp.layouts[index].list = response?.data?.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getProductNews = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getProductNews();
      this.productNews = response?.data?.data;
      // console.log(prettyFormat(response?.data?.data));

      const index = (this.homeApp.layouts || []).findIndex(
        e => e.type_layout === 'PRODUCTS_NEW',
      );
      if (index != -1) {
        this.homeApp.layouts[index].list = response?.data?.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getProductTopSales = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getProductTopSales();
      this.productNews = response?.data?.data;
      // console.log(prettyFormat(response?.data?.data));

      const index = (this.homeApp.layouts || []).findIndex(
        e => e.type_layout === 'PRODUCTS_TOP_SALES',
      );
      if (index != -1) {
        this.homeApp.layouts[index].list = response?.data?.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getProductByCategory = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getProductByCategory();
      this.productNews = response?.data?.data;
      const index = (this.homeApp.layouts || []).findIndex(
        e => e.type_layout === 'PRODUCT_BY_CATEGORY',
      );
      console.log('=======================================', index);
      if (index !== -1) {
        console.log(
          '=======================================',
          response?.data.data,
        );
        (response.data.data ?? []).reverse().forEach((e, i) => {
          this.homeApp.layouts.splice(index, 0, e);
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getPostNew = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getPostNew();
      this.productNews = response?.data?.data;

      const index = (this.homeApp.layouts || []).findIndex(
        e => e.type_layout === 'POSTS_NEW',
      );
      if (index != -1) {
        this.homeApp.layouts[index].list = response?.data?.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getInfoCustomer = async () => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.getInfoCustomer();
      this.infoCustomer = response?.data?.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  checkLogin = async () => {
    if (UserUtil.getToken() != null) {
      await this.getInfoCustomer();
      this.isLogin = true;
      let token = await AsyncStorage.getItem("tokenn")
      await this.tokenDevice(token)
    } else {
      this.isLogin = false;
    }
  };

  login = async (emailOrPhoneNumber, password) => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.login({
        email_or_phone_number: emailOrPhoneNumber,
        password: password,
      });

      await UserUtil.saveTokenData(response?.data?.data?.token);

      console.log('response ===============>', response?.data?.data?.token);
      console.log('response ===============>', response?.data?.data?.token);
      this.isLogin = true;
      this.getInfoCustomer();
      this.getBadge();
      return true;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };


  tokenDevice = async (token) => {
    console.log("TokenDevice", token)
    try {
      const data = await RepoManager.dataApp.tokenDevice({
        device_token: token
      });
      console.log("Thành công!", data)
      // toast.success('TokenDevice thành công!');
    } catch (error) {
      console.log("Thâ", error)
      // toast.erorr("Bạn nhập sai mã OTP");
    }
  }


  initData = async () => {
    console.log('initData');
    await this.checkLogin();
    await this.getLayout();
    await Promise.all([
      this.getAppTheme(),
      this.getAllCategory(),
      this.getBadge(),
      this.getBanner(),
      this.getBannerAdsApp(),
      this.getHomeButton(),
      this.getPopup(),
      this.getProductDiscount(),
      this.getProductNews(),
      this.getProductByCategory(),
      this.getProductTopSales(),
      this.getPostNew(),
    ]);
  };


}

// Instantiate the counter store.
const dataAppStore = new DataAppStore();
// Create a React Context with the counter store instance.
export const DataAppStoreContext = React.createContext(dataAppStore);
export const useDataAppStore = () => React.useContext(DataAppStoreContext);
