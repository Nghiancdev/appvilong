class StoreCodeSingleton {
  static myInstance = null;

  /**
   * @returns {StoreCodeSingleton}
   */

  _storeCode = "";
  _storeName = "";

  static getInstance() {
    if (StoreCodeSingleton.myInstance == null) {
        StoreCodeSingleton.myInstance = new StoreCodeSingleton();
    }
    return this.myInstance;
  }

  getStoreCode() {
    return this._token;
  }

  setStoreCode(id) {
    this._token = id;
  }
  getStoreName() {
    return this._storeName;
  }

  setStoreName(name) {
    this._storeName = name;
  }

 
}

const StoreCode = new StoreCodeSingleton();
export default StoreCode;
