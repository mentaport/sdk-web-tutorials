import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import FunctionCodeForm from '@components/forms/common/FunctionCodeForm';
import Results from '@components/forms/common/Results';

import { useMentaportSDK } from '@lib/mentaport/provider';
import {TriggerTypes,IRule} from '@mentaport/types-core';

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
}
export default function GetTriggerForm( props:IGetTriggerForm ) {
  const { mentaportSDK } = useMentaportSDK();

  const [state, setState] = React.useState({
    contractId: process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ID!,
    triggerType: TriggerTypes.Mezzanine,
    ruleId:"",
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
      if(props.title === "Get Triggers") {
        const result = await mentaportSDK.getTriggers(state.triggerType, state.contractId, state.ruleId );
        let res = result.message + " ";
        if(result.status && result.data) {
          const rules:IRule[]= result.data;
          res += rules.length.toString() + `\n`
          rules.forEach((rule) => {
           // res += 'ruleId: '+ rule.ruleId + `\n`;
            res += 'status: '+ JSON.stringify(rule.status) + `\n`;
            res += 'amount: '+ rule.amount.toString() + `\n`;
            res += 'access: '+ JSON.stringify(rule.access) +  `\n`;
            res += 'time: '+ JSON.stringify(rule.time) + `\n`;
            res += 'location: '+ JSON.stringify(rule.location) + `\n`;
          
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
          caption={getOptionalCaption}
          varType='string' callBack={handleChange} value={state.ruleId}
        />
          <Divider /> 
         
        <FunctionCodeForm title={''} 
          description1={''} 
          varType='button' callBack={GetTriggers} loadingButton={true} loading={state.loading}
        />

        <Box sx={{ bgcolor:'#eeeeee', margin:'auto', paddingX:5, marginBottom:5}}>
          <code>{"const result = await mentaportSDK.getTriggers(triggerType, contractId, ruleId);"}</code>
        </Box>

        <Results result={infoResult} />
        
      </Paper>
    </Paper>

  );
}