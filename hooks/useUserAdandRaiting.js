import { useEffect, useState } from 'react';
import { getDataByPost } from '../lib/fetch';

/**
 * !NOTICE - не используется (старая api)
 * @param {*} router
 * @returns
 */
export function useProduct({ router }) {
    const [productInfo, setProductInfo] = useState({});
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        getDataByPost('/api/getProductOfUser', { product_id: router.query.id })
            .then((result) => {
                result.data.result.map((items) => {
                    setProductInfo({
                        name: items.name,
                        user_id: items.user_id,
                        raiting: items.raiting,
                        address: items.address,
                        category_id: items.category_id,
                        commercial: items.commercial,
                        created_at: items.created_at,
                        delivery: items.delivery,
                        description: items.description,
                        email: items.email,
                        id: items.id,
                        phone: items.phone,
                        photo: items.photo,
                        rating: items.rating,
                        reviewed: items.reviewed,
                        secure_transaction: items.secure_transaction,
                        title: items.title,
                        trade: items.trade,
                        price: items.price,
                        verify_moderator: items.verify_moderator,
                    })
                })
                setLoading(false)
            })
    }, [router])
    return {
        name: productInfo.name,
        user_id: productInfo.user_id,
        raiting: productInfo.raiting,
        address: productInfo.address,
        category_id: productInfo.category_id,
        commercial: productInfo.commercial,
        created_at: productInfo.created_at,
        delivery: productInfo.delivery,
        description: productInfo.description,
        email: productInfo.email,
        id: productInfo.id,
        phone: productInfo.phone,
        photo: productInfo.photo,
        rating: productInfo.rating,
        reviewed: productInfo.reviewed,
        secure_transaction: productInfo.secure_transaction,
        title: productInfo.title,
        trade: productInfo.trade,
        price: productInfo.price,
        verify_moderator: productInfo.verify_moderator,
        isLoading,
    }
}
