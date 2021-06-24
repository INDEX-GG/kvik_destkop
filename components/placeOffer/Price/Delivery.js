import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, Checkbox, Collapse, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import {useState} from 'react';
import DeliveryIcon from '../../../UI/icons/Delivery';
import Chevron from '@material-ui/icons/KeyboardArrowDownRounded';
import theme from '../../../UI/theme';

const useStyles = makeStyles((theme) => ({
    DeliveryField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    check: {
       padding: '6px',
    },
    label: {
        flexGrow: 1,
       marginLeft: theme.spacing(4),
       '& span': {
            fontSize: '14px',
       }
    },
    collapse: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    aboutf: {
        fontSize: '12px',
        color: theme.palette.grey[200],
        marginBottom: theme.spacing(1)
    },
    abouts: {
        fontSize: '12px',
        color: theme.palette.grey[300]
    },
    rotate: {
        transform: 'rotate(180deg)',
    }
 }));

const Delivery = () => {
    const [collapsed, setCollapsed] = useState(false);
    const classes = useStyles();
    const methods = useFormContext();
   return (
       <>
             <Box className={classes.DeliveryField}>
                <DeliveryIcon Color={methods.watch('delivery') ? theme.palette.primary.main : theme.palette.grey[400]}/>
                <Controller
                    name='delivery'
                    control={methods.control}
                    defaultValue={false}
                    render={({ field: { onChange, value }}) => (
                        <FormControlLabel
                        className={classes.label}
                        control={
                           <Checkbox
                                 className={classes.check}
                                 color='primary'
                                 icon={<OutlinedIcon/>}
                                 checkedIcon={<Filledicon/>}
                                 checked={value}
                                 onChange={(e) => onChange(e.target.checked)}
                           />}
                        label="Доставка"
                    />
                    )}
                />
                <Button onClick={() => setCollapsed(!collapsed)} variant='text' color='primary'><Chevron className={collapsed ? classes.rotate : undefined}/>Подробнее</Button>
            </Box>
            <Collapse className={classes.collapse} in={collapsed}>
                <Typography className={classes.aboutf}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus et odio sit amet ultricies. Ut accumsan vel quam ac consequat. Sed sagittis velit felis, et molestie urna consectetur et. Donec eu arcu quis tellus scelerisque rutrum vitae eget mauris. Vivamus a efficitur ligula. Ut vitae porttitor est. Suspendisse iaculis mi sed enim mattis pharetra. Sed erat enim, varius et nisl vitae, finibus tincidunt enim. Vestibulum pellentesque risus sed tincidunt fringilla. Donec vel accumsan mauris.
                </Typography>
                <Typography className={classes.abouts}>
                    Sed ut nibh elit. Nullam ac lorem fringilla ipsum tempus ullamcorper nec ac quam. Etiam iaculis, libero ac posuere tincidunt, metus lectus venenatis velit, vel tristique purus ipsum quis ante. In finibus, elit eu fringilla dapibus, turpis diam euismod quam, sit amet pharetra elit mi eu neque. Proin cursus est at tortor blandit, quis finibus metus ultrices. Fusce tempus suscipit leo, sed condimentum turpis efficitur eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography >
            </Collapse>
        </>
   )
}

export default Delivery