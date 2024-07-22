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
import {tr} from 'date-fns/locale';
import {set} from 'date-fns';

class CartStore {
  listOrder = [];
  voucherCodeChoose = '';
  listQuantityProduct = [];
  listCombo = [];
  listUsedCombo = [];
  enoughCondition = [];
  enoughConditionCB = [];
  infoAddressCustomer = null;
  cartData = {};
  balanceCollaboratorCanUse = 0.0;
  balanceCollaboratorUsed = 0.0;
  balanceAgencyCanUse = 0.0;
  balanceAgencyUsed = 0.0;
  isUseBalanceCollaborator = false;
  isUseBalanceAgency = false;
  isLoadingRefresh = false;
  shipmentMethodCurrent = {fee: 0};
  listShipmentFast = [];
  isLoadingShipmentMethod = false;

  setIsUseBalanceCollaborator = isUseBalanceCollaborator => {
    this.isUseBalanceCollaborator = isUseBalanceCollaborator;
  };

  setIsUseBalanceAgency = isUseBalanceAgency => {
    this.isUseBalanceAgency = isUseBalanceAgency;
  };

  /// confirm

  isLoadingOrder = false;
  isLoadingAddress = false;
  listShipmentFast = [];
  isLoadingShipmentMethod = false;
  paymentMethodId = 0;
  paymentPartnerId = 0;
  paymentMethodName = '';
  opacityCurrent = 1.0;
  loading = false;
  isExportBill = false;
  partnerShipperId = 0;
  shipperType = 0;
  totalShippingFee = 0;
  companyName = '';
  taxCode = '';
  companyAddress = '';
  companyEmail = '';
  noteCustomerEdit = '';

  /// address Receiver

  listInfoAddressCustomer = [];
  isLoadingAddressReceiver = false;

  /// voucher

  listVoucher = [];
  voucherCodeChooseVoucher = '';
  codeVoucherEdit = '';
  loadingVoucher = false;
  visibleVoucher = false;

  // payment

  listPaymentMethod = [];
  paymentMethodChoose = {};
  loadingPaymentMethod = false;

  navigation = useNavigation();

  constructor() {
    makeObservable(this, {
      listOrder: observable,
      voucherCodeChoose: observable,
      listQuantityProduct: observable,
      listCombo: observable,
      listUsedCombo: observable,
      listInfoAddressCustomer: observable,
      isLoadingAddressReceiver: observable,
      enoughCondition: observable,
      enoughConditionCB: observable,
      infoAddressCustomer: observable,
      cartData: observable,
      balanceCollaboratorCanUse: observable,
      balanceCollaboratorUsed: observable,
      balanceAgencyCanUse: observable,
      balanceAgencyUsed: observable,
      isUseBalanceCollaborator: observable,
      isUseBalanceAgency: observable,
      isLoadingRefresh: observable,
      shipmentMethodCurrent: observable,
      listShipmentFast: observable,
      isLoadingShipmentMethod: observable,
      addItemCart: action.bound,
      updateItemCart: action.bound,
      addVoucherCart: action.bound,
      getItemCart: action.bound,
      getComboCustomer: action.bound,
      getAllAddressCustomer: action.bound,
      chargeShipmentFee: action.bound,
      increaseItem: action.bound,
      decreaseItem: action.bound,
      refresh: action.bound,
      setPaymentMethodId: action.bound,
      setPaymentPartnerId: action.bound,
      setPaymentMethodName: action.bound,
      /// confirm
      isLoadingOrder: observable,
      isLoadingAddress: observable,
      listShipmentFast: observable,
      isLoadingShipmentMethod: observable,
      paymentMethodId: observable,
      paymentPartnerId: observable,
      paymentMethodName: observable,
      opacityCurrent: observable,
      loading: observable,
      isExportBill: observable,
      partnerShipperId: observable,
      shipperType: observable,
      totalShippingFee: observable,
      companyName: observable,
      taxCode: observable,
      companyAddress: observable,
      companyEmail: observable,
      noteCustomerEdit: observable,
      initDefaultPaymentMethod: action.bound,
      createOrders: action.bound,
      setInfoAddressCustomer: action.bound,
      onToggleSwitch: action.bound,
      onToggleSwitchBalance: action.bound,
      onToggleSwitchBalanceCTV: action.bound,
      getAllAddressCustomerReceiver: action.bound,
      setShipmentMethodCurrent: action.bound,
      setCodeVoucherEdit: action.bound,
      setVisibilityVoucher: action.bound,
      checkConditionVoucher: action.bound,
      setVoucherCodeChooseVoucher: action.bound,
      setCompanyAddress: action.bound,
      setCompanyName: action.bound,
      setCompanyEmail: action.bound,
      setTaxCode: action.bound,
      setNoteCustomerEdit: action.bound,
      setIsUseBalanceCollaborator: action.bound,
      setIsUseBalanceAgency: action.bound,

      /// Voucher
      listVoucher: observable,
      loadingVoucher: observable,
      voucherCodeChooseVoucher: observable,
      codeVoucherEdit: observable,
      visibleVoucher: observable,
      getVoucherCustomer: action.bound,
      setVoucherCodeChooseVoucher: action.bound,
      setVisibilityVoucher: action.bound,
      checkConditionVoucher: action.bound,
      /// payment
      listPaymentMethod: observable,
      paymentMethodChoose: observable,
      loadingPaymentMethod: observable,
      getPaymentMethod: action.bound,
      setPaymentMethodChoose: action.bound,
    });
  }

