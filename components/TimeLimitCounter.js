import React, {useEffect, useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";

const TimeLimitCounter = ({handleWaitStart, handleWaitEnd}) => {
    const styles = useStyles();

    const [waitCounter, setWaitCounter] = useState(90);
    const [isStart, setIsStart] = useState(false);

    useEffect(() => {
        setIsStart(true);
        handleWaitStart()
    }, []);


    useEffect(() => {
        if (isStart) {
            if (waitCounter) {
                setTimeout(() => {
                    setWaitCounter(prevState => prevState - 1);
                }, 1000)
            }
            if (waitCounter <= 0) {
                setIsStart(false);
                handleWaitEnd()
            }
        }
    }, [isStart, waitCounter])

    return (
        <Box component='span' className={styles.counter}>
            Повторный звонок будет доступен через {waitCounter}с.
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    counter: {
        textAlign: 'center',
        fontSize: '12px',
        lineHeight: '16px',
        color: '#00A0AB'
    }
}))

export default React.memo(TimeLimitCounter);
