import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

import {observer} from 'mobx-react';
import {useCtvStore} from '../../../store/CtvStore';
import Column from '../../../components/Column';
import SizedBox from '../../../components/SizedBox';
import {convertToMoney, getDDMMYY} from '../../../utils/apis/stringUtil';
import {Divider} from 'react-native-paper';
import Scaffold from '../../../components/Scafold';
import IAppBar from '../../../components/AppBar';
import Row from '../../../components/Row';
import Container from '../../../components/Container';
import { useAgencyStore } from '../../../store/AgencyStore';

const ReportRoseAgencyScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {getReportRose, reportRose, isLoading, loadInit} = useAgencyStore();

  useEffect(() => {
    getReportRose(true);
  }, []);

  const itemHis = data => {
    const item = data.item;
    return (
      <Column>
        <Column padding={10}>
          <Text style={{fontWeight:500}}>{`Tháng ${item?.month} Năm ${item?.year}`}</Text>
          <SizedBox height={10}></SizedBox>
          <Divider></Divider>
          <Row>
            <Column>
              <SizedBox height={10}></SizedBox>
              <Text>{`Tổng doanh thu: ${convertToMoney(
                item?.total_final,
              )} ₫`}</Text>
              <SizedBox height={10}></SizedBox>
              <Text>{`Tổng hoa hồng: ${convertToMoney(
                item?.share_collaborator,
              )} ₫`}</Text>
              <SizedBox height={10}></SizedBox>
              <Text>{`Tổng thưởng: ${convertToMoney(
                item?.money_bonus_current,
              )} ₫`}</Text>
              <SizedBox height={10}></SizedBox>
              <Text>{`Đã nhận: ${convertToMoney(
                item?.money_bonus_rewarded,
              )} ₫`}</Text>
              <SizedBox height={5}></SizedBox>
            </Column>
            <View style={{flex: 1}}></View>
            {item?.awarded == true && (
              <View
                style={{borderRadius: 10, borderColor: 'green', padding: 10}}>
                <Text>Đã nhận</Text>
              </View>
            )}
          </Row>
        </Column>
        <Container height={8} backgroundColor={'#fafafa'}></Container>
      </Column>
    );
  };


  const renderEmptyComponent = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        marginTop: 200,
      }}>
        <Text>Chưa có báo cáo hoa hồng</Text>
      </View>
    );
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Báo cáo hoa hồng'}></IAppBar>}
      body={
        loadInit == true ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Column>
            <SizedBox width={windowWidth}></SizedBox>
            <FlatList
              data={reportRose}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemHis}
              ListFooterComponent={
                isLoading && (
                  <ActivityIndicator
                    style={{marginTop: 10}}></ActivityIndicator>
                )
              }
              ListEmptyComponent={renderEmptyComponent}
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                if (reportRose.length > 0 && !isLoading) {
                  getReportRose();
                }
              }}
            />
          </Column>
        )
      }></Scaffold>
  );
});

export default ReportRoseAgencyScreen;
