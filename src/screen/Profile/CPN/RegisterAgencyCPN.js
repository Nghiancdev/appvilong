import React, {useEffect, useRef} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';

import {observer} from 'mobx-react';

import StoreCode from '../../../singletons/StoreCode';
import Scaffold from '../../../components/Scafold';
import IAppBar from '../../../components/AppBar';
import SizedBox from '../../../components/SizedBox';
import IButton from '../../../components/IButton';
import {useDataAppStore} from '../../../store/DataAppStore';
import Container from '../../../components/Container';
import Column from '../../../components/Column';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const RegisterAgencyCPN = observer(({child}) => {
  useEffect(() => {}, []);
  const {infoCustomer} = useDataAppStore();
  const windowWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  return infoCustomer?.is_agency == true && infoCustomer?.is_agency != null ? (
    child
  ) : (
    <Scaffold
      appbar={<IAppBar title={'Điều khoản Đại lý'}></IAppBar>}
      body={
        <ScrollView>
          <Column padding={10}>
            <SizedBox height={10}></SizedBox>
            <Text>
              {`Chính sách giá\n\nTrên ${StoreCode.getStoreCode()}, toàn bộ sản phẩm đều có thể mua với giá được chiết khấu cao khi đăng ký trở thành Người Bán. Đồng thời Người Bán có thể nhận hoa hồng khi giới thiệu thành công cho bạn bè/ bên thứ ba mua sản phẩm trên ${StoreCode.getStoreCode()}.\nBằng việc minh bạch thông tin sản phẩm và hướng dẫn chi tiết, ${StoreCode.getStoreCode()} giúp người dùng tìm được sản phẩm tốt nhất cho mình và với những ai đam mê kinh doanh, ${StoreCode.getStoreCode()} sẽ giúp bạn vận hành, tối ưu toàn diện công việc kinh doanh của mình.`}
            </Text>
            <SizedBox height={20}></SizedBox>
            <Text>{`Chính sách đổi trả\n\nThời hạn đổi trả hàng hóa khi mua hàng tại ${StoreCode.getStoreCode()} được thực hiện trong thời hạn 14 ngày kể từ khi nhận được yêu cầu đổi trả từ Khách hàng. ${StoreCode.getStoreCode()} thực hiện theo phương thức một đổi một hoặc hoàn tiền bằng cách chuyển khoản vào tài khoản của khách hàng. Mọi chi phí phát sinh nếu có trong quá trình đổi trả hàng hóa sẽ do ${StoreCode.getStoreCode()} chịu.`}</Text>
            <SizedBox height={20}></SizedBox>
            <Text>{`Chính sách giao hàng\n\nViệc tính phí giao hàng sẽ được ${StoreCode.getStoreCode()} niêm yết công khai rõ ràng cho mỗi lần giao sản phẩm. ${StoreCode.getStoreCode()} sẽ thực hiện giao hàng đúng địa chỉ khách hàng yêu cầu và trong thời hạn từ 03 đến 07 ngày tùy địa điểm giao hàng được áp dụng. Nếu có bất kỳ sự phát sinh nào gây chậm trễ cho việc giao hàng, ${StoreCode.getStoreCode()} sẽ thông báo ngay trong ngày cho Khách hàng để hai bên cùng giải quyết. `}</Text>
            <SizedBox height={20}></SizedBox>
            <Text>{`Nghĩa vụ chung của bên bán và bên mua\n\nMỗi giao dịch sẽ được thực hiện đầy đủ theo đúng quy định của pháp luật hiện hành. Mọi phát sinh khi mua bán hàng hóa được giao dịch theo phương thức thỏa thuận trực tiếp giữa hai bên hoặc theo Hợp đồng điện tử đã ký kết giữa bên bán và bên mua. Bên bán và bên mua phải thực hiện theo đúng quy định của pháp luật, thực hiện đầy đủ các quyền lợi và nghĩa vụ như cam kết khi phát sinh cho mỗi lần giao dịch mua bán hàng hóa.`}</Text>
          </Column>
        </ScrollView>
      }
      bottomNavigationBar={
        <Container
          height={85}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={5}
          child={
            <IButton
              text={'Chấp nhận điều khoản'}
              onPress={() => {
                navigation.navigate('UPDATE_AGENCY');
              }}></IButton>
          }></Container>
      }></Scaffold>
  );
});

export default RegisterAgencyCPN;
