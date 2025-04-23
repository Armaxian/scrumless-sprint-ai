import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/lib/authContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { login, error, loading, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [demoLoading, setDemoLoading] = useState(false);
  
  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Handle OAuth redirect
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      const provider = queryParams.get('provider');

      if (code && provider) {
        try {
          await login(provider, code);
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          navigate(from, { replace: true });
        } catch (err) {
          toast({
            title: "Login failed",
            description: "Please try again",
            variant: "destructive",
          });
        }
      }
    };

    handleOAuthRedirect();
  }, []);

  const handleProviderLogin = (provider: string) => {
    // In a real app, redirect to OAuth provider
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}/authorize`;
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    try {
      // Simulate demo login with a delay
      setTimeout(async () => {
        await login('demo', 'demo-token');
        toast({
          title: "Demo mode activated",
          description: "Welcome to the demo environment!",
        });
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      toast({
        title: "Could not start demo",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to <span className="text-teal-500">scrumless.ai</span></h1>
          <p className="text-muted-foreground">Sign in to start automating your agile process</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Choose your preferred authentication method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3"
              onClick={() => handleProviderLogin('slack')}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>
              </svg>
              Continue with Slack
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3"
              onClick={() => handleProviderLogin('microsoft')}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <rect width="3" height="8" x="7" y="7"></rect>
                <rect width="3" height="14" x="14" y="7"></rect>
              </svg>
              Continue with Microsoft Teams
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3"
              onClick={() => handleProviderLogin('github')}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              Continue with GitHub
            </Button>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button 
              className="w-full bg-teal-500 hover:bg-teal-400 text-black"
              onClick={handleDemoLogin}
              disabled={loading || demoLoading}
            >
              {demoLoading ? (
                <span className="flex items-center">
                  <Spinner className="mr-2 h-4 w-4" /> 
                  Loading Demo...
                </span>
              ) : "Try Demo Mode"}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center text-xs text-muted-foreground">
            For press and VCs. No account required.
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