  dataApp = useDataAppStore();

  /// payment

  setPaymentMethodChoose = paymentMethodChoose => {
    this.paymentMethodChoose = paymentMethodChoose;
  };

  getPaymentMethod = async () => {
    this.loadingPaymentMethod = true;
    try {
      const res = await RepoManager.cart.getPaymentMethod();
      this.listPaymentMethod = res.data?.data;
    } catch (err) {
      console.error(err);
    }
    this.loadingPaymentMethod = false;
  };

  /// voucher

  setVisibilityVoucher = () => {
    this.visibleVoucher = !this.visibleVoucher;
  };

  setCodeVoucherEdit = code => {
    this.codeVoucherEdit = code;
  };

  checkConditionVoucher = async () => {
    try {
      if (this.voucherCodeChooseVoucher === '') {
        this.voucherCodeChoose = '';
        await this.addVoucherCart(this.voucherCodeChooseVoucher, async err => {
          if (err !== 'success') {
            this.voucherCodeChooseVoucher = '';
            this.voucherCodeChoose = '';
          } else {
            this.voucherCodeChoose = this.voucherCodeChooseVoucher;
            this.navigation.goBack();
          }
        });
      } else {
        await this.addVoucherCart(this.voucherCodeChooseVoucher, async err => {
          if (err !== 'success') {
            this.voucherCodeChooseVoucher = '';
            this.voucherCodeChoose = '';
          } else {
            this.voucherCodeChoose = this.voucherCodeChooseVoucher;
            this.navigation.goBack();
          }
        });
      }
    } catch (err) {
      // Handle the error
      console.error(err);
    }
  };

  getVoucherCustomer = async () => {
    this.loadingVoucher = true;
    try {
      const res = await RepoManager.cart.getVoucherCustomer();
      this.listVoucher = res.data?.data ?? [];
    } catch (err) {
      console.log(err);
      toast.erorr(err.toString());
    }
    this.loadingVoucher = false;
  };

  setVoucherCodeChooseVoucher = code => {
    this.voucherCodeChooseVoucher = code;
  };

  /// confirm

  initDefaultPaymentMethod = async () => {
    const res = await RepoManager.cart.getPaymentMethod();

    if (res?.data?.data !== null && (res.data?.data ?? []).length > 0) {
      const itemFirst = res.data?.data[0];
      this.paymentMethodName = itemFirst.name;
      this.paymentPartnerId = itemFirst.id;
      this.paymentMethodId = itemFirst.payment_method_id;
    }
  };

