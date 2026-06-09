import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import ErrorBoundary from './components/layout/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { CatsPage } from './pages/CatsPage';
import { CatDetailPage } from './pages/CatDetailPage';
import { AiRecommendPage } from './pages/AiRecommendPage';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-[#FFF0F6] text-[#1A0A10] flex flex-col">
          {/* Responsive Navigation */}
          <Navbar />
          
          {/* Main content area offsets left side on desktop (>1024px) for sidebar */}
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pl-72 pb-24 sm:pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cats" element={<CatsPage />} />
              <Route path="/cats/:id" element={<CatDetailPage />} />
              <Route path="/ai-recommend" element={<AiRecommendPage />} />
            </Routes>
          </main>
          
          {/* Footer offsets left side on desktop (>1024px) */}
          <div className="lg:pl-64">
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
