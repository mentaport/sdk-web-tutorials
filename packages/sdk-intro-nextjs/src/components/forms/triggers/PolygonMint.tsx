
/* eslint-disable */
import React, { useEffect, useState } from 'react'


import Typography  from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button  from '@mui/material/Button';

import { numberToHex,
  Address,
  Hash,
  TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  stringify,
} from 'viem'
import { goerli } from 'viem/chains'

import mentaportStapsABI  from "../../../json/abi-MentaportStamps.json";
import { useMentaportSDK } from '@lib/mentaport/provider';
import { IUserInfo } from '@mentaport/types-core';


export interface IMintParams {
  tokenURI: string;
  ruleId: string
  timestamp: string;
  signature: string;
  city: string;
  country: string;
  id:string;
  callback: any;
  errorCallback:any;
}

const contract_address = process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ADDRESS!;
const contractId = ''
const ruleId = "undefined"

let tokenId = -1

const PolygonMint = (props:IUserInfo) => {
  
  const [account, setAccount] = useState<Address>()
  const [hash, setHash] = useState<Hash>()
  const [receipt, setReceipt] = useState<TransactionReceipt>()
  const [mintingStatus, setMintingStatus] = useState(0); // init, 1:minitng, 2 done, 3 error
  const { mentaportSDK } = useMentaportSDK();

  const publicClient = createPublicClient({
    chain: goerli,
    transport: http(),
  })

  const walletClient = createWalletClient({
    chain: goerli,
    //@ts-ignore
    transport: custom(window.ethereum!),
  })
  
  useEffect(() => {
    ;(async () => {
      if (hash) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        setReceipt(receipt)
      }
    })()
  }, [hash, publicClient])
  // -------------------------------------
  // Function to connect wallet
  const connect = async () => {
    const [address] = await walletClient.requestAddresses()
    setAccount(address)
  }

  // Function that executes on chain MINT
  const mint = async () => {

    if (!account) return
   
    const res = await mentaportSDK.triggerMint( contractId, account, ruleId, props)
    if(res.status && res.data) {
    }
   // setInfoResult(JSON.stringify(result));
    // @ts-ignore
    const { request } = await publicClient.simulateContract({
      ...mentaportStapsABI,
      functionName: 'mint',
      account,
    })
    const hash = await walletClient.writeContract(request)
    tokenId = 1;
    setHash(hash)
  }

  return (

    <Grid container spacing={0} sx={{p:2}}>
      <Grid item xs={8}>
        <Stack >
        <Typography variant="subtitle1">
            {"Connect Wallet"}
          </Typography>
          <Typography variant="body2"> {"Mint a default Mentaport Tutorial NFT"}</Typography>
          <Typography variant="body2"> {"Using a predeployed contract"}</Typography>
          <Typography variant="caption"> {"Testnet"}</Typography>
        </Stack>
      
      </Grid>
      {/* @ts-ignore */}
      <Grid item xs={4} align='right'>
      {account ? 
        <Stack >
          <Button variant="contained" onClick={mint}>Mint</Button>
          <Typography variant="caption"> Wallet: {account}</Typography>
        </Stack>
        :
        (<Button variant="contained" onClick={connect}>Connect Polygon Wallet</Button>)
        }
    </Grid>
    
  </Grid>

  );
}

export default PolygonMint;