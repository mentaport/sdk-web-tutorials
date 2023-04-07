import * as React from 'react';

import { Typography, Paper, Divider, Box} from '@mui/material';
import FunctionCodeForm from '@components/ui/forms/common/FunctionCodeForm';

import { 
  getDistanceTitle,
  getDistanceDec1,
 } from '@components/constants';

export default function StartGeoForm() {
  const [state, setState] = React.useState({
    lat: -120,
    long: 45,
  });

  // Handle state changes from input UI
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
   
    <Paper elevation={2} sx={{ p:0,mt:1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4' sx={{m:2}}> {getDistanceTitle}</Typography>
      <Typography  sx={{m:2}}>
        {getDistanceDec1}
      </Typography>
      <Divider />
      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
       
        <FunctionCodeForm title="Latitude"
          description1="Latitude of point"
          varType='number' callBack={handleChange} value={state.lat}/>
        <Divider />
        <FunctionCodeForm title="Longitude" 
          description1={""}
          varType='number' callBack={handleChange} value={state.long}/>
          <Divider /> 
         
        <FunctionCodeForm title={''} 
          description1={'Longitude of point '} 
          varType='button' callBack={'GetTriggers'}  />
        <Box sx={{p:2, bgcolor:'#eeeeee'}} display="grid"  >
          <Typography variant='subtitle2'>Result</Typography>
          <Typography variant='caption'>{'infoResult'}</Typography>
        </Box>  
      </Paper>
    </Paper>

  );
}