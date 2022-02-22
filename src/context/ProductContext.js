import React, {useContext, useMemo} from 'react';
import {useProduct} from "#hooks/useProduct";
import {useMedia} from "#hooks/useMedia";
import {useRouter} from "next/router";
import {useAuth} from "#lib/Context/AuthCTX";

const ProductContext = React.createContext({});
export const useProductContext = () => useContext(ProductContext);


const ProductProvider = ({children}) => {
  const {id} = useAuth();
  const router = useRouter();
  const product = useProduct(router.query.id);
  const {matchesMobile, matchesTablet} = useMedia();
  const isMyAd = useMemo(() => id ? product?.user_id === id : false, [product?.user_id])
  const isMobile = useMemo(() => !!(matchesMobile || matchesTablet), [matchesMobile, matchesTablet])

  return (
    <ProductContext.Provider value={{productData: {...product, isMyAd}, isMobile}}>
      {children}
    </ProductContext.Provider>
  );
};

export default React.memo(ProductProvider);
