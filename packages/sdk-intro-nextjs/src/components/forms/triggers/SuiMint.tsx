/* eslint-disable */
import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button  from '@mui/material/Button';

import {
  ConnectModal,
  useWallet,
  ErrorCode
} from '@suiet/wallet-kit';
import {TransactionBlock} from "@mysten/sui.js";

import { useMentaportSDK } from '@lib/mentaport/provider';
import { IUserInfo } from '@mentaport/types-core';
import { resetWarningCache } from 'prop-types';

export interface IMintParams {
  tokenURI: string;
  imageUrl:string;
  ruleId: string
  timestamp: string;
  signature: string;
  city: string;
  country: string;
  id:string;
  callback: any;
  errorCallback:any
}

const contract_address = process.env.NEXT_PUBLIC_MENTAPORT_CONTRACT_ADDRESS!;
const contractId = ''
const ruleId = "undefined"
const tokenURI = "undefined"
let tokenId = ""

const SuiMint = (props:IUserInfo) => {
  const wallet = useWallet();
  const [showModal, setShowModal] = useState(false)

  const [mintingStatus, setMintingStatus] = useState(0); // init, 1:minitng, 2 done, 3 error
  const { mentaportSDK } = useMentaportSDK();

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return ''
    // @ts-ignore
    return value.toString('hex')
  }

  async function mentaportMint() {
    const res = await mentaportSDK.triggerMint( contractId, wallet.account?.address!, ruleId, props);
    if(res.status && res.data) {
      return {
        status:res.status,
        tokenURI:tokenURI,
        ruleId:res.data.ruleId,
        timestamp:res.data.timestamp,
        signature:res.data.signature,
      };
    } else {
      return {status:false}
    }
  }
  async function mint() {

    setMintingStatus(1);

    const target = `${process.env.NEXT_PUBLIC_SUI_MENTAPORT_PACKAGE_ADDRESS}::mentaport_nft::mint`;
    const mintRegistryAddress = process.env.NEXT_PUBLIC_SUI_NETWORK_MENTAPORT_MINTCAP_ADDRESS!;
   
    const result = await mentaportMint();
    if(!result.status){ 
     alert('error minting');
     
      return;
    }
    try {
      const tx = new TransactionBlock()
      tx.moveCall({
        target: target as any,
        arguments: [
          tx.object(mintRegistryAddress),
          tx.pure(result.timestamp),
          tx.pure(result.ruleId),
          tx.pure(result.signature!.substring(2)),
          tx.pure(result.tokenURI)
        ]
      })
    
      const resData = await wallet.signAndExecuteTransactionBlock({
        //@ts-ignore
        transactionBlock: tx,
        options: { 
          showObjectChanges: true,
        }
      });
      
      //--
      if (resData.objectChanges) {
        const createObjectChange = resData.objectChanges.find(
          //@ts-ignore
          (objectChange) => objectChange.type === "created"
        );

        if (!!createObjectChange && "objectId" in createObjectChange) {
         // console.log("created",createObjectChange.objectId);
          tokenId = createObjectChange.objectId
        }
      }
      //--
      //console.log('executeMoveCall success', resData);
      //alert('executeMoveCall succeeded (see response in the console)');
      setMintingStatus(2);
      
    } catch (e) {
      console.error('executeMoveCall failed', e);
     // alert('executeMoveCall failed (see response in the console)');
      setMintingStatus(3);
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
    {wallet.account ? 
      <Stack >
        <Button variant="contained" onClick={mint}>Mint</Button>
        <Typography variant="caption"> Wallet: {wallet.account?.address}</Typography>
      </Stack>
      :
      (

      <ConnectModal
        open={showModal}
        onOpenChange={(open) => setShowModal(open)}
        >
          <Button variant="contained" sx={{mb:1, mt:1 }} size="medium">
            Connect Sui Wallet
          </Button>
      </ConnectModal>
    )
      }
    </Grid>
  </Grid>
  );
}


export default SuiMint;