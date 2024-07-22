import axios from 'axios';
import {constants} from '../../constants';
import UserUtil from './userUtil';
import Toast from 'react-native-toast-message';
import {v4 as uuidv4} from 'uuid';
const exceptPrefix = ['/login', '/register'];

const checkEndPoint = endpoint => {
  for (const prefix of exceptPrefix) {
    if (endpoint.includes(prefix)) {
      return true;
    }
  }
  return false;
};

export const callApi = (endPoint, method, body) => {
  console.log('endPoint =============', endPoint);
  console.log('body =============', body);
  function generateRandomId(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  // console.log('token =============', UserUtil.getToken());
  // console.log('deviceId===========', generateRandomId(16));
  if (checkEndPoint(endPoint) === false) {
    axios.interceptors.request.use(
      config => {
        const token = UserUtil.getToken();
        if (token) {
          config.headers['customer-token'] = token;
          // config.headers['device-id'] = generateRandomId(16);
        }
        // console.log('headers =========== ', config);
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    axios.interceptors.response.use(
      response => {
        //  console.log('RESPONSE =============>', response?.data);
        return response;
      },
      error => {
        Toast.show({
          type: 'error',
          text1: error?.response?.data?.msg,
        });
        if (error?.response?.data?.code === 404) {
        } else if (error?.response?.data?.code === 401) {
          Toast.show({
            type: 'error',
            text1: error?.response?.data?.msg,
          });
          console.log('error =============', error?.response?.data?.msg);

          UserUtil.removeToken();
          // history.push("/login")
        }
        return Promise.reject(error);
      },
    );
  }

  // console.log('endPoint =============', endPoint);
  // console.log('method =============', method);
  // console.log('body =============', body);

  let data = axios({
    method,
    url: `${constants.API_URL}${endPoint}`,
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // const requestOptions = {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //     token: tokenInfo ? tokenInfo : "",
  //   },
  //   body: JSON.stringify(data),
  // };
  // return fetch(`${c.API_URL}/qc/qc-evaluate-group/${id}`, requestOptions)
  //   .then((res) => res.json())
  //   .then((json) => {
  //     console.log(json);
  //     return json;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return {};
  //   });

  return data;
};
