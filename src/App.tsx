import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Features from "./pages/Features";
import ProductTour from "./pages/ProductTour";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import StandupSummary from "./pages/StandupSummary";
import SprintPlanning from "./pages/SprintPlanning";
import Retrospective from "./pages/Retrospective";
import TeamSettings from "./pages/TeamSettings";
import Integrations from "./pages/Integrations";
import { AuthProvider } from "./lib/authContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/features" element={<Layout><Features /></Layout>} />
            <Route path="/product-tour" element={<Layout><ProductTour /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/login" element={<Layout simple><Login /></Layout>} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout dashboard>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/standup" element={
              <ProtectedRoute>
                <Layout dashboard>
                  <StandupSummary />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/sprint-planning" element={
              <ProtectedRoute>
                <Layout dashboard>
                  <SprintPlanning />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/retrospective" element={
              <ProtectedRoute>
                <Layout dashboard>
                  <Retrospective />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/team-settings" element={
              <ProtectedRoute>
                <Layout dashboard>
                  <TeamSettings />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/integrations" element={
              <ProtectedRoute>
                <Layout dashboard>
                  <Integrations />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
