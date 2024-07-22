// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';

class NewStore {
  loading = true;
  loadInitNew = true;
  news = null;
  itemNew = null;
  categoryNews = [];
  constructor() {
    makeObservable(this, {
      loading: observable,
      news: observable,
      categoryNews: observable,
      loadInitNew: observable,
      itemNew: observable,
    });
  }

  getAllNews = async (search, category_ids, descending, sort_by) => {
    try {
      this.loading = true;
      const res = await RepoManager.news.getAllNews(
        search,
        category_ids,
        descending,
        sort_by,
      );
      this.news = res?.data?.data?.data;

      console.log(
        'response',
        res?.data?.data,
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getAllCategoryNews = async () => {
    try {
      this.loading = true;
      const res = await RepoManager.news.getAllCategoryNews();
      this.categoryNews = res?.data?.data;
      this.categoryNews.unshift({title: 'Tất cả'});
      console.log(
        'response ==================================',
        res?.data?.data,
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  };

  getOneNew = async newId => {
    try {
      this.loadInitNew = true;
      const res = await RepoManager.news.getOneNew(newId);
      this.itemNew = res?.data?.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loadInitNew = false;
    }
  };
}
const newStore = new NewStore();
export const NewStoreContext = React.createContext(newStore);
export const useNewStore = () => React.useContext(NewStoreContext);
