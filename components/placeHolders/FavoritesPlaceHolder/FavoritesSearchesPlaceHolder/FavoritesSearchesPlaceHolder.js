import React from 'react';
import {Box, Container} from "@material-ui/core";
import {Grid, Skeleton} from "@mui/material";


const CardInfo = () => {
    return (
        <Grid item container xs={12} spacing={1}>
            {/*первая палочка*/}
            <Grid item xs={12}>
                <Box>
                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                        <div style={{width: "312px", height: "16px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
            {/*вторая палочка*/}
            <Grid item xs={12}>
                <Box>
                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                        <div style={{width: "905px", height: "53px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
            {/*нижняя палочка*/}
            <Grid item xs={12}>
                <Box>
                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                        <div style={{width: "905px", height: "1px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
        </Grid>
    )
}

const CardBoxItem = () => {
    return (
        <Grid item container xs={12} spacing={1}>
            {/*верхний ряд круг и 2 палочки*/}
            <Grid item container xs={12} style={{marginBottom: "15px"}}>
                {/*контейнер с двумя палочками*/}
                <Grid item container xs={12}>
                    {/*левая палочка*/}
                    <Grid item xs={6}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "86px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    {/*правая палочка*/}
                    <Grid item xs={6}>
                        <Box style={{display: "flex", justifyContent: 'flex-end'}}>
                            <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "86px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            {/*второй ряд квадратики с палочкой*/}
            <CardInfo/>
        </Grid>
    )
}

const CardBox = () => {
    return (

        <Grid item container xs={12}>
            <Grid item xs={12}>
                <CardBoxItem/>
            </Grid>
            {/*тут все квадратики*/}
        </Grid>
    )
}

const FavoritesSearchesPlaceHolder = () => {
    return (
        <Container>
            <Grid container xs={12} spacing={3}>
                {/*Обьявления*/}
                <Grid item container xs={12} spacing={2}>
                    <CardBox />
                    <CardBox />
                    <CardBox />
                    <CardBox />
                    <CardBox />
                </Grid>

            </Grid>
        </Container>
    );
};

export default FavoritesSearchesPlaceHolder;
