import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useDataAppStore} from '../../../store/DataAppStore';
import SizedBox from '../../../components/SizedBox';
import {useTheme} from 'react-native-paper';
import {convertToMoney} from '../../../utils/apis/stringUtil';
import Row from '../../../components/Row';
import Container from '../../../components/Container';
import Column from '../../../components/Column';

const PriceProduct = ({product}) => {
  const {badge, appTheme} = useDataAppStore();
  const theme = useTheme();

  const checkMinMaxPrice = price => {
    return product?.product_discount
      ? price - price * (product?.product_discount.value / 100)
      : price;
  };

  const moneyRose = () => {
    return product?.type_share_collaborator_number === 0 ? (
      product?.min_price !== product?.max_price ? (
        <View style={styles.row}>
          <Text style={{fontSize: 13, color: '#E91E63', fontWeight: 500}}>
            ₫
            {convertToMoney(
              checkMinMaxPrice(product?.min_price) *
                (product?.percent_collaborator / 100),
            )}
          </Text>
          <Text style={{fontSize: 13, color: '#E91E63', fontWeight: 500}}>
            {' '}
            -{' '}
          </Text>
          <Text style={{fontSize: 13, color: '#E91E63', fontWeight: 500}}>
            ₫
            {convertToMoney(
              checkMinMaxPrice(product?.max_price) *
                (product?.percent_collaborator / 100),
            )}
          </Text>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={{fontSize: 13, color: '#E91E63', fontWeight: 500}}>
            {convertToMoney(
              checkMinMaxPrice(product?.min_price) *
                (product?.percent_collaborator / 100),
            )}
            ₫
          </Text>
        </View>
      )
    ) : (
      <View style={styles.row}>
        <Text style={styles.money}>{product?.money_amount_collaborator}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      paddingVertical: 2,
    },
    money: {
      fontSize: 13,
    },
    moneyRose: {
      color: 'pink',
      fontWeight: '600',
      fontSize: 14,
      marginHorizontal: 5,
    },
    strikeThroughText: {
      textDecorationLine: 'line-through',
      color: 'grey',
      fontWeight: '600',
      fontSize: 12,
    },
    text: {
      color: theme.colors.primary,
    },
    discountText: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    space: {
      width: 10,
    },
  });

  return (
    <Column>
      <Row paddingHorizontal={10}>
        {product?.min_price !== product?.max_price ? (
          <Row>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: appTheme.color_main_1,
              }}>
              ₫{convertToMoney(checkMinMaxPrice(product?.min_price))}
            </Text>
            <Text style={styles.money}> - </Text>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: appTheme.color_main_1,
              }}>
              ₫{convertToMoney(checkMinMaxPrice(product?.max_price))}
            </Text>
            <SizedBox width={10}></SizedBox>
            {product?.product_discount && (
              <View style={styles.row}>
                <Text style={styles.strikeThroughText}>
                  ₫{convertToMoney(product?.min_price)}
                </Text>
                <Text style={styles.text}> - </Text>
                <Text style={styles.strikeThroughText}>
                  ₫{convertToMoney(product?.max_price)}
                </Text>
                <View style={styles.space} />
                <Text style={styles.discountText}>
                  -{convertToMoney(product?.product_discount.value)}%
                </Text>
              </View>
            )}
          </Row>
        ) : product?.min_price === 0 ? (
          <Text style={styles.money}>Giá: Liên hệ</Text>
        ) : product?.product_discount !== null ? (
          <Row crossAxisAlignment={'center'}>
            <Text style={styles.money}>
              {convertToMoney(product?.product_discount?.discount_price ?? 0)}₫
            </Text>
            <SizedBox width={10}></SizedBox>
            <Text style={styles.strikeThroughText}>
              {convertToMoney(product?.max_price ?? 0)}₫
            </Text>
            <SizedBox width={10}></SizedBox>
            <Text style={{fontSize: 12, color: theme.colors.primary}}>
              {`-${convertToMoney(product?.product_discount?.value ?? 0)}%`}
            </Text>
          </Row>
        ) : (
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              color: appTheme.color_main_1,
              paddingVertical: 2,
            }}>
            {convertToMoney(product?.max_price ?? 0)}₫
          </Text>
        )}
      </Row>
      {badge.status_collaborator === 1 && (
        <View style={styles.row}>
          {moneyRose()}
          <Text style={{fontSize: 13, color: '#E91E63', fontWeight: 500}}>
            {' '}
            (Hoa hồng)
          </Text>
        </View>
      )}
      {badge.status_agency === 1 && (
        <View style={styles.row}>
          {product?.min_price_before_override !==
          product?.max_price_before_override ? (
            <View style={styles.row}>
              <Text style={{fontSize: 13, color: 'blue', fontWeight: 500}}>
                ₫
                {convertToMoney(
                  checkMinMaxPrice(product?.min_price_before_override),
                )}
              </Text>
              <Text style={{fontSize: 13, color: 'blue', fontWeight: 500}}>
                {' '}
                -{' '}
              </Text>
              <Text style={{fontSize: 13, color: 'blue', fontWeight: 500}}>
                ₫
                {convertToMoney(
                  checkMinMaxPrice(product?.max_price_before_override),
                )}
              </Text>
            </View>
          ) : (
            <Text
              style={{
                fontSize: 13,
                color: 'blue',
                fontWeight: 500,
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              ₫
              {convertToMoney(
                checkMinMaxPrice(product?.min_price_before_override),
              )}
            </Text>
          )}
          <Text style={{fontSize: 13, color: 'blue', fontWeight: 500}}>
            {' '}
            (Giá bán lẻ)
          </Text>
        </View>
      )}
      {badge.status_agency === 1 && product?.percent_agency > 0 && (
        <View style={styles.row}>
          {product?.min_price_before_override !==
          product?.max_price_before_override ? (
            <View style={styles.row}>
              <Text style={{fontSize: 13, color: '#E91E63', fontWeight: 500}}>
                ₫
                {convertToMoney(
                  checkMinMaxPrice(product?.min_price_before_override) *
                    (product?.percent_agency / 100),
                )}
              </Text>
              <Text style={{fontSize: 13, color: '#E91E63', fontWeight: 500}}>
                {' '}
                -{' '}
              </Text>
              <Text style={{fontSize: 13, color: '#E91E63', fontWeight: 500}}>
                ₫
                {convertToMoney(
                  checkMinMaxPrice(product?.max_price_before_override) *
                    (product?.percent_agency / 100),
                )}
              </Text>
            </View>
          ) : (
            <Text
              style={{
                fontSize: 13,
                color: '#E91E63',
                fontWeight: 500,
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              ₫
              {convertToMoney(
                checkMinMaxPrice(product?.min_price_before_override) *
                  (product?.percent_agency / 100),
              )}
            </Text>
          )}
          <Text style={{fontSize: 12, color: '#E91E63', fontWeight: 500}}>
            {' '}
            (Hoa hồng giới thiệu)
          </Text>
        </View>
      )}
    </Column>
  );
};

export default PriceProduct;
