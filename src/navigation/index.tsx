import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import * as routes from './routes';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';
import {Platform} from 'react-native';

import NavigationScreen from '../screen/NavigationScreen';
import ProductScreen from '../screen/Product/ProductScreen';
import LoginScreen from '../screen/Login/LoginScreen';
import NewsDetailScreen from '../screen/News/News_Detail/NewsDetailScreen';
import CartScreen from '../screen/Cart/CartScreen';
import ConfirmScreen from '../screen/Confirm/ConfirmScreen';
import AddressReceiverScreen from '../screen/Address/AddressReceiverScreen';
import NewAddressScreen from '../screen/Address/NewAddressScreen';
import ChooseAddressScreen from '../screen/Address/ChooseAddressScreen';
import AddressScreen from '../screen/Address/AddressScreen';
import ShipmentScreen from '../screen/Shipment/ShipmentScreen';
import VoucherScreen from '../screen/Voucher/VoucherScreen';
import ConditionScreen from '../screen/Voucher/ConditionScreen';
import PaymentScreen from '../screen/Payment/PaymentScreen';
import OrderScreen from '../screen/Order/OrderScreen';
import OrderDetailScreen from '../screen/Order/OrderDetail/OrderDetailScreen';
import OrderSuccessScreen from '../screen/OrderSuccess/OrderSuccessScreen';
import ReviewScreen from '../screen/Order/Review/ReviewScreen';
import CategorieScreen from '../screen/Categories/CategorieScreen';
import SearchProductScreen from '../screen/SearchProduct/SearchProductScreen';
import CategorieSubScreen from '../screen/Categories/CategorieSubScreen';
import PointScreen from '../screen/Profile/PointScreen';
import PurcharsedProductScreen from '../screen/Profile/PurcharsedProductScreen';
import LikedProductScreen from '../screen/Profile/LikedProductScreen';
import ContactScreen from '../screen/Profile/ContactScreen';
import RegisterScreen from '../screen/Register/RegisterScreen';
import ValidateMethodScreen from '../screen/Register/ValidateMethodScreen';
import OTPScreen from '../screen/Register/OTPScreen';
import CtvWalletScreen from '../screen/Profile/Ctv/CtvWalletScreen';
import UpdateCtvScreen from '../screen/Profile/Ctv/UpdateCtvScreen';
import CheckStatusCollaboratorScreen from '../screen/Profile/Ctv/CheckStatusCollaboratorScreen';
import PaymentHistoryScreen from '../screen/Profile/Ctv/PaymentHistoryScreen';
import OrderCTVScreen from '../screen/Profile/Ctv/OrderCtv/OrderScreen';
import ReportRoseScreen from '../screen/Profile/Ctv/ReportRoseScreen';
import CtvIntroduceScreen from '../screen/Profile/Ctv/CtvIntroduceScreen';
import PaymentInfoScreen from '../screen/Profile/Ctv/PaymentInfoScreen';
import AgencyWalletScreen from '../screen/Profile/Agency/AgencyWalletScreen';
import UpdateAgencyScreen from '../screen/Profile/Agency/UpdateAgencyScreen';
import CheckStatusAgencyScreen from '../screen/Profile/Agency/CheckStatusAgencyScreen';
import OrderAgencyScreen from '../screen/Profile/Agency/OrderCtv/OrderScreen';
import PaymentInfoAgencyScreen from '../screen/Profile/Agency/PaymentInfoScreen';
import PaymentHistoryAgencyScreen from '../screen/Profile/Agency/PaymentHistoryScreen';
import ReportRoseAgencyScreen from '../screen/Profile/Agency/ReportRoseScreen';
import AgencyIntroduceScreen from '../screen/Profile/Agency/AgencyIntroduceScreen';
import ChatListScreen from '../screen/Chat/ChatListScreen';
import ChatScreen from '../screen/Chat/ChatScreen';
import BonusScreen from '../screen/Bonus/BonusScreen';
import BonusDetailScreen from '../screen/Bonus/BonusDetailScreen';
import NewScreen from '../screen/News/NewScreen';
import CodeRetroductScreen from '../screen/Profile/CodeRetroductScreen';
import ShareScreen from '../screen/Product/ShareScreen';
import NotiScreen from '../screen/Noti/NotiScreen';
import ComboDetailScreen from '../screen/Combo/ComboDetailScreen';
import ForgotPassword from '../screen/Login/ForgotPasswordScreen';
import OtpForgotPasswordScreen from '../screen/Login/OtpForgotPasswordScreen';
import ShareNewsScreen from '../screen/News/News_Detail/ShareNewsScreen';
import UpdateProfileScreen from '../screen/Profile/UpdateProfileScreen';
import UpdatePasswordScreen from '../screen/Profile/UpdatePasswordScreen';

