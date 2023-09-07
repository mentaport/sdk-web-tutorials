import type { NextApiRequest, NextApiResponse } from 'next'
import { handlerCallback } from '@mentaport/sdk-nextjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   await handlerCallback(req,res);
   return;
  } catch (error) {
    console.log("error", error)
    return res.status(500).end();
  }
}
