import React, {useEffect, useState, useMemo} from "react"
import CategoriesPlaseOffer from "./CategoriesPlaseOffer"
import MobileModal from "#components/MobileModal";
import {useFormContext} from "react-hook-form";
import { useRouter } from "next/router";

export default function PlaceOfferMobile({children}) {

    const isEditPage = useRouter().pathname.includes('editPage')
    const [categories, setCategories] = useState(null)
    const methods = useFormContext()
    const alias1 = useMemo(() => methods.getValues('alias1'), [methods.getValues('alias1')])
    const alias2 = useMemo(() => methods.getValues('alias2'), [methods.getValues('alias2')])
    const alias3 = useMemo(() => methods.getValues('alias3'), [methods.getValues('alias3')])



    const generateAlias = (categories, reset = false) => {
        const categoriesArr = categories.split(',');
        for (let i = 1; i <= categoriesArr.length; i++) {
            const alias = 'alias' + i
            const item = reset ? null : categoriesArr[i - 1]
            methods.setValue(alias, item)
        }
    }

    console.log(categories);

    
    const changeCategory = () => {
        methods.setValue('alias', null)
        generateAlias(categories, true)
        setCategories(false);
    }


    useEffect(() => {
        if (alias1) {
            methods.setValue('alias', categories)
            generateAlias(categories)
            return
        }

        if (categories) {
            methods.setValue('alias', categories)
            methods.reset();
            generateAlias(categories)
        }
    }, [categories])

    useEffect(() => {
        if (alias1) {
            const categoriesStr = `${alias1}${alias2 ? `,${alias2}`: ''}${alias3 ? `,${alias3}` : ''}`;
            setCategories(categoriesStr)
        }
    }, [alias1])


    return (
        <>
            {!isEditPage 
            &&
            <CategoriesPlaseOffer
                categories={categories}
                dialog={!categories}
                setCategories={setCategories}
            />}
            <MobileModal
                title='Новое объявление'
                dialog={categories}
                close={changeCategory}
            >
                {children}
            </MobileModal>
        </>
    )
}