import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRegistrationStatus, verifyEmail } from "../../../services/steperService";
import { CheckCircle, AlertTriangle } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRegistration, REGISTRATION_STEPS } from '@/context/RegistrationContext';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const { setCurrentStep, setToken, setUserData, nextStep } = useRegistration();

  const [status, setStatus] = useState<"loading" | "email_sent" | "email_verified" | "expired" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMsg("No token provided.");
      return;
    }

    const checkStep = async () => {
      try {
        const res = await getRegistrationStatus(token);
        if (!res?.isSuccess) throw new Error(res?.message || "Invalid or expired token");
        const step = res.data.step;
        setToken(token);
        setUserData({ email: res.data.email });
        setCurrentStep(step);
        if (step === REGISTRATION_STEPS.EMAIL_SENT) {
          setStatus("email_sent");
        } else if (step === REGISTRATION_STEPS.EXPIRED) {
          setStatus("expired");
        } else {
          // User already passed this step, redirect to their current step
          nextStep();
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMsg(err.message || "Something went wrong.");
      }
    };
    checkStep();
    // eslint-disable-next-line
  }, [token]);

  const handleVerify = async () => {
    if (!token) return;
    setStatus("loading");
    try {
      const result = await verifyEmail(token);
      if (result?.isSuccess && result.data.step === REGISTRATION_STEPS.EMAIL_VERIFIED) {
        setStatus("email_verified");
        setCurrentStep(REGISTRATION_STEPS.EMAIL_VERIFIED);
        navigate(`/profile-completion?token=${token}&email=${encodeURIComponent(email || '')}`, { state: { token, email } });
      } else if (result.data.step === REGISTRATION_STEPS.EXPIRED) {
        setStatus("expired");
      } else {
        setStatus("error");
        setErrorMsg("Verification failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Verification failed. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Verifying your email...</p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <AlertTriangle className="w-12 h-12 text-red-600 mb-2 mx-auto" />
            <CardTitle className="text-center text-red-700">Link Expired</CardTitle>
            <CardDescription className="text-center">
              The verification link has expired. Please register again.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => navigate("/auth/register")} className="w-full" variant="outline">
              Go to Register
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <AlertTriangle className="w-12 h-12 text-yellow-500 mb-2 mx-auto" />
            <CardTitle className="text-center text-yellow-700">Error</CardTitle>
            <CardDescription className="text-center">
              {errorMsg || "Something went wrong. Please try again."}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => navigate("/auth/register")} className="w-full" variant="outline">
              Go to Register
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Only render verification UI if step is email_sent
  if (status === "email_sent") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CheckCircle className="w-12 h-12 text-blue-600 mb-2 mx-auto" />
            <CardTitle className="text-center">Email Verification</CardTitle>
            <CardDescription className="text-center">
              Click the button below to verify your email and continue registration.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleVerify} className="w-full">
              Verify Email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
