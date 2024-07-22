import React from 'react';
import {View} from 'react-native';
import PersonCircleIcon from './Icons/PersonCircleIcon';
import {Image} from 'react-native';

const ImageIKI = ({style, uri}) => {
  const [error, setError] = React.useState(false);

  // console.log('error', uri);
  // console.log('error', error);

  return error ? (
    <PersonCircleIcon></PersonCircleIcon>
  ) : (
    <Image
      style={style}
      onError={e => {
        console.log('error', e);
        setError(true);
      }}
      source={{uri: uri}}></Image>
  );
};

export default ImageIKI;
