import React from 'react';
import {Box, Dialog, FormControlLabel, makeStyles, Radio, RadioGroup} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    root: {},
    paper: {
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        background: '#FFFFFF',
    },
    container: {
        padding: '25px 25px 89px 25px',
        background: 'rgba(255, 255, 255, 0.98)',
    },
    wrapper: {
        padding: '25px 15px 23px',
        overflow: "hidden"
    },
    title: {
        fontSize: '18px',
        lineHeight: '21px',
        marginBottom: '15px',
        color: '#2C2C2C',
        fontWeight: '700'
    },
    labelName: {
        '& > *:last-child': {
            paddingTop: '2px',
            color: '#2C2C2C',
            lineHeight: '18.75px'
        }
    },
    buttons: {
        marginTop: '20px',
        textAlign: 'right'
    },
    button: {
        color: '#00A0AB;',
        fontWeight: 500,
        lineHeight: '16.41px',
        width: '50px',
        marginLeft: '10px',
    },
    buttonRemove: {
        color: '#52B9C5',
        fontWeight: 400
    },
    group: {
        maxHeight: 425,
        flexWrap: 'nowrap',
        overflow: 'scroll'
    }

}));
const FilterItemModal = ({data, title, alias, open, changeOpen, handleClearCategories, handleChangeCategories}) => {

    const classes = useStyles();
    const methods = useFormContext()

    const handleChange = (e, onChange) => {
        onChange(e.target.value)
        handleChangeCategories()
    }

    return (
        <Dialog
            classes={{root: classes.root, paper: classes.paper, container: classes.container}}
            open={open}
            fullScreen={true}
            onClose={() => changeOpen(false)}
        >
            <Box className={classes.wrapper}>
                <Box className={classes.title}>
                    {title}
                </Box>
                {Array.isArray(data) && (
                    <Controller
                        name={alias}
                        control={methods.control}
                        defaultValue=''
                        render={({field: {value, onChange}}) => (
                            <RadioGroup
                                value={value}
                                defaultValue={value}
                                onChange={(e) => handleChange(e, onChange)}
                                classes={{root: classes.group}}
                            >
                                {data.map((item, i) => (
                                    <FormControlLabel
                                        key={i}
                                        label={item.name}
                                        value={item.alias}
                                        className={classes.labelName}
                                        control={
                                            <Radio
                                                color="primary"
                                                icon={<OutlinedIcon fontSize="inherit"/>}
                                                checkedIcon={<Filledicon fontSize="inherit"/>}
                                            />
                                        }
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    />
                )}
                <Box className={classes.buttons}>
                    <Button
                        className={`${classes.button} ${classes.buttonRemove}`}
                        onClick={handleClearCategories}
                    >
                        Отмена
                    </Button>
                    <Button className={classes.button} onClick={() => changeOpen(false)}>
                        Выбрать
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default FilterItemModal;