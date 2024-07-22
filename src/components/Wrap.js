import React from 'react';
import {View} from 'react-native';

const Wrap = ({
  children,
  style,
  alignment = 'start',
  spacing = 0,
  runAlignment = 'start',
  runSpacing = 0,
  crossAxisAlignment = 'start', // Thêm thuộc tính crossAxisAlignment
}) => {
  const flexDirection = alignment === 'end' ? 'row-reverse' : 'row';
  const justifyContent = alignment === 'center' ? 'center' : alignment;
  const alignItems = runAlignment === 'center' ? 'center' : runAlignment;

  return (
    <View
      style={[
        {
          flexDirection: flexDirection,
          flexWrap: 'wrap',
          justifyContent: justifyContent,
          alignItems: alignItems,
          rowGap: runSpacing,
          columnGap: spacing,
        },
        style,
      ]}>
      {React.Children.map(children, (child, index) => (
        <View style={{alignSelf: crossAxisAlignment}}>{child}</View>
      ))}
    </View>
  );
};

export default Wrap;
