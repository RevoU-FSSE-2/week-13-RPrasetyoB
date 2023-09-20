import { LoginForm, RegisterForm } from './pages'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  
  // const router = createBrowserRouter

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