  setInfoAddressCustomer = infoAddressCustomer => {
    this.infoAddressCustomer = infoAddressCustomer;
  };

  setShipmentMethodCurrent = shipmentMethodCurrent => {
    this.shipmentMethodCurrent = shipmentMethodCurrent;
  };

  setCompanyAddress = companyAddress => {
    this.companyAddress = companyAddress;
  };

  setCompanyName = companyName => {
    this.companyName = companyName;
  };

  setCompanyEmail = companyEmail => {
    this.companyEmail = companyEmail;
  };

  setTaxCode = taxCode => {
    this.taxCode = taxCode;
  };

  setNoteCustomerEdit = noteCustomerEdit => {
    this.noteCustomerEdit = noteCustomerEdit;
  };

  createOrders = async () => {
    this.loading = true;

    if (this.infoAddressCustomer == null) {
      toast.erorr('Chưa chọn địa chỉ nhận');
    } else {
      this.isLoadingOrder = true;

      const orderRequest = {
        order_from: CART.ORDER_FROM_APP,
        payment_method_id: this.paymentMethodId,
        payment_partner_id: this.paymentPartnerId,
        partner_shipper_id: this.shipmentMethodCurrent.partner_shipper_id,
        shipper_type: this.shipmentMethodCurrent.ship_speed_code,
        total_shipping_fee: this.shipmentMethodCurrent.fee,
        customer_address_id: this.infoAddressCustomer.id,
        customer_note:
          this.isExportBill === false
            ? this.noteCustomerEdit
            : `${this.companyName}\n${this.taxCode}\n${this.companyAddress}\n${this.companyEmail}`,
        collaborator_id:
          UserUtil.getCollaboratorByCustomerId() ||
          (this.dataApp.infoCustomer?.is_collaborator === true &&
          this.dataApp.badge.status_collaborator === 1
            ? this.dataApp.infoCustomer?.id
            : null),
        agency_by_customer_id:
          this.dataApp.infoCustomer?.is_agency === true &&
          this.dataApp.badge.status_agency === 1
            ? this.dataApp.infoCustomer?.id
            : null,
        code_voucher:
          this.voucherCodeChoose === '' ? null : this.voucherCodeChoose,
        is_use_points: this.cartData.is_use_points,
        is_use_balance_collaborator: this.isUseBalanceCollaborator,
        is_use_balance_agency: this.isUseBalanceAgency,
        is_order_for_customer: this.cartData.is_order_for_customer || false,
      };
      console.log('orderRequest', orderRequest);

      try {
        const resultOrder = await RepoManager.cart.createOrder(orderRequest);
        console.log('resultOrder', resultOrder);
        this.voucherCodeChoose = '';
        this.isLoadingOrder = false;
        this.navigation.goBack();
        this.navigation.goBack();
        this.navigation.navigate('ORDER', {
          routeName: 0,
        });
        this.navigation.navigate('ORDER_SUCCESS', {
          order: resultOrder?.data?.data,
        });
        // Get.back();
        // Get.back();
        // Get.to(() =>
        //   OrderHistoryScreen({
        //     initPage: 0,
        //   }),
        // );
        // Get.to(() =>
        //   OrderCompletedScreen({
        //     orderCode: resultOrder.data.orderCode,
        //   }),
        // );
        this.getItemCart();
      } catch (err) {
        console.log(err);
        toast.erorr(err.toString());
      }

      this.isLoadingOrder = false;
    }

    this.loading = false;
  };

  onToggleSwitch = () => {
    this.isExportBill = !this.isExportBill;
  };

  onToggleSwitchBalance = () => {
    this.isUseBalanceAgency = !this.isUseBalanceAgency;
    this.addVoucherCart(this.voucherCodeChoose, () => {});
  };

  onToggleSwitchBalanceCTV = () => {
    this.isUseBalanceCollaborator = !this.isUseBalanceCollaborator;
    this.addVoucherCart(this.voucherCodeChoose, () => {});
  };

