import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Hero } from './components/landing/Hero';
import { Benefits } from './components/landing/Benefits';
import { HowItWorks } from './components/landing/HowItWorks';
import { UseCases } from './pages/UseCases';
import { Results } from './pages/Results';
import { Signup } from './components/Signup';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Messagerie } from './components/dashboard/Messagerie';
import { BusinessPlan } from './components/dashboard/BusinessPlan';
import { TransformationsList } from './components/dashboard/TransformationsList';
import { TransformationView } from './components/dashboard/TransformationView';
import { MyData } from './components/data/MyData';
import { Login } from './components/Login';
import { LandingNav } from './components/navigation/LandingNav';
import { SignupFlow } from './components/auth/SignupFlow';
import AIChatInterface from './pages/AIChatInterface';
import { useAuth } from './context/AuthContext';
import { DeclarationDetails } from './components/dashboard/declarations/DeclarationDetails';
import { DeclarationDetailsPage } from './pages/DeclarationDetailsPage';
import { DeclarationOverview } from './pages/DeclarationOverview';
import { CategoryDeclarationsPage } from './pages/CategoryDeclarationsPage';
import { PublicDeclarations } from './components/dashboard/declarations/PublicDeclarations';
import { AddObjective } from './components/business-plan/AddObjective';
import { FinancialPlanDetailsPage } from './pages/FinancialPlanDetailsPage';
import { FinancialDetailsPage } from './components/business-plan/FinancialDetailsPage';
import { CropDetailsPage } from './components/business-plan/CropDetailsPage';
import { RiskOpportunityEvolution } from './components/business-plan/RiskOpportunityEvolution';
import { DiscussionDetails } from './components/dashboard/DiscussionDetails';
import { TableauDeBord } from './pages/TableauDeBord';
import { Reglementations } from './pages/Reglementations';
import { RisksAndOpportunities } from './components/business-plan/RisksAndOpportunities';
import { Equipe } from './pages/Equipe';
import { BankDashboard } from './pages/BankDashboard';
import { Agriculteurs } from './pages/Agriculteurs';
import { AgriculteurProfile } from './pages/AgriculteurProfile';
import { ESGDashboard } from './pages/ESGDashboard';
import { EmitterProfile } from './pages/EmitterProfile';
import { PublicAIChat } from './pages/PublicAIChat';
import { MarketAnalysis } from './pages/MarketAnalysis';
import { OrgePrice } from './pages/OrgePrice';
import { QueryResultPage } from '@/pages/QueryResultPage';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Check if we're on traditional landing pages
  const landingPaths = ['/landing', '/use-cases', '/results', '/equipe'];
  const isLandingRoute = landingPaths.includes(location.pathname);

  // Show traditional landing layout if on landing routes
  if (isLandingRoute) {
    return (
      <div className="min-h-screen bg-white">
        <LandingNav />
        <Routes>
          <Route path="/landing" element={
            <>
              <Hero />
              <Benefits />
              <HowItWorks />
            </>
          } />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/results" element={<Results />} />
          <Route path="/equipe" element={<Equipe />} />
        </Routes>
      </div>
    );
  }

  // Auth routes
  if (['/login', '/signup', '/auth/signup-flow'].includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/ai-chat" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/ai-chat" />} />
        <Route path="/auth/signup-flow" element={!isAuthenticated ? <SignupFlow /> : <Navigate to="/ai-chat" />} />
      </Routes>
    );
  }

  // Main app routes
  return (
    <Routes>
      {/* AI Chat as primary landing */}
      <Route path="/" element={<PublicAIChat />} />
      <Route path="/market-analysis" element={<MarketAnalysis />} />
      <Route path="/landing" element={
        <>
          <Hero />
          <Benefits />
          <HowItWorks />
        </>
      } />
      <Route path="/orge-price" element={<OrgePrice />} />

      {/* Protected Routes */}
      <Route path="/ai-chat" element={isAuthenticated ? <AIChatInterface /> : <Navigate to="/login" />} />
      <Route path="/*" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
        {/* Dashboard is now the main route after login */}
        <Route path="tableau-de-bord" element={<TableauDeBord />} />
        
        {/* Dashboard sub-routes */}
        <Route path="declarations/:id" element={<DeclarationDetailsPage />} />
        <Route path="declarations/categories/:categoryId" element={<CategoryDeclarationsPage />} />
        <Route path="categories/:categoryId/declarations/:declarationId/overview" element={<DeclarationOverview />} />
        <Route path="categories/:categoryId/declarations/:declarationId/details" element={<DeclarationDetailsPage />} />
        <Route path="bank-dashboard" element={<BankDashboard />} />
        <Route path="agriculteurs" element={<Agriculteurs />} />
        <Route path="esg-dashboard" element={<ESGDashboard />} />
        <Route path="esg-dashboard/emitter/:id" element={<EmitterProfile />} />
        <Route path="agriculteurs/:agriculteurId" element={<AgriculteurProfile />} />
        <Route path="agriculteurs/:agriculteurId/risks/:riskId" element={<RiskOpportunityEvolution />} />
        <Route path="agriculteurs/:agriculteurId/opportunities/:opportunityId" element={<RiskOpportunityEvolution />} />
        <Route path="agriculteurs/:agriculteurId/business-plan" element={<BusinessPlan />} />
        <Route path="agriculteurs/:agriculteurId/transformations/:transformationId" element={<TransformationView />} />
        <Route path="reglementations" element={<Reglementations />} />
        <Route path="messagerie" element={<Messagerie />} />
        <Route path="messagerie/discussion/:id" element={<DiscussionDetails />} />
        <Route path="business-plan" element={<BusinessPlan />} />
        <Route path="business-plan/add-objective" element={<AddObjective />} />
        <Route path="business-plan/financial-details" element={<FinancialDetailsPage />} />
        <Route path="business-plan/financial-details/crop/:cropName" element={<CropDetailsPage />} />
        <Route path="business-plan/financial-plan-details" element={<FinancialPlanDetailsPage />} />
        <Route path="business-plan/risks-opportunities" element={<RisksAndOpportunities />} />
        <Route path="equipe" element={<Equipe />} />
        <Route path="transformations" element={<TransformationsList />} />
        <Route path="transformations/:id" element={<TransformationView />} />
        <Route path="my-data" element={<MyData />} />
        <Route path="declarations/:id/details" element={<DeclarationDetails />} />
      </Route>

      {/* Public Routes */}
      <Route path="/public-chat" element={<PublicAIChat />} />
      <Route path="/query-result" element={<QueryResultPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-flow" element={<SignupFlow />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/ai-chat" : "/"} />} />
    </Routes>
  );
}

export default App;