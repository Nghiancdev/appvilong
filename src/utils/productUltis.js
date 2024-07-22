export const HAS_SUB = "HAS_SUB";
export const HAS_ELE = "HAS_ELE";
export const NO_ELE_SUB = "NO_ELE_SUB";

export const getTypeProductDistribute = (product) => {
  if (product.distributes != null && product.distributes.length > 0) {
    const distributes = product.distributes[0];

    if (
      distributes != null &&
      distributes.element_distributes != null &&
      distributes.element_distributes.length > 0
    ) {
      const element_distributes = distributes.element_distributes;
      if (
        element_distributes[0].sub_element_distributes != null &&
        element_distributes[0].sub_element_distributes.length > 0
      ) {
        return HAS_SUB;
      }
      return HAS_ELE;
    }
  }
  return NO_ELE_SUB;
};

export const findStock = (
  product,
  elementDistributeName,
  subElementDistributeName
) => {
  var type = getTypeProductDistribute(product);
  if (type == NO_ELE_SUB) {
    return product.quantity_in_stock;
  }
  if (type == HAS_ELE) {
    var distributes = product.distributes;
    var element_distributes = distributes[0].element_distributes;

    const ele = element_distributes.find(
      (e) => e.name == elementDistributeName
    );
    if (ele != null) {
      return ele.quantity_in_stock;
    }
  }

  if (type == HAS_SUB) {
    var distributes = product.distributes;

    if (distributes[0].element_distributes.length > 0) {
      var element_distributes = distributes[0].element_distributes;

      const ele = element_distributes.find(
        (e) => e.name == elementDistributeName
      );
      if (ele != null) {
        const sub_element_distributes = ele.sub_element_distributes;

        const sub = sub_element_distributes.find(
          (s) => s.name == subElementDistributeName
        );
        if (sub != null) {
          return sub.quantity_in_stock;
        }
      }
    }
  }
  return null;
};
