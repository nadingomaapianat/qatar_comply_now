import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getRegistrationStatus } from '../services/steperService';

// Step definitions
export const REGISTRATION_STEPS = {
  EMAIL_SENT: 'email_sent',
  EMAIL_VERIFIED: 'email_verified',
  PERSONAL_INFO: 'personal_info',
  ORGANIZATION_INFO: 'organization_info',
  BUSINESS_OBJECTIVES: 'business_objectives',
  COMPLIANCE_OBJECTIVES: 'compliance_objectives',
  COMPLETED: 'completed',
  EXPIRED: 'expired'
} as const;

export type RegistrationStep = typeof REGISTRATION_STEPS[keyof typeof REGISTRATION_STEPS];

// Step configuration
export const STEP_CONFIG = {
  [REGISTRATION_STEPS.EMAIL_SENT]: { number: 1, title: 'Email Verification', path: '/verifyemail' },
  [REGISTRATION_STEPS.EMAIL_VERIFIED]: { number: 2, title: 'Personal Information', path: '/profile-completion' },
  [REGISTRATION_STEPS.PERSONAL_INFO]: { number: 3, title: 'Organization', path: '/know-my-org' },
  [REGISTRATION_STEPS.ORGANIZATION_INFO]: { number: 3, title: 'Organization', path: '/know-my-org' },
  [REGISTRATION_STEPS.BUSINESS_OBJECTIVES]: { number: 4, title: 'Business Objectives', path: '/know-my-org' },
  [REGISTRATION_STEPS.COMPLIANCE_OBJECTIVES]: { number: 5, title: 'Compliance Objectives', path: '/know-my-org' },
  [REGISTRATION_STEPS.COMPLETED]: { number: 6, title: 'Assessment', path: '/assessment-question' },
  [REGISTRATION_STEPS.EXPIRED]: { number: 0, title: 'Expired', path: '/auth/register' }
} as const;

interface UserData {
  email?: string;
  personalInfo?: {
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  address?: string;
  };
  organizationInfo?: {
    tenantName?: string;
    industry?: string;
    contactInfo?: any;
    objectiveId?: string;
    user_data?: any[];
    country?: string;
    city?: string;
    website?: string;
    selectedObjectives?: any[];
    selectedBusinessObjectives?: any[];
    selectedComplianceFrameworks?: any[];
    companyData?: any;
  };
  objectiveInfo?: {
    data?: any[];
  };
}

interface RegistrationContextProps {
  // State
  token: string | null;
  currentStep: RegistrationStep | null;
  stepNumber: number;
  userData: UserData;
  isLoading: boolean;
  isRestoring: boolean;
  
  // Actions
  setToken: (token: string) => void;
  setCurrentStep: (step: RegistrationStep) => void;
  setStepNumber: (number: number) => void;
  setUserData: (data: Partial<UserData>) => void;
  updateUserData: (key: keyof UserData, value: any) => void;
  
  // Navigation
  goToStep: (step: RegistrationStep, allowForward?: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Restoration
  restoreFromToken: (token: string) => Promise<void>;
  clearRegistration: () => void;
  
  // Utilities
  getStepConfig: (step: RegistrationStep) => typeof STEP_CONFIG[keyof typeof STEP_CONFIG];
  canGoToStep: (step: RegistrationStep) => boolean;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [currentStep, setCurrentStepState] = useState<RegistrationStep | null>(null);
  const [stepNumber, setStepNumberState] = useState<number>(0);
  const [userData, setUserDataState] = useState<UserData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initialize token from URL or localStorage on mount
  useEffect(() => {
    const urlToken = searchParams.get('token');
    const storedToken = localStorage.getItem('token');
    
    if (urlToken) {
      setTokenState(urlToken);
      localStorage.setItem('token', urlToken);
    } else if (storedToken) {
      setTokenState(storedToken);
    }
  }, [searchParams]);

  // Restore registration state when token changes
  useEffect(() => {
    if (token && !currentStep) {
      restoreFromToken(token);
    }
  }, [token, currentStep]);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem('token', newToken);
  };

