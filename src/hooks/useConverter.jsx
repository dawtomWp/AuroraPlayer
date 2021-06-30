import { useState,useEffect } from "react"


export const useConverter = (item) => {
    const [isConvert, setConvertNumbers] = useState(null)

    useEffect(() => {
            const minutes = Math.floor(item / 60000);
            const seconds = ((item % 60000) / 1000).toFixed(0); 
    
            setConvertNumbers(`${minutes}:${seconds < 10 ?  '0' + seconds : seconds}`)
        
    },[item])

    return isConvert;

}