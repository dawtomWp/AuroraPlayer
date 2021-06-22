import React, {useState} from 'react';
import useAuth from './hooks/useAuth';

const Dashboard = ({code}) => {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')

    return (
        <section>
                  <input type="search" placeholder="search songs" value={search} onChange={e => setSearch(e.target.value)}></input>

                  <div>
                      
                  </div>
        </section>
  
    );
}
 
export default Dashboard;