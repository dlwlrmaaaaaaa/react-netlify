import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Users from './pages/Users';
import Rooms from './pages/Rooms';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <BrowserRouter>
      <main className='w-full bg-slate-200 h-screen flex justify-between items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<NotFound />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/users' element={<Users />} />
          <Route path='/rooms' element={<Rooms />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

function NotFound() {
  return <div className='flex items-center justify-center '><h2>404 Not Found</h2></div>
}
