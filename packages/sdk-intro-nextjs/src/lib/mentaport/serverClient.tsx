/* eslint-disable */
import {MentaportCoreSDK} from '@mentaport/core';
import { Environment } from '@mentaport/types-core';
import type {  NextApiResponse } from 'next'

/* @ts-ignore */
let mentaportClient:MentaportCoreSDK = null;
export async function MentaportServerSDK(reqUrl:string, method:string, body:string ):Promise<NextApiResponse> {

  if(mentaportClient == null) {
    mentaportClient = new MentaportCoreSDK(process.env.MENTAPORT_API_KEY!, Boolean(process.env.NEXT_PUBLIC_SERVER_APP!));
    
    let env = Environment.PRODUCTION;
    if(process.env.NEXT_PUBLIC_ENVIRONMENT === "DEVELOPMENT") {
      env = Environment.DEVELOPMENT;
    }
    if(process.env.NEXT_PUBLIC_ENVIRONMENT === "STAGING") {
      env = Environment.STAGING;
    }
    if(process.env.NEXT_PUBLIC_ENVIRONMENT === "STABLE") {
      env = Environment.STABLE;
    }
    mentaportClient.setServerEnv(env)
  } else {
    console.log("Already InitMentaportSDKSever")
  }
  return await mentaportClient.serverRequest(reqUrl, method, body )
}

