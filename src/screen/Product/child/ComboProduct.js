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

const ComboProduct = ({
  valueComboType,
  listProductCombo,
  discountComboType,
  navigation,
  product,
}) => {
  var theme = useTheme();
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const {averagedStars, listReview} = useProductStore();

  return (
    <Column>
      <View
        style={{height: 8, backgroundColor: '#F1F1F1', width: '100%'}}></View>
      <Column padding={10}>
        <Row>
          <ComboIcon></ComboIcon>
          <SizedBox width={10}></SizedBox>
          <Text style={{fontSize: 13}}>{`Mua đủ Combo giảm ${convertToMoney(
            valueComboType ?? 0,
          )}${discountComboType == 1 ? '%' : 'đ'} `}</Text>
          <View style={{flex: 1}}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('COMBO_DETAIL', {product: product});
            }}>
            <Row>
              <Text style={{color: 'blue'}}>Xem tất cả </Text>
              <NextArrowIcon></NextArrowIcon>
            </Row>
          </TouchableOpacity>
        </Row>
        <SizedBox height={10}></SizedBox>
        <Container
          height={windowWidth / 3 - 10}
          width={windowWidth}
          child={
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{width: Dimensions.get('window').width}}>
              {(listProductCombo ?? []).map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('COMBO_DETAIL', {product: product});
                    }}>
                    <ImageIKI
                      style={{
                        width: windowWidth / 3 - 10,
                        height: windowWidth / 3 - 10,
                      }}
                      uri={
                        (item.product?.images ?? []).lenght != 0
                          ? item.product?.images[0].image_url ?? ''
                          : ''
                      }></ImageIKI>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          }></Container>
      </Column>
    </Column>
  );
};

export default ComboProduct;