  increaseItem(index, listDistributes) {
    this.listQuantityProduct[index] = this.listQuantityProduct[index] + 1;
    this.listOrder = [...this.listOrder];
    this.debouncedUpdateItemCart(index, listDistributes);
  }

  decreaseItem(index, listDistributes) {
    if (this.listQuantityProduct[index] > 1) {
      this.listQuantityProduct[index] = this.listQuantityProduct[index] - 1;
      this.listOrder = [...this.listOrder];
      this.debouncedUpdateItemCart(index, listDistributes);
    } else {
      return;
    }
  }

  debouncedUpdateItemCart = _.debounce(
    (index, listDistributes) => {
      this.updateItemCart(
        this.listOrder[index].id,
        this.listOrder[index].product.id,
        this.listQuantityProduct[index],
        listDistributes || [],
        this.listOrder[index].note,
      );
    },
    500, // Thời gian debounce, điều chỉnh theo yêu cầu của bạn
  );

  updateItemCart = async (
    lineItemId,
    productId,
    quantity,
    listDistributes,
    note,
  ) => {
    const listQuantityProductNew = [];
    try {
      const res = await RepoManager.cart.updateItemCart(
        lineItemId,
        productId,
        quantity,
        listDistributes,
        this.voucherCodeChoose,
        note,
      );
      this.sortLineItem(res?.data);
      this.listUsedCombo = res.data?.data?.used_combos;
      this.listOrder.forEach(element => {
        listQuantityProductNew.push(element.quantity);
      });

      console.log('this.listOrder   ', this.listOrder);
      this.listQuantityProduct = listQuantityProductNew;
      this.cartData = res.data?.data;
      console.log('ress: ', res?.data);
      this.getComboCustomer();
    } catch (err) {
      this.voucherCodeChoose = '';
      this.refresh();
      console.log(err);
      toast.erorr(err.toString());
    }
  };

  getComboCustomer = async () => {
    const listComboNew = [];
    const enoughConditionNew = [];
    const enoughConditionCBNew = [];
    try {
      const res = await RepoManager.cart.getComboCustomer();
      res.data?.data?.forEach(e => {
        let checkInCombo = false;
        for (let i = 0; i < this.listOrder.length; i++) {
          const checkHasInCombo = e.products_combo.findIndex(
            element => element.product.id === this.listOrder[i].product.id,
          );
          if (checkHasInCombo !== -1) {
            checkInCombo = true;
            break;
          }
        }
        if (checkInCombo === true) {
          listComboNew.push(e);
          enoughConditionNew.push(false);
          enoughConditionCBNew.push(false);
        }
      });
      this.enoughCondition = enoughConditionNew;
      this.enoughConditionCB = enoughConditionCBNew;
      this.listCombo = listComboNew;

      for (let i = 0; i < this.listCombo.length; i++) {
        const checkEnough = this.listUsedCombo.findIndex(
          element => element.combo.id === this.listCombo[i].id,
        );
        if (checkEnough !== -1) {
          this.enoughCondition[i] = true;
          for (let j = 0; j < this.listOrder.length; j++) {
            const index = this.listUsedCombo[
              checkEnough
            ].combo.products_combo.findIndex(
              el => el.product.id === this.listOrder[j].product.id,
            );
            if (index !== -1) {
              if (
                this.listUsedCombo[checkEnough].combo.products_combo[index]
                  .quantity <= this.listOrder[j].quantity
              ) {
                this.enoughConditionCB[i] = true;
              } else {
                this.enoughConditionCB[i] = false;
                break;
              }
            }
          }
        } else {
          this.enoughCondition[i] = false;
        }
      }
    } catch (err) {
      console.log(err);
      toast.erorr(err.toString());
    }
  };

