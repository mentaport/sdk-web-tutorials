import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import FunctionCodeForm from '@components/ui/forms/common/FunctionCodeForm';
import Results from '@components/ui/forms/common/Results';
import { useMentaportSDK } from '@lib/mentaport/provider';
import * as MentaportTypes from '@mentaport/types-core';

import { 
  getDistanceTitle,
  getDistanceDec1,
  getDisUnitTitle,
  getDisUnitDes1
 } from '@components/constants';

export default function StartGeoForm() {

  const { mentaportSDK } = useMentaportSDK();
  const [state, setState] = React.useState({
    latitude: -120,
    longitude: 45,
    unitType: MentaportTypes.DistanceUnits.meter,
    infoResult:"",
  });

  // Handle state changes from input UI
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

   /**
   * --------------------------------------------------------------
   * Function that executes Mentaports SDK to calculate distance  
   * between user and point
   * 
   */
  async function CalculateDis() {
    const distance:number = mentaportSDK.GetDistanceToPoint(state.latitude, state.longitude, state.unitType );
  
    setState({
      ...state,
      ['infoResult']: distance.toString(),
    });
  }
  const handleSelectChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
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
          varType='number' callBack={handleChange} value={state.latitude}/>
        <Divider />
        <FunctionCodeForm title="Longitude" 
          description1={""}
          varType='number' callBack={handleChange} value={state.longitude}/>
        <Divider /> 
        <Grid container spacing={0} sx={{p:2, display: "flex"}}>
          <Grid item xs={8}>
            <Stack >
              <Typography variant="subtitle1">{getDisUnitTitle}</Typography> 
              <Typography variant="body2"> {getDisUnitDes1}</Typography>
            </Stack>

          </Grid>
        
          <Grid item xs={4} container direction="column" alignItems="flex-end">
           
            <Select 
              labelId="unitType"
              name="unitType"
              value={state.unitType}
              onChange={handleSelectChange}
              sx={{width:'50%', justifyContent:'end'}}
            >
              <MenuItem value={MentaportTypes.DistanceUnits.ft}>Feet</MenuItem>
              <MenuItem value={MentaportTypes.DistanceUnits.meter}>Meter</MenuItem>
              <MenuItem value={MentaportTypes.DistanceUnits.miles}>Miles</MenuItem>
              <MenuItem value={MentaportTypes.DistanceUnits.kilometers}>Kilometers</MenuItem>
              
            </Select>
      
          </Grid> 
        </Grid>
        <FunctionCodeForm title={''} 
          description1={""} 
          varType='button' callBack={CalculateDis}  />

        <Box sx={{ bgcolor:'#eeeeee', margin:'auto', paddingX:5, marginBottom:5}}>
          <code>{"const distance = mentaportSDK.GetDistanceToPoint(latitude, longitude, unitType);"}</code>
        </Box>
        <Results result={state.infoResult} />
       
      </Paper>
    </Paper>

  );
}