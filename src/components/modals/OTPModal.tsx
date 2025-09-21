import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { X } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { getUserByEmailOrUsername } from "../../lib/storage"; // Import utility functions

interface OTPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact?: string;
  mobileNumber?: string;
  onVerified?: () => void;
  onVerifySuccess?: () => void;
}

export const OTPModal: React.FC<OTPModalProps> = ({
  open,
  onOpenChange,
  contact,
  mobileNumber,
  onVerified,
  onVerifySuccess,
}) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const { login } = useUser();

  useEffect(() => {
    if (open && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [open, countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      // Mock successful verification
      const mockUser = getUserByEmailOrUsername(contact || mobileNumber || "");

      if (onVerified) {
        login(mockUser);
        onVerified();
      } else if (onVerifySuccess) {
        onVerifySuccess();
      }
    }
  };

  const handleResendOTP = () => {
    setCountdown(120);
    setCanResend(false);
    setOtp("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 p-2 hover:bg-muted rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-2xl font-bold text-secondary text-center">
            OTP Verification
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-center">
          <p className="text-muted-foreground">
            We have sent an OTP to{" "}
            <span className="font-medium text-foreground">
              {contact || mobileNumber}
            </span>
          </p>

          <p className="text-sm text-muted-foreground">
            OTP is valid for 2 minutes
          </p>

          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Verify OTP
          </Button>

          <div className="space-y-2">
            {!canResend ? (
              <p className="text-sm text-muted-foreground">
                Resend in {formatTime(countdown)}
              </p>
            ) : (
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                className="text-primary hover:text-primary-dark"
              >
                Resend OTP
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
