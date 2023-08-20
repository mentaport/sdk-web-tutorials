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
            src={"/images/logo_white_small.svg"} 
            alt={"Mentaport"} 
            sx={{ height: "100%",  maxWidth: { xs: 120, md: 450 }, width:150 }} />
          </Link>
        </Grid>

      </Grid>
    </Box>
  );

}

export default Header;