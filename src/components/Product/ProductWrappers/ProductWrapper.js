import React from 'react';

const ProductWrapper = ({children}) => {
    return (
        <div className="product__wrapper">
            <div className="productPageWrapper">
                {children}
            </div>
        </div>
    );
};

export default ProductWrapper;
