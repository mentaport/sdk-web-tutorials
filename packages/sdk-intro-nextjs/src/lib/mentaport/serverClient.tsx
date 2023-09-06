/* eslint-disable */
import {MentaportCoreSDK} from '@mentaport/core';
import { Environment } from '@mentaport/types-core';
import type {  NextApiResponse } from 'next'

/* @ts-ignore */
let mentaportClient:MentaportCoreSDK = null;
export async function MentaportServerSDK(reqUrl:string, method:string, body:string ):Promise<NextApiResponse> {

  if(mentaportClient == null) {
    mentaportClient = new MentaportCoreSDK(process.env.MENTAPORT_API_KEY!, Boolean(process.env.NEXT_PUBLIC_SERVER_APP!));
    mentaportClient.setServer()
  } else {
    console.log("Already InitMentaportSDKSever")
  }
  return await mentaportClient.serverRequest(reqUrl, method, body )
}

