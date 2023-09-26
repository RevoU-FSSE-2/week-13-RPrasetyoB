import { LoginForm, RegisterForm, AddCategory, EditCategory, HomePage, ProfilePage } from './pages'
import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PublicLayout } from './LayOut'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {
  
  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/add',
          element: <AddCategory />
        },
        {
          path: '/edit/:id',
          element: <EditCategory />
        },
        {
          path: '/profile/:id',
          element: <ProfilePage />
        }
      ]
    },
    {
      element: <LoginForm />,
      path: '/login'
    },
    {
      path: '/register',
      element: <RegisterForm />
    }
  ])


  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<HomePage />} />
    //     <Route path='/login' element={<LoginForm />} />
    //     <Route path='/register' element={<RegisterForm />} />
    //     <Route path='/add' element={<AddCategory />} />
    //     <Route path='/edit' element={<EditCategory />} />        
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
