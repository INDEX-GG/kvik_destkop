import React, {useEffect} from 'react';
import FilterTextField from "#components/newFilter/fields/FilterTextField";
import useCategoryV2 from "#hooks/useCategoryV2";
import {useFormContext} from "react-hook-form";

const FilterCategory = ({setCategory}) => {

    const methods = useFormContext();
    const alias1 = methods.watch('alias1')
    const alias2 = methods.watch('alias2')
    const alias3 = methods.watch('alias3')

    const {mainCategory, getMoreCategory} = useCategoryV2();

    const aliasArr = [alias1, alias2, alias3]
    const aliasArrTwo = getMoreCategory(alias1)?.children
    const aliasArrThree = getMoreCategory(alias1, alias2)?.children

    const aliasTwoLength = aliasArrTwo?.length
    const aliasThreeLength = aliasArrThree?.length


    useEffect(() => {
        setCategory(aliasArr.filter(item => item).join(','))
    }, [...aliasArr])


    return (
        <div>
            <FilterTextField
                title='Категория'
                data={mainCategory}
                alias='alias1'
                type={1}
            />
            {methods.watch('alias1') && aliasTwoLength ? (
                <FilterTextField
                    title='Подкатегория'
                    data={aliasArrTwo}
                    alias='alias2'
                    type={2}
                />
            ) : null}
            {methods.watch('alias2') && aliasThreeLength ? (
                <FilterTextField
                    title='Вид товара'
                    data={aliasArrThree}
                    alias='alias3'
                    type={3}
                />
            ) : null}
        </div>
    );
};

export default FilterCategory;