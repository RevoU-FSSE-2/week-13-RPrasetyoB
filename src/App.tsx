import { LoginForm, RegisterForm, AddCategory, EditCategory, HomePage } from './pages'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/add' element={<AddCategory />} />
        <Route path='/edit' element={<EditCategory />} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App
