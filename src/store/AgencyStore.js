// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import {toast} from '../utils/apis/toast';
import {useNavigation} from '@react-navigation/native';
import {useDataAppStore} from './DataAppStore';

class AgencyStore {
  generalInfoPaymentCtv = {};
  infoCtv = {};
  navigation = useNavigation();
  dataAppStore = useDataAppStore();

  ///history payment
  currentPage = 1;
  isEnd = false;
  isLoading = false;
  history = [];
  loadInit = true;

  /// report rose

  reportRose = [];

  /// agency retroduce;

  agencyRetroduce = [];

  constructor() {
    makeObservable(this, {
      generalInfoPaymentCtv: observable,
      infoCtv: observable,
      updateInfoCTV: action.bound,
      requestPayment: action.bound,
      getGeneralInfoPaymentCtv: action.bound,
      getInfoCTV: action.bound,
      checkInfoPayment: action.bound,
      ///history payment
      currentPage: observable,
      isEnd: observable,
      isLoading: observable,
      history: observable,
      loadInit: observable,
      getPaymentCtvHistory: action.bound,
      /// report rose
      reportRose: observable,
      getReportRose: action.bound,
      /// agency retroduce
      agencyRetroduce: observable,
      getAllCollaborator: action.bound,
    });
  }

  registerCtv = async isCollab => {
    try {
      const data = await RepoManager.agency.registerCtv({
        is_collaborator: isCollab,
      });

      await new Promise(resolve => setTimeout(resolve, 100));
      await this.dataAppStore.getInfoCustomer();
      await this.dataAppStore.getBadge();
      this.getGeneralInfoPaymentCtv();
      this.getInfoCTV();
      toast.success('Đăng ký thành công');
      this.navigation.goBack();
      this.navigation.goBack();
    } catch (err) {
      console.log('err', err);
    }
  };

  updateInfoCTV = async data => {
    try {
      const res = await RepoManager.agency.updateInfoCTV(data);
      toast.success('Cập nhật thành công');
    } catch (err) {
      console.log('err', err);
    }
  };

  requestPayment = async () => {
    try {
      const data = await RepoManager.agency.requestPayment();
      await this.getGeneralInfoPaymentCtv();
      toast.success('Yêu cầu thành công');
    } catch (err) {
      SahaAlert.showError({message: err.toString()});
    }
  };

  getGeneralInfoPaymentCtv = async () => {
    try {
      const data = await RepoManager.agency.getGeneralInfoPaymentCtv();
      this.generalInfoPaymentCtv = data.data?.data;
    } catch (err) {
      console.log('err', err);
    }
  };

  getPaymentCtvHistory = async (isRefresh = false) => {
    if (isRefresh === true) {
      this.currentPage = 1;
      this.isEnd = false;
      this.history = [];
    }

    try {
      if (!this.isEnd) {
        var res = await RepoManager.agency.getPaymentCtvHistory(
          this.currentPage,
        );
        var list = res.data.data.data;
        this.isLoading = true;

        if (isRefresh == true) {
          this.history = list;
        } else {
          this.history.push(...list);
        }

        if (res?.data?.data?.next_page_url == null) {
          this.isEnd = true;
        } else {
          this.isEnd = false;
          this.currentPage = this.currentPage + 1;
        }
      }
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.loadInit = false;
  };

  getInfoCTV = async () => {
    try {
      const res = await RepoManager.agency.getInfoCTV();
      this.infoCtv = res.data?.data;

      // isPaymentAuto.value = data.paymentAuto || false;
      // fullName.value = data.firstAndLastName || '';
      // cmnd.value = data.cmnd || '';
      // dateRange.value = data.dateRange
      //   ? new Date(data.dateRange).toLocaleDateString('en-GB')
      //   : '';
      // issuedBy.value = data.issuedBy || '';
      // frontCard.value = data.frontCard || '';
      // backCard.value = data.backCard || '';
      // bank.value = data.bank || '';
      // accountName.value = data.accountName || '';
      // accountNumber.value = data.accountNumber || '';
      // branch.value = data.branch || '';
      //this.checkInfoPayment();
    } catch (err) {
      console.log('err', err);
    }
  };

  getReportRose = async (isRefresh = false) => {
    if (isRefresh === true) {
      this.currentPage = 1;
      this.isEnd = false;
      this.reportRose = [];
    }

    try {
      if (!this.isEnd) {
        var res = await RepoManager.agency.getReportRose(this.currentPage);
        var list = res.data.data.data;
        this.isLoading = true;

        if (isRefresh == true) {
          this.reportRose = list;
        } else {
          this.reportRose.push(...list);
        }

        if (res?.data?.data?.next_page_url == null) {
          this.isEnd = true;
        } else {
          this.isEnd = false;
          this.currentPage = this.currentPage + 1;
        }
      }
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.loadInit = false;
  };

  getAllCollaborator = async (isRefresh = false, from, to) => {
    if (isRefresh === true) {
      this.currentPage = 1;
      this.isEnd = false;
      this.agencyRetroduce = [];
    }

    try {
      if (!this.isEnd) {
        var res = await RepoManager.agency.getAllCollaborator(
          this.currentPage,
          from,
          to,
        );
        var list = res.data.data.data;
        this.isLoading = true;

        if (isRefresh == true) {
          this.agencyRetroduce = list;
        } else {
          this.agencyRetroduce.push(...list);
        }

        if (res?.data?.data?.next_page_url == null) {
          this.isEnd = true;
        } else {
          this.isEnd = false;
          this.currentPage = this.currentPage + 1;
        }
      }
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.loadInit = false;
  };

  checkInfoPayment() {
    if (
      this.infoCtv.full_name != '' &&
      this.infoCtv.cmnd != '' &&
      this.infoCtv.date_range != '' &&
      this.infoCtv.issued_by != '' &&
      this.infoCtv.front_card != '' &&
      this.infoCtv.back_card != '' &&
      this.infoCtv.bank != '' &&
      this.infoCtv.account_bame != '' &&
      this.infoCtv.account_number != '' &&
      this.infoCtv.branch != ''
    ) {
      return true;
    }
  }
}

const agencyStore = new AgencyStore();

export const agencyStoreContext = React.createContext(agencyStore);
export const useAgencyStore = () => React.useContext(agencyStoreContext);
