import * as React from 'react';

import {Divider, Typography} from '@mui/material';


export default function Header() {
  
  return (
   <>
    <Typography variant="h2"  sx={{my:5}}>
      SDK Quick Start
    </Typography>
    <Typography variant="h6" sx={{my:5}}>
      A simple app that will guide you through all the functions in our Core SDK live in our Private Beta and how to interact with them.    
    </Typography>
    
   </>
  );
}