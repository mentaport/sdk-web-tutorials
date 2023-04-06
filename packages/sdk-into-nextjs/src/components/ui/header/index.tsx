import React from "react"
import {Grid, Box, Button, Link } from '@mui/material';
import Image from 'next/image'

import { useTheme } from "@mui/material/styles";

const Header = () => {

  return (
    <Box sx={{px:2, py:1, background:'#121213', height:60,  display: 'flex' }}>
      <Grid container spacing={2} >
        <Grid item xs={4} sx={{height:65}}>
          <Link href="https://www.mentaport.xyz"  target="_blank">
          <Box component="img"
            src={"/images/logo_pink.svg"} 
            alt={"Mentaport"} 
            sx={{ height: "100%",  maxWidth: { xs: 120, md: 450 }, width:300 }} />
          </Link>
        </Grid>
        <Grid item xs={8} align='right'>
          {/* <Link href="https://www.mentaport.com/#footer" target="_blank" sx={{pr:2}}>Newsletter</Link> */}
          <Button variant="contained" color="secondary" size="small"  target="_blank" href={"https://www.mentaport.com/sign-up"}>
           Private Beta Sign Up 
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

}

export default Header;