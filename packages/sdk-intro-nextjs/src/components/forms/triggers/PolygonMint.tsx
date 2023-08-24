
/* eslint-disable */
import React, { useEffect, useState } from 'react'

import LoadingButton from '@mui/lab/LoadingButton';
import Typography  from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button  from '@mui/material/Button';
import Link from '@mui/material/Link';

import { numberToHex,
  Address,
  Hash,
  TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from 'viem'

import { goerli, localhost} from 'viem/chains'

import MentaportMint  from "../../../json/MentaportMint.json";
import { useMentaportSDK } from '@lib/mentaport/provider';
import { IUserInfo } from '@mentaport/types-core';

export interface IMintProps {
  name:string,
  email:string,
  contractId:string,
}

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

const DEFAULT_TOKEN = "";
// const contract_address = "0x1dCB31E93c9CAcE5bDd81cD6e7ADb69743a021bC";
// const contractId = '5a29c6b3-57b1-4eff-93bb-05b70048d1cf'

let tokenId = -1

const PolygonMint = (props:IMintProps) => {
 

  const [account, setAccount] = useState<Address>()
  const [loading, setLoading] = useState(false);

  const [hash, setHash] = useState<Hash>()
  const [receipt, setReceipt] = useState<TransactionReceipt>()
  const { mentaportSDK } = useMentaportSDK();

  const publicClient = createPublicClient({
    chain: localhost,
    transport: http(),
  })

  const walletClient = createWalletClient({
    chain: localhost,
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
  // const disconnect = async () =>{
  //   await walletClient.
  // }
  // Function that executes on chain MINT
  const mint = async () => {

    if (!account) return;
    try {
      setLoading(true)
    
      const res = await mentaportSDK.triggerMint( 
        props.contractId, 
        account, "",
        { name: props.name, email:props.email}
      )
      if(res.status && res.data) {
        // setInfoResult(JSON.stringify(result));
        const mintRequest =  {
          signature: res.data?.signature,
          locationRuleId: res.data?.ruleId,
          timestamp: res.data?.timestamp,
          receiver: account,
          tokenURI: DEFAULT_TOKEN,
        }
        console.log("mintRequest", MentaportMint.abi)
        console.log(publicClient)
        const contractAddress =res.data?.contractAddress as `0x${string}`;

        // @ts-ignore
        const { request } = await publicClient.simulateContract({
          address: contractAddress,
          abi: MentaportMint.abi,
          functionName: 'mintLocation',
          args: [mintRequest],
          account
        })
      
        console.log("mintRequwalletClientst", walletClient)
        const hash = await walletClient.writeContract(request)
        tokenId = 1;
        setHash(hash)
        console.log(hash)
        alert("Congratulations you have successfully minted!")
        setLoading(false)
      }
      else {
        console.log("ERROR")
        setLoading(false)
      }
    } catch(error){
      alert("We are had some issued minting your NFT")
      setLoading(false);
    }
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
          <LoadingButton
            size="large"
            color="secondary"
            onClick={mint}
            loading={loading}
            // loadingPosition="start"
            variant="contained"
          >
            <span>Mint</span>
          </LoadingButton>
    
          <Typography variant="caption"> Wallet: {account}</Typography>
          {hash && 
            <Typography variant="caption"> 
              <Link style={{ cursor: 'pointer' }} 
                href={`https://mumbai.polygonscan.com/tx/${hash}`} 
                target={"_blank"} >
                Check polygonscan!
              </Link>
            </Typography>
          }

        </Stack>
        :
        (<Button variant="contained" onClick={connect}>Connect Polygon Wallet</Button>)
        }
    </Grid>
    
  </Grid>

  );
}

export default PolygonMint;