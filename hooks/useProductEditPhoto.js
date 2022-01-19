import { useEffect, useState } from 'react';
import { useAuth } from '../lib/Context/AuthCTX';
import { getDataByPost } from '../lib/fetch';


export function useProductEditPhoto(id) {
    const [productInfo, setProductInfo] = useState({});
    
    const [productInfoFields, setProductInfoFields] = useState({});
    const {id: userId} = useAuth();
    useEffect(() => {
        if (typeof id === 'string' || typeof id === 'number') {
            getDataByPost('/api/getPost?123', { id: parseInt(id), 'user_id': userId })
                .then((r) => {
                    if (r !== undefined) {
                        // console.log('rrrrrrrrrr',r)
                        let photos = JSON.parse(r.photo);
                        r.chatProductPhoto = photos.photos[0]
                        r.editPhotos = photos
                        setProductInfo(r);
                        if (r.subcategory !== undefined) {
                            getDataByPost('/api/subcategoriesFields', { "post_id": id, "subcategory": r.subcategory })
                                .then((r) => { setProductInfoFields(r) })
                        }
                    }
                })
        }
    }, [id])


    return {
        ...productInfo,
        productInfoFields
    }
}
