import React, {useEffect, useState} from 'react';
import FilterCategory from "#components/newFilter/fields/FilterCategory";
import {makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import {getLastElementArr} from "#lib/services";
import NewFilterBlock from "#components/newFilter/NewFilterBlock";
import aliasName from "#components/header/CategoriesAliaseName";
import {useRouter} from "next/router";
import {handleChangeCategory} from "#components/newFilter/filterServices";

const useStyles = makeStyles(() => ({
    wrapper: {
        margin: 15
    }
}));

const FilterMobile = () => {

    const classes = useStyles();
    const methods = useForm({
        defaultValues: {alias1: undefined, alias2: undefined, alias3: undefined}
    });
    const router = useRouter();

    const [category, setCategory] = useState('');
    const categoryLast = getLastElementArr(category, ',')

    const aliasQuery = router.asPath?.split("/")[2]?.split('?')[0]
    const aliasData = aliasName(aliasQuery, true)?.aliasBread?.map(item => item.alias)?.join(',')


    useEffect(() => {
        if (aliasData) {
            setCategory(aliasData)
            handleChangeCategory(aliasData.split(','), methods)
        }
    }, [aliasQuery])


    return (
        <Box className={classes.wrapper}>
            <FormProvider {...methods}>
                <form>
                    <FilterCategory
                        setCategory={setCategory}
                    />
                </form>
                {/* Ненужно на мобилке - setScrollData */}
                <NewFilterBlock
                    alias={categoryLast}
                    fullAlias={category}
                    searchText=''
                    setScrollData={(item) => item}
                    defaultFilters={{...router.query}}
                    mobile={{
                        category,

                    }}
                />
            </FormProvider>
        </Box>
    );
};

export default FilterMobile;