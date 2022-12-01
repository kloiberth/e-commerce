import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductsDetails from './pages/ProductsDetails'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'
import Cart from './components/Cart'

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      {isLoading && (<LoadingScreen />)}
      <Container className='my-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductsDetails />} />
          <Route path='/cart' element={<Cart/>} />

          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path='/purchases' element={<Purchases />} />
          </Route>
        </Routes>
      </Container>

    </HashRouter>
  )
}

export default App
