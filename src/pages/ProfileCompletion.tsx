import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useRegistration, REGISTRATION_STEPS } from '@/context/RegistrationContext';
import { submitPersonalInfo } from '@/services/steperService';
import { StepperLayout } from '@/components/StepperLayout';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { 
    token, 
    userData, 
    setUserData, 
    nextStep, 
    prevStep,
    currentStep,
    isRestoring 
  } = useRegistration();
  
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get email from context, state, or query params
  const email = userData.email || location.state?.email || searchParams.get('email');

  const isPersonalInfoSet = !!userData.personalInfo;

  useEffect(() => {
    // Pre-fill form with existing data if available
    if (userData.personalInfo) {
      setFormData(prev => ({
        ...prev,
        username: userData.personalInfo.username || '',
      }));
    }
  }, [userData.personalInfo]);

  useEffect(() => {
    // Always sync username field with userData.personalInfo.username
    if (userData.personalInfo && userData.personalInfo.username !== formData.username) {
      setFormData(prev => ({ ...prev, username: userData.personalInfo.username || '' }));
    }
  }, [userData.personalInfo]);

  const validateUsernameOnly = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateUsernameOnly()) return;
    if (!token) {
      toast({
        title: "Error",
        description: "Registration token not found. Please start over.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitPersonalInfo(token, formData);
      
      if (result?.isSuccess) {
        // Update context with the new data
        setUserData({
          personalInfo: {
            username: formData.username,
            // Don't store password in context for security
          }
        });

        toast({
          title: "Success",
          description: "Personal information saved successfully!",
        });

        // Move to next step (organization info)
        nextStep();
      } else {
        throw new Error(result?.message || 'Failed to save personal information');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save personal information",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  const handleContinue = async () => {
    if (isPersonalInfoSet) {
      if (formData.username !== userData.personalInfo?.username) {
        if (!validateUsernameOnly()) return;
        if (!token) {
          toast({
            title: "Error",
            description: "Registration token not found. Please start over.",
            variant: "destructive"
          });
          return;
        }
        setIsSubmitting(true);
        try {
          const result = await submitPersonalInfo(token, { username: formData.username, password: '', confirmPassword: '' });
          if (result?.isSuccess) {
            setUserData({
              ...userData,
              personalInfo: {
                ...userData.personalInfo,
                username: formData.username,
              }
            });
            setFormData(prev => ({ ...prev, username: formData.username }));
            toast({
              title: "Success",
              description: "Username updated successfully!",
            });
            nextStep();
          } else {
            throw new Error(result?.message || 'Failed to update username');
          }
        } catch (error) {
          console.error('Update error:', error);
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to update username",
            variant: "destructive"
          });
        } finally {
          setIsSubmitting(false);
        }
      } else {
        // Username is unchanged, always proceed
        nextStep();
      }
    } else {
      // Not personal info set, use normal submit
      handleSubmit();
    }
  };

  // Show loading state while restoring
  if (isRestoring) {
    return null; // Let StepperLayout handle the loading state
  }

  return (
    <StepperLayout
      variant="landing"
      showHeader={false}
      title="Complete Your Profile"
      description="Please provide your personal information to continue with the registration process."
      onNext={isPersonalInfoSet ? handleContinue : handleSubmit}
      onPrevious={handlePrevious}
      nextLabel={isPersonalInfoSet ? "Continue" : "Save & Continue"}
      previousLabel="Back"
      isNextDisabled={isPersonalInfoSet ? false : (!formData.username || !formData.password || !formData.confirmPassword || isSubmitting)}
      isNextLoading={isSubmitting}
    >
      <div className="space-y-5">
        {/* Email Display */}
        <div className="p-3.5 bg-muted/30 border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-accent" />
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
              <p className="text-foreground font-medium">{email}</p>
            </div>
          </div>
        </div>

        {/* Username Field */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium text-foreground">
            Username *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`pl-10 h-12 bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:border-accent ${
                errors.username ? 'border-destructive' : ''
              }`}
            />
          </div>
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password *
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`pl-10 pr-10 h-12 bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:border-accent ${
                errors.password ? 'border-destructive' : ''
              }`}
              disabled={isPersonalInfoSet}
            />
            {!isPersonalInfoSet && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            Confirm Password *
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`pl-10 pr-10 h-12 bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:border-accent ${
                errors.confirmPassword ? 'border-destructive' : ''
              }`}
              disabled={isPersonalInfoSet}
            />
            {!isPersonalInfoSet && (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>
        {isPersonalInfoSet && (
          <div className="text-sm text-muted-foreground mb-2">
            Personal info already saved. You cannot update it here. Click Continue to proceed.<br />
            Password cannot be changed here. Use password reset if needed.
          </div>
        )}
        {/* Password Requirements */}
        {!isPersonalInfoSet && (
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">Password Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Use a combination of letters, numbers, and symbols</li>
              <li>• Avoid common passwords</li>
            </ul>
          </div>
        )}
      </div>
    </StepperLayout>
  );
};

export default ProfileCompletion;
