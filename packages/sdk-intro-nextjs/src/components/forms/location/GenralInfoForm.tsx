import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FunctionCodeForm from '@components/forms/common/FunctionCodeForm';
import Results from '@components/forms/common/Results';

import { useMentaportSDK } from '@mentaport/sdk-nextjs';

import { 
  getLocationDesc1,
  getLocationTitle,
  getStatusDesc1,
  getStatusDesc2,
  getStatusTitle,
  getStatusCaption
 } from '@components/constants';

export default function GenralInfoForm() {
  
  const { mentaportSDK } = useMentaportSDK();
  const [statusGeo, setStatusGeo] = React.useState("");
  const [locationInfo, setLocationInfo] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /**
   * --------------------------------------------------------------
   * Function that executes Mentaports SDK to get current geo status 
   */
  function GetStatus() {
    const result = mentaportSDK.getStatus();
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
      <Typography variant='h4' sx={{m:2}}>General Information</Typography>
      <Divider />
      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
        <FunctionCodeForm title={getStatusTitle} 
          description1={getStatusDesc1} 
          description2={getStatusDesc2} 
          caption={getStatusCaption} varType='button' callBack={GetStatus}/>

        <Box sx={{ bgcolor:'#eeeeee', margin:'auto', paddingX:5, marginBottom:5}}>
          <code>{"const result = mentaportSDK.getStatus();"}</code>
        </Box>
        
        <Results result={statusGeo} />
      </Paper>
      <Divider />

      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
        <FunctionCodeForm title={getLocationTitle} 
          description1={getLocationDesc1} 
          varType='button' callBack={GetLocationInfo} loadingButton={true} loading={loading}/>
         <Box sx={{ bgcolor:'#eeeeee', margin:'auto', paddingX:5, marginBottom:5}}>
          <code>{"const result = await mentaportSDK.getLocationInfo();"}</code>
        </Box>

        <Results result={locationInfo} />
        
      </Paper>

  </Paper>
  );
}