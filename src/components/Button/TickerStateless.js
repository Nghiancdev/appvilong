import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDataAppStore} from '../../store/DataAppStore';

function TickerStateless({ticked, text, onChange}) {
  const {appTheme} = useDataAppStore();

  const buildTicker = (text, ticked) => {
    return (
      <View style={{paddingRight: 10, paddingBottom: 10}}>
        {!ticked ? (
          <View
            style={{
              padding: 10,
              borderRadius: 3,
              backgroundColor: '#F2F2F2',
            }}>
            <Text style={{fontSize: 14}}>{text || ''}</Text>
          </View>
        ) : (
          <View
            style={{
              borderRadius: 2,
              flexDirection: 'row',
            }}>
            <View
              style={{
                padding: 10,
                borderRadius: 3,
                backgroundColor: appTheme.color_main_1,
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>{text || ''}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (onChange) onChange(!ticked);
      }}>
      {buildTicker(text, ticked)}
    </TouchableOpacity>
  );
}

export default TickerStateless;
