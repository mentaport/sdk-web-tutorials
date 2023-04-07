import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import FunctionCodeForm from '@components/ui/forms/common/FunctionCodeForm';

import { useMentaportSDK } from '@lib/mentaport/provider';
import * as MentaportTypes from '@mentaport/core-types';

import {Paper,Typography, Divider, Box,Grid, Stack} from '@mui/material';

import { 
  getContractIdTitle,
  getContractIdDesc1,
  getOptionalCaption,
  getTriggerTypeTitle,
  getTriggerTypeDesc1
 } from '@components/constants';


interface IGetTriggerForm  {
  title:string,
  description:string,
  secondEntry:string,
  secondEntryDesc?:string,
  triggerTypeSelect:boolean
}
export default function GetTriggerForm( props:IGetTriggerForm ) {
  const { mentaportSDK } = useMentaportSDK();

  const [state, setState] = React.useState({
    contractId: process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ID!,
    secondInput: '',
    triggerType: MentaportTypes.TriggerTypes.Mintlist,
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

  /**
   * --------------------------------------------------------------
   * Function that executes Mentaports SDK to get 
   * the trigger query.
   * 
   * - Get all triggers (by contract id + rule id)
   * - Get closes trigger (by location + radius)
   */
  async function GetTriggers() {
    setState({
      ...state,
      "loading": true,
    });
    try {
    
      if(props.title === "Get Triggers") {
        // secondInput in this call is the optional ruleId
        const ruleId = state.secondInput
        const result = await mentaportSDK.getTriggers(state.triggerType, state.contractId, ruleId );
      
        setInfoResult(JSON.stringify(result));
      } else if(props.title === "Closest Triggers") {
         // secondInput in this call is the radius
        const radius = Number(state.secondInput) || 50;
        const result = await mentaportSDK.getClosestTriggers(state.contractId, radius, state.triggerType);
       
        setInfoResult(JSON.stringify(result));
      }
    } catch(error){
      console.log(error)
      setInfoResult(JSON.stringify(error));
    }
    setState({
      ...state,
      "loading": false,
    });
  }

  return (
 
    <Paper elevation={2} sx={{ p:0,mt:1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4' sx={{m:2}}> {props.title}</Typography>
      <Typography  sx={{m:2}}>
          {props.description}
        </Typography>
      <Divider />
      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={0} sx={{p:2}}>
          <Grid item xs={8}>
            <Stack >
              <Typography variant="subtitle1">{getTriggerTypeTitle}</Typography> 
              <Typography variant="body2"> {getTriggerTypeDesc1}</Typography>
            </Stack>

          </Grid>
        
          <Grid item xs={4} align='right'>
            { props.triggerTypeSelect ?
              <Select 
                labelId="triggerType"
                name="triggerType"
                value={state.triggerType}
                onChange={handleChange}
                sx={{width:'50%'}}
              >
                <MenuItem value={MentaportTypes.TriggerTypes.Mintlist}>Mintlist</MenuItem>
                <MenuItem value={MentaportTypes.TriggerTypes.Mint}>Mint</MenuItem>
                <MenuItem value={MentaportTypes.TriggerTypes.Dynamic}>Dynamic</MenuItem>
                <MenuItem value={MentaportTypes.TriggerTypes.Discover}>Discover</MenuItem>
              </Select>
            :<></>}
          </Grid>
        </Grid>
        <Divider />
        <FunctionCodeForm title={getContractIdTitle} 
          description1={getContractIdDesc1}
          varType='string' callBack={handleChange} value={state.contractId}/>
        <Divider />
        <FunctionCodeForm title={props.secondEntry} 
          description1={props.secondEntryDesc!}
          caption={getOptionalCaption}
          varType='string' callBack={handleChange} value={state.secondInput}/>
          <Divider /> 
         
        <FunctionCodeForm title={''} 
          description1={''} 
          varType='button' callBack={GetTriggers} loadingButton={true} loading={state.loading}/>
        <Box sx={{p:2, bgcolor:'#eeeeee'}} display="grid"  >
          <Typography variant='subtitle2'>Result</Typography>
          <Typography variant='caption'>{infoResult}</Typography>
        </Box>  
      </Paper>
    </Paper>

  );
}