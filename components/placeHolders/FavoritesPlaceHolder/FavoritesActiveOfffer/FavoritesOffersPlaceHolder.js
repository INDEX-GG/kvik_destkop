import React from 'react';
import {Box, Container} from "@material-ui/core";
import {Grid, Skeleton} from "@mui/material";

const CardBoxItem = () => {
  return (
      <Grid item container xs={12} spacing={1}>
          {/*левый квадрат*/}
          <Grid item xs={6}>
              <Box>
                  <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                      <div style={{width: "210px", height: "184px"}}/>
                  </Skeleton>
              </Box>
          </Grid>
          {/*правые полоски*/}
          <Grid item container xs={6} spacing={1}>
              {/*левые 5 палочек*/}
              <Grid item container xs={8} >
                  <Grid item xs={12}>
                      <Box style={{display: "flex", justifyContent: "flex-end"}}>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                              <div style={{width: "110px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box style={{display: "flex", justifyContent: "flex-end"}}>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                              <div style={{width: "110px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                              <div style={{width: "110px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                              <div style={{width: "167px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                              <div style={{width: "167px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
              </Grid>
              {/*правый круг*/}
              <Grid item container xs={4}>
                  <Grid item xs={8}>
                      <Box>
                          <Skeleton animation="wave" variant="circular"
                                    sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                              <div style={{width: "34px", height: "34px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  {/*3 прозрачные*/}
                  <Grid item xs={8}>
                      <Box>
                          <Skeleton animation={false} variant="rectangular"
                                    sx={{bgcolor: 'rgba(199,199,199,0)', borderRadius: '15px'}}>
                              <div style={{width: "180px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={8}>
                      <Box>
                          <Skeleton animation={false} variant="rectangular"
                                    sx={{bgcolor: 'rgba(199,199,199,0)', borderRadius: '15px'}}>
                              <div style={{width: "180px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={8}>
                      <Box>
                          <Skeleton animation={false} variant="rectangular"
                                    sx={{bgcolor: 'rgba(199,199,199,0)', borderRadius: '15px'}}>
                              <div style={{width: "180px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
              </Grid>
          </Grid>
      </Grid>
  )
}

const CardBox = () => {
  return (

      <Grid item container xs={12}>
          <Grid item xs={6}>
              <CardBoxItem/>
          </Grid>
          <Grid item xs={6}>
              <CardBoxItem/>
          </Grid>
      </Grid>
  )
}


const FavoritesOffersPlaceHolder = () => {
    return (

        <Container>
            <Grid container xs={12} style={{padding: '15px'}} spacing={2}>

                {/*Обьявления*/}
                <Grid item container xs={12} spacing={2}>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={2}>
                            <Box>
                                <Skeleton animation="wave" variant="rectangular"
                                          sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                                    <div style={{width: "112px", height: "24px"}}/>
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box>
                                <Skeleton animation="wave" variant="rectangular"
                                          sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                                    <div style={{width: "112px", height: "24px"}}/>
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box>
                                <Skeleton animation="wave" variant="rectangular"
                                          sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                                    <div style={{width: "112px", height: "24px"}}/>
                                </Skeleton>
                            </Box>
                        </Grid>
                    </Grid>
                    {/*длинная тонкая полоска*/}
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                                <div style={{width: "952px", height: "2px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    {/*короткая полоса над карточками*/}
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                                <div style={{width: "146px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>

                    <CardBox />
                    <CardBox />
                    <CardBox />

                </Grid>

            </Grid>
        </Container>

    );
};

export default FavoritesOffersPlaceHolder;
