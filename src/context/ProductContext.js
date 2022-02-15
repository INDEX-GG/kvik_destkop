import React, {useContext, useMemo} from 'react';
import {useProduct} from "#hooks/useProduct";
import {useMedia} from "#hooks/useMedia";
import {useRouter} from "next/router";

const ProductContext = React.createContext({});
export const useProductContext = () => useContext(ProductContext);


const ProductProvider = ({children}) => {
  const router = useRouter();
  const product = useProduct(router.query.id);
  const {matchesMobile, matchesTablet} = useMedia();


  const isMobile = useMemo(() => !!(matchesMobile || matchesTablet), [matchesMobile, matchesTablet])

  return (
    <ProductContext.Provider value={{productData: product, isMobile}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
