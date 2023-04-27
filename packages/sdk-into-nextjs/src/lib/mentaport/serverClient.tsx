
import {MentaportCoreSDK} from '@mentaport/core';
import { Environment } from '@mentaport/types-core';

let mentaportClient:MentaportCoreSDK = null;
export async function MentaportServerSDK(reqUrl:string, method:string, body:string ) {
  if(mentaportClient === null) {
    mentaportClient = new MentaportCoreSDK(process.env.MENTAPORT_API_KEY!, true);
    mentaportClient.SetServerSide(Environment.STABLE)
  } else {
    console.log("Already InitMentaportSDKSever")
  }
  return await mentaportClient.serverRequest(reqUrl, method, body )
}

