
import React, {useEffect, useState, useContext} from "react";

import { createContext } from 'react';
import { MentaportCoreSDK }  from '@mentaport/core'

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
    mentaportSDK.setClient(process.env.NEXT_PUBLIC_API_URL);
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
