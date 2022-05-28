
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navbar from './Shared/Navbar/Navbar';
import Blogs from './Pages/Blogs/Blogs';
import Purchase from './Pages/Purchase/Purchase';
import Register from './Pages/Login/Register';
import RequireAuth from './Pages/Login/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Pages/Dashboard/MyProfile';
import MyOrder from './Pages/Dashboard/MyOrder';
import AddReview from './Pages/Dashboard/AddReview';
import AllReviews from './Pages/AllReviews/AllReviews';
import ManageOrders from './Pages/Dashboard/Admin/ManageOrders';
import AddProduct from './Pages/Dashboard/Admin/AddProduct';
import ManageProduct from './Pages/Dashboard/Admin/ManageProduct';
import EditProduct from './Pages/Dashboard/Admin/EditProduct';
import MakeAdmin from './Pages/Dashboard/Admin/MakeAdmin';
import RequiredAdmin from './Pages/Dashboard/Admin/RequireAdmin';
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>

        <Route path='/editProduct/:id' element={
          <RequireAuth>
            <EditProduct></EditProduct>
          </RequireAuth>
        }>
        </Route>

        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        }>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='myOrder' element={<MyOrder></MyOrder>}></Route>
          <Route path='addReview' element={<AddReview></AddReview>}></Route>
          <Route path='manageOrder' element={<RequiredAdmin><ManageOrders></ManageOrders></RequiredAdmin>}></Route>
          <Route path='addProduct' element={<RequiredAdmin><AddProduct></AddProduct></RequiredAdmin>}></Route>
          <Route path='manageProduct' element={<RequiredAdmin><ManageProduct></ManageProduct></RequiredAdmin>}></Route>
          <Route path='makeAdmin' element={<RequiredAdmin><MakeAdmin></MakeAdmin></RequiredAdmin>}></Route>
        </Route>
        <Route path='/allReviews' element={<AllReviews></AllReviews>}></Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