  const setCurrentStep = (step: RegistrationStep) => {
    setCurrentStepState(step);
    setStepNumberState(STEP_CONFIG[step]?.number || 0);
  };

  const setStepNumber = (number: number) => {
    setStepNumberState(number);
  };

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState(prev => ({ ...prev, ...data }));
  };

  const updateUserData = (key: keyof UserData, value: any) => {
    setUserDataState(prev => ({ ...prev, [key]: value }));
  };

  const restoreFromToken = async (token: string) => {
    if (!token) return;
    
    setIsRestoring(true);
    try {
      const response = await getRegistrationStatus(token);
      
      if (response?.isSuccess) {
        const { step, stepNumber: backendStepNumber, email, personalInfo, organizationInfo, objectiveInfo, token: jwtToken } = response.data;
        
        setCurrentStep(step as RegistrationStep);
        setStepNumber(backendStepNumber || STEP_CONFIG[step as RegistrationStep]?.number || 0);
        setUserData({
          email,
          personalInfo,
          organizationInfo,
          objectiveInfo
        });
        
        // If completed, store the JWT token
        if (jwtToken) {
          localStorage.setItem('token', jwtToken);
        }
        
        // Navigate to correct step if not already there
        const currentPath = window.location.pathname;
        let targetPath = STEP_CONFIG[step as RegistrationStep]?.path;
        let stepToSet = step as RegistrationStep;
        
        // If step is organization_info, navigate to assessment and set step to completed
        if (step === REGISTRATION_STEPS.ORGANIZATION_INFO) {
          targetPath = '/assessment-question';
          stepToSet = REGISTRATION_STEPS.COMPLETED;
          setCurrentStep(stepToSet);
        }
        
        if (targetPath && currentPath !== targetPath) {
          navigate(targetPath, { state: { token, email } });
        }
      } else {
        throw new Error(response?.message || 'Failed to restore registration');
      }
    } catch (error) {
      console.error('Failed to restore registration:', error);
      clearRegistration();
      navigate('/auth/register');
    } finally {
      setIsRestoring(false);
    }
  };

  const clearRegistration = () => {
    setTokenState(null);
    setCurrentStepState(null);
    setStepNumberState(0);
    setUserDataState({});
    localStorage.removeItem('token');
  };

  const goToStep = (step: RegistrationStep, allowForward = false) => {
    if (!allowForward && !canGoToStep(step)) return;
    setCurrentStep(step);
    const path = STEP_CONFIG[step]?.path;
    if (path && token) {
      navigate(`${path}?token=${token}`, { 
        state: { token, email: userData.email } 
      });
    }
  };

  const nextStep = () => {
    if (!currentStep) return;
    const steps = Object.values(REGISTRATION_STEPS);
    const currentIndex = steps.indexOf(currentStep);
    const nextStep = steps[currentIndex + 1];
    if (nextStep && nextStep !== REGISTRATION_STEPS.EXPIRED) {
      goToStep(nextStep, true);
    }
  };

  const prevStep = () => {
    if (!currentStep) return;
    
    const steps = Object.values(REGISTRATION_STEPS);
    const currentIndex = steps.indexOf(currentStep);
    const prevStep = steps[currentIndex - 1];
    
    if (prevStep && prevStep !== REGISTRATION_STEPS.EXPIRED) {
      goToStep(prevStep);
    }
  };

  const getStepConfig = (step: RegistrationStep) => {
    return STEP_CONFIG[step];
  };

  const canGoToStep = (step: RegistrationStep) => {
    if (!currentStep) return false;
    
    const currentStepNumber = STEP_CONFIG[currentStep]?.number || 0;
    const targetStepNumber = STEP_CONFIG[step]?.number || 0;
    
    // Can go to previous steps or current step
    return targetStepNumber <= currentStepNumber;
  };

  const value: RegistrationContextProps = {
    token,
    currentStep,
    stepNumber,
    userData,
    isLoading,
    isRestoring,
    setToken,
    setCurrentStep,
    setStepNumber,
    setUserData,
    updateUserData,
    goToStep,
    nextStep,
    prevStep,
    restoreFromToken,
    clearRegistration,
    getStepConfig,
    canGoToStep
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};
