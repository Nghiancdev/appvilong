import { observer } from 'mobx-react';

const { default: Scaffold } = require('../../../components/Scafold');
import IAppBar from '../../../components/AppBar';
import { Dimensions, Pressable, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Column from '../../../components/Column';
import { Text } from 'react-native-paper';
import moment from 'moment';
import SizedBox from '../../../components/SizedBox';
import { useNewStore } from '../../../store/NewStore';
import ShareIcon from '../../../components/Icons/ShareIcon';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';
import ImageIKI from '../../../components/ImageIKI';
import Container from '../../../components/Container';
import { toJS } from 'mobx';

const NewsDetailScreen = observer(({ route, navigation }) => {
  const { loadInitNew, itemNew, getOneNew } = useNewStore();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { newId } = route.params;
  useEffect(() => {
    getOneNew(newId);
  }, []);

  console.log("itemNew", toJS(itemNew?.categories[0].id))
  const currentDateTime = new Date();
  return (
    <Scaffold
      // appbar={<IAppBar title={'Tin Tứccc'}></IAppBar>}
      appbar={<View style={{ zIndex: 10000 }}>
        <IAppBar
          title={'Tin Tức'}
          actionButton={
            <Pressable
              style={{
                flex: 1,
                position:'relative',
              }}
                onPress={()=>{
                  navigation.navigate("SHARENEWSSCREEN",{
                    idPost: itemNew?.categories[0].id,
                    idProduct: itemNew?.categories[0].id
                  })
                  // console.log("123")
                }}
              >
                <View style={{ position:"absolute",right:25, bottom: -9}}>
                   <ShareIcon size={20}></ShareIcon>
                </View>
            </Pressable>
          }></IAppBar>
      </View>}
      body={
        loadInitNew ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView>
            <Column>
              <ImageIKI
                style={{
                  height: 250,
                }}
                uri={itemNew?.image_url ?? ''}></ImageIKI>
              <SizedBox height={10} />
              <Text>
                Tin tức ngày {moment(currentDateTime).format('DD-MM-YYYY')}
              </Text>
              <SizedBox height={10} />
              <Container
                padding={10}
                child={
                  <RenderHtml
                    contentWidth={windowWidth - 20}
                    source={{
                      html: itemNew?.content,
                    }}
                  />
                }></Container>
            </Column>
          </ScrollView>
        )
      }></Scaffold>
  );
});

export default NewsDetailScreen;
