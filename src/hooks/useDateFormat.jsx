import {useState,useEffect} from 'react';


export const useDateFormat = date => {
    const [isDateFormatted,setDateFormatted] = useState()

    useEffect(() => {

        if(date) {
            setDateFormatted(date.replace("T", ", ").slice(0,25))
        }
             
    }, [date])

    return isDateFormatted

}