// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import Toast from 'react-native-toast-message';
import {useDataAppStore} from './DataAppStore';
import _ from 'lodash';
import {toast} from '../utils/apis/toast';
import {CART} from '../constants';
import UserUtil from '../utils/apis/userUtil';
import {useNavigation} from '@react-navigation/native';
import {validateEmail} from '../utils/apis/stringUtil';
import {th} from 'date-fns/locale';

class AddressStore {
  locationProvince = null;
  locationDistrict = null;
  locationWard = null;
  isLoadingCreate = false;
  isDefault = false;
  nameEdit = '';
  phoneEdit = '';
  emailEdit = '';
  addressDetailEdit = '';
  /// address choose form api
  loadingAddress = false;
  listLocationAddress = [];
  /// shipment
  shipmentMethodChoose = {};
  listShipment = [];
  listShipper = [];
  isLoadingShipmentMethod = false;

  navigation = useNavigation();

  constructor() {
    makeObservable(this, {
      locationProvince: observable,
      locationDistrict: observable,
      locationWard: observable,
      isLoadingCreate: observable,
      isDefault: observable,
      nameEdit: observable,
      phoneEdit: observable,
      emailEdit: observable,
      addressDetailEdit: observable,
      createAddressCustomer: action.bound,
      setProvince: action.bound,
      setDistrict: action.bound,
      setWard: action.bound,
      setNameEdit: action.bound,
      setPhoneEdit: action.bound,
      setEmailEdit: action.bound,
      setAddressDetailEdit: action.bound,
      setDefault: action.bound,
      /// address choose form api
      listLocationAddress: observable,
      loadingAddress: observable,
      getProvince: action.bound,
      getDistrict: action.bound,
      getWard: action.bound,
      /// shipment
      shipmentMethodChoose: observable,
      listShipment: observable,
      isLoadingShipmentMethod: observable,
      listShipper: observable,
      chargeShipmentFee: action.bound,
      getListShipper: action.bound,
    });
  } 

  chargeShipmentFee = async (idAddressCustomer, idShipper) => {
    this.isLoadingShipmentMethod = true;
    try {
      const res = await RepoManager.address.chargeShipmentFee(
        idAddressCustomer,
        idShipper,
      );
      this.listShipment = res.data.data;
      var item = this.listShipper.find(item => item.partner_id == idShipper);
      item.listShipment = this.listShipment;
      
      // cập nhật lại listShipper
      this.listShipper = this.listShipper.map(item => { 
        if (item.partner_id == idShipper) {
          return item;
        }
        return item;
      });

      console.log('listShipment', this.listShipper);
    } catch (err) {
      console.log(err);
      toast.erorr('Bạn cần nhập đầy đủ thông tin');
    }
    this.isLoadingShipmentMethod = false;
  };

  getListShipper = async idAddressCustomer => {
    this.isLoadingShipmentMethod = true;
    try {
      const res = await RepoManager.address.getListShipper(idAddressCustomer);
      this.listShipper = res.data.data;
      console.log('listShipper', this.listShipper);
      this.listShipper.forEach(item => {
        this.chargeShipmentFee(idAddressCustomer, item.partner_id);
      });
    } catch (err) {
      console.log(err);
      toast.erorr('Bạn cần nhập đầy đủ thông tin');
    }
    this.isLoadingShipmentMethod = false;
  };

  setShipmentMethodChoose = shipmentMethod => {
    this.shipmentMethodChoose = shipmentMethod;
  };

  setDefault = () => {
    this.isDefault = !this.isDefault;
  };

  setProvince = province => {
    this.locationProvince = province;
  };

  setDistrict = district => {
    this.locationDistrict = district;
  };

  setWard = ward => {
    this.locationWard = ward;
  };

  setNameEdit = name => {
    this.nameEdit = name;
  };

  setPhoneEdit = phone => {
    this.phoneEdit = phone;
  };

  setEmailEdit = email => {
    this.emailEdit = email;
  };

  setAddressDetailEdit = addressDetail => {
    this.addressDetailEdit = addressDetail;
  };

