import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OTPModal } from "./OTPModal";
import governmentLogo from "@/assets/government-logo.png";
import { getUserByEmailOrUsername } from "../../lib/storage"; // Import utility functions

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onOpenChange,
  onSwitchToRegister,
}) => {
  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetOTP = () => {
    // Check if the entered mobile or email exists
    const user = getUserByEmailOrUsername(mobileOrEmail);

    if (!user) {
      setErrorMessage("No account found with this mobile number or email.");
      return;
    }

    if (mobileOrEmail && termsAccepted) {
      setErrorMessage(""); // Reset error
      setShowOTP(true);
    }
  };

  return (
    <>
      <Dialog open={open && !showOTP} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <img
                src={governmentLogo}
                alt="Government Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
            <DialogTitle className="text-2xl font-bold text-secondary">
              Sign In to Your Account
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mobile-email">Mobile Number or Email</Label>
              <Input
                id="mobile-email"
                type="text"
                placeholder="Enter mobile number or email"
                value={mobileOrEmail}
                onChange={(e) => setMobileOrEmail(e.target.value)}
                className="w-full"
              />
              {errorMessage && (
                <div className="text-red-600">{errorMessage}</div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  setTermsAccepted(checked as boolean)
                }
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I accept the Terms of Use
              </Label>
            </div>

            <Button
              onClick={handleGetOTP}
              disabled={!mobileOrEmail || !termsAccepted}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Get OTP
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                /* Handle password login */
              }}
            >
              Login with Password
            </Button>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={onSwitchToRegister}
                  className="text-primary hover:underline font-medium"
                >
                  Register here
                </button>
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <OTPModal
        open={showOTP}
        onOpenChange={setShowOTP}
        contact={mobileOrEmail}
        onVerified={() => {
          setShowOTP(false);
          onOpenChange(false);
          // Handle successful login, you can call a method to set logged-in state here
          alert("Successfully logged in!");
        }}
      />
    </>
  );
};
