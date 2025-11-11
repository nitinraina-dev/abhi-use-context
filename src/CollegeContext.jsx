import { createContext, useState, useEffect } from "react";

export const CollegeContext = createContext();


export function CollegeProvider({ children }) {
    const [joke, setJoke] = useState("");

    useEffect(() => {
        fetch("https://sv443.net/jokeapi/v2/joke/Any")
            .then((response) => response.json())
            .then(data => setJoke(data))

    }, [])
    

    return (<CollegeContext.Provider value={{ joke  }}>
        {children}
    </CollegeContext.Provider>
    );

}
