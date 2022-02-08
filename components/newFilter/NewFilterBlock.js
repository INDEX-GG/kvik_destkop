import React, {useEffect, useState} from 'react';
import {Box, Button, makeStyles} from "@material-ui/core";
import jsonData from '/public/placeOfferJson/new_catalog.json'
import {
    generateFilterData,
    getAdditionalFields,
    onlyTrueDataObj
} from "#components/newFilter/filterServices";
import {FormProvider, useForm} from 'react-hook-form'
import AdditionalInformation from "#components/placeOffer/AdditionalInformation";
import FilterTwoFields from "#components/filter/FilterTwoFields";
import FilterRadio from "#components/filter/FilterRadio";
import {useRouter} from "next/router";

import useCategoryV2 from "#hooks/useCategoryV2";
import FilterTextField from "#components/newFilter/fields/FilterTextField";
import aliasName from "#components/header/CategoriesAliaseName";
import FilterCategory from "#components/newFilter/fields/FilterCategory";
import {handleChangeCategory} from "#components/newFilter/filterServices";



const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 0px 20px rgb(0 0 0 / 10%)',
        borderRadius: '8px',
        minWidth: '224px',
        padding: '24px 8px',
        [theme.breakpoints.down(960)]: {
            padding: 0,
            boxShadow: 'none'
        }
    },
    fields: {

    },
    form: {
        '& > *': {
            width: '100%',
            marginBottom: '24px',
            position: 'relative',
            '& >*:nth-of-type(2)': {
                width: '100%',
                '& > p': {
                    display: 'none'
                }
            },
            '& > #numberDesignation': {
                top: 'auto',
                bottom: '7px'
            }
        }
    },
    button: {
        margin: 0,
        "&:disabled": {
            color: "#fff",
            backgroundColor: "#A1DCE0",
        },
    },
    buttonsField: {
        display: "flex",
        flexDirection: "column",
    },
    buttonClear: {
        marginTop: 24,
    },
}));

const NewFilterBlock = ({fullAlias, alias, searchText, setScrollData, mobile, defaultFilters = {}}) => {


    const classes = useStyles();
    const router = useRouter();

    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {alias1: undefined, alias2: undefined, alias3: undefined}
    });

    const {category} = jsonData
    const filterData = getAdditionalFields(category, fullAlias)
    const additionalFields = filterData
    //? TRUE / FALSE -> Показывать кнопку очистки фильтров или нет
    const isClear = methods.formState.isDirty || Object.keys(onlyTrueDataObj(methods.getValues())).length
    // const {mainCategory, getMoreCategory} = useCategoryV2();

    const [category1, setCategory] = useState('');
    const aliasQuery = router.asPath?.split("/")[2]?.split('?')[0]
    const aliasData = aliasName(aliasQuery, true)?.aliasBread?.map(item => item.alias)?.join(',')

    console.log('category: ', category)
    console.log('category1: ', category1)

    useEffect(() => {
        if (aliasData) {
            console.log('aliasData: ', aliasData)
            setCategory(aliasData)
            handleChangeCategory(aliasData.split(','), methods)
        }
    }, [aliasQuery])

    const clearFields = (clearQuery) => {
        // Плавный скролл вверх
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        // Очистка всех полей
        methods.reset({});
        // Делаем запрос на api с категориями
        setScrollData({sendObj: {data: fullAlias}, url: '/api/postCategorySearch'})

        //? Перемещаемся на страницу без фильтров в query
        if (clearQuery) {
            router.push({pathname: `/search/${alias}`})
        }
    };


    // Для ререндера
    methods?.watch()

    // Если меняется категория, то сбрасываем всё
    useEffect(() => {
        clearFields();
    }, [alias]);

    // Автозаполнение полей
    useEffect(() => {
        methods.reset(defaultFilters)
    }, [defaultFilters])



    const onSubmit = (data,e) => {
        e.preventDefault()

        console.log(data);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        const filterDataObj = generateFilterData(data);

        console.log('filterDataObj: ',  filterDataObj);
        console.log('filterDataObj data: ',  data);

        //*  Объект фильтров
        const submitDataObj = {
            price: {min: null, max: null},
            time: null,
            ...filterDataObj,
            category: alias,
            categoryFullName: fullAlias,
            text: searchText ? searchText : ''
        }

        setScrollData({url: '/api/getPostsCheck', sendObj: submitDataObj})


        // Запимываем чекбоксы в query
        router.push({
            pathname: `/search/${alias}`,
            query: {
                ...onlyTrueDataObj(data)
            }
        })
    }



    return (
        <Box className={classes.wrapper}>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data, e) => onSubmit(data, e))}
                    className={classes.form}
                >
                    {/* {!additionalFields && */}
                        <FilterCategory
                            category={category1}
                            setCategory={setCategory}
                        />
                    {/* } */}
                    <FilterTwoFields data={{firstAlias: "from$price", secondAlias: 'to$price', title: "Цена, ₽"}}/>
                    {additionalFields && (
                        <AdditionalInformation
                            currentCategory={additionalFields}
                            filters={true}
                        />
                    )}

                    <FilterRadio data={{
                        title: "Срок размещения",
                        alias: 'time',
                        fields: ['За все время', 'За последнюю неделю', 'За последние сутки']
                    }}/>
                    <Box className={classes.buttonsField}>
                        <Button
                            className={classes.button}
                            disabled={!methods.formState.isDirty && !mobile?.category}
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Показать объявления
                        </Button>
                        {isClear ? (
                            <Button
                                className={`${classes.button} ${classes.buttonClear}`}
                                onClick={() => clearFields(true)}
                                color="default"
                                variant="contained"
                            >
                                Очистить фильтр
                            </Button>
                        ) : null}
                    </Box>
                </form>
            </FormProvider>
        </Box>
    );
};

export default NewFilterBlock;
