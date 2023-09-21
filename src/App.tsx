import { LoginForm, RegisterForm, AddCategory, EditCategory, Home } from './pages'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/add' element={<AddCategory />} />
        <Route path='/edit' element={<EditCategory />} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App
