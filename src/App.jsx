import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';  
import Home from './pages/Home';  
import DashBoard from './pages/DashBoard';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {/* Define Routes inside Routes */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Landing page route */}
          <Route path="/dashboard" element={<DashBoard />} />   {/* Page route */}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
