import React from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';

import CompesListing from './components/CompesListing';
import PembayaranPage from './components/PembayaranPage';
import RegisFull from './components/RegisFull';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './components/LoginPage';
import StatusPage from './components/StatusPage';
import {AiOutlineWarning} from "react-icons/ai"
import './App.css';

const App = () => {
  return (
    <>
    <div className='lg:hidden bg-black h-screen text-center pt-20'>
      {/* Code For Mobile view */}
      <div className='flex flex-col items-center gap-4'>
        <div>
          <AiOutlineWarning color="#FFFF00" size={150}/>
        </div>
        <div className='text-yellow-400 font-bold text-4xl'>
          Mohon Maaf, Saat ini website ini belum mendukung penggunaan melalui ponsel dan tablet
        </div>
        <div className='text-yellow-400 font-normal text-xl'>
        </div>
      </div>
    </div>
    <div className='hidden lg:block bg-blue-900'>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<CompesListingPage/>}/>
          <Route path=":idLom" element={<RegistrasiPage/>}/>
          <Route path="pembayaran" element={<CompeDetailPage/>} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="login/status" element={<StatusPage/>}/>
        </Route>
        <Route defautlt path="404" element={<NoMatch />} />
      </Routes>
    </div>
    </>
  );
}

function Home() {
  return(
    <div>
      <Outlet />
    </div>
  )
}

function CompesListingPage() {
  return(
    <CompesListing />  
  )
}

function NoMatch() { //todo: design
  return(
    <div>Error 404</div>  
  )
}

function RegistrasiPage() {
  return(
    <RegisFull />
  );
}

function CompeDetailPage() {
  return(
    <PembayaranPage />
  )
}

export default App;
