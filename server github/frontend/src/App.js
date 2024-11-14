import {BrowserRouter, Routes , Route} from 'react-router-dom'

//pages and components

import Home from './pages/Home' //grabs home page from pages folder
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Navbar />       
        <div className = "pages">
          <Routes>
           <Route
           path = "/"
           element = {<Home />}  //so this loads the home page here
           />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
