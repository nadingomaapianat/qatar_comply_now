import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRegistration } from '@/context/RegistrationContext';
import { useNavigate } from 'react-router-dom';
import { initiateRegistration, getRegistrationStatus } from '@/services/steperService';
import Header from '@/components/Header';
import ParticleField from '@/components/animations/ParticleField';
import { motion } from 'framer-motion';

const Registration = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const { setToken, setCurrentStep, setUserData } = useRegistration();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await initiateRegistration(email);

      if (result?.isSuccess) {
        const { step, token, email: userEmail } = result.data;

        setToken(token);
        setCurrentStep(step);
        setUserData({ email: userEmail });

        if (step === "completed") {
          try {
            // Get the token from registration-steps/status endpoint
            const statusResult = await getRegistrationStatus(token);
              const statusToken = statusResult.data.token;
              
              // Save the token from status endpoint
              setToken(statusToken); 
              navigate("/checkSteps?token=" + statusToken, { 
                state: { registrationData: statusResult.data } 
              });
         
          } catch (error) {
            console.error("Error fetching registration status:", error);
            // Fallback to original token on error
            toast({
              title: "Check regtech app",
              description: "You can login to regtech app",
            });
            navigate("/checkSteps?token=" + token, { 
              state: { registrationData: result.data } 
            });
          }
        } else if (step === "email_sent") {
          toast({
            title: "Check your email",
            description: "Click the magic link to continue registration.",
          });
        } else {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <ParticleField particleCount={60} color="green" />
        </div>
        <Loader2 className="w-12 h-12 text-accent animate-spin relative z-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 opacity-40">
          <ParticleField particleCount={60} color="green" />
        </div>

        <div className="section-container relative z-10 flex justify-center px-4">
          <motion.div
            className="w-full max-w-[420px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass rounded-2xl border border-border/50 overflow-hidden">
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 md:px-8 md:pt-8 md:pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
                  <span className="text-base">🇶🇦</span>
                  <span className="text-xs font-medium text-muted-foreground">Qatar Compliance</span>
                  <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                  Get Started
                </h1>
                <p className="text-sm text-muted-foreground mt-1.5">
                  Create your account to begin your Qatar compliance journey
                </p>
              </div>

              {/* Form section */}
              <form onSubmit={handleEmailSubmit} className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Business Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-gradient h-11 text-sm font-medium rounded-xl text-white gap-2 mt-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Continue with Email
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Card footer */}
              <div className="px-6 py-4 md:px-8 md:py-5 bg-background/30 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
