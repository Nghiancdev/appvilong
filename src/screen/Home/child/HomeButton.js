import React from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {TYPE_ACTION} from '../../../constants';
import ChatHomeIcon from '../../../components/Icons/HomeButton/ChatHomeIcon';
import PhoneIcon from '../../../components/Icons/HomeButton/PhoneIcon';

import Voucher2Icon from '../../../components/Icons/HomeButton/Voucher2Icon';
import QrCodeIcon from '../../../components/Icons/HomeButton/QrCodeIcon';
import GameIcon from '../../../components/Icons/HomeButton/GameIcon';
import RankIcon from '../../../components/Icons/HomeButton/RankIcon';
import NewIcon from '../../../components/Icons/HomeButton/NewIcon';
import DiscountIcon from '../../../components/Icons/HomeButton/DiscountIcon';
import ScoreIcon from '../../../components/Icons/HomeButton/ScoreIcon';
import PackagesIcon from '../../../components/Icons/HomeButton/PackagesIcon';
import GiftIcon from '../../../components/Icons/HomeButton/GiftIcon';

const HomeButton = ({key, homeButton}) => {
  const windowWidth = Dimensions.get('window').width;

  const decorationButton = ({color, child}) => (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {child}
      </View>
    </View>
  );

  const buildImageButton = ({imageUrl, typeAction}) => {
    let svgImage;

    if (typeAction === TYPE_ACTION.CALL) {
      svgImage = decorationButton({
        color: '#57C43D1A',
        child: <PhoneIcon color="#57C43D"></PhoneIcon>,
      });
    } else if (typeAction === TYPE_ACTION.MESSAGE_TO_SHOP) {
      svgImage = decorationButton({
        color: '#A38DE81A',
        child: <ChatHomeIcon color="#A38DE8"></ChatHomeIcon>,
      });
    } else if (typeAction === TYPE_ACTION.VOUCHER) {
      svgImage = decorationButton({
        color: '#65B1951A',
        child: <Voucher2Icon color="#65B195"></Voucher2Icon>,
      });
    } else if (typeAction === TYPE_ACTION.QR) {
      svgImage = decorationButton({
        color: '#65B1951A',
        child: <QrCodeIcon color="#65B195"></QrCodeIcon>,
      });
    } else if (typeAction === TYPE_ACTION.SPIN_WHEEL) {
      svgImage = decorationButton({
        color: 'rgba(255, 0, 0, 0.1)',
        child: <GameIcon></GameIcon>,
      });
    } else if (typeAction === TYPE_ACTION.GUESS_NUMBER) {
      svgImage = decorationButton({
        color: 'rgba(255, 182, 193, 0.1)',
        child: <GameIcon></GameIcon>,
      });
    } else if (typeAction === TYPE_ACTION.PRODUCTS_TOP_SALES) {
      svgImage = decorationButton({
        color: '#FFD15F1A',
        child: <RankIcon color="#FFD15F"></RankIcon>,
      });
    } else if (typeAction === TYPE_ACTION.PRODUCTS_NEW) {
      svgImage = decorationButton({
        color: '#FE83661A',
        child: <NewIcon color="#FE8366"></NewIcon>,
      });
    } else if (typeAction === TYPE_ACTION.PRODUCTS_DISCOUNT) {
      svgImage = decorationButton({
        color: '#127ED90D',
        child: <DiscountIcon color="#127ED9"></DiscountIcon>,
      });
    } else if (typeAction === TYPE_ACTION.SCORE) {
      svgImage = decorationButton({
        color: '#FECF561A',
        child: <ScoreIcon color="#FECF56"></ScoreIcon>,
      });
    } else if (typeAction === TYPE_ACTION.COMBO) {
      svgImage = decorationButton({
        color: '#FF80361A',
        child: <PackagesIcon color="#FF8036"></PackagesIcon>,
      });
    } else if (typeAction === TYPE_ACTION.BONUS_PRODUCT) {
      svgImage = decorationButton({
        color: '#FE83661A',
        child: <GiftIcon color="#FE8366"></GiftIcon>,
      });
    } else {
      if (imageUrl) {
        svgImage = decorationButton({
          color: 'rgba(255, 105, 97, 0.1)',
          child: (
            <Image
              source={imageUrl}
              style={{width: 32, height: 32, tintColor: 'cyan'}}
            />
          ),
        });
      } else {
        svgImage = decorationButton({
          color: 'rgba(255, 105, 97, 0.1)',
          child: <ForwardIcon></ForwardIcon>,
        });
      }
    }

    return svgImage;
  };

  return (
    <View
      key={key}
      style={{width: windowWidth / 4, height: 90, alignItems: 'center'}}>
      <View
        style={{height: 45, width: 45, borderRadius: 15, overflow: 'hidden'}}>
        {buildImageButton({
          imageUrl: homeButton.image_url,
          typeAction: homeButton.type_action,
        })}
      </View>
      <View style={{height: 3}} />
      <View style={{flex: 1, justifyContent: 'center', marginTop: 5}}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            fontWeight: '500',
            fontSize: 12,
            textAlign: 'center',
            lineHeight: 16,
          }}>
          {homeButton.title}
        </Text>
      </View>
    </View>
  );
};

export default HomeButton;
