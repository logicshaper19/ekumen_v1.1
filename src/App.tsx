import React from 'react';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { SignupForm } from './components/SignupForm';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Community } from './components/dashboard/Community';
import { BusinessPlan } from './components/dashboard/BusinessPlan';
import { Transformation } from './components/dashboard/Transformation';
import { MyData } from './components/dashboard/MyData';
import { Login } from './components/Login';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LandingNav } from './components/navigation/LandingNav';
import { HowItWorks } from './components/HowItWorks';

function App() {
  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={
          <>
            <LandingNav />
            <Hero />
            <HowItWorks />
            <Benefits />
          </>
        } />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="declarations" element={<Dashboard />} />
          <Route path="community" element={<Community />} />
          <Route path="business-plan" element={<BusinessPlan />} />
          <Route path="transformation" element={<Transformation />} />
          <Route path="my-data" element={<MyData />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;