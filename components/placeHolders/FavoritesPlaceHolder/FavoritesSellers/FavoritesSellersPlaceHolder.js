import React from 'react';
import {Box, Container} from "@material-ui/core";
import {Grid, Skeleton} from "@mui/material";


const CardPhoto = () => {
  return (
      <Grid item container xs={1.5} spacing={1}>
          {/*верхний квадрат*/}
          <Grid item xs={12}>
              <Box style={{display: "flex", justifyContent: "center"}}>
                  <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                      <div style={{width: "94px", height: "91px"}}/>
                  </Skeleton>
              </Box>
          </Grid>
          {/*нижняя палочка*/}
          <Grid item xs={12}>
              <Box style={{display: "flex", justifyContent: "center"}}>
                  <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                      <div style={{width: "75px", height: "16px"}}/>
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
            <Grid item container xs={12}>
                {/*круг*/}
                <Grid item xs={0.5}>
                    <Box>
                        <Skeleton animation="wave" variant="circular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                            <div style={{width: "34px", height: "34px"}}/>
                        </Skeleton>
                    </Box>
                </Grid>
                {/*контейнер с двумя палочками*/}
                <Grid item container xs={11.5}>
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
            <CardPhoto/>
            <CardPhoto/>
            <CardPhoto/>
            <CardPhoto/>
            <CardPhoto/>
            <CardPhoto/>
            <CardPhoto/>
            <CardPhoto/>

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

const FavoritesSellersPlaceHolder = () => {
    return (
        <Container>
            <Grid container xs={12} style={{padding: '15px'}} spacing={3}>
                {/*Обьявления*/}
                <Grid item container xs={12} spacing={2}>
                    <CardBox />
                    <CardBox />
                    <CardBox />
                </Grid>

            </Grid>
        </Container>
    );
};

export default FavoritesSellersPlaceHolder;
