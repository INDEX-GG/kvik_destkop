import Router from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios'

export function useProduct({ router }) {
    const [productInfo, setProductInfo] = useState({});
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        axios.post('/api/getPost', { product_id: router.query.id })
            .then((result) => {
                result.data.result.map((items) => {
                    setProductInfo({
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
                        user_id: items.user_id,
                        price: items.price,
                        verify_moderator: items.verify_moderator,
                    })
                })
                setLoading(false)
            })
    }, [router])
    return {
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
        user_id: productInfo.user_id,
        price: productInfo.price,
        verify_moderator: productInfo.verify_moderator,
        isLoading,
    }
}

