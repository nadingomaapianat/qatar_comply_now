import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { linkedinLogin, sendMagicLinkEmail } from '@/services/register';
import { useRegistration } from '@/context/RegistrationContext';
import { Link, useNavigate } from 'react-router-dom';
import { initiateRegistration } from '@/services/steperService';

const Registration = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const processedRef = useRef(false);
  const { setToken, setCurrentStep, setUserData } = useRegistration();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
      if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
    }
    const result = await initiateRegistration(email);
    console.log("Registration result:", result);

    if (result?.isSuccess) {
     
        const { step, token, email: userEmail } = result.data;

        // Update context with initial data
        setToken(token);
        setCurrentStep(step);
        setUserData({ email: userEmail });

        if (step === "completed") {
          toast({
            title: "check regtech app",
            description: "you can login to regtech app",
          });
          // User already exists and is fully registered - pass data so checkSteps can use it without calling the status API
          navigate("/checkSteps?token=" + token, { state: { registrationData: result.data } });
        } else if (step === "email_sent") {
          // New user - magic link sent
          toast({
            title: "Check your email",
            description: "Click the magic link to continue registration.",
          });
        } else {
          // User in progress - navigate to check steps and pass data so status API is optional
          navigate("/checkSteps?token=" + token, { state: { registrationData: result.data } });
        }
      } else {
        throw new Error(result?.message || 'Failed to initiate registration');
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Server Error",
        description: error instanceof Error ? error.message : "Unable to send magic link at the moment.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInSignIn = () => {
       const clientId = '77b5hjpa1mf3jx';
    const redirectUri = `${import.meta.env.VITE_REACT_APP_URL}/auth/register`;
    const scope = 'profile email openid w_member_social';
    window.location.href =
      `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-[#14B8A6] animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F4F7] to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-6">
            {/* Logo above Get Started with EG.Portal */}
            <div className="mb-4 flex justify-center">
              <img 
                src="/Comply now logo.png" 
                alt="Comply now logo" 
                className="h-12 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-[#003399] mb-2">
              Get Started with EG.Portal
            </CardTitle>
            <p className="text-gray-600">
              Create your account to begin your Egypt compliance journey
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Business Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-[#14B8A6]"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#14B8A6] hover:bg-[#0d9488] text-white h-12 text-lg font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue with Email'
                )}
              </Button>
              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="text-sm text-[#0077B5] hover:underline"
                >
                  Already have an account? Login here
                </Link>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              {/* <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div> */}
            </div>

            {/* <Button
              onClick={handleLinkedInSignIn}
              variant="outline"
              className="w-full h-12 text-lg font-semibold border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Sign in with LinkedIn
            </Button> */}

            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Registration;