
import {MentaportCoreSDK} from '@mentaport/core';
import { Environment } from '@mentaport/core-types';

let mentaportClient:MentaportCoreSDK = null;
export async function MentaportServerSDK(reqUrl:string, method:string, body:string ) {
  if(mentaportClient === null) {
    mentaportClient = new MentaportCoreSDK(process.env.MENTAPORT_API_KEY!, Boolean(process.env.NEXT_PUBLIC_SERVER_APP!));
    mentaportClient.SetServerSide(Environment.DEVELOPMENT)
  } else {
    console.log("Already InitMentaportSDKSever")
  }
  return await mentaportClient.serverRequest(reqUrl, method, body )
}

