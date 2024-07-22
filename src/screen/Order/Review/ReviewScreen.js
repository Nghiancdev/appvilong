import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Row from '../../../components/Row';
import ImageIKI from '../../../components/ImageIKI';
import SizedBox from '../../../components/SizedBox';
import Scaffold from '../../../components/Scafold';
import {observer} from 'mobx-react-lite';
import IAppBar from '../../../components/AppBar';
import Expanded from '../../../components/Expanded';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {RepoManager} from '../../../services';
import Column from '../../../components/Column';
import {Rating} from 'react-native-ratings';
import Container from '../../../components/Container';
import ImagePicker from '../../../components/Picker/ImagePicker';
import IButton from '../../../components/IButton';
import { toast } from '../../../utils/apis/toast';

const ReviewScreen = observer(({navigation, route, fieldByValue}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [orderShow, setOrderShow] = useState(null);

  var dataSend = [];

  const {order} = route.params;

  useEffect(() => {
    console.log('order', order);
    getOneOrder();
  }, []);

  const getOneOrder = async () => {
    try {
      const res = await RepoManager.order.getOneOrder(order?.order_code);
      setOrderShow(res.data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const reviewProduct = async (idProduct, reviewData) => {
    console.log('idProduct', idProduct);
    console.log('data', reviewData);
    reviewData.images =reviewData.images ? JSON.stringify(reviewData.images) : null;
    try {
      var data = await RepoManager.order.review(idProduct, reviewData);
    } catch (err) {
      console.log('err', err);
      //  SahaAlert.showError(message: err.toString());
    }
  };

  const reviewAll = async () => {
    await Promise.all(
      (dataSend ?? []).map((e, index) => {
        console.log('e', e);
        return reviewProduct(e.product_id, e);
      }),
    );
    toast.success('Đánh giá thành công');
    navigation.goBack();
  };

  const ItemProduct = ({item, callBack}) => {
    const [data, setData] = React.useState({
      product_id: item.product?.id,
      stars: 5,
      content: '',
      images: null,
      order_code: order.order_code,
    });

    useEffect(() => {
      callBack(data);
    }, [data]);

    return (
      <Column>
        <Row padding={10} mainAxisAlignment={'flex-start'}>
          <ImageIKI
            style={{
              width: 50,
              height: 50,
              padding: 2,
              borderRadius: 5,
            }}
            uri={`${
              (item.product?.images ?? []).length == 0
                ? ''
                : item.product?.images[0].image_url ?? ''
            }`}></ImageIKI>
          <SizedBox width={10}></SizedBox>
          <Expanded child={<Text>{`${item?.product?.name}`}</Text>}></Expanded>
        </Row>
        <Divider></Divider>
        <Container
          padding={30}
          child={
            <Rating
              showRating={false}
              imageSize={40}
              startingValue={data?.stars ?? 5}
              onStartRating={v => {
                setData(prev => ({...prev, stars: v}));
              }}
            />
          }></Container>
        <Row>
          <ImagePicker
            onReturn={v => {
              setData({...data, images: v});
            }}></ImagePicker>
        </Row>
        <TextInput
          value={data?.content}
          onChangeText={text => {
            setData({...data, content: text});
          }}
          multiline={true}
          numberOfLines={5}
          height={100}
          placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này nhé."
          placeholderTextColor="#888" // Màu của placeholder
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            margin: 10,
            borderRadius: 5,
            padding: 8,
            fontSize: 13,
            color: '#333',
          }}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Row padding={10}>
            {[
              'Chất lượng sản phẩm tuyệt vời',
              'Đóng gói sản phẩm rất đẹp',
              'Shop phục vụ rất tốt',
              'Rất đáng tiền',
              'Thời gian giao hàng nhanh',
            ].map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setData({...data, content: item});
                  }}>
                  <Container
                    borderRadius={15}
                    borderColor={'#ddd'}
                    marginRight={10}
                    padding={10}
                    child={<Text>{item}</Text>}></Container>
                </TouchableOpacity>
              );
            })}
          </Row>
        </ScrollView>
        <SizedBox height={10}></SizedBox>
        <Container height={8} backgroundColor={'#eee'}></Container>
      </Column>
    );
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Đánh giá sản phẩm'}></IAppBar>}
      body={
        orderShow == null ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <ScrollView>
            <SizedBox width={windowWidth} height={1}></SizedBox>
            {(orderShow?.line_items ?? []).map((item, index) => {
              return (
                <ItemProduct
                  item={item}
                  callBack={data => {
                    console.log('data', data);
                    // cập nhật item data theo product id
                    var index = (dataSend ?? []).findIndex(
                      e => e.product_id == data.product_id,
                    );

                    if (index == -1) {
                      var dataSendNew = [...dataSend];
                      dataSendNew.push(data);
                      dataSend = dataSendNew;
                    } else {
                      var dataSendNew = [...dataSend];
                      dataSendNew[index] = data;
                      dataSend = dataSendNew;
                    }

                    console.log('dataSend', dataSend);
                  }}></ItemProduct>
              );
            })}
          </ScrollView>
        )
      }
      bottomNavigationBar={
        <Container
          padding={10}
          height={90}
          justifyContent={'center'}
          alignItems={'center'}
          child={
            <IButton
              text={'Gửi đánh giá'}
              width={windowWidth - 50}
              onPress={() => {
                reviewAll();
              }}></IButton>
          }></Container>
      }></Scaffold>
  );
});

export default ReviewScreen;
