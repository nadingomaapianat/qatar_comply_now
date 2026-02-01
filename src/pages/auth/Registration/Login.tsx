import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { requestRegistrationPasswordReset } from "@/services/userServicer";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   const res = await loginWithPassword(email, password);
    //   if (res.isSuccess) {
    //     toast({ title: 'Logged in!', description: 'Welcome back.' });
    //     navigate('/dashboard');
    //   } else {
    //     toast({ title: 'Error', description: res.message });
    //   }
    // } catch {
    //   toast({ title: 'Server error', description: 'Try again later.' });
    // }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Enter your email', description: 'Please enter your email address to reset your password.' });
      return;
    }
    try {
      await requestRegistrationPasswordReset(email);
      toast({ title: 'Check your email', description: 'Password reset link sent. Please check your email.' });
      // navigate('/reset-password');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to request password reset.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F4F7] to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-6">
            {/* Logo above Welcome Back */}
            <div className="mb-4 flex justify-center">
              <img 
                src="/Comply now logo.png" 
                alt="Comply now logo" 
                className="h-12 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-[#003399] mb-2">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600">
              Sign in to continue your Egypt compliance journey
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-[#14B8A6]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-[#14B8A6]"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#14B8A6] hover:bg-[#0d9488] text-white h-12 text-lg font-semibold"
              >
                Login
              </Button>
              <div className="text-center mt-2">
                <button
                  type="button"
                  className="text-sm text-[#0077B5] hover:underline bg-transparent border-none outline-none cursor-pointer"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <Link to="/auth/register" className="text-sm text-[#0077B5] hover:underline">
                Don’t have an account? Register here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
