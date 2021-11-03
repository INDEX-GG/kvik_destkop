import React from 'react';
import {Grid, Skeleton} from "@mui/material";
import {Box, Container} from "@material-ui/core";


const CardBoxItem = () => {
    return (
        <Grid item container xs={12} spacing={1}>
            {/*левый квадрат*/}
            <Grid item xs={0.5}>
                <Box>
                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#F2F3F4', borderRadius: '8px'}}>
                        <div style={{width: "32px", height: "27px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
            {/*круг*/}
            <Grid item xs={0.5}>
                <Box>
                    <Skeleton animation="wave" variant="circular"
                              sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                        <div style={{width: "32px", height: "32px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
            {/*левая полоска*/}
            <Grid item xs={4}>
                <Box style={{display: "flex", justifyContent: "flex-start"}}>
                    <Skeleton animation="wave" variant="rectangular"
                              sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                        <div style={{width: "203px", height: "27px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
            {/*правая полоска*/}
            <Grid item xs={7}>
                <Box style={{display: "flex", justifyContent: "flex-end"}}>
                    <Skeleton animation="wave" variant="rectangular"
                              sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                        <div style={{width: "108px", height: "16px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
        </Grid>
    )
}

const SettingsBlackListPlaceHolder = () => {
    return (

        <Container>
            <Grid container xs={12}  spacing={2}>
                {/*Обьявления*/}
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                                <div style={{width: "106px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                    <CardBoxItem/>
                </Grid>

            </Grid>
        </Container>
    );
};

export default SettingsBlackListPlaceHolder;
