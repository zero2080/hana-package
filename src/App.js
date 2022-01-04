import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <div className="App" style={{minWidth:'720px',maxWidth:"1280px",margin:"0 auto"}}>
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
