import { useState,useEffect } from "react"

export const useNumFormatter = (num) => {
    const [isFormatted,setFormatted] = useState('')
 
        useEffect(() => {

            if(Math.abs(num) > 999) {
                setFormatted(Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K')
            }
            if(Math.abs(num) > 9999999) {
                setFormatted(Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'M')
            }
       

           
      
           
        }, [num]);

        return isFormatted;    
}
 
