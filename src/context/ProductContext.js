import React, {useContext, useMemo} from 'react';
import {useProduct} from "#hooks/useProduct";
import {useMedia} from "#hooks/useMedia";

const ProductContext = React.createContext({});
export const useProductContext = () => useContext(ProductContext);


const ProductProvider = ({children}) => {
  const product = useProduct(4473);
  const {matchesMobile, matchesTablet} = useMedia();

  const isMobile = useMemo(() => !!(matchesMobile || matchesTablet), [matchesMobile, matchesTablet])

  return (
    <ProductContext.Provider value={{productData: product, isMobile}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
