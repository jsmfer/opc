import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Concept } from '@/sections/Concept';
import { Tools } from '@/sections/Tools';
import { BusinessLoop } from '@/sections/BusinessLoop';
import { Cases } from '@/sections/Cases';
import { Policy } from '@/sections/Policy';
import { GlobalNetwork } from '@/sections/GlobalNetwork';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { Admin } from '@/admin/pages/Admin';
import { Login } from '@/admin/pages/Login';
import { ProtectedRoute } from '@/admin/components/ProtectedRoute';

// 前台页面组件
function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <Navigation />
      <main>
        <Hero />
        <div id="concept">
          <Concept />
        </div>
        <div id="tools">
          <Tools />
        </div>
        <div id="business">
          <BusinessLoop />
        </div>
        <div id="cases">
          <Cases />
        </div>
        <div id="policy">
          <Policy />
        </div>
        <div id="network">
          <GlobalNetwork />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster 
        position="top-center" 
        richColors 
        closeButton
        toastOptions={{
          style: {
            fontSize: '14px',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