  getAllAddressCustomer = async () => {
    if (this.dataApp.isLogin === false) return;
    this.isLoadingAddress = true;
    try {
      const res = await RepoManager.address.getAllAddressCustomer();
      this.infoAddressCustomer = res.data?.data?.length
        ? res.data?.data[0]
        : null;

      (res.data?.data ?? []).forEach(element => {
        if (element.is_default) {
          this.infoAddressCustomer = element;
        }
      });
      await this.getListShipper(this.infoAddressCustomer.id);
    } catch (err) {
      // Toast.show({message: err.toString()});
    }
    this.isLoadingAddress = false;
  };

  chargeShipmentFee = async (idAddressCustomer, idShipper, name) => {
    this.isLoadingShipmentMethod = true;
    try {
      const res = await RepoManager.address.chargeShipmentFee(
        idAddressCustomer,
        idShipper,
      );
      console.log('res', res?.data?.data.fee_with_type_ship[0]);
      this.shipmentMethodCurrent =
        res?.data?.data != null
          ? {
              ...res?.data?.data.fee_with_type_ship[0],
              partner_shipper_id: res?.data?.data.partner_id,
              name: name,
            }
          : {fee: 0};
      this.addVoucherCart('', v => {});
    } catch (err) {
      console.log(err);
      toast.erorr(err.toString());
    }
    this.isLoadingShipmentMethod = false;
  };

  getListShipper = async idAddressCustomer => {
    this.isLoadingShipmentMethod = true;
    try {
      const res = await RepoManager.address.getListShipper(idAddressCustomer);
      res.data?.data?.forEach(item => {
        this.chargeShipmentFee(idAddressCustomer, item.partner_id, item.name);
      });
    } catch (err) {
      console.log(err);
      toast.erorr('Bạn cần nhập đầy đủ thông tin');
    }
    this.isLoadingShipmentMethod = false;
  };

  getItemCart = async () => {
    if (!this.dataApp.isLogin) {
      return;
    }
    const listQuantityProductNew = [];
    //this.listOrder = [];
    try {
      const res = await RepoManager.cart.getItemCart(
        this.voucherCodeChoose,
        this.cartData.isUsePoints,
        this.isUseBalanceCollaborator,
        this.shipmentMethodCurrent.fee,
      );

      this.sortLineItem(res?.data);
      console.log('dataaaâ:  ', res);
      this.listUsedCombo = res.data?.data?.used_combos;
      this.listOrder.forEach(element => {
        listQuantityProductNew.push(element.quantity);
      });

      this.cartData = res.data?.data;
      this.balanceCollaboratorCanUse =
        res.data?.data?.balance_collaborator_can_use || 0;
      this.balanceAgencyCanUse = res.data?.data?.balance_agency_can_use || 0;
      this.balanceCollaboratorUsed =
        res.data?.data?.balance_collaborator_used || 0;
      this.balanceAgencyUsed = res.data?.data?.balance_agency_used || 0;
      this.listQuantityProduct = listQuantityProductNew;
      this.getComboCustomer();
    } catch (err) {
      console.log(err);
      toast.erorr(err.toString());
    }
    this.isLoadingRefresh = false;
  };

