import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Category from './pages/Category'
import Product from './pages/Product'
import Order from './pages/orders/Order'
import CreateOrder from './pages/orders/CreateOrder'
import EditOrder from './pages/orders/EditOrder'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'

// parent component
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/create" element={<CreateOrder />} />
            <Route path="/order/:id/editOrder" element={<EditOrder />} />
          </Route>
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
