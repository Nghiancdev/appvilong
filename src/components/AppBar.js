import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Appbar, Button} from 'react-native-paper';

const IAppBar = ({
  title,
  actions,
  actionButton,
  automaticallyImplyLeading = true,
}) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header>
      {automaticallyImplyLeading && (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      )}
      { title && <Appbar.Content title={title} />}
      {actions &&
        actions.map((action, index) => (
          <Appbar.Action
            key={index}
            icon={action.icon}
            onPress={action.onPress}
          />
        ))}
      {actionButton && actionButton}
    </Appbar.Header>
  );
};

export default IAppBar;
