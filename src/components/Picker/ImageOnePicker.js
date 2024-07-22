import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ActivityIndicator, Button} from 'react-native-paper';
import Container from '../Container';
import CameraIcon from '../Icons/CameraIcon';
import Row from '../Row';
import Column from '../Column';
import {Text} from 'react-native';
import SizedBox from '../SizedBox';
import IconClose from '../Icons/IconClose';
import StoreCode from '../../singletons/StoreCode';
import UserUtil from '../../utils/apis/userUtil';
import axios from 'axios';
import {constants} from '../../constants';

const ImageOnePicker = ({title, limit, onReturn, imageInput}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  React.useEffect(() => {
    if ((imageInput ?? '') != '') {
      console.log('imageInput', imageInput);
      setSelectedImages([imageInput]);
    }
  }, [imageInput]);

  const uploadImages = async images => {
    const uploadPromises = images.map(image => {
      const formData = new FormData();

      formData.append('image', {
        name: image?.split('/').pop(),
        type: 'image/jpeg',
        uri: Platform.OS === 'ios' ? image?.replaceAll('file://', '') : image,
      });

      console.log('formData', formData);
      console.log(
        `${constants.API_URL}customer/${StoreCode.getStoreCode()}/images`,
      );
      console.log(`${UserUtil.getToken()}`);
      return axios.post(
        `${constants.API_URL}customer/${StoreCode.getStoreCode()}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'customer-token': UserUtil.getToken(),
          },
        },
      );
    });

    try {
      const responses = await Promise.all(uploadPromises);
      console.log('Upload responses:', responses);
      return responses.map(response => response.data.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: limit ?? 10,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        setIsUploading(true);
        let imageUris = response.uri || response.assets?.map(item => item.uri);
        setSelectedImages([...selectedImages, ...imageUris]);

        var data = await uploadImages(imageUris);
        setIsUploading(false);
        console.log('data', data);
        onReturn(data);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImages([...selectedImages, imageUri]);
        console.log(imageUri);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        width: windowWidth - 20 / 2,
      }}>
      <SizedBox height={10}></SizedBox>
      <Text style={{textAlign: 'center'}}>{title}</Text>
      <SizedBox height={10}></SizedBox>
      {selectedImages.length == 0 ? (
        <TouchableOpacity
          onPress={() => {
            openImagePicker();
          }}>
          <Container
            padding={10}
            height={110}
            borderRadius={5}
            justifyContent={'center'}
            alignItems={'center'}
            borderColor={'grey'}
            child={<CameraIcon></CameraIcon>}></Container>
        </TouchableOpacity>
      ) : (
        selectedImages.map((item, index) => {
          return (
            <View style={{position: 'relative'}}>
              <Image
                source={{uri: item}}
                style={{
                  height: 110,
                  padding: 2,
                  marginRight: 10,
                  borderRadius: 5,
                }}
                resizeMode="cover"
              />
              {isUploading && (
                <View
                  style={{
                    height: 110,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <ActivityIndicator color="white"></ActivityIndicator>
                </View>
              )}
              <TouchableOpacity
                style={{
                  borderRadius: 1000,
                  backgroundColor: 'red',
                  padding: 1,
                  width: 15,
                  height: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 0,
                  right: 5,
                  zIndex: 100,
                }}
                onPress={() => {
                  let newSelectedImages = [...selectedImages];
                  newSelectedImages.splice(index, 1);
                  setSelectedImages(newSelectedImages);
                  onReturn(newSelectedImages);
                }}>
                <IconClose size={12} color={'white'}></IconClose>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </View>
  );
};

export default ImageOnePicker;
