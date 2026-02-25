import React from 'react'
import useAuthStore  from '../store/useAuthStore'
import { useState } from 'react';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';

function Signup() {

  const {formData, setFormData} = useState({fullname: "", email: "", password: ""});
  const {signup, isSigningUp} = useAuthStore();

  const handleChange = (e) => {}

  return (
    // Signup page with animated border container
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>
        <BorderAnimatedContainer>
          <div className=' w-full flex flex-col md:flex-row'>
            {/* Left side with image and text */}
            <div className='md:w-1/2 w-full h-full flex items-center justify-center p-8 md:border-r border-gray-700'>
              <div className='w-full max-w-md'>
                <MessageCircleIcon className='w-12 h-12 mx-auto mb-4 text-slate-400' />
                <h2 className='text-2xl font-bold text-slate-400 mb-4'>Create Account</h2>
                <p className=' text-slate-300'>Join our community and start chatting!</p>
              </div>
            </div>
             </div>
        </BorderAnimatedContainer>
      </div>
      
    </div>
  )
}

export default Signup;
