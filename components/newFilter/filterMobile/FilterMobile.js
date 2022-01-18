import React, {useState} from 'react';
import FilterCategory from "#components/newFilter/fields/FilterCategory";
import {makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import {getLastElementArr} from "#lib/services";
import NewFilterBlock from "#components/newFilter/NewFilterBlock";

const useStyles = makeStyles(() => ({
    wrapper: {
        margin: 15
    }
}));

const FilterMobile = () => {

    const classes = useStyles();
    const methods = useForm();

    const [category, setCategory] = useState('');
    const [scrollData, setScrollData] = useState(false);
    const categoryLast = getLastElementArr(category, ',')

    console.log(scrollData);


    return (
        <Box className={classes.wrapper}>
            <FormProvider {...methods}>
                <form>
                    <FilterCategory
                        setCategory={setCategory}
                    />
                    <NewFilterBlock
                        alias={categoryLast}
                        fullAlias={category}
                        searchText=''
                        setScrollData={setScrollData}
                        defaultFilters={{}}
                    />
                </form>
            </FormProvider>
        </Box>
    );
};

export default FilterMobile;