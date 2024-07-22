import {ScrollView, Image, Text, View} from 'react-native';
import Column from '../../../components/Column';
import Container from '../../../components/Container';
import ProductItem from '../../../components/Product/ProductItem';
import {useDataAppStore} from '../../../store/DataAppStore';
import TimerComponent from '../../../components/Timer/TimerCPN';
import Row from '../../../components/Row';
import FastImage from 'react-native-fast-image';
import SizedBox from '../../../components/SizedBox';
import { useTheme } from 'react-native-paper';

const FlashSale = layout => {
  const {infoCustomer} = useDataAppStore();
  const theme = useTheme();
  return (
    <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20, backgroundColor: theme.colors.primary, marginLeft:10, paddingBottom:10}}>
       <Column>
          <Container
            paddingLeft={5}
            paddingRight={5}
            paddingTop={5}
            child={
              <Row crossAxisAlignment={'center'}>
                <Image
                  source={{
                    uri: 'https://theme.hstatic.net/1000058447/1001051940/14/flashsale-hot.png?v=734',
                  }}
                  style={{resizeMode: 'cover', width: 30, height: 30}}
                />
                <SizedBox width={10}></SizedBox>
                <Text style={{color:'white'}}>FLASH SALE</Text>
                <SizedBox width={10}></SizedBox>
                {TimerComponent(layout.list[0]?.product_discount?.end_time)}
                <View style={{flex: 1}}></View>
                <Text style={{color:'white'}}>Tất cả</Text>
              </Row>
            }></Container>
          <Container
            padding={5}
            height={
              infoCustomer?.is_collaborator == true ||
              infoCustomer?.is_agency == true
                ? 325
                : 300
            }
            child={
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {layout?.list?.map((e, index) => {
                  return (
                    <ProductItem
                      key={index}
                      product={e}
                      width={170}></ProductItem>
                  );
                })}
              </ScrollView>
            }></Container>
        </Column>
    </View>
  );
};

export default FlashSale;
