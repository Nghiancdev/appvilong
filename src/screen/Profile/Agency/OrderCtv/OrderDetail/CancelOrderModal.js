import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Row from '../../../../../components/Row';
import IButton from '../../../../../components/IButton';
import Column from '../../../../../components/Column';
import {useDataAppStore} from '../../../../../store/DataAppStore';
import {useState} from 'react';
import SizedBox from '../../../../../components/SizedBox';
import {toast} from '../../../../../utils/apis/toast';

export default function CancelOrderModal({isShowDrawer, onClose, onSubmit}) {
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  const {appTheme} = useDataAppStore();

  var listReasonCancelOrder = [
    'Muốn thay đổi địa chỉ giao hàng',
    'Muốn nhập/thay đổi mã Voucher',
    'Muốn thay đổi sản phẩm trong đơn hàng(size, màu sắc, số lượng,...',
    'Thủ tục thanh toán quá rắc rối',
    'Tìm thấy giá rẻ hơn chỗ khác',
    'Đổi ý không muốn mua nữa',
  ];

  const [reasonChoose, setReasonChoose] = useState('');

  const itemChoose = (title, onPress) => {
    return (
      <TouchableOpacity onPress={onPress} style={{width: deviceWidth}}>
        <Row padding={10}>
          <View
            style={{
              position: 'relative',
              width: 20,
              height: 20,
              borderRadius: 1000,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: appTheme.color_main_1,
              borderWidth: 1,
              backgroundColor: 'white',
            }}>
            {reasonChoose == title && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: appTheme.color_main_1,
                  borderRadius: 1000,
                }}></View>
            )}
          </View>
          <SizedBox width={10}></SizedBox>
          <Text style={{flex: 1}}>{title}</Text>
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={isShowDrawer} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={() => onClose()}>
        <View
          style={{height: deviceHeight, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        behavior={Platform.OS === 'android' ? 'padding' : 'position'}>
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
          <View
            style={{
              minHeight: 250, // Đặt giá trị minHeight thay vì cứng chiều cao
              backgroundColor: 'white',
              elevation: 5, // Thêm đổ bóng
              shadowColor: 'black', // Màu đổ bóng
              shadowOffset: {width: 0, height: 2}, // Độ lệch đổ bóng theo chiều ngang và dọc
              shadowOpacity: 0.2, // Độ trong suốt của đổ bóng
              shadowRadius: 3, // Bán kính của đổ bóng
              borderTopLeftRadius: 20, // Bo góc trên trái
              borderTopRightRadius: 20, // Bo góc trên phải
              justifyContent: 'center',
            }}>
            <Column crossAxisAlignment={'center'}>
              <Row padding={10} backgroundColor={'#FFDADA'}>
                <Text style={{color: appTheme.color_main_1}}>
                  Vui lòng chọn lí do huỷ đơn hàng. Lưu ý thao tác này sẽ huỷ
                  tất cả các sản phẩm có trong đơn hàng và không thể hoàn tác
                </Text>
              </Row>
              {listReasonCancelOrder.map((item, index) => {
                return itemChoose(item, () => {
                  setReasonChoose(item);
                });
              })}
              <SizedBox height={10}></SizedBox>
              <IButton
                text={'XÁC NHẬN'}
                width={deviceWidth - 50}
                onPress={() => {
                  if (reasonChoose == '') {
                    toast.erorr('Vui lòng chọn lí do huỷ đơn hàng');
                    return;
                  }
                  onSubmit(reasonChoose);
                }}></IButton>
              <SizedBox height={30}></SizedBox>
            </Column>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
