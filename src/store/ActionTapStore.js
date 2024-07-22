import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';

class ActionTapStore {
  listBonus = [];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      listBonus: observable,
      isLoading: observable,
      getBonus: action.bound,
    });
  }

  getBonus = async product => {
    this.isLoading = true;
    this.listBonus = [];
    try {
      var data = await RepoManager.actionTap.getBonusCustomer(product?.id);
      if (product) {
        data.data.data.map(e => {
          if (e.ladder_reward === false) {
            var checkHasInCombo = e.select_products.findIndex(
              element => element.product.id === product?.id,
            );
            if (checkHasInCombo !== -1) {
              this.listBonus.push(e);
            }
          } else {
            var checkHasInCombo = e.bonus_products_ladder.findIndex(
              element => element.product.id === product?.id,
            );
            if (checkHasInCombo !== -1) {
              this.listBonus.push(e);
            }
          }
        });
      } else {
        
        this.listBonus = data.data.data;

        console.log('listBonus', this.listBonus);
      }
      this.isLoading = false;
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  };
}

const actionTapStore = new ActionTapStore();

export const actionTapStoreContext = React.createContext(actionTapStore);
export const useActionTapStore = () => React.useContext(actionTapStoreContext);
