import { createContext, useState } from "react";

export const CountContext = createContext();

export const CountProvider = ({children}) =>{
  const [ count, setCount] = useState(100);
    return(
       <CountContext.Provider value = {{count,setCount}} >

        {children}
       </CountContext.Provider>
    )
}

