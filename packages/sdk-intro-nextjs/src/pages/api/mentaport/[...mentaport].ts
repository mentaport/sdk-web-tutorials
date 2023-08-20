/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next'
import {MentaportServerSDK} from '@lib/mentaport/serverClient';
import {IResults} from '@mentaport/types-core'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   const response = await MentaportServerSDK(req.url!, req.method!, req.body);
   console.log(response)
   return res.status(200).send(response);
  
  } catch (error) {
    console.log("mentaport error", error)
    const err = error as IResults<string>;
    console.log(err)
    if(err && !err.status) {
      return res.status(err.statusCode).send(err.data)
    }
    return res.status(500).end();
  }
}
