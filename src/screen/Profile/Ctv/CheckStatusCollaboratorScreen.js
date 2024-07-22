import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../../store/DataAppStore';
import Scaffold from '../../../components/Scafold';
import IAppBar from '../../../components/AppBar';
import Column from '../../../components/Column';
import SizedBox from '../../../components/SizedBox';
import {useCtvStore} from '../../../store/CtvStore';

const CheckStatusCollaboratorScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge, infoCustomer} = useDataAppStore();
  const {infoCtv, generalInfoPaymentCtv} = useCtvStore();

  useEffect(() => {}, []);

  return (
    <Scaffold
      appbar={<IAppBar title={'Cộng tác viên'}></IAppBar>}
      body={
        <Column mainAxisAlignment={'center'} crossAxisAlignment={'center'}>
          <Text>
            {badge.collaborator_register_request?.status == 1
              ? 'Yêu cầu của bạn không được chấp thuận'
              : badge.collaborator_register_request?.status == 0
              ? 'Yêu cầu đang chờ duyệt'
              : badge.collaborator_register_request?.status == 3
              ? 'Đang yêu cầu duyệt lại'
              : 'Trạng thái khác'}
          </Text>
          <SizedBox height={20}></SizedBox>
          {badge.collaborator_register_request?.status == 1 && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: 'red',
                borderRadius: 10,
                width: 100,
              }}
              onPress={() => {
                navigation.navigate('UPDATE_CTV', {isFromCheckStatus: true});
              }}>
              <Text style={{color: 'white', textAlign:"center"}}>Gửi lại</Text>
            </TouchableOpacity>
          )}
        </Column>
      }></Scaffold>
  );
});

export default CheckStatusCollaboratorScreen;
