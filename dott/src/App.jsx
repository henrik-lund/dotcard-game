import { useState } from 'react'
import './App.css'
import Dott from './components/Dott'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dott />
    </>
  )
}

export default App
