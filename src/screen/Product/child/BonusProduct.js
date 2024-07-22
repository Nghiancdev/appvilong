import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Column from '../../../components/Column';
import {Button, Divider, useTheme} from 'react-native-paper';
import IgnorePointer from '../../../components/IgnorePointer';
import {Rating} from 'react-native-ratings';
import {useProductStore} from '../../../store/ProductStore';
import Row from '../../../components/Row';
import Expanded from '../../../components/Expanded';
import Container from '../../../components/Container';
import SizedBox from '../../../components/SizedBox';
import ImageIKI from '../../../components/ImageIKI';
import {
  convertToMoney,
  getDDMMYY,
  getHHMMSS,
} from '../../../utils/apis/stringUtil';
import ComboIcon from '../../../components/Icons/ComboIcon';
import {ScrollView, TouchableOpacity} from 'react-native';
import NextArrowIcon from '../../../components/Icons/NextArrowIcon';
import {useDataAppStore} from '../../../store/DataAppStore';

const BonusProduct = ({bonusProduct, product, navigation}) => {
  var theme = useTheme();
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const {averagedStars, listReview} = useProductStore();
  const {appTheme} = useDataAppStore();

  return (
    <Column>
      <View
        style={{height: 8, backgroundColor: '#F1F1F1', width: '100%'}}></View>
      <Column padding={10}>
        <Row>
          <ComboIcon></ComboIcon>
          <SizedBox width={10}></SizedBox>
          <Text style={{fontSize: 13}}>{`Tặng thưởng sản phẩm`}</Text>
          <View style={{flex: 1}}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.push('BONUS', {product: product});
            }}>
            <Row>
              <Text style={{color: 'blue'}}>Xem tất cả </Text>
              <NextArrowIcon></NextArrowIcon>
            </Row>
          </TouchableOpacity>
        </Row>
        <SizedBox height={10}></SizedBox>
        <Container
          width={windowWidth}
          child={
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{width: Dimensions.get('window').width}}>
              {(bonusProduct.bonus_products ?? []).map((item, index) => {
                return (
                  <Container
                    width={windowWidth / 2.7}
                    borderColor={'#F1F1F1'}
                    borderRadius={10}
                    child={
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('COMBO_DETAIL', {
                            product: product,
                          });
                        }}>
                        <Column crossAxisAlignment={'center'}>
                          <ImageIKI
                            style={{
                              width: (windowWidth - 20) / 2.7,
                              height: 120,
                            }}
                            uri={
                              (item.product?.images ?? []).lenght != 0
                                ? item.product?.images[0].image_url ?? ''
                                : ''
                            }></ImageIKI>
                          <Container
                            padding={10}
                            child={
                              <Text
                                style={{
                                  color: appTheme.color_main_1,
                                }}>{`${convertToMoney(
                                item.product?.price ?? 0,
                              )}đ`}</Text>
                            }></Container>
                          <Container
                            padding={10}
                            child={
                              <Text>{`${item.product?.name ?? ''}`}</Text>
                            }></Container>
                        </Column>
                      </TouchableOpacity>
                    }></Container>
                );
              })}
            </ScrollView>
          }></Container>
      </Column>
    </Column>
  );
};

export default BonusProduct;
