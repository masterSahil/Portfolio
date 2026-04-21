import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ContactPage from './pages/Contact';
import NotFoundPage from './pages/NotFoundPage';
import PageLoader from './components/Loader';
import ChatWidget from './components/ChatWidget';
import { useLocation } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <PageLoader isLoading={isLoading} />

      <BrowserRouter>
        <ScrollToTop />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </>
  );
}

export default App;