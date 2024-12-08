import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { PublicDeclarations } from './components/dashboard/declarations/PublicDeclarations';
import { AddObjective } from './components/business-plan/AddObjective';

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
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/auth/signup-flow" element={!isAuthenticated ? <SignupFlow /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route path="/*" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="declarations/:id" element={<DeclarationDetailsPage />} />
            <Route path="declarations/categories/:categoryId" element={<CategoryDeclarationsPage />} />
          </Route>
          <Route path="community" element={<Community />} />
          <Route path="business-plan" element={<BusinessPlan />} />
          <Route path="business-plan/add-objective" element={<AddObjective />} />
          <Route path="transformation" element={<Transformation />} />
          <Route path="mes-donnees" element={<MyData />} />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;