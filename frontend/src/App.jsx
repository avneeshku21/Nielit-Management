import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import {Routes,Route, useLocation} from "react-router-dom"
import Stock from "./pages/Stocks.jsx"
import Login from "./pages/Login"
import About from "./pages/About"
import Dasboard from './pages/Dashboard'
import Register from './pages/Register'
import Contact from "./pages/Contact"
import Creators from "./pages/Creators.jsx"
import { useAuth } from './context/AuthProvider'

function App() {
const location=useLocation()
const hideNavbarFooter=["/dasboard","/login","/register"].includes(location.pathname)

const {stocks}=useAuth()
console.log(stocks)

  return (
    <>

    {!hideNavbarFooter && <Navbar/>}
   <Routes>
   <Route exact path="/" element={<Home/>}/>
   <Route exact path="/creators" element={<Creators/>}/>
   <Route exact path="/stocks" element={<Stock/>}/>
   <Route exact path="/login" element={<Login/>}/>
   <Route exact path="/about" element={<About/>}/>
   <Route exact path="/contact" element={<Contact/>}/>
   <Route exact path="/dasboard" element={<Dasboard/>}/>
   <Route exact path="/register" element={<Register/>}/>
   </Routes>
   {/* {!hideNavbarFooter && <Footer/>} */}
    </>
  )
}

export default App
