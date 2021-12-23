import React, {useState} from 'react';
import {makeStyles, MenuItem, TextField, } from "@material-ui/core";
// import SortItemIcon from '#UI/icons/SortItemIcon';


const useStyles = makeStyles(() => ({
    title_filter: {
        fontSize: '14px',
    },
}));

const sortItems = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'new', label: 'Сначала новые' },
    { value: 'price_by_ascending', label: 'Дешевле' },
    { value: 'price_by_descending', label: 'Дороже' },
];


const SortItem = ({setSort}) => {

    const [state, setState] = useState('default')
    const classes = useStyles();


    const handlerSortChange = (e) => {
        const value = e.target.value
        setState(value);
        setSort(value)
    }

    return (
        <TextField
            select
            value={state}
            onChange={handlerSortChange}
        >
            {sortItems.map((option, i) => (
                <MenuItem key={i} className={classes.title_filter} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default SortItem;