import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming' | 'error';
}

interface StepperProps {
  steps: StepperStep[];
  currentStepIndex: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  showStepNumbers?: boolean;
  showStepDescriptions?: boolean;
  variant?: 'horizontal' | 'vertical';
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  className,
  showStepNumbers = true,
  showStepDescriptions = true,
  variant = 'horizontal'
}) => {
  const getStepStatus = (index: number): StepperStep['status'] => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'upcoming';
  };

  const handleStepClick = (index: number) => {
    if (onStepClick && index <= currentStepIndex) {
      onStepClick(index);
    }
  };

  if (variant === 'vertical') {
    return (
      <div className={cn('space-y-4', className)}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isClickable = index <= currentStepIndex && onStepClick;
          
          return (
            <div key={step.id} className="flex items-start space-x-3">
              {/* Step indicator */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200',
                    {
                      'bg-green-500 border-green-500 text-white cursor-pointer hover:bg-green-600': status === 'completed',
                      'bg-blue-500 border-blue-500 text-white cursor-default': status === 'current',
                      'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed': status === 'upcoming',
                      'bg-red-500 border-red-500 text-white': status === 'error'
                    }
                  )}
                >
                  {status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    'text-left w-full transition-colors duration-200',
                    {
                      'cursor-pointer hover:text-blue-600': isClickable,
                      'cursor-not-allowed': !isClickable
                    }
                  )}
                >
                  <h3 className={cn(
                    'text-sm font-medium',
                    {
                      'text-green-600': status === 'completed',
                      'text-blue-600': status === 'current',
                      'text-gray-500': status === 'upcoming',
                      'text-red-600': status === 'error'
                    }
                  )}>
                    {step.title}
                  </h3>
                  {showStepDescriptions && step.description && (
                    <p className={cn(
                      'text-xs mt-1',
                      {
                        'text-green-500': status === 'completed',
                        'text-blue-500': status === 'current',
                        'text-gray-400': status === 'upcoming',
                        'text-red-500': status === 'error'
                      }
                    )}>
                      {step.description}
                    </p>
                  )}
                </button>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className={cn(
                  'absolute left-4 top-8 w-0.5 h-8 transition-colors duration-200',
                  {
                    'bg-green-500': index < currentStepIndex,
                    'bg-gray-200': index >= currentStepIndex
                  }
                )} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isClickable = index <= currentStepIndex && onStepClick;
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200',
                    {
                      'bg-green-500 border-green-500 text-white cursor-pointer hover:bg-green-600': status === 'completed',
                      'bg-blue-500 border-blue-500 text-white cursor-default': status === 'current',
                      'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed': status === 'upcoming',
                      'bg-red-500 border-red-500 text-white': status === 'error'
                    }
                  )}
                >
                  {status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                
                <div className="mt-2 text-center">
                  <h3 className={cn(
                    'text-sm font-medium',
                    {
                      'text-green-600': status === 'completed',
                      'text-blue-600': status === 'current',
                      'text-gray-500': status === 'upcoming',
                      'text-red-600': status === 'error'
                    }
                  )}>
                    {step.title}
                  </h3>
                  {showStepDescriptions && step.description && (
                    <p className={cn(
                      'text-xs mt-1 max-w-24',
                      {
                        'text-green-500': status === 'completed',
                        'text-blue-500': status === 'current',
                        'text-gray-400': status === 'upcoming',
                        'text-red-500': status === 'error'
                      }
                    )}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="flex-1 mx-4">
                  <div className={cn(
                    'h-0.5 transition-colors duration-200',
                    {
                      'bg-green-500': index < currentStepIndex,
                      'bg-gray-200': index >= currentStepIndex
                    }
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// Registration-specific stepper component
interface RegistrationStepperProps {
  currentStep: string;
  onStepClick?: (step: string) => void;
  className?: string;
  /** Use 'dark' for landing/dark theme (accent colors, compact). */
  variant?: 'default' | 'dark';
}

export const RegistrationStepper: React.FC<RegistrationStepperProps> = ({
  currentStep,
  onStepClick,
  className,
  variant = 'default'
}) => {
  const isDark = variant === 'dark';
  const steps = [
    {
      id: 'email_sent',
      title: 'Email Verification',
      description: 'Verify your email address'
    },
    {
      id: 'email_verified',
      title: 'Personal Info',
      description: 'Complete your profile'
    },
    {
      id: 'personal_info',
      title: 'Organization',
      description: 'Tell us about your company'
    },
    {
      id: 'organization_info',
      title: 'Organization',
      description: 'Tell us about your company'
    },
    {
      id: 'business_objectives',
      title: 'Business Objectives',
      description: 'Select your business objectives'
    },
    {
      id: 'compliance_objectives',
      title: 'Compliance Objectives',
      description: 'Select compliance frameworks'
    },
    {
      id: 'completed',
      title: 'Assessment',
      description: 'Complete your assessment'
    }
  ];

  // Filter steps to show only unique ones (remove duplicate organization steps)
  // We want: email_sent, email_verified, organization (one of personal_info/organization_info), business_objectives, compliance_objectives, completed
  const displaySteps = [
    steps[0], // email_sent
    steps[1], // email_verified
    steps.find(s => s.id === 'organization_info') || steps.find(s => s.id === 'personal_info') || steps[2], // organization step
    steps.find(s => s.id === 'business_objectives') || steps[4], // business_objectives
    steps.find(s => s.id === 'compliance_objectives') || steps[5], // compliance_objectives
    steps.find(s => s.id === 'completed') || steps[6] // completed/assessment
  ].filter(Boolean); // Remove any undefined entries

  // Map current step to display step index
  const getDisplayStepIndex = (stepId: string) => {
    // Map personal_info to the organization display step (index 2)
    if (stepId === 'personal_info') {
      return 2;
    }
    // Map organization_info to assessment step (index 5) since organization is complete
    if (stepId === 'organization_info') {
      return 5; // Assessment step (completed)
    }
    // Find the step in displaySteps
    const foundIndex = displaySteps.findIndex(step => step.id === stepId);
    return foundIndex >= 0 ? foundIndex : -1;
  };

  const currentStepIndex = getDisplayStepIndex(currentStep);
  const adjustedIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  const handleStepClick = (index: number) => {
    const targetStep = displaySteps[index];
    if (!targetStep) return;
    
    // Only allow clicking 'Email Verification' if currently at 'email_sent'
    if (
      targetStep.id === 'email_sent' &&
      currentStep !== 'email_sent'
    ) {
      return; // Do nothing
    }
    if (onStepClick && index <= adjustedIndex) {
      const targetStepId = targetStep.id;
      // Map display step to actual step IDs
      if (targetStepId === 'personal_info' || targetStepId === 'organization_info') {
        // Always use organization_info for navigation
        onStepClick('organization_info');
      } else {
        onStepClick(targetStepId);
      }
    }
  };

  const stepperSteps: StepperStep[] = steps.map((step, index) => ({
    ...step,
    status: (index < adjustedIndex ? 'completed' : index === adjustedIndex ? 'current' : 'upcoming') as 'completed' | 'current' | 'upcoming' | 'error'
  }));

  // Dark variant: design tokens for landing theme; default: original colors
  const stepCircleClass = (status: string, clickable: boolean) => {
    if (isDark) {
      return cn(
        'flex items-center justify-center rounded-full border-2 transition-all duration-200 shrink-0',
        status === 'completed' && 'bg-accent border-accent text-background cursor-default',
        status === 'current' && 'bg-accent border-accent text-background ring-2 ring-accent/40 ring-offset-2 ring-offset-background cursor-default',
        status === 'upcoming' && 'bg-muted/60 border-border text-muted-foreground cursor-not-allowed',
        status === 'error' && 'bg-destructive border-destructive text-destructive-foreground',
        clickable && status !== 'upcoming' && 'cursor-pointer hover:opacity-90'
      );
    }
    return cn(
      'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200',
      status === 'completed' && 'bg-green-500 border-green-500 text-white cursor-pointer hover:bg-green-600',
      status === 'current' && 'bg-blue-500 border-blue-500 text-white cursor-default',
      status === 'upcoming' && 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed',
      status === 'error' && 'bg-red-500 border-red-500 text-white'
    );
  };

  const stepSize = isDark ? 'w-9 h-9' : 'w-10 h-10';
  const iconSize = isDark ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-0">
        {displaySteps.map((step, index) => {
          const status = (index < adjustedIndex ? 'completed' : index === adjustedIndex ? 'current' : 'upcoming') as 'completed' | 'current' | 'upcoming' | 'error';
          const isEmailVerification = step.id === 'email_sent';
          const isClickable =
            !isEmailVerification
              ? index <= adjustedIndex && !!onStepClick
              : currentStep === 'email_sent' && !!onStepClick;
          const isLast = index === displaySteps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center min-w-0 flex-1">
                {isClickable ? (
                  <button
                    type="button"
                    onClick={() => handleStepClick(index)}
                    className={cn(stepSize, stepCircleClass(status, true))}
                  >
                    {status === 'completed' ? (
                      <Check className={iconSize} />
                    ) : (
                      <span className="text-xs font-semibold">{index + 1}</span>
                    )}
                  </button>
                ) : (
                  <div
                    className={cn(stepSize, stepCircleClass(status, false))}
                    style={{ pointerEvents: 'none' }}
                  >
                    {status === 'completed' ? (
                      <Check className={iconSize} />
                    ) : (
                      <span className="text-xs font-semibold">{index + 1}</span>
                    )}
                  </div>
                )}

                <div className={cn('text-center mt-1.5 min-w-0', isDark ? 'px-0.5' : '')}>
                  <p className={cn(
                    'text-xs font-medium truncate',
                    isDark && status === 'completed' && 'text-accent',
                    isDark && status === 'current' && 'text-foreground',
                    isDark && status === 'upcoming' && 'text-muted-foreground',
                    !isDark && status === 'completed' && 'text-green-600',
                    !isDark && status === 'current' && 'text-blue-600',
                    !isDark && status === 'upcoming' && 'text-gray-500',
                    !isDark && status === 'error' && 'text-red-600'
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className={cn(
                      'text-[10px] mt-0.5 truncate max-w-[72px] mx-auto',
                      isDark && status === 'completed' && 'text-muted-foreground',
                      isDark && status === 'current' && 'text-muted-foreground',
                      isDark && status === 'upcoming' && 'text-muted-foreground/70',
                      !isDark && status === 'completed' && 'text-green-500',
                      !isDark && status === 'current' && 'text-blue-500',
                      !isDark && status === 'upcoming' && 'text-gray-400',
                      !isDark && status === 'error' && 'text-red-500'
                    )}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className={cn('h-0.5 shrink-0 self-center', isDark ? 'mx-1.5 w-4 sm:w-6' : 'mx-4 flex-1 min-w-[8px]')}>
                  <div className={cn(
                    'h-full w-full rounded-full transition-colors duration-200',
                    index < adjustedIndex ? (isDark ? 'bg-accent' : 'bg-green-500') : (isDark ? 'bg-border' : 'bg-gray-200')
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}; 