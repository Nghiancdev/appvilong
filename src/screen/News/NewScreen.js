import {observer} from 'mobx-react';
import Scaffold from '../../components/Scafold';
import {
  Image,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import IAppBar from '../../components/AppBar';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import SizedBox from '../../components/SizedBox';
import {StyleSheet} from 'react-native';
import {useNewStore} from '../../store/NewStore';
import React, {useEffect, useRef} from 'react';
import {useDataAppStore} from '../../store/DataAppStore';
import {getDDMMYY} from '../../utils/apis/stringUtil';

const NewScreen = observer(({route, navigation}) => {
  const {news, categoryNews, loading, getAllNews, getAllCategoryNews} =
    useNewStore();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [indexCategory, setIndexCategory] = React.useState(0);
  const {appTheme} = useDataAppStore();

  const {automaticallyImplyLeading} = route?.params || false;

  useEffect(() => {
    getData();
  }, []);

  getData = async () => {
    getAllNews();
    getAllCategoryNews();
  };

  const itemNew = news => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NEWS_DETAIL_SCREEN', {newId: news?.id});
        }}>
        <Container
          padding={10}
          alignItems="flex-start"
          width={windowWidth}
          child={
            <Row
              mainAxisAlignment={'flex-start'}
              crossAxisAlignment={'flex-start'}>
              <Image
                source={{
                  uri: news.image_url,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                resizeMode="cover"></Image>
              <SizedBox width={10}></SizedBox>
              <Column>
                <Text style={styles.textTitleNew}>{news.title}</Text>
                <Text style={styles.summary} numberOfLines={2}>{news.summary} </Text>
                <View style={{flex: 1}}></View>
                <Text style={styles.summary} numberOfLines={2}>{`${
                  news.categories != null && news.categories.length > 0
                    ? news.categories[0].title
                    : ''
                } ${getDDMMYY(news.updated_at)}`}</Text>
              </Column>
            </Row>
          }></Container>
      </TouchableOpacity>
    );
  };

  const itemCategory = (category, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          getAllNews(null, category.id, null, null);
          setIndexCategory(category.id);
        }}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginHorizontal: 5,
            height: 50,
            borderBottomColor:
              category.id == indexCategory ? appTheme.color_main_1 : 'white',
            borderBottomWidth: 2,
          }}>
          {category.image_url != null && (
            <View
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
              }}>
              <Image
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
              }}
                source={{uri: category.image_url ?? ''}}
                resizeMode="cover"></Image>
            </View>
          )}
          <Text>{category?.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Scaffold
      appbar={
        <IAppBar title={'Tin Tức'} automaticallyImplyLeading={automaticallyImplyLeading ?? false}></IAppBar>
      }
      body={
        <Column mainAxisAlignment={'flex-start'} flex={1}>
          <View style={{height: 50, marginBottom:10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Row>
                {(categoryNews ?? []).map((e, index) => {
                  return itemCategory(e, index);
                })}
              </Row>
            </ScrollView>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView>
              {loading ? (
                <ActivityIndicator
                  style={{justifyContent: 'center', alignItems: 'center'}}
                />
              ) : (
                <Column
                  crossAxisAlignment={'flex-start'}
                  mainAxisAlignment={'flex-start'}>
                  {(news ?? []).map(e => {
                    return itemNew(e);
                  })}
                </Column>
              )}
            </ScrollView>
          </View>
        </Column>
      }></Scaffold>
  );
});

const styles = StyleSheet.create({
  textTitleNew: {
    fontSize: 14,
    fontWeight: '500',
  },
  summary: {
    fontSize: 11,
    color: 'grey',
    
  },
  container: {
    height: 10,
    backgroundColor: 'blue',
  },
});

export default NewScreen;
