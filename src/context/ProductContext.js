import React, {useContext, useMemo, useState} from 'react';
import {useProduct} from "#hooks/useProduct";
import {useMedia} from "#hooks/useMedia";
import {useRouter} from "next/router";
import {useAuth} from "#lib/Context/AuthCTX";

const ProductContext = React.createContext({});
export const useProductContext = () => useContext(ProductContext);


const ProductProvider = ({children}) => {
  const {id} = useAuth();
  const router = useRouter();
  const {matchesMobile, matchesTablet} = useMedia();

  const product = useProduct(router.query.id);

  const setProductInfo = useMemo(() => (
      product?.setProductInfo ? product?.setProductInfo : () => null
  ), [product])

  const isMyAd = useMemo(() => (
      id ? product?.user_id === id : false
  ), [product?.user_id])

  const isMobile = useMemo(() => (
      !!(matchesMobile || matchesTablet)
  ), [matchesMobile, matchesTablet])

  return (
    <ProductContext.Provider value={{productData: {...product, isMyAd}, isMobile, setProductInfo}}>
      {children}
    </ProductContext.Provider>
  );
};

export default React.memo(ProductProvider);
