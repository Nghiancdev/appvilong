import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {fcmService} from '../../fcm/FCMService';

class UserDataUtil {
  static myInstance = null;

  /**
   * @returns {UserDataUtil}
   */

  _token = null;
  collaboratorByCustomerId = null;
  phoneNumberIntroduce = null;

  static getInstance() {
    if (UserDataUtil.myInstance == null) {
      UserDataUtil.myInstance = new UserDataUtil();
    }
    return this.myInstance;
  }

  getToken() {
    return this._token;
  }

  setToken(id) {
    this._token = id;
  }

  init = async () => {
    this._token = await this.getTokenData();
    console.log('this._token', this._token);
    this.phoneNumberIntroduce = await this.getPhoneNumberIntroduceData();
    this.collaboratorByCustomerId =
      await this.getCollaboratorByCustomerIdData();
    // if (this._token == null) {
    //   fcmService.getToken();
    // } else {
    //   return true;
    // }
  };

  getCollaboratorByCustomerId() {
    return this.collaboratorByCustomerId;
  }

  getPhoneNumberIntroduce() {
    return this.phoneNumberIntroduce;
  }

  setCollaboratorByCustomerId = async (
    phoneNumberIntroduce,
    collaboratorByCustomerId,
  ) => {
    if (phoneNumberIntroduce == null) {
    } else {
      await AsyncStorage.setItem('PHONE_NUMBER', phoneNumberIntroduce);
    }
    this.phoneNumberIntroduce = phoneNumberIntroduce;

    if (collaboratorByCustomerId == null) {
    } else {
      await AsyncStorage.setItem('COLLAB_ID', collaboratorByCustomerId);
    }
    this.collaboratorByCustomerId = collaboratorByCustomerId;
  };

  saveTokenData = async token => {
    console.log('Token Login Đang được set !!', token);
    try {
      await AsyncStorage.setItem('token', token);
      this._token = token;
      console.log("this._tokenthis._token", this._token)
      if (token != null) {
        fcmService.getToken();
      } 
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  getTokenData = async () => {
    console.log("123")
    try {
      const token = await AsyncStorage.getItem('token');
      this._token = token;
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  getPhoneNumberIntroduceData = async () => {
    try {
      const phoneNumberIntroduce = await AsyncStorage.getItem('PHONE_NUMBER');
      this.phoneNumberIntroduce = phoneNumberIntroduce;
      return phoneNumberIntroduce;
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  getCollaboratorByCustomerIdData = async () => {
    try {
      const collaboratorByCustomerId = await AsyncStorage.getItem('COLLAB_ID');
      this.collaboratorByCustomerId = collaboratorByCustomerId;
      return collaboratorByCustomerId;
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };
}

const UserUtil = new UserDataUtil();
export default UserUtil;
