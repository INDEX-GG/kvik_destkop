import React from 'react';
import {Container, Grid, Skeleton} from "@mui/material";
import {Box} from "@material-ui/core";

const OfferItem = () => {
  return (
      <Grid item container xs={12} spacing={1}>
          {/*левый большой*/}
          <Grid item xs={4}>
              <Box>
                  <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                      <div style={{width: "280px", height: "184px"}}/>
                  </Skeleton>
              </Box>
          </Grid>
          {/*правый большой*/}
          <Grid item container xs={8} spacing={1}>
              {/*левый маленкьий 5 палочек*/}
              <Grid item container xs={8} spacing={1}>
                  <Grid item xs={10}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                              <div style={{width: "180px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={10}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                              <div style={{width: "180px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={10}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                              <div style={{width: "180px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={10}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                              <div style={{width: "116px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={10}>
                      <Box style={{display: "flex", justifyContent: "flex-end"}}>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                              <div style={{width: "224px", height: "24px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
              </Grid>
              {/*правый маленький 2 палочки*/}
              <Grid item container xs={4}>
                  <Grid item xs={8}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                              <div style={{width: "180px", height: "16px"}}/>
                          </Skeleton>
                      </Box>
                  </Grid>
                  <Grid item xs={8}>
                      <Box>
                          <Skeleton animation="wave" variant="rectangular"
                                    sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                              <div style={{width: "180px", height: "16px"}}/>
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

const OfferActivePlaceHolder = () => {
    return (
        <Container>
            <Grid container spacing={1} xs={12}>
                <Grid item xs={12}>
                    <OfferItem/>
                </Grid>
                <Grid item xs={12}>
                    <OfferItem/>
                </Grid>
                <Grid item xs={12}>
                    <OfferItem/>
                </Grid>
            </Grid>
        </Container>

    )
};

export default OfferActivePlaceHolder;
