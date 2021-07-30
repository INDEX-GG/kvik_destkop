import React, {useState} from "react"
import CategoriesPlaseOffer from "./CategoriesPlaseOffer"
import ContentPlaseOffer from "./ContentPlaseOffer"


export default function PlaceOfferMobile() {
    const [categories, setCategories] = useState(null)
    const [categoriesDialog, setCategoriesDialog] = useState(true)
    const [contentDialog, setContentDialog] = useState(false)

    function changeCategories(str) {
        setCategories(str)
    }

    function changeCategoriesDialog() {
        setCategoriesDialog(false)
        setContentDialog(true)
    }

    return (
        <>
            <CategoriesPlaseOffer categories={categories} categoriesFunc={changeCategories} dialog={categoriesDialog} dialogFunc={changeCategoriesDialog}/>
            <ContentPlaseOffer dialog={contentDialog}/>
        </>
    )
}