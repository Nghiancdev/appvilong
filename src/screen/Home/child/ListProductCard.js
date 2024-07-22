import {ScrollView} from 'react-native';
import Column from '../../../components/Column';
import Container from '../../../components/Container';
import ProductItem from '../../../components/Product/ProductItem';
import {useDataAppStore} from '../../../store/DataAppStore';

const ListProductCard = (layout) => {
  const {infoCustomer} = useDataAppStore();
  return (
    <Column>
      <Container
        padding={5}
        height={
          infoCustomer?.is_collaborator == true ||
          infoCustomer?.is_agency == true
            ? 335
            : 280
        }
        child={
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {layout?.list?.map((e, index) => {
              return (
                <ProductItem key={index} product={e} width={170} ></ProductItem>
              );
            })}
          </ScrollView>
        }></Container>
    </Column>
  );
};

export default ListProductCard;
