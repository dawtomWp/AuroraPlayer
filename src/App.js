import Login from "./Login";
import Dashboard from "./Dashboard";

const CODE = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <>
    {CODE ? <Dashboard code={CODE}/> : <Login/>}

    </>
  );
}

export default App;