  createAddressCustomer = async () => {
    if (this.nameEdit == '') {
      toast.erorr('Bạn cần nhập tên');
      return;
    }

    if (this.phoneEdit == '') {
      toast.erorr('Bạn cần nhập số điện thoại');
      return;
    }

    if (this.emailEdit == '') {
    } else {
      if (!validateEmail(this.emailEdit)) {
        toast.erorr('Bạn cần nhập đúng định dạng email');
        return;
      }
    }

    if (this.addressDetailEdit == '') {
      toast.erorr('Bạn cần nhập địa chỉ chi tiết');
      return;
    }

    if (this.locationProvince == null) {
      toast.erorr('Bạn cần chọn tỉnh/thành phố');
      return;
    }

    if (this.locationDistrict == null) {
      toast.erorr('Bạn cần chọn quận/huyện');
      return;
    }

    if (this.locationWard == null) {
      toast.erorr('Bạn cần chọn phường/xã');
      return;
    }

    this.isLoadingCreate = true;
    try {
      const res = await RepoManager.address.createAddressCustomer({
        name: this.nameEdit,
        address_detail: this.addressDetailEdit,
        country: 1,
        province: this.locationProvince.id,
        district: this.locationDistrict.id,
        wards: this.locationWard.id,
        email: this.emailEdit,
        phone: this.phoneEdit,
        is_default: this.isDefault,
      });
      toast.success('Thêm địa chỉ thành công');
      this.navigation.goBack();
    } catch (err) {
      console.log(err);
      toast.erorr('Bạn cần nhập đầy đủ thông tin');
    }
    this.isLoadingCreate = false;
  };

  updateAddressCustomer = async id => {
    if (this.nameEdit == '') {
      toast.erorr('Bạn cần nhập tên');
      return;
    }

    if (this.phoneEdit == '') {
      toast.erorr('Bạn cần nhập số điện thoại');
      return;
    }

    if (this.emailEdit == '') {
    } else {
      if (!validateEmail(this.emailEdit)) {
        toast.erorr('Bạn cần nhập đúng định dạng email');
        return;
      }
    }

    if (this.addressDetailEdit == '') {
      toast.erorr('Bạn cần nhập địa chỉ chi tiết');
      return;
    }

    if (this.locationProvince == null) {
      toast.erorr('Bạn cần chọn tỉnh/thành phố');
      return;
    }

    if (this.locationDistrict == null) {
      toast.erorr('Bạn cần chọn quận/huyện');
      return;
    }

    if (this.locationWard == null) {
      toast.erorr('Bạn cần chọn phường/xã');
      return;
    }

    this.isLoadingCreate = true;
    try {
      const res = await RepoManager.address.updateAddressCustomer(id, {
        name: this.nameEdit,
        address_detail: this.addressDetailEdit,
        country: 1,
        province: this.locationProvince.id,
        district: this.locationDistrict.id,
        wards: this.locationWard.id,
        email: this.emailEdit,
        phone: this.phoneEdit,
        is_default: this.isDefault,
      });
      toast.success('Cập nhật chỉ thành công');
      this.navigation.goBack();
    } catch (err) {
      console.log(err);
      toast.erorr('Bạn cần nhập đầy đủ thông tin');
    }
    this.isLoadingCreate = false;
  };

  getProvince = async () => {
    this.loadingAddress = true;
    try {
      const res = await RepoManager.address.getProvince();
      this.listLocationAddress = res.data?.data;
    } catch (err) {
      toast.erorr(err);
    }
    this.loadingAddress = false;
  };

  getDistrict = async idProvince => {
    this.loadingAddress = true;
    try {
      const res = await RepoManager.address.getDistrict(idProvince);
      this.listLocationAddress = res.data?.data;
    } catch (err) {
      toast.erorr(err);
    }
    this.loadingAddress = false;
  };

  getWard = async idDistrict => {
    this.loadingAddress = true;
    try {
      const res = await RepoManager.address.getWard(idDistrict);
      this.listLocationAddress = res.data?.data;
    } catch (err) {
      toast.erorr(err);
    }
    this.loadingAddress = false;
  };
}

const addressStore = new AddressStore();

export const addressStoreContext = React.createContext(addressStore);
export const useAddressStore = () => React.useContext(addressStoreContext);
