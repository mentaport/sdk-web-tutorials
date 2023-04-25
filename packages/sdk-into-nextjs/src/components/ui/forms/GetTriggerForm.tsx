import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import FunctionCodeForm from '@components/ui/forms/common/FunctionCodeForm';
import Results from '@components/ui/forms/common/Results';

import { useMentaportSDK } from '@lib/mentaport/provider';
import * as MentaportTypes from '@mentaport/types-core';

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
    triggerType: MentaportTypes.TriggerTypes.Mintlist,
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
        let res = ""
        for(var x in result.data) {
          res += JSON.stringify(result.data[x]);
          res +=  `\n`
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
              <MenuItem value={MentaportTypes.TriggerTypes.Mintlist}>Mintlist</MenuItem>
              <MenuItem value={MentaportTypes.TriggerTypes.Mint}>Mint</MenuItem>
              <MenuItem value={MentaportTypes.TriggerTypes.Dynamic}>Dynamic</MenuItem>
              <MenuItem value={MentaportTypes.TriggerTypes.Discover}>Discover</MenuItem>
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
        <Results result={infoResult} />
        
      </Paper>
    </Paper>

  );
}