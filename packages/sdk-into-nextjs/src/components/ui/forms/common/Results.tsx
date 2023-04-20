import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IResultCode {
  result:string,
}

export default function Results(props:IResultCode) {

  return (
    <Box sx={{p:2, bgcolor:'#eeeeee'}} display="grid" >
      <Typography variant='subtitle2'>Result</Typography>
      <Typography variant='caption'>
        {props.result.split("\n").map((i,key) => {
           return <div style={{marginTop:10}} key={key}>{i} </div> ;
          })}
      </Typography>
  </Box>  
  );
}