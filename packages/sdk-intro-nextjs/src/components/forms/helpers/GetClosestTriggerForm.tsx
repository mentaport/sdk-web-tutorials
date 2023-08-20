import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import FunctionCodeForm from '@components/forms/common/FunctionCodeForm';
import Results from '@components/forms/common/Results';

import { useMentaportSDK } from '@lib/mentaport/provider';

import {
  TriggerTypes,
  DistanceUnits,
  ITriggerDistance
  } from '@mentaport/types-core';
import { 
  getContractIdTitle,
  getContractIdDesc1,
  getTriggerTypeTitle,
  getTriggerTypeDesc1,
  getDisUnitTitle,
  getDisUnitDes1
} from '@components/constants';


interface IGetTriggerForm  {
  title:string,
  description:string,
  secondEntry:string,
  secondEntryDesc?:string,
}
export default function GetClosestTriggerForm( props:IGetTriggerForm ) {
  const { mentaportSDK } = useMentaportSDK();

  const [state, setState] = React.useState({
    contractId: process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ID!,
    triggerType: TriggerTypes.Mezzanine,
    radius:50,
    unitType: DistanceUnits.meter,
    loading:false
  });

  const [infoResult, setInfoResult] = React.useState("");

  // Handle state changes from input UI
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  /**
   * --------------------------------------------------------------
   * Function that executes Mentaports SDK to get 
   * the trigger query.
   * 
   * - Get all triggers (by contract id + rule id)
   * - Get closest trigger (by location + radius)
   */
  async function GetTriggers() {
    setState({ ...state, "loading": true });
    try {
     if(props.title === "Closest Triggers") {

        const result = await mentaportSDK.getClosestTriggers(state.contractId, state.radius, state.unitType, state.triggerType);
        
        let res = result.message + " ";
        if(result.status && result.data) {
          const rules:ITriggerDistance[]= result.data;
          res += rules.length.toString() + `\n`
          rules.forEach((rule) => {
            res += 'ruleId: '+ rule.ruleId + `\n`;
            res += 'type: '+ rule.type + `\n`;
            res += 'distance: '+ rule.distance.toString() + `\n`;
            res += 'units: '+ rule.units + `\n`;
            res += 'coordinates: '+ JSON.stringify(rule.coordinates) +  `\n`;
            res +=  `-----------`
            res +=  `\n`
          });
        }
        setInfoResult(res);
      }
    } catch(error){
      console.log(error)
      setInfoResult(JSON.stringify(error));
    }
    setState({ ...state, "loading": false });
  }

  return (
 
    <Paper elevation={2} sx={{ p:0,mt:1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4' sx={{m:2}}> {props.title}</Typography>
      <Typography  sx={{m:2}}>
          {props.description}
        </Typography>
      <Divider />
      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={0} sx={{p:2, display: "flex"}}>
          <Grid item xs={8}>
            <Stack >
              <Typography variant="subtitle1">{getTriggerTypeTitle}</Typography> 
              <Typography variant="body2"> {getTriggerTypeDesc1}</Typography>
            </Stack>
          </Grid>
        
          <Grid item xs={4} container direction="column" alignItems="flex-end">
         
            <Select 
              labelId="triggerType"
              name="triggerType"
              value={state.triggerType}
              onChange={handleSelectChange}
              sx={{width:'50%', justifyContent:'end'}}
            >
              <MenuItem value={TriggerTypes.Mezzanine}>Mezzanine</MenuItem>
              <MenuItem value={TriggerTypes.Mint}>Mint</MenuItem>
            </Select>
          
          </Grid>
        </Grid>
        <Divider />
        <FunctionCodeForm title={getContractIdTitle} 
          description1={getContractIdDesc1}
          varType='string' callBack={handleChange} value={state.contractId}
        />
        <Divider />
        <FunctionCodeForm title={props.secondEntry} 
          description1={props.secondEntryDesc!}
          varType='number' callBack={handleChange} value={state.radius}
        />
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
              <MenuItem value={DistanceUnits.ft}>Feet</MenuItem>
              <MenuItem value={DistanceUnits.meter}>Meter</MenuItem>
              <MenuItem value={DistanceUnits.miles}>Miles</MenuItem>
              <MenuItem value={DistanceUnits.kilometers}>Kilometers</MenuItem>
              
            </Select>
      
          </Grid> 
        </Grid>

        <FunctionCodeForm title={''} 
          description1={''} 
          varType='button' callBack={GetTriggers} loadingButton={true} loading={state.loading}
        />

        <Box sx={{ bgcolor:'#eeeeee', margin:'auto', paddingX:5, marginBottom:5}}>
          <code>{"const result = await mentaportSDK.getClosestTriggers(contractId, radius, unitType, triggerType);"}</code>
        </Box>

        <Results result={infoResult} />
        
      </Paper>
    </Paper>

  );
}