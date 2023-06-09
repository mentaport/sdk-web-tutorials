import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import FunctionCodeForm from '@components/ui/forms/common/FunctionCodeForm';
import Results from '@components/ui/forms/common/Results';

import { useMentaportSDK } from '@lib/mentaport/provider';

import { 
  getCheckTitle,
  getCheckDesc1,
  getCheckDesc2,
  getContractIdTitle,
  getContractIdDesc1,
  getRuleIdTitle,
  getRuleIdDesc1,
  getOptionalCaption,
  getWalletTitle,
  getWallerDesc1,
  getNameTitle,
  getEmailTitle,
 } from '@components/constants';

 interface ITriggerForm  {
  title:string,
  description:string,
}

export default function TriggerForm( props:ITriggerForm ) {
  const { mentaportSDK } = useMentaportSDK();
  
  const [infoResult, setInfoResult] = React.useState("");
  const [state, setState] = React.useState({
    check: true,
    contractId: process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ID!,
    ruleId: "",
    loading:false,
    name:"",
    email:"",
    wallet:""
  });
 
  // Handle state changes from input UI
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.name === getCheckTitle) {
      setState({
        ...state,
        check: Boolean(event.target.value),
      });
    }
    else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    }
  };

  /**
   * --------------------------------------------------------------
   * Function that executes Mentaports SDK trigger functions.
   * 
   */
  async function TriggerSDK() {
    setState({ ...state, "loading": true });
    try {
      const userInfo = {
        wallet:state.wallet,
        email:state.email,
        name:state.name,
      }
      if(props.title === "Mint") {
        if(state.check) {
          const result = await mentaportSDK.checkMintStatus(state.contractId, state.ruleId);
          setInfoResult(JSON.stringify(result));
        } else {
          const result = await mentaportSDK.triggerMint(userInfo,state.contractId, state.ruleId)
          setInfoResult(JSON.stringify(result));
        }
      } else if(props.title === "Mint List") {
        if(state.check) {
          const result = await mentaportSDK.checkMintlistStatus(state.contractId, state.ruleId);
          setInfoResult(JSON.stringify(result));
        } else {
          const result = await mentaportSDK.triggerMintlist(userInfo, state.contractId, state.ruleId)
          setInfoResult(JSON.stringify(result));
        }
      }
    } catch(error) {
      setInfoResult(JSON.stringify(error));
    }
    setState({ ...state, "loading": false });
  }

  function CodeSnippet () {
    let code = ''
    if(props.title === "Mint") {
      if(state.check) {
        code = 'const result = await mentaportSDK.checkMintStatus(contractId, ruleId);'
      } else {
        code = 'const result = await mentaportSDK.triggerMint(userInfo, contractId, ruleId);'
      }
    } else if(props.title === "Mint List") {
      if(state.check) {
        code = 'const result = await mentaportSDK.checkMintlistStatus(contractId, ruleId);'
      } else {
        code = 'const result = await mentaportSDK.triggerMintlist(userInfo, contractId, ruleId);'
      }
    }
    return (
      <code>{code}</code>
    );
  }
  return (
 
    <Paper elevation={2} sx={{ p:0,mt:1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4' sx={{m:2}}> {props.title}</Typography>
      <Typography  sx={{m:2}}>
          {props.description}
        </Typography>
      <Divider />
      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
    
        <FunctionCodeForm title={getContractIdTitle} 
          description1={getContractIdDesc1}
          varType='string' callBack={handleChange} value={state.contractId}/>
        <Divider />
        <FunctionCodeForm title={getRuleIdTitle} 
          description1={getRuleIdDesc1}
          caption={getOptionalCaption}
          varType='string' callBack={handleChange} value={state.ruleId}/>
          <Divider /> 
          <FunctionCodeForm title={getCheckTitle} 
            description1={getCheckDesc1}  description2={getCheckDesc2}
            varType='boolean' callBack={handleChange} value={state.check}/>
          <Divider />
          {!state.check ?
          <>
            <FunctionCodeForm title={getWalletTitle} 
              description1={getWallerDesc1}
              varType='address' callBack={handleChange} value={state.wallet}/>
            
            <FunctionCodeForm title={getNameTitle} 
              description1={""} caption={getOptionalCaption}
              varType='string' callBack={handleChange} value={state.name}/>
            <FunctionCodeForm title={getEmailTitle} 
              description1={""} caption={getOptionalCaption}
              varType='email' callBack={handleChange} value={state.email}/>
          </>
          :<></>}
        <FunctionCodeForm title={''} 
          description1={''} 
          varType='button' callBack={TriggerSDK} loadingButton={true} loading={state.loading}/>

        <Box sx={{ bgcolor:'#eeeeee', margin:'auto', paddingX:5, marginBottom:5}}>
         <CodeSnippet />
        </Box>
        <Results result={infoResult} />
        
      </Paper>
    </Paper>

  );
}