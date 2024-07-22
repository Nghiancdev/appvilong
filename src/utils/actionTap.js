import {useNavigation} from '@react-navigation/native';

const TYPE_ACTION = {
  QR: 'QR',
  SCORE: 'SCORE',
  CALL: 'CALL',
  MESSAGE_TO_SHOP: 'MESSAGE_TO_SHOP',
  VOUCHER: 'VOUCHER',
  PRODUCTS_TOP_SALES: 'PRODUCTS_TOP_SALES',
  PRODUCT_BY_CATEGORY: 'PRODUCT_BY_CATEGORY',
  PRODUCTS_DISCOUNT: 'PRODUCTS_DISCOUNT',
  COMBO: 'COMBO',
  BONUS_PRODUCT: 'BONUS_PRODUCT',
  PRODUCTS_NEW: 'PRODUCTS_NEW',
  LINK: 'LINK',
  PRODUCT: 'PRODUCT',
  CATEGORY_PRODUCT: 'CATEGORY_PRODUCT',
  CATEGORY_POST: 'CATEGORY_POST',
  POST: 'POST',
  SPIN_WHEEL: 'SPIN_WHEEL',
  GUESS_NUMBER: 'GUESS_NUMBER',
};

const mapTypeAction = {
  [TYPE_ACTION.QR]: 'QR',
  [TYPE_ACTION.SCORE]: 'SCORE',
  [TYPE_ACTION.CALL]: 'CALL',
  [TYPE_ACTION.MESSAGE_TO_SHOP]: 'MESSAGE_TO_SHOP',
  [TYPE_ACTION.VOUCHER]: 'VOUCHER',
  [TYPE_ACTION.PRODUCTS_TOP_SALES]: 'PRODUCTS_TOP_SALES',
  [TYPE_ACTION.PRODUCT_BY_CATEGORY]: 'PRODUCT_BY_CATEGORY',
  [TYPE_ACTION.PRODUCTS_DISCOUNT]: 'PRODUCTS_DISCOUNT',
  [TYPE_ACTION.PRODUCTS_NEW]: 'PRODUCTS_NEW',
  [TYPE_ACTION.COMBO]: 'COMBO',
  [TYPE_ACTION.BONUS_PRODUCT]: 'BONUS_PRODUCT',
  [TYPE_ACTION.LINK]: 'LINK',
  [TYPE_ACTION.PRODUCT]: 'PRODUCT',
  [TYPE_ACTION.CATEGORY_PRODUCT]: 'CATEGORY_PRODUCT',
  [TYPE_ACTION.CATEGORY_POST]: 'CATEGORY_POST',
  [TYPE_ACTION.POST]: 'POST',
  [TYPE_ACTION.SPIN_WHEEL]: 'SPIN_WHEEL',
  [TYPE_ACTION.GUESS_NUMBER]: 'GUESS_NUMBER',
};
const checkTypeDefault = [
  TYPE_ACTION.QR,
  TYPE_ACTION.SCORE,
  TYPE_ACTION.CALL,
  TYPE_ACTION.MESSAGE_TO_SHOP,
  TYPE_ACTION.VOUCHER,
  TYPE_ACTION.PRODUCTS_TOP_SALES,
  TYPE_ACTION.PRODUCTS_DISCOUNT,
  TYPE_ACTION.COMBO,
  TYPE_ACTION.BONUS_PRODUCT,
  TYPE_ACTION.PRODUCTS_NEW,
];

async function actionTap({typeAction, value, thenAction, navigation}) {
  console.log('typeAction', typeAction);
  console.log('value', value);

  const callNumber = phoneNumber => {
    // Call number logic
  };

  const launchUrl = url => {
    // Launch URL logic
  };

  if (typeAction === TYPE_ACTION.QR) {
    try {
      const barcodeScanRes = await FlutterBarcodeScanner.scanBarcode(
        '#ff6666',
        'Cancel',
        true,
        ScanMode.BARCODE,
      );
      const data =
        await CustomerRepositoryManager.productCustomerRepository.scanProduct(
          barcodeScanRes,
        );
      const product = data?.data?.product;

      if (product) {
        navigateToProductScreen(product.id);
      } else {
        showErrorAlert('Không tìm thấy sản phẩm');
      }
    } catch (err) {
      showErrorAlert(err.toString());
    }
  }

  if (typeAction === TYPE_ACTION.SPIN_WHEEL) {
  }

  if (typeAction === TYPE_ACTION.GUESS_NUMBER) {
  }

  if (typeAction === TYPE_ACTION.CALL) {
    callNumber(value);
  }

  if (typeAction === TYPE_ACTION.SCORE) {
  }

  if (typeAction === TYPE_ACTION.MESSAGE_TO_SHOP) {
  }

  if (typeAction === TYPE_ACTION.PRODUCTS_TOP_SALES) {
  }

  if (typeAction === TYPE_ACTION.PRODUCT_BY_CATEGORY) {
    navigation.navigate('CATEGORIES', {categoryId: value});
    return;
  }

  // Handle other typeAction cases similarly

  if (typeAction === TYPE_ACTION.LINK) {
    launchUrl(value);
  }

  if (typeAction === TYPE_ACTION.PRODUCT) {
  }

  if (typeAction === TYPE_ACTION.POST) {
  }

  if (typeAction === TYPE_ACTION.CATEGORY_PRODUCT) {
    navigation.navigate('CATEGORIES', {
      categoryId: value,
    });
    return;
  }

  if (typeAction === TYPE_ACTION.CATEGORY_POST) {
    navigation.push('NEW', {automaticallyImplyLeading: true});
    return;
  }

  if (typeAction === TYPE_ACTION.BONUS_PRODUCT) {
    navigation.push('BONUS');
    return;
  }

  if (typeAction === TYPE_ACTION.VOUCHER) {
    navigation.push('VOUCHER');
    return;
  }

  if (typeAction === TYPE_ACTION.MESSAGE_TO_SHOP) {
    navigation.navigate('CHAT_LIST');
    return;
  }

  if (typeAction === TYPE_ACTION.SCORE) {
    navigation.navigate('POINT');
    return;
  }

  if (typeAction === TYPE_ACTION.PRODUCTS_NEW) {
    navigation.navigate('CATEGORIES', {sortByShowInput: 'created_at'});
    return;
  }

  if (typeAction === TYPE_ACTION.PRODUCTS_TOP_SALES) {
    navigation.navigate('CATEGORIES', {sortByShowInput: 'sales'});
    return;
  }

  if (typeAction === TYPE_ACTION.PRODUCTS_DISCOUNT) {
    navigation.navigate('CATEGORIES', {isChooseDiscountSort: true});
    return;
  }

  if (thenAction && typeof thenAction === 'function') {
    thenAction();
  }
}
export default actionTap;
