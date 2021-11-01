import React from 'react';
import {Container, Grid, Skeleton} from "@mui/material";
import {Box} from "@material-ui/core";



const TwoLine = () => {
  return (
      <Grid item container xs={12} style={{paddingTop: "5px"}}>
          {/*левая длинная*/}
          <Grid item xs={10}>
              <Box>
                  <Skeleton animation="wave" variant="rectangular"
                            sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                      <div style={{width: "660px", height: "40px"}}/>
                  </Skeleton>
              </Box>
          </Grid>
          {/*правая маленькая*/}
          <Grid item xs={2}>
              <Box style={{display: "flex", justifyContent: "flex-end"}}>
                  <Skeleton animation="wave" variant="rectangular"
                            sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                      <div style={{width: "141px", height: "40px"}}/>
                  </Skeleton>
              </Box>
          </Grid>
      </Grid>
  )
}


const HistoryOfOperationsPlaceHolder = () => {
    return (
        <Container>
            <Grid item container xs={10} spacing={3} style={{paddingTop: "15px"}}>
                <Grid item container xs={12} spacing={1}>
                    <Grid item xs={2}>
                        <Box >
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box >
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box >
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>
                {/*длинная тонкая полоска*/}
                <Grid item xs={12}>
                    <Box >
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "952px", height: "2px"}} />
                        </Skeleton>
                    </Box>
                </Grid>



                {/*история операций*/}
                <Grid item container xs={12} spacing={3}>
                    {/*Первая линия верхние четыре палочки*/}
                    <Grid item container spacing={1} xs={12}>
                        {/*первые три палочки*/}
                        <Grid item container spacing={1} xs={10}>
                            <Grid item xs={2}>
                                <Box>
                                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                        <div style={{width: "86px", height: "16px"}}/>
                                    </Skeleton>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Box>
                                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                        <div style={{width: "86px", height: "16px"}}/>
                                    </Skeleton>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Box>
                                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                        <div style={{width: "86px", height: "16px"}}/>
                                    </Skeleton>
                                </Box>
                            </Grid>
                        </Grid>
                        {/*одна палочка справа*/}
                        <Grid item container spacing={1} xs={2}>
                            <Grid item xs={12}>
                                <Box style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                        <div style={{width: "86px", height: "16px"}}/>
                                    </Skeleton>
                                </Box>
                            </Grid>
                        </Grid>

                    </Grid>
                    {/*вотрая линия одна длинная одна короткая*/}
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />
                    <TwoLine />


                </Grid>
            </Grid>
        </Container>
    );
};

export default HistoryOfOperationsPlaceHolder;
