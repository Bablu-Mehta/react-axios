import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import Home from './pages/Home'

function App() {

  const rounter = createBrowserRouter([
    {path:'/',
    element: <Root />,
    children:[
      {index:true, element:<Home />}
    ]
  }
  ])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
