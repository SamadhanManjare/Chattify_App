import React from 'react'
import { Routes, Route } from 'react-router'

function App() {
  return (
   <Routes>
      
      <Route path='/' element={<ChatPage/>} />
    </Routes>
  )
}

export default App
