import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRegistration, REGISTRATION_STEPS } from "@/context/RegistrationContext";
import { getRegistrationStatus } from "../../services/steperService";
import { Loader2 } from "lucide-react";

function applyStatusAndNavigate(
  data: { step: string; email?: string; token?: string; personalInfo?: any; organizationInfo?: any; objectiveInfo?: any },
  token: string,
  setToken: (t: string) => void,
  setCurrentStep: (s: string) => void,
  setUserData: (d: any) => void,
  navigate: (path: string, opts?: { state?: any }) => void
) {
  const { step, email, personalInfo, organizationInfo, objectiveInfo, token: jwtToken } = data;

  setToken(token);
  setCurrentStep(step);
  setUserData({ email, personalInfo, organizationInfo, objectiveInfo });

  if (jwtToken) {
    localStorage.setItem("token", jwtToken);
  }

  switch (step) {
    case REGISTRATION_STEPS.EMAIL_SENT:
      navigate(`/verifyemail?token=${token}&email=${encodeURIComponent(email || "")}`, { state: { token, email } });
      break;
    case REGISTRATION_STEPS.EMAIL_VERIFIED:
      navigate(`/profile-completion?token=${token}&email=${encodeURIComponent(email || "")}`, { state: { token, email } });
      break;
    case REGISTRATION_STEPS.PERSONAL_INFO:
      navigate(`/know-my-org?token=${token}`, { state: { token } });
      break;
    case REGISTRATION_STEPS.ORGANIZATION_INFO:
      setCurrentStep(REGISTRATION_STEPS.COMPLETED);
      navigate(`/assessment-question?token=${token}`, { state: { token } });
      break;
    case REGISTRATION_STEPS.BUSINESS_OBJECTIVES:
    case REGISTRATION_STEPS.COMPLIANCE_OBJECTIVES:
      navigate(`/know-my-org?token=${token}`, { state: { token } });
      break;
    case REGISTRATION_STEPS.COMPLETED:
      if (jwtToken) localStorage.setItem("token", jwtToken);
      navigate(`/assessment-question?token=${token}`, { state: { token } });
      break;
    case REGISTRATION_STEPS.EXPIRED:
      navigate("/auth/register");
      break;
    default:
      throw new Error("Unknown registration step.");
  }
}

export default function RegisterStatusPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken, setCurrentStep, setUserData, isRestoring } = useRegistration();

  const token = searchParams.get("token");
  const registrationDataFromState = location.state?.registrationData as
    | { step: string; email?: string; token?: string; personalInfo?: any; organizationInfo?: any; objectiveInfo?: any }
    | undefined;

  const handleStatus = useCallback(async () => {
    if (!token) {
      setError("No registration token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Use registration data from navigation state when available (e.g. "User already exists" from Registration)
      if (registrationDataFromState?.step) {
        applyStatusAndNavigate(
          registrationDataFromState,
          token,
          setToken,
          setCurrentStep,
          setUserData,
          navigate
        );
        setLoading(false);
        return;
      }

      const statusRes = await getRegistrationStatus(token);

      if (!statusRes?.isSuccess) {
        throw new Error(statusRes?.message || "Invalid or expired token");
      }

      applyStatusAndNavigate(
        statusRes.data,
        token,
        setToken,
        setCurrentStep,
        setUserData,
        navigate
      );
    } catch (err) {
      console.error("Registration status error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [
    token,
    registrationDataFromState,
    navigate,
    setToken,
    setCurrentStep,
    setUserData,
  ]);

  useEffect(() => {
    handleStatus();
  }, [handleStatus]);

  // Show loading state while context is restoring
  if (isRestoring) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F4F7]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#14B8A6] animate-spin mx-auto" />
          <h4 className="text-xl font-semibold text-gray-700">Restoring your progress</h4>
          <p className="text-gray-500">Please wait while we load your registration data</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F4F7]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#14B8A6] animate-spin mx-auto" />
          <h4 className="text-xl font-semibold text-gray-700">Loading registration status</h4>
          <p className="text-gray-500">Please wait while we check your registration progress</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F4F7]">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-700">Registration Error</h4>
          <p className="text-gray-500">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {(error.includes("Unable to connect") || error.includes("Failed to fetch")) && (
              <button
                onClick={() => handleStatus()}
                className="px-4 py-2 bg-[#14B8A6] text-white rounded-lg hover:bg-[#0d9488] transition-colors"
              >
                Retry
              </button>
            )}
            <button
              onClick={() => navigate("/auth/register")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start New Registration
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
