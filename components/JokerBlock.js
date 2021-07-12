import React from 'react';
import Image from 'next/image';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '29px',
		minWidth: '224px',
		'&>*': {
			margin: '12px 0 !important'
		}
    },
}));

const JokerBlock = () => {

	const classes = useStyles();

	return (
		<Box className={classes.root} >
			<Image src='/img/joker2.png' width={224} height={480} placeholder="blur" blurDataURL='default'/>
			<Image src='/img/joker1.png' width={224} height={480} placeholder="blur" blurDataURL='default'/>
		</Box>
	)
}

export default JokerBlock
