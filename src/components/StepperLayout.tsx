import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { RegistrationStepper } from '@/components/ui/stepper';
import { useRegistration, REGISTRATION_STEPS } from '@/context/RegistrationContext';

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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-bold text-[#003399]">EG.Portal</h3>
              <Badge className="bg-[#14B8A6] text-white border-none">Egypt Edition</Badge>
              <img 
                src="/Comply now logo.png" 
                alt="Comply now logo" 
                className="h-8 w-auto"
              />
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

      {/* Stepper */}
      {showStepper && currentStep && (
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 py-6">
            <RegistrationStepper
              currentStep={currentStep}
              onStepClick={handleStepClick}
              className="max-w-4xl mx-auto"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              {description && (
                <p className="text-lg text-gray-600">{description}</p>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {children}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex-1">
                {onPrevious && (
                  <Button
                    variant="outline"
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