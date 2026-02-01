// pages/ResetPasswordPage.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRegistrationPasswordResetStatus, resetRegistrationPassword } from "../../../services/userServicer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  const query = useQuery();
  const token = query.get("token") || "";

  useEffect(() => {
    if (!token) {
      setError("No token provided.");
      setTokenValid(false);
      return;
    }
    setLoading(true);
    getRegistrationPasswordResetStatus(token)
      .then(() => {
        setTokenValid(true);
      })
      .catch((err) => {
        setError(err.message || "Invalid or expired token.");
        setTokenValid(false);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);
      await resetRegistrationPassword({ token, password: newPassword, confirmPassword });
      setMessage("Password reset successful. You can now log in.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && tokenValid === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="mb-6">
          <Logo className="h-12 w-auto" />
        </div>
        <p className="text-center">Checking token...</p>
      </div>
    );
  }
  if (tokenValid === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="mb-6">
          <Logo className="h-12 w-auto" />
        </div>
        <p className="text-center text-red-600">{error || "Invalid or expired token."}</p>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-gradient-to-br from-[#F2F4F7] to-white flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        <Logo className="h-12 w-auto" />
      </div>
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-[#003399] mb-2">
              Reset Password
            </CardTitle>
            <p className="text-gray-600">
              Enter your new password below
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit}>
                 <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                New Password
              </Label>
                <div className="relative">
              <Input
                id="new-password"
                type="password"
                placeholder="New Password"
                className="pl-4 h-12 border-gray-300 focus:border-[#14B8A6] w-full mb-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              </div>
              </div>

               <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </Label>
                <div className="relative">
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm New Password"
                className="pl-4 h-12 border-gray-300 focus:border-[#14B8A6] w-full mb-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              </div></div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#14B8A6] hover:bg-[#0d9488] text-white h-12 text-lg font-semibold"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
              {message && <p className="text-green-600 mt-4">{message}</p>}
              {error && <p className="text-red-600 mt-4">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
