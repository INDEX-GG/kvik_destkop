import {useEffect, useState} from "react";
import axios from "axios";

const useCategoryV2 = () => {

    // Главные катогории (1 уровень)
    const [categoryArray, setCategoryArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // Запрашиваем все категории
    useEffect(() => {
        axios.get('/placeOfferJson/new_catalog.json')
            .then(r => {
                setCategoryArr(r.data.category)
                setIsLoading(false);
            });
    }, [isLoading])


    const getMoreCategory = (category, category2, category3) => {
        if (category && categoryArray) {

            if (category && categoryArray) {

                // Категории первой вложенности
                const categoryArrOne = categoryArray.find(item => item.alias === category)

                // Категории второй вложенности
                if (category2) {

                    const categoryArrTwo = categoryArrOne?.children.find(item => item.alias === category2);

                    // Категории третьей вложенности
                    if (category3) {
                        return categoryArrTwo?.children.find(item => item.alias === category3);

                    }

                    return categoryArrTwo
                }

                return categoryArrOne
            }
        }

    };

    return {mainCategory: categoryArray, getMoreCategory}
};

export default useCategoryV2;
