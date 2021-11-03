import React from 'react';
import {Container, Grid, Skeleton} from "@mui/material";
import {Box} from "@material-ui/core";



export const MenuItem = () => {
  return (
      <Grid item xs={10}>
          <Box style={{paddingLeft: "10px" }} >
              <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
              </Skeleton>
          </Box>
      </Grid>
  )
}

const AccountCardPlaceHolder = () => {
    return (
        <Container>
            {/*Колонка пользователя*/}
            <Grid item container xs={2}  spacing={1}>
                <Grid item xs={10} >
                    <Box style={{display: "flex", justifyContent: "center"}}>
                        <Skeleton  animation="wave" variant="circular"    sx={{ bgcolor: '#F2F3F4', width: "80px", height: "80px"}}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box style={{display: "flex", justifyContent: "center"}}>
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "134px", height: "16px"}} />
                        </Skeleton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                        </Skeleton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box style={{display: "flex", justifyContent: "center"}}>
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "144px", height: "16px"}} />
                        </Skeleton>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box >
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "200px", height: "18px"}} />
                        </Skeleton>
                    </Box>
                </Grid>

                {/*многопалочек*/}
                <Grid item container xs={10} spacing={1}>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AccountCardPlaceHolder;
