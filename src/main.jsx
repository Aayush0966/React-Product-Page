import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import { Provider } from 'react-redux';
import { store } from './features/store.js';
import ProductDetail, { getProductDetails } from './components/Home/ProductDetail.jsx';
import Cart from './components/Cart/Cart'

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'product/:id',
        loader: getProductDetails,
        element: <ProductDetail />,
      },
      {
        path: 'mycart',
        element: <Cart />
      }
    ],
  },
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
