import React, {useEffect, useState} from 'react';
import {View, Text,ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';

import Accordion from 'react-native-collapsible/Accordion';
import Column from '../../../components/Column';
import {Button, Divider, useTheme} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import IgnorePointer from '../../../components/IgnorePointer';

const DecriptionProduct = ({product, isCollapsed, onPress}) => {
  var theme = useTheme();
  return (
    <Column>
      <View
        style={{height: 8, backgroundColor: '#F1F1F1', width: '100%'}}></View>
      <Text
        style={{padding: 10, color: theme.colors.primary, fontWeight: '500'}}>
        Mô tả sản phẩm
      </Text>
      <Divider></Divider>
      {isCollapsed && (
        <View style={{height: product?.description == null ? 0 : 150, marginLeft: 10, marginRight: 10}}>
          <IgnorePointer>
            <ScrollView>
              <RenderHTML source={{html: product?.description ?? ''}} />
            </ScrollView>
          </IgnorePointer>
        </View>
      )}
      <Collapsible collapsed={isCollapsed} style={{padding: 10,}}>
        <RenderHTML source={{html: product?.description ?? ''}} />
      </Collapsible>
      <Divider></Divider>
      <Button
        onPress={() => {
          onPress(!isCollapsed);
        }}
        style={{margin: 4}}>
        {isCollapsed ? 'Xem thêm' : 'Thu gọn'}
      </Button>
    </Column>
  );
};

export default DecriptionProduct;
