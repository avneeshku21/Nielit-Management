import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import {Routes,Route, useLocation} from "react-router-dom"
import Stock from "./pages/Stocks"
import Login from "./pages/Login"
import About from "./pages/About"
import Dasboard from './pages/Dashboard'
import Register from './pages/Register'
import Contact from "./pages/Contact"

function App() {
const location=useLocation()
const hideNavbarFooter=["/dasboard","/login","/register"].includes(location.pathname)


  return (
    <>

    {!hideNavbarFooter && <Navbar/>}
    <Home/>
   <Routes>
   <Route exact path="/" element={<Home/>}/>
   <Route exact path="/stocks" element={<Stock/>}/>
   <Route exact path="/login" element={<Login/>}/>
   <Route exact path="/about" element={<About/>}/>
   <Route exact path="/contact" element={<Contact/>}/>
   <Route exact path="/dasboard" element={<Dasboard/>}/>
   <Route exact path="/register" element={<Register/>}/>
   </Routes>
   {!hideNavbarFooter && <Footer/>}
    </>
  )
}

export default App
