// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import {toast} from '../utils/apis/toast';
import {useNavigation} from '@react-navigation/native';
import {useDataAppStore} from './DataAppStore';
import {useCartStore} from './CartStore';

class ComboStore {
  dataAppStore = useDataAppStore();

  cartController = useCartStore();

  discountComboType = 1;
  valueComboType = null;
  listProductCombo = [];
  listQuantityProductNeedBuy = [];
  hadEnough = false;

  constructor() {
    makeObservable(this, {
      discountComboType: observable,
      valueComboType: observable,
      listProductCombo: observable,
      listQuantityProductNeedBuy: observable,
      hadEnough: observable,
      getComboCustomer: action.bound,
      checkProductInCombo: action.bound,
    });
  }

  getComboCustomer = async idProduct => {

    this.listProductCombo = [];
    this.listQuantityProductNeedBuy = [];
    this.hadEnough = false;

    await this.cartController.getItemCart();
    try {
      const res = await RepoManager.combo.getComboCustomer();

      res.data?.data.forEach(e => {
        const checkHasInCombo = e.products_combo.findIndex(
          element => element.product.id === idProduct,
        );
        if (checkHasInCombo !== -1) {
          this.listProductCombo = e.products_combo;
          this.discountComboType = e.discount_type;
          this.valueComboType = e.value_discount;
          this.listProductCombo.forEach(element => {
            this.listQuantityProductNeedBuy.push(element.quantity);
          });

          this.cartController.listOrder.forEach(e => {
            const checkHasInCombos = this.listProductCombo.findIndex(
              element => element.product.id === e.product.id,
            );
            if (checkHasInCombos !== -1) {
              if (
                this.listProductCombo[checkHasInCombos].quantity >= e.quantity
              ) {
                this.listQuantityProductNeedBuy[checkHasInCombos] =
                  this.listProductCombo[checkHasInCombos].quantity - e.quantity;
              } else {
                this.listQuantityProductNeedBuy[checkHasInCombos] = 0;
              }
            }
          });
        }
      });

      for (let i = 0; i < this.listQuantityProductNeedBuy.length; i++) {
        if (this.listQuantityProductNeedBuy[i] !== 0) {
          this.hadEnough = false;
          break;
        } else {
          this.hadEnough = true;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  checkProductInCombo = () => {
    this.cartController.listOrder.forEach(e => {
      const checkHasInCombo = this.listProductCombo.findIndex(
        element => element.product.id === e.product.id,
      );
      if (checkHasInCombo !== -1) {
        this.listQuantityProductNeedBuy[checkHasInCombo] =
          this.listQuantityProductNeedBuy[checkHasInCombo] - e.quantity;
      }
    });

    if (this.cartController.listOrder.length === 0) {
      for (let i = 0; i < this.listProductCombo.length; i++) {
        this.listQuantityProductNeedBuy[i] = this.listProductCombo[i].quantity;
      }
    } else {
      if (
        this.cartController.listOrder.length >= this.listProductCombo.length
      ) {
        this.cartController.listOrder.forEach(e => {
          const checkHasInCombo = this.listProductCombo.findIndex(
            element => element.product.id === e.product.id,
          );
          if (checkHasInCombo !== -1) {
            if (this.listProductCombo[checkHasInCombo].quantity >= e.quantity) {
              this.listQuantityProductNeedBuy[checkHasInCombo] =
                this.listProductCombo[checkHasInCombo].quantity - e.quantity;
            }
          }
        });
      } else {
        for (let i = 0; i < this.listProductCombo.length; i++) {
          const checkHasInCombo = this.cartController.listOrder.findIndex(
            element =>
              element.product.id === this.listProductCombo[i].product.id,
          );
          if (checkHasInCombo !== -1) {
            if (
              this.listProductCombo[i].quantity >=
              this.cartController.listOrder[checkHasInCombo].quantity
            ) {
              this.listQuantityProductNeedBuy[i] =
                this.listProductCombo[i].quantity -
                this.cartController.listOrder[checkHasInCombo].quantity;
            }
          } else {
            this.listQuantityProductNeedBuy[i] =
              this.listProductCombo[i].quantity;
          }
        }
      }
    }

    for (let i = 0; i < this.listQuantityProductNeedBuy.length; i++) {
      if (this.listQuantityProductNeedBuy[i] !== 0) {
        this.hadEnough = false;
        break;
      } else {
        this.hadEnough = true;
      }
    }
  };
}

const comboStore = new ComboStore();

export const comboStoreContext = React.createContext(comboStore);
export const useComboStore = () => React.useContext(comboStoreContext);
