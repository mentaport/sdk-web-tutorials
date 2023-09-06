import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import FunctionCodeForm from '@components/forms/common/FunctionCodeForm';
import Results from '@components/forms/common/Results';

import { useMentaportSDK } from '@lib/mentaport/provider';
import { IUserInfo } from '@mentaport/types-core';

import {
  mintDescription,
  getCheckTitle,
  getCheckDesc,
  getMintDesc,
  getMintDesc1,
  getOptionalCaption,
  getNameTitle,
  getEmailTitle,
  getBlochainTitle,
  getBlochainDesc1
} from '@components/constants';

import PolygonMint from './PolygonMint';
import SuiMint from './SuiMint';


export default function MintPreDeployedForm() {
  const { mentaportSDK } = useMentaportSDK();
  
  const [infoResult, setInfoResult] = React.useState("");
  const [state, setState] = React.useState({
    mint: false,
    blockchain:'Polygon',
    contractId: "5a29c6b3-57b1-4eff-93bb-05b70048d1cf",
    loading:false,
    name:"",
    email:"",
  });
 
  // Handle state changes from input UI
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
  
    if(event.target.name === getCheckTitle) {
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

      if(!state.mint) {
        const result = await mentaportSDK.checkMintStatus(state.contractId, "0x0000");
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
      code = 'const result = await mentaportSDK.triggerMint(contractId, wallet, ruleId, userInfo);'
    } else {
      code = 'const result = await mentaportSDK.checkMintStatus(contractId, wallet, ruleId);'
    }

    return (
      <code>{code}</code>
    );
  }
  return (
 
    <Paper elevation={2} sx={{ p:0,mt:1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4' sx={{m:2}}> Mint (Pre deployed contract)</Typography>
      <Typography  sx={{m:2}}>
          Function to mint a testnet NFT of a predepoloyed contract.
        </Typography>
      <Divider />
      <Paper elevation={2} sx={{ m:2, display: 'flex', flexDirection: 'column' }}>
          { state.mint ? 
            <FunctionCodeForm title={getCheckTitle} 
              description1={getMintDesc}  description2={getMintDesc1}
              varType='boolean' callBack={handleChange} value={state.mint}
            />
          :
          (
            <FunctionCodeForm title={getCheckTitle} 
              description1={getCheckDesc} 
              varType='boolean' callBack={handleChange} value={state.mint}
            />
          )
          }
         
         <Divider />
          {state.mint ?
          <>
           
            <FunctionCodeForm title={getNameTitle} 
              description1={"User name info"} caption={getOptionalCaption}
              varType='string' callBack={handleChange} value={state.name}/>
            <FunctionCodeForm title={getEmailTitle} 
              description1={"User email info"} caption={getOptionalCaption}
              varType='email' callBack={handleChange} value={state.email}/>

         
            <FunctionCodeForm title={getBlochainTitle} 
              description1={getBlochainDesc1} 
              varType='blockchain' callBack={handleChange} 
              value={state.blockchain}
            />
            {(state.blockchain == 'Polygon')?
              <PolygonMint 
               contractId={state.contractId}
               email={state.email} 
               name={state.name} />
            : (<SuiMint email={state.email} name={state.name}/>)
            }
          </>
          :
          <FunctionCodeForm title={''} 
          description1={''} 
          varType='button' callBack={TriggerSDK} loadingButton={true} loading={state.loading}/>

          }

       
        <Box sx={{ bgcolor:'#eeeeee', margin:'auto', paddingX:5, marginBottom:5}}>
         <CodeSnippet />
        </Box>
        <Results result={infoResult} />
        
      </Paper>
    </Paper>

  );
}