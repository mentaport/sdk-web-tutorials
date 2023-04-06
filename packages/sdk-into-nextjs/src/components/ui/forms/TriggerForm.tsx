import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Paper, Stack, Checkbox, TextField, Button, Typography} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMentaportSDK } from '@lib/mentaport/provider';

interface ITriggerForm  {
  title:string,
  description:string,
}

export default function TriggerForm( props:ITriggerForm ) {
  const { mentaportSDK } = useMentaportSDK();

  const [state, setState] = React.useState({
    check: true,
    contractId: process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ID!,
    ruleId: "",
    loading:false,
    name:"",
    email:"",
    wallet:""
  });
  const [infoResult, setInfoResult] = React.useState("");

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === "check") {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    }
    else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    }
  };

  async function TriggerSDK() {
    setState({
      ...state,
      "loading": true,
    });
    try {
    
      if(props.title === "Mint") {
        if(check) {
          const result = await mentaportSDK.checkMintStatus(state.contractId, state.ruleId);
          setInfoResult(JSON.stringify(result));
        } else {
          const userInfo = {
            wallet:state.wallet,
            email:state.email,
            name:state.name,
          }
          const result = await mentaportSDK.triggerMint(userInfo,state.contractId, state.ruleId)
          setInfoResult(JSON.stringify(result));
        }
      } else if(props.title === "Mint List") {
        if(check) {
          const result = await mentaportSDK.checkMintlistStatus(state.contractId, state.ruleId);
          setInfoResult(JSON.stringify(result));
        } else {
          const userInfo = {
            wallet:state.wallet,
            email:state.email,
            name:state.name,
          }
          const result = await mentaportSDK.triggerMintlist(userInfo,state.contractId, state.ruleId)
          setInfoResult(JSON.stringify(result));
        }
      }
    } catch(error){
      console.log(error)
    }
    setState({
      ...state,
      "loading": false,
    });
  }

  const { check , loading} = state;
  const checkT = `Check if ${props.title} can trigger`

  return (
    <Paper elevation={2} sx={{ p:2, display: 'flex', flexDirection: 'column', my:1}}>
      <Typography variant='h4'> {props.title}</Typography>
      <Typography  sx={{my:2}}>
        {props.description}
      </Typography>
      <FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">

        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Checkbox checked={check} onChange={handleChange} name="check" />
            }
            label={checkT}
          />
          <TextField 
            id="contractId"
            label="Contract Id" 
            variant="outlined"
            name="contractId"
            defaultValue={state.contractId}
            onChange={handleChange}/>

          <TextField 
            id="ruleId"
            label="Rule Id (optional)" 
            variant="outlined"
            name="ruleId"
            defaultValue={state.ruleId}
            onChange={handleChange}/>
        
          {!check ?
          <>
          <Typography variant='h5'> User Info </Typography>
          <TextField 
            id="wallet"
            label="Wallet" 
            variant="outlined"
            name="wallet"
            defaultValue={state.wallet}
            onChange={handleChange}/>

          <TextField 
            id="email"
            label="Email(optional)" 
            variant="outlined"
            name="email"
            defaultValue={state.email}
            onChange={handleChange}/>
            <TextField 
              id="name"
              label="Name(optional)" 
              variant="outlined"
              name="name"
              defaultValue={state.name}
              onChange={handleChange}/>
          </>
          : <></>}
        </Stack>
      </FormControl>
      <LoadingButton
          size="large"
          color="secondary"
          onClick={TriggerSDK}
          loading={loading}
          // loadingPosition="start"
          variant="contained"
        >
          <span> {props.title}</span>
      </LoadingButton>
      <Typography>{infoResult}</Typography>
    </Paper>
  );
}