import React from 'react'
import useAuthStore  from '../store/useAuthStore'
import { useState } from 'react';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { MessageCircleIcon } from '@heroicons/react/24/outline';
import { UserIcon } from 'lucide-react';

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
                {/* Headinng text */}
                <MessageCircleIcon className='w-12 h-12 mx-auto mb-4 text-slate-400' />
                <h2 className='text-2xl font-bold text-slate-400 mb-4'>Create Account</h2>
                <p className=' text-slate-300'>Signup to start chatting with your friends!</p>
              </div>
              {/* form */}
              <form onSubmit={HandleSubmit} className="space-y-6">
                <div>
                  <label className='auth-input-label'>Full Name</label>
                  <div className='relative'>
                    <UserIcon className='auth-input-ican'/>
                    <input
                      type="text"
                      value={formData.fullname}
                      onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                      className='input'
                      placeholder='John Doe'
                    />
                  </div>
                </div>
                  
                

              </form>
            </div>
             </div>
        </BorderAnimatedContainer>
      </div>
      
    </div>
  )
}

export default Signup;
