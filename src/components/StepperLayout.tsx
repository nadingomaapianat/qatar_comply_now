import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { RegistrationStepper } from '@/components/ui/stepper';
import { useRegistration, REGISTRATION_STEPS } from '@/context/RegistrationContext';
import Header from '@/components/Header';
import ParticleField from '@/components/animations/ParticleField';

interface StepperLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  isNextDisabled?: boolean;
  isNextLoading?: boolean;
  showStepper?: boolean;
  variant?: 'default' | 'landing' | 'light';
  /** When variant is landing, set to false to hide the nav bar (e.g. when using the stepper). Default true. */
  showHeader?: boolean;
  className?: string;
}

export const StepperLayout: React.FC<StepperLayoutProps> = ({
  children,
  title,
  description,
  onNext,
  onPrevious,
  nextLabel = 'Continue',
  previousLabel = 'Back',
  isNextDisabled = false,
  isNextLoading = false,
  showStepper = true,
  variant = 'default',
  showHeader = true,
  className = ''
}) => {
  const { 
    currentStep, 
    stepNumber, 
    goToStep, 
    canGoToStep,
    isRestoring 
  } = useRegistration();

  const handleStepClick = (step: string) => {
    if (canGoToStep(step as any)) {
      goToStep(step as any);
    }
  };

  const isLanding = variant === 'landing';

  if (isRestoring) {
    return (
      <div className={`min-h-screen flex flex-col ${isLanding ? 'bg-background' : 'bg-[#F2F4F7]'}`}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className={`w-12 h-12 animate-spin mx-auto ${isLanding ? 'text-accent' : 'text-[#14B8A6]'}`} />
            <h4 className={`text-xl font-semibold ${isLanding ? 'text-foreground' : 'text-gray-700'}`}>Restoring your progress</h4>
            <p className={isLanding ? 'text-muted-foreground' : 'text-gray-500'}>Please wait while we load your registration data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col relative ${isLanding ? 'bg-background' : 'bg-[#F2F4F7]'} ${className}`}>
      {isLanding && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <ParticleField className="absolute inset-0 w-full h-full" particleCount={40} color="green" />
        </div>
      )}

      {isLanding && showHeader && <Header />}
      {!isLanding && (
        <header className="bg-white border-b border-gray-200 shadow-sm relative z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-bold text-[#003399]">EG.Portal</h3>
                <Badge className="bg-[#14B8A6] text-white border-none">Egypt Edition</Badge>
                <img src="/Comply now logo.png" alt="Comply now logo" className="h-8 w-auto" />
              </div>
              {currentStep && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Step {stepNumber} of 4</p>
                  <p className="text-xs text-gray-500">Registration Progress</p>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {showStepper && currentStep && (
        <div className={`relative z-10 ${isLanding ? 'glass border-b border-border' : 'bg-white border-b border-gray-100'}`}>
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <RegistrationStepper
              currentStep={currentStep}
              onStepClick={handleStepClick}
              variant={isLanding ? 'dark' : 'default'}
              className="max-w-4xl mx-auto"
            />
          </div>
        </div>
      )}

      <main className={`flex-1 relative z-10 flex flex-col min-h-0 ${isLanding && showHeader ? 'pt-32' : isLanding ? 'pt-4' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 py-4 flex-1 flex flex-col min-h-0">
          <div className={`mx-auto flex-1 flex flex-col min-h-0 w-full ${isLanding ? 'max-w-4xl' : 'max-w-2xl'}`}>
            <div className="mb-4">
              <h1 className={`text-2xl sm:text-3xl font-bold mb-0.5 ${isLanding ? 'text-foreground' : 'text-gray-900'}`}>{title}</h1>
              {description && (
                <p className={`text-sm sm:text-base ${isLanding ? 'text-muted-foreground' : 'text-gray-600'}`}>{description}</p>
              )}
            </div>

            <div className={`rounded-xl p-4 sm:p-5 flex-1 flex flex-col min-h-0 ${isLanding ? 'glass border border-border' : 'bg-white shadow-sm border border-gray-200'}`}>
              {children}
            </div>

            <div className="flex items-center justify-between mt-4 shrink-0">
              <div className="flex-1">
                {onPrevious && (
                  <Button
                    variant="outline"
                    onClick={onPrevious}
                    className={isLanding ? 'flex items-center space-x-2 border-border text-foreground hover:bg-muted' : 'flex items-center space-x-2'}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{previousLabel}</span>
                  </Button>
                )}
              </div>
              <div className="flex-1 flex justify-end">
                {onNext && (
                  <Button
                    onClick={onNext}
                    disabled={isNextDisabled || isNextLoading}
                    className={isLanding ? 'flex items-center space-x-2 btn-gradient text-white' : 'flex items-center space-x-2 bg-[#14B8A6] hover:bg-[#0d9488] text-white'}
                  >
                    {isNextLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    <span>{nextLabel}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Compact version for smaller screens
export const CompactStepperLayout: React.FC<StepperLayoutProps> = ({
  children,
  title,
  description,
  onNext,
  onPrevious,
  nextLabel = 'Continue',
  previousLabel = 'Back',
  isNextDisabled = false,
  isNextLoading = false,
  className = ''
}) => {
  const { currentStep, stepNumber, isRestoring } = useRegistration();

  if (isRestoring) {
    return (
      <div className="min-h-screen bg-[#F2F4F7] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-[#14B8A6] animate-spin mx-auto" />
            <h4 className="text-xl font-semibold text-gray-700">Restoring your progress</h4>
            <p className="text-gray-500">Please wait while we load your registration data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F2F4F7] flex flex-col ${className}`}>
      {/* Compact Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/Comply now logo.png" 
              alt="Comply now logo" 
              className="h-6 w-auto"
            />
            <h3 className="text-lg font-bold text-[#003399]">EG.Portal</h3>
          </div>
          {currentStep && (
            <Badge variant="secondary" className="text-xs">
              Step {stepNumber}/
            </Badge>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {children}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex-1">
              {onPrevious && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrevious}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{previousLabel}</span>
                </Button>
              )}
            </div>

            <div className="flex-1 flex justify-end">
              {onNext && (
                <Button
                  size="sm"
                  onClick={onNext}
                  disabled={isNextDisabled || isNextLoading}
                  className="flex items-center space-x-2 bg-[#14B8A6] hover:bg-[#0d9488] text-white"
                >
                  {isNextLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  <span>{nextLabel}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 