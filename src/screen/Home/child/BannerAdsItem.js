import Carousel from 'react-native-snap-carousel-v4';
import Container from '../../../components/Container';
import {Dimensions} from 'react-native';

const BannerAdsItem = ({listBannerAdsItem}) => {
  const windowWidth = Dimensions.get('window').width;

  const bannerCPN = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          padding: 10,
          height: 100,
          width: windowWidth,
          // marginLeft: 20,
        }}>
        <Image
          source={{
            uri: item?.image_url,
          }}
          style={{flex: 1, borderRadius: 10}}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <Container
      padding={10}
      child={
        <Container
          child={
            <Carousel
              layout={'default'}
              autoplay={true}
              data={listBannerAdsItem.map(item => item?.image_url)}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              renderItem={bannerCPN}
              onSnapToItem={index => setIndex(index)}
            />
          }></Container>
      }></Container>
  );
};

export default BannerAdsItem;
