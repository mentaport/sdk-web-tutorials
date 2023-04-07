import * as React from 'react';

import FunctionCodeForm from '@components/ui/forms/common/FunctionCodeForm';
import {Paper, Divider, Box,Typography} from '@mui/material';
import { useMentaportSDK } from '@lib/mentaport/provider';

import { 
  getMobileTitle,
  getMobileDesc1,
  getWalkTitle,
  getWalkDesc1,
  getWalkCaption
 } from '@components/constants';

export default function StartGeoForm() {
  
  const {mentaportSDK } = useMentaportSDK();
  const [state, setState] = React.useState({
    mobile: true,
    walkTime: 45,
    startGeo:false,
    result: "Started geo-location: false"
  });
  // Handle state changes from input UI
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, event.target.name)
    if(event.target.name === getMobileTitle) {
      setState({
        ...state,
        mobile: Boolean(event.target.value),
      });
    }
    else {
      setState({
        ...state,
        walkTime: Number(event.target.value),
      });
    }
  };

  /**
   * --------------------------------------------------------------
   * Function that executes Mentaports SDK to start 
   * geo-vefier with set parameters.
   * 
   */
  function StartGeoLocationSDK() {
    mentaportSDK.StartGeoLocation(state.mobile, state.walkTime);
    
    setState({
      ...state,
      "startGeo":true,
      "result":"Started geo-location: true"
    })
  }

  return (
   
  <Paper elevation={2} sx={{ p:0, display: 'flex', flexDirection: 'column' }}>
    <Typography variant='h4' sx={{m:2}}>StartGeoLocation</Typography>
    <Divider />
    <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
      <FunctionCodeForm title={getMobileTitle} 
        description1={getMobileDesc1} 
        varType='boolean' callBack={handleChange} value={state.mobile}/>
        <Divider />
        {state.mobile ?
          <FunctionCodeForm title={getWalkTitle} 
            description1={getWalkDesc1} caption={getWalkCaption}
            varType='number' callBack={handleChange} value={state.walkTime}/>
         :<></>}
      <FunctionCodeForm title={''} 
        description1={''} 
        varType='button' callBack={StartGeoLocationSDK} />
      <Box sx={{p:2, bgcolor:'#eeeeee'}} display="grid"  >
        <Typography variant='subtitle2'>Result</Typography>
        <Typography variant='caption'>{state.result}</Typography>
      </Box>  
    </Paper>

  </Paper>
  );
}