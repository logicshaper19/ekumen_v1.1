import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Hero } from './components/landing/Hero';
import { Benefits } from './components/landing/Benefits';
import { HowItWorks } from './components/landing/HowItWorks';
import { Signup } from './components/Signup';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Messagerie } from './components/dashboard/Messagerie';
import { BusinessPlan } from './components/dashboard/BusinessPlan';
import { Transformation } from './components/dashboard/Transformation';
import { TransformationView } from './components/dashboard/TransformationView';
import { MyData } from './components/data/MyData';
import { Login } from './components/Login';
import { LandingNav } from './components/navigation/LandingNav';
import { SignupFlow } from './components/auth/SignupFlow';
import { useAuth } from './context/AuthContext';
import { DeclarationDetails } from './components/dashboard/declarations/DeclarationDetails';
import { DeclarationDetailsPage } from './pages/DeclarationDetailsPage';
import { DeclarationOverview } from './pages/DeclarationOverview';
import { CategoryDeclarationsPage } from './pages/CategoryDeclarationsPage';
import { PublicDeclarations } from './components/dashboard/declarations/PublicDeclarations';
import { AddObjective } from './components/business-plan/AddObjective';
import { FinancialPlanDetailsPage } from './pages/FinancialPlanDetailsPage';
import { CropDetailsPage } from './pages/CropDetailsPage';
import { RiskOpportunityEvolution } from './components/business-plan/RiskOpportunityEvolution';
import { DiscussionDetails } from './components/dashboard/DiscussionDetails';
import { TableauDeBord } from './pages/TableauDeBord';
import { Reglementations } from './pages/Reglementations';
import { Declarations } from './components/dashboard/Declarations';

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
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/tableau-de-bord" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/tableau-de-bord" />} />
        <Route path="/auth/signup-flow" element={!isAuthenticated ? <SignupFlow /> : <Navigate to="/tableau-de-bord" />} />
        
        {/* Protected Routes */}
        <Route path="/*" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/tableau-de-bord" replace />} />
          <Route path="declarations/:id" element={<DeclarationDetailsPage />} />
          <Route path="declarations/categories/:categoryId" element={<CategoryDeclarationsPage />} />
          <Route path="categories/:categoryId/declarations/:declarationId/overview" element={<DeclarationOverview />} />
          <Route path="categories/:categoryId/declarations/:declarationId/details" element={<DeclarationDetailsPage />} />
          <Route path="tableau-de-bord" element={<TableauDeBord />} />
          <Route path="reglementations" element={<Reglementations />} />
          <Route path="messagerie" element={<Messagerie />} />
          <Route path="messagerie/discussion/:id" element={<DiscussionDetails />} />
          <Route path="business-plan" element={<BusinessPlan />} />
          <Route path="business-plan/add-objective" element={<AddObjective />} />
          <Route path="business-plan/financial-plan-details" element={<FinancialPlanDetailsPage />} />
          <Route path="business-plan/financial-plan-details/crop/:cropName" element={<CropDetailsPage />} />
          <Route path="business-plan/risks-opportunities/:id" element={<RiskOpportunityEvolution />} />
          <Route path="transformation" element={<Transformation />} />
          <Route path="transformation/:id" element={<TransformationView />} />
          <Route path="mes-donnees" element={<MyData />} />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;