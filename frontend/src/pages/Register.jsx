import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
const [name,setName]=useState("")
const [email,setemail]=useState("")
const [phone,setPhone]=useState("")
const [password,setPassword]=useState("")
const [role,setRole]=useState("")
const [education,setEducation]=useState("")
const [photo,setPhoto]=useState("")
const [photoPreview,setPhotoPreview]=useState("")








  return (
    <div>
     <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white rounded-lg p-8'>
        <form action=''> <div className='font-semibold text-xl items-center text-center'>TechLearner<span className='text-blue-600'>X</span>
        </div>
        <h1 className='text-xl font-semibold mb-6'>Register</h1>
        <select value={role} className='w-full p-2 mb-4 border rounded-md'>
          <option value="">Select Role</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
<div className='mb-4'>
  <input 
  type='text' 
  placeholder='Your Name' 
  value={name}  
  className='w-full p-2 border rounded-md'
  />
</div>
<div className='mb-4'>
  <input 
  type='email' 
  placeholder='Your Email' 
  value={name}  
  className='w-full p-2 border rounded-md'
  />
</div>
<div className='mb-4'>
  <input 
  type='number' 
  placeholder='Your phone Number' 
  value={name}  
  className='w-full p-2 border rounded-md'
  />
</div>
<div className='mb-4'>
  <input 
  type='password' 
  placeholder='Enter Your Password' 
  value={name}  
  className='w-full p-2 border rounded-md'
  />
</div>
<select value={role} className='w-full p-2 mb-4 border rounded-md'>
          <option value="">Select Your Education </option>
          <option value="BA">BA</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="BTECH">BTECH</option>
          <option value="O-Level">O-Level</option>
          <option value="A-Level">A-Level</option>
        </select>
<div className='flex items-center mb-4'>
  <div className='photo w-20 h-20 mr-4'>
    <img src="#" alt="photo" />
  </div>
  <input type="file" className='w-full p-2 border rounded-md' />
</div>
<p className='text-center mb-4'>Already registered?{""}
   <Link className="text-blue-600">Login Now</Link>
   </p>
   <button className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>Register</button>


        </form>
      </div>
     </div>
    </div>
  )
}

export default Register
