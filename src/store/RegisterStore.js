// counter.store.js
import React from 'react';
import { makeObservable, action, observable, get } from 'mobx';
import { RepoManager } from '../services';
import { format as prettyFormat } from 'pretty-format'; // ES2015 modules

import { toast } from '../utils/apis/toast';
import { useNavigation } from '@react-navigation/native';
import UserUtil from '../utils/apis/userUtil';
import { useDataAppStore } from './DataAppStore';

class RegisterStore {
  checkingHasPhone = false;
  checkingHasEmail = false;
  signUpping = false;
  loading = false;

  navigation = useNavigation();
  dataApp = useDataAppStore();

  constructor() {
    makeObservable(this, {
      checkingHasPhone: observable,
      checkingHasEmail: observable,
      signUpping: observable,
      loading: observable,
      checkHasPhoneNumber: action.bound,
      checkHasEmail: action.bound,
      onSignUp: action.bound,
      login: action.bound,
    });
  }

  checkHasPhoneNumber = async (phone, onHas, noHas) => {
    this.checkingHasPhone = true;
    try {
      var data = await RepoManager.dataApp.checkExists({
        phone_number: phone,
      });

      for (var e of data?.data?.data) {
        if (e.name === 'phone_number' && e.value === true) {
          toast.erorr('Số điện thoại đã tồn tại');
          if (onHas) onHas();
          this.checkingHasPhone = false;
          return;
        }
      }

      if (noHas) noHas();
    } catch (err) {
      console.log(err);
      //toast.erorr("Số điện thoại đã tồn tại");
    }

    this.checkingHasPhone = false;
  };

  checkHasEmail = async (email, onHas, noHas) => {
    this.checkingHasEmail = true;

    try {
      var data = await RepoManager.dataApp.checkExists({
        email: email,
      });

      console.log('data', data?.data?.data);

      for (var e of data?.data?.data) {
        if (e.name === 'email' && e.value === true) {
          toast.erorr('Email đã tồn tại');
          if (onHas) onHas();
          this.checkingHasEmail = false;
          return;
        }
      }

      if (noHas) noHas();
    } catch (err) {
      console.log(err);
      //toast.erorr("Email đã tồn tại");
    }

    this.checkingHasEmail = false;
  };

  onSignUp = async (
    isPhoneValidate,
    phone,
    password,
    name,
    email,
    otp,
    code_introduce,
  ) => {
    this.signUpping = true;

    try {
      const dataRegister = await RepoManager.dataApp.registerAccount({
        phone_number: phone,
        password: password,
        name: name,
        email: email,
        otp: otp,
        otp_from: isPhoneValidate === true ? 'phone' : 'email',
        referral_phone_number: code_introduce === '' ? null : code_introduce,
      });

      toast.success('Đăng ký thành công');
      await this.login(phone, password);

      // Giả sử Get.back() tương đương với quay trở lại màn hình trước đó
      this.navigation.goBack();
      this.navigation.goBack();
      this.navigation.goBack();

      // if (isOneBack !== true) {
      //   Get.back();
      // }
    } catch (err) {
      console.log(err);
    }

    this.signUpping = false;
  };

  login = async (emailOrPhoneNumber, password) => {
    try {
      this.loading = true;
      const response = await RepoManager.dataApp.login({
        email_or_phone_number: emailOrPhoneNumber,
        password: password,
      });
      await UserUtil.saveTokenData(response?.data?.data?.token);
      this.dataApp.setIsLogin(true);
      this.dataApp.getInfoCustomer();
      return true;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  sendSms = async phone_number => {
    try {
      const data = await RepoManager.dataApp.sendOtp({
        phone_number: phone_number,
      });

      toast.success('Đã gửi mã OTP');
    } catch (error) {
      toast.erorr(error.toString());
    }
  };

  sendEmailCus = async email => {
    try {
      const data = await RepoManager.dataApp.sendEmailOtpCus({
        email: email,
      });
      toast.success('Đã gửi mã OTP');
    } catch (error) {
      toast.erorr(error.toString());
    }
  };


  resetPassword = async (email_or_phone_number, otp, otp_from, password) => {
    try {
      const data = await RepoManager.dataApp.resetPassword({
        email_or_phone_number: email_or_phone_number,
        otp: otp,
        otp_from: otp_from,
        password:password
      });
      toast.success('Bạn thay đổi mật khẩu thành công !');
    } catch (error) {
      toast.erorr("Bạn nhập sai mã OTP");
    }
  }

  tokenDevice = async (token) => {
    console.log("TokenDevice",token)
    try {
      const data = await RepoManager.dataApp.tokenDevice({
        token
      });
      console.log("Thành công!")
      toast.success('TokenDevice thành công!');
    } catch (error) {
      console.log("Thâ")
      toast.erorr("Bạn nhập sai mã OTP");
    }
  }
}

// Instantiate the counter store.
const registerStore = new RegisterStore();
// Create a React Context with the counter store instance.
export const RegisterStoreContext = React.createContext(registerStore);
export const useRegisterStore = () => React.useContext(RegisterStoreContext);
