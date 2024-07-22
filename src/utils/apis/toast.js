import Toast from 'react-native-toast-message';

const erorr = (mess) => {
  Toast.show({
    type: 'error',
    text1: mess,
  });
};

const success = (mess) => {
  Toast.show({
    type: 'success',
    text1: mess,
  });
};

export const toast = {
  success,
  erorr,
};
