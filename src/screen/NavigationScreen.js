import React, { useEffect } from 'react';
import {
  View,
  // @ts-ignore
  Text,
  // @ts-ignore
  Button,
  StyleSheet,
 
  // @ts-ignore
  KeyboardAvoidingView,
  // @ts-ignore
  Easing,
} from 'react-native';

// @ts-ignore
import { Badge, BottomNavigation, useTheme } from 'react-native-paper';
import HomeScreen from './Home/HomeScreen';
import ProfileScreen from './Profile/ProfileScreen';
import NewScreen from './News/NewScreen';
import CartScreen from './Cart/CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategorieScreen from './Categories/CategorieScreen';
import ProfileIcon from '../components/Icons/ProfileIcon';
import HomeIcon from '../components/Icons/HomeIcon';
import CartIcon from '../components/Icons/CartIcon';
import CateAllIcon from '../components/Icons/CateAllIcon';
import DocumentIcon from '../components/Icons/DocumentIcon';
import { useDataAppStore } from '../store/DataAppStore';
import { observer } from 'mobx-react-lite';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import queryString from 'query-string';
import UserUtil from '../utils/apis/userUtil';

// @ts-ignore
const NavigationScreen = observer(({navigation}) => {
  // @ts-ignore
  const theme = useTheme();

  const Tab = createBottomTabNavigator();

  const { badge } = useDataAppStore();
  const initDynamicLink = async() => {
    // if (Platform.OS === 'ios') {
    //   (async () => {
    //     //this is silent to the user
    //     const hasUrl = await Clipboard.hasUrl();
    //     if (hasUrl) {
    //       //calling this will pop up to the user, asking if they will allow paste
    //       const urlString = await Clipboard.getString();
    //       console.log("dynamic link clipboard",urlString)
    //       // const linkedUrl = findUrlFromDynamicLink(urlString);

    //       // if (linkedUrl) {
    //       //   Clipboard.setString('');
    //       //   //same handler we use from await dynamicLinks().getInitialLink(); or dynamicLinks().onLink(handleDynamicLink);
    //       //   //await handleDynamicLink();
    //       // }
    //     }
    //   })();
    // }
    dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        // @ts-ignore
        const parsed = queryString.parseUrl(link.url);
        const phoneNumber = parsed.query.phone_number;
        const productId = parsed.query.product_id;
        console.log("dynamic link",link);
        if (UserUtil.getPhoneNumberIntroduce() == null && phoneNumber != null) {
          UserUtil.setCollaboratorByCustomerId(phoneNumber, null)
        }
        if (productId != null) {
          navigation.navigate('PRODUCT', {
            productId: productId
          })
        }
      });
    
  }

  // @ts-ignore
  const handleDynamicLink = (link) => {
    const parsed = queryString.parseUrl(link.url);
    const phoneNumber = parsed.query.phone_number;
    console.log("dynamic link background",link);
    if (UserUtil.getPhoneNumberIntroduce() == null && phoneNumber != null) {
      UserUtil.setCollaboratorByCustomerId(phoneNumber, null)
    }
    const productId = parsed.query.product_id;
    if (productId != null) {
      navigation.navigate('PRODUCT', {
        productId: productId
      })
    }
  }
  useEffect(() => {

    initDynamicLink();
  }, []);
  return (
    <View style={styles.screen}>
      <Tab.Navigator
        // @ts-ignore
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            paddingHorizontal: 5,

            backgroundColor: 'white',
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            paddingVertical: 5,
          },

        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            // tabBarLabelStyle: {
            //   paddingVertical: 15,
            // },
            // @ts-ignore
            tabBarIcon: ({ color, size }) => <HomeIcon color={color}></HomeIcon>,
          }}
        />
        <Tab.Screen
          name="New"
          component={NewScreen}
          options={{
            tabBarLabel: 'Tin tức',
            // tabBarLabelStyle: {
            //   paddingVertical: 15,
            // },
            // @ts-ignore
            tabBarIcon: ({ color, size }) => (
              <DocumentIcon color={color}></DocumentIcon>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: 'Giỏ hàng',
            // tabBarLabelStyle: {
            //   paddingVertical: 15,
            // },
            // @ts-ignore
            tabBarIcon: ({ color, size }) => (
              <View>
                <CartIcon color={color}></CartIcon>
                {(
// @ts-ignore
                badge.cart_quantity ?? 0) > 0 && (
                  <Badge style={{ position: 'absolute', top: -6, right: -10 }}>
                    {
// @ts-ignore
                    badge.cart_quantity}
                  </Badge>
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategorieScreen}
          options={{
            tabBarLabel: 'Danh mục',
            // tabBarLabelStyle: {
            //   paddingVertical: 15,
            // },
            // @ts-ignore
            tabBarIcon: ({ color, size }) => (
              <CateAllIcon color={color}></CateAllIcon>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Tài khoản',
            // tabBarLabelStyle: {
            //   paddingVertical: 15,
            // },
            // @ts-ignore
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon color={color}></ProfileIcon>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default NavigationScreen;
