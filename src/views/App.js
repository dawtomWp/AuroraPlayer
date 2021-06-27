import Login from "./Login";
import Dashboard from './Dashboard';
import MainTemplate from "../templates/MainTemplate";


const CODE = new URLSearchParams(window.location.search).get('code')

function App() {

  console.log(CODE)
  return (
    <>

    <MainTemplate>
    
          {CODE ? <Dashboard code={CODE}/> : <Login/>} 
         
         
  
     
    </MainTemplate>



    </>
  );
}

export default App;
