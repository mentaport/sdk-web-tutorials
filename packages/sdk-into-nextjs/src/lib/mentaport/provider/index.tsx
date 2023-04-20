
import React, {useEffect, useState, useContext} from "react";

import { createContext } from 'react';
import {MentaportCoreSDK}  from '@mentaport/core';
import { Environment } from '@mentaport/core-types';

interface IMentaportContext {
  mentaportSDK: MentaportCoreSDK;
}
const defaultState = {
  mentaportSDK:new MentaportCoreSDK(process.env.MENTAPORT_API_KEY!, Boolean(process.env.NEXT_PUBLIC_SERVER_APP!)),
};

export const MentaportContext = createContext<IMentaportContext>(defaultState);

interface Props {
  children: React.ReactNode;
}
const MentaportProvider:React.FC<Props> = ({children}) =>{
  const [mentaportSDK, setMentaportSDK] = useState(defaultState.mentaportSDK);
  
  useEffect(() => {
  // For this tutorial we are going to be in staging to coomunicate with our test contract in testnet
   mentaportSDK.SetClientSide(Environment.DEVELOPMENT, process.env.NEXT_PUBLIC_API_URL);
    // Uncomment ONLY: if application doesnt need location. Read more in the documentation
   //mentaportSDK.SetNoLocationRequired();
  }, [])
  return (
    <MentaportContext.Provider value={{mentaportSDK}}>
      {children}
    </MentaportContext.Provider>
  )
}
export function useMentaportSDK() {
  return useContext(MentaportContext)
}

export default MentaportProvider;
