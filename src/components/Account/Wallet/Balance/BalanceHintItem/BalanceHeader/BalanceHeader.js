import React, { useMemo, useState } from 'react';
import { priceFormat, cursorReplace } from '#lib/priceFormat';

import KvikButtonUI from 'src/UI/UIcomponent/KvikButtonUI';
import KvikPayIcon from 'src/UI/UIicon/KvikPayIcon';

import { Box, TextField } from '@material-ui/core';
import { useBalanceStyles } from '../../style';



export const BalanceHeader = () => {
    const classes = useBalanceStyles()

    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState('');

    // Условие для дизейбла
    const isSumm = useMemo(() => {
        if (!open) {
            return false
        }
        return !status.length
    }, [status, open]);

    // Открытие TextField при нажатии
    const handleClick = () => {
        setOpen(!open)
    }

  return (<>
    <Box className={classes.info}>
        <Box className={classes.balance}>
            100 ₽ / 150&nbsp;
            <Box className={classes.icon}>
                <KvikPayIcon/>
            </Box>
        </Box>
{/* Если нажали на кнопку */}
        {open
            ?<TextField
                // className={classes.text}
                classes={{
                    root: classes.textField
                }}
                variant="outlined"
                placeholder="Введите сумму для пополнения"
                onKeyDown={e => cursorReplace(e)}
                onChange={e => setStatus(priceFormat(e))}
                value={status}     
            />        
            : null
        }
        <Box className={classes.button}>
            <KvikButtonUI disabled={isSumm} customRoot={classes.wrappButton} onClick={handleClick} >
                <Box className={classes.balanceAdd}/>
                Пополнить баланс
            </KvikButtonUI>
        </Box>
    </Box>             
    </>
    );
};