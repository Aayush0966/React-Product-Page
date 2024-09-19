import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom';
import {useLocation} from 'react-router-dom'

function Layout() {
  const location = useLocation();
  return (
    <div>
   <Header />
   <Outlet />
   <Footer />

    </div>
  )
}

export default Layout