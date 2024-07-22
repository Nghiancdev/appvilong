import {Text, TouchableOpacity, View} from 'react-native';
import Row from '../../../components/Row';
import Container from '../../../components/Container';
import Expanded from '../../../components/Expanded';
import actionTap from '../../../utils/actionTap';
import { useNavigation } from '@react-navigation/native';

const SectionTitle = ({key, title, subtitle, layout, navigation}) => {
  return (
    <Container
      paddingBottom={0}
      paddingLeft={10}
      paddingRight={10}
      paddingTop={10}
      child={
        <Row>
          <Expanded
            child={
              <Text
                style={{
                  fontWeight: '500',
                }}>
                {title}
              </Text>
            }></Expanded>
          <TouchableOpacity
            key={key}
            onPress={() => {
              console.log('layout', layout)
              actionTap({
                typeAction:
                  layout.type_layout == 'PRODUCT_BY_CATEGORY'
                    ? 'PRODUCT_BY_CATEGORY'
                    : layout.type_action_more ?? 'CATEGORY_PRODUCT',
                value: layout.value_action,
                navigation: navigation,
              });
            }}>
            <Text
              style={{
                fontWeight: '500',
                color: 'blue',
              }}>
              {subtitle}
            </Text>
          </TouchableOpacity>
        </Row>
      }></Container>
  );
};

export default SectionTitle;
