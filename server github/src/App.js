import {BrowserRouter, Routes , Route} from 'react-router-dom'

//pages and components

//pages
import Home from './pages/Home' //grabs home page from pages folder
import StarfieldPage from './pages/starfieldpage';
import LoginPage from './pages/LoginPage'; //grabbing login page

//components
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Navbar />       
        <div className = "pages">
          <Routes>
           {/* Route for Home */}
           <Route path="/" 
           element={<LoginPage />} />


           {/* Route for Home */}
           <Route path="/home" 
           element={<Home />} />


           {/* Route for StarField */}
          <Route path="/starfield" 
          element={<StarfieldPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
