import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {observer} from 'mobx-react';
import Container from '../../components/Container';
import IAppBar from '../../components/AppBar';
import Scaffold from '../../components/Scafold';
import Column from '../../components/Column';
import SizedBox from '../../components/SizedBox';
import {useActionTapStore} from '../../store/ActionTapStore';
import Row from '../../components/Row';
import {getDDMMYY} from '../../utils/apis/stringUtil';
import {useDataAppStore} from '../../store/DataAppStore';

const BonusScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {getBonus, listBonus, isLoading} = useActionTapStore();
  const {appTheme} = useDataAppStore();

  const {product} = route.params ?? {};

  useEffect(() => {
    getBonus(product);
  }, []);

  const itemBonus = data => {
    var item = data.item;
    console.log('item', item);
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('BONUS_DETAIL', {bonusProduct: item});
      }}>
        <Container
          margin={10}
          borderColor={'#e0e0e0'}
          child={
            <Row>
              <View
                style={{
                  position: 'relative',
                  flexDirection: 'column',
                  width: 100,
                  height: 100,

                  justifyContent: 'center',
                  backgroundColor: appTheme?.color_main_1,
                  paddingHorizontal: 10,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {item.name ?? ''}
                </Text>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 1000,
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: 14,
                    left: -6,
                  }}></View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 1000,
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: 34,
                    left: -6,
                  }}></View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 1000,
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: 54,
                    left: -6,
                  }}></View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 1000,
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: 74,
                    left: -6,
                  }}></View>
              </View>
              <SizedBox width={10}></SizedBox>
              <Column flex={1}>
                <Text style={{fontSize: 14}}>{`${item?.name}`}</Text>
                <SizedBox height={5}></SizedBox>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'grey',
                  }}>{`HSD: ${getDDMMYY(item?.end_time)}`}</Text>
              </Column>

              <SizedBox width={10}></SizedBox>
            </Row>
          }></Container>
      </TouchableOpacity>
    );
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Thưởng sản phẩm'}></IAppBar>}
      body={
        isLoading == true ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Column>
            <SizedBox width={windowWidth}></SizedBox>
            <FlatList
              data={listBonus}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemBonus}
              ListFooterComponent={
                isLoading && (
                  <ActivityIndicator
                    style={{marginTop: 10}}></ActivityIndicator>
                )
              }
              onEndReachedThreshold={0.1}
              // onEndReached={() => {
              //   if (listBonus.length > 0 && !isLoading) {
              //     getBonus();
              //   }
              // }}
            />
          </Column>
        )
      }></Scaffold>
  );
});

export default BonusScreen;
