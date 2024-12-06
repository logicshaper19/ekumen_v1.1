import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Hero } from './components/landing/Hero';
import { Benefits } from './components/landing/Benefits';
import { HowItWorks } from './components/landing/HowItWorks';
import { Signup } from './components/Signup';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Community } from './components/dashboard/Community';
import { BusinessPlan } from './components/dashboard/BusinessPlan';
import { Transformation } from './components/dashboard/Transformation';
import { MyData } from './components/data/MyData';
import { Login } from './components/Login';
import { LandingNav } from './components/navigation/LandingNav';
import { SignupFlow } from './components/auth/SignupFlow';
import { useAuth } from './context/AuthContext';
import { DeclarationDetails } from './components/dashboard/declarations/DeclarationDetails';
import { DeclarationDetailsPage } from './pages/DeclarationDetailsPage';
import { CategoryDeclarationsPage } from './pages/CategoryDeclarationsPage';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Only consider landing page as public route
  const isPublicRoute = location.pathname === '/';

  // If on landing page, show landing layout
  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-white">
        <LandingNav />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <HowItWorks />
              <Benefits />
            </>
          } />
        </Routes>
      </div>
    );
  }

  // Show authenticated app layout with all routes
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/signup-flow" element={<SignupFlow />} />
        <Route path="/*" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="community" element={<Community />} />
          <Route path="business-plan" element={<BusinessPlan />} />
          <Route path="transformation" element={<Transformation />} />
          <Route path="mes-donnees" element={<MyData />} />
          <Route path="declarations/:id" element={<DeclarationDetailsPage />} />
          <Route path="declarations/categories/:categoryId" element={<CategoryDeclarationsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;