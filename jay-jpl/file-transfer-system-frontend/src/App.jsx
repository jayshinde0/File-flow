import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';
import FileTransferPage from '../pages/FileTransferPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/transfer" element={<FileTransferPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
