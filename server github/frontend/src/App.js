import { BrowserRouter, Routes, Route } from "react-router-dom";
//import './App.css';

import LoginPage from './pages/LoginPage';
//import CardPage from './pages/CardPage';
import RegisterPage from './pages/Register';
import PasswordChange from './pages/PasswordReset';
import ResetPasswordForm from './pages/ResetPasswordForm'; // Import the reset password page component
import Home from './pages/Home'; 
import Test from './pages/TestHome'
import Navbar from './components/Navbar';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<PasswordChange />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
      );
}

export default App;
