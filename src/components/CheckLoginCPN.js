import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useDataAppStore} from '../store/DataAppStore';
import Column from './Column';
import LockIcon from './Icons/LockIcon';
import Container from './Container';
import {useTheme} from 'react-native-paper';
import SizedBox from './SizedBox';
import {useNavigation} from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

const CheckLoginCPN = observer(({child}) => {
  const {isLogin} = useDataAppStore();
  const navigation = useNavigation();

  const theme = useTheme();

  return (
    <View>
      {isLogin == true ? (
        child
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Column
            flex={0}
            crossAxisAlignment={'center'}
            mainAxisAlignment={'center'}>
            <LockIcon size={50} color={theme.colors.primary}></LockIcon>
            <SizedBox height={30}></SizedBox>
            <Text>Bạn cần đăng nhập để sử dụng chức năng này</Text>
            <SizedBox height={30}></SizedBox>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LOGIN');
              }}>
              <Container
                padding={15}
                borderRadius={5}
                width={200}
                backgroundColor={theme.colors.primary}
                alignItems={'center'}
                child={
                  <Text style={{color: 'white', fontSize: 14}}>
                    Đăng nhập ngay
                  </Text>
                }></Container>
            </TouchableOpacity>
          </Column>
        </View>
      )}
    </View>
  );
});

export default CheckLoginCPN;
