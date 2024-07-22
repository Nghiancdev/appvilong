import React from 'react';
import {View, Text} from 'react-native';
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
import {getDDMMYY, getHHMMSS} from '../../../utils/apis/stringUtil';
import { toJS } from 'mobx';

const ReviewProduct = ({product}) => {
  var theme = useTheme();
  const {averagedStars, listReview} = useProductStore();
  console.log("listReview", toJS(product))
  return (
    <Column>
      <View
        style={{height: 8, backgroundColor: '#F1F1F1', width: '100%'}}></View>
      <Row crossAxisAlignment={'center'}>
        <Expanded
          child={
            <Container
              padding={10}
              child={
                <Column>
                  <Text>ĐÁNH GIÁ SẢN PHẨM</Text>
                  <SizedBox height={5}></SizedBox>
                  <Row crossAxisAlignment={'between'}>
                    <IgnorePointer>
                      <Rating
                        showRating={false}
                        imageSize={15}
                        startingValue={(averagedStars ?? 0) == 0 ? 5 : averagedStars}
                      />
                    </IgnorePointer>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: theme.colors.primary,
                        fontSize: 13,
                      }}>{`${((averagedStars ?? 0) == 0
                      ? 5
                      : averagedStars
                    ).toFixed(1)}/5`}</Text>
                  </Row>
                </Column>
              }></Container>
          }></Expanded>
        
      </Row>
      <Divider></Divider>
      {(product ?? []).map((item, index) => {
        return (
          <Container
            padding={10}
            child={
              <Row crossAxisAlignment="start">
                <ImageIKI
                  uri={item?.customer?.avatar_image ?? ''}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                  }}></ImageIKI>
                <SizedBox width={10}></SizedBox>
                <Column crossAxisAlignment={'flex-start'}>
                  <Text>{item?.customer?.name ?? ''}</Text>
                  <SizedBox height={5}></SizedBox>
                  <IgnorePointer>
                    <Rating
                      showRating={false}
                      imageSize={13}
                      startingValue={ 5}
                    />
                  </IgnorePointer>
                  <SizedBox height={5}></SizedBox>
                  <Text style={{fontSize: 13}}>{item?.content ?? ''}</Text>
                  <SizedBox height={5}></SizedBox>
                  <Text style={{color: 'grey', fontSize: 12}}>{`${getDDMMYY(
                    item?.created_at,
                  )} ${getHHMMSS(item?.created_at)}`}</Text>
                </Column>
              </Row>
            }></Container>
        );
      })}
    </Column>
  );
};

export default ReviewProduct;