  addVoucherCart = async (codeVoucher, callbackErr) => {
    this.loading = true;
    const listQuantityProductNew = [];
    this.cartData.voucher_discount_amount = 0.0;
    try {
      const res = await RepoManager.cart.addVoucherCart({
        codeVoucher: codeVoucher,
        isUsePoints: this.cartData.is_use_points,
        isUseBalanceCollaborator: this.isUseBalanceCollaborator,
        isUseBalanceAgency: this.isUseBalanceAgency,
        totalShippingFee: this.shipmentMethodCurrent.fee,
        isOrderForCustomer: this.cartData.is_order_for_customer || false,
      });

      this.sortLineItem(res?.data);
      this.listUsedCombo = res.data?.data?.used_combos;
      this.listOrder.forEach(element => {
        listQuantityProductNew.push(element.quantity);
      });

      this.listQuantityProduct = listQuantityProductNew;
      this.cartData = res.data?.data;
      this.balanceCollaboratorCanUse =
        res.data?.data.balance_collaborator_can_use || 0;
      this.balanceAgencyCanUse = res.data?.data?.balance_agency_can_use || 0;
      this.balanceCollaboratorUsed =
        res.data?.data.balance_collaborator_used || 0;
      this.balanceAgencyUsed = res.data?.data?.balance_agency_used || 0;
      console.log('=======================', this.cartData.is_use_points);
      this.getComboCustomer();
      callbackErr('success');
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  };

  addItemCart = async (idProduct, quantity, listDistributes) => {
    if (this.dataApp.isLogin === true) {
      const listQuantityProductNew = [];

      try {
        const res = await RepoManager.cart.addItemCart(
          idProduct,
          quantity,
          listDistributes,
        );
        this.sortLineItem(res?.data);
        this.listUsedCombo = res?.data?.data?.used_combos;
        this.listOrder.forEach(element => {
          listQuantityProductNew.push(element.quantity);
        });
        this.listQuantityProduct = listQuantityProductNew;
        this.cartData = res.data?.data;
        this.getComboCustomer();
        toast.success('Đã thêm vào giỏ hàng');
      } catch (err) {
        console.log(err);
        toast.erorr(err.toString());
      }
    } else {
    }
  };

  sortLineItem = res => {
    this.listOrder = [];
    const listBonus = (res.data.lineItems || []).filter(
      e => e.isBonus === true,
    );

    listBonus.sort(
      (a, b) =>
        (b.parent_cart_item_ids || '').length -
        (a.parent_cart_item_ids || '').length,
    );

    if (listBonus.length > 0) {
      for (let i = 0; i < listBonus.length; i++) {
        const listId = (listBonus[i].parent_cart_item_ids || '').split(';');
        listId.filter(e => e !== '');

        console.log('sản phẩm thưởng =========', listBonus[i].id);
        console.log('danh sách cha ==========', listId);

        let indexInsert = 0;

        for (let id of listId) {
          indexInsert = this.listOrder.map(e => e.id).indexOf(id);

          console.log(indexInsert);

          if (indexInsert === -1) {
            this.listOrder.push(res.data.line_items.find(e => e.id == id));
            console.log('thêm vào show:', id);
          }
        }

        if (indexInsert !== -1) {
          console.log('========', indexInsert);
          for (let ins = indexInsert + 1; ins < this.listOrder.length; ins++) {
            if (this.listOrder[ins].is_bonus === true) {
              console.log('gặp isbonus ở vị trí :', ins);
              this.listOrder.splice(ins, 0, listBonus[i]);
              break;
            }
          }
        } else {
          this.listOrder.push(listBonus[i]);
        }

        console.log(
          'danh sách show:',
          this.listOrder.map(e => e.id),
        );
      }

      for (let i = 0; i < res.data.line_items.length; i++) {
        if (
          !this.listOrder.map(e => e.id).includes(res.data.line_items[i].id)
        ) {
          this.listOrder.push(res.data.line_items[i]);
        }
      }
    } else {
      this.listOrder = res.data.line_items;
    }
  };

  refresh = async () => {
    this.isLoadingRefresh = true;
    this.listCombo = [];
    this.listUsedCombo = [];
    this.listOrder = [];
    this.listQuantityProduct = [];
    this.getItemCart();
  };

  setPaymentMethodId = paymentMethodId => {
    this.paymentMethodId = paymentMethodId;
  };

  setPaymentPartnerId = paymentPartnerId => {
    this.paymentPartnerId = paymentPartnerId;
  };

  setPaymentMethodName = paymentMethodName => {
    this.paymentMethodName = paymentMethodName;
  };

  /// address Receiver

  getAllAddressCustomerReceiver = async () => {
    this.isLoadingAddressReceiver = true;
    try {
      const res = await RepoManager.address.getAllAddressCustomer();
      this.listInfoAddressCustomer = res.data?.data ?? [];
    } catch (err) {
      // Toast.show({message: err.toString()});
    }
    this.isLoadingAddressReceiver = false;
  };
}

const cartStore = new CartStore();

export const CartStoreContext = React.createContext(cartStore);
export const useCartStore = () => React.useContext(CartStoreContext);
