import * as React from 'react';

import FunctionCodeForm from '@components/ui/forms/common/FunctionCodeForm';
import {Paper, Divider, Box,Typography} from '@mui/material';
import { useMentaportSDK } from '@lib/mentaport/provider';

import { 
  getLocationDesc1,
  getLocationTitle,
  getStatusDesc1,
  getStatusDesc2,
  getStatusTitle,
  getStatusCaption
 } from '@components/constants';

export default function StartGeoForm() {
  
  const { mentaportSDK } = useMentaportSDK();
  const [statusGeo, setStatusGeo] = React.useState("");
  const [locationInfo, setLocationInfo] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /**
   * --------------------------------------------------------------
   * Function that executes Mentaports SDK to get current geo status 
   */
  function GetStatus() {
    const result = mentaportSDK.GetStatus();
    setStatusGeo(JSON.stringify(result))
  }
  
  /**
   * --------------------------------------------------------------
   * Function that executes Mentaports SDK to 
   * get curret location info.
   *
   */
  async function GetLocationInfo() {
    setLoading(true);
    try{
      const result = await mentaportSDK.getLocationInfo();
      setLocationInfo(JSON.stringify(result))
    } catch(error){
      setLocationInfo(JSON.stringify(error))
    }
    setLoading(false);
  }

  return (
   
    <Paper elevation={2} sx={{ p:0, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4' sx={{m:2}}>Information</Typography>
      <Divider />
      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
        <FunctionCodeForm title={getStatusTitle} 
          description1={getStatusDesc1} 
          description2={getStatusDesc2} 
          caption={getStatusCaption} varType='button' callBack={GetStatus}/>
        <Box sx={{p:2, bgcolor:'#eeeeee'}} display="grid"  >
          <Typography variant='subtitle2'>Result</Typography>
          <Typography variant='caption'>{statusGeo}</Typography>
        </Box>  
      </Paper>
      <Divider />

      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
        <FunctionCodeForm title={getLocationTitle} 
          description1={getLocationDesc1} 
          varType='button' callBack={GetLocationInfo} loadingButton={true} loading={loading}/>
        <Box sx={{p:2, bgcolor:'#eeeeee'}} display="grid"  >
          <Typography variant='subtitle2'>Result</Typography>
          <Typography variant='caption'>{locationInfo}</Typography>
        </Box>  
      </Paper>

  </Paper>
  );
}