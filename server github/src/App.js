import {BrowserRouter, Routes , Route} from 'react-router-dom'

//pages and components

//pages
import Home from './pages/Home' //grabs home page from pages folder
import StarfieldPage from './pages/starfieldpage';

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
