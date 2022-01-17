import React from 'react';
import {Box, Button, makeStyles} from "@material-ui/core";
import jsonData from '/public/placeOfferJson/new_catalog.json'
import {getAdditionalFields} from "#components/newFilter/filterServices";
import {FormProvider, useForm} from 'react-hook-form'
import AdditionalInformation from "#components/placeOffer/AdditionalInformation";
import FilterTwoFields from "#components/filter/FilterTwoFields";
import FilterRadio from "#components/filter/FilterRadio";


const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 0px 20px rgb(0 0 0 / 10%)',
        borderRadius: '8px',
        minWidth: '224px',
        padding: '24px 8px',
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

const NewFilterBlock = ({alias, searchText}) => {

    const classes = useStyles();
    const methods = useForm({
        mode: 'onSubmit',
    });

    const {category} = jsonData
    const filterData = getAdditionalFields(category, alias)
    const additionalFields = filterData

    // Для ререндера
    methods?.watch()

    const onSubmit = (data) => {
        console.log(data, searchText)
    }

    return (
        <Box className={classes.wrapper}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className={classes.form}>
                    <FilterTwoFields data={{firstAlias: "fromPrice", secondAlias: 'toPrice', title: "Цена, ₽"}}/>
                    {additionalFields && (
                        <AdditionalInformation
                            currentCategory={additionalFields}
                            filters={true}
                        />
                    )}
                    <FilterRadio data={{
                        title: "Срок размещения",
                        alias: 'period',
                        fields: ['За все время', 'За последнюю неделю', 'За последние сутки']
                    }}/>
                    <Box className={classes.buttonsField}>
                        <Button
                            className={classes.button}
                            disabled={!methods.formState.isDirty}
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Показать объявления
                        </Button>
                        {/* Посмотреть старые фильтры*/}
                        {methods.formState.isDirty ? (
                            <Button
                                className={`${classes.button} ${classes.buttonClear}`}
                                // onClick={clearFields}
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