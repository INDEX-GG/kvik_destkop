import React, {useState, useRef} from 'react';
import {makeStyles, MenuItem, Menu, Button } from "@material-ui/core";
import SortItemIcon from '#UI/icons/SortItemIcon';


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

const selectedTextValue = {
    default: 'По умолчанию' ,
    new: 'Сначала новые' ,
    price_by_ascending: 'Дешевле',
    price_by_descending: 'Дороже' ,
};



const SortItem = ({setSort}) => {
    // стейт нужен для старого варианта сортировки
    // const [state, setState] = useState('default')
    // стейт нужен для старого варианта сортировки
    const classes = useStyles();
    const [textField, setTextField] = useState(selectedTextValue['default']);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const ButtonRef = useRef(null)

    const handlerSortChange = (e) => {
        const value = e.target.attributes.value.value

        setMenuIsOpen(false)
        setTextField(selectedTextValue[value])
        setSort(value)
        // ниже код для старого варианта сортировки, все что выше для старого варианта - не нужно.
        // const value = e.target.value
        // setState(value);
        // setSort(value)
    }

    return (

        <div>
            <Button
            ref={ButtonRef}
            id="basic-button"
            onClick={()=> setMenuIsOpen(true) }
            // aria-controls="sort-menu"
            // aria-haspopup="true"
            // aria-expanded={menuIsOpen ? 'true' : undefined}
        >
            <SortItemIcon/>
            {textField}
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={ButtonRef.current}
            open={menuIsOpen}
            onClose={()=>setMenuIsOpen(false)}
            variant='selectedMenu'
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            {sortItems.map((option, i) => (
                <MenuItem onClick={handlerSortChange} key={i} className={classes.title_filter} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Menu>
        </div>
                  // старый вариант сортировки, оставил на случай поломок нового
            // <TextField
            //     select
            //     value={state}
            //     onChange={handlerSortChange}
            //     InputProps={{startAdornment:
            //         <InputAdornment>
            //             <SortItemIcon/>
            //       </InputAdornment>}
                    
            //     }
                
            // >
            //     {sortItems.map((option, i) => (
            //         <MenuItem  key={i} className={classes.title_filter} value={option.value}>
            //             {option.label}
            //         </MenuItem>
            //     ))}
            // </TextField>
        // старый вариант сортировки, оставил на случай поломок нового
    );
};

export default SortItem;