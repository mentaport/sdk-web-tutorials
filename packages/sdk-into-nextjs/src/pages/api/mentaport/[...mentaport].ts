import type { NextApiRequest, NextApiResponse } from 'next'
import {MentaportServerSDK} from '@lib/mentaport/serverClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   const response = await MentaportServerSDK(req.url!, req.method!, req.body);
   return res.status(200).send(response);
  
  } catch (error) {
    console.log("mentaport error")
    if(error.response) {
      console.log(error.response.data)
      return  res.status(error.response.status).send(error.response.data)
    }
    return res.status(500).end();
  }
}
