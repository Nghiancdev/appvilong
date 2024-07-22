import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

import {observer} from 'mobx-react';
import Column from '../../../components/Column';
import SizedBox from '../../../components/SizedBox';
import {convertToMoney, getDDMMYY} from '../../../utils/apis/stringUtil';
import {Divider} from 'react-native-paper';
import Scaffold from '../../../components/Scafold';
import IAppBar from '../../../components/AppBar';
import Row from '../../../components/Row';
import Container from '../../../components/Container';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import {Dropdown} from 'react-native-element-dropdown';
import { useAgencyStore } from '../../../store/AgencyStore';

const AgencyIntroduceScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {getAllCollaborator, ctvRetroduce, isLoading, loadInit} = useAgencyStore();
  const [isFocus, setIsFocus] = React.useState(false);
  const [value, setValue] = React.useState('today');

  useEffect(() => {
    getAllCollaborator(
      true,
      generateDateRange(value).fromDate,
      generateDateRange(value).toDate,
    );
  }, []);

  const itemHis = data => {
    const infoCustomer = data.item;
    return (
      <Column>
        <Column padding={10}>
          <SizedBox height={10}></SizedBox>
          <Row mainAxisAlignment={'space-between'}>
            <Text>Tên:</Text>
            <Text>{`${infoCustomer?.name ?? ''}`}</Text>
          </Row>
          <SizedBox height={10}></SizedBox>
          <Row mainAxisAlignment={'space-between'}>
            <Text>SĐT:</Text>
            <Text>{`${infoCustomer?.phone_number ?? ''}`}</Text>
          </Row>
          <SizedBox height={10}></SizedBox>
          <Row mainAxisAlignment={'space-between'}>
            <Text>Hoa hồng:</Text>
            <Text>{`${convertToMoney(
              infoCustomer?.total_share_agency_referen ?? '0',
            )}`}</Text>
          </Row>
          <SizedBox height={10}></SizedBox>
          <Row mainAxisAlignment={'space-between'}>
            <Text>Doanh thu:</Text>
            <Text>{`${convertToMoney(infoCustomer?.total_final ?? '0')}`}</Text>
          </Row>
          <SizedBox height={10}></SizedBox>
          <Row mainAxisAlignment={'space-between'}>
            <Text>Tổng đơn:</Text>
            <Text>{`${convertToMoney(infoCustomer?.count_orders ?? '0')}`}</Text>
          </Row>
          <SizedBox height={5}></SizedBox>
        </Column>
        <Container height={8} backgroundColor={'#fafafa'}></Container>
      </Column>
    );
  };

  function generateDateRange(option) {
    const today = new Date();

    switch (option) {
      case 'today':
        return {
          fromDate: format(startOfDay(today), 'dd-MM-yyyy'),
          toDate: format(endOfDay(today), 'dd-MM-yyyy'),
        };
      case 'thisWeek':
        return {
          fromDate: format(startOfWeek(today), 'dd-MM-yyyy'),
          toDate: format(endOfWeek(today), 'dd-MM-yyyy'),
        };
      case 'thisMonth':
        return {
          fromDate: format(startOfMonth(today), 'dd-MM-yyyy'),
          toDate: format(endOfMonth(today), 'dd-MM-yyyy'),
        };
      case 'thisYear':
        return {
          fromDate: format(startOfYear(today), 'dd-MM-yyyy'),
          toDate: format(endOfYear(today), 'dd-MM-yyyy'),
        };
      default:
        return null;
    }
  }

  return (
    <Scaffold
      appbar={<IAppBar title={'Danh sách giới thiệu'}></IAppBar>}
      body={
        loadInit == true ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Column>
            <SizedBox width={windowWidth}></SizedBox>
            <Row padding={10}>
              <Text style={{fontSize: 16}}>Chọn ngày:</Text>
              <Dropdown
                style={[
                  {
                    width: '100%',
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    marginHorizontal: 10,

                    flex: 1,
                  },
                  isFocus && {borderColor: 'blue'},
                ]}
                data={[
                  {
                    label: 'Hôm nay',
                    value: 'today',
                  },
                  {
                    label: 'Tuần này',
                    value: 'thisWeek',
                  },
                  {
                    label: 'Tháng này',
                    value: 'thisMonth',
                  },
                  {
                    label: 'Năm này',
                    value: 'thisYear',
                  },
                ]}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? `` : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);

                  setIsFocus(false);
                  getAllCollaborator(
                    true,
                    generateDateRange(item.value).fromDate,
                    generateDateRange(item.value).toDate,
                  );
                }}
              />
            </Row>
            <Container height={8} backgroundColor={'#fafafa'}></Container>
            <FlatList
              data={ctvRetroduce}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemHis}
              ListFooterComponent={
                isLoading && (
                  <ActivityIndicator
                    style={{marginTop: 10}}></ActivityIndicator>
                )
              }
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                if (ctvRetroduce.length > 0 && !isLoading) {
                  getAllCollaborator();
                }
              }}
            />
          </Column>
        )
      }></Scaffold>
  );
});

export default AgencyIntroduceScreen;
