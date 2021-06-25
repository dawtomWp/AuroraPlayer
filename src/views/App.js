import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from "./Login";
import Dashboard from "./Dashboard";
import MainTemplate from "../templates/MainTemplate";
import Placeholder from './Placeholder';
import { routes } from '../routes/routes';


const CODE = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <>
    <BrowserRouter>
    <MainTemplate>
    
          {/* {CODE ? <Dashboard code={CODE}/> : <Login/>}  */}
          {CODE ? 
          (
            <>
              <Route exact path={routes.dashboard}/> 
              <Dashboard code={CODE}/>
            </>
          )
             : 
             <Route exact path={routes.dashboard} component={Login}/> 
          }
          <Route exact path={routes.placeholder} component={Placeholder}/> 
     
    </MainTemplate>
    </BrowserRouter>


    </>
  );
}

export default App;
