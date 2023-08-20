
import React, {useEffect, useState, useContext} from "react";

import { createContext } from 'react';
import {MentaportCoreSDK}  from '@mentaport/core'
import { Environment } from '@mentaport/types-core';

interface IMentaportContext {
  mentaportSDK: MentaportCoreSDK;
}
const defaultState = {
  mentaportSDK:new MentaportCoreSDK(process.env.MENTAPORT_API_KEY!, Boolean(process.env.NEXT_PUBLIC_SERVER_APP)),
};

export const MentaportContext = createContext<IMentaportContext>(defaultState);

interface Props {
  children: React.ReactNode;
}
const MentaportProvider:React.FC<Props> = ({children}) =>{
  const [mentaportSDK, setMentaportSDK] = useState(defaultState.mentaportSDK);
  
  useEffect(() => {
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
    
    mentaportSDK.setClientEnv(env, process.env.NEXT_PUBLIC_API_URL);
    //mentaportSDK.setNoLocationRequired();
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
