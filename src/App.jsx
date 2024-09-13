import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Sidebar from './Component/Sidebar/Sidebar';
import NewProduct from './Component/NewProduct';
import Product from './Component/Product/Product';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Sidebar />}>
      <Route index element={<NewProduct />} />
      <Route path='product/:id' element={<Product />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