export default function Navigation({theme}: {theme: Theme}) {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={routes.HOME}
      screenOptions={{
        header: props => <></>,
        presentation: Platform.select({
          ios: 'card',
          android: 'transparentModal',
        }),
      }}>
      <Stack.Screen
        name={routes.HOME}
        component={NavigationScreen}
        //options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.PRODUCT}
        component={ProductScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.FORGOT_PASSWORD}
        component={ForgotPassword}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.OTP_FORGOT_PASSWORD}
        component={OtpForgotPasswordScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.NEWS_DETAIL_SCREEN}
        component={NewsDetailScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CART}
        component={CartScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CONFIRM}
        component={ConfirmScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.ADDRESS_RECEIVER}
        component={AddressReceiverScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.NEW_ADDRESS}
        component={NewAddressScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CHOOSE_ADDRESS_API}
        component={ChooseAddressScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.MY_ADDRESS}
        component={AddressScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.SHIPMENT}
        component={ShipmentScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.VOUCHER}
        component={VoucherScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CONDITION_VOUCHER}
        component={ConditionScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.PAYMENT}
        component={PaymentScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.ORDER}
        component={OrderScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.ORDER_DETAIL}
        component={OrderDetailScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.ORDER_SUCCESS}
        component={OrderSuccessScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.REVIEW}
        component={ReviewScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.UPDATE_PROFILE}
        component={UpdateProfileScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.UPDATE_PASSWORD}
        component={UpdatePasswordScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CATEGORIES}
        component={CategorieScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CATEGORIES_SUB}
        component={CategorieSubScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.SEARCH_PRODUCT}
        component={SearchProductScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.POINT}
        component={PointScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.PURCHARSED_PRODUCT}
        component={PurcharsedProductScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.LIKED_PRODUCT}
        component={LikedProductScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CONTACT}
        component={ContactScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.VALIDATE_METHOD}
        component={ValidateMethodScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.OTP}
        component={OTPScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CTV}
        component={CtvWalletScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.UPDATE_CTV}
        component={UpdateCtvScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CHECK_STT_CTV}
        component={CheckStatusCollaboratorScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.PAYMENT_HISTORY_CTV}
        component={PaymentHistoryScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.ORDER_CTV}
        component={OrderCTVScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.REPORT_ROSE}
        component={ReportRoseScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CTV_INTRODUCT}
        component={CtvIntroduceScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CTV_PAYMENT_INFO}
        component={PaymentInfoScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.AGENCY}
        component={AgencyWalletScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.UPDATE_AGENCY}
        component={UpdateAgencyScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CHECK_STT_AGENCY}
        component={CheckStatusAgencyScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.ORDER_AGENCY}
        component={OrderAgencyScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.AGENCY_PAYMENT_INFO}
        component={PaymentInfoAgencyScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.PAYMENT_HISTORY_AGENCY}
        component={PaymentHistoryAgencyScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.REPORT_ROSE_AGENCY}
        component={ReportRoseAgencyScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.AGENCY_INTRODUCT}
        component={AgencyIntroduceScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CHAT_LIST}
        component={ChatListScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CHAT_VIEW}
        component={ChatScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.BONUS}
        component={BonusScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.BONUS_DETAIL}
        component={BonusDetailScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.NEW}
        component={NewScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.SHARENEWSSCREEN}
        component={ShareNewsScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.CODE_RETRODUCE}
        component={CodeRetroductScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.SHARE}
        component={ShareScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.NOTI}
        component={NotiScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
      <Stack.Screen
        name={routes.COMBO_DETAIL}
        component={ComboDetailScreen}
        // options={{title: 'New Class', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
