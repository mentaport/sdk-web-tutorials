import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import FunctionCodeForm from '@components/forms/common/FunctionCodeForm';
import Results from '@components/forms/common/Results';

import { useMentaportSDK } from '@mentaport/sdk-nextjs';

import { 
  getCheckTitleMez,
  getCheckDesc,
  getMintDesc,
  getMintDesc1,
  getContractIdTitle,
  getContractIdDesc1,
  getRuleIdTitle,
  getRuleIdDesc1,
  getOptionalCaption,
  getWalletTitle,
  getWallerDesc1,
  getNameTitle,
  getEmailTitle,
  mezzanineDescription
 } from '@components/constants';


export default function MezzanineTriggerForm() {
  const { mentaportSDK } = useMentaportSDK();
  
  const [infoResult, setInfoResult] = React.useState("");
  const [state, setState] = React.useState({
    mint: false,
    contractId: process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ID!,
    ruleId: "",
    loading:false,
    name:"",
    email:"",
    wallet:"0x000"
  });
 
  // Handle state changes from input UI
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.name === getCheckTitleMez) {
      setState({
        ...state,
        mint: Boolean(event.target.value),
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
        email:state.email,
        name:state.name,
      }
      if(state.mint) {
        const result = await mentaportSDK.triggerMezzanine(state.contractId, state.wallet, state.ruleId, userInfo)
        setInfoResult(JSON.stringify(result));
       
      } else {
        const result = await mentaportSDK.checkMezzanineStatus(state.contractId, state.wallet, state.ruleId);
        setInfoResult(JSON.stringify(result));
      }
    } catch(error) {
      setInfoResult(JSON.stringify(error));
    }
    setState({ ...state, "loading": false });
  }

  function CodeSnippet () {
    let code = ''
    if(state.mint) {
      code = 'const result = await mentaportSDK.triggerMezzanine(contractId, wallet, ruleId, userInfo);'
    } else {
      code = 'const result = await mentaportSDK.checkMezzanineStatus(contractId, wallet, ruleId);'
    }
    return (
      <code>{code}</code>
    );
  }
  return (
 
    <Paper elevation={2} sx={{ p:0,mt:1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4' sx={{m:2}}>Mezzanine</Typography>
      <Typography sx={{m:2}}>
       {mezzanineDescription}
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
          <FunctionCodeForm title={getWalletTitle} 
              description1={getWallerDesc1}
              varType='address' callBack={handleChange} value={state.wallet}/>
         
          { state.mint ? 
          <FunctionCodeForm title={getCheckTitleMez} 
            description1={getMintDesc}  description2={getMintDesc1}
            varType='boolean' callBack={handleChange} value={state.mint} 
          />
          :
          (
            <FunctionCodeForm title={getCheckTitleMez} 
              description1={getCheckDesc} 
              varType='boolean' callBack={handleChange} value={state.mint}
            />
          )
          }
          
          <Divider />
          {state.mint ?
          <>

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