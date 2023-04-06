import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMentaportSDK } from '@lib/mentaport/provider';

import * as MentaportTypes from '@mentaport/core-types';

import {Paper, Stack, TextField, Typography} from '@mui/material';

interface IGetTriggerForm  {
  title:string,
  description:string,
  secondEntry:string,
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
  const secondLabel = `${props.secondEntry} (optional)`

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  async function GetTriggers() {
    setState({
      ...state,
      "loading": true,
    });
    try {
    
      if(props.title === "Get Triggers") {
        const result = await mentaportSDK.getTriggers(state.triggerType, state.contractId, state.secondInput)
        console.log(result)
        setInfoResult(JSON.stringify(result));
      } else if(props.title === "Closest Triggers") {
        const radius = Number(state.secondInput) || 50;
        const result = await mentaportSDK.getClosestTriggers(state.contractId, radius, state.triggerType);
        console.log(result)
        setInfoResult(JSON.stringify(result));
      }
    } catch(error){
      console.log(error)
    }
    setState({
      ...state,
      "loading": false,
    });
  }
  const { loading } = state;

  return (
    <Paper elevation={2} sx={{ p:2, display: 'flex', flexDirection: 'column' }}>  
      <Stack spacing={2}>
        <Typography variant='h4'> {props.title}</Typography>
        <Typography  sx={{my:2}}>
          {props.description}
        </Typography>
        <TextField 
          id="contractId"
          label="Contract Id" 
          variant="outlined"
          name="contractId"
          defaultValue={state.contractId}
          onChange={handleChange}/>

         <TextField 
          id="secondInput"
          label={secondLabel}
          variant="outlined"
          name="secondInput"
          defaultValue={state.secondInput}
          onChange={handleChange}/>

        { props.triggerTypeSelect ?
          <FormControl fullWidth>
            <InputLabel id="triggerType">Trigger Type</InputLabel>
            <Select
              labelId="triggerType"
              name="triggerType"
              value={state.triggerType}
              label="triggerType"
              onChange={handleChange}
            >
              <MenuItem value={MentaportTypes.TriggerTypes.Mintlist}>Mintlist</MenuItem>
              <MenuItem value={MentaportTypes.TriggerTypes.Mint}>Mint</MenuItem>
              <MenuItem value={MentaportTypes.TriggerTypes.Dynamic}>Dynamic</MenuItem>
              <MenuItem value={MentaportTypes.TriggerTypes.Discover}>Discover</MenuItem>
            </Select>
          </FormControl>
          : <></>
        }
        <LoadingButton
          size="large"
          color="secondary"
          onClick={GetTriggers}
          loading={loading}
          // loadingPosition="start"
          variant="contained"
        >
          <span> {props.title}</span>
        </LoadingButton>
        <Typography>{infoResult}</Typography>
      </Stack>
    </Paper>
  );
}